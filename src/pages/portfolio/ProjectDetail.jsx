import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CTASection from '../../components/home/CTASection';
import { MapPin, Clock, IndianRupee, ArrowLeft, Building2, Palette, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/lib/portfolioData';

const styleLabel = {
  modern: 'Modern', contemporary: 'Contemporary', traditional: 'Traditional',
  minimalist: 'Minimalist', industrial: 'Industrial', luxury: 'Luxury', eclectic: 'Eclectic',
};

const typeLabel = {
  apartment: 'Apartment', villa: 'Villa', penthouse: 'Penthouse', office: 'Office',
  retail: 'Retail / Showroom', restaurant: 'Restaurant', hotel: 'Hotel', clinic: 'Clinic',
};

function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50);

  if (!before || !after) {
    return after ? (
      <div className="rounded-2xl overflow-hidden aspect-[16/9]">
        <img src={after} alt="After" className="w-full h-full object-cover" />
      </div>
    ) : null;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Before & After</p>
      <div
        className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos(Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100)));
        }}
      >
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={before} alt="Before" className="w-full h-full object-cover" style={{ width: `${(100 / pos) * 100}%`, maxWidth: 'none' }} />
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <ChevronLeft className="w-3 h-3 text-primary absolute left-1" />
            <ChevronRight className="w-3 h-3 text-primary absolute right-1" />
          </div>
        </div>
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">Before</span>
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">After</span>
      </div>
      <p className="text-xs text-muted-foreground text-center">Drag to compare before & after</p>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
        <p className="text-xl font-semibold">Project not found</p>
        <Link to="/portfolio"><Button variant="outline">Back to Portfolio</Button></Link>
      </div>
    );
  }

  const allImages = [project.cover_image, ...(project.gallery_images || [])].filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img src={allImages[activeImg] || project.cover_image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-accent/90 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
              {styleLabel[project.style] || project.style}
            </span>
            <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
              {typeLabel[project.property_type] || project.property_type}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-3">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/70 text-sm">
            {project.city && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{project.city}</span>}
            {project.area_sqft && <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{project.area_sqft} sq ft</span>}
            {project.duration_weeks && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{project.duration_weeks} weeks</span>}
            {project.budget_utilized && <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" />{project.budget_utilized}</span>}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Gallery thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-accent' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <BeforeAfter before={project.before_image} after={project.after_image || project.cover_image} />

              {project.brief && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">The Brief</p>
                  <p className="text-muted-foreground leading-relaxed">{project.brief}</p>
                </div>
              )}
              {project.transformation && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">The Transformation</p>
                  <p className="text-muted-foreground leading-relaxed">{project.transformation}</p>
                </div>
              )}

              {project.client_quote && (
                <div className="bg-accent/5 border-l-4 border-accent rounded-r-2xl p-6">
                  <Quote className="w-6 h-6 text-accent mb-3" />
                  <p className="text-foreground italic leading-relaxed">"{project.client_quote}"</p>
                </div>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project Details</p>
                {[
                  { label: 'Property Type', value: typeLabel[project.property_type] || project.property_type },
                  { label: 'Design Style', value: styleLabel[project.style] || project.style },
                  project.city && { label: 'Location', value: project.city },
                  project.area_sqft && { label: 'Area', value: `${project.area_sqft} sq ft` },
                  project.budget_utilized && { label: 'Budget Utilized', value: project.budget_utilized },
                  project.duration_weeks && { label: 'Duration', value: `${project.duration_weeks} weeks` },
                ].filter(Boolean).map((item, i) => (
                  <div key={i} className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-primary rounded-2xl p-6 space-y-3">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Partner Studio</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{project.partner_studio}</p>
                    {project.partner_city && <p className="text-xs text-white/60">{project.partner_city}</p>}
                  </div>
                </div>
                {project.partner_specialization && (
                  <p className="text-sm text-white/70 leading-relaxed">{project.partner_specialization}</p>
                )}
                <p className="text-xs text-white/50 pt-1">This studio was matched to this client by INTEXA's advisory process.</p>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold mb-1">Want a similar result?</p>
                <p className="text-xs text-muted-foreground mb-4">Let INTEXA match you with the right studio for your project.</p>
                <Link to="/contact?service=studio_matching">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-10 text-sm font-semibold">
                    Start Brand Matching
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}