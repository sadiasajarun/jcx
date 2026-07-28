'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { landownerStates, landownersCopy } from '@/data/landowners';
import { TransformationCanvas } from './landowners/TransformationCanvas';
import { StatePanel } from './landowners/StatePanel';
import { ProgressRail } from './landowners/ProgressRail';
import { TrustBadges } from './landowners/TrustBadges';
import { LandownerTestimonial } from './landowners/LandownerTestimonial';
import { LandownersCTAs } from './landowners/LandownersCTAs';
import { AmbientSound } from './landowners/AmbientSound';

/**
 * Pinned scroll length. 500vh of page scroll drives 100% of the timeline —
 * roughly 4s of fast trackpad scrolling, 10s taken slowly.
 */
const PIN_VH = 500;

/**
 * ── Why not GSAP ScrollTrigger ──────────────────────────────────────
 * The brief specifies GSAP with `pin: true` and `scrub: 1`. That exact
 * behaviour is available here without the dependency: `position: sticky`
 * pins natively (no layout takeover, no ScrollTrigger refresh bugs on
 * resize), and framer-motion's `useScroll` + `useSpring` gives the same
 * eased scrub — the spring IS `scrub: 1`. The project already standardises
 * on framer-motion for every other section, and mixing two animation
 * engines on one page is a real maintenance cost. The scroll contract the
 * brief describes is unchanged; only the implementation differs.
 * ────────────────────────────────────────────────────────────────────
 */
export function Landowners() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  /** Below `lg` the pin is abandoned entirely — see the brief's mobile note. */
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const q = window.matchMedia('(min-width: 1024px)');
    const sync = () => setPinned(q.matches);
    sync();
    q.addEventListener('change', sync);
    return () => q.removeEventListener('change', sync);
  }, []);

  /* ── The timeline. `offset` maps the sticky window exactly: progress hits
        0 when the track's top reaches the viewport top, and 1 when its
        bottom does — i.e. across the full 500vh of pinned travel. ── */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // The spring is the `scrub: 1` equivalent — the timeline trails the scroll
  // and settles, instead of snapping frame-for-frame to the wheel.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  });
  const progress = reduced ? scrollYProgress : smooth;

  // Background warms from cool navy (dawn plot) to gold-tinted navy (dusk).
  const bgFrom = useTransform(progress, [0, 0.55, 1], ['#0a1730', '#0d1c38', '#161428']);
  const bgTo = useTransform(progress, [0, 0.55, 1], ['#060a14', '#0a1020', '#120f1c']);
  const background = useTransform(
    [bgFrom, bgTo],
    ([a, b]: string[]) => `linear-gradient(165deg, ${a} 0%, ${b} 100%)`,
  );

  // Which state owns the scroll right now.
  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      const i = landownerStates.findIndex(
        (s, idx) => v >= s.range[0] && (v < s.range[1] || idx === landownerStates.length - 1),
      );
      if (i !== -1) setActiveIndex(i);
    });
    return unsub;
  }, [progress]);

  /** Tween the page scroll to the middle of a state's window. */
  const jumpTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const [from, to] = landownerStates[index].range;
      const mid = (from + to) / 2;
      const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * mid;

      if (reduced) {
        window.scrollTo({ top, behavior: 'auto' });
        return;
      }
      // 900ms eased tween, as specified. `scrollTo({behavior:'smooth'})` has
      // no duration control, so this drives it frame by frame.
      const start = window.scrollY;
      const delta = top - start;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 900);
        const eased = 1 - Math.pow(1 - t, 3);
        window.scrollTo(0, start + delta * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    [reduced],
  );

  /**
   * Every hook must run before the unpinned early return below, or the hook
   * order changes the moment the viewport crosses `lg` and React tears the
   * component down. This one belongs to the desktop stat block.
   */
  const introStatsOpacity = useTransform(progress, [0, 0.1, 0.15], [1, 1, 0]);

  /** Static rail has no pin to measure — it jumps to the panel anchors. */
  const jumpToAnchor = useCallback((index: number) => {
    document
      .getElementById(`landowner-${landownerStates[index].id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const activeState = landownerStates[activeIndex];
  const isVoice = activeState.id === 'voice';

  /* ══════════════════════════════════════════════════════════════
     Reduced motion, or below `lg`: no pin. Five stacked story panels,
     each with its own visual state frozen at that point in the
     timeline. Quieter, but the promise still lands.
     ══════════════════════════════════════════════════════════════ */
  if (reduced || !pinned) {
    return (
      <section
        id="landowners"
        aria-labelledby="landowners-heading"
        className="relative overflow-hidden bg-[linear-gradient(165deg,#0a1730_0%,#060a14_100%)]"
      >
        <Grain />
        <div className="shell relative py-20 md:py-28">
          <p className="text-[0.7rem] font-semibold tracking-[0.3em] text-[var(--gold-bright)] uppercase">
            {landownersCopy.eyebrow}
          </p>
          <h2 id="landowners-heading" className="display mt-5 text-[clamp(2.5rem,7vw,3.5rem)] text-white">
            {landownersCopy.headline[0]}
            <span className="block italic text-[var(--gold-bright)]">
              {landownersCopy.headline[1]}
            </span>
          </h2>
          <p className="mt-4 text-[1.05rem] text-white/60">{landownersCopy.subline}</p>

          <div className="mt-8">
            <ProgressRail activeIndex={activeIndex} onJump={jumpToAnchor} variant="static" />
          </div>

          {/* One panel per state, each with a still of its own visual. */}
          <div className="mt-14 space-y-16">
            {landownerStates.map((state, i) => (
              <div key={state.id} id={`landowner-${state.id}`}>
                <div className="relative h-[42vh] min-h-[240px] w-full overflow-hidden rounded-2xl border border-white/10">
                  <StaticStateVisual index={i} reduced={!!reduced} />
                </div>

                {state.id === 'voice' ? (
                  <div className="mt-8">
                    <LandownerTestimonial reduced={!!reduced} />
                    <LandownersCTAs />
                  </div>
                ) : (
                  <div className="mt-7">
                    {state.stepLabel && (
                      <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[var(--gold-bright)] uppercase">
                        {state.stepLabel}
                      </p>
                    )}
                    {state.headline && (
                      <h3 className="display mt-4 text-[clamp(1.7rem,5vw,2.4rem)] text-white">
                        {state.headline}
                      </h3>
                    )}
                    {state.body && (
                      <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-white/72">
                        {state.body}
                      </p>
                    )}
                    {state.micro && (
                      <p className="mt-3 text-[0.78rem] text-white/45">{state.micro}</p>
                    )}
                    <TrustBadges
                      badges={state.badges}
                      variant={state.id === 'plot' ? 'hairline' : 'inline'}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     Desktop: the pinned sequence.
     ══════════════════════════════════════════════════════════════ */
  return (
    <section id="landowners" aria-labelledby="landowners-heading">
      <div ref={trackRef} className="relative" style={{ height: `${PIN_VH}vh` }}>
        {/* Sticky viewport — this is the pin. */}
        <motion.div
          className="lo-section sticky top-0 h-[100svh] w-full overflow-hidden"
          style={{ background }}
        >
          <Grain />

          {/* The transformation fills the frame; copy floats over it. */}
          <TransformationCanvas
            mode="svg"
            progress={progress}
            activeState={activeState.id}
            reduced={!!reduced}
          />

          {/* ── Copy column ───────────────────────────────────── */}
          <div className="shell relative flex h-full items-center">
            <div
              className={`relative h-[52vh] w-full max-w-xl transition-opacity duration-500 ${
                isVoice ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              {landownerStates.map((state, i) => (
                <StatePanel
                  key={state.id}
                  state={state}
                  active={i === activeIndex}
                  reduced={!!reduced}
                />
              ))}
            </div>

            {/* State 0's stat block sits opposite the headline. */}
            <motion.div
              className="ml-auto hidden w-64 lg:block"
              style={{ opacity: introStatsOpacity }}
              aria-hidden={activeIndex !== 0}
            >
              <TrustBadges badges={landownerStates[0].badges} variant="hairline" />
            </motion.div>
          </div>

          {/* ── State 5: testimonial + CTAs, centre stage ─────── */}
          <div
            className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-700 ${
              isVoice ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
            }`}
          >
            <div className="w-full">
              <LandownerTestimonial reduced={!!reduced} />
              <LandownersCTAs />
            </div>
          </div>

          <ProgressRail activeIndex={activeIndex} onJump={jumpTo} />
          <AmbientSound activeState={activeState.id} />
        </motion.div>
      </div>
    </section>
  );
}

/** Shared SVG turbulence grain, to unify with the rest of the page. */
function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay"
      aria-hidden
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/**
 * A frozen frame of the transformation for the unpinned layout. Each panel
 * gets a motion value parked at the midpoint of its own state, so the same
 * canvas code renders "the plot", "the survey", "the tower" and so on with no
 * duplicate artwork.
 */
function StaticStateVisual({ index, reduced }: { index: number; reduced: boolean }) {
  const [from, to] = landownerStates[index].range;
  const frozen = useSpring((from + to) / 2, { stiffness: 100, damping: 30 });
  return (
    <TransformationCanvas
      mode="svg"
      progress={frozen}
      activeState={landownerStates[index].id}
      reduced={reduced}
    />
  );
}
