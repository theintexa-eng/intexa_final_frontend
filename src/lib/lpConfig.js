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

// Calendly booking link (team@intexa.in · calendly.com/team-intexa).
// Event: "Free 30-Min Interior Project Consultation" (30 min, Google Meet).
// Override via VITE_CALENDLY_URL in the build env. Used by the appointment-first
// consultation LP (all CTAs → inline embed / popup; UTMs appended at embed time).
export const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL ||
  'https://calendly.com/team-intexa/free-30-min-interior-project-consultation';
// Back-compat alias: existing config/components refer to BOOKING_URL.
export const BOOKING_URL = CALENDLY_URL;

// Appointment-first FAQs for /lp/consultation (no commission claims; consultation-led,
// with carefully qualified savings language).
export const CONSULTATION_FAQS = [
  { q: 'What happens during the consultation?', a: 'A focused 30-minute Google Meet with an independent INTEXA advisor. We understand your space and goals, pressure-test your budget, flag the risks most projects miss, and map out clear next steps — including a shortlist of 2–3 vetted brands that genuinely fit your project.' },
  { q: 'Is the consultation really free?', a: 'Yes — the 30-minute consultation is completely free and with no obligation. It is real, useful advice to help you start your project on the right footing.' },
  { q: 'How can INTEXA help me save on my project?', a: 'Independent, upfront planning helps you avoid over-specifying, mismatched scope and expensive rework. Through better planning and informed decisions, homeowners can potentially save up to 10–15% on a typical project — while improving the final result.' },
  { q: 'Who should book a consultation?', a: 'Anyone planning a ₹15L–₹50L+ home or office interior in Delhi NCR — whether you have just taken possession, are comparing designers, or already have quotations in hand.' },
  { q: 'What should I prepare before the meeting?', a: 'Just the basics: your space (size/layout), a rough budget range, your timeline, and any quotes or designer shortlists you already have. The more context you share when booking, the more tailored the advice.' },
  { q: 'Which areas do you serve?', a: 'Delhi, Gurgaon, Noida, Greater Noida and Faridabad — across Delhi NCR.' },
];

export const ANGLES = {
  consultation: {
    serviceInterest: 'studio_matching',
    bookingUrl: BOOKING_URL,
    faqs: CONSULTATION_FAQS,
    eyebrow: 'Delhi NCR · Free Interior Project Consultation',
    title: 'Plan your interior project right — in one free 30-minute call.',
    subtitle: 'An independent advisor reviews your space, budget and options — then matches you with 2–3 vetted brands. Better planning can save you 10–15% and a lot of costly mistakes.',
    ctaLabel: 'Book My Free Consultation →',
    seoTitle: 'Free Interior Project Consultation, Delhi NCR | INTEXA',
    seoDescription: 'Book a free 30-minute consultation with INTEXA, an independent interior project advisor in Delhi NCR. Plan smarter, budget better, and avoid costly mistakes.',
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
  const faqs = a.faqs || LP_FAQS;
  const offer = angle === 'consultation'
    ? { '@type': 'Offer', name: 'Free 30-Minute Interior Project Consultation', price: '0', priceCurrency: 'INR' }
    : { '@type': 'Offer', name: 'Brand Matching Consultation', price: '2999', priceCurrency: 'INR' };
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
          makesOffer: offer,
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    },
  };
}
