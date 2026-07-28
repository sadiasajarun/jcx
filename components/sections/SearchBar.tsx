'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { LOCATIONS, type Category, type Status } from '@/data/projects';
import { useFilters } from '@/components/filters-context';

const TYPE_OPTIONS: { value: Category | 'condominium' | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  // Condominium projects are seeded as residential in the data file.
  // TODO: confirm with client whether Condominium is its own category.
  { value: 'condominium', label: 'Condominium' },
];

const STATUS_OPTIONS: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' },
];

function Field({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const active = value !== 'all';

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-1 md:px-5">
      <label
        htmlFor={id}
        className={`text-[0.65rem] font-medium tracking-[0.18em] uppercase transition-colors ${
          active ? 'text-accent' : 'text-muted'
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none truncate rounded-md border border-transparent bg-transparent py-1 pr-7 text-sm font-medium transition-colors focus:border-accent/40 ${
            active ? 'text-accent' : 'text-ink'
          }`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
      </div>
    </div>
  );
}

/**
 * Floating glass filter bar over the hero. Live-filters the projects grid
 * below on change; Search scrolls the visitor down to the filtered results.
 */
export function SearchBar({ className = '' }: { className?: string }) {
  const { filters, setFilters, submitSearch } = useFilters();

  // "Condominium" has no seeded projects yet, so it filters as Residential —
  // but the select must keep showing what the visitor actually picked.
  // TODO: confirm with client whether Condominium is a category of its own.
  const [typeChoice, setTypeChoice] = useState<string>(filters.type);

  // The projects grid can change the category too. When it does, the select
  // follows it rather than holding a stale "Condominium".
  const resolved = typeChoice === 'condominium' ? 'residential' : typeChoice;
  const displayedType = resolved === filters.type ? typeChoice : filters.type;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();

    // Single-page build: the grid below is already filtered live, so Search
    // just takes the visitor to it. When a /properties page exists, push
    // `/properties?type=&status=&location=` from here instead.
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Find a JCX project"
      className={`w-full rounded-2xl border border-white/25 bg-[var(--surface-glass)] p-4 shadow-soft backdrop-blur-xl md:rounded-full md:p-2.5 md:pl-6 dark:border-white/10 ${className}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
        <Field
          id="filter-type"
          label="Project Type"
          value={displayedType}
          onChange={(v) => {
            setTypeChoice(v);
            setFilters({ type: (v === 'condominium' ? 'residential' : v) as Category | 'all' });
          }}
          options={TYPE_OPTIONS}
        />

        <span className="hidden h-9 w-px bg-line md:block" aria-hidden />

        <Field
          id="filter-status"
          label="Status"
          value={filters.status}
          onChange={(v) => setFilters({ status: v as Status | 'all' })}
          options={STATUS_OPTIONS}
        />

        <span className="hidden h-9 w-px bg-line md:block" aria-hidden />

        <Field
          id="filter-location"
          label="Location"
          value={filters.location}
          onChange={(v) => setFilters({ location: v })}
          options={[
            { value: 'all', label: 'All' },
            ...LOCATIONS.map((l) => ({ value: l, label: l })),
          ]}
        />

        <button
          type="submit"
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-deep hover:shadow-lg hover:shadow-brand/25 md:ml-4"
        >
          <Search className="size-4" aria-hidden />
          Search
        </button>
      </div>
    </form>
  );
}
