import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Clock, Video, ShieldCheck } from 'lucide-react';
import { CALENDLY_URL } from '@/lib/lpConfig';
import { trackEvent } from '@/lib/analytics';
import { getUtm } from '@/hooks/useUtm';
import {
  loadCalendly,
  buildCalendlyUrl,
  isCalendlyMessage,
  bookingIdFromPayload,
  CALENDLY_EVENTS,
} from '@/lib/calendly';

/**
 * BookingSection — appointment-first bottom CTA for the consultation LP.
 * Renders the value copy + an embedded Calendly widget (Free 30-Min Interior Project
 * Consultation, team@intexa.in) and listens to the Calendly booking lifecycle to fire
 * analytics and redirect to the branded /lp/thank-you page on a confirmed booking.
 * id="book-consultation" is the scroll target every CTA on the page points to.
 */
export default function BookingSection({ angle = 'consultation' }) {
  const navigate = useNavigate();
  const widgetRef = useRef(null);
  const startedRef = useRef(false);
  const doneRef = useRef(false);
  // Build the embed URL once (with captured UTMs) so it stays stable across renders.
  const [embedUrl] = useState(() => buildCalendlyUrl(CALENDLY_URL));

  // Load the widget assets and mount the inline embed.
  useEffect(() => {
    let cancelled = false;
    loadCalendly().then(() => {
      if (cancelled || !window.Calendly || !widgetRef.current) return;
      widgetRef.current.innerHTML = '';
      window.Calendly.initInlineWidget({ url: embedUrl, parentElement: widgetRef.current });
    });
    return () => { cancelled = true; };
  }, [embedUrl]);

  // Booking lifecycle → analytics + redirect. Guards prevent duplicate events.
  useEffect(() => {
    const onMsg = (e) => {
      if (typeof e.origin !== 'string' || e.origin.indexOf('calendly.com') === -1) return;
      if (!isCalendlyMessage(e)) return;
      const { event, payload } = e.data;

      if (event === CALENDLY_EVENTS.slotSelected && !startedRef.current) {
        startedRef.current = true;
        trackEvent('booking_started', { angle, provider: 'calendly' });
      }

      if (event === CALENDLY_EVENTS.scheduled && !doneRef.current) {
        doneRef.current = true;
        const id = bookingIdFromPayload(payload);
        try {
          sessionStorage.setItem(
            'intexa_booking',
            JSON.stringify({ id, ts: Date.now(), angle, utm: getUtm() }),
          );
        } catch { /* ignore storage errors */ }
        trackEvent('booking_completed', { angle, provider: 'calendly', event_id: id });
        trackEvent('calendly_redirect', { angle, event_id: id });
        // Let the dataLayer flush, then hand off to the branded thank-you page.
        setTimeout(() => navigate('/lp/thank-you'), 350);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [angle, navigate]);

  // CTA / fallback → open the Calendly popup (same UTM-tagged URL).
  const openPopup = (loc) => {
    trackEvent('schedule_consultation', { angle, loc, method: 'popup' });
    if (window.Calendly) window.Calendly.initPopupWidget({ url: embedUrl });
    else window.open(embedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="book-consultation" className="bg-primary text-primary-foreground py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          Ready to Discuss Your Interior Project?
        </h2>
        <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-3">
          Book a free 30-minute call with an independent INTEXA advisor — get a clear plan, a
          realistic budget, and 2–3 vetted brands matched to your project. Better planning can save
          you 10–15% and a lot of costly mistakes.
        </p>
        <p className="text-accent text-sm font-medium mb-6">
          Limited slots each week — booked one-on-one with a senior advisor.
        </p>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80 mb-8">
          <span className="inline-flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-accent" /> Free, no obligation</span>
          <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> 30 minutes</span>
          <span className="inline-flex items-center gap-2"><Video className="w-4 h-4 text-accent" /> Google Meet</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Independent advice</span>
        </div>

        <button
          onClick={() => openPopup('booking_section_button')}
          data-cta="book-consultation"
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-14 rounded-md font-semibold text-sm tracking-wide transition-colors"
        >
          Book My Free Consultation →
        </button>
      </div>

      {/* Embedded Calendly scheduler */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <div
            ref={widgetRef}
            style={{ minWidth: 320, height: 700 }}
            aria-label="Book a free 30-minute interior consultation with INTEXA"
          />
        </div>
        <p className="text-center text-primary-foreground/50 text-xs mt-4">
          Trouble loading the calendar?{' '}
          <button onClick={() => openPopup('booking_section_fallback')} className="underline hover:text-primary-foreground">
            Open the booking page →
          </button>
        </p>
      </div>
    </section>
  );
}
