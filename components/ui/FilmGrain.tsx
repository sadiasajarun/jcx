/**
 * Animated SVG film grain. Cheap (one filter, one rect) and it does more for
 * the "cinematic" claim than any transition.
 */
export function FilmGrain({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full mix-blend-overlay"
      style={{ opacity }}
      aria-hidden
    >
      <filter id="film-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch">
          {/* Jittering the seed is what makes it read as moving grain. */}
          <animate
            attributeName="seed"
            values="1;7;3;9;2;1"
            dur="0.6s"
            repeatCount="indefinite"
            calcMode="discrete"
          />
        </feTurbulence>
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain)" />
    </svg>
  );
}
