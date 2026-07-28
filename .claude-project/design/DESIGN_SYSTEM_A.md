# DESIGN_SYSTEM — Variation A · "Editorial Luxe"

> Archetype: **Editorial Minimal, warmed.** Tests the PRD §5.1 palette exactly as written.
> Reference: Fortress Group whitespace confidence, print-editorial typography.
> Palette hypothesis: **navy anchor + gold jewellery**, on warm off-white.

---

## Tokens — Light

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F7F6F3` | Page — warm off-white, never pure |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--ink` | `#0E1726` | Headings, body |
| `--muted` | `#5B6472` | Captions, meta |
| `--brand` | `#003C8C` | Primary actions, active states |
| `--brand-deep` | `#012A63` | Hover, gradient end |
| `--accent` | `#C6A15B` | Eyebrows, rules, active dots, awards |
| `--line` | `#E7E3DB` | Warm hairline |

## Tokens — Dark

| Token | Value |
|---|---|
| `--bg` | `#0A0F1A` |
| `--surface` | `#111827` |
| `--ink` | `#F3F4F6` |
| `--muted` | `#9AA3B2` |
| `--brand` | `#3E7BD6` |
| `--brand-deep` | `#1E4F9C` |
| `--accent` | `#D8B978` |
| `--line` | `#1F2A3C` |

## Signature

| Property | Value |
|---|---|
| Background theme | **Warm cream** |
| Shadow | **Soft warm diffuse** — `0 12px 32px -12px rgba(14,23,38,.14)` |
| Border | **Warm hairline** `#E7E3DB` |
| Corner radius | **16px** cards, 8px controls |
| Display weight | **300 light**, editorial scale to 92px |
| Status expression | **6px dot only**, no label |
| Nav theme | Transparent over hero → **cream solid** on scroll |

## Typography

- Display: Cormorant Garamond, 300, tracking `-0.02em` at large sizes.
- Body: Inter, 400.
- Eyebrow: Inter 500, 12px, tracking `0.22em`, uppercase, `--accent`, preceded by a 32px rule.

## Colour allocation rule

Navy carries **interaction**: buttons, active tabs, links, focus rings, map pins.
Gold carries **punctuation**: eyebrow labels and rules, hover underlines, active dots,
award frames, the brand-mark ring. Gold never fills an area larger than a 48px control.

## Motion

Restrained. Fade + 24px rise on reveal, 0.6s, 90ms stagger. Ken Burns at 1.02→1.08 only.
Hover lifts 2px. No glow, no neon.

## Risk

Closest to the existing market register — Sanmar's bronze and Shanta's premium-navy are
adjacent. Lowest differentiation of the three, highest safety.
