import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '@/lib/caseStudiesData';

// Map service/space slugs → relevant case types
const typeMap = {
  interior: ['residential', 'commercial'],
  exterior: ['residential'],
  architecture: ['residential', 'commercial'],
  vastu: ['residential'],
  'green-building': ['residential', 'commercial'],
  residential: ['residential'],
  commercial: ['commercial'],
  industrial: ['commercial'],
  hospitality: ['hospitality'],
  healthcare: ['residential'],
};

export default function MiniCaseStudies({ slug }) {
  const relevant = slug
    ? CASE_STUDIES.filter(c => (typeMap[slug] || []).includes(c.typeSlug))
    : CASE_STUDIES.slice(0, 3);

  const display = relevant.length ? relevant : CASE_STUDIES.slice(0, 2);

  return (
    <section className="py-16 lg:py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Real Results</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mt-1">Projects like yours</h2>
          </div>
          <Link to="/case-studies" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            All case studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((cs) => (
            <Link
              key={cs.id}
              to={`/case-studies#${cs.id}`}
              className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded capitalize">{cs.type}</span>
                  <span className="text-xs text-muted-foreground">{cs.budget}</span>
                </div>
                <h4 className="font-semibold text-sm mb-2">{cs.shortTitle}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{cs.outcome}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View all case studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}