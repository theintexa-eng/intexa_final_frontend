import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-mid border-t-4 border-accent/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
          Take the First Step
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mt-4 mb-6">
          Don't start your project without this conversation.
        </h2>
        <p className="text-white/60 mb-10 max-w-lg mx-auto">
          A 30-minute structured consultation with INTEXA can save you months of confusion and lakhs of rupees. You only pay once we match you with the right brand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact?service=studio_matching">
            <Button className="bg-accent text-accent-foreground hover:bg-gold-light px-10 h-14 text-sm font-semibold">
              Start Brand Matching
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-10 h-14 text-sm font-semibold shadow-none">
              Talk to Us First
            </Button>
          </Link>
        </div>
      </div>
    </section>);

}