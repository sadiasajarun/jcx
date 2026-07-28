'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

/**
 * The constant. Acts cycle, this doesn't — it answers "who is this project"
 * while the overlays answer "what am I looking at". Typography and hairlines
 * only, no icon-per-line spec table.
 */
export function PersistentSpecColumn({ project }: { project: Project }) {
  const rows = [
    { label: 'Project', value: project.name },
    { label: 'Location', value: project.location },
    { label: 'Land', value: project.landSize ?? '—' },
    { label: 'Structure', value: project.floors },
  ];

  return (
    <motion.dl
      key={project.slug}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-56 border-l border-white/15 pl-6"
    >
      {rows.map((row) => (
        <div key={row.label} className="border-b border-white/10 py-3 last:border-b-0">
          <dt className="text-[0.58rem] font-medium tracking-[0.24em] text-white/40 uppercase">
            {row.label}
          </dt>
          <dd className="mt-1 text-[0.9rem] leading-snug text-white">{row.value}</dd>
        </div>
      ))}
    </motion.dl>
  );
}
