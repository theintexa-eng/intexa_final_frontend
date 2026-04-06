import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PositioningBanner() {
  return (
    <section className="bg-accent/10 border-y border-accent/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">Just so you know</p>
        <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
          INTEXA is not a designer. INTEXA is not a contractor.
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-4">
          We are an independent advisory consultancy that helps you plan your project and match you with the right brands — so you start with confidence, not confusion.
        </p>
        <Link to="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          More About INTEXA <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}