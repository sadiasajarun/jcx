# DESIGN_SYSTEM — Variation C · "Cinematic Noir"

> Archetype: **Dark Vibrant, reconciled.** Tests the PRD system with the real logo's red
> admitted as a third colour, so the mark sits on the page without clashing.
> Reference: Shanta Holdings black-luxury, K11 ARTUS motion-as-pacing.
> Palette hypothesis: **navy + gold + red accent**, dark-leaning in both themes.

---

## Tokens — Light

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F4F2EE` | Page — bone, cooler than A |
| `--surface` | `#FFFFFF` | Cards |
| `--ink` | `#0C1017` | Headings, body |
| `--muted` | `#5C6673` | Captions |
| `--brand` | `#003C8C` | Structure, interaction |
| `--brand-deep` | `#012A63` | Hover, gradient |
| `--accent` | `#C6A15B` | Gold — rules, frames, act rails |
| `--spark` | `#EC1C2D` | Logo red — the mark, ongoing status, one CTA per viewport |
| `--line` | `#E2DDD4` | Warm-neutral hairline |

## Tokens — Dark

| Token | Value |
|---|---|
| `--bg` | `#0B1017` — deep charcoal-navy |
| `--surface` | `#131A24` |
| `--ink` | `#F1F3F6` |
| `--muted` | `#9AA3B2` |
| `--brand` | `#3E7BD6` |
| `--brand-deep` | `#1E4F9C` |
| `--accent` | `#D8B978` |
| `--spark` | `#FF3B4E` |
| `--line` | `rgba(255,255,255,0.10)` |

## Signature

| Property | Value |
|---|---|
| Background theme | **Bone / charcoal-navy** — dark-leaning in both modes |
| Shadow | **Glow + deep cast** — `0 0 24px rgba(198,161,91,.22)`, `0 28px 60px -24px rgba(0,0,0,.7)` |
| Border | **Translucent white** `rgba(255,255,255,0.10)` |
| Corner radius | **10px** cards, **full-round** pills |
| Display weight | **400 body / 700 display** — high contrast between the two |
| Status expression | **Neon dot with glow ring** |
| Nav theme | **Always dark glass** — never goes light, in either mode |

## Typography

- Display: Cormorant Garamond 700, tracking `-0.015em`. Heavier than A, more theatrical.
- Body: Inter 400.
- Eyebrow: Inter 500, 12px, tracking `0.2em`, uppercase, `--accent`, with a `--spark` dot
  terminator.

## Colour allocation rule

Three colours with a hard split. **Navy** = structure and interaction. **Gold** = frames,
rules, act rails, award marks, progress fills. **Red (`--spark`)** = the JCX mark itself,
the ongoing-status glyph, and exactly one call to action per viewport. Red and gold never
touch the same element.

## Motion

Filmic. Fade + 32px rise, 0.7s, 120ms stagger — slower and heavier than A or B. Film grain
overlay on Sections 5, 6, 8. Glow blooms on hover. Ken Burns 1.06→1.20.

## Risk

Three-colour systems drift busy. The allocation rule above is load-bearing — without it
this becomes the loudest of the three. Dark nav in light mode is unconventional and needs
client buy-in.
