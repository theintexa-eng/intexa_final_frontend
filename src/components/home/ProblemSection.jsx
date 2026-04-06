import React from 'react';
import { AlertTriangle, TrendingUp, HelpCircle } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const problems = [
  {
    icon: TrendingUp,
    title: 'Your budget goes out of control',
    description: 'Most home projects end up costing 30–50% more than expected. Not because of bad luck — but because no one validated the budget upfront.'
  },
  {
    icon: HelpCircle,
    title: 'You pick the wrong designer',
    description: 'You browse Instagram, collect quotes, and still aren\'t sure. Without proper vetting, you\'re taking a ₹20L+ gamble on someone you barely know.'
  },
  {
    icon: AlertTriangle,
    title: 'No one explains what\'s fair',
    description: 'Every designer gives a different quote. You have no way to know what\'s reasonable — so you end up overpaying or going with the cheapest option.'
  }
];

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Sound Familiar?"
          title="Why Most Home Projects Go Wrong"
          description="We hear the same stories over and over from homeowners across Delhi NCR. You don't have to go through this."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}