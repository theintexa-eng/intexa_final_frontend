import React, { useState, useEffect } from 'react';

export default function LandingStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (~80vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('get-matched-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border px-4 py-3 shadow-lg">
      <button
        onClick={scrollToForm}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-lg font-semibold text-sm transition-colors"
      >
        Get Matched with the Right Brands →
      </button>
      <p className="text-center text-xs text-muted-foreground mt-1.5">
        Free to submit · Pay only after your match
      </p>
    </div>
  );
}