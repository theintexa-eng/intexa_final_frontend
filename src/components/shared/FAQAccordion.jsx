import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionHeading from './SectionHeading';

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

export default function FAQAccordion({ faqs, label = 'FAQ', title = 'Common Questions', description }) {
  return (
    <section className="py-20 lg:py-24 bg-muted/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={label} title={title} description={description} />
        <div className="bg-white rounded-2xl border border-border px-6 mt-8">
          {faqs.map((item, i) => (
            <AccordionItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}