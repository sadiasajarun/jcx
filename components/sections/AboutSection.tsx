'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';

/* ────────────────────────────────────────────────────────────────
   Types — `media` is a prop so the client can swap in real footage
   without touching the component.
   ──────────────────────────────────────────────────────────────── */

export interface LetterMedia {
  kind: 'image' | 'video';
  /** Image path, or the .mp4 when `kind === 'video'`. */
  src: string;
  /** Still shown before the video lazy-mounts. Required for video. */
  poster?: string;
  /** Small caption revealed on hover, in brand red small-caps. */
  caption: string;
  /** Describes the footage for assistive tech. */
  alt: string;
}

export interface AboutSectionProps {
  /** Exactly three sources, in J · C · X order. */
  media?: [LetterMedia, LetterMedia, LetterMedia];
  /** Photograph behind the wordmark. Sits under a heavy scrim. */
  backdropSrc?: string;
  /**
   * How the J·C·X glyphs are filled.
   *
   * - `white` (default) — solid white letters over the backdrop photograph.
   * - `media` — each glyph is a clipped window onto its own footage from
   *   `media`, with Ken Burns drift inside. The original cutout treatment;
   *   still fully wired, just not the default.
   *
   * Either way the hover captions, the brand mark and every animation behave
   * identically.
   */
  letterFill?: 'white' | 'media';
}

/**
 * TODO: client to supply three 4–6s muted loops, grade-matched to the hero reel.
 * Drop them at /public/videos/about-{craft,community,skyline}.mp4 and switch
 * `kind` to 'video' — the poster stays as the pre-mount still.
 */
const DEFAULT_MEDIA: [LetterMedia, LetterMedia, LetterMedia] = [
  {
    kind: 'image',
    src: '/images/about/letter-craft.svg',
    caption: 'The Craft',
    alt: 'Raking light across the fins of a JCX facade',
  },
  {
    kind: 'image',
    // The calmest frame — the brand mark sits on top of this letter.
    src: '/images/about/letter-community.svg',
    caption: 'The Community',
    alt: 'Warm evening light in a landscaped JCX courtyard',
  },
  {
    kind: 'image',
    src: '/images/about/letter-skyline.svg',
    caption: 'The Skyline',
    alt: 'Blue-hour skyline with JCX towers lit',
  },
];

/* ────────────────────────────────────────────────────────────────
   Wordmark geometry.

   One SVG holds all three letters so their positions are fixed and
   deterministic. `textLength` + `lengthAdjust` pin each glyph to an
   exact width, so the layout does not depend on the font's advance
   metrics resolving before paint.
   ──────────────────────────────────────────────────────────────── */

const VB = { w: 820, h: 400 };

/**
 * Baseline + size are set so the glyphs sit fully INSIDE the 400-unit box:
 * Cormorant's cap height (~0.7em = 210) puts the tops at y≈90, and its `J`
 * descender (~0.2em = 60) bottoms out at y≈360. Nothing touches an edge, so
 * the wordmark can never clip at the top or bottom however wide it renders.
 */
const FONT_SIZE = 300;
const BASELINE = 300;

/**
 * Glyph widths are forced with `textLength`, so the three letters occupy 552
 * units centred in the 820 box — 134 of margin either side — with a 12-unit
 * gap between them. Tight tracking, and independent of the font's own metrics.
 */
const LETTERS = [
  { char: 'J', x: 134, width: 120, kb: 'kb-a', from: { x: -220, scale: 1 } },
  { char: 'C', x: 266, width: 200, kb: 'kb-b', from: { x: 0, scale: 0.55 } },
  { char: 'X', x: 478, width: 208, kb: 'kb-c', from: { x: 220, scale: 1 } },
] as const;

/** Centre of the `C`, as a percentage of the SVG box — where the mark sits. */
const MARK_CENTER = {
  left: `${((266 + 200 / 2) / VB.w) * 100}%`,
  top: `${((BASELINE - 105) / VB.h) * 100}%`,
};

/** Fixed, non-random speck layout so server and client markup agree. */
const SPECKS = [
  { left: 8, top: 72, size: 2, delay: 0, dur: 15 },
  { left: 16, top: 34, size: 3, delay: 4, dur: 19 },
  { left: 23, top: 88, size: 2, delay: 8, dur: 13 },
  { left: 31, top: 18, size: 2, delay: 2, dur: 21 },
  { left: 38, top: 61, size: 3, delay: 6, dur: 17 },
  { left: 44, top: 29, size: 2, delay: 11, dur: 14 },
  { left: 51, top: 80, size: 2, delay: 1, dur: 20 },
  { left: 57, top: 44, size: 3, delay: 9, dur: 16 },
  { left: 63, top: 12, size: 2, delay: 5, dur: 22 },
  { left: 69, top: 67, size: 2, delay: 13, dur: 15 },
  { left: 74, top: 37, size: 3, delay: 3, dur: 18 },
  { left: 80, top: 84, size: 2, delay: 7, dur: 13 },
  { left: 85, top: 22, size: 2, delay: 10, dur: 20 },
  { left: 90, top: 56, size: 3, delay: 12, dur: 16 },
  { left: 94, top: 76, size: 2, delay: 14, dur: 19 },
  { left: 12, top: 50, size: 2, delay: 15, dur: 17 },
  { left: 27, top: 5, size: 2, delay: 17, dur: 23 },
  { left: 47, top: 95, size: 2, delay: 16, dur: 14 },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutSection({
  media = DEFAULT_MEDIA,
  backdropSrc = '/images/about/about-backdrop.jpg',
  letterFill = 'white',
}: AboutSectionProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  /** Media is mounted early — well before the section is on screen. */
  const [inView, setInView] = useState(false);
  /**
   * Drives the entrance choreography: letters lock in, then the mark drops,
   * then the card rises. Deliberately SEPARATE from `inView` — `inView` fires
   * 250px early to pre-mount the footage, and if the animation rode on it the
   * whole sequence would already be over by the time you scrolled here.
   * Latches true once and never flips back, so the letters stay put.
   */
  const [entered, setEntered] = useState(false);
  /** Which letter is lit — index, or null for the resting state. */
  const [active, setActive] = useState<number | null>(null);
  /** Desktop gets hover + cursor magnetism; touch gets an auto-cycle. */
  const [isDesktop, setIsDesktop] = useState(false);

  // Mount media only once the section is close — the letters carry three
  // full-frame sources and none of it is needed above the fold.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fire the choreography only once the section reaches the middle band of the
  // viewport, so the animation plays as the viewer arrives rather than behind
  // their back. A negative rootMargin (not a threshold) does this reliably —
  // an intersection RATIO can never reach a threshold when the element is
  // taller than the viewport, which this section is on short screens.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-20% 0px -20% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px) and (hover: hover)');
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Touch devices can't hover, so the captions cycle themselves.
  useEffect(() => {
    if (isDesktop || reduced || !inView) return;
    const id = setInterval(() => {
      setActive((prev) => (prev === null ? 0 : (prev + 1) % LETTERS.length));
    }, 2600);
    return () => clearInterval(id);
  }, [isDesktop, reduced, inView]);

  /* ── Parallax: the wordmark drifts slower than the copy card ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const cardY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [110, -110]);

  /* ── Cursor magnetism on the brand mark (desktop only) ── */
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 140, damping: 14, mass: 0.4 });
  const springY = useSpring(magnetY, { stiffness: 140, damping: 14, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop || reduced || !wordmarkRef.current) return;
    const box = wordmarkRef.current.getBoundingClientRect();
    // Pull toward the cursor, capped at 20px so it reads as weight, not wobble.
    const markX = box.left + box.width * (parseFloat(MARK_CENTER.left) / 100);
    const markY = box.top + box.height * (parseFloat(MARK_CENTER.top) / 100);
    const dx = e.clientX - markX;
    const dy = e.clientY - markY;
    const distance = Math.hypot(dx, dy) || 1;
    const pull = Math.min(20, distance / 12);
    magnetX.set((dx / distance) * pull);
    magnetY.set((dy / distance) * pull);
  };

  const resetMagnet = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        resetMagnet();
        if (isDesktop) setActive(null);
      }}
      // Same dark field in BOTH themes — it sits under the backdrop photo as
      // the fallback while the image loads, and the letters only read as
      // windows against something dark.
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink py-24 md:py-28 dark:bg-bg"
    >
      {/* ── Backdrop photograph ────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={backdropSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        {/* Just enough scrim to keep the white stat pills and the copy card
            legible — the photo stays clearly readable underneath. Raise these
            opacities if the wordmark ever struggles to separate from it. */}
        <div className="absolute inset-0 bg-ink/35 dark:bg-bg/45" />
      </div>

      {/* ── Ambient specks ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {SPECKS.map((s, i) => (
          <span
            key={i}
            className="speck absolute rounded-full bg-accent-strong"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette centred on the wordmark, not the section. The flat scrim above
          is deliberately light so the photograph reads at the edges; this puts
          the dark back ONLY where the letters and the copy card need it. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 58% 46% at 50% 46%, rgb(0 0 0 / 0.66) 0%, rgb(0 0 0 / 0.28) 62%, rgb(0 0 0 / 0) 100%)',
        }}
        aria-hidden
      />

      {/* ── Wordmark ───────────────────────────────────────────── */}
      <motion.div
        ref={wordmarkRef}
        style={{ y: wordmarkY }}
        className="relative w-full max-w-[1400px] px-4"
      >
        <div className="relative aspect-[820/400] w-full">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            // Tight rim + soft cast shadow on the letter shapes. Without this
            // the glyphs dissolve into the bright parts of the backdrop photo —
            // the halo is what keeps them reading as cut-out windows.
            className="absolute inset-0 size-full [filter:drop-shadow(0_0_2px_rgb(0_0_0/0.65))_drop-shadow(0_20px_44px_rgb(0_0_0/0.6))]"
            role="img"
            aria-label="JCX — the craft, the community, the skyline"
          >
            {/* Masks are only needed when the glyphs are windows onto footage. */}
            {letterFill === 'media' && (
              <defs>
                {LETTERS.map((letter) => (
                  <clipPath id={`jcx-clip-${letter.char}`} key={letter.char}>
                    <text
                      x={letter.x}
                      y={BASELINE}
                      textLength={letter.width}
                      lengthAdjust="spacingAndGlyphs"
                      fontFamily="var(--font-display), Georgia, serif"
                      fontSize={FONT_SIZE}
                      fontWeight="600"
                    >
                      {letter.char}
                    </text>
                  </clipPath>
                ))}
              </defs>
            )}

            {LETTERS.map((letter, i) => {
              const source = media[i];
              const lit = active === i;

              return (
                <motion.g
                  key={letter.char}
                  // Only the media treatment needs the glyph as a mask; a solid
                  // letter is just the <text> itself.
                  clipPath={
                    letterFill === 'media' ? `url(#jcx-clip-${letter.char})` : undefined
                  }
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, x: letter.from.x, scale: letter.from.scale }
                  }
                  // Driven by the section's own observer, NOT `whileInView`:
                  // framer's per-element viewport detection is unreliable on a
                  // clip-pathed <g> — the J would settle at opacity 0 and never
                  // appear. `entered` latches true once and never flips back,
                  // so all three letters are guaranteed to land and stay.
                  animate={entered ? { opacity: 1, x: 0, scale: 1 } : undefined}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.05 * i }}
                  onPointerEnter={() => isDesktop && setActive(i)}
                >
                  {letterFill === 'white' ? (
                    <text
                      x={letter.x}
                      y={BASELINE}
                      textLength={letter.width}
                      lengthAdjust="spacingAndGlyphs"
                      fontFamily="var(--font-display), Georgia, serif"
                      fontSize={FONT_SIZE}
                      fontWeight="600"
                      fill="#FFFFFF"
                      // The hovered letter goes pure white; the others sit a
                      // shade back. None of them dim to unreadable.
                      style={{
                        fillOpacity: lit ? 1 : 0.9,
                        transition: 'fill-opacity 0.5s ease',
                      }}
                    >
                      {letter.char}
                    </text>
                  ) : (
                    <foreignObject x="0" y="0" width={VB.w} height={VB.h}>
                      {/* Hover treatment lives on this HTML layer, not on the
                          <g> — the <g>'s opacity belongs to the entrance
                          animation and an inline style here would silently
                          override it. All three letters stay fully opaque: the
                          hovered one is lifted, the others are never dimmed. */}
                      <div
                        className="size-full overflow-hidden bg-[#0B1830] transition-[filter] duration-500 ease-out"
                        style={{
                          filter: lit
                            ? 'brightness(1.22) saturate(1.12) contrast(1.04)'
                            : 'brightness(1.05)',
                        }}
                      >
                        <div className={`size-full ${reduced ? '' : letter.kb}`}>
                          {inView && source.kind === 'video' ? (
                            <video
                              className="size-full object-cover"
                              src={source.src}
                              poster={source.poster}
                              autoPlay
                              muted
                              loop
                              playsInline
                              aria-label={source.alt}
                            />
                          ) : (
                            <img
                              src={
                                source.kind === 'video'
                                  ? (source.poster ?? source.src)
                                  : source.src
                              }
                              alt={source.alt}
                              className="size-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      </div>
                    </foreignObject>
                  )}
                </motion.g>
              );
            })}
          </svg>

          {/* ── Hover captions, one per letter ─────────────────── */}
          {LETTERS.map((letter, i) => (
            <span
              key={letter.char}
              aria-hidden
              className={`pointer-events-none absolute -translate-x-1/2 text-[0.6rem] font-medium tracking-[0.28em] text-accent uppercase transition-all duration-500 md:text-[0.7rem] ${
                active === i ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              style={{
                left: `${((letter.x + letter.width / 2) / VB.w) * 100}%`,
                top: '6%',
              }}
            >
              {media[i].caption}
            </span>
          ))}

          {/* ── Brand mark, anchored on the C ──────────────────── */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: MARK_CENTER.left, top: MARK_CENTER.top, x: springX, y: springY }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: -18 }}
            // Same `entered` trigger as the letters, so the sequence can't
            // invert — a separate whileInView would race the letters.
            animate={entered ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            // Lands after the letters — the coin settling into the slot.
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          >
            <div className="relative">
              {/* One-shot ring pulse as the mark clicks in. */}
              {!reduced && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-accent-strong"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={entered ? { opacity: [0, 0.85, 0], scale: [1, 1.75, 2.1] } : undefined}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 1.35 }}
                  aria-hidden
                />
              )}
              {/* Scaled with the letters — the mark keeps its proportion to the C. */}
              <BrandMark className="size-[10.5vw] max-w-[122px] min-w-[52px] text-brand drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Copy card + stat pills ─────────────────────────────── */}
      <motion.div
        style={{ y: cardY }}
        className="relative mt-4 flex w-full max-w-6xl flex-col items-center gap-6 px-4 lg:mt-0 lg:flex-row lg:items-center lg:justify-center"
      >
        <StatPill label="60+ Projects" order="lg:order-1" show={entered} />

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48, filter: 'blur(12px)' }}
          animate={entered ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
          className="w-full max-w-[520px] rounded-2xl border-l-2 border-accent-strong bg-[#FBF9F6] p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] md:p-9 lg:order-2 dark:bg-[#F4F5F7]"
        >
          <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-accent uppercase">
            Beyond Bonding
          </p>

          <h2
            id="about-heading"
            className="display mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] text-[#0B0D12]"
          >
            {/* TODO: confirm with client — founding year is a placeholder.
                The line scales with any number. */}
            Not every home carries 20 years of Japanese precision.
          </h2>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-[#454C58]">
            Since 2004, JCX has partnered with Japan&rsquo;s Creed Group to build residences and
            towers that honour detail, sustainability, and trust — across Dhaka&rsquo;s most
            sought-after addresses.
          </p>

          <Link
            href="#projects"
            className="link-underline mt-7 inline-flex cursor-pointer items-center text-[0.75rem] font-semibold tracking-[0.16em] text-[#0B0D12] uppercase transition-colors hover:text-accent"
          >
            Discover JCX
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>

        <StatPill label="Japanese JV — Creed Group" order="lg:order-3" show={entered} />
      </motion.div>
    </section>
  );
}

/** Tiny flanking pill — deliberately not a stat row. */
function StatPill({ label, order, show }: { label: string; order: string; show: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE, delay: 1.35 }}
      className={`shrink-0 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-center text-[0.7rem] font-medium tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm ${order}`}
    >
      {label}
    </motion.span>
  );
}
