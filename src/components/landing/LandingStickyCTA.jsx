import React, { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function LandingStickyCTA({ bookingMode } = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (~80vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onCta = () => {
    if (bookingMode) {
      trackEvent('schedule_consultation', { loc: 'sticky' });
      document.getElementById('book-consultation')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    document.getElementById('get-matched-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border px-4 py-3 shadow-lg">
      <button
        onClick={onCta}
        data-cta={bookingMode ? 'book-consultation' : undefined}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-lg font-semibold text-sm transition-colors"
      >
        {bookingMode ? 'Book My Free Consultation →' : 'Get Matched with the Right Brands →'}
      </button>
      <p className="text-center text-xs text-muted-foreground mt-1.5">
        {bookingMode ? 'Free · 30 minutes · Google Meet' : 'Free to submit · Pay only after your match'}
      </p>
    </div>
  );
}