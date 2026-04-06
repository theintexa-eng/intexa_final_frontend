import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69bfb099e86c6c89f5403668/363084f50_generated_14d29f2f.png"
          alt="Premium interior space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/70 to-[#0D1B2A]/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Trusted Advisory for Interior, Exterior & Architectural Projects
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] mb-6">
            Stop guessing.<br />
            Start building right.
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6 max-w-lg">
            Planning an interior or architecture project? Before you speak to a single designer — talk to us.
          </p>

          <ul className="space-y-2 mb-10 text-white/70 text-sm">
            <li className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> We help you understand your real budget</li>
            <li className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> We shortlist 2–3 curated brands who actually fit your project</li>
            <li className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> We protect you from costly mistakes before they happen</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact?service=studio_matching">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-14 text-sm font-semibold tracking-wide">
                Start Brand Matching
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-8 h-14 text-sm font-semibold tracking-wide shadow-none">
                Talk to Us First
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-white/60 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}