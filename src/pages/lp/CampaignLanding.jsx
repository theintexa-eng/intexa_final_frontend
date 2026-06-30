/**
 * CampaignLanding — one parametric Meta Ads landing page driven by `angle`.
 * Composes the EXISTING production landing/* sections (reuse-first); only the hero
 * copy + SEO + form service-interest vary per angle (via lpConfig).
 */
import React, { useEffect } from 'react';
import { ANGLES, DEFAULT_ANGLE, LP_FAQS, HERO_IMAGE, lpSeo } from '@/lib/lpConfig';
import { useUtm } from '@/hooks/useUtm';
import { trackEvent } from '@/lib/analytics';
import Seo from '@/components/lp/Seo';
import LandingHero from '@/components/landing/LandingHero';
import LandingProblem from '@/components/landing/LandingProblem';
import LandingSolution from '@/components/landing/LandingSolution';
import LandingProcess from '@/components/landing/LandingProcess';
import LandingProof from '@/components/landing/LandingProof';
import LandingTrust from '@/components/landing/LandingTrust';
import LandingForm from '@/components/landing/LandingForm';
import BookingSection from '@/components/landing/BookingSection';
import FAQAccordion from '@/components/shared/FAQAccordion';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingStickyCTA from '@/components/landing/LandingStickyCTA';

export default function CampaignLanding({ angle = DEFAULT_ANGLE }) {
  const cfg = ANGLES[angle] || ANGLES[DEFAULT_ANGLE];
  // Appointment-first mode (Google Appointment Scheduler) when the angle defines a bookingUrl.
  const bookingMode = Boolean(cfg.bookingUrl);
  const faqs = cfg.faqs || LP_FAQS;

  useUtm();
  useEffect(() => {
    trackEvent('page_view', { angle, landing_path: `/lp/${angle}` });
  }, [angle]);

  return (
    <div className="min-h-screen bg-background">
      <Seo {...lpSeo(angle)} />
      <LandingHero
        angle={angle}
        eyebrow={cfg.eyebrow}
        title={cfg.title}
        subtitle={cfg.subtitle}
        ctaLabel={cfg.ctaLabel}
        image={HERO_IMAGE}
        bookingMode={bookingMode}
      />
      <LandingProblem bookingMode={bookingMode} />
      <LandingSolution bookingMode={bookingMode} />
      <LandingProcess bookingMode={bookingMode} />
      <LandingProof bookingMode={bookingMode} />
      <LandingTrust />
      {bookingMode
        ? <BookingSection angle={angle} />
        : <LandingForm angle={angle} serviceInterest={cfg.serviceInterest} />}
      <FAQAccordion faqs={faqs} label="FAQ" title="Common questions" description={bookingMode ? 'Quick answers before you book your free consultation.' : 'Quick answers before you book.'} />
      <LandingFooter />
      <LandingStickyCTA bookingMode={bookingMode} />
    </div>
  );
}
