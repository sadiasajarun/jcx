'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  byAudience,
  testimonials,
  type AudienceFilter,
  type Testimonial,
} from '@/data/testimonials';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { AudienceToggle } from './testimonials/AudienceToggle';
import { StageControls } from './testimonials/StageControls';
import { TestimonialModal } from './testimonials/TestimonialModal';
import { TestimonialStage } from './testimonials/TestimonialStage';
import { TestimonialWall } from './testimonials/TestimonialWall';
import { StripCursor } from './projects/StripCursor';

const DESKTOP_MS = 8000;
const MOBILE_MS = 5000;

export function TestimonialsSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [audience, setAudience] = useState<AudienceFilter>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  // Autoplay is off by default under reduced motion — the user clicks through.
  const [playing, setPlaying] = useState(!reduced);
  const [muted, setMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const list = useMemo(() => byAudience(audience), [audience]);
  const active: Testimonial | undefined = list[activeIndex] ?? list[0];
  const durationMs = isDesktop ? DESKTOP_MS : MOBILE_MS;

  const counts = useMemo(
    () => ({
      all: testimonials.length,
      homeowner: byAudience('homeowner').length,
      landowner: byAudience('landowner').length,
    }),
    [],
  );

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px) and (hover: hover)');
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Changing audience resets the stage to the first voice in the new segment.
  useEffect(() => setActiveIndex(0), [audience]);

  const step = useCallback(
    (delta: number) => {
      if (list.length === 0) return;
      // Audio never carries across a change of speaker.
      setMuted(true);
      setActiveIndex((i) => (((i + delta) % list.length) + list.length) % list.length);
    },
    [list.length],
  );

  // Autoplay clock.
  useEffect(() => {
    if (!playing || reduced || modalOpen || list.length < 2) return;
    const id = window.setTimeout(() => step(1), durationMs);
    return () => window.clearTimeout(id);
  }, [playing, reduced, modalOpen, list.length, activeIndex, durationMs, step]);

  /* ── Keyboard ────────────────────────────────────────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const handled = ['ArrowLeft', 'ArrowRight', ' ', 'Enter', '1', '2', '3', 'm', 'M'];
      if (!handled.includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === ' ') setPlaying((p) => !p);
      else if (e.key === 'Enter') setModalOpen(true);
      else if (e.key === 'm' || e.key === 'M') setMuted((m) => !m);
      else setAudience((['all', 'homeowner', 'landowner'] as const)[Number(e.key) - 1]);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [step]);

  const selectById = (id: string) => {
    const index = list.findIndex((t) => t.id === id);
    if (index >= 0) {
      setMuted(true);
      setActiveIndex(index);
    }
  };

  if (!active) return null;

  const wall = list.filter((t) => t.id !== active.id);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="testimonials-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden focus-visible:outline-none"
      style={{
        // A room, not a corridor: the base cools for landowner voices and
        // warms very slightly for homeowners.
        backgroundColor: active.audience === 'landowner' ? '#070A12' : '#0B0907',
        transition: 'background-color 1.2s ease',
      }}
    >
      <FilmGrain opacity={0.12} />

      {/* ── Top strip ──────────────────────────────────────── */}
      <div className="shell relative z-20 flex flex-col gap-6 py-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Testimonials</p>
          <h2 id="testimonials-heading" className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] text-white">
            Beyond Bonding —
            <span className="block italic text-accent">in their words.</span>
          </h2>
        </div>

        <AudienceToggle value={audience} counts={counts} onChange={setAudience} />
      </div>

      {/* ── Stage + wall ───────────────────────────────────── */}
      <div className="relative flex flex-1 items-center">
        <TestimonialWall wall={wall} onSelect={selectById} />

        <motion.div
          className="shell relative z-10 py-10"
          // The stage steps back when a wall card is being inspected.
          animate={{ opacity: 1 }}
        >
          <TestimonialStage
            testimonial={active}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            onOpenModal={() => setModalOpen(true)}
          />
        </motion.div>
      </div>

      {/* ── Mobile wall: avatar chip rail ──────────────────── */}
      <div className="no-scrollbar relative z-20 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 md:hidden">
        {list.map((testimonial) => (
          <button
            key={testimonial.id}
            type="button"
            onClick={() => selectById(testimonial.id)}
            aria-label={`Show ${testimonial.name}'s testimonial`}
            aria-current={testimonial.id === active.id}
            className={`relative size-14 shrink-0 snap-center cursor-pointer overflow-hidden rounded-full border transition-colors ${
              testimonial.id === active.id ? 'border-accent' : 'border-white/15'
            }`}
          >
            <Image
              src={testimonial.portrait}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
              aria-hidden
            />
          </button>
        ))}
      </div>

      {/* ── Bottom strip ───────────────────────────────────── */}
      <div className="shell relative z-20 py-8">
        <StageControls
          list={list}
          activeIndex={activeIndex}
          playing={playing && !modalOpen && list.length > 1}
          durationMs={durationMs}
          onJump={(i) => {
            setMuted(true);
            setActiveIndex(i);
          }}
          onTogglePlay={() => setPlaying((p) => !p)}
          onReadAll={() => setModalOpen(true)}
        />
      </div>

      <TestimonialModal
        testimonial={active}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />

      {/* Reuses the strip cursor — same navy disc, gold ring language. */}
      <StripCursor containerRef={sectionRef} enabled={isDesktop && !reduced && !modalOpen} />
    </section>
  );
}
