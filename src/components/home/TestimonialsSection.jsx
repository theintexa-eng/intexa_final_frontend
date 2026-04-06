import React from 'react';
import SectionHeading from '../shared/SectionHeading';
import TestimonialSlider from '../shared/TestimonialSlider';

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Client Testimonials"
          title="Don't take our word for it"
          description="Here's what real clients say — in their own words."
          light
        />
        <TestimonialSlider light />
      </div>
    </section>
  );
}