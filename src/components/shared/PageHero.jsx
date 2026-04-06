import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home } from 'lucide-react';

const labelMap = {
  about: 'About',
  services: 'Services',
  spaces: 'Spaces',
  pricing: 'Pricing',
  process: 'Process',
  'case-studies': 'Case Studies',
  portfolio: 'Portfolio',
  partners: 'Partners',
  contact: 'Contact',
  faq: 'FAQ',
  'get-matched': 'Get Matched',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  interior: 'Interior',
  exterior: 'Exterior',
  architecture: 'Architecture',
  vastu: 'Vastu Consultancy',
  'green-building': 'Green Building',
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
  hospitality: 'Hospitality',
  healthcare: 'Healthcare',
};

function toLabel(seg) {
  return labelMap[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function PageBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return null;

  const crumbs = segments.map((seg, i) => ({
    label: toLabel(seg),
    path: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }));

  return (
    <div className="bg-primary/5 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-1 text-xs text-muted-foreground flex-wrap">
        <Link to="/" className="flex items-center gap-1 hover:text-accent transition-colors">
          <Home className="w-3 h-3" />
          <span>Home</span>
        </Link>
        {crumbs.map((crumb) => (
          <React.Fragment key={crumb.path}>
            <ChevronRight className="w-3 h-3 flex-shrink-0 text-muted-foreground/50" />
            {crumb.isLast ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-accent transition-colors">{crumb.label}</Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

export default function PageHero({ title, subtitle, showCTA = false }) {
  return (
    <>
      <section className="relative bg-primary pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/70 max-w-xl mx-auto">{subtitle}</p>
          )}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link to="/contact?service=studio_matching">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12">
                  Start Brand Matching
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 px-8 h-12">
                  Talk to Us First
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      <PageBreadcrumbs />
    </>
  );
}