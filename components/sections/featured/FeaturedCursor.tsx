'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorZone = 'hold' | 'prev' | 'next' | 'explore';

const LABELS: Record<CursorZone, string> = {
  hold: 'Hold',
  prev: '← Prev',
  next: 'Next →',
  explore: 'Explore',
};

/** Scoped cursor for the featured canvas. Mouse-only, never on touch. */
export function FeaturedCursor({
  containerRef,
  enabled,
  zone,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  zone: CursorZone;
}) {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.45 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef, enabled, x, y]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[70] -translate-x-1/2 -translate-y-1/2"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          aria-hidden
        >
          <motion.div
            animate={{ width: zone === 'hold' ? 68 : 82 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="flex h-[68px] items-center justify-center rounded-full border border-accent-strong bg-brand-deep/85 backdrop-blur-sm"
          >
            <span className="text-[0.55rem] font-semibold tracking-[0.14em] text-white uppercase">
              {LABELS[zone]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
