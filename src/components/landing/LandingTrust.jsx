import React from 'react';
import { ShieldCheck, Ban, ClipboardList, Headphones, BadgeCheck, Lock } from 'lucide-react';

const trust = [
  { icon: ShieldCheck, title: 'Expert-driven recommendations', body: 'Every brand shortlist is curated by our advisory team — not an algorithm.' },
  { icon: Ban, title: 'No random vendor calls', body: 'We only connect you with brands once they\'ve been matched to your specific brief.' },
  { icon: ClipboardList, title: 'Structured project approach', body: 'We follow a defined process every time. No guesswork, no inconsistency.' },
  { icon: Headphones, title: '7-day post-match support', body: 'Our team stays available after the match to answer questions and guide your next steps.' },
  { icon: BadgeCheck, title: 'Only vetted partner brands', body: 'Every studio in our network has been evaluated for quality, reliability, and client outcomes.' },
  { icon: Lock, title: 'Your data stays private', body: 'We never share your contact details with brands without your explicit consent.' },
];

export default function LandingTrust() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Why Trust INTEXA</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Built for your peace of mind.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trust.map((item, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl border border-border hover:border-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}