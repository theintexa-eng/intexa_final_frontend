import React from 'react';
import PageHero from '../components/shared/PageHero';
import CTASection from '../components/home/CTASection';
import SectionHeading from '../components/shared/SectionHeading';
import FAQAccordion from '../components/shared/FAQAccordion';

const partnerFaqs = [
  { q: "Is INTEXA's partner network open to all design studios?", a: "No. We vet every brand before adding them to our network. We review past work, client feedback, specialisation, and budget range to ensure we only recommend brands we'd trust ourselves." },
  { q: 'How does INTEXA refer clients to partner brands?', a: 'We match clients to 2–3 brands based on their specific project type, budget, and requirements. There\'s no rotation or random assignment — each referral is a deliberate, curated match.' },
  { q: 'Is there a fee to join the INTEXA partner network?', a: 'No. There is no membership fee. We build the network on quality, not on payments from brands. Our advisory fee comes entirely from clients, which keeps our recommendations unbiased.' },
  { q: 'What happens after I submit a partner application?', a: 'We review your application within 3–5 business days. If your profile is a fit, we\'ll reach out to schedule a brief conversation before onboarding you to the network.' },
  { q: 'Will INTEXA send me clients regularly?', a: 'Referrals are based on fit — not volume commitments. When a client\'s project matches your profile, we\'ll refer them. Active brands with strong client feedback tend to receive more matches.' },
  { q: 'Can a brand be removed from the network?', a: 'Yes. We track client feedback after every project. If a referred brand consistently underperforms or doesn\'t meet client expectations, they are removed from our network.' },
];
import { Check, Shield, Star, Award } from 'lucide-react';
import PartnerForm from '../components/partners/PartnerForm';

export default function Partners() {
  return (
    <>
      <PageHero title="Our Partner Brands" subtitle="We don't work with everyone. Here's who makes it into our network — and why." />

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Standards"
            title="How we decide who's in"
            description="Every brand goes through a proper check before we recommend them to a single client. Here's what we look at."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              { icon: Shield, title: 'We check their past work', desc: 'We review actual projects — not just photos. Quality, consistency, and how clients felt about the experience.' },
              { icon: Star, title: 'We check what they specialise in', desc: 'A brand great at luxury villas may not be right for a clinic. We match based on actual expertise.' },
              { icon: Award, title: 'We check their budget range', desc: 'We only refer brands who can genuinely deliver within your budget — not ones who will push you to spend more.' },
              { icon: Check, title: 'We track client feedback', desc: 'After every project, we collect feedback. Brands that underperform are removed from our network.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Are You a Brand?"
            title="Apply to join our network"
            description="We're always looking for quality brands to add to our referral list. If you work in Delhi NCR and consistently deliver — we'd like to know you."
          />
          <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
            <PartnerForm />
          </div>
        </div>
      </section>

      <FAQAccordion faqs={partnerFaqs} title="Questions about partnering with INTEXA" description="Everything design brands need to know before applying to our network." />
      <CTASection />
    </>
  );
}