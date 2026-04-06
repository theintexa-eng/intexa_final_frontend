import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { CASE_STUDIES } from '@/lib/caseStudiesData';

const display = CASE_STUDIES.slice(0, 3);

export default function CaseStudyPreview() {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Real Projects"
          title="Here's what we've helped people do"
          description="A few stories from homeowners and businesses who got clarity before starting their projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {display.map((c) => (
            <Link
              key={c.id}
              to={`/case-studies#${c.id}`}
              className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 group block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">{c.type}</span>
                  <span className="text-xs text-muted-foreground">{c.budget}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{c.shortTitle}</h3>
                <p className="text-sm text-muted-foreground">{c.outcome}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read case study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}