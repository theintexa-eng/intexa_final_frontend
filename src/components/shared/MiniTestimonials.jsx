import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight } from 'lucide-react';

const projectTypeLabel = {
  residential: 'Residential',
  commercial: 'Commercial',
  hospitality: 'Hospitality',
  industrial: 'Industrial',
  healthcare: 'Healthcare',
  architecture: 'Architecture',
};

const ALL_TESTIMONIALS = [
  { id: '1', client_name: 'Raghav Mehra', rating: 5, feedback: "INTEXA saved us from a massive mistake. We were about to sign with a designer who clearly didn't understand our budget. After the consultation, we got matched with a studio that delivered exactly what we wanted — on time and within budget.", project_type: 'residential', location: 'Gurgaon', project_value: '₹22 Lakhs' },
  { id: '2', client_name: 'Priya Nair', rating: 5, feedback: 'As first-time homeowners, we had no idea where to start. INTEXA structured everything — our requirements, our budget, and even helped us compare studio proposals. Worth every rupee of the consultation fee.', project_type: 'residential', location: 'Noida', project_value: '₹18 Lakhs' },
  { id: '3', client_name: 'Ankit Sharma', rating: 5, feedback: "The BOQ audit alone saved us ₹6 lakhs. I didn't even know I was being overcharged until INTEXA reviewed the quotes. Highly recommend for any commercial project above ₹25L.", project_type: 'commercial', location: 'Delhi', project_value: '₹38 Lakhs' },
  { id: '4', client_name: 'Sunita Kapoor', rating: 5, feedback: 'We were opening our first boutique hotel and had no experience with interior execution. INTEXA matched us with a hospitality-focused studio that understood the brand language we were going for. The result exceeded expectations.', project_type: 'hospitality', location: 'South Delhi', project_value: '₹35 Lakhs' },
  { id: '5', client_name: 'Vikram Bhatia', rating: 4, feedback: 'Very structured and professional process. The consultation was thorough and the studio shortlist was spot on. The ones recommended were excellent.', project_type: 'residential', location: 'Greater Noida', project_value: '₹28 Lakhs' },
];

const typeMap = {
  interior: 'residential', exterior: 'residential', architecture: 'architecture',
  vastu: 'residential', 'green-building': 'residential', residential: 'residential',
  commercial: 'commercial', industrial: 'industrial', hospitality: 'hospitality', healthcare: 'healthcare',
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'fill-accent text-accent' : 'text-muted-foreground/20'}`} />
      ))}
    </div>
  );
}

export default function MiniTestimonials({ slug }) {
  const type = typeMap[slug];
  const filtered = type ? ALL_TESTIMONIALS.filter(t => t.project_type === type) : ALL_TESTIMONIALS;
  const testimonials = (filtered.length >= 2 ? filtered : ALL_TESTIMONIALS).slice(0, 3);

  if (!testimonials.length) return null;

  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Testimonials</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mt-1">What clients say</h2>
          </div>
          <Link to="/case-studies" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            All stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
              <Quote className="w-7 h-7 text-accent/50" />
              <p className="text-white/80 text-sm leading-relaxed flex-1">"{t.feedback}"</p>
              <div>
                <StarRating rating={t.rating} />
                <p className="text-white font-semibold text-sm mt-2">{t.client_name}</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {t.project_type ? projectTypeLabel[t.project_type] : ''}
                  {t.location ? ` · ${t.location}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}