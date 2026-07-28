import type { TargetAndTransition } from 'framer-motion';
import { ACT_KEYS, type ActKey, type Project } from '@/data/projects';

/** Constant across every project — only the headline beside them changes. */
export const ACT_LABELS: Record<ActKey, string> = {
  approach: 'The Arrival',
  facade: 'The Architecture',
  interior: 'The Living',
  detail: 'The Detail',
};

/**
 * Ken Burns move per act. Each is a `from`/`to` transform pair applied over the
 * full act duration, so the frame is never still.
 */
export const ACT_MOVES: Record<ActKey, { from: TargetAndTransition; to: TargetAndTransition }> = {
  // Pull back.
  approach: { from: { scale: 1.2, x: '0%', y: '0%' }, to: { scale: 1.03, x: '0%', y: '0%' } },
  // Rise.
  facade: { from: { scale: 1.14, x: '0%', y: '4%' }, to: { scale: 1.14, x: '0%', y: '-4%' } },
  // Push in.
  interior: { from: { scale: 1.02, x: '0%', y: '0%' }, to: { scale: 1.18, x: '0%', y: '0%' } },
  // Lateral drift.
  detail: { from: { scale: 1.12, x: '-3%', y: '0%' }, to: { scale: 1.12, x: '3%', y: '0%' } },
};

/**
 * The glow the canvas casts into the section behind it, per act — warm for the
 * daylight and interior frames, cool for the night elevation.
 */
export const ACT_GLOW: Record<ActKey, string> = {
  approach: 'rgb(236 28 45 / 0.16)',
  facade: 'rgb(32 80 160 / 0.28)',
  interior: 'rgb(236 28 45 / 0.14)',
  detail: 'rgb(32 80 160 / 0.22)',
};

/** The acts a project actually has, in running order. */
export function actsOf(project: Project): ActKey[] {
  return ACT_KEYS.filter((key) => Boolean(project.acts?.[key]));
}

/** Projects with at least one act — anything else is skipped silently. */
export function playableProjects(all: Project[]): Project[] {
  return all.filter((p) => p.featured && actsOf(p).length > 0);
}

/** `JCX Grand Residences` → `JGR`, `ICON 100` → `IC1`. */
export function initialsOf(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 3) return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
  return name.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase();
}
