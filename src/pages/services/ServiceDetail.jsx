import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../../components/shared/PageHero';
import CTASection from '../../components/home/CTASection';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FAQAccordion from '../../components/shared/FAQAccordion';
import MiniCaseStudies from '../../components/shared/MiniCaseStudies';
import MiniTestimonials from '../../components/shared/MiniTestimonials';
import MiniPortfolio from '../../components/shared/MiniPortfolio';

const serviceData = {
  interior: {
    title: 'Interior Design',
    subtitle: 'Not sure which designer to pick? We\'ll figure that out for you.',
    description: 'There are hundreds of interior brands in Delhi NCR. Picking one based on Instagram or word of mouth is a gamble. We help you understand what you actually need, set a realistic budget, and find a brand that genuinely fits.',
    whatWeDo: [
      'Talk through your space, lifestyle, and what you want it to feel like',
      'Tell you honestly what your budget can and can\'t get you',
      'Create a clear brief that any brand can understand',
      'Shortlist 2–3 curated brands who specialize in your type of project',
      'Optionally review their quotes to check if the pricing is fair'
    ],
    ideal: 'Homeowners in Delhi NCR planning an apartment, villa, or penthouse interior with a budget of ₹15L or more.',
  },
  exterior: {
    title: 'Exterior Design',
    subtitle: 'First impressions matter. Let\'s make sure yours counts.',
    description: 'Whether it\'s your facade, garden, driveway, or outdoor living area — exterior design is often overlooked. We help you find brands who know how to make the outside of your property look as good as the inside.',
    whatWeDo: [
      'Understand how you want your exterior to look and feel',
      'Identify the right brands for facade, landscape, or outdoor work',
      'Validate the budget against the actual scope of work',
      'Build a clear brief covering every area of the exterior',
      'Match you with brands who have done similar projects'
    ],
    ideal: 'Homeowners and developers planning exterior renovations, landscaping, or facade upgrades.',
  },
  architecture: {
    title: 'Architecture',
    subtitle: 'Building new or planning a major renovation? Start with the right brand.',
    description: 'Architectural decisions affect everything — layout, light, structure, cost. Getting the wrong brand is expensive and difficult to fix. We help you find someone who understands your vision and can actually deliver.',
    whatWeDo: [
      'Review your project scope and what you\'re trying to achieve',
      'Check if what you want is feasible within your budget',
      'Find architecture brands who have done similar projects',
      'Build a project brief that sets the right expectations',
      'Help you evaluate the proposals you receive'
    ],
    ideal: 'Anyone planning a new home, major renovation, or structural redesign in Delhi NCR.',
  },
  vastu: {
    title: 'Vastu Consultancy',
    subtitle: 'You want a Vastu-compliant home. We make sure that actually happens.',
    description: 'A lot of brands say they understand Vastu. Very few do it properly. We make sure Vastu is built into your project brief from the start — and that we match you with brands who take it seriously.',
    whatWeDo: [
      'Understand your Vastu priorities and what matters most to you',
      'Build Vastu requirements into your project brief upfront',
      'Match you only with brands who are experienced in Vastu-aligned design',
      'Make sure Vastu considerations work alongside your design and budget',
      'Review the final designs to check compliance'
    ],
    ideal: 'Homeowners who want a Vastu-compliant home without sacrificing modern design or aesthetics.',
  },
  'green-building': {
    title: 'Green Building',
    subtitle: 'Build sustainably — without compromising on design or budget.',
    description: 'Eco-friendly construction doesn\'t have to be complicated or expensive. The key is making the right decisions early. We help you find brands experienced in sustainable design and guide you through the strategies that matter.',
    whatWeDo: [
      'Understand your sustainability goals — what matters most to you',
      'Identify the right eco-friendly materials for your project',
      'Match you with brands who have genuine green building experience',
      'Guide you on energy efficiency and waste reduction strategies',
      'Advise on certifications if that\'s part of your goal'
    ],
    ideal: 'Homeowners and businesses who want to build or renovate sustainably without overpaying for it.',
  }
};

const serviceFaqs = {
  interior: [
    { q: 'How do I know which interior designer is right for my home?', a: 'That\'s exactly what we figure out for you. We look at your space, budget, and style preferences and match you with 2–3 brands who have done similar projects successfully.' },
    { q: 'What\'s a realistic budget for a full home interior in Delhi NCR?', a: 'For a standard 3BHK apartment, expect ₹15–₹30 Lakhs depending on materials and finish level. We validate this during your consultation so you know before speaking to anyone.' },
    { q: 'Should I hire an interior designer or a contractor?', a: 'This depends on the scope of your project. We help you understand the difference and which approach fits your needs — before you commit to anyone.' },
    { q: 'How long does a typical home interior take to complete?', a: 'A standard 2–3BHK takes 3–5 months from design finalisation to handover. Larger homes or premium finishes can take longer. We help you set realistic expectations upfront.' },
  ],
  exterior: [
    { q: 'What does exterior design include?', a: 'It covers your building facade, driveway, garden, boundary walls, outdoor lighting, and any open or covered outdoor spaces. We build a complete brief before recommending any brand.' },
    { q: 'Is exterior design done separately from interior?', a: 'It can be done independently or together. Some brands handle both; others specialise in one. We match you based on your specific scope.' },
    { q: 'What\'s the typical cost for exterior landscaping or facade work?', a: 'It varies significantly based on area and materials. We validate your budget against market rates during the consultation so you\'re never going in blind.' },
    { q: 'How do I ensure the exterior design complements the interior?', a: 'We make sure the brief covers both when relevant, and look for brands who can coordinate across inside and outside — or clearly split the scope if needed.' },
  ],
  architecture: [
    { q: 'What\'s the difference between an architect and an interior designer?', a: 'An architect handles structure, layout, and the building itself. An interior designer works on the inside spaces. Some projects need both. We help you understand what yours needs.' },
    { q: 'How early should I involve an architect?', a: 'As early as possible — ideally before you finalize your plot or purchase. Architectural decisions affect everything downstream. We help you start right.' },
    { q: 'How do I verify that an architect\'s quote is fair?', a: 'We can review proposals and quotes as part of our BOQ Audit service. We check rates, scope, and specifications so you know exactly what you\'re paying for.' },
    { q: 'What does an architecture project typically cost?', a: 'It varies widely based on built-up area, design complexity, and materials. We help you set a realistic budget range before you start collecting proposals.' },
  ],
  vastu: [
    { q: 'Can Vastu requirements be added to an existing design?', a: 'Sometimes, but it\'s harder. The best approach is to build Vastu into the brief from the start, before any designer begins. That\'s exactly how we handle it.' },
    { q: 'How do I know if a designer actually understands Vastu?', a: 'We vet every brand in our network for their actual experience and track record. We only recommend brands who have genuinely worked on Vastu-compliant projects.' },
    { q: 'Does Vastu compliance increase the project cost?', a: 'Not necessarily, if it\'s planned from the start. Retrofitting Vastu into a completed design can be costly. Early planning eliminates most of that cost.' },
    { q: 'Can Vastu be applied to commercial projects too?', a: 'Yes. Many business owners prefer Vastu-aligned offices and commercial spaces. We account for Vastu across all project types.' },
  ],
  'green-building': [
    { q: 'What makes a building "green"?', a: 'Green buildings use eco-friendly materials, energy-efficient systems, water conservation, and sustainable construction practices. The extent depends on your goals and budget.' },
    { q: 'Is green building significantly more expensive?', a: 'Not always. Some green choices save money over time through lower energy bills. We help you identify where sustainable choices make financial sense for your project.' },
    { q: 'Do I need a certification like LEED or IGBC?', a: 'Not necessarily. Certifications are optional and add cost. We advise on whether they\'re relevant for your project and help you pursue them if needed.' },
    { q: 'Can green building principles apply to renovations?', a: 'Absolutely. Replacing materials, improving insulation, upgrading lighting, and installing solar are all ways to make an existing building more sustainable.' },
  ],
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p>Service not found.</p>
      </div>
    );
  }

  return (
    <>
      <PageHero title={service.title} subtitle={service.subtitle} />

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground leading-relaxed mb-10">{service.description}</p>

          <h3 className="font-semibold text-lg mb-5">Here's exactly what we do</h3>
          <div className="space-y-3 mb-10">
            {service.whatWeDo.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-xl p-6 mb-10">
            <h4 className="font-semibold mb-2">Is this right for you?</h4>
            <p className="text-sm text-muted-foreground">{service.ideal}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact?service=studio_matching">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12">
                Start Brand Matching
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-8 h-12 border-border text-foreground">
                Talk to Us First
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MiniCaseStudies slug={slug} />
      <MiniTestimonials slug={slug} />
      <MiniPortfolio slug={slug} />
      <FAQAccordion faqs={serviceFaqs[slug] || []} title={`Questions about ${service.title}`} description="Common questions clients have before starting this type of project." />
      <CTASection />
    </>
  );
}