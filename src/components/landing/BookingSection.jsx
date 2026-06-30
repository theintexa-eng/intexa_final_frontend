import React from 'react';
import { CalendarCheck, Clock, Video, ShieldCheck } from 'lucide-react';
import { BOOKING_URL, BOOKING_EMBED_URL } from '@/lib/lpConfig';
import { trackEvent } from '@/lib/analytics';

/**
 * BookingSection — appointment-first bottom CTA for the consultation LP.
 * Renders the headline + value copy, an embedded Google Appointment Scheduler
 * (team@intexa.in), and a button fallback that opens the booking page in a new tab.
 * id="book-consultation" is the scroll target every CTA on the page points to.
 */
export default function BookingSection({ angle = 'consultation' }) {
  const openBooking = (loc) => {
    trackEvent('schedule_consultation', { angle, loc, method: 'new_tab' });
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="book-consultation" className="bg-primary text-primary-foreground py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          Ready to Discuss Your Interior Project?
        </h2>
        <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          Book a free 30-minute consultation with an independent INTEXA advisor. Get a clear plan,
          a realistic budget and the right brand match — independent guidance that can help you save
          up to 10–15% through better planning and smarter decisions.
        </p>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80 mb-8">
          <span className="inline-flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-accent" /> Free, no obligation</span>
          <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> 30 minutes</span>
          <span className="inline-flex items-center gap-2"><Video className="w-4 h-4 text-accent" /> Google Meet</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Independent advice</span>
        </div>

        <button
          onClick={() => openBooking('booking_section_button')}
          data-cta="book-consultation"
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-14 rounded-md font-semibold text-sm tracking-wide transition-colors"
        >
          Book Free 30-Min Consultation →
        </button>
      </div>

      {/* Embedded scheduler */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <iframe
            src={BOOKING_EMBED_URL}
            title="Book a free 30-minute interior consultation with INTEXA"
            className="w-full h-[640px] border-0"
            loading="lazy"
          />
        </div>
        <p className="text-center text-primary-foreground/50 text-xs mt-4">
          Trouble loading the calendar?{' '}
          <button onClick={() => openBooking('booking_section_fallback')} className="underline hover:text-primary-foreground">
            Open the booking page →
          </button>
        </p>
      </div>
    </section>
  );
}
