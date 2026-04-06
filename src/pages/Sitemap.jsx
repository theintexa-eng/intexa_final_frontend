import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';

const sitemapData = [
  {
    category: 'Main Pages',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About INTEXA', path: '/about' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Process', path: '/process' },
      { label: 'Partners', path: '/partners' },
      { label: 'Contact', path: '/contact' },
      { label: 'Get Matched', path: '/get-matched' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
  {
    category: 'Services',
    links: [
      { label: 'All Services', path: '/services' },
      { label: 'Interior Design', path: '/services/interior' },
      { label: 'Exterior Design', path: '/services/exterior' },
      { label: 'Architecture', path: '/services/architecture' },
      { label: 'Vastu Consultancy', path: '/services/vastu' },
      { label: 'Green Building', path: '/services/green-building' },
    ],
  },
  {
    category: 'Spaces',
    links: [
      { label: 'All Spaces', path: '/spaces' },
      { label: 'Residential', path: '/spaces/residential' },
      { label: 'Commercial', path: '/spaces/commercial' },
      { label: 'Industrial', path: '/spaces/industrial' },
      { label: 'Hospitality', path: '/spaces/hospitality' },
      { label: 'Healthcare', path: '/spaces/healthcare' },
    ],
  },
  {
    category: 'Work & Portfolio',
    links: [
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Case Studies', path: '/case-studies' },
    ],
  },
  {
    category: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
    ],
  },
];

export default function Sitemap() {
  return (
    <>
      <PageHero title="Sitemap" subtitle="A complete overview of all pages on the INTEXA website." />

      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sitemapData.map((section) => (
              <div key={section.category}>
                <h2 className="font-display text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  {section.category}
                </h2>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}