import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';
import FAQAccordion from '../components/shared/FAQAccordion';
import MiniCaseStudies from '../components/shared/MiniCaseStudies';
import MiniTestimonials from '../components/shared/MiniTestimonials';
import { ArrowRight } from 'lucide-react';

const spacesFaqs = [
  { q: 'Does INTEXA work with all types of spaces?', a: 'Yes — homes, offices, retail, industrial, hospitality, and healthcare. Each space type has unique requirements and we account for all of them during your consultation.' },
  { q: 'What if my project spans multiple space types?', a: 'We\'ll factor all areas into your brief and find brands capable of handling the combined scope. You\'ll still get one clear shortlist.' },
  { q: 'Is the process different for commercial vs. residential projects?', a: 'The consultation process is similar, but the brand criteria differ. Commercial projects often involve compliance, phasing, and workflow — we look for brands experienced in exactly that.' },
  { q: 'What budget range do you typically work with?', a: 'We work with projects in the ₹10 Lakh to ₹50 Lakh+ range across all space types. If you\'re unsure where your project falls, we can help you figure that out.' },
  { q: 'Do you work outside Delhi NCR?', a: 'Our primary focus is Delhi NCR — Delhi, Gurgaon, Noida, Faridabad, and surrounding areas. Reach out if your project is elsewhere and we\'ll let you know if we can help.' },
];

const spaces = [
  { title: 'Homes', path: '/spaces/residential', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80', desc: 'Apartments, villas, and penthouses. We help you find a brand that matches how your family actually lives.' },
  { title: 'Offices & Retail', path: '/spaces/commercial', image: 'https://media.base44.com/images/public/69bfb099e86c6c89f5403668/80447d5fd_generated_ece052ee.png', desc: 'Office fit-outs, co-working spaces, and retail stores. Brands who understand business environments.' },
  { title: 'Industrial', path: '/spaces/industrial', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80', desc: 'Warehouses and manufacturing units. Functional layouts with the right materials.' },
  { title: 'Hotels & Restaurants', path: '/spaces/hospitality', image: 'https://media.base44.com/images/public/69bfb099e86c6c89f5403668/c2bb8c468_generated_5ce325ef.png', desc: 'Hospitality design that creates experiences guests remember — and come back for.' },
  { title: 'Clinics & Healthcare', path: '/spaces/healthcare', image: 'https://media.base44.com/images/public/69bfb099e86c6c89f5403668/89687d7db_clinicandhealthcare.jpg', desc: 'Clinics and hospitals where patient comfort and clinical function both matter.' },
];

export default function Spaces() {
  return (
    <>
      <PageHero title="What kind of space are you designing?" subtitle="We work across all project types. Pick yours and see how we can help." />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((s, i) => (
              <Link key={i} to={s.path} className="group">
                <div className="rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                      See how we help <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MiniCaseStudies />
      <MiniTestimonials />
      <FAQAccordion faqs={spacesFaqs} title="Questions about project spaces" description="Common questions about how we work across different space types." />
      <CTASection />
    </>
  );
}