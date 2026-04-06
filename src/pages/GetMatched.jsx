import React from 'react';
import LandingHero from '../components/landing/LandingHero';
import LandingProblem from '../components/landing/LandingProblem';
import LandingSolution from '../components/landing/LandingSolution';
import LandingProcess from '../components/landing/LandingProcess';
import LandingProof from '../components/landing/LandingProof';
import LandingTrust from '../components/landing/LandingTrust';
import LandingForm from '../components/landing/LandingForm';
import LandingFooter from '../components/landing/LandingFooter';
import LandingStickyCTA from '../components/landing/LandingStickyCTA';

export default function GetMatched() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHero />
      <LandingProblem />
      <LandingSolution />
      <LandingProcess />
      <LandingProof />
      <LandingTrust />
      <LandingForm />
      <LandingFooter />
      <LandingStickyCTA />
    </div>
  );
}