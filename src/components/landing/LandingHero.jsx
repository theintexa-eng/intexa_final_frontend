import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';

export default function LandingHero() {
  const scrollToForm = () => {
    document.getElementById('get-matched-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop"
          alt="Premium interior"
          className="w-full h-full object-cover object-center"
        />
        {/* Strong dark overlay for full text legibility */}
        <div className="absolute inset-0 bg-[#0D1B2A]/85" />
        {/* Subtle bottom fade to solid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8"
        >
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="text-white/80 text-xs font-medium">Trusted by 200+ homeowners & developers · Delhi NCR</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-5"
        >
          Don't pick a designer<br className="hidden sm:block" /> until you've spoken to us.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4"
        >
          INTEXA is an independent project advisor. We understand your space, validate your budget, and match you with 2–3 curated brands — so your ₹15L–₹50L+ project starts right.
        </motion.p>

        {/* Proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-1 mb-10"
        >
          {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-accent text-accent" />)}
          <span className="text-white/50 text-sm ml-2">4.9/5 from 80+ clients</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={scrollToForm}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-14 rounded-md font-semibold text-sm tracking-wide transition-colors"
          >
            Get Matched with the Right Brands →
          </button>
          <a
            href="tel:+917763840602"
            className="border border-white/25 bg-transparent text-white hover:bg-white/10 px-8 h-14 rounded-md font-semibold text-sm tracking-wide transition-colors flex items-center justify-center"
          >
            Call Us: +91 7763840602
          </a>
        </motion.div>

        {/* Micro-copy */}
        <p className="text-white/35 text-xs mt-5">
          No spam. No random vendor calls. We only connect you with brands that actually fit your project.
        </p>
      </div>
    </section>
  );
}