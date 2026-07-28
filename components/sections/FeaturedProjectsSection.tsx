'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { ActOverlay } from './featured/ActOverlay';
import { ActRail } from './featured/ActRail';
import { FeaturedCanvas } from './featured/FeaturedCanvas';
import { FeaturedCursor, type CursorZone } from './featured/FeaturedCursor';
import { PersistentSpecColumn } from './featured/PersistentSpecColumn';
import { ProjectMarkers } from './featured/ProjectMarkers';
import { ACT_GLOW, ACT_LABELS, actsOf, playableProjects } from './featured/acts';

const DESKTOP_ACT_MS = 5000;
const MOBILE_ACT_MS = 4000;
const REEL_MS = 1000;

export function FeaturedProjectsSection() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);

  const featured = useMemo(() => playableProjects(projects), []);

  const [projectIndex, setProjectIndex] = useState(0);
  const [actIndex, setActIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [reelChanging, setReelChanging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [zone, setZone] = useState<CursorZone>('hold');

  const project: Project | undefined = featured[projectIndex];
  const acts = useMemo(() => (project ? actsOf(project) : []), [project]);
  const actKey = acts[actIndex];
  const act = actKey ? project?.acts?.[actKey] : undefined;
  const durationMs = isDesktop ? DESKTOP_ACT_MS : MOBILE_ACT_MS;
  const singleAct = acts.length === 1;

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px) and (hover: hover)');
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  /* ── Cursor parallax + spotlight ─────────────────────────── */
  const px = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(236 28 45 / 0.14) 0%, transparent 42%)`;

  /* ── Advancing ───────────────────────────────────────────── */
  const goToProject = useCallback(
    (next: number) => {
      if (featured.length === 0) return;
      setReelChanging(true);
      // The cinema bars close, we swap underneath, then they reopen.
      window.setTimeout(() => {
        setProjectIndex(((next % featured.length) + featured.length) % featured.length);
        setActIndex(0);
        setReelChanging(false);
      }, REEL_MS / 2);
    },
    [featured.length],
  );

  const advanceAct = useCallback(
    (delta: number) => {
      if (acts.length === 0) return;
      const next = actIndex + delta;
      if (next >= acts.length) {
        goToProject(projectIndex + 1);
      } else if (next < 0) {
        goToProject(projectIndex - 1);
      } else {
        setActIndex(next);
      }
    },
    [acts.length, actIndex, goToProject, projectIndex],
  );

  // Autoplay clock. Restarts whenever the act, project or play state changes.
  useEffect(() => {
    if (!playing || reduced || reelChanging || singleAct || acts.length === 0) return;
    const id = window.setTimeout(() => advanceAct(1), durationMs);
    return () => window.clearTimeout(id);
  }, [playing, reduced, reelChanging, singleAct, acts.length, actIndex, projectIndex, durationMs, advanceAct]);

  /* ── Keyboard ────────────────────────────────────────────── */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', '1', '2', '3', '4'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowRight') advanceAct(1);
      else if (e.key === 'ArrowLeft') advanceAct(-1);
      else if (e.key === 'ArrowDown') goToProject(projectIndex + 1);
      else if (e.key === 'ArrowUp') goToProject(projectIndex - 1);
      else if (e.key === ' ') setPlaying((p) => !p);
      else {
        const target = Number(e.key) - 1;
        if (target < acts.length) setActIndex(target);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [acts.length, advanceAct, goToProject, projectIndex]);

  /* ── Pointer ─────────────────────────────────────────────── */
  const resumeTimer = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = canvasRef.current?.getBoundingClientRect();
    if (!box) return;
    const fx = (e.clientX - box.left) / box.width;
    const fy = (e.clientY - box.top) / box.height;
    // Foreground shifts opposite the cursor, max ~12px.
    px.set((0.5 - fx) * 24);
    py.set((0.5 - fy) * 24);
    glareX.set(fx * 100);
    glareY.set(fy * 100);
    setZone(fx < 0.33 ? 'prev' : fx > 0.67 ? 'next' : 'hold');
  };

  const handleEnter = () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    setPlaying(false);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    if (reduced) return;
    resumeTimer.current = window.setTimeout(() => setPlaying(true), 800);
  };

  const handleClick = () => {
    if (zone === 'prev') advanceAct(-1);
    else advanceAct(1);
  };

  if (!project || !act || !actKey) return null;

  /* ── Reduced motion: static 2×2 grid, manual only ────────── */
  if (reduced) {
    return (
      <section id="featured" aria-labelledby="featured-heading" className="bg-black py-24">
        <div className="shell">
          <p className="eyebrow">Featured Projects</p>
          <h2 id="featured-heading" className="display mt-5 text-4xl text-white">
            Four acts. One address.
          </h2>

          <div className="mt-10 flex items-center justify-between gap-6">
            <p className="text-sm text-white/60">{project.name}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goToProject(projectIndex - 1)}
                className="cursor-pointer border border-white/25 px-4 py-2 text-[0.7rem] tracking-[0.16em] text-white uppercase hover:border-accent hover:text-accent"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => goToProject(projectIndex + 1)}
                className="cursor-pointer border border-white/25 px-4 py-2 text-[0.7rem] tracking-[0.16em] text-white uppercase hover:border-accent hover:text-accent"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {acts.map((key) => {
              const a = project.acts?.[key];
              if (!a) return null;
              return (
                <figure key={key} className="relative aspect-[16/10] overflow-hidden">
                  <Image src={a.image} alt={a.headline} fill sizes="50vw" className="object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-5">
                    <p className="text-[0.62rem] tracking-[0.24em] text-accent uppercase">
                      {ACT_LABELS[key]}
                    </p>
                    <p className="mt-1 text-sm text-white">{a.headline}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative flex min-h-[100svh] flex-col bg-black"
      // Ambient bounce from whatever is on screen.
      style={{ boxShadow: `inset 0 0 240px 40px ${ACT_GLOW[actKey]}` }}
    >
      {/* ── Top strip ──────────────────────────────────────── */}
      <div className="shell flex items-end justify-between gap-6 py-6">
        <div>
          <p className="eyebrow">Featured Projects</p>
          <h2 id="featured-heading" className="display mt-2 text-xl text-white/80">
            Four acts. One address.
          </h2>
        </div>
        <ProjectMarkers projects={featured} activeIndex={projectIndex} onSelect={goToProject} />
      </div>

      {/* ── Center stage ───────────────────────────────────── */}
      <div
        ref={canvasRef}
        tabIndex={0}
        role="group"
        aria-label={`${project.name} — act ${actIndex + 1} of ${acts.length}: ${ACT_LABELS[actKey]}`}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className={`relative min-h-[62svh] flex-1 overflow-hidden focus-visible:outline-none xl:min-h-[70svh] ${
          isDesktop ? 'cursor-none' : ''
        }`}
      >
        <FeaturedCanvas
          actKey={actKey}
          act={act}
          actIndex={actIndex}
          durationMs={durationMs}
          playing={playing}
          parallaxX={px}
          parallaxY={py}
          spotlight={spotlight as unknown as string}
          priority={projectIndex === 0 && actIndex === 0}
        />

        {/* Overlay group, bottom-left. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-10 p-6 md:p-12">
          <ActOverlay actKey={actKey} act={act} />
          <div className="hidden lg:block">
            <PersistentSpecColumn project={project} />
          </div>
        </div>

        {/* Reel-change: cinema bars close to a slit, then reopen. */}
        <AnimatePresence>
          {reelChanging && (
            <>
              {([-1, 1] as const).map((dir) => (
                <motion.div
                  key={dir}
                  className="pointer-events-none absolute inset-x-0 z-40 bg-black"
                  style={dir === -1 ? { top: 0 } : { bottom: 0 }}
                  initial={{ height: '0%' }}
                  animate={{ height: '50%' }}
                  exit={{ height: '0%' }}
                  transition={{ duration: REEL_MS / 2000, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <FeaturedCursor containerRef={canvasRef} enabled={isDesktop} zone={zone} />
      </div>

      {/* ── Act rail ───────────────────────────────────────── */}
      <div className="shell">
        <ActRail
          acts={acts}
          activeIndex={actIndex}
          playing={playing && !reelChanging && !singleAct}
          durationMs={durationMs}
          onScrub={setActIndex}
        />
      </div>

      {/* ── Bottom strip ───────────────────────────────────── */}
      <div className="shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p className="text-[0.7rem] tracking-[0.16em] text-white/45 uppercase">
          Currently viewing {projectIndex + 1} of {featured.length} featured projects
        </p>

        <Link
          href="#contact"
          className="link-underline cursor-pointer text-[0.75rem] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:text-accent"
          onMouseEnter={() => setZone('explore')}
        >
          Explore this project
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause the sequence' : 'Play the sequence'}
          className="inline-flex cursor-pointer items-center gap-2 text-[0.7rem] tracking-[0.16em] text-white/60 uppercase transition-colors hover:text-accent"
        >
          {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </section>
  );
}
