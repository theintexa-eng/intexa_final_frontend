import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PositioningBanner from '../components/home/PositioningBanner';
import ProblemSection from '../components/home/ProblemSection';
import SolutionSection from '../components/home/SolutionSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CaseStudyPreview from '../components/home/CaseStudyPreview';
import PortfolioPreview from '../components/home/PortfolioPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import FAQPreview from '../components/home/FAQPreview';
export default function Home() {
  return (
    <>
      <HeroSection />
      <PositioningBanner />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CaseStudyPreview />
      <PortfolioPreview />
      <TestimonialsSection />
<FAQPreview />
      <CTASection />
    </>
  );
}