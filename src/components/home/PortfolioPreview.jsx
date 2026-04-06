import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { PROJECTS } from '@/lib/portfolioData';

// Show up to 6 — featured first
const display = [
  ...PROJECTS.filter(p => p.featured),
  ...PROJECTS.filter(p => !p.featured),
].slice(0, 6);

export default function PortfolioPreview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Partner Studio Work"
          title="Spaces we've helped bring to life"
          description="These projects were executed by our partner studios. INTEXA provided the advisory and studio matching."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {display.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer block"
            >
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-sm font-semibold block">{project.title}</span>
                {project.city && <span className="text-white/70 text-xs">{project.city}</span>}
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          * Projects executed by partner studios.
        </p>

        <div className="text-center mt-6">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            View Full Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}