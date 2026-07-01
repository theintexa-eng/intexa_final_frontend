/**
 * Calendly embed helpers for the consultation LP.
 * - loadCalendly(): inject the widget CSS + JS once.
 * - buildCalendlyUrl(): append captured UTMs (Calendly natively tracks utm_*) + prefill.
 * - message helpers: detect Calendly postMessage lifecycle events + extract the booking id.
 * Booking lifecycle (fired by Calendly into window 'message'):
 *   calendly.event_type_viewed → calendly.date_and_time_selected → calendly.event_scheduled
 */
import { getUtm } from '@/hooks/useUtm';

const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';

let loadPromise;

/** Inject the Calendly widget assets once; resolves when window.Calendly is ready. */
export function loadCalendly() {
  if (typeof document === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = WIDGET_CSS;
      link.setAttribute('data-calendly', '1');
      document.head.appendChild(link);
    }
    const s = document.createElement('script');
    s.src = WIDGET_JS;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve(); // resolve anyway; the fallback link still works
    document.head.appendChild(s);
  });
  return loadPromise;
}

/**
 * Append captured attribution to the Calendly URL.
 * Calendly natively persists utm_source/medium/campaign/term/content and returns them
 * in the invitee webhook payload. fbclid is carried via salesforce_uuid (also returned
 * by the webhook) so the Meta click id can reach the CRM when the webhook path is used.
 */
export function buildCalendlyUrl(base, { prefill = {}, hideGdpr = true } = {}) {
  try {
    const url = new URL(base);
    const u = getUtm();
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
      if (u[k]) url.searchParams.set(k, u[k]);
    });
    if (u.fbclid) url.searchParams.set('salesforce_uuid', String(u.fbclid).slice(0, 50));
    if (prefill.name) url.searchParams.set('name', prefill.name);
    if (prefill.email) url.searchParams.set('email', prefill.email);
    if (hideGdpr) url.searchParams.set('hide_gdpr_banner', '1');
    return url.toString();
  } catch {
    return base;
  }
}

export const CALENDLY_EVENTS = {
  scheduled: 'calendly.event_scheduled',
  slotSelected: 'calendly.date_and_time_selected',
  typeViewed: 'calendly.event_type_viewed',
};

/** True if this is a Calendly postMessage event (origin-checked by the caller). */
export function isCalendlyMessage(e) {
  return !!(
    e &&
    typeof e.data === 'object' &&
    e.data &&
    typeof e.data.event === 'string' &&
    e.data.event.indexOf('calendly.') === 0
  );
}

/** Extract a stable booking id (the scheduled-event UUID) from the event_scheduled payload. */
export function bookingIdFromPayload(payload) {
  try {
    const uri = (payload && payload.event && payload.event.uri) || '';
    const parts = uri.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  } catch {
    return '';
  }
}
