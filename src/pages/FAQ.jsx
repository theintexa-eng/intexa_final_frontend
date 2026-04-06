import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'Brand Matching',
    items: [
      {
        q: 'What exactly is brand matching?',
        a: 'Brand matching is a structured process where INTEXA learns about your project — your space, style, budget, and timeline — and then handpicks 2–3 design brands from our verified network who are genuinely suited to your project. We don\'t send you a long list. We send you the right ones.',
      },
      {
        q: 'How is INTEXA different from just searching online?',
        a: 'Online searches give you whoever has the best marketing. INTEXA gives you whoever fits your project best. We\'ve reviewed the past work, pricing, and client feedback of every brand we recommend. We also help you understand your own project before you start talking to anyone.',
      },
      {
        q: 'How do you ensure your recommendations are unbiased?',
        a: 'We charge clients a transparent flat fee and have no financial relationship with the brands we recommend. Our only goal is finding the right fit for your project.',
      },
      {
        q: 'What if I don\'t like any of the brands you recommend?',
        a: 'We offer 7 days of follow-up support after your session. If none of the recommendations feel right, we\'ll discuss why and explore alternatives. Our goal is a match you\'re confident about.',
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        q: 'How much does the Brand Matching Consultation cost?',
        a: '₹2,999 — one-time, all inclusive. This covers a 30-minute structured consultation, your brand shortlist with profiles, a written summary, and 7 days of follow-up support.',
      },
      {
        q: 'What does the BOQ Audit cost?',
        a: '₹1,999 per audit. We review your bill of quantities line by line, compare rates against current market prices, and deliver a written report with our findings plus a call to walk you through it.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Once a consultation or audit has been conducted, the fee is non-refundable. If you\'re unsure whether our service is right for you, reach out before booking — we\'re happy to answer questions first.',
      },
      {
        q: 'Are the prices inclusive of GST?',
        a: 'Yes, all prices on our website include applicable GST. There are no hidden charges.',
      },
    ],
  },
  {
    category: 'Project Timelines',
    items: [
      {
        q: 'How quickly can I get a consultation?',
        a: 'We typically schedule consultations within 2–3 business days of your inquiry. For urgent projects, let us know and we\'ll do our best to accommodate.',
      },
      {
        q: 'How long does a typical interior project take?',
        a: 'This varies significantly based on scope. A standard 2BHK interior can take 3–5 months from design to handover. Larger or more complex projects may take longer. We help you set realistic expectations during your consultation.',
      },
      {
        q: 'When in my project should I reach out to INTEXA?',
        a: 'As early as possible — ideally before you\'ve spoken to any designer or contractor. The earlier we get involved, the more confusion and cost we can save you. Even if you\'re just starting to think about a project, we can help.',
      },
      {
        q: 'What if my project is still months away?',
        a: 'That\'s actually the best time to talk to us. We can help you plan, set a realistic budget, and understand what to expect — so you\'re not scrambling when the time comes.',
      },
    ],
  },
  {
    category: 'Working with INTEXA',
    items: [
      {
        q: 'Do you work outside Delhi NCR?',
        a: 'Our primary focus is Delhi NCR — Delhi, Gurgaon, Noida, Faridabad, and surrounding areas. If your project is in another city, reach out and we\'ll let you know if we can help.',
      },
      {
        q: 'What project size do you work with?',
        a: 'We work with projects in the ₹10 Lakh to ₹50 Lakh+ range. This covers most residential apartments, villas, and mid-to-large commercial spaces.',
      },
      {
        q: 'Is the consultation in-person or online?',
        a: 'Consultations are conducted over phone or video call. This allows us to work efficiently and accommodate your schedule.',
      },
    ],
  },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{q}</span>
        <ChevronDown className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <p className="text-sm text-muted-foreground leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know before starting your project with INTEXA." />

      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {faqs.map((group) => (
            <div key={group.category}>
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">{group.category}</h2>
              <div className="bg-white rounded-2xl border border-border px-6">
                {group.items.map((item, i) => (
                  <AccordionItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}