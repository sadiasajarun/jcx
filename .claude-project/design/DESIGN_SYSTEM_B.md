# DESIGN_SYSTEM — Variation B · "Brand Modernist"

> Archetype: **Graphic Minimal, brand-true.** Tests the palette sampled from the JCX logo.
> Reference: contemporary brand systems — sharp corners, no shadows, colour as signal.
> Palette hypothesis: **logo blue + logo red**, on pure white / true black.

---

## Tokens — Light

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page — pure white |
| `--surface` | `#F6F7FA` | Cards, panels |
| `--ink` | `#0B0D12` | Headings, body |
| `--muted` | `#5A6472` | Captions, meta |
| `--brand` | `#2050A0` | **Sampled from the logo ring and wordmark** |
| `--brand-deep` | `#173C79` | Hover |
| `--accent` | `#D81829` | Logo red, darkened for AA on white |
| `--accent-strong` | `#EC1C2D` | **Sampled from the logo X-stroke** — fills only |
| `--line` | `#E3E6EC` | Cool hairline |

## Tokens — Dark

| Token | Value |
|---|---|
| `--bg` | `#08090B` — true black |
| `--surface` | `#101217` |
| `--ink` | `#F2F4F7` |
| `--muted` | `#98A1AE` |
| `--brand` | `#4E86E8` |
| `--brand-deep` | `#2F63C4` |
| `--accent` | `#FF4256` |
| `--accent-strong` | `#EC1C2D` |
| `--line` | `#1B1E26` |

## Signature

| Property | Value |
|---|---|
| Background theme | **Pure white / true black** |
| Shadow | **None** — separation by hairline and spacing only |
| Border | **Crisp cool hairline** `#E3E6EC` |
| Corner radius | **2px** — near-sharp throughout |
| Display weight | **600 semibold** grotesque headlines; serif reserved for pull quotes |
| Status expression | **Animated glyph + tracked label** |
| Nav theme | Transparent over hero → **white solid** on scroll |

## Typography

- Display: Inter 600 for headlines, tracking `-0.03em`. Cormorant Garamond italic reserved
  for pull quotes and the second line of headline pairs.
- Body: Inter 400.
- Eyebrow: Inter 600, 11px, tracking `0.24em`, uppercase, `--accent`, no rule — colour alone.

## Colour allocation rule

Blue carries **interaction and structure**. Red carries **attention**: eyebrows, the active
filter underline, the ongoing-status glyph, the map pin core, the X in the wordmark.
Red never exceeds 5% of any viewport. Two colours only — no tertiary.

## Motion

Crisp. Fade + 16px rise, 0.45s, 60ms stagger. Transitions snap rather than settle.
Underlines wipe rather than fade. No glow.

## Risk

Red is conventionally an alert colour in UI. Discipline to accent-only is mandatory or the
register cheapens. Highest differentiation of the three — no competitor in the reference
set uses red.
