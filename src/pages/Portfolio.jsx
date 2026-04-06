import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';
import ProjectCard from '../components/portfolio/ProjectCard';
import PortfolioFilters from '../components/portfolio/PortfolioFilters';
import { PROJECTS } from '@/lib/portfolioData';

export default function Portfolio() {
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');

  const filtered = PROJECTS.filter(p => {
    const matchType = propertyFilter === 'all' || p.property_type === propertyFilter;
    const matchStyle = styleFilter === 'all' || p.style === styleFilter;
    return matchType && matchStyle;
  });

  return (
    <>
      <PageHero
        title="Projects We've Supported"
        subtitle="These spaces were designed and built by our partner studios. We provided the advisory and matching."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioFilters
            propertyFilter={propertyFilter}
            styleFilter={styleFilter}
            onPropertyChange={setPropertyFilter}
            onStyleChange={setStyleFilter}
            total={filtered.length}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No projects found</p>
              <p className="text-sm">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground mt-10">
            All projects were executed by INTEXA's curated partner studios. We helped clients brief, match, and validate before work began.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}