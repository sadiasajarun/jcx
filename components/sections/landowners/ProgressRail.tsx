'use client';

import { landownerStates } from '@/data/landowners';

export interface ProgressRailProps {
  activeIndex: number;
  /** Jump the page scroll to the middle of a state's window. */
  onJump: (index: number) => void;
  /** `static` drops the tween and renders a plain jump-nav for reduced motion. */
  variant?: 'scroll' | 'static';
}

/**
 * Vertical on desktop, horizontal on tablet, dots on mobile. Clicking a step
 * tweens the page scroll to that state (see `onJump` in the parent — the
 * easing lives there because only the parent knows the pin geometry).
 */
export function ProgressRail({ activeIndex, onJump, variant = 'scroll' }: ProgressRailProps) {
  return (
    <nav
      aria-label="Landowner journey steps"
      className={
        variant === 'static'
          ? 'flex flex-wrap gap-x-6 gap-y-3'
          : // Desktop: pinned to the right edge, vertical. Tablet/mobile: a
            // horizontal strip along the bottom of the pinned viewport.
            'absolute right-4 bottom-6 left-4 flex items-center justify-center gap-5 lg:top-1/2 lg:right-8 lg:bottom-auto lg:left-auto lg:-translate-y-1/2 lg:flex-col lg:items-end lg:gap-6'
      }
    >
      {landownerStates.map((state, i) => {
        const current = i === activeIndex;
        return (
          <button
            key={state.id}
            type="button"
            onClick={() => onJump(i)}
            aria-current={current ? 'step' : undefined}
            title={state.promise}
            // `relative` anchors the hover tooltip below.
            className="group relative flex cursor-pointer items-center gap-2.5 lg:flex-row-reverse"
          >
            {/* Label — always present on desktop, hidden on the compact rail. */}
            <span
              className={`hidden text-[0.6rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300 lg:block ${
                current
                  ? 'text-[var(--gold-bright)]'
                  : 'text-white/35 group-hover:text-white/70'
              }`}
            >
              {state.rail}
            </span>

            <span
              className={`block rounded-full transition-all duration-500 ${
                current
                  ? 'size-2.5 bg-[var(--gold-bright)] ring-4 ring-[var(--gold-bright)]/20'
                  : 'size-1.5 bg-white/30 group-hover:bg-white/60'
              }`}
            />

            {/* Tooltip: the step's core promise, on hover. */}
            <span className="pointer-events-none absolute right-full mr-4 hidden max-w-[15rem] rounded-lg border border-[var(--gold)]/25 bg-[#0b1428]/92 px-3 py-2 text-[0.68rem] leading-snug text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 lg:block">
              {state.promise}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
