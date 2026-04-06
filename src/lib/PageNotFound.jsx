import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Phone } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <img
        src="https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/260efcddc_FinalLogoTransparentwhitetext.png"
        alt="INTEXA"
        className="h-8 mb-16 opacity-80"
      />

      {/* 404 */}
      <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
        Page Not Found
      </span>
      <h1 className="font-display text-[8rem] md:text-[12rem] font-bold text-white/10 leading-none select-none">
        404
      </h1>

      {/* Message */}
      <div className="-mt-6 mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">
          This page doesn't exist — but your project does.
        </h2>
        <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
          You may have followed a broken link or mistyped the address. Let us help you find what you're actually looking for — the right studio for your next project.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12 font-semibold">
            <Home className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
        <Link to="/contact?service=studio_matching">
          <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 px-8 h-12 font-semibold">
            Start Brand Matching
          </Button>
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 justify-center">
        {[
          { label: 'Services', to: '/services' },
          { label: 'Pricing', to: '/pricing' },
          { label: 'Process', to: '/process' },
          { label: 'About', to: '/about' },
          { label: 'Contact', to: '/contact' },
        ].map(({ label, to }) => (
          <Link key={to} to={to} className="text-xs text-white/40 hover:text-accent transition-colors">
            {label}
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-16 text-xs text-white/20">
        © {new Date().getFullYear()} INTEXA · Delhi NCR, India
      </p>
    </div>
  );
}