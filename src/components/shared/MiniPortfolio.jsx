import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/portfolioData';

// Maps service/space slugs to portfolio property_type values
const slugToPropertyTypes = {
  interior: ['apartment', 'villa', 'penthouse'],
  exterior: ['villa', 'penthouse'],
  architecture: ['apartment', 'villa', 'penthouse', 'office'],
  vastu: ['apartment', 'villa', 'penthouse'],
  'green-building': ['apartment', 'villa', 'office'],
  residential: ['apartment', 'villa', 'penthouse'],
  commercial: ['office', 'retail'],
  industrial: ['office', 'retail'],
  hospitality: ['restaurant', 'hotel'],
  healthcare: ['clinic'],
};

export default function MiniPortfolio({ slug }) {
  const types = slugToPropertyTypes[slug];
  const filtered = types
    ? PROJECTS.filter(p => types.includes(p.property_type))
    : PROJECTS;

  const display = filtered.slice(0, 4);

  if (display.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Portfolio</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mt-1">Work from our partner studios</h2>
          </div>
          <Link to="/portfolio" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            Full portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {display.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="relative group rounded-xl overflow-hidden aspect-square block"
            >
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-start justify-end p-3">
                <span className="text-white text-xs font-semibold">{project.title}</span>
                {project.city && <span className="text-white/70 text-[10px]">{project.city}</span>}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link to="/portfolio" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View full portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}