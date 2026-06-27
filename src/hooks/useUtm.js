/**
 * UTM / click-id capture for campaign attribution.
 * Reads ad params on first LP load, persists to sessionStorage, and exposes them
 * for analytics events + to embed in the inquiry message (frontend-only CRM
 * attribution; first-class CRM UTM fields are a backend follow-up).
 */
import { useEffect } from 'react';

const KEY = 'intexa_utm';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export function getUtm() {
  try { return JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function captureUtm() {
  if (typeof window === 'undefined') return {};
  try {
    const sp = new URLSearchParams(window.location.search);
    const data = { ...getUtm() };
    UTM_KEYS.forEach((k) => { const v = sp.get(k); if (v) data[k] = v; });
    ['fbclid', 'gclid'].forEach((k) => { const v = sp.get(k); if (v) data[k] = v; });
    if (!data.landing_path) data.landing_path = window.location.pathname;
    if (!data.referrer && document.referrer) data.referrer = document.referrer;
    sessionStorage.setItem(KEY, JSON.stringify(data));
    return data;
  } catch { return getUtm(); }
}

/** Human-readable attribution suffix to append to the inquiry message. */
export function utmToMessage() {
  const u = getUtm();
  const keys = Object.keys(u);
  if (!keys.length) return '';
  return '\n\n[attribution] ' + keys.map((k) => `${k}=${u[k]}`).join('; ');
}

export function useUtm() {
  useEffect(() => { captureUtm(); }, []);
}
