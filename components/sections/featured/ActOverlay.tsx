'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Act, ActKey } from '@/data/projects';
import { ACT_LABELS } from './acts';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Character-by-character reveal, ~40ms per char. */
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{text}</>;
  }

  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: delay + i * 0.04 }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </>
  );
}

export function ActOverlay({ actKey, act }: { actKey: ActKey; act: Act }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={actKey}
        // Outgoing text lifts and disperses (letter-spacing widens) rather than
        // cross-fading — the brief's "dispersal" feel.
        exit={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, y: -12, letterSpacing: '0.05em', transition: { duration: 0.3 } }
        }
        className="max-w-xl"
      >
        <p className="text-[0.68rem] font-semibold tracking-[0.3em] text-accent uppercase">
          <Typewriter text={ACT_LABELS[actKey]} delay={0.3} />
        </p>

        <motion.h3
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.38 }}
          className="display mt-4 text-[clamp(1.7rem,3.4vw,2.9rem)] text-white"
        >
          {act.headline}
        </motion.h3>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {act.specs.map((spec, i) => (
            <motion.span
              key={spec}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.44 + i * 0.06 }}
              className="flex items-center gap-5 text-[0.68rem] font-medium tracking-[0.2em] text-white/70 uppercase"
            >
              {spec}
              {i < act.specs.length - 1 && (
                <span className="h-3 w-px bg-white/25" aria-hidden />
              )}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
