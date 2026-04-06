import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-primary py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src="https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/260efcddc_FinalLogoTransparentwhitetext.png"
              alt="INTEXA"
              className="h-7"
            />
            <p className="text-white/40 text-xs">Independent Project Advisory · Delhi NCR</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a href="tel:+919217919111" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" /> +91 9217 919 111
            </a>
            <a href="mailto:team@intexa.in" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" /> team@intexa.in
            </a>
          </div>

          <div className="flex gap-5 text-xs text-white/40">
            <Link to="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link to="/" className="hover:text-white/60 transition-colors">Main Site</Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} INTEXA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}