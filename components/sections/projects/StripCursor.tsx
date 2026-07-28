'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Cursor replacement scoped to the strip region. Mounted only when the pointer
 * is genuinely a mouse — never on touch, never under reduced motion.
 */
export function StripCursor({
  containerRef,
  enabled,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [overCard, setOverCard] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Slight lag so the ring trails the pointer rather than sticking to it.
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setOverCard(Boolean((e.target as HTMLElement)?.closest('[data-poster]')));
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
          className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <motion.div
            animate={{ width: overCard ? 74 : 66, height: overCard ? 74 : 66 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="flex items-center justify-center rounded-full border border-accent-strong bg-brand-deep/85 backdrop-blur-sm"
          >
            {overCard ? (
              <span className="flex items-center gap-1 text-[0.55rem] font-semibold tracking-[0.16em] text-white uppercase">
                View
                <ArrowRight className="size-3" />
              </span>
            ) : (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="text-[0.55rem] font-semibold tracking-[0.16em] text-white uppercase"
              >
                Scroll
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
