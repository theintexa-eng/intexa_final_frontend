import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import LeadCaptureForm from '../components/shared/LeadCaptureForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const serviceInterest = searchParams.get('service') || 'general_inquiry';

  return (
    <>
      <PageHero
        title={serviceInterest === 'studio_matching' ? 'Start Your Brand Matching' : 'Let\'s talk about your project'}
        subtitle={serviceInterest === 'studio_matching' ? '30-minute structured session. We understand your project and match you with the right brands.' : 'Share what you\'re planning and we\'ll reach out within 24 hours.'}
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
                <h2 className="font-display text-2xl font-semibold mb-2">
                  {serviceInterest === 'studio_matching' ? 'Get Matched with the Right Brands' : 'Tell Us About Your Project'}
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Fill in a few details and we'll call you back within 24 hours. No sales pitch — just a real conversation.
                </p>
                <LeadCaptureForm serviceInterest={serviceInterest} />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Reach us directly</h3>
                <div className="space-y-4">
                  <a href="tel:+919217919111" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                   <Phone className="w-4 h-4 text-accent" /> +91 7763840602
                  </a>
                  <a href="mailto:team@intexa.in" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                    <Mail className="w-4 h-4 text-accent" /> team@intexa.in
                  </a>
                  <p className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Delhi NCR, India
                  </p>
                  <p className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-accent" /> Tue–Sun, 10 AM – 7 PM
                  </p>
                </div>
              </div>

              {serviceInterest === 'studio_matching' && (
                <div className="bg-accent/5 rounded-2xl border border-accent/20 p-6">
                  <h3 className="font-semibold mb-3">What's included</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      '30-min structured consultation',
                      'We check if your budget is realistic',
                      '2–3 curated brands shortlisted for you',
                      'Written summary after the session',
                      '7-day follow-up support post the match',
                      'Make payment after a match is confirmed',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-accent/10">
                    <span className="text-2xl font-bold">₹2,999</span>
                    <span className="text-sm text-muted-foreground ml-1">one-time</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}