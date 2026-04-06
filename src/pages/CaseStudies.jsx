import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';
import SectionHeading from '../components/shared/SectionHeading';
import TestimonialSlider from '../components/shared/TestimonialSlider';
import { CASE_STUDIES } from '@/lib/caseStudiesData';

export default function CaseStudies() {
  const { hash } = useLocation();

  // Scroll to anchor when navigating from another page
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [hash]);

  return (
    <>
      <PageHero title="Real stories. Real results." subtitle="Here's how we've helped homeowners and businesses get their projects right." />

      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} id={cs.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow scroll-mt-28">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[4/3] lg:aspect-auto">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">{cs.type}</span>
                    <span className="text-xs text-muted-foreground">Budget: {cs.budget}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-6">{cs.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">The Problem</h4>
                      <p className="text-sm leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">What We Did</h4>
                      <p className="text-sm leading-relaxed">{cs.role}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">The Result</h4>
                      <p className="text-sm leading-relaxed font-medium">{cs.fullOutcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Client Testimonials"
            title="What our clients say"
            description="In their own words — from people who came to us confused and left with a clear plan."
            light
          />
          <TestimonialSlider light />
        </div>
      </section>

      <CTASection />
    </>
  );
}