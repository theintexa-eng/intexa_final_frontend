import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const projectTypeLabel = {
  residential: 'Residential',
  commercial: 'Commercial',
  hospitality: 'Hospitality',
  industrial: 'Industrial',
  healthcare: 'Healthcare',
  architecture: 'Architecture',
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

const STATIC_TESTIMONIALS = [
  { id: '1', client_name: 'Raghav Mehra', rating: 5, feedback: "INTEXA saved us from a massive mistake. We were about to sign with a designer who clearly didn't understand our budget. After the consultation, we got matched with a studio that delivered exactly what we wanted — on time and within budget.", project_type: 'residential', location: 'Gurgaon', project_value: '₹22 Lakhs' },
  { id: '2', client_name: 'Priya Nair', rating: 5, feedback: 'As first-time homeowners, we had no idea where to start. INTEXA structured everything — our requirements, our budget, and even helped us compare studio proposals. Worth every rupee of the consultation fee.', project_type: 'residential', location: 'Noida', project_value: '₹18 Lakhs' },
  { id: '3', client_name: 'Ankit Sharma', rating: 5, feedback: "The BOQ audit alone saved us ₹6 lakhs. I didn't even know I was being overcharged until INTEXA reviewed the quotes. Highly recommend for any commercial project above ₹25L.", project_type: 'commercial', location: 'Delhi', project_value: '₹38 Lakhs' },
  { id: '4', client_name: 'Sunita Kapoor', rating: 5, feedback: 'We were opening our first boutique hotel and had no experience with interior execution. INTEXA matched us with a hospitality-focused studio that understood the brand language we were going for. The result exceeded expectations.', project_type: 'hospitality', location: 'South Delhi', project_value: '₹35 Lakhs' },
  { id: '5', client_name: 'Vikram Bhatia', rating: 4, feedback: 'Very structured and professional process. The consultation was thorough and the studio shortlist was spot on. The ones recommended were excellent.', project_type: 'residential', location: 'Greater Noida', project_value: '₹28 Lakhs' },
];

export default function TestimonialSlider({ light = false }) {
  const testimonials = STATIC_TESTIMONIALS;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir) => {
    setDirection(dir);
    setCurrent(prev => (prev + dir + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1 || paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [testimonials.length, go, paused]);

  const t = testimonials[current];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Slide */}
      <div className="overflow-hidden min-h-[260px] flex items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={t.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            <div className={`max-w-2xl mx-auto text-center px-4`}>
              <Quote className={`w-10 h-10 mx-auto mb-6 ${light ? 'text-accent/60' : 'text-accent/40'}`} />
              <p className={`text-lg md:text-xl leading-relaxed font-light mb-8 ${light ? 'text-white/90' : 'text-foreground'}`}>
                "{t.feedback}"
              </p>
              <div className="flex justify-center">
                <StarRating rating={t.rating} />
              </div>
              <div className="mt-4">
                <p className={`font-semibold ${light ? 'text-white' : 'text-foreground'}`}>{t.client_name}</p>
                <p className={`text-sm mt-1 ${light ? 'text-white/50' : 'text-muted-foreground'}`}>
                  {t.project_type ? projectTypeLabel[t.project_type] : ''}
                  {t.location ? ` · ${t.location}` : ''}
                  {t.project_value ? ` · ${t.project_value}` : ''}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {testimonials.length > 1 && (
        <>
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                light
                  ? 'border-white/20 text-white/60 hover:bg-white/10 hover:text-white'
                  : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-accent'
                      : `w-2 h-2 ${light ? 'bg-white/30 hover:bg-white/50' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                light
                  ? 'border-white/20 text-white/60 hover:bg-white/10 hover:text-white'
                  : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}