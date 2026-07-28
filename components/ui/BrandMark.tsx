/**
 * The JCX disc mark — the anchor that sits on the `C` in the About wordmark.
 *
 * Inline SVG on purpose: the disc inherits `currentColor`, so a parent can
 * retheme it without touching this file. The ring and the X stroke are the
 * brand red; the monogram is white.
 */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="JCX Developments Ltd."
    >
      {/* Disc — inherits currentColor so the parent controls the fill. */}
      <circle cx="60" cy="60" r="52" fill="currentColor" />

      {/* Brand-red ring. */}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="var(--accent-strong)"
        strokeWidth="3"
      />
      <circle
        cx="60"
        cy="60"
        r="45"
        fill="none"
        stroke="var(--accent-strong)"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeDasharray="2 6"
      />

      <text
        x="60"
        y="69"
        textAnchor="middle"
        fontFamily="var(--font-sans), Helvetica, Arial, sans-serif"
        fontSize="30"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#FFFFFF"
      >
        JC
        <tspan fill="var(--accent-strong)">X</tspan>
      </text>

      <text
        x="60"
        y="84"
        textAnchor="middle"
        fontFamily="var(--font-sans), Helvetica, Arial, sans-serif"
        fontSize="7"
        letterSpacing="2.2"
        fill="#FFFFFF"
        fillOpacity="0.7"
      >
        BEYOND BONDING
      </text>
    </svg>
  );
}
