import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Raghav Mehra',
    location: 'Gurgaon',
    project: 'Residential · ₹22 Lakhs',
    rating: 5,
    quote: 'INTEXA saved us from a massive mistake. We were about to sign with a designer who didn\'t understand our budget at all. After the consultation, we got matched with a studio that delivered exactly what we wanted — on time and within budget.'
  },
  {
    name: 'Priya Nair',
    location: 'Noida',
    project: 'Residential · ₹18 Lakhs',
    rating: 5,
    quote: 'As first-time homeowners, we had no idea where to start. INTEXA structured everything — our requirements, budget, and helped us compare proposals. Worth every rupee of the consultation fee.'
  },
  {
    name: 'Ankit Sharma',
    location: 'Delhi',
    project: 'Commercial · ₹38 Lakhs',
    rating: 5,
    quote: 'The BOQ audit alone saved us ₹6 lakhs. I didn\'t even know I was being overcharged until INTEXA reviewed the quotes. Highly recommend for any project above ₹25L.'
  }
];

const stats = [
  { value: '200+', label: 'Projects Supported' },
  { value: '₹6L+', label: 'Average Savings per Client' },
  { value: '4.9/5', label: 'Client Satisfaction' },
  { value: '48hrs', label: 'Match Delivered In' },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= count ? 'fill-accent text-accent' : 'text-muted-foreground/20'}`} />
      ))}
    </div>
  );
}

export default function LandingProof() {
  return (
    <section className="py-16 lg:py-20 bg-[#F7F5F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-5 text-center border border-border">
              <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Real Clients. Real Outcomes.</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3">
            What our clients say
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-border flex flex-col gap-4">
              <Quote className="w-6 h-6 text-accent/40" />
              <p className="text-sm text-foreground leading-relaxed flex-1">"{t.quote}"</p>
              <div>
                <Stars count={t.rating} />
                <p className="font-semibold text-sm mt-2">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location} · {t.project}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}