import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);


export default function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img
              src="https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/260efcddc_FinalLogoTransparentwhitetext.png"
              alt="INTEXA"
              className="h-8 mb-4" />
            
            <p className="text-sm leading-relaxed text-white/60">We help you plan your project and match you with the right brands for your next interior, architectural, or green building project.

            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/contact?service=studio_matching" className="inline-block text-xs bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors">Start Brand Matching →</Link>
              <Link to="/partners" className="inline-block text-xs bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors">Become a Partner →</Link>
            </div>

          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Services</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Interior', slug: 'interior' },
                { label: 'Exterior', slug: 'exterior' },
                { label: 'Architecture', slug: 'architecture' },
                { label: 'Vastu Consultancy', slug: 'vastu' },
                { label: 'Green Building', slug: 'green-building' },
              ].map(({ label, slug }) =>
                <Link key={slug} to={`/services/${slug}`} className="block text-sm hover:text-accent transition-colors">
                  {label}
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Company</h4>
            <div className="space-y-2.5">
              {[
              { label: 'Process', path: '/process' },
              { label: 'Pricing', path: '/pricing' },
              { label: 'Case Studies', path: '/case-studies' },
              { label: 'Portfolio', path: '/portfolio' },
              { label: 'Partners', path: '/partners' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }].
              map(({ label, path }) =>
              <Link key={path} to={path} className="block text-sm hover:text-accent transition-colors">
                  {label}
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919217919111" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" /> +91 9217 919 111
              </a>
              <a href="mailto:team@intexa.in" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" /> team@intexa.in
              </a>
              <p className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Delhi NCR, India
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5 flex-wrap">
              {[
                { href: 'https://www.instagram.com/_intexa.in/', icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                { href: 'https://www.linkedin.com/company/intexain/', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                { href: 'https://www.facebook.com/people/Intexain/61582207748703/', icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                { href: 'https://www.youtube.com/@theintexa', icon: <Youtube className="w-4 h-4" />, label: 'YouTube' },
                { href: 'https://x.com/theintexa', icon: <XIcon />, label: 'X' },
                { href: 'https://www.pinterest.com/theintexa/', icon: <PinterestIcon />, label: 'Pinterest' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors text-white/70">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} INTEXA. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link to="/privacy-policy" className="text-xs text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link to="/about" className="text-xs text-white/40 hover:text-white/60 transition-colors">About</Link>
            <Link to="/contact" className="text-xs text-white/40 hover:text-white/60 transition-colors">Contact</Link>
            <Link to="/sitemap" className="text-xs text-white/40 hover:text-white/60 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>);

}