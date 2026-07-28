'use client';

import { motion } from 'framer-motion';
import { landownersCopy, type LandownerState } from '@/data/landowners';
import { TrustBadges } from './TrustBadges';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface StatePanelProps {
  state: LandownerState;
  /** True while this state owns the scroll window. */
  active: boolean;
  reduced: boolean;
}

/**
 * One narrated panel. All six panels are mounted at once and stacked — only
 * the active one is visible. Stacking rather than swapping keeps the copy in
 * the DOM for assistive tech and search, and means scrubbing backwards
 * cross-fades instead of re-mounting.
 */
export function StatePanel({ state, active, reduced }: StatePanelProps) {
  const isIntro = state.id === 'plot';

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active || reduced ? 0 : 18,
      }}
      transition={{ duration: 0.5, ease: EASE }}
      // Inert when faded out so hidden copy can't be tabbed into.
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      {isIntro ? (
        <>
          <p className="text-[0.7rem] font-semibold tracking-[0.3em] text-[var(--gold-bright)] uppercase">
            {landownersCopy.eyebrow}
          </p>
          <h2
            id="landowners-heading"
            className="display mt-5 text-[clamp(2.75rem,5vw,4.25rem)] text-white"
          >
            {landownersCopy.headline[0]}
            <span className="block italic text-[var(--gold-bright)]">
              {landownersCopy.headline[1]}
            </span>
          </h2>
          <p className="mt-4 text-[1.05rem] tracking-[0.02em] text-white/60">
            {landownersCopy.subline}
          </p>
        </>
      ) : (
        <>
          {state.stepLabel && (
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--gold-bright)] uppercase">
              {state.stepLabel}
            </p>
          )}
          {state.headline && (
            <h3 className="display mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] text-white">
              {state.headline}
            </h3>
          )}
          {state.body && (
            <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-relaxed text-white/72">
              {state.body}
            </p>
          )}
          {state.micro && (
            <p className="mt-4 text-[0.78rem] tracking-[0.04em] text-white/45">{state.micro}</p>
          )}
          <TrustBadges badges={state.badges} />
        </>
      )}
    </motion.div>
  );
}
