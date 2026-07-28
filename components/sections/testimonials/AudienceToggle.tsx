'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AudienceFilter } from '@/data/testimonials';

const SPRING = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 };

export function AudienceToggle({
  value,
  counts,
  onChange,
}: {
  value: AudienceFilter;
  counts: Record<AudienceFilter, number>;
  onChange: (next: AudienceFilter) => void;
}) {
  const [hovered, setHovered] = useState<AudienceFilter | null>(null);

  const options: { value: AudienceFilter; label: string }[] = [
    { value: 'all', label: 'All voices' },
    { value: 'homeowner', label: 'Homeowners' },
    { value: 'landowner', label: 'Landowners' },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Filter testimonials by audience"
      className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1 backdrop-blur-sm"
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            onMouseEnter={() => setHovered(option.value)}
            onMouseLeave={() => setHovered(null)}
            className="relative cursor-pointer rounded-full px-5 py-2 text-[0.72rem] font-medium tracking-[0.1em] whitespace-nowrap uppercase"
          >
            {isActive && (
              <motion.span
                layoutId="audience-capsule"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-brand"
                aria-hidden
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-white' : 'text-white/55'}`}>
              {option.label}
              {/* Count previews on hover, so the visitor knows what they'd get. */}
              <span
                className={`ml-1.5 tabular-nums transition-opacity duration-200 ${
                  hovered === option.value ? 'opacity-100' : 'opacity-0'
                }`}
              >
                ({counts[option.value]})
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
