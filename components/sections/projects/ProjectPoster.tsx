'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import type { Project, Status } from '@/data/projects';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ────────────────────────────────────────────────────────────────
   Status glyphs — icon + tracked label, no capsule. The brief
   explicitly rules out coloured chip pills here.
   ──────────────────────────────────────────────────────────────── */

function StatusGlyph({ status }: { status: Status }) {
  const label =
    status === 'ongoing' ? 'Ongoing' : status === 'completed' ? 'Completed' : 'Upcoming';

  return (
    <span className="flex items-center gap-2 text-[0.62rem] font-medium tracking-[0.2em] text-white uppercase">
      <span className="relative flex size-3.5 items-center justify-center">
        {status === 'ongoing' && (
          <>
            <span className="pulse-ring absolute inset-0 rounded-full bg-accent-strong" />
            <span className="size-1.5 rounded-full bg-accent-strong" />
            <span className="absolute inset-0 rounded-full border border-accent-strong/50" />
          </>
        )}
        {status === 'completed' && <Check className="size-3.5 text-accent-strong" aria-hidden />}
        {status === 'upcoming' && (
          <span className="absolute inset-0 rounded-full border border-dashed border-accent-strong/70" />
        )}
      </span>
      {label}
    </span>
  );
}

function SpecRow({ project, className = '' }: { project: Project; className?: string }) {
  const specs = [project.apartmentSize, project.units && `${project.units} units`, project.floors]
    .filter(Boolean)
    .join('  |  ');

  return (
    <p className={`text-[0.7rem] tracking-[0.12em] text-white/60 uppercase ${className}`}>
      {specs.split('  |  ').map((spec, i, all) => (
        <span key={spec}>
          {spec}
          {i < all.length - 1 && (
            <span className="mx-2.5 text-white/25" aria-hidden>
              |
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

/* ────────────────────────────────────────────────────────────────
   Poster
   ──────────────────────────────────────────────────────────────── */

export type PosterVariant = 'standard' | 'wide';

export interface ProjectPosterProps {
  project: Project;
  /** 1-based position in the strip, rendered as the corner serial. */
  serial: number;
  variant?: PosterVariant;
  /** Horizontal scroll progress, used to drift the image against the frame. */
  stripProgress?: MotionValue<number>;
  /** Staggers the parallax so neighbouring cards don't drift in lockstep. */
  driftRate?: number;
  className?: string;
}

export function ProjectPoster({
  project,
  serial,
  variant = 'standard',
  driftRate = 1,
  className = '',
}: ProjectPosterProps) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ── Cursor tilt + glare ─────────────────────────────────── */
  const rotateX = useSpring(useMotionValue(0), { stiffness: 240, damping: 22, mass: 0.5 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 240, damping: 22, mass: 0.5 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(236 28 45 / 0.22) 0%, rgb(255 255 255 / 0.06) 28%, transparent 62%)`;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const box = cardRef.current?.getBoundingClientRect();
    if (!box) return;
    const px = (e.clientX - box.left) / box.width;
    const py = (e.clientY - box.top) / box.height;
    // Max 8° each way, inverted on X so the card leans toward the cursor.
    rotateY.set((px - 0.5) * 16);
    rotateX.set((0.5 - py) * 16);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const isWide = variant === 'wide';
  const showVideo = project.hasVideo && project.video && !reduced;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative overflow-hidden rounded-sm bg-black ${className}`}
      data-poster
    >
      {/* ── 1. Base render ───────────────────────────────────── */}
      <div className={`absolute inset-0 ${isWide ? 'lg:right-[38%]' : ''}`}>
        <motion.div
          className="size-full"
          animate={{ scale: hovered && !reduced ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          // driftRate staggers the parallax feel between neighbouring cards.
          style={{ transformOrigin: `${50 + driftRate * 6}% 50%` }}
        >
          {showVideo ? (
            <video
              className="size-full object-cover"
              src={project.video}
              poster={project.image}
              autoPlay
              muted
              loop
              playsInline
              aria-label={project.name}
            />
          ) : (
            <Image
              src={project.image}
              alt={`${project.name} — ${project.location}`}
              fill
              sizes={isWide ? '1180px' : '580px'}
              className="object-cover"
            />
          )}
        </motion.div>
      </div>

      {/* ── 2. Scrim ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        aria-hidden
      />

      {/* Glare follows the cursor. */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
          aria-hidden
        />
      )}

      {/* ── 3. Serial ────────────────────────────────────────── */}
      <span
        className="absolute top-6 left-6 font-display text-2xl text-accent-strong"
        aria-hidden
      >
        {String(serial).padStart(2, '0')}.
      </span>

      {/* ── 4. Status glyph ──────────────────────────────────── */}
      <span className="absolute top-6 right-6">
        <StatusGlyph status={project.status} />
      </span>

      {/* ── Wide variant: editorial pull-quote on the right ──── */}
      {isWide && project.pullQuote && (
        <div className="absolute inset-y-0 right-0 hidden w-[38%] flex-col justify-center bg-black px-10 lg:flex">
          <p className="display text-[clamp(1.6rem,2.2vw,2.3rem)] text-accent-strong">
            {project.pullQuote}
          </p>
          <span className="mt-6 h-px w-16 bg-accent-strong/40" aria-hidden />
          <p className="mt-6 text-[0.72rem] tracking-[0.18em] text-white/50 uppercase">
            Featured Development
          </p>
        </div>
      )}

      {/* ── 5–7. Name, location, specs ───────────────────────── */}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8 ${
          isWide ? 'lg:right-[38%]' : ''
        }`}
      >
        <span className="flex items-center gap-1.5 text-[0.72rem] text-white/70">
          <MapPin className="size-3.5 text-accent-strong" aria-hidden />
          {project.location}
        </span>

        <h3 className="display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight text-white">
          {project.name}
        </h3>

        <SpecRow project={project} />
      </div>

      {/* ── 8. Hover cover panel ─────────────────────────────── */}
      {!reduced && (
        <motion.div
          initial={false}
          animate={{ y: hovered ? '0%' : '101%' }}
          transition={{ duration: 0.5, ease: EASE, delay: hovered ? 0.2 : 0 }}
          className="absolute inset-x-0 bottom-0 h-[60%] bg-black/85 p-6 backdrop-blur-md md:p-8"
          aria-hidden={!hovered}
        >
          <div className="flex h-full flex-col justify-end gap-2.5">
            {[
              project.name,
              `${project.address}`,
              `${project.apartmentSize} · ${project.floors}`,
              project.orientation ?? `${project.units ?? '—'} units · ${project.parking ?? '—'} parking`,
            ].map((line, i) => (
              <motion.p
                key={line}
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                transition={{ duration: 0.35, ease: EASE, delay: hovered ? 0.3 + i * 0.06 : 0 }}
                className={
                  i === 0
                    ? 'display text-2xl text-white'
                    : 'text-[0.85rem] leading-relaxed text-white/65'
                }
              >
                {line}
              </motion.p>
            ))}

            <motion.div
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.35, ease: EASE, delay: hovered ? 0.54 : 0 }}
            >
              <Link
                href="#contact"
                tabIndex={hovered ? 0 : -1}
                className="link-underline mt-3 inline-flex cursor-pointer items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase hover:text-accent"
              >
                Explore
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Whole card is keyboard-reachable and activates the same target. */}
      <Link
        href="#contact"
        className="absolute inset-0 z-10"
        aria-label={`${project.name}, ${project.location} — explore`}
      >
        <span className="sr-only">{project.name}</span>
      </Link>
    </motion.article>
  );
}
