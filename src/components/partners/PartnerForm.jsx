// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const STEPS = [
  { label: 'Studio Identity' },
  { label: 'Contact' },
  { label: 'Work Profile' },
  { label: 'Compliance' },
];

function ProgressBar({ step }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= step ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
              {i + 1}
            </div>
            <span className={`text-xs hidden md:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div
          className="bg-accent h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${step === 0 ? 5 : (step / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function PartnerForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', studioName: '', yearEstablished: '', principalDesigner: '',
    teamSize: '', phone: '', email: '', city: '', projectValueRange: '',
    portfolioLink: '', websiteLink: '', gstNumber: '',
    clientRef1: '', clientRef2: '', services: '',
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const specializationLabels = {
    residential: 'Residential Interiors',
    commercial: 'Commercial / Office',
    hospitality: 'Hospitality',
    architecture: 'Architecture',
    exterior: 'Exterior / Landscape',
    multiple: 'Multiple Specializations',
  };

  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
    if (apiError) setApiError('');
  };

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.studioName.trim()) errs.studioName = 'Required';
      if (!form.yearEstablished.trim()) errs.yearEstablished = 'Required';
      else {
        const yr = parseInt(form.yearEstablished, 10);
        if (!/^\d{4}$/.test(form.yearEstablished.trim()) || yr < 1900 || yr > new Date().getFullYear()) {
          errs.yearEstablished = `Enter a valid year (e.g. 2015)`;
        }
      }
      if (!form.principalDesigner.trim()) errs.principalDesigner = 'Required';
      if (!form.teamSize.trim()) errs.teamSize = 'Required';
    }
    if (step === 1) {
      if (!form.name.trim()) errs.name = 'Required';
      const digits = form.phone.replace(/\D/g, '');
      if (!form.phone.trim()) errs.phone = 'Required';
      else if (digits.length !== 10) errs.phone = 'Must be exactly 10 digits';
      if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
      if (!form.city.trim()) errs.city = 'Required';
    }
    if (step === 2) {
      if (!form.services) errs.services = 'Please select a specialization';
      if (!form.projectValueRange.trim()) errs.projectValueRange = 'Required';
      if (!form.portfolioLink.trim()) errs.portfolioLink = 'Required';
    }
    if (step === 3) {
      if (!form.gstNumber.trim()) errs.gstNumber = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setApiError('');
    setSubmitting(true);
    try {
      const result = await base44.partners.apply({
        studioName: form.studioName.trim(),
        yearOfEstablishment: form.yearEstablished.trim(),
        founderName: form.principalDesigner.trim(),
        teamSize: form.teamSize.trim(),
        contactName: form.name.trim(),
        phone: form.phone.replace(/\D/g, ''),
        email: form.email.trim(),
        city: form.city.trim(),
        specialization: specializationLabels[form.services] || form.services,
        projectValueRange: form.projectValueRange.trim(),
        portfolioLink: form.portfolioLink.trim(),
        website: form.websiteLink.trim(),
        gstNumber: form.gstNumber.trim(),
        clientRef1: form.clientRef1.trim(),
        clientRef2: form.clientRef2.trim(),
        consent,
      });

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit application. Please try again.');
      }

      setSubmitted(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-5" />
        <h3 className="font-display text-2xl font-semibold mb-2">Application Received!</h3>
        <p className="text-muted-foreground text-sm mb-7 max-w-sm mx-auto">
          Thank you for applying to INTEXA's partner network. Our team will review your profile carefully.
        </p>
        <div className="bg-muted/50 rounded-xl p-5 text-left max-w-sm mx-auto space-y-3">
          <p className="text-sm font-semibold mb-1">What happens next</p>
          {[
            'We review your studio profile & portfolio (3–5 days)',
            'If it\'s a fit, we schedule a brief onboarding call',
            'Your studio goes live in our curated referral network',
            'We match you with clients based on project fit — not rotation',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 text-xs text-accent font-bold mt-0.5">{i + 1}</div>
              {item}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-6">Questions? Email us at <a href="mailto:team@intexa.in" className="text-accent underline">team@intexa.in</a></p>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar step={step} />

      {/* Step 1: Studio Identity */}
      {step === 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold mb-4">Tell us about your studio</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Studio Name & Registration *" error={errors.studioName}>
              <Input value={form.studioName} onChange={e => set('studioName', e.target.value)} placeholder="Registered studio or firm name" className={errors.studioName ? 'border-red-400' : ''} />
            </Field>
            <Field label="Year of Establishment *" error={errors.yearEstablished}>
              <Input value={form.yearEstablished} onChange={e => set('yearEstablished', e.target.value)} placeholder="e.g. 2015" className={errors.yearEstablished ? 'border-red-400' : ''} />
            </Field>
            <Field label="Principal Designer / Founder *" error={errors.principalDesigner}>
              <Input value={form.principalDesigner} onChange={e => set('principalDesigner', e.target.value)} placeholder="Full name" className={errors.principalDesigner ? 'border-red-400' : ''} />
            </Field>
            <Field label="Team Size & Structure *" error={errors.teamSize}>
              <Input value={form.teamSize} onChange={e => set('teamSize', e.target.value)} placeholder="e.g. 8 people — 3 designers, 2 site managers" className={errors.teamSize ? 'border-red-400' : ''} />
            </Field>
          </div>
        </div>
      )}

      {/* Step 2: Contact */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold mb-4">Contact details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Your Name *" error={errors.name}>
              <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Person filling this form" className={errors.name ? 'border-red-400' : ''} />
            </Field>
            <Field label="Phone *" error={errors.phone}>
              <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={errors.phone ? 'border-red-400' : ''} />
            </Field>
            <Field label="Email *" error={errors.email}>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="work@yourstudio.com" className={errors.email ? 'border-red-400' : ''} />
            </Field>
            <Field label="City of Operation *" error={errors.city}>
              <Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Delhi, Gurgaon, Noida" className={errors.city ? 'border-red-400' : ''} />
            </Field>
          </div>
        </div>
      )}

      {/* Step 3: Work Profile */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold mb-4">Your work profile</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Primary Specialization *" error={errors.services}>
              <Select value={form.services} onValueChange={v => set('services', v)}>
                <SelectTrigger className={errors.services ? 'border-red-400' : ''}><SelectValue placeholder="Select specialization" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential Interior</SelectItem>
                  <SelectItem value="commercial">Commercial / Office</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="architecture">Architecture</SelectItem>
                  <SelectItem value="exterior">Exterior / Landscape</SelectItem>
                  <SelectItem value="multiple">Multiple Specializations</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Typical Project Value Range *" error={errors.projectValueRange}>
              <Input value={form.projectValueRange} onChange={e => set('projectValueRange', e.target.value)} placeholder="e.g. ₹15L – ₹40L" className={errors.projectValueRange ? 'border-red-400' : ''} />
            </Field>
            <Field label="Portfolio Link * (PDF or URL)" error={errors.portfolioLink}>
              <Input value={form.portfolioLink} onChange={e => set('portfolioLink', e.target.value)} placeholder="Google Drive, Behance, or portfolio URL" className={errors.portfolioLink ? 'border-red-400' : ''} />
            </Field>
            <Field label="Website or Social Media">
              <Input value={form.websiteLink} onChange={e => set('websiteLink', e.target.value)} placeholder="https://yourwebsite.com or Instagram" />
            </Field>
          </div>
        </div>
      )}

      {/* Step 4: Compliance */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold mb-4">Compliance & references</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="GST Registration Number *" error={errors.gstNumber}>
              <Input value={form.gstNumber} onChange={e => set('gstNumber', e.target.value)} placeholder="e.g. 07AABCU9603R1ZP" className={`md:col-span-2 ${errors.gstNumber ? 'border-red-400' : ''}`} />
            </Field>
            <div />
            <Field label="Client Reference 1 (preferred)">
              <Input value={form.clientRef1} onChange={e => set('clientRef1', e.target.value)} placeholder="Name & phone / email" />
            </Field>
            <Field label="Client Reference 2 (preferred)">
              <Input value={form.clientRef2} onChange={e => set('clientRef2', e.target.value)} placeholder="Name & phone / email" />
            </Field>
          </div>

          <div className="flex items-start gap-3 pt-3">
            <input
              type="checkbox" id="partner-consent"
              checked={consent} onChange={e => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-accent cursor-pointer flex-shrink-0"
            />
            <label htmlFor="partner-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              I agree to INTEXA's{' '}
              <Link to="/privacy-policy" className="text-accent underline underline-offset-2">Privacy Policy</Link>
              {' '}and consent to being contacted regarding this partnership application.
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      {apiError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-6">
          {apiError}
        </p>
      )}

      <div className="flex gap-3 pt-7">
        {step > 0 && (
          <button type="button" onClick={back}
            className="flex items-center gap-1.5 border border-border px-5 h-12 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={next}
            className="flex-1 flex items-center justify-center gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-lg text-sm font-semibold transition-colors">
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={submitting || !consent}
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none h-12 rounded-lg text-sm font-semibold transition-colors">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {submitting ? 'Submitting...' : 'Submit Application →'}
          </button>
        )}
      </div>
    </div>
  );
}