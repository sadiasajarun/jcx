'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Rolling-digit counter. Each digit column animates independently, so only the
 * digits that actually change move — 24 → 14 rolls the tens, leaves the units.
 */
export function Odometer({
  value,
  className = '',
}: {
  value: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const digits = String(value).split('');

  return (
    <span
      className={`inline-flex tabular-nums ${className}`}
      // The visual digits are decorative; screen readers get the plain number.
      aria-hidden
    >
      {digits.map((digit, i) => (
        <span key={`${digits.length}-${i}`} className="relative inline-block overflow-hidden">
          {/* Invisible sizer keeps the column width stable while digits roll. */}
          <span className="invisible">{digit}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              className="absolute inset-0 flex items-center justify-center"
              initial={reduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { y: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
