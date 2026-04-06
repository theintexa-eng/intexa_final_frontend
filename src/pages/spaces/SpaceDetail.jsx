import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../../components/shared/PageHero';
import CTASection from '../../components/home/CTASection';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FAQAccordion from '../../components/shared/FAQAccordion';
import MiniCaseStudies from '../../components/shared/MiniCaseStudies';
import MiniTestimonials from '../../components/shared/MiniTestimonials';
import MiniPortfolio from '../../components/shared/MiniPortfolio';

const spaceData = {
  residential: {
    title: 'Homes & Residential',
    subtitle: 'Your home is your biggest investment. Let\'s make sure you start it right.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80',
    description: 'Whether it\'s a 2BHK apartment or a 5-bedroom villa, home interiors involve big decisions and a significant investment. We help you understand what\'s realistic, find the right brand, and avoid expensive mistakes.',
    types: ['Apartments (2BHK–4BHK)', 'Independent Villas', 'Penthouses', 'Builder Floor Homes', 'Farmhouses'],
    approach: [
      'Talk through how your family lives and what you actually need',
      'Tell you honestly what your budget will get you',
      'Find studios who specialise in your type of home',
      'Create a room-by-room brief before any designer visits',
      'Optionally review quotes to check if material costs are fair'
    ],
  },
  commercial: {
    title: 'Offices & Commercial',
    subtitle: 'Your workspace affects how your team performs. Get this right.',
    image: 'https://media.base44.com/images/public/69bfb099e86c6c89f5403668/80447d5fd_generated_ece052ee.png',
    description: 'Commercial fit-outs involve more moving parts than home interiors — compliance, workflow, brand identity, phasing. We connect you with brands who genuinely understand business environments.',
    types: ['Corporate Offices', 'Co-Working Spaces', 'Retail Stores', 'Showrooms', 'Conference Centres'],
    approach: [
      'Understand your team size, work style, and brand needs',
      'Find brands experienced in commercial projects',
      'Ensure safety and compliance requirements are met for your space',
      'Validate budget against real market rates',
      'Plan for phased execution if you need it'
    ],
  },
  industrial: {
    title: 'Industrial Spaces',
    subtitle: 'Functional, durable, and safe — that\'s what industrial design is about.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80',
    description: 'Industrial spaces are not just about aesthetics — they\'re about efficiency, safety, and durability. We connect you with studios that have hands-on experience in this environment.',
    types: ['Warehouses', 'Manufacturing Units', 'R&D Labs', 'Workshops', 'Storage Facilities'],
    approach: [
      'Map out your operational workflow and what the space needs to do',
      'Find brands experienced in industrial environments',
      'Make sure safety and regulatory requirements are covered',
      'Plan the right materials for durability and function',
      'Build a brief that covers every operational zone'
    ],
  },
  hospitality: {
    title: 'Hotels & Restaurants',
    subtitle: 'Great design brings guests back. Let\'s help you get it right.',
    image: 'https://media.base44.com/images/public/69bfb099e86c6c89f5403668/c2bb8c468_generated_5ce325ef.png',
    description: 'In hospitality, design isn\'t just decoration — it\'s business strategy. Good design improves reviews, supports pricing, and keeps guests coming back. We match you with brands who understand the hospitality business.',
    types: ['Boutique Hotels', 'Restaurants & Cafes', 'Bars & Lounges', 'Banquet Halls', 'Resorts'],
    approach: [
      'Define the kind of experience you want guests to have',
      'Find brands who have done similar hospitality projects',
      'Check your budget against real hospitality benchmarks',
      'Build a brief that covers flow, ambiance, and functionality',
      'Review quotes to ensure material quality matches the vision'
    ],
  },
  healthcare: {
    title: 'Clinics & Healthcare',
    subtitle: 'Patient experience starts with the space. Design it well.',
    image: 'https://media.base44.com/images/public/69bfb099e86c6c89f5403668/89687d7db_clinicandhealthcare.jpg',
    description: 'Healthcare spaces are unlike any other. They must feel calm for patients, function efficiently for staff, and meet strict hygiene standards. We find brands who have actually done this before.',
    types: ['Clinics & Polyclinics', 'Hospitals', 'Dental Clinics', 'Wellness & Spa Centres', 'Diagnostic Centres'],
    approach: [
      'Understand your clinical workflow and patient journey',
      'Match with brands experienced in healthcare design',
      'Make sure the design meets healthcare standards and compliance',
      'Plan the budget for specialist materials and fittings',
      'Build a detailed brief covering both clinical and patient areas'
    ],
  },
};

const spaceFaqs = {
  residential: [
    { q: 'How much does a full home interior cost in Delhi NCR?', a: 'For a standard 3BHK, expect ₹15–₹30 Lakhs depending on finish level and materials. We validate your budget against current market rates during the consultation.' },
    { q: 'How long does a home interior project take?', a: 'A typical 2–3BHK takes 3–5 months from design sign-off to handover. We help you set a realistic timeline before any brand gets involved.' },
    { q: 'Should I get multiple quotes before choosing a designer?', a: 'Yes — and we help you compare them intelligently. Our BOQ Audit checks if the rates and material specs in each quote are fair.' },
    { q: 'What should I prepare before my first meeting with a designer?', a: 'We take care of this. Our consultation produces a clear brief — space requirements, style, budget, timeline — so your first meeting with any brand is productive.' },
  ],
  commercial: [
    { q: 'What does a commercial office fit-out typically cost?', a: 'It varies by size and finish. We benchmark your budget against current commercial rates and tell you honestly what you can achieve before you meet any brand.' },
    { q: 'How do I ensure the design meets building codes and compliance?', a: 'We look for brands with proven experience in commercial compliance and flag any requirements in your brief upfront, so nothing gets overlooked.' },
    { q: 'Can we phase the fit-out so the office stays operational?', a: 'Yes. Phased execution is common in commercial projects. We find brands experienced in phasing and build that requirement into the brief from the start.' },
    { q: 'How is a commercial project brief different from a residential one?', a: 'Commercial briefs include workflow, team size, branding, compliance, phasing, and budget per seat. We structure all of this before you speak to any brand.' },
  ],
  industrial: [
    { q: 'Is INTEXA relevant for industrial spaces — not just homes and offices?', a: 'Yes. We help with warehouses, manufacturing units, R&D labs, and similar facilities. The matching criteria are different, but the advisory process is just as valuable.' },
    { q: 'What are the key considerations for an industrial space design?', a: 'Workflow efficiency, material durability, safety compliance, zoning, and ventilation. We factor all of these into your brief before recommending any brand.' },
    { q: 'How do I find a brand with industrial experience?', a: 'Most design brands aren\'t equipped for industrial projects. We specifically filter for brands with hands-on industrial experience in our network.' },
    { q: 'What regulatory requirements apply to industrial spaces?', a: 'Requirements vary based on your industry and local regulations. We make sure these are covered in your brief and look for brands who understand compliance in industrial settings.' },
  ],
  hospitality: [
    { q: 'How important is design to a restaurant or hotel\'s success?', a: 'Extremely. Design influences reviews, pricing power, and return visits. The right brand understands this and designs for guest experience, not just aesthetics.' },
    { q: 'What does a restaurant or cafe interior cost?', a: 'It varies widely — from ₹15L for a small cafe to ₹1 Crore+ for a premium restaurant. We help you set a realistic budget and find brands who can work within it.' },
    { q: 'How do I find a designer who understands the hospitality business?', a: 'Most interior brands don\'t. We specifically look for brands with a proven hospitality portfolio and the experience to design for operational realities, not just visuals.' },
    { q: 'Can the same brand handle both the interiors and the branding?', a: 'Some can, some can\'t. We match you based on your full scope — if you need brand identity and interiors, we find someone who handles both or coordinate across specialties.' },
  ],
  healthcare: [
    { q: 'Why does healthcare design need a specialist brand?', a: 'Healthcare spaces have unique requirements — hygiene standards, patient flow, clinical zoning, and strict compliance. A residential or commercial brand rarely has this experience.' },
    { q: 'What regulations apply to clinic or hospital interiors?', a: 'Requirements include infection control standards, fire safety, accessibility norms, and material certifications. We ensure these are built into your brief from the start.' },
    { q: 'How do I balance a welcoming patient environment with clinical functionality?', a: 'This is the central challenge of healthcare design. We look for brands who have actually solved this before — not those who are attempting it for the first time.' },
    { q: 'What does a clinic interior typically cost?', a: 'A small clinic can range from ₹8–₹20 Lakhs. Larger facilities vary significantly. We give you a realistic benchmark based on your specific type of facility.' },
  ],
};

export default function SpaceDetail() {
  const { slug } = useParams();
  const space = spaceData[slug];

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p>Space not found.</p>
      </div>
    );
  }

  return (
    <>
      <PageHero title={space.title} subtitle={space.subtitle} />

      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8">{space.description}</p>

              <h3 className="font-semibold text-lg mb-4">We've helped with</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {space.types.map((t, i) => (
                  <span key={i} className="text-sm bg-muted px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>

              <h3 className="font-semibold text-lg mb-4">What we actually do</h3>
              <div className="space-y-3 mb-8">
                {space.approach.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{a}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact?service=studio_matching">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12">
                    Start Brand Matching
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-8 h-12 border-border text-foreground">Talk to Us First</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden">
              <img src={space.image} alt={space.title} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      <MiniCaseStudies slug={slug} />
      <MiniTestimonials slug={slug} />
      <MiniPortfolio slug={slug} />
      <FAQAccordion faqs={spaceFaqs[slug] || []} title={`Questions about ${space.title}`} description="Common questions clients have before starting this type of project." />
      <CTASection />
    </>
  );
}