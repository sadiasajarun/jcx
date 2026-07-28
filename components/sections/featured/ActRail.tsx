'use client';

import { motion } from 'framer-motion';
import type { ActKey } from '@/data/projects';
import { ACT_LABELS } from './acts';

/**
 * Scrubbable act progress. Each bar fills over its act's duration; clicking a
 * bar jumps straight to that act.
 */
export function ActRail({
  acts,
  activeIndex,
  playing,
  durationMs,
  onScrub,
}: {
  acts: ActKey[];
  activeIndex: number;
  playing: boolean;
  durationMs: number;
  onScrub: (index: number) => void;
}) {
  return (
    <div className="flex w-full items-end gap-3">
      {acts.map((key, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onScrub(i)}
            aria-label={`Jump to act ${i + 1}: ${ACT_LABELS[key]}`}
            aria-current={isActive}
            className="group relative flex-1 cursor-pointer py-3"
          >
            {/* Tooltip on hover. */}
            <span className="pointer-events-none absolute -top-1 left-0 text-[0.6rem] font-medium tracking-[0.22em] text-white/0 uppercase transition-colors duration-300 group-hover:text-white/70">
              {ACT_LABELS[key]}
            </span>

            <span
              className={`block h-[3px] w-full overflow-hidden bg-white/15 transition-all duration-300 group-hover:h-[5px] ${
                isActive ? 'shadow-[0_0_14px_rgba(236,28,45,0.75)]' : ''
              }`}
            >
              <motion.span
                className="block h-full bg-accent-strong"
                initial={false}
                // Remount per act so the fill restarts from zero each time.
                key={`${key}-${activeIndex}-${playing}`}
                animate={{ width: isPast ? '100%' : isActive ? '100%' : '0%' }}
                transition={
                  isActive
                    ? { duration: playing ? durationMs / 1000 : 0, ease: 'linear' }
                    : { duration: 0.3 }
                }
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
