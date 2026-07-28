'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Word-by-word blur reveal — fussy on paper, premium in motion. */
function BlurWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{text}</>;

  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + i * 0.04 }}
        >
          {word}
          {' '}
        </motion.span>
      ))}
    </>
  );
}

export function TestimonialStage({
  testimonial,
  muted,
  onToggleMute,
  onOpenModal,
}: {
  testimonial: Testimonial;
  muted: boolean;
  onToggleMute: () => void;
  onOpenModal: () => void;
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quoteHovered, setQuoteHovered] = useState(false);

  // Never surprise anyone with audio: duck to silent before the stage changes.
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted, testimonial.id]);

  const isVideo = testimonial.medium === 'video' && Boolean(testimonial.video);

  const contextLine = [
    testimonial.role,
    testimonial.project,
    testimonial.date,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* ── Portrait / video frame ─────────────────────────── */}
      <div className="flex justify-center lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            layoutId={`portrait-${testimonial.id}`}
            // Radial mask in/out from the centre outward.
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, rotate: -1, clipPath: 'circle(0% at 50% 50%)' }
            }
            animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: 'circle(75% at 50% 50%)' }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.5 } }
            }
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden border border-accent/40 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] xl:max-w-[520px]"
          >
            {isVideo ? (
              <>
                <video
                  ref={videoRef}
                  className="size-full object-cover"
                  src={testimonial.video}
                  poster={testimonial.videoPoster ?? testimonial.portrait}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  {/* TODO: client to supply EN + BN caption tracks. */}
                </video>
                <button
                  type="button"
                  onClick={onToggleMute}
                  aria-label={muted ? 'Unmute testimonial' : 'Mute testimonial'}
                  className="absolute right-4 bottom-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </>
            ) : (
              // Still portraits get a slow Ken Burns so they don't feel dead.
              <motion.div
                className="size-full"
                animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src={testimonial.portrait}
                  alt={`Portrait of ${testimonial.name}, ${testimonial.role.toLowerCase()}${
                    testimonial.project ? ` at ${testimonial.project}` : ''
                  }`}
                  fill
                  sizes="(max-width: 1280px) 420px, 520px"
                  className="object-cover"
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Pull quote + attribution ───────────────────────── */}
      <div className="relative lg:col-span-7">
        {/* Decorative quote mark behind the text — never the focus. */}
        <span
          className="pointer-events-none absolute -top-16 -left-4 font-display text-[12rem] leading-none text-white/[0.06] select-none"
          aria-hidden
        >
          &ldquo;
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            exit={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -20,
                    filter: 'blur(8px)',
                    letterSpacing: '0.04em',
                    transition: { duration: 0.4 },
                  }
            }
          >
            <blockquote
              onMouseEnter={() => setQuoteHovered(true)}
              onMouseLeave={() => setQuoteHovered(false)}
              className="relative"
            >
              <p className="display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.12] text-white italic">
                <BlurWords text={testimonial.pullQuote} delay={0.15} />
              </p>

              <span
                className={`mt-4 block h-px origin-left bg-accent transition-transform duration-500 ${
                  quoteHovered ? 'scale-x-100' : 'scale-x-0'
                }`}
                aria-hidden
              />

              <button
                type="button"
                onClick={onOpenModal}
                className={`mt-3 inline-flex cursor-pointer items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-accent uppercase transition-opacity duration-300 ${
                  quoteHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Read the full story
              </button>
            </blockquote>

            <footer className="mt-8">
              <p className="font-display text-2xl text-white">{testimonial.name}</p>
              <p className="mt-1.5 text-[0.68rem] font-medium tracking-[0.22em] text-accent uppercase">
                {contextLine}
              </p>

              {testimonial.landownerDetail && (
                <p className="mt-2 text-[0.72rem] tracking-[0.12em] text-white/45 uppercase">
                  {testimonial.landownerDetail.kathaCount} katha ·{' '}
                  {testimonial.landownerDetail.location} · Handed over{' '}
                  {testimonial.landownerDetail.handoverYear}
                </p>
              )}

              {isVideo && (
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="link-underline mt-5 inline-flex cursor-pointer items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] text-white uppercase hover:text-accent"
                >
                  <Play className="size-3.5" aria-hidden />
                  Watch full testimonial
                </button>
              )}
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
