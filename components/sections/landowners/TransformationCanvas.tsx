'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import { buildStages, hoverAnnotations, type LandownerStateId } from '@/data/landowners';

export interface TransformationCanvasProps {
  /**
   * `svg` — the layered in-browser build (ships today, no dependencies).
   * `video` — a pre-rendered archviz clip with `currentTime` bound to scroll.
   * The scroll-scrub contract is identical, so swapping is a one-prop change
   * once the client delivers the render.
   */
  mode?: 'svg' | 'video';
  /** Only read when `mode === 'video'`. */
  videoSrc?: string;
  /** 0→1 across the pinned scroll. */
  progress: MotionValue<number>;
  /** Which narrated state is currently active — drives the hover annotations. */
  activeState: LandownerStateId;
  reduced: boolean;
}

/* ────────────────────────────────────────────────────────────────
   Geometry. One isometric ground plane, one tower footprint. Every
   layer below is drawn against these constants so the plot, the
   foundation and the tower share an exact footprint — the whole
   illusion depends on the building rising out of the surveyed
   rectangle rather than merely appearing on top of it.
   ──────────────────────────────────────────────────────────────── */

const VB = { w: 1000, h: 700 };

/** The plot, in isometric projection. Clockwise from the near corner. */
const PLOT = {
  near: [500, 585],
  right: [845, 455],
  far: [500, 325],
  left: [155, 455],
} as const;

const plotPath = `M${PLOT.near} L${PLOT.right} L${PLOT.far} L${PLOT.left} Z`;

/** Tower footprint — inset from the plot so setbacks read correctly. */
const FOOT = {
  near: [500, 530],
  right: [710, 451],
  far: [500, 372],
  left: [290, 451],
} as const;

const footPath = `M${FOOT.near} L${FOOT.right} L${FOOT.far} L${FOOT.left} Z`;

/** Floors stack upward along -y. Total tower height at full build. */
const FLOOR_H = 26;
const FLOORS = 13;

/** Per-floor easing window — later floors land faster, so the stack accelerates. */
function floorWindow(i: number): [number, number] {
  const t = i / FLOORS;
  // Quadratic ease-in on the start time compresses the upper floors.
  const start = 0.18 + 0.62 * (t * t * 0.55 + t * 0.45);
  return [start, Math.min(1, start + 0.1)];
}

export function TransformationCanvas({
  mode = 'svg',
  videoSrc = '/videos/landowners-transformation.mp4',
  progress,
  activeState,
  reduced,
}: TransformationCanvasProps) {
  const [hovering, setHovering] = useState(false);
  const annotations = hoverAnnotations[activeState] ?? [];

  /* ── Sub-timelines. Each layer reads the same 0→1 and maps its own
        slice of it, so the sequence is continuous and fully reversible
        — scrolling back up runs every layer backwards for free. ── */

  // Survey (0.15–0.30)
  const surveyDraw = useTransform(progress, [0.15, 0.27], [0, 1]);
  const surveyOpacity = useTransform(progress, [0.14, 0.2, 0.52, 0.6], [0, 1, 1, 0]);
  const gridOpacity = useTransform(progress, [0.16, 0.24, 0.5, 0.58], [0, 0.55, 0.55, 0]);
  const infoOpacity = useTransform(progress, [0.2, 0.26, 0.3, 0.34], [0, 1, 1, 0]);

  // Scene rotation — a slow 10° reveal that persists once earned.
  const sceneRotate = useTransform(progress, [0.15, 0.35, 1], [0, -6, -10]);
  const sceneScale = useTransform(progress, [0, 0.5, 1], [1, 1.04, 0.96]);

  // Agreement (0.30–0.50)
  const signatureDraw = useTransform(progress, [0.34, 0.46], [0, 1]);
  const signatureOpacity = useTransform(progress, [0.32, 0.38, 0.52, 0.58], [0, 1, 1, 0]);

  // Build (0.50–0.75)
  const foundationOpacity = useTransform(progress, [0.46, 0.53], [0, 1]);
  const facadeSweep = useTransform(progress, [0.66, 0.78], [0, 1]);
  const groundShadow = useTransform(progress, [0.5, 0.8], [0.1, 0.42]);

  // Landmark (0.75–0.90): the tower lifts and settles.
  const towerLift = useTransform(progress, [0.78, 0.85, 0.89], [0, -40, 0]);
  const ringScale = useTransform(progress, [0.85, 0.95], [0.4, 1.9]);
  const ringOpacity = useTransform(progress, [0.85, 0.89, 0.95], [0, 0.8, 0]);

  // Voice (0.90–1.00): the whole scene recedes behind the testimonial.
  const sceneOpacity = useTransform(progress, [0.9, 0.98], [1, 0.16]);
  const sceneBlur = useTransform(progress, [0.9, 0.98], [0, 14]);
  const sceneFilter = useTransform(sceneBlur, (b) => `blur(${b}px)`);

  // Environment: dawn → dusk. Windows only glow once the facade is on.
  const skyDusk = useTransform(progress, [0.55, 0.85], [0, 1]);
  const windowGlow = useTransform(progress, [0.7, 0.86], [0, 1]);

  if (mode === 'video') {
    return (
      <ScrubbedVideo
        src={videoSrc}
        progress={progress}
        reduced={reduced}
        style={{ opacity: sceneOpacity, filter: sceneFilter }}
      />
    );
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: sceneOpacity, filter: sceneFilter }}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <motion.svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className={`size-full ${reduced ? '' : 'lo-idle'}`}
        style={{ rotate: sceneRotate, scale: sceneScale }}
        role="img"
        aria-label="An empty plot of land transforming into a completed JCX tower"
      >
        <defs>
          <linearGradient id="lo-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1d3d" />
            <stop offset="100%" stopColor="#16345f" />
          </linearGradient>
          <linearGradient id="lo-facade-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#20365f" />
            <stop offset="100%" stopColor="#2c4a80" />
          </linearGradient>
          <linearGradient id="lo-facade-r" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a2b4d" />
            <stop offset="100%" stopColor="#122036" />
          </linearGradient>
          <radialGradient id="lo-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--gold-bright)" stopOpacity="0" />
          </radialGradient>
          {/* Sweeps the cladding up the building as `facadeSweep` runs. */}
          <clipPath id="lo-facade-clip">
            <motion.rect
              x="0"
              width={VB.w}
              height={VB.h}
              y={useTransform(facadeSweep, [0, 1], [VB.h, FOOT.near[1] - FLOORS * FLOOR_H - 60])}
            />
          </clipPath>
        </defs>

        {/* ── Sky: cool dawn warming to dusk ─────────────────────── */}
        <rect x="0" y="0" width={VB.w} height={VB.h} fill="url(#lo-sky)" />
        <motion.rect
          x="0"
          y="0"
          width={VB.w}
          height={VB.h}
          fill="#4a2f2a"
          style={{ opacity: useTransform(skyDusk, [0, 1], [0, 0.42]) }}
        />

        {/* ── Distant road + city context ────────────────────────── */}
        <g opacity="0.5">
          <path d={`M0 ${PLOT.far[1] - 22} L${VB.w} ${PLOT.far[1] - 58}`} stroke="#2b3f66" strokeWidth="3" />
          <motion.circle
            cx="180"
            cy={PLOT.far[1] - 30}
            r="4"
            fill="var(--gold)"
            style={{ opacity: useTransform(progress, [0, 0.12], [0.9, 0]) }}
          />
        </g>
        <CityContext progress={progress} />

        {/* ── Ground plane ───────────────────────────────────────── */}
        <path d={plotPath} fill="#3b3126" stroke="#4d4132" strokeWidth="2" />
        <path d={plotPath} fill="url(#lo-glow)" opacity="0.12" />

        {/* Cast shadow — deepens as the building gains mass. */}
        <motion.ellipse
          cx="500"
          cy="500"
          rx="215"
          ry="78"
          fill="#05070d"
          style={{ opacity: groundShadow }}
        />

        {/* Boundary stones at each corner of the plot. */}
        {[PLOT.near, PLOT.right, PLOT.far, PLOT.left].map(([x, y], i) => (
          <rect key={i} x={x - 4} y={y - 9} width="8" height="12" rx="1.5" fill="#6b5c47" />
        ))}

        {/* The lone tree — present in State 0, still standing at the base of
            the finished tower in State 4. The payoff of the whole sequence. */}
        <Tree x={182} y={452} />

        {/* ── Survey overlay ─────────────────────────────────────── */}
        <motion.g style={{ opacity: surveyOpacity }}>
          <SurveyGrid opacity={gridOpacity} />
          <motion.path
            d={plotPath}
            fill="none"
            stroke="var(--gold-bright)"
            strokeWidth="2.5"
            strokeDasharray="1 1"
            pathLength={1}
            style={{ pathLength: surveyDraw }}
          />
          <DimensionArrow from={PLOT.left} to={PLOT.far} label="92 katha" progress={surveyDraw} />
          <DimensionArrow from={PLOT.near} to={PLOT.right} label="Frontage" progress={surveyDraw} />
        </motion.g>

        {/* Translucent survey popups. */}
        <motion.g style={{ opacity: infoOpacity }}>
          {[
            { x: 210, y: 300, t: 'Orientation' },
            { x: 690, y: 268, t: 'Soil analysis' },
            { x: 720, y: 560, t: 'Feasibility' },
          ].map((p) => (
            <InfoPill key={p.t} x={p.x} y={p.y} text={p.t} />
          ))}
        </motion.g>

        {/* ── Agreement: the abstract two-lines-meeting signature ── */}
        <motion.g style={{ opacity: signatureOpacity }}>
          <motion.path
            d="M300 470 C 380 400, 430 470, 500 430 C 570 390, 620 462, 700 404"
            fill="none"
            stroke="var(--gold-bright)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            style={{ pathLength: signatureDraw }}
          />
          <motion.path
            d="M300 430 C 380 500, 430 424, 500 470 C 570 512, 620 436, 700 494"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.75"
            pathLength={1}
            style={{ pathLength: signatureDraw }}
          />
        </motion.g>

        {/* ── The building ───────────────────────────────────────── */}
        <motion.g style={{ y: towerLift }}>
          {/* Foundation slab — the surveyed rectangle, made solid. */}
          <motion.path
            d={footPath}
            fill="#2a3550"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            style={{ opacity: foundationOpacity }}
          />

          {Array.from({ length: FLOORS }, (_, i) => (
            <Floor
              key={i}
              index={i}
              progress={progress}
              windowGlow={windowGlow}
              reduced={reduced}
            />
          ))}

          {/* Roof cap, last thing to land. */}
          <motion.path
            d={translatePath(footPath, -FLOORS * FLOOR_H)}
            fill="#37507f"
            style={{ opacity: useTransform(progress, [0.72, 0.78], [0, 1]) }}
          />

          {/* Gold ring pulse as the tower settles. */}
          <motion.ellipse
            cx="500"
            cy="530"
            rx="150"
            ry="52"
            fill="none"
            stroke="var(--gold-bright)"
            strokeWidth="2"
            style={{ scale: ringScale, opacity: ringOpacity, transformOrigin: '500px 530px' }}
          />
        </motion.g>

        {/* Dust motes while the structure is going up. */}
        {!reduced && <Dust progress={progress} />}
      </motion.svg>

      {/* ── Stage markers, floating alongside the rising tower ─── */}
      <StageMarkers progress={progress} />

      {/* ── Hover annotations ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {annotations.map((label, i) => (
          <span
            key={label}
            className={`absolute rounded-full border border-[var(--gold)]/35 bg-[#0b1428]/80 px-3 py-1 text-[0.62rem] font-medium tracking-[0.14em] text-[var(--gold-bright)] uppercase backdrop-blur-sm transition-all duration-500 ${
              hovering ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{
              left: `${18 + i * 26}%`,
              top: `${30 + (i % 2) * 26}%`,
              transitionDelay: `${i * 90}ms`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Pieces
   ════════════════════════════════════════════════════════════════ */

/** Shift an isometric path straight up — used to stack floors and cap the roof. */
function translatePath(d: string, dy: number) {
  return d.replace(/(\d+),(\d+)/g, (_, x: string, y: string) => `${x},${Number(y) + dy}`);
}

function Floor({
  index,
  progress,
  windowGlow,
  reduced,
}: {
  index: number;
  progress: MotionValue<number>;
  windowGlow: MotionValue<number>;
  reduced: boolean;
}) {
  const [start, end] = floorWindow(index);
  const rise = useTransform(progress, [start, end], [18, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = -index * FLOOR_H;

  // Windows light floor by floor, bottom-up, trailing the structure.
  // Both glow values are derived ONCE here rather than inside the band map —
  // a useTransform per iteration would put hooks inside a loop.
  const litAt = 0.7 + (index / FLOORS) * 0.14;
  const lit = useTransform(progress, [litAt, litAt + 0.05], [0, 1]);
  const glowNear = useTransform([lit, windowGlow] as MotionValue<number>[], ([a, b]: number[]) => a * b * 0.85);
  const glowFar = useTransform([lit, windowGlow] as MotionValue<number>[], ([a, b]: number[]) => a * b * 0.6);

  const left = `M${FOOT.near[0]},${FOOT.near[1] + y} L${FOOT.left[0]},${FOOT.left[1] + y} L${FOOT.left[0]},${FOOT.left[1] + y - FLOOR_H} L${FOOT.near[0]},${FOOT.near[1] + y - FLOOR_H} Z`;
  const right = `M${FOOT.near[0]},${FOOT.near[1] + y} L${FOOT.right[0]},${FOOT.right[1] + y} L${FOOT.right[0]},${FOOT.right[1] + y - FLOOR_H} L${FOOT.near[0]},${FOOT.near[1] + y - FLOOR_H} Z`;

  return (
    <motion.g style={{ opacity, y: reduced ? 0 : rise }}>
      <path d={left} fill="url(#lo-facade-l)" stroke="#0e1930" strokeWidth="0.75" />
      <path d={right} fill="url(#lo-facade-r)" stroke="#0e1930" strokeWidth="0.75" />

      {/* Window bands, revealed by the facade sweep clip. */}
      <g clipPath="url(#lo-facade-clip)">
        {[0.28, 0.52, 0.76].map((t) => {
          const lx = FOOT.near[0] + (FOOT.left[0] - FOOT.near[0]) * t;
          const ly = FOOT.near[1] + (FOOT.left[1] - FOOT.near[1]) * t + y;
          const rx = FOOT.near[0] + (FOOT.right[0] - FOOT.near[0]) * t;
          const ry = FOOT.near[1] + (FOOT.right[1] - FOOT.near[1]) * t + y;
          return (
            <g key={t}>
              <motion.rect
                x={lx - 12}
                y={ly - FLOOR_H + 7}
                width="22"
                height="10"
                rx="1"
                fill="var(--gold-bright)"
                style={{ opacity: glowNear }}
              />
              <motion.rect
                x={rx - 10}
                y={ry - FLOOR_H + 7}
                width="22"
                height="10"
                rx="1"
                fill="var(--gold)"
                style={{ opacity: glowFar }}
              />
            </g>
          );
        })}
      </g>
    </motion.g>
  );
}

function SurveyGrid({ opacity }: { opacity: MotionValue<number> }) {
  const lines = [];
  for (let i = 1; i < 8; i++) {
    const t = i / 8;
    lines.push(
      <line
        key={`a${i}`}
        x1={PLOT.left[0] + (PLOT.near[0] - PLOT.left[0]) * t}
        y1={PLOT.left[1] + (PLOT.near[1] - PLOT.left[1]) * t}
        x2={PLOT.far[0] + (PLOT.right[0] - PLOT.far[0]) * t}
        y2={PLOT.far[1] + (PLOT.right[1] - PLOT.far[1]) * t}
        stroke="var(--gold)"
        strokeWidth="0.75"
      />,
      <line
        key={`b${i}`}
        x1={PLOT.left[0] + (PLOT.far[0] - PLOT.left[0]) * t}
        y1={PLOT.left[1] + (PLOT.far[1] - PLOT.left[1]) * t}
        x2={PLOT.near[0] + (PLOT.right[0] - PLOT.near[0]) * t}
        y2={PLOT.near[1] + (PLOT.right[1] - PLOT.near[1]) * t}
        stroke="var(--gold)"
        strokeWidth="0.75"
      />,
    );
  }
  return <motion.g style={{ opacity }}>{lines}</motion.g>;
}

function DimensionArrow({
  from,
  to,
  label,
  progress,
}: {
  from: readonly [number, number] | readonly number[];
  to: readonly [number, number] | readonly number[];
  label: string;
  progress: MotionValue<number>;
}) {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  return (
    <motion.g style={{ opacity: progress }}>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke="var(--gold-bright)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text
        x={mx}
        y={my - 8}
        textAnchor="middle"
        fill="var(--gold-bright)"
        fontSize="15"
        letterSpacing="2"
      >
        {label}
      </text>
    </motion.g>
  );
}

function InfoPill({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 8.4 + 26;
  return (
    <g>
      <rect x={x - w / 2} y={y - 14} width={w} height="28" rx="14" fill="#0b1428" fillOpacity="0.78" />
      <rect
        x={x - w / 2}
        y={y - 14}
        width={w}
        height="28"
        rx="14"
        fill="none"
        stroke="var(--gold)"
        strokeOpacity="0.4"
      />
      <text x={x} y={y + 5} textAnchor="middle" fill="var(--gold-bright)" fontSize="13" letterSpacing="1.5">
        {text}
      </text>
    </g>
  );
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y} L${x} ${y - 34}`} stroke="#5c4a34" strokeWidth="4" strokeLinecap="round" />
      <circle cx={x} cy={y - 44} r="18" fill="#2f4a35" />
      <circle cx={x - 12} cy={y - 36} r="12" fill="#38573e" />
      <circle cx={x + 12} cy={y - 37} r="11" fill="#27402f" />
    </g>
  );
}

function CityContext({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.7, 0.9], [0, 0.55]);
  return (
    <motion.g style={{ opacity }}>
      {[
        [60, 300, 46, 130],
        [120, 330, 38, 100],
        [860, 292, 52, 140],
        [930, 322, 40, 110],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#111f39" />
      ))}
    </motion.g>
  );
}

function Dust({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.5, 0.58, 0.76, 0.84], [0, 0.5, 0.5, 0]);
  const motes = [
    [360, 470, 9], [420, 400, 13], [560, 430, 11], [630, 480, 15],
    [480, 360, 12], [700, 420, 10], [330, 520, 14], [660, 350, 16],
  ];
  return (
    <motion.g style={{ opacity }}>
      {motes.map(([x, y, dur], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="var(--gold-bright)" className="lo-dust" style={{ animationDuration: `${dur}s`, animationDelay: `${i * 0.9}s` }} />
      ))}
    </motion.g>
  );
}

function StageMarkers({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(-1);
  const opacity = useTransform(progress, [0.48, 0.55, 0.76, 0.82], [0, 1, 1, 0]);

  useMotionValueEvent(progress, 'change', (v) => {
    // Stages span the BUILD window; -1 parks them before and after.
    const t = (v - 0.5) / 0.25;
    setActive(t < 0 || t > 1 ? -1 : Math.min(buildStages.length - 1, Math.floor(t * buildStages.length)));
  });

  return (
    <motion.ul
      className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 space-y-3 md:block lg:left-10"
      style={{ opacity }}
      aria-hidden
    >
      {buildStages.map((stage, i) => (
        <li
          key={stage}
          className={`flex items-center gap-2.5 text-[0.62rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500 ${
            i <= active ? 'text-[var(--gold-bright)]' : 'text-white/28'
          }`}
        >
          <span
            className={`block h-px transition-all duration-500 ${
              i <= active ? 'w-6 bg-[var(--gold-bright)]' : 'w-3 bg-white/25'
            }`}
          />
          {stage}
        </li>
      ))}
    </motion.ul>
  );
}

/**
 * Option A. Binds `video.currentTime` to scroll instead of letting the clip
 * play itself. `preload="auto"` matters here — seeking an unbuffered video
 * stutters badly, which is why this is the swap-in and not the default.
 */
function ScrubbedVideo({
  src,
  progress,
  reduced,
  style,
}: {
  src: string;
  progress: MotionValue<number>;
  reduced: boolean;
  style: React.CSSProperties | Record<string, unknown>;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    const el = ref.current;
    if (!el || !duration) return;
    const target = Math.max(0, Math.min(duration - 0.05, v * duration));
    // Guard tiny deltas: assigning currentTime every frame thrashes the decoder.
    if (Math.abs(el.currentTime - target) > 0.03) el.currentTime = target;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMeta = () => setDuration(el.duration);
    el.addEventListener('loadedmetadata', onMeta);
    return () => el.removeEventListener('loadedmetadata', onMeta);
  }, []);

  return (
    <motion.video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="auto"
      className={`absolute inset-0 size-full object-cover ${reduced ? '' : 'lo-idle'}`}
      style={style as never}
      aria-label="An empty plot of land transforming into a completed JCX tower"
    />
  );
}
