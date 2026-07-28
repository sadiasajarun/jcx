import type { TrustBadge } from '@/data/landowners';

export interface TrustBadgesProps {
  badges: TrustBadge[];
  /** `hairline` is the State-0 stat block; `inline` sits under a step panel. */
  variant?: 'hairline' | 'inline';
}

/**
 * Numeric credibility, surfaced at every state. A badge whose `value` is
 * `null` is dropped entirely — the brief is explicit that a figure the client
 * cannot supply gets cut rather than invented.
 */
export function TrustBadges({ badges, variant = 'inline' }: TrustBadgesProps) {
  const shown = badges.filter((b) => b.value !== null);
  if (shown.length === 0) return null;

  if (variant === 'hairline') {
    return (
      <dl className="border-y border-[var(--gold)]/35 py-5">
        {shown.map((b) => (
          <div key={b.label} className="flex items-baseline gap-3 py-1.5">
            <dt className="display text-[1.6rem] text-[var(--gold-bright)]">{b.value}</dt>
            <dd className="text-[0.7rem] font-medium tracking-[0.18em] text-white/60 uppercase">
              {b.label}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
      {shown.map((b) => (
        <div key={b.label} className="flex items-baseline gap-2">
          <dt className="display text-[1.15rem] text-[var(--gold-bright)]">{b.value}</dt>
          <dd className="text-[0.65rem] font-medium tracking-[0.16em] text-white/55 uppercase">
            {b.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
