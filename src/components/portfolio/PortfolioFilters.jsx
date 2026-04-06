import React from 'react';

const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'clinic', label: 'Clinic' },
];

const styles = [
  { value: 'all', label: 'All Styles' },
  { value: 'modern', label: 'Modern' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'eclectic', label: 'Eclectic' },
];

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
        active
          ? 'bg-primary text-white border-primary'
          : 'bg-white border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}

export default function PortfolioFilters({ propertyFilter, styleFilter, onPropertyChange, onStyleChange, total }) {
  return (
    <div className="space-y-4 mb-10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1 w-16">Type</span>
        {propertyTypes.map(t => (
          <FilterChip
            key={t.value}
            label={t.label}
            active={propertyFilter === t.value}
            onClick={() => onPropertyChange(t.value)}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1 w-16">Style</span>
        {styles.map(s => (
          <FilterChip
            key={s.value}
            label={s.label}
            active={styleFilter === s.value}
            onClick={() => onStyleChange(s.value)}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{total} project{total !== 1 ? 's' : ''} shown</p>
    </div>
  );
}