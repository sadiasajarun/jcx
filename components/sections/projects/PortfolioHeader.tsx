'use client';

import { motion } from 'framer-motion';
import type { Category, Status } from '@/data/projects';
import { useFilters } from '@/components/filters-context';
import { Odometer } from '@/components/ui/Odometer';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
];

const STATUSES: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' },
];

const SPRING = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 };

/**
 * Command bar for the portfolio strip. Reads and writes the same
 * `FiltersProvider` context the hero search bar uses, so the two stay in sync
 * in both directions with no extra store.
 */
export function PortfolioHeader({ count }: { count: number }) {
  const { filters, setFilters } = useFilters();

  return (
    <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* ── Left: editorial ──────────────────────────────────── */}
      <div className="lg:col-span-7">
        <p className="eyebrow">Our Portfolio — 60+ Projects</p>

        <h2
          id="projects-heading"
          className="display mt-5 text-[clamp(2.4rem,4.6vw,3.6rem)] text-ink"
        >
          Addresses that hold
          <span className="block italic text-brand dark:text-accent">their value.</span>
        </h2>

        <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted">
          Residential and commercial developments across Dhaka&rsquo;s most sought-after
          neighbourhoods.
        </p>
      </div>

      {/* ── Right: controls ──────────────────────────────────── */}
      <div className="flex flex-col gap-6 lg:col-span-5 lg:items-end">
        {/* Segmented category switch — the active capsule glides via layoutId. */}
        <div
          role="radiogroup"
          aria-label="Project category"
          className="inline-flex rounded-full border border-line bg-surface p-1"
        >
          {CATEGORIES.map((c) => {
            const isActive = filters.type === c.value;
            return (
              <button
                key={c.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setFilters({ type: c.value })}
                className="relative cursor-pointer rounded-full px-5 py-2 text-[0.75rem] font-medium tracking-[0.1em] uppercase transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="category-capsule"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-brand"
                    aria-hidden
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-muted'}`}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status row — inline text with a playhead underline that morphs. */}
        <div
          role="radiogroup"
          aria-label="Project status"
          className="no-scrollbar flex items-center gap-5 overflow-x-auto"
        >
          {STATUSES.map((s) => {
            const isActive = filters.status === s.value;
            return (
              <button
                key={s.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setFilters({ status: s.value })}
                className={`relative shrink-0 cursor-pointer pb-1.5 text-[0.78rem] font-medium tracking-[0.08em] uppercase transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {s.label}
                {isActive && (
                  <motion.span
                    layoutId="status-playhead"
                    transition={SPRING}
                    className="absolute inset-x-0 -bottom-px h-px bg-accent"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live count — rolling digits. */}
        <p className="flex items-baseline gap-2 text-muted">
          <span className="display text-[clamp(2rem,3.4vw,2.75rem)] leading-none text-brand dark:text-accent">
            <Odometer value={count} />
          </span>
          <span className="text-[0.72rem] tracking-[0.18em] uppercase">
            {count === 1 ? 'project' : 'projects'}
          </span>
          {/* The odometer is aria-hidden; this carries the value for AT. */}
          <span className="sr-only" aria-live="polite">
            {count} {count === 1 ? 'project' : 'projects'} match the current filters
          </span>
        </p>
      </div>
    </div>
  );
}
