/**
 * ConsentBanner — DPDP-style consent gate for analytics. Until the visitor
 * accepts, GTM/Pixel/GA do not load (handled in analytics.js). Lead capture works
 * regardless of consent (the inquiry API is the lawful first-party channel).
 */
import React, { useEffect, useState } from 'react';
import { bootAnalytics, getConsent, grantConsent, denyConsent } from '@/lib/analytics';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    bootAnalytics();
    if (!getConsent()) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(720px,calc(100%-2rem))] bg-[#0D1B2A] text-white rounded-xl shadow-2xl p-4 flex flex-wrap items-center gap-3 justify-between"
    >
      <p className="text-sm leading-relaxed opacity-90 flex-1 min-w-[260px]">
        We use cookies &amp; pixels to measure ad performance and improve your experience.
        You can accept or decline analytics tracking.
      </p>
      <div className="flex gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => { denyConsent(); setShow(false); }}
          className="px-4 h-10 rounded-md border border-white/40 text-white text-sm hover:bg-white/10 transition-colors"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => { grantConsent(); setShow(false); }}
          className="px-4 h-10 rounded-md bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
