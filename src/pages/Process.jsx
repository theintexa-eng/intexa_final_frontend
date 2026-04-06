import React from 'react';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';
import FAQAccordion from '../components/shared/FAQAccordion';
import { ClipboardList, Users, FileSearch, Zap, CheckCircle2 } from 'lucide-react';

const processFaqs = [
  { q: 'How long does the whole process take from start to finish?', a: 'The consultation and shortlisting typically takes 2–3 business days. After that, how quickly you move is entirely up to you — there\'s no pressure.' },
  { q: 'Do I need to prepare anything before the consultation?', a: 'No formal preparation needed. Just come with a rough idea of your space, budget, and what you\'re hoping to achieve. We ask the right questions to fill in the rest.' },
  { q: 'Can I do the consultation online or does it have to be in person?', a: 'Both work. Most consultations are done over a video call. If you\'d prefer an in-person session in Delhi NCR, we can arrange that too.' },
  { q: 'What if I\'m not happy with the brands you shortlist?', a: 'We refine the list. Our goal is to find the right fit, and if the first round doesn\'t land, we go back and look again until you have options you\'re confident about.' },
  { q: 'Is the BOQ Audit mandatory or optional?', a: 'It\'s optional. Once a brand sends you a quote, we can review it for an additional fee. Many clients find it gives them significant peace of mind before committing.' },
  { q: 'Do you stay involved after I pick a brand?', a: 'We offer 7 days of follow-up support after the consultation. For extended project oversight, our Project Management service covers the full execution phase.' },
];

const steps = [
  {
    icon: ClipboardList,
    num: '01',
    title: 'We sit down and understand your project',
    desc: 'You share what you\'re planning — the space, the budget, the style, the timeline. We ask the right questions. No jargon, no pressure.',
    details: ['30-minute structured consultation', 'We understand what you actually want', 'We check if your budget is realistic']
  },
  {
    icon: Users,
    num: '02',
    title: 'We find the right brands for you',
    desc: 'Based on what you told us, we shortlist 2–3 curated brands from our network — ones who specialise in your project type and can deliver within your budget.',
    details: ['Only brands who fit your exact requirement', 'Profiles with their past work and strengths', 'You meet them — no cold calls, no waste of time']
  },
  {
    icon: FileSearch,
    num: '03',
    title: 'We check if the quote is fair (optional)',
    desc: 'Once a brand sends you a quote, we can independently review it — line by line — to make sure you\'re not being overcharged.',
    details: ['Rate comparison with market benchmarks', 'Material specification check', 'Written report with our findings']
  },
  {
    icon: Zap,
    num: '04',
    title: 'You start your project — with confidence',
    desc: 'You choose the brand that feels right. You begin your project knowing the scope is clear, the budget is validated, and there are no nasty surprises waiting.',
    details: ['You make the final call — always', 'Clear scope before work begins', 'No confusion about what\'s included']
  },
  {
    icon: CheckCircle2,
    num: '05',
    title: 'We\'re here when the project wraps up',
    desc: 'As your project nears completion, we can help you review the final output against what was originally agreed — so nothing important gets missed.',
    details: ['Final walkthrough review', 'Check actual costs vs. agreed budget', 'Honest feedback on what was delivered']
  }
];

export default function Process() {
  return (
    <>
      <PageHero title="How it works" subtitle="Five simple steps. No confusion. No surprises." />

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-6 md:gap-10">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 border-2 border-accent">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-border mt-3" />}
                </div>

                {/* Content */}
                <div className="pb-12">
                  <span className="text-xs font-semibold text-accent tracking-wider">STEP {step.num}</span>
                  <h3 className="text-xl font-semibold mt-1 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={processFaqs} title="Questions about the process" description="Everything you need to know about how we work before you reach out." />
      <CTASection />
    </>
  );
}