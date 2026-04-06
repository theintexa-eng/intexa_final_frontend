import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Share your project details',
    desc: 'Fill a quick form — your space, budget, timeline, and what you\'re looking for. Takes 2 minutes.',
    note: 'No obligation. No commitment.'
  },
  {
    num: '02',
    title: 'We analyse your requirements',
    desc: 'Our team reviews your inputs and schedules a 30-minute structured consultation call.',
    note: 'Real people. No bots.'
  },
  {
    num: '03',
    title: 'Get your curated brand shortlist',
    desc: 'We match you with 2–3 studios who genuinely fit your project — style, budget, and specialization.',
    note: 'You choose. We advise.'
  },
  {
    num: '04',
    title: 'Start your project with confidence',
    desc: 'Begin your project knowing you\'ve made an informed decision with expert backing.',
    note: '7-day post-match support included.'
  }
];

export default function LandingProcess() {
  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">How It Works</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mt-3 mb-4">
            From confused to confident — in 4 steps.
          </h2>
          <p className="text-white/55 max-w-xl mx-auto text-sm leading-relaxed">
            We've structured the entire process so there's zero guesswork at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white/5 border border-white/10 rounded-xl p-6">
              <span className="font-display text-4xl font-bold text-accent/40">{step.num}</span>
              <h3 className="text-white font-semibold text-base mt-3 mb-2 leading-snug">{step.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{step.desc}</p>
              <span className="inline-block text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1">
                {step.note}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => document.getElementById('get-matched-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 h-13 rounded-md font-semibold text-sm tracking-wide transition-colors py-4"
          >
            Get Matched with the Right Brands →
          </button>
          <p className="text-white/30 text-xs mt-3">₹2,999 one-time. Pay only after your match is confirmed.</p>
        </div>
      </div>
    </section>
  );
}