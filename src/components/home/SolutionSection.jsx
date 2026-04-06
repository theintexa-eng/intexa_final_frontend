import React from 'react';
import { Shield, Users, Scale } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const solutions = [
  {
    icon: Shield,
    title: 'We understand your project first',
    description: 'In a 30-minute structured consultation, we understand your space, budget, and what you actually want — then create a clear brief before you talk to anyone.'
  },
  {
    icon: Users,
    title: 'We find the right brands for you',
    description: 'We shortlist 2–3 curated brands who specialize in your project type and can deliver within your budget. No random referrals.'
  },
  {
    icon: Scale,
    title: 'We\'re on your side — always',
    description: 'INTEXA is not a designer. INTEXA is not a contractor. We\'re an independent advisory consultancy. Our only job is to make sure you make the right decision.'
  }
];

export default function SolutionSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How INTEXA Helps"
          title="Clarity before you commit a single rupee"
          description="We sit down with you, understand your project, and make sure you walk in to your first designer meeting fully prepared."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-px bg-gradient-to-b from-accent/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white rounded-xl p-8 border border-border h-full">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}