import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';

/**
 * The JCX brand mark — the client's circular logo (blue ring, chevron mark,
 * red-accented "JCX" wordmark, "beyond bonding").
 *
 * The supplied file is a JPEG with a light circle behind it, which reads as an
 * intentional badge in both themes. If a transparent SVG lands later, drop it at
 * /public/logo-jcx.svg and change `LOGO_SRC` — nothing else needs to move.
 */
const LOGO_SRC = '/logo-jcx.jpg';

export function Logo({
  /** `invert` renders the lockup text in white for use over the hero and footer. */
  variant = 'auto',
  className = '',
}: {
  variant?: 'auto' | 'invert';
  className?: string;
}) {
  const wordmark = variant === 'invert' ? 'text-white' : 'text-ink';
  const sub = variant === 'invert' ? 'text-white/60' : 'text-muted';

  return (
    <Link
      href="#hero"
      aria-label={`${site.name} — back to top`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative block size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-line transition-transform duration-300 group-hover:scale-105 md:size-12">
        <Image
          src={LOGO_SRC}
          alt=""
          fill
          sizes="48px"
          priority
          className="object-cover"
          aria-hidden
        />
      </span>

      {/* Text lockup — hidden on the narrowest screens so the mark stands alone. */}
      <span className="hidden flex-col leading-none sm:flex">
        <span className={`text-[1.05rem] font-bold tracking-[0.12em] ${wordmark}`}>
          JC<span className="text-accent">X</span>
        </span>
        <span className={`mt-1 text-[0.5rem] font-medium tracking-[0.28em] uppercase ${sub}`}>
          Beyond Bonding
        </span>
      </span>
    </Link>
  );
}
