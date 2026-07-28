'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Testimonial } from '@/data/testimonials';

/**
 * Fixed scatter positions. Deliberately NOT randomised — the choreography is
 * curated, and a wall that reshuffles on every load reads as a bug.
 * Values are percentages within the section, chosen to stay clear of the
 * centre stage.
 */
const SLOTS = [
  { left: 4, top: 14, scale: 0.95, rotate: -3, opacity: 0.5, drift: 22 },
  { left: 13, top: 62, scale: 0.8, rotate: 2.5, opacity: 0.38, drift: 26 },
  { left: 30, top: 8, scale: 0.7, rotate: -1.5, opacity: 0.32, drift: 19 },
  { left: 78, top: 12, scale: 0.86, rotate: 2, opacity: 0.45, drift: 24 },
  { left: 89, top: 55, scale: 0.75, rotate: -2.5, opacity: 0.35, drift: 21 },
  { left: 66, top: 74, scale: 0.68, rotate: 1.5, opacity: 0.3, drift: 28 },
  { left: 46, top: 84, scale: 0.72, rotate: -2, opacity: 0.33, drift: 23 },
  { left: 22, top: 34, scale: 0.62, rotate: 3, opacity: 0.26, drift: 25 },
] as const;

export function TestimonialWall({
  wall,
  onSelect,
}: {
  wall: Testimonial[];
  onSelect: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden={false}>
      {wall.map((testimonial, i) => {
        const slot = SLOTS[i % SLOTS.length];
        const isHovered = hovered === testimonial.id;

        return (
          <motion.div
            key={testimonial.id}
            layoutId={`portrait-${testimonial.id}`}
            className="pointer-events-auto absolute w-28 xl:w-36"
            style={{ left: `${slot.left}%`, top: `${slot.top}%` }}
            initial={false}
            animate={
              reduced
                ? { opacity: isHovered ? 1 : slot.opacity, scale: slot.scale, rotate: slot.rotate }
                : {
                    opacity: isHovered ? 1 : slot.opacity,
                    scale: isHovered ? slot.scale * 1.12 : slot.scale,
                    rotate: isHovered ? 0 : slot.rotate,
                    // Slow independent float, like paper on a wall in soft air.
                    y: isHovered ? -10 : [0, -slot.drift, 0],
                  }
            }
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: isHovered
                ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                : { duration: 20 + i * 1.7, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={`Bring ${testimonial.name}'s testimonial to the stage: ${testimonial.pullQuote}`}
              onClick={() => onSelect(testimonial.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(testimonial.id);
                }
              }}
              onMouseEnter={() => setHovered(testimonial.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(testimonial.id)}
              onBlur={() => setHovered(null)}
              className={`block cursor-pointer transition-shadow duration-500 ${
                isHovered ? 'shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]' : ''
              }`}
            >
              <div
                className={`relative aspect-[3/4] overflow-hidden border transition-colors duration-500 ${
                  isHovered ? 'border-accent' : 'border-white/10'
                }`}
              >
                <Image
                  src={testimonial.portrait}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover"
                  aria-hidden
                />
              </div>

              <p className="mt-2 line-clamp-2 text-[0.62rem] leading-snug text-white/50">
                {testimonial.pullQuote}
              </p>
            </div>

            {/* Preview tooltip. */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-52 -translate-x-1/2 border border-white/15 bg-black/90 p-3 backdrop-blur-md"
                >
                  <p className="text-[0.78rem] font-medium text-white">{testimonial.name}</p>
                  <p className="mt-0.5 text-[0.6rem] tracking-[0.16em] text-accent uppercase">
                    {testimonial.role}
                  </p>
                  <p className="mt-2 text-[0.7rem] leading-snug text-white/55">
                    {testimonial.fullQuote.split(' ').slice(0, 8).join(' ')}…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
