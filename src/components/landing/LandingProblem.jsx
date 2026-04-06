import React from 'react';
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    stat: '60%',
    title: 'Projects exceed budget',
    body: 'Most homeowners have no way to validate if a designer\'s quote is fair. They overpay by ₹3–8 lakhs without realising it.'
  },
  {
    icon: TrendingDown,
    stat: '3–6 weeks',
    title: 'Wasted comparing quotes',
    body: 'You collect 5 proposals, meet 6 designers, and still aren\'t sure. The process is exhausting — and you haven\'t even started yet.'
  },
  {
    icon: Clock,
    stat: '1 in 3',
    title: 'Projects go wrong mid-way',
    body: 'Misaligned expectations, wrong studio fit, scope creep. By the time you realise, you\'re too deep to turn back.'
  }
];

export default function LandingProblem() {
  return (
    <section className="py-16 lg:py-20 bg-[#F7F5F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Sound Familiar?</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Planning an interior project is harder than it looks.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Thousands of homeowners in Delhi NCR start their projects feeling excited — and end up stressed, confused, or overpaying. Here's why.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-7 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-red-500" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">{p.stat}</span>
              </div>
              <h3 className="font-semibold text-base mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}