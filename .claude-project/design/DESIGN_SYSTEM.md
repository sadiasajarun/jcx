# DESIGN_SYSTEM — JCX Developments Homepage

> **Approved at P3d.** Selection: **Mix — Variation B base + Variation C shadow.**
> Supersedes `DESIGN_SYSTEM_{A,B,C}.md`, which remain as the record of what was compared.
> This file is the single source of truth for P3e HTML generation.

---

## 1. Identity

**Palette source:** sampled from the client's logo (`public/logo-jcx.jpg`) — the blue ring
and wordmark, and the red X-stroke and bottom chevron.

| Brand colour | Value | Sampled from |
|---|---|---|
| Blue | `#2050A0` | Logo ring + "JCX" wordmark |
| Red | `#EC1C2D` | X upper stroke + bottom chevron |
| Periwinkle | `#9AA2DB` | Middle chevron — reserved, not in active use |

**Light mode is pure white. Dark mode is true black.** Blue and red are the only colour in
either.

---

## 2. Tokens — Light

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page |
| `--surface` | `#F6F7FA` | Cards, panels |
| `--ink` | `#0B0D12` | Headings, body |
| `--muted` | `#5A6472` | Captions, meta |
| `--brand` | `#2050A0` | Interaction, structure |
| `--brand-deep` | `#173C79` | Hover |
| `--accent` | `#D81829` | Red for text — darkened for AA on white |
| `--accent-strong` | `#EC1C2D` | Logo red as-is — fills only |
| `--line` | `#E3E6EC` | Crisp cool hairline |

## 3. Tokens — Dark

| Token | Value |
|---|---|
| `--bg` | `#08090B` |
| `--surface` | `#101217` |
| `--ink` | `#F2F4F7` |
| `--muted` | `#98A1AE` |
| `--brand` | `#4E86E8` |
| `--brand-deep` | `#2F63C4` |
| `--accent` | `#FF4256` |
| `--accent-strong` | `#EC1C2D` |
| `--line` | `#1B1E26` |

`--accent` is the logo red nudged darker in light and lighter in dark so it clears AA
against white and black respectively. `--accent-strong` is the untouched logo red, used
only where white text carries the contrast.

---

## 4. Signature

| Property | Value | From |
|---|---|:--:|
| Background theme | Pure white / true black | B |
| Border | Crisp cool hairline `#E3E6EC` | B |
| Corner radius | **2px** — near-sharp throughout | B |
| Display weight | **600** grotesque; serif italic for pull quotes only | B |
| Status expression | Animated glyph + tracked label | B |
| Nav on scroll | Transparent over hero → white solid | B |
| Motion | Crisp — 0.45s, 16px rise, 60ms stagger; underlines wipe | B |
| **Shadow** | **Glow + deep cast** | **C** |

### 4.1 Shadow specification

```css
/* Light */
--shadow:       0 0 24px rgba(32,80,160,.14), 0 24px 56px -24px rgba(11,13,18,.34);
--shadow-lift:  0 0 32px rgba(32,80,160,.22), 0 34px 70px -26px rgba(11,13,18,.44);
--shadow-float: 0 0 28px rgba(32,80,160,.16), 0 40px 90px -30px rgba(11,13,18,.50);

/* Dark */
--shadow:       0 0 28px rgba(78,134,232,.20), 0 24px 56px -24px rgba(0,0,0,.75);
--shadow-lift:  0 0 38px rgba(78,134,232,.30), 0 34px 70px -26px rgba(0,0,0,.85);
--shadow-float: 0 0 34px rgba(78,134,232,.22), 0 40px 90px -30px rgba(0,0,0,.9);
```

- `--shadow` — resting state on cards, posters, the copy card.
- `--shadow-lift` — hover.
- `--shadow-float` — elements that float over media: the search bar, modals, popups.

**The glow is brand blue, never red.** A red glow on every card would break the red
allocation cap below.

---

## 5. Colour allocation rule

**Blue carries interaction and structure.** Buttons, active tabs, links, focus rings, map
pins, the shadow glow.

**Red carries attention only.** Eyebrow labels, the active filter underline, the
ongoing-status glyph, the map pin core, the X in the wordmark, and at most one call to
action per viewport.

**Red never exceeds ~5% of any viewport.** Two colours only — no tertiary.

---

## 6. Typography

| Role | Face | Weight | Notes |
|---|---|---|---|
| Display / headlines | Inter | 600 | Tracking `-0.03em` |
| Headline second line, pull quotes | Cormorant Garamond | 400 italic | The one serif appearance |
| Body | Inter | 400 | 16–18px |
| Meta / specs | Inter | 400 | 14px, tracked `0.12em` uppercase where labelled |
| Eyebrow | Inter | 600 | 11px, tracked `0.24em`, uppercase, `--accent`, no rule — colour alone |

Scale: H1 `clamp(56px, 9vw, 92px)` · H2 `clamp(40px, 4.6vw, 58px)` · H3 24–28px ·
body 16–18px · meta 14px · eyebrow 11px.

---

## 7. Spacing & layout

- Base grid 8px · section padding 112–136px · card padding 24px
- Card gap 24px (grid) / 48px (portfolio strip)
- Max content width 1280px
- Breakpoints: 1280 desktop · 768–1279 tablet · below 768 mobile

---

## 8. Motion

- Easing `cubic-bezier(0.22, 1, 0.36, 1)` everywhere.
- Reveal: fade + 16px rise, 0.45s, 60ms stagger.
- Underlines wipe (scaleX from origin) rather than fade.
- Scroll-bound motion: GSAP ScrollTrigger, with an IntersectionObserver fallback so the
  page still reveals correctly with no network.
- Hover: 2px lift + `--shadow-lift`.
- `prefers-reduced-motion` disables scroll-binding, Ken Burns, stagger, drift, particles
  and custom cursors. Every section stays complete and legible.

---

## 9. Components

| Component | Spec |
|---|---|
| Primary button | 48px, radius 2px, `--brand` fill, white label + right arrow |
| Search button | 56px, radius 2px, `--brand` fill, 1px `--accent-strong` inner thread |
| Filter field | Eyebrow label + serif value + rotating chevron, hairline divider between |
| Project poster | 500×640 desktop, wide variant 900px, radius 2px, hairline border, `--shadow` → `--shadow-lift` on hover |
| Status glyph | Ongoing = pulsing red dot in ring + `ONGOING` · Completed = blue check + `COMPLETED` · Upcoming = dashed ring + `UPCOMING`. Never a filled pill. |
| Testimonial portrait | 3:4, hairline border, `--shadow-float` |
| Award mark | Hairline frame, shine sweep on reveal |
| Floating action | WhatsApp `#25D366` circle + scroll-to-top, `--shadow-float` |

---

## 10. Prohibitions

- No illustrated skylines, stock handshakes, puzzle-piece trust imagery, clip-art.
- No filled status pills.
- No house glyph beside a square-footage figure.
- No carousel in the Awards band.
- No autoplaying audio.
- No custom cursor replacing a focus ring.
- No red glow, and no red covering more than ~5% of a viewport.
- No exclamation marks; never *luxurious, state-of-the-art, world-class, unparalleled*.
