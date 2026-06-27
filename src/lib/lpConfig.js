/**
 * Per-angle config for the Meta Ads landing pages. One component set, scent-matched
 * hero copy per angle. Business values (price/stats/testimonials) are NOT duplicated
 * here — they live in the reused landing/* components (single source of truth).
 */

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.intexa.in').replace(/\/$/, '');
export const LP_PHONE = '+919217919111';
export const LP_PHONE_DISPLAY = '+91 9217 919 111';
// Shared hero image (reuse the existing live hero asset; per-angle override via config later).
export const HERO_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=70&w=1600&auto=format&fit=crop';
const OG_IMAGE = 'https://media.base44.com/images/public/user_69bf8f0482d83e3867d98bbb/580701ef2_FinalLogoTransparent_1.png';

export const ANGLES = {
  consultation: {
    serviceInterest: 'studio_matching',
    eyebrow: 'Delhi NCR · Interior Project Advisory',
    title: 'We work for you — not your designer.',
    subtitle: "INTEXA is your independent project advisor. We plan your brief, match you with 2–3 vetted brands, and protect your budget — book a 30-minute consultation. ₹2,999, pay only after your match is confirmed.",
    ctaLabel: 'Book 30-Min Consultation →',
    seoTitle: 'Interior Project Advisory, Delhi NCR | INTEXA',
    seoDescription: 'Independent interior project advisory in Delhi NCR. We plan your brief, match the right brand and protect your budget. Book a 30-min consultation — ₹2,999, pay after match.',
  },
  'boq-audit': {
    serviceInterest: 'boq_audit',
    eyebrow: 'Delhi NCR · Independent BOQ Review',
    title: 'Is your quote really teak — or plywood?',
    subtitle: 'An independent, line-by-line review of your BOQ before you pay — so you know exactly what you are paying for. ₹1,999 per audit, GST included.',
    ctaLabel: 'Get Your BOQ Reviewed →',
    seoTitle: 'Independent BOQ Review, Delhi NCR | INTEXA',
    seoDescription: 'Is your interior quote fair? INTEXA reviews your BOQ line by line before you pay — ₹1,999 per audit. Book a review with an independent advisor.',
  },
  'brand-match': {
    serviceInterest: 'studio_matching',
    eyebrow: 'Delhi NCR · Brand Matching',
    title: "800 designers in Gurgaon. We'll find your one.",
    subtitle: 'One structured consultation, one curated shortlist of 2–3 brands — matched to your style, budget and project. You choose, we advise.',
    ctaLabel: 'Get Matched with the Right Brands →',
    seoTitle: 'Interior Brand Matching, Delhi NCR | INTEXA',
    seoDescription: 'Stop guessing between hundreds of designers. INTEXA matches you to 2–3 vetted brands for your project. Book a 30-min consultation — ₹2,999.',
  },
  plan: {
    serviceInterest: 'studio_matching',
    eyebrow: 'Delhi NCR · Interior Project Advisory',
    title: 'Just got possession? Start right.',
    subtitle: 'Get a clear brief and a realistic budget before you talk to a single designer — from an advisor who works only for you.',
    ctaLabel: 'Plan My Project →',
    seoTitle: 'Plan Your Interior Project, Delhi NCR | INTEXA',
    seoDescription: 'New home? Get a clear brief and budget before you hire anyone. INTEXA plans, matches and protects your project. Book a 30-min consultation.',
  },
};

export const DEFAULT_ANGLE = 'consultation';
export const isAngle = (a) => Object.prototype.hasOwnProperty.call(ANGLES, a);

// FAQs — sourced from the live FAQ content (kept consistent with the site).
export const LP_FAQS = [
  { q: 'How does INTEXA make money if it’s independent?', a: 'You pay only the consultation fee. We take zero commission from any brand we recommend — our advice is never influenced by who pays us, because no brand does.' },
  { q: 'How much does the consultation cost?', a: '₹2,999, one-time and all-inclusive. You pay only after your match is confirmed. All prices include GST — what you see is what you pay.' },
  { q: 'Do I still choose my own brand?', a: 'Always. We give you a vetted shortlist of 2–3 brands and the clarity to choose confidently. You choose; we advise.' },
  { q: 'Is the BOQ Audit mandatory or optional?', a: 'Optional. A BOQ Audit is ₹1,999 per audit — a line-by-line review of your bill of quantities with rates compared to current market prices, a written report, and a call to walk you through it.' },
  { q: 'Which areas do you serve?', a: 'Delhi, Gurgaon, Noida, Greater Noida and Faridabad — across Delhi NCR.' },
  { q: 'Will I get spammed with vendor calls?', a: 'Never. One advisor calls you within 24 hours to schedule your consultation. No spam, no random vendor calls.' },
];

export function lpSeo(angle) {
  const a = ANGLES[angle] || ANGLES[DEFAULT_ANGLE];
  const url = `${SITE_URL}/lp/${angle}`;
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    canonical: url,
    image: OG_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfessionalService',
          '@id': `${SITE_URL}/#business`,
          name: 'INTEXA',
          description: 'Independent interior project advisory in Delhi NCR — plan your brief, match the right brand, and review your BOQ.',
          url,
          telephone: LP_PHONE,
          areaServed: ['Delhi', 'Gurgaon', 'Noida', 'Greater Noida', 'Faridabad'].map((n) => ({ '@type': 'City', name: n })),
          makesOffer: {
            '@type': 'Offer',
            name: 'Brand Matching Consultation',
            price: '2999',
            priceCurrency: 'INR',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: LP_FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    },
  };
}
