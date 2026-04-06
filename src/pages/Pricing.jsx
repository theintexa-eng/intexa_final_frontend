import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import FAQAccordion from '../components/shared/FAQAccordion';
import CTASection from '../components/home/CTASection';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingFaqs = [
  { q: 'What\'s included in the ₹2,999 Brand Matching fee?', a: 'A 30-minute structured consultation, budget validation, a shortlist of 2–3 curated brands with profiles, a written summary of the session, and 7 days of follow-up support.' },
  { q: 'Do I pay anything more after the consultation?', a: 'No. The ₹2,999 is a one-time fee. There are no referral fees, hidden charges, or additional costs of any kind.' },
  { q: 'When do I pay for the BOQ Audit?', a: 'Payment is made before the audit begins. You share the BOQ, we review it, and deliver a written report with a call to walk you through our findings.' },
  { q: 'What if I\'m not satisfied with the brand shortlist?', a: 'We\'ll work with you to refine it. Our goal is to find brands that genuinely fit your project — if the first round doesn\'t land, we iterate.' },
  { q: 'Can I get a BOQ Audit if I haven\'t done a Brand Matching consultation?', a: 'Yes. The BOQ Audit is a standalone service. If you already have a quote from a brand or contractor, we can review it independently.' },
  { q: 'Is Project Management priced per square foot or a fixed fee?', a: 'It\'s based on scope — typically ₹49–₹149 per sq ft depending on the complexity and level of involvement required. We\'ll give you a clear quote after understanding your project.' },
];

const services = [
{
  label: 'Most Popular',
  highlighted: true,
  title: 'Brand Matching Consultation',
  price: '₹2,999',
  priceSuffix: 'one-time · all inclusive',
  description: 'One 30-minute session with INTEXA. We understand your project, check your budget, and match you with the right brands.',
  features: [
  '30-minute structured one-on-one consultation',
  'We understand your space, style, and budget',
  'We validate what\'s realistic for your budget',
  'Shortlist of 2–3 curated brands for your project',
  'Brand profiles with past work and strengths',
  'Written summary of everything we discussed',
  '7 days of follow-up support post the match',
  'Payment can be made after the match'],

  cta: 'Start Brand Matching',
  link: '/contact?service=studio_matching',
  ctaVariant: 'accent'
},
{
  title: 'BOQ Audit',
  price: '₹1,999',
  priceSuffix: 'per audit',
  description: 'Already have a quote from a brand or contractor? We review it line by line to check if the rates and materials are fair.',
  features: [
  'Line-by-line review of your BOQ',
  'Check if material specs match what you\'re paying',
  'Compare rates against current market prices',
  'Identify where you\'re being overcharged',
  'Written report with our findings',
  'A call to walk you through everything'],

  cta: 'Get Your BOQ Reviewed',
  link: '/contact?service=boq_audit',
  ctaVariant: 'outline'
},
{
  title: 'Project Management',
  price: 'Custom',
  priceSuffix: 'based on scope',
  description: 'Structured support to keep your project on track. Ideal for homeowners needing additional oversight. Pricing: ₹49–₹149 per sq ft, based on scope.',
  features: [
  'Project coordination guidance',
  'Timeline tracking support',
  'Issue identification and escalation advice',
  'Regular progress check-ins',
  'Budget vs. actual tracking',
  'Final walkthrough and handover support'],

  cta: 'Enquire About Project Management',
  link: '/contact?service=general_inquiry',
  ctaVariant: 'outline'
}];


export default function Pricing() {
  return (
    <>
      <PageHero title="Simple, honest pricing" subtitle="You know exactly what you pay. You know exactly what you get." />

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {services.map((s, i) =>
            <div
              key={i}
              className={`relative rounded-2xl p-8 ${
              s.highlighted ?
              'border-2 border-accent bg-white shadow-xl' :
              'border border-border bg-white'}`
              }>
              
                {s.label &&
              <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {s.label}
                  </span>
              }
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-bold text-foreground">{s.price}</span>
                  <span className="text-muted-foreground text-xs">{s.priceSuffix}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{s.description}</p>
                <div className="space-y-2.5 mb-8">
                  {s.features.map((item, j) =>
                <div key={j} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.highlighted ? 'text-accent' : 'text-primary'}`} />
                      <span className="text-sm">{item}</span>
                    </div>
                )}
                </div>
                <Link to={s.link}>
                  {s.ctaVariant === 'accent' ?
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 font-semibold">
                      {s.cta}
                    </Button> :

                <Button variant="outline" className="w-full h-11 font-semibold border-border text-foreground">
                      {s.cta}
                    </Button>
                }
                </Link>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10 max-w-lg mx-auto">All prices include GST. What you see is what you pay.</p>
        </div>
      </section>

      <FAQAccordion faqs={pricingFaqs} title="Pricing questions" description="Everything you need to know about what you pay and what you get." />
      <CTASection />
    </>);

}