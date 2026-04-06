import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

function toLabel(segment) {
  return labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  // Don't render on home page
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: toLabel(seg),
    path: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }));

  return (
    <div className="bg-primary/5 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
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
                <Link to={crumb.path} className="hover:text-accent transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}