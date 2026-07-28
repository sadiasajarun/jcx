'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { actsOf, initialsOf } from './acts';

/**
 * Top-right pagination: a table of contents, not arrows. One thin bar per
 * project; hovering reveals the initials and a shot-list thumbnail.
 */
export function ProjectMarkers({
  projects,
  activeIndex,
  onSelect,
}: {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ul className="flex items-end gap-4">
      {projects.map((project, i) => {
        const isActive = i === activeIndex;
        const firstAct = project.acts?.[actsOf(project)[0]];

        return (
          <li key={project.slug} className="relative">
            <button
              type="button"
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              aria-label={`Go to ${project.name}`}
              aria-current={isActive}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <span
                className={`overflow-hidden text-[0.58rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                  isActive || hovered === i ? 'max-h-4 text-accent opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {initialsOf(project.name)}
              </span>
              <span
                className={`w-[2px] transition-all duration-500 ${
                  isActive ? 'h-8 bg-accent-strong' : 'h-6 bg-white/25 group-hover:bg-white/60'
                }`}
              />
            </button>

            {/* Shot-list preview. */}
            <AnimatePresence>
              {hovered === i && firstAct && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute top-full right-0 z-30 mt-3 w-52 overflow-hidden border border-white/15 bg-black/85 backdrop-blur-md"
                >
                  <div className="relative aspect-[10/6]">
                    <Image
                      src={firstAct.image}
                      alt=""
                      fill
                      sizes="208px"
                      className="object-cover"
                      aria-hidden
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[0.78rem] font-medium text-white">{project.name}</p>
                    <p className="mt-0.5 text-[0.65rem] tracking-[0.14em] text-white/50 uppercase">
                      {project.location}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
