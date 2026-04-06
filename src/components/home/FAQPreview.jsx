import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../shared/SectionHeading';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const previewFaqs = [
  { q: 'What is brand matching and how does it work?', a: 'We learn about your project — space, style, budget, and timeline — then handpick 2–3 verified design brands from our network who genuinely fit your needs. You get profiles, past work, and a written summary.' },
  { q: 'How do you ensure your recommendations are unbiased?', a: 'We charge clients a transparent flat fee and have no financial relationship with the brands we recommend. Our only goal is finding the right fit for your project.' },
  { q: 'How much does a consultation cost?', a: '₹2,999 — one-time and all inclusive. This covers a 30-minute consultation, your brand shortlist, a written summary, and 7 days of follow-up support.' },
  { q: 'When should I reach out — before or after I\'ve spoken to designers?', a: 'Before. The earlier you talk to us, the more confusion and cost we can prevent. Even if your project is months away, a quick conversation sets you up well.' },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{q}</span>
        <ChevronDown className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && <p className="text-sm text-muted-foreground leading-relaxed pb-5">{a}</p>}
    </div>
  );
}

export default function FAQPreview() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="FAQ" title="Common questions, answered." description="Quick answers to what most clients ask before starting." />
        <div className="bg-white rounded-2xl border border-border px-6 mt-10">
          {previewFaqs.map((item, i) => (
            <AccordionItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-sm text-accent font-semibold hover:underline">
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}