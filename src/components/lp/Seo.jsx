/**
 * Seo — zero-dependency per-page <head> manager (avoids adding react-helmet).
 * Sets title, description, canonical, OG/Twitter tags and a JSON-LD block for the
 * landing pages (the SPA shipped with only static index.html meta).
 */
import { useEffect } from 'react';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description, canonical, image, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertLink('canonical', canonical);

    let s = document.getElementById('lp-jsonld');
    if (jsonLd) {
      if (!s) {
        s = document.createElement('script');
        s.type = 'application/ld+json';
        s.id = 'lp-jsonld';
        document.head.appendChild(s);
      }
      s.textContent = JSON.stringify(jsonLd);
    }
    return () => {
      const j = document.getElementById('lp-jsonld');
      if (j) j.remove();
    };
  }, [title, description, canonical, image, jsonLd]);

  return null;
}
