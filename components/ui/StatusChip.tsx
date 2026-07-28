import type { Status } from '@/data/projects';

const styles: Record<Status, string> = {
  // Brand red = in progress, brand blue = delivered, muted = not started.
  ongoing: 'border-accent/45 bg-accent/12 text-accent',
  completed: 'border-brand/40 bg-brand/12 text-brand',
  upcoming: 'border-line bg-ink/5 text-muted dark:bg-white/8',
};

const labels: Record<Status, string> = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  upcoming: 'Upcoming',
};

export function StatusChip({ status, className = '' }: { status: Status; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.14em] uppercase ${styles[status]} ${className}`}
    >
      {labels[status]}
    </span>
  );
}

export const statusLabel = (status: Status) => labels[status];
