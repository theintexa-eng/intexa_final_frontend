import React from 'react';
import SectionHeading from '../shared/SectionHeading';

const steps = [
  { num: '01', title: 'Tell us about your project', desc: 'Share your space, budget, and what you want. A 30-minute structured conversation — no jargon, no pressure.' },
  { num: '02', title: 'We match you with the right brands', desc: 'We shortlist 2–3 curated brands that actually fit — right specialization, right style, right budget range.' },
  { num: '03', title: 'You start with confidence', desc: 'Pick your brand, begin your project. No confusion, no regret — just a clear path forward.' }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="Simple. Clear. No confusion."
          description="From your first call to meeting your designer — here's exactly what happens."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-white/10 -translate-x-1/2" />
              )}
              <div className="text-center">
                <span className="text-accent font-display text-4xl font-bold">{step.num}</span>
                <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}