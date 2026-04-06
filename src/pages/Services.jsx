import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';
import CTASection from '../components/home/CTASection';
import FAQAccordion from '../components/shared/FAQAccordion';
import MiniCaseStudies from '../components/shared/MiniCaseStudies';
import MiniTestimonials from '../components/shared/MiniTestimonials';
import { Home, Building2, Compass, Sun, Leaf, ArrowRight } from 'lucide-react';

const servicesFaqs = [
  { q: 'What types of projects does INTEXA help with?', a: 'We cover interior design, exterior & landscape, architecture, Vastu consultancy, and green building — across residential and commercial projects in Delhi NCR.' },
  { q: 'Do I need to know what service I need before contacting you?', a: 'Not at all. Many clients aren\'t sure. A quick conversation with us is enough to figure out what your project actually needs.' },
  { q: 'Can INTEXA handle both design and execution?', a: 'We\'re an advisory firm — we don\'t design or build. We help you plan your project, understand your budget, and find the right brand who will execute it.' },
  { q: 'How long does the brand matching process take?', a: 'Most clients get their shortlist within 2–3 business days of their consultation.' },
  { q: 'Can you help with projects that combine multiple services?', a: 'Yes. If your project involves both interior and architecture, for example, we factor both into the brief and find brands capable of handling the full scope.' },
];

const services = [
  { icon: Home, title: 'Interior Design', path: '/services/interior', desc: 'Planning a home or office interior? We help you understand your budget, brief your requirements, and find the right brand.' },
  { icon: Building2, title: 'Exterior Design', path: '/services/exterior', desc: 'Facade, landscape, or outdoor spaces — we help you find brands who know how to make the outside of your property look its best.' },
  { icon: Compass, title: 'Architecture', path: '/services/architecture', desc: 'Building new or doing a major renovation? We connect you with brands who match your vision and can deliver within your budget.' },
  { icon: Sun, title: 'Vastu Consultancy', path: '/services/vastu', desc: 'Want a Vastu-compliant home without sacrificing design? We build Vastu requirements into your brief and match brands who understand this.' },
  { icon: Leaf, title: 'Green Building', path: '/services/green-building', desc: 'Eco-friendly materials, energy efficiency, green certifications — we help you find brands experienced in sustainable design.' },
];

export default function Services() {
  return (
    <>
      <PageHero title="What We Help With" subtitle="Not sure what type of project you have? We'll figure it out together." />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Services" title="Pick your project type" description="We offer advisory and brand matching across all project types. Click any service to learn more." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link key={i} to={s.path} className="group">
                <div className="bg-white rounded-xl p-8 border border-border h-full hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                    <s.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                    See How We Help <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MiniCaseStudies />
      <MiniTestimonials />
      <FAQAccordion faqs={servicesFaqs} title="Questions about our services" description="Everything you need to know before picking a service or booking a consultation." />
      <CTASection />
    </>
  );
}