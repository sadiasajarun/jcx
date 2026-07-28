'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_FILTERS, type ProjectFilters } from '@/data/projects';

interface FiltersContextValue {
  filters: ProjectFilters;
  setFilters: (next: Partial<ProjectFilters>) => void;
  resetFilters: () => void;
  /** Bumped whenever the hero search bar submits, so the grid can flash/scroll. */
  searchToken: number;
  submitSearch: () => void;
}

const FiltersContext = createContext<FiltersContextValue | null>(null);

/**
 * Shares the hero search-bar state with the projects grid so the control
 * live-filters the page without navigating.
 */
export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<ProjectFilters>(DEFAULT_FILTERS);
  const [searchToken, setSearchToken] = useState(0);

  const setFilters = useCallback((next: Partial<ProjectFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);
  const submitSearch = useCallback(() => setSearchToken((t) => t + 1), []);

  const value = useMemo(
    () => ({ filters, setFilters, resetFilters, searchToken, submitSearch }),
    [filters, setFilters, resetFilters, searchToken, submitSearch],
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters(): FiltersContextValue {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters must be used inside <FiltersProvider>');
  return ctx;
}
