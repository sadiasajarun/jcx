'use client';

import { useMemo } from 'react';
import { filterProjects, projects } from '@/data/projects';
import { useFilters } from '@/components/filters-context';
import { PortfolioHeader } from './projects/PortfolioHeader';
import { PortfolioStrip } from './projects/PortfolioStrip';

/**
 * The portfolio exhibit: a sticky command bar over a horizontally-scrolling
 * strip of oversized project posters.
 *
 * Filter state comes from `FiltersProvider`, the same context the hero search
 * bar writes to — change either and both follow.
 */
export function ProjectsSection() {
  const { filters } = useFilters();
  const visible = useMemo(() => filterProjects(projects, filters), [filters]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-y border-line py-24 md:py-28"
    >
      <PortfolioHeader count={visible.length} />
      <PortfolioStrip visible={visible} />
    </section>
  );
}
