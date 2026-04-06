import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const styleLabel = {
  modern: 'Modern', contemporary: 'Contemporary', traditional: 'Traditional',
  minimalist: 'Minimalist', industrial: 'Industrial', luxury: 'Luxury', eclectic: 'Eclectic',
};

const typeLabel = {
  apartment: 'Apartment', villa: 'Villa', penthouse: 'Penthouse', office: 'Office',
  retail: 'Retail', restaurant: 'Restaurant', hotel: 'Hotel', clinic: 'Clinic',
};

export default function ProjectCard({ project }) {
  return (
    <Link to={`/portfolio/${project.slug}`} className="group block rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {typeLabel[project.property_type] || project.property_type}
          </span>
          <span className="bg-accent/90 text-accent-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {styleLabel[project.style] || project.style}
          </span>
        </div>
        {project.featured && (
          <span className="absolute top-3 right-3 bg-white text-xs font-bold text-primary px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-accent transition-colors">{project.title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          {project.city} · {project.area_sqft ? `${project.area_sqft} sq ft` : ''} · {project.budget_utilized}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">by <span className="font-medium text-foreground">{project.partner_studio}</span></span>
          <span className="flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            View Project <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}