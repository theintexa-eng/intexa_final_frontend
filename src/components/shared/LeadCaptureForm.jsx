import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const propertyOptions = [
  ['apartment', 'Apartment'],
  ['villa', 'Villa / Independent House'],
  ['penthouse', 'Penthouse'],
  ['office', 'Office'],
  ['retail', 'Retail / Showroom'],
  ['restaurant', 'Restaurant / Café'],
  ['hotel', 'Hotel'],
  ['clinic', 'Clinic / Hospital'],
  ['other', 'Other'],
];

const budgetOptions = [
  ['under_10L', 'Under ₹10 Lakhs'],
  ['10L_20L', '₹10L – ₹20 Lakhs'],
  ['20L_30L', '₹20L – ₹30 Lakhs'],
  ['30L_40L', '₹30L – ₹40 Lakhs'],
  ['40L_50L', '₹40L – ₹50 Lakhs'],
  ['above_50L', 'Above ₹50 Lakhs'],
];

const timelineOptions = [
  ['immediate', 'Immediately'],
  ['within_a_month', 'Within a Month'],
  ['1_3_months', '1–3 Months'],
  ['3_months_plus', '3+ Months'],
];

const preferredTimeOptions = [
  ['anytime', 'Call me anytime'],
  ['morning', 'Morning (10 AM – 12 PM)'],
  ['afternoon', 'Afternoon (12 – 4 PM)'],
  ['evening', 'Evening (4 – 7 PM)'],
];

const STEPS = [
  { label: 'About You' },
  { label: 'Your Project' },
  { label: 'Confirm' },
];

function ProgressBar({ step, total }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= step ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
              {i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {STEPS[i].label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div
          className="bg-accent h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${step === 0 ? 5 : (step / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function TileGroup({ options, value, onChange, cols = 2 }) {
  return (
    <div className={`grid gap-2 grid-cols-${cols}`}>
      {options.map(([v, l]) => (
        <button
          key={v} type="button"
          onClick={() => onChange(v)}
          className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors text-left ${value === v ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-accent/40'}`}
        >{l}</button>
      ))}
    </div>
  );
}

export default function LeadCaptureForm({ serviceInterest = 'general_inquiry', compact = false }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    property_type: '', budget: '', timeline: '', preferred_time: '', message: '',
    service_interest: serviceInterest,
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Required';
      const digits = form.phone.replace(/\D/g, '');
      if (!form.phone.trim()) errs.phone = 'Required';
      else if (digits.length !== 10) errs.phone = 'Must be exactly 10 digits';
      if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
      if (!form.city.trim()) errs.city = 'Required';
      else if (!/^[a-zA-Z\s\-]+$/.test(form.city.trim())) errs.city = 'City name must contain only letters';
    }
    if (step === 1) {
      if (!form.property_type) errs.property_type = 'Please select a property type';
      if (!form.budget) errs.budget = 'Please select a budget range';
      if (!form.timeline) errs.timeline = 'Please select a timeline';
      if (!form.preferred_time) errs.preferred_time = 'Please select a preferred time';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    await base44.entities.Lead.create(form);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-5" />
        <h3 className="font-display text-2xl font-semibold mb-2">You're all set!</h3>
        <p className="text-muted-foreground text-sm mb-7 max-w-sm mx-auto">
          Our team will review your details and call you back within <strong>24 hours</strong> — no spam, no pressure.
        </p>
        <div className="bg-muted/50 rounded-xl p-5 text-left max-w-sm mx-auto space-y-3">
          <p className="text-sm font-semibold mb-1">What happens next</p>
          {[
            'We review your project details',
            'We schedule a 30-min consultation call',
            'You receive a curated brand shortlist within 48 hrs of the call',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 text-xs text-accent font-bold mt-0.5">{i + 1}</div>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <ProgressBar step={step} total={3} />

      {/* Step 1: About You */}
      {step === 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold mb-4">Tell us about yourself</p>
          <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            <div className="space-y-1.5">
              <Label className="text-sm">Full Name *</Label>
              <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" className={errors.name ? 'border-red-400' : ''} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Phone *</Label>
              <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={errors.phone ? 'border-red-400' : ''} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Email *</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" className={errors.email ? 'border-red-400' : ''} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">City *</Label>
              <Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Delhi, Gurgaon" className={errors.city ? 'border-red-400' : ''} />
              {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Project */}
      {step === 1 && (
        <div className="space-y-5">
          <p className="text-sm font-semibold mb-4">Tell us about your project</p>

          <div className="space-y-1.5">
            <Label className="text-sm">Property Type *</Label>
            <TileGroup options={propertyOptions} value={form.property_type} onChange={v => set('property_type', v)} cols={3} />
            {errors.property_type && <p className="text-xs text-red-500">{errors.property_type}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Budget Range *</Label>
            <TileGroup options={budgetOptions} value={form.budget} onChange={v => set('budget', v)} cols={2} />
            {errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Timeline *</Label>
            <TileGroup options={timelineOptions} value={form.timeline} onChange={v => set('timeline', v)} cols={2} />
            {errors.timeline && <p className="text-xs text-red-500">{errors.timeline}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Preferred Time for Call *</Label>
            <TileGroup options={preferredTimeOptions} value={form.preferred_time} onChange={v => set('preferred_time', v)} cols={2} />
            {errors.preferred_time && <p className="text-xs text-red-500">{errors.preferred_time}</p>}
          </div>

          {!compact && (
            <div className="space-y-1.5">
              <Label className="text-sm">Message <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your project..." rows={3} />
            </div>
          )}
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 2 && (
        <div>
          <p className="text-sm font-semibold mb-4">Confirm your details</p>
          <div className="bg-muted/40 rounded-xl p-5 space-y-2 text-sm mb-5">
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

          <div className="flex items-start gap-3 mb-5">
            <input
              type="checkbox" id="lead-consent"
              checked={consent} onChange={e => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-accent cursor-pointer flex-shrink-0"
            />
            <label htmlFor="lead-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              I agree to INTEXA's{' '}
              <Link to="/privacy-policy" className="text-accent underline underline-offset-2">Privacy Policy</Link>
              {' '}and consent to being contacted regarding my project inquiry.
            </label>
          </div>

          <div className="text-xs text-muted-foreground bg-accent/5 border border-accent/20 rounded-lg p-3">
            No spam. We'll only contact you regarding your project — never share your details with third parties without consent.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-6">
        {step > 0 && (
          <button type="button" onClick={back}
            className="flex items-center gap-1.5 border border-border px-5 h-12 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        {step < 2 ? (
          <button type="button" onClick={next}
            className="flex-1 flex items-center justify-center gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-lg text-sm font-semibold transition-colors">
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={submitting || !consent}
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none h-12 rounded-lg text-sm font-semibold transition-colors">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {submitting ? 'Submitting...' : serviceInterest === 'studio_matching' ? 'Get My Brand Match →' : 'Submit Inquiry →'}
          </button>
        )}
      </div>
    </div>
  );
}