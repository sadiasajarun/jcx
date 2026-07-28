'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { heroSlides } from '@/data/content';
import { SearchBar } from './SearchBar';

const SLIDE_MS = 5000;

export interface HeroProps {
  /** Swap between the background film and the still image. */
  media?: 'image' | 'video';
  videoSrc?: string;
  /**
   * Shown before the film has enough data to paint, and used on its own for
   * `media="image"` or when the viewer prefers reduced motion. This is a real
   * frame lifted from the film, so the swap is invisible.
   */
  posterSrc?: string;
}

export function Hero({
  media = 'video',
  videoSrc = '/videos/hero.mp4',
  posterSrc = '/images/hero/hero-poster.jpg',
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  // A 30s autoplaying loop is exactly what `prefers-reduced-motion` is for —
  // those viewers get the still frame instead.
  const showVideo = media === 'video' && !reduced;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const slide = heroSlides[index];

  return (
    <section
      id="hero"
      aria-label="JCX Developments — welcome"
      className="relative flex h-[100svh] min-h-[600px] w-full flex-col justify-end overflow-hidden"
    >
      {/* ── Background media ──────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        {showVideo ? (
          <video
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterSrc}
            aria-hidden
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className={`relative size-full ${reduced ? '' : 'ken-burns'}`}>
            <Image
              src={posterSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              aria-hidden
            />
          </div>
        )}

        {/* Bottom→top scrim. Deliberately steep and short: it is dense only
            across the lower third where the headline and search bar sit, and
            all but clear above 45% so the film reads as film. The old ramp
            carried 35% black to the very top and flattened the footage. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to top, rgb(6 8 12 / 0.86) 0%, rgb(6 8 12 / 0.6) 20%, rgb(6 8 12 / 0.22) 40%, rgb(6 8 12 / 0.06) 62%, rgb(6 8 12 / 0) 100%)',
          }}
          aria-hidden
        />

        {/* Left→right wash. The headline and its red eyebrow are left-aligned,
            and the film is a bright daylight render — this buys their contrast
            locally instead of darkening the whole frame to get it. The right
            half of the footage stays untouched. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(6 8 12 / 0.72) 0%, rgb(6 8 12 / 0.5) 22%, rgb(6 8 12 / 0.2) 45%, rgb(6 8 12 / 0) 70%)',
          }}
          aria-hidden
        />
      </div>

      {/* ── Rotating headline ─────────────────────────────────────── */}
      <div className="shell relative pb-8 md:pb-10">
        <div className="min-h-[240px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              {/* `.display` ships at font-weight 300 — every line overrides it,
                  otherwise the type reads thin over moving footage. The shadow
                  is what holds the edges as bright frames pass underneath. */}
              <h1 className="display text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.55)]">
                <span className="block text-[0.9rem] font-semibold tracking-[0.34em] text-accent uppercase md:text-base">
                  {slide.lines[0]}
                </span>
                <span className="mt-3 block text-[clamp(4.25rem,11vw,7.5rem)] font-semibold italic md:mt-4">
                  {slide.lines[1]}
                </span>
                <span className="mt-3 block text-[clamp(1.35rem,3.2vw,2.35rem)] font-medium tracking-[0.16em] text-white uppercase">
                  {slide.lines[2]}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Search bar overlay (lower third) ──────────────────────── */}
      <div className="shell relative pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────── */}
      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-white/60 transition-colors hover:text-accent md:flex"
      >
        <span className="text-[0.6rem] tracking-[0.24em] uppercase">Scroll</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-4" aria-hidden />
        </motion.span>
      </a>
    </section>
  );
}
