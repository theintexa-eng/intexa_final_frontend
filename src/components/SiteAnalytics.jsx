/**
 * SiteAnalytics — ONE site-wide measurement mount.
 * Boots the live GTM container (GTM-PVCG27S6 → GA4 + Meta Pixel), captures UTM,
 * renders the consent banner, and installs a single delegated click listener that
 * standardises interaction events across the WHOLE site (no per-page wiring):
 *   tel: → call_click · mailto: → email_click · wa.me → whatsapp_click
 *   downloads → file_download · external links → outbound_click · [data-cta] → cta_click
 * GA4 Enhanced Measurement (already ON) independently covers page_view / scroll /
 * outbound / file downloads; these dataLayer events add the standardised taxonomy.
 */
import React, { useEffect } from 'react';
import { bootAnalytics, trackEvent } from '@/lib/analytics';
import { captureUtm } from '@/hooks/useUtm';
import ConsentBanner from './lp/ConsentBanner';

export default function SiteAnalytics() {
  useEffect(() => {
    captureUtm();
    bootAnalytics();

    const onClick = (e) => {
      const target = e.target;
      const a = target && target.closest ? target.closest('a[href]') : null;
      if (a) {
        const href = a.getAttribute('href') || '';
        const text = (a.textContent || '').trim().slice(0, 80);
        if (href.startsWith('tel:')) return trackEvent('call_click', { href, text });
        if (href.startsWith('mailto:')) return trackEvent('email_click', { href });
        if (/wa\.me|api\.whatsapp\.com|wa\.link/i.test(href)) return trackEvent('whatsapp_click', { href });
        if (a.hasAttribute('download') || /\.(pdf|docx?|xlsx?|pptx?|zip|csv)(\?|#|$)/i.test(href)) {
          return trackEvent('file_download', { href, text });
        }
        if (/^https?:\/\//i.test(href)) {
          try {
            const u = new URL(href, window.location.href);
            if (u.host !== window.location.host && !/(^|\.)intexa\.in$/i.test(u.host)) {
              return trackEvent('outbound_click', { href: u.href, host: u.host });
            }
          } catch { /* ignore */ }
        }
        if (a.dataset && a.dataset.cta) return trackEvent('cta_click', { loc: a.dataset.cta, text });
        return;
      }
      const cta = target && target.closest ? target.closest('[data-cta]') : null;
      if (cta) trackEvent('cta_click', { loc: cta.dataset.cta });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return <ConsentBanner />;
}
