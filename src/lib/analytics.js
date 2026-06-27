/**
 * Analytics — GTM loader + dataLayer helper, DPDP consent-gated.
 * The live site had NO tracking; this adds it for the Meta Ads landing pages only.
 * GTM is the single integration point; GA4 + Meta Pixel are configured as tags
 * INSIDE the GTM container (no per-tag code here). IDs are env-driven (Vite):
 *   VITE_GTM_ID  (if unset, everything safely no-ops)
 */

const GTM_ID = import.meta.env.VITE_GTM_ID;
const CONSENT_KEY = 'intexa_consent';

function dl() {
  if (typeof window === 'undefined') return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushDL(obj) {
  const d = dl();
  if (d) d.push(obj);
}

/** Push a typed event to the dataLayer (processed by GTM once loaded). */
export function trackEvent(event, params = {}) {
  pushDL({ event, ...params });
}

export function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}
function storeConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* ignore */ }
}

let gtmLoaded = false;
function loadGtm() {
  if (gtmLoaded || !GTM_ID || typeof document === 'undefined') return;
  gtmLoaded = true;
  pushDL({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/** Call once on app/LP boot: set denied-by-default, and load GTM if already granted. */
export function bootAnalytics() {
  pushDL({ event: 'default_consent', consent: { ad_storage: 'denied', analytics_storage: 'denied' } });
  if (getConsent() === 'granted') loadGtm();
}

export function grantConsent() {
  storeConsent('granted');
  pushDL({ event: 'consent_update', consent: { ad_storage: 'granted', analytics_storage: 'granted' } });
  loadGtm();
}

export function denyConsent() {
  storeConsent('denied');
  pushDL({ event: 'consent_update', consent: { ad_storage: 'denied', analytics_storage: 'denied' } });
}
