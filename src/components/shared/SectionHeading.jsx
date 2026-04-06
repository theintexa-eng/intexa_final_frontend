import React from 'react';

export default function SectionHeading({ label, title, description, center = true, light = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {label && (
        <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-accent' : 'text-accent'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-semibold mt-2 mb-4 ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${light ? 'text-white/70' : 'text-muted-foreground'}`}>
          {description}
        </p>
      )}
    </div>
  );
}