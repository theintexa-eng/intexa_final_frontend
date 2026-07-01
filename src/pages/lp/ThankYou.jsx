/**
 * ThankYou — branded post-booking confirmation for the consultation funnel.
 * Reached after a confirmed Calendly booking (BookingSection redirects here).
 * Fires the conversion events ONCE per booking (deduped via sessionStorage), so a
 * reload or a direct visit never double-counts (or fakes) a conversion.
 */
import React, { useEffect, useRef } from 'react';
import {
  CheckCircle2, CalendarCheck, Video, ClipboardList,
  Phone, Mail, MessageCircle, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { LP_PHONE, LP_PHONE_DISPLAY } from '@/lib/lpConfig';
import SiteAnalytics from '@/components/SiteAnalytics';

const LOGO = 'https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/260efcddc_FinalLogoTransparentwhitetext.png';
const WHATSAPP_URL =
  'https://wa.me/919217919111?text=' +
  encodeURIComponent('Hi INTEXA, I just booked my free consultation and have a quick question.');

const PREP = [
  'Your space — approximate size, layout, and which rooms are in scope.',
  'A rough budget range (even a ballpark helps us tailor the advice).',
  'Your timeline — when you would like to start and finish.',
  'Any designer quotes or BOQs you already have, so we can sense-check them.',
  'Inspiration you like — a few reference images or a Pinterest board.',
];

export default function ThankYou() {
  const firedRef = useRef(false);

  useEffect(() => {
    // Thank-you view always tracked.
    trackEvent('thank_you_view', { landing_path: '/lp/thank-you' });

    // Only count a conversion when we arrived from a real booking, and only once.
    let booking = null;
    try { booking = JSON.parse(sessionStorage.getItem('intexa_booking') || 'null'); } catch { booking = null; }
    if (booking && !firedRef.current) {
      let counted = null;
      try { counted = sessionStorage.getItem('intexa_booking_counted'); } catch { counted = null; }
      const id = booking.id || '1';
      if (counted !== id) {
        firedRef.current = true;
        trackEvent('generate_lead', { provider: 'calendly', event_id: booking.id || '', value: 0, currency: 'INR' });
        trackEvent('schedule_consultation', { status: 'confirmed', event_id: booking.id || '' });
        trackEvent('book_consultation', { provider: 'calendly', event_id: booking.id || '' });
        try { sessionStorage.setItem('intexa_booking_counted', id); } catch { /* ignore */ }
      }
    }

    // Post-conversion page: keep it out of the index.
    document.title = 'Booking Confirmed — INTEXA';
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); }
    robots.setAttribute('content', 'noindex,nofollow');
    if (created) document.head.appendChild(robots);
    return () => { if (created && robots.parentNode) robots.parentNode.removeChild(robots); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact header */}
      <header className="bg-[#0D1B2A] border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img src={LOGO} alt="INTEXA" className="h-7 w-auto" />
          <a href="https://www.intexa.in" className="text-white/70 text-sm hover:text-white transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to intexa.in
          </a>
        </div>
      </header>

      {/* Confirmation hero */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 border border-accent/30 mb-6">
            <CheckCircle2 className="w-9 h-9 text-accent" />
          </div>
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Booking Confirmed</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
            Your free consultation is booked.
          </h1>
          <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed">
            Thank you — a senior INTEXA advisor is looking forward to your call. A calendar invite with
            your <span className="text-primary-foreground font-medium">Google Meet link</span> is on its way to your inbox.
          </p>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-primary mb-8 text-center">What happens next</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {[
              { icon: CalendarCheck, t: 'Calendar invite sent', d: 'Check your email for the invite. Add it to your calendar so you don’t miss it.' },
              { icon: Video, t: 'Google Meet link', d: 'Your invite includes the Google Meet link — just click it at your booked time.' },
              { icon: ClipboardList, t: 'A 30-minute plan', d: 'We’ll review your space, budget and options, and map out clear next steps.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-1.5">{t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Prepare */}
          <div className="bg-secondary/40 border border-border rounded-xl p-6 sm:p-8 mb-10">
            <h3 className="font-display text-xl font-semibold text-primary mb-4">How to prepare (5 minutes)</h3>
            <ul className="space-y-3">
              {PREP.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-xs mt-5">
              The more context you share, the more tailored your advice will be. There’s nothing to buy — just useful, independent guidance.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:opacity-90 px-6 h-12 rounded-md font-semibold text-sm transition-opacity w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> Message us on WhatsApp
            </a>
            <a
              href="https://www.intexa.in"
              className="inline-flex items-center justify-center gap-2 border border-border text-primary hover:bg-secondary/50 px-6 h-12 rounded-md font-semibold text-sm transition-colors w-full sm:w-auto"
            >
              Explore INTEXA <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm mb-3">Need to reach us before the call?</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <a href={`tel:${LP_PHONE}`} className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" /> {LP_PHONE_DISPLAY}
              </a>
              <a href="mailto:team@intexa.in" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" /> team@intexa.in
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Boots GTM (GA4 + Pixel) so the conversion events above are delivered. */}
      <SiteAnalytics />
    </div>
  );
}
