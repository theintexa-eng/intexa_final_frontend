import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

const STEPS = [
  {
    id: 'basics',
    label: 'About You',
    fields: ['name', 'phone', 'email', 'city']
  },
  {
    id: 'project',
    label: 'Your Project',
    fields: ['property_type', 'budget', 'timeline']
  },
  {
    id: 'confirm',
    label: 'Confirm',
    fields: []
  }
];

const propertyOptions = [
  ['apartment', 'Apartment'],
  ['villa', 'Villa / Independent House'],
  ['penthouse', 'Penthouse'],
  ['office', 'Office'],
  ['retail', 'Retail / Showroom'],
  ['restaurant', 'Restaurant / Café'],
  ['hotel', 'Hotel / Hospitality'],
  ['clinic', 'Clinic / Hospital'],
  ['other', 'Other'],
];

const budgetOptions = [
  ['under_10L', 'Under 10 Lakhs'],
  ['10L_20L', '10 - 20 Lakhs'],
  ['20L_35L', '20 - 35 Lakhs'],
  ['35L_50L', '35 - 50 Lakhs'],
  ['above_50L', 'Above 50 Lakhs'],
];

const timelineOptions = [
  ['immediate', 'Immediately'],
  ['1_3_months', 'Within 1-3 months'],
  ['3_6_months', 'In 3-6 months'],
  ['6_months_plus', 'Planning ahead (6+ months)'],
];

export default function LandingForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    property_type: '', budget: '', timeline: '',
    service_interest: 'studio_matching'
  });
  const [consent, setConsent] = useState(false);
  const [apiError, setApiError] = useState('');
  const [startingInquiry, setStartingInquiry] = useState(false);
  const [updatingInquiryStep2, setUpdatingInquiryStep2] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    property_type: '',
    budget: '',
    timeline: '',
  });

  /** @param {string} k @param {string} v */
  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
    if (apiError) setApiError('');

    // Contact changes should invalidate earlier inquiry id and request a fresh start.
    if (inquiryId && ['name', 'phone', 'email', 'city'].includes(k)) {
      setInquiryId('');
    }
  };

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Required';
      if (!form.phone.trim()) errs.phone = 'Required';
      else if (form.phone.replace(/\D/g, '').length !== 10) errs.phone = 'Must be exactly 10 digits';
      if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
      if (!form.city.trim()) errs.city = 'Required';
    }
    if (step === 1) {
      if (!form.property_type) errs.property_type = 'Please select a property type';
      if (!form.budget) errs.budget = 'Please select a budget range';
      if (!form.timeline) errs.timeline = 'Please select a timeline';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
    * @param {string[][]} options
   * @param {string} value
   */
  const getOptionLabel = (options, value) => options.find(([v]) => v === value)?.[1] || '';

  const next = async () => {
    if (!validateStep()) return;

    if (step === 0) {
      if (inquiryId) {
        setStep(1);
        return;
      }

      setStartingInquiry(true);
      setApiError('');

      try {
        const startResult = await base44.inquiry.start({
          name: form.name.trim(),
          phone: form.phone.replace(/\D/g, ''),
          email: form.email.trim(),
          city: form.city.trim(),
        });

        if (!startResult.success || !startResult.inquiryId) {
          throw new Error(startResult.message || 'Failed to start inquiry. Please try again.');
        }

        setInquiryId(startResult.inquiryId);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : 'Failed to start inquiry. Please try again.');
        setStartingInquiry(false);
        return;
      }

      setStartingInquiry(false);
    }

    if (step === 1) {
      if (!inquiryId) {
        setApiError('Session expired. Please go back to step 1 and try again.');
        return;
      }

      setUpdatingInquiryStep2(true);
      setApiError('');

      try {
        const step2Result = await base44.inquiry.step2(inquiryId, {
          propertyType: getOptionLabel(propertyOptions, form.property_type),
          budget: getOptionLabel(budgetOptions, form.budget),
          timeline: getOptionLabel(timelineOptions, form.timeline),
          message: '',
        });

        if (!step2Result.success) {
          throw new Error(step2Result.message || 'Failed to update inquiry. Please try again.');
        }
      } catch (error) {
        setApiError(error instanceof Error ? error.message : 'Failed to update inquiry. Please try again.');
        setUpdatingInquiryStep2(false);
        return;
      }

      setUpdatingInquiryStep2(false);
    }

    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep(s => Math.max(s - 1, 0));

  const submit = async () => {
    if (!inquiryId) {
      setApiError('Session expired. Please go back to step 1 and try again.');
      return;
    }

    setApiError('');
    setSubmitting(true);
    try {
      const completeResult = await base44.inquiry.complete(inquiryId);
      if (!completeResult.success) {
        throw new Error(completeResult.message || 'Failed to complete inquiry. Please try again.');
      }
      setSubmitted(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Failed to complete inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step) / (STEPS.length - 1)) * 100;

  if (submitted) {
    return (
      <section id="get-matched-form" className="py-16 lg:py-24 bg-[#F7F5F2]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-5" />
          <h2 className="font-display text-2xl font-semibold mb-3">You're on the list!</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Our advisory team will review your project and call you back within <strong>24 hours</strong> — typically sooner. We'll come prepared.
          </p>
          <div className="bg-white rounded-xl border border-border p-5 text-left space-y-2 text-sm">
            <p className="font-semibold text-foreground mb-3">What happens next</p>
            {[
              'We review your project details internally',
              'We schedule a 30-min consultation call',
              'You receive a curated brand shortlist within 48 hrs of the call',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-xs text-accent font-bold">{i + 1}</div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="get-matched-form" className="py-16 lg:py-24 bg-[#F7F5F2]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Start Here</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-3">
            Get matched with the right brands.
          </h2>
          <p className="text-muted-foreground text-sm">
            Fill in a few details. We'll call you back within 24 hours. No spam, no commitment.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-7 md:p-10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= step ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs hidden sm:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-3">
              <div
                className="bg-accent h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${step === 0 ? 5 : progress}%` }}
              />
            </div>
          </div>

          {/* Step 1: Basics */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-base mb-5">Tell us about yourself</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name *" error={errors.name}>
                  <input className={input(errors.name)} placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
                </Field>
                <Field label="Phone Number *" error={errors.phone}>
                  <input className={input(errors.phone)} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input className={input(errors.email)} type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </Field>
                <Field label="City *" error={errors.city}>
                  <input className={input(errors.city)} placeholder="e.g. Delhi, Gurgaon, Noida" value={form.city} onChange={e => set('city', e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {/* Step 2: Project */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-semibold text-base mb-5">Tell us about your project</h3>

              <Field label="Property Type *" error={errors.property_type}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {propertyOptions.map(([v, l]) => (
                    <button
                      key={v} type="button"
                      onClick={() => set('property_type', v)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors text-left ${form.property_type === v ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-accent/40'}`}
                    >{l}</button>
                  ))}
                </div>
              </Field>

              <Field label="Budget Range *" error={errors.budget}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {budgetOptions.map(([v, l]) => (
                    <button
                      key={v} type="button"
                      onClick={() => set('budget', v)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors text-left ${form.budget === v ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-accent/40'}`}
                    >{l}</button>
                  ))}
                </div>
              </Field>

              <Field label="Timeline *" error={errors.timeline}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timelineOptions.map(([v, l]) => (
                    <button
                      key={v} type="button"
                      onClick={() => set('timeline', v)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors text-left ${form.timeline === v ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-accent/40'}`}
                    >{l}</button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 2 && (
            <div>
              <h3 className="font-semibold text-base mb-5">Confirm your details</h3>
              <div className="bg-muted/40 rounded-xl p-5 space-y-2 text-sm mb-6">
                {[
                  ['Name', form.name],
                  ['Phone', form.phone],
                  ['Email', form.email],
                  ['City', form.city || '—'],
                  ['Property', propertyOptions.find(o => o[0] === form.property_type)?.[1] || '—'],
                  ['Budget', budgetOptions.find(o => o[0] === form.budget)?.[1] || '—'],
                  ['Timeline', timelineOptions.find(o => o[0] === form.timeline)?.[1] || '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="lp-consent"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-accent cursor-pointer flex-shrink-0"
                />
                <label htmlFor="lp-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to INTEXA's{' '}
                  <Link to="/privacy-policy" className="text-accent underline underline-offset-2">Privacy Policy</Link>
                  {' '}and consent to being contacted about my project.
                </label>
              </div>

              <div className="text-xs text-muted-foreground bg-accent/5 border border-accent/20 rounded-lg p-4 mb-2">
                <strong className="text-foreground">What happens after you submit?</strong> Our team will call you within 24 hours to schedule your 30-minute consultation. No spam. No random vendor calls.
              </div>
            </div>
          )}

          {/* Navigation */}
          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-1.5 border border-border px-5 h-12 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => { void next(); }}
                disabled={startingInquiry || updatingInquiryStep2}
                className="flex-1 flex items-center justify-center gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-60 disabled:pointer-events-none h-12 rounded-lg text-sm font-semibold transition-colors"
              >
                {startingInquiry || updatingInquiryStep2 ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {startingInquiry || updatingInquiryStep2 ? 'Continuing...' : 'Continue'}
                {!startingInquiry && !updatingInquiryStep2 ? <ChevronRight className="w-4 h-4" /> : null}
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting || startingInquiry || updatingInquiryStep2}
                className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none h-12 rounded-lg text-sm font-semibold transition-colors"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {submitting ? 'Submitting...' : 'Get My Brand Match →'}
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            ₹2,999 · Pay only after your match is confirmed. 100% advisory fee — no hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
}

/** @param {{ label: string, error?: string, children: React.ReactNode }} props */
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/** @param {string} error */
function input(error) {
  return `w-full h-10 px-3 rounded-lg border text-sm transition-colors outline-none focus:ring-1 focus:ring-accent focus:border-accent ${error ? 'border-red-400 bg-red-50' : 'border-border bg-white'}`;
}