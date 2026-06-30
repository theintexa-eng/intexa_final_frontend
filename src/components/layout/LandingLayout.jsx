/**
 * LandingLayout — stripped, conversion-focused chrome for the Meta Ads LPs.
 * No global Navbar (no exits). Compact header (logo + click-to-call + Book CTA),
 * WhatsApp button, and the consent banner. The page itself renders LandingFooter
 * + LandingStickyCTA (matching the existing landing composition).
 */
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import WhatsAppButton from '../shared/WhatsAppButton';
import SiteAnalytics from '../SiteAnalytics';
import { trackEvent } from '@/lib/analytics';
import { LP_PHONE, LP_PHONE_DISPLAY } from '@/lib/lpConfig';

const LOGO = 'https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/260efcddc_FinalLogoTransparentwhitetext.png';

function LpHeader() {
  const location = useLocation();
  // Appointment-first nav for the consultation LP: single "Book Free Consultation" CTA, no phone.
  const bookingMode = location.pathname.startsWith('/lp/consultation');
  const onCta = () => {
    if (bookingMode) {
      trackEvent('schedule_consultation', { loc: 'header' });
      document.getElementById('book-consultation')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    trackEvent('cta_click', { loc: 'header' });
    document.getElementById('get-matched-form')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="sticky top-0 z-40 bg-[#0D1B2A] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="INTEXA — back to top">
          <img src={LOGO} alt="INTEXA" className="h-7 w-auto" />
        </button>
        <div className="flex items-center gap-3">
          {!bookingMode && (
            <a href={`tel:${LP_PHONE}`} className="hidden sm:inline text-white/80 text-sm hover:text-white transition-colors">
              {LP_PHONE_DISPLAY}
            </a>
          )}
          <button type="button" onClick={onCta} data-cta={bookingMode ? 'book-consultation' : undefined} className="bg-accent text-accent-foreground text-sm font-semibold px-4 h-10 rounded-md hover:bg-accent/90 transition-colors">
            {bookingMode ? 'Book Free Consultation' : 'Book ₹2,999'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default function LandingLayout() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LpHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <WhatsAppButton />
      <SiteAnalytics />
    </div>
  );
}
