'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from 'framer-motion';
import type { Act, ActKey } from '@/data/projects';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { ACT_MOVES } from './acts';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The image stage: Ken Burns per act, a directional light-wipe on every act
 * change, cursor parallax and spotlight, and film grain over the lot.
 */
export function FeaturedCanvas({
  actKey,
  act,
  actIndex,
  durationMs,
  playing,
  parallaxX,
  parallaxY,
  spotlight,
  priority,
}: {
  actKey: ActKey;
  act: Act;
  actIndex: number;
  durationMs: number;
  playing: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  spotlight: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const move = ACT_MOVES[actKey];

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Cursor parallax wrapper — the frame shifts against the pointer. */}
      <motion.div className="absolute inset-[-3%]" style={{ x: parallaxX, y: parallaxY }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={`${actKey}-${actIndex}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduced ? false : move.from}
              animate={reduced ? undefined : playing ? move.to : move.from}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
            >
              <Image
                src={act.image}
                alt={act.headline}
                fill
                priority={priority}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Directional light wipe — a soft gold bar sweeps the cut. */}
      {!reduced && (
        <AnimatePresence>
          <motion.div
            key={`wipe-${actKey}-${actIndex}`}
            className="pointer-events-none absolute inset-y-0 w-16 blur-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgb(236 28 45 / 0.55), rgb(255 255 255 / 0.7), rgb(236 28 45 / 0.55), transparent)',
            }}
            initial={{ left: '-10%', opacity: 0 }}
            animate={{ left: '105%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            aria-hidden
          />
        </AnimatePresence>
      )}

      {/* Legibility scrim — heavier bottom-left where the overlay sits. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/85 via-black/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35"
        aria-hidden
      />

      {/* Spotlight blooming from the cursor. */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />
      )}

      <FilmGrain />
    </div>
  );
}
