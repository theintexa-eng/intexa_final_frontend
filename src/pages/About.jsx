import React from 'react';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';
import CTASection from '../components/home/CTASection';
import FAQAccordion from '../components/shared/FAQAccordion';
import { Shield, Eye, Target, Heart } from 'lucide-react';

const aboutFaqs = [
  { q: 'Is INTEXA a design studio?', a: 'No. INTEXA is an independent advisory firm. We don\'t design spaces or manage construction. We help you plan your project and connect you with the right brand to execute it.' },
  { q: 'How is INTEXA different from hiring a designer directly?', a: 'When you hire a designer, you\'re already committed. We come before that — helping you define your brief, validate your budget, and shortlist the right brands so your final choice is an informed one.' },
  { q: 'Do you work with every type of project?', a: 'We work across residential, commercial, hospitality, industrial, and healthcare projects in the ₹10L–₹50L+ range in Delhi NCR. If you\'re unsure whether your project fits, just reach out.' },
  { q: 'How does INTEXA make money if it\'s independent?', a: 'We charge a transparent advisory fee for our consultation. This keeps our advice completely unbiased — we have no financial incentive to recommend one brand over another.' },
  { q: 'What happens after INTEXA gives me a shortlist?', a: 'You take it from there. We provide brand profiles, past work, and context — then you meet them directly. We\'re available for 7 days post-consultation if you have follow-up questions.' },
];

const values = [
  { icon: Shield, title: 'We\'re independent', desc: 'We don\'t design or build. We have no side deals with studios. Our advice is purely in your interest.' },
  { icon: Eye, title: 'We\'re transparent', desc: 'No hidden fees. You know exactly what you\'re paying for and why.' },
  { icon: Target, title: 'We\'re precise', desc: 'We don\'t send you a list of 10 random brands. We shortlist 2–3 who genuinely fit your project.' },
  { icon: Heart, title: 'We care about outcomes', desc: 'We measure success by whether your project actually goes well — not just whether you booked a session.' },
];

export default function About() {
  return (
    <>
      <PageHero title="About INTEXA" subtitle="We help homeowners make smart decisions before starting their projects." />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeading label="Who We Are" title="We're your advisor — not your designer" />

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                INTEXA is an independent project advisory consultancy in Delhi NCR specializing in interior, architectural, and green building projects. The company helps clients define project budgets and briefs, then matches them with curated design brands and studios to prevent costly mistakes and budget overruns.
              </p>
              <p>
                Most homeowners go through the same painful experience — collect quotes, compare portfolios, feel confused, and eventually pick someone they're not sure about.
              </p>
              <p>
                INTEXA exists to fix that. We sit between you and the design world — helping you understand your project, set a realistic budget, and find the right brand before you commit any money.
              </p>
              <p>
                We don't design. We don't build. We just help you make the right call.
              </p>
              <p>
                We work with homeowners and businesses in Delhi NCR planning projects in the ₹10L–₹50L+ range. One 30-minute conversation with us can save you months of confusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Values" title="What makes us different" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary rounded-2xl p-8 lg:p-10">
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Our Mission</span>
              <h2 className="font-display text-2xl font-semibold text-white mt-3 mb-4">
                Make every project decision informed
              </h2>
              <p className="text-white/70 leading-relaxed">
                Our mission is to eliminate the confusion, wasted money, and regret that comes from starting an interior or architecture project without proper guidance. We give homeowners and businesses the structured advice they need — before they commit.
              </p>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 lg:p-10">
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Our Vision</span>
              <h2 className="font-display text-2xl font-semibold text-foreground mt-3 mb-4">
                A trusted layer between clients and the design industry
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where no one pays for a bad design experience because they didn't know what to ask. INTEXA is building the advisory infrastructure that makes every design and construction project in India more accountable, transparent, and client-first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={aboutFaqs} title="Questions about INTEXA" description="Understand who we are and how we work before reaching out." />
      <CTASection />
    </>
  );
}