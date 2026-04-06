import React from 'react';
import { ShieldCheck, Users, Scale, ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'We validate your project before you commit',
    body: 'Budget realistic? Scope clear? Requirements well-defined? We check all of this in one structured session — before you spend a single rupee with a designer.'
  },
  {
    icon: Users,
    title: 'We match you with the right brands — not just any brands',
    body: 'We shortlist 2–3 studios from our curated network who specialize in your project type, can deliver within your budget, and align with your style.'
  },
  {
    icon: Scale,
    title: 'We are 100% on your side',
    body: 'INTEXA is not a studio. Not a contractor. We earn nothing from the brands we recommend. Our only incentive is to get your project right.'
  }
];

export default function LandingSolution() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">The INTEXA Difference</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            A trusted advisor in your corner — before you meet a single designer.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            We sit between you and the market. Our job: make sure you're informed, protected, and matched right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div key={i} className="group relative rounded-xl p-7 border border-border hover:border-accent/40 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-base mb-3 leading-snug">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Differentiator strip */}
        <div className="mt-10 bg-primary rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-base text-center sm:text-left">
            INTEXA is not a marketplace. Not a directory. It's a guided advisory process.
          </p>
          <button
            onClick={() => document.getElementById('get-matched-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 px-6 h-11 rounded-md font-semibold text-sm transition-colors"
          >
            Start My Project <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}