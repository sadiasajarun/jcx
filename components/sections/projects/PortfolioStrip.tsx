'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, Hand } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useFilters } from '@/components/filters-context';
import { ProjectPoster } from './ProjectPoster';
import { StripCursor } from './StripCursor';

const EASE = [0.22, 1, 0.36, 1] as const;
const GAP = 48;

/**
 * Mosaic rhythm: every 4th card goes wide, and alternate cards sit ~40px lower
 * so the eye reads a wave instead of a bar. Uniform sizing is exactly what this
 * section exists to escape.
 */
function layoutFor(project: Project, index: number) {
  const wide = Boolean(project.featured) && index % 4 === 3;
  return {
    wide,
    offsetY: index % 2 === 1 ? 40 : 0,
    driftRate: ((index % 3) - 1) * 0.6,
  };
}

export function PortfolioStrip({ visible }: { visible: Project[] }) {
  const reduced = useReducedMotion();
  const { resetFilters } = useFilters();

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  /** Horizontal-scroll hijack only applies on wide viewports with a mouse. */
  const [hijack, setHijack] = useState(false);
  const [distance, setDistance] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px) and (hover: hover)');
    const sync = () => setHijack(query.matches && !reduced);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [reduced]);

  /** How far the track must travel to bring its right edge into view. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 96));
  }, []);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, visible.length]);

  /* ── Vertical scroll → horizontal translate ─────────────── */
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  // The spring is the "momentum" — the strip feels weighted, on rails.
  const x = useSpring(rawX, { stiffness: 90, damping: 26, mass: 0.6 });
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  /* ── Arrow / keyboard nudges (native-scroll modes) ──────── */
  const nudge = (direction: 1 | -1) => {
    stripRef.current?.scrollBy({ left: direction * 620, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nudge(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nudge(-1);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  const posters = visible.map((project, i) => {
    const { wide, offsetY, driftRate } = layoutFor(project, i);
    return (
      <motion.div
        key={project.slug}
        layout
        // Cards that survive a filter change reposition; leavers are pulled up
        // and out like a card from a deck; arrivals rise in from below.
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -70, rotate: -4 }}
        transition={{ duration: 0.55, ease: EASE, layout: { duration: 0.7, ease: EASE } }}
        style={{ marginTop: hijack ? offsetY : 0 }}
        className={`shrink-0 snap-center ${
          wide
            ? 'h-[520px] w-[88vw] md:h-[580px] md:w-[940px] xl:h-[720px] xl:w-[1180px]'
            : 'h-[520px] w-[85vw] md:h-[580px] md:w-[460px] xl:h-[720px] xl:w-[580px]'
        }`}
      >
        <ProjectPoster
          project={project}
          serial={i + 1}
          variant={wide ? 'wide' : 'standard'}
          driftRate={driftRate}
          className="size-full"
        />
      </motion.div>
    );
  });

  const empty = (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-24 text-center">
      <Building2 className="size-10 text-accent" strokeWidth={1} aria-hidden />
      <p className="display text-2xl text-ink">No projects match. Adjust your filters.</p>
      <button
        type="button"
        onClick={resetFilters}
        className="link-underline cursor-pointer text-[0.75rem] font-semibold tracking-[0.16em] text-accent uppercase"
      >
        Reset →
      </button>
    </div>
  );

  /* ── Reduced motion: plain two-column grid, no hijack ───── */
  if (reduced) {
    return (
      <div className="shell mt-16">
        {visible.length === 0 ? (
          empty
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[520px]"
              >
                <ProjectPoster project={project} serial={i + 1} className="size-full" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const track = (
    <motion.div
      ref={trackRef}
      layout
      style={hijack ? { x } : undefined}
      className="flex items-start gap-12 px-6 md:px-12"
    >
      <AnimatePresence mode="popLayout">{posters}</AnimatePresence>
    </motion.div>
  );

  return (
    <>
      {/* The pin wrapper is as tall as the horizontal distance to travel, so
          vertical scroll maps 1:1 onto the strip's horizontal translate. */}
      <div
        ref={pinRef}
        style={hijack ? { height: `calc(100vh + ${distance}px)` } : undefined}
        className="relative mt-12"
      >
        <div className={hijack ? 'sticky top-0 flex h-screen items-center overflow-hidden' : ''}>
          {visible.length === 0 ? (
            <div className="shell w-full">{empty}</div>
          ) : hijack ? (
            <div className="relative w-full">
              {/* Edge masks — cards emerge from and dissolve into the void. */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-bg to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-bg to-transparent"
                aria-hidden
              />
              {track}
            </div>
          ) : (
            // Tablet + mobile: native horizontal scroll with snap points.
            <div
              ref={stripRef}
              tabIndex={0}
              role="region"
              aria-label="JCX portfolio — scroll horizontally"
              className="no-scrollbar w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            >
              {track}
            </div>
          )}

          {/* Arrow escape hatches for anyone who doesn't grok the hijack. */}
          {visible.length > 0 && !hijack && (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 justify-between px-3">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => nudge(dir)}
                  aria-label={dir === 1 ? 'Next projects' : 'Previous projects'}
                  className="pointer-events-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {dir === 1 ? (
                    <ArrowRight className="size-4" aria-hidden />
                  ) : (
                    <ArrowLeft className="size-4" aria-hidden />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Drag hint — touch only, dismissed on first interaction. */}
          <AnimatePresence>
            {!hijack && showHint && visible.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onAnimationComplete={() => setTimeout(() => setShowHint(false), 3200)}
                className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-[0.7rem] tracking-[0.14em] text-white/90 uppercase backdrop-blur-sm md:hidden"
              >
                <motion.span
                  animate={{ x: [6, -6, 6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Hand className="size-4" aria-hidden />
                </motion.span>
                Drag to explore
              </motion.div>
            )}
          </AnimatePresence>

          <StripCursor containerRef={pinRef} enabled={hijack} />
        </div>
      </div>

      {/* ── Footer: progress + CTA ───────────────────────────── */}
      <div className="shell mt-10 flex items-center gap-8">
        <div className="h-px flex-1 bg-line" aria-hidden>
          <motion.div
            className="h-px bg-accent"
            style={hijack ? { width: progress } : { width: '100%' }}
          />
        </div>
        <Link
          href="/properties"
          className="link-underline shrink-0 cursor-pointer text-[0.75rem] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:text-accent"
        >
          View all 60+ projects
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </>
  );
}
