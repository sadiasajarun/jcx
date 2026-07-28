# JCX Developments Homepage — Design Guide

> P3a Part 2 output. Human-readable review checkpoint between the PRD and HTML generation.
> Inputs: `.claude-project/docs/PRD.md` (v2), `JCX_DomainResearch.md`, seed `seed-jcx-homepage-a1f3c7`.

---

## 1. Basic Information

| Field | Value |
|---|---|
| Project Name | JCX Developments Ltd. — Homepage |
| Version | 1.0 |
| Timeline | No fixed deadline — quality-gated |
| Project Type | Single-page brand site (marketing), static HTML prototype |
| Target Platform | Desktop-first; tablet and mobile individually designed |
| Visitor Types | Prospective homeowner · Landowner · General visitor / business partner |
| Total "pages" | 1 page, 11 sections, + 15 stub routes |
| Roles (for `design/html/<role>/`) | `app` — single unauthenticated audience, no role separation |

**Role determination.** PRD declares no `user_type` list and no per-role page sections.
Visitor types are audience segments with no permission boundary and no separate surfaces.
Per `pm-3-design.md` Step P3e role-extraction priority 4, the fallback single role **`app`**
applies. All HTML lands in `design/html/app/`.

---

## 2. Design Philosophy

**Core inspiration (must study):**

1. **Shanta Holdings** — one visual per section; awards as structure, not footer garnish.
2. **Fortress Group** — whitespace confidence; renders carry the page.
3. **Tropical Homes** — hero primacy; the first three seconds decide.
4. **K11 ARTUS** — motion as pacing, not decoration.

**The four pillars:**

- **Hero** = Tropical Homes — image-forward, full-bleed, immediate.
- **Portfolio** = Akter Properties' status-first surfacing, rendered as cinema rather than grid.
- **Trust** = Shanta Holdings — testimonials and awards as structural sections.
- **Restraint** = Fortress Group — whitespace, hairlines, small confident type.

**The one borrowed from nobody:** Section 6. No reference site narrates the JV process
visually.

**Voice:** confident, elegant, understated. Short sentences, unafraid of full stops.
Specific numbers over round ones. No exclamation marks. Banned: *luxurious,
state-of-the-art, world-class, unparalleled*.

---

## 3. Design System — shared skeleton

The three variations differ in **colour, shadow, border, radius, weight, status
expression and nav theme**. They share the skeleton below.

### 3.1 Typography scale

| Token | Desktop | Use |
|---|---|---|
| H1 (hero) | clamp 56–92px | Hero display line |
| H2 | 40–56px | Section headline |
| H3 | 24–28px | Card / sub-head |
| Body | 16–18px | Paragraph |
| Meta | 14px | Spec rows, captions |
| Eyebrow | 11–13px, tracked 0.14–0.22em, uppercase | Section label |

Display face is a serif; body is a neutral grotesque. Headline pairs mix roman + italic
(`Addresses that hold` / *`their value.`*).

### 3.2 Spacing

- Base grid: 8px.
- Section padding: `py-24` → `py-32` (96–128px).
- Card padding: 24px.
- Gap between cards: 24px (grid) / 48px (portfolio strip).
- Max content width: 1280px.

### 3.3 Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere.
- Reveal: fade + 24px rise, 0.6s, staggered 60–90ms.
- Scroll-bound motion: GSAP ScrollTrigger.
- Reduced motion: all of the above collapses to opacity-only or nothing.

### 3.4 Components

| Component | Spec |
|---|---|
| Eyebrow | Rule (32px) + tracked uppercase label, accent-coloured |
| Primary button | Height 48px, pill or sharp per variation, label + right arrow |
| Filter field | Eyebrow label above, serif value, rotating chevron |
| Project poster | 580×720 desktop; wide variant 1180px; scrim; serial; status glyph; spec row |
| Status glyph | Ongoing = pulsing dot in ring · Completed = check · Upcoming = dashed ring. Never a filled pill. |
| Testimonial card | 3:4 portrait, hairline border, pull quote in italic display |
| Award mark | Hairline frame, shine sweep on reveal |

---

## 4. Page → Design Brief

One page. Eleven sections in fixed order.

**S1 · Hero** — Full `100svh`. Background video (real asset: `hero.mp4`), muted, looping,
poster for instant paint. Bottom-to-top scrim. Five rotating taglines wiping in on scene
change with an accent underline sweep. Search bar in the **upper third**. Scroll-driven
zoom-out ~8%.

**S2 · Search bar** — Frosted container, max 980px, radius ~20px, deep shadow. Three
fields (Project Type · Status · Location) split by floating hairline dividers at 60%
height. Each field: small-caps eyebrow + serif value + rotating chevron. Search button is
a brand capsule carrying a hairline accent thread inside its border; label + right arrow,
never a magnifier. Dropdown rows carry live count badges. Zero-match → button reads
`No matches — Adjust filters`.

**S3 · About** — `J` `C` `X` as giant cutout windows onto footage. Brand mark centred on
the `C`. Copy card beneath: eyebrow `BEYOND BONDING`, headline, two sentences, `Discover
JCX →`. Letters slide in from separate directions; mark clicks in with a ring pulse; hover
intensifies one letter and dims the others, revealing `THE CRAFT` / `THE COMMUNITY` /
`THE SKYLINE`.

**S4 · Projects** — Sticky command bar (eyebrow, headline, body | category toggle, status
row, odometer count) over a horizontal poster strip driven by vertical scroll. Mosaic
rhythm: every 3rd–4th card wide; ±40px vertical offset. Cursor tilt + glare; cover panel
on hover. Filter changes re-choreograph the strip.

**S5 · Featured** — Four acts per flagship. Full-bleed canvas; bottom-left overlay
(label, headline, chips); right column of persistent data; bottom act rail of four
scrubbable bars at 5s each. Directional wipe between acts, cinema-bar wipe between
projects.

**S6 · Landowners** — Pinned five-state scroll: Plot → Survey → Agreement → Build →
Landmark → Voice. Tower constructs under scroll. Right-edge progress rail.

**S7 · Map** — Area list (30%) + map canvas (70%). Custom monogram pins; ongoing pulses,
upcoming dashed. Lazy-mounted behind a `Load map` cover. Filtered-out pins fade to 30%,
never hide.

**S8 · Testimonials** — Stage (3:4 portrait + pull quote) surrounded by a drifting Wall.
Audience toggle with live counts. Radial mask transitions; word-by-word blur reveal.

**S9 · Awards** — Static row, 3–6 marks, hairline frames, shine sweep on reveal. No
carousel.

**S10 · Footer** — Four columns. Hotline `16777` rendered large. Newsletter with underline
sweep on focus.

**S11 · Global overlays** — WhatsApp FAB with tooltip, scroll-to-top, menu overlay.

**S12 · Light/dark** — Both modes complete in every section.

---

## 5. Variation Archetypes

Three directions, each testing one answer to the deferred palette question.

| | **A — Editorial Luxe** | **B — Brand Modernist** | **C — Cinematic Noir** |
|---|---|---|---|
| Palette source | PRD §5.1 as written | JCX logo, sampled | PRD system + logo mark reconciled |
| Primary | Navy `#003C8C` | Blue `#2050A0` | Navy `#003C8C` |
| Accent | Gold `#C6A15B` | Red `#EC1C2D` | Gold `#C6A15B` + red `#EC1C2D` |
| Light bg | Warm off-white `#F7F6F3` | Pure white `#FFFFFF` | Bone `#F4F2EE` |
| Dark bg | Near-black navy `#0A0F1A` | True black `#08090B` | Deep charcoal-navy `#0B1017` |
| Reference | Fortress Group | Contemporary brand systems | Shanta Holdings / K11 ARTUS |
| Feel | Quiet, printed, gallery | Confident, graphic, current | Filmic, dark, weighted |

### Differentiation Verification Checklist

| # | Item | A | B | C | Differs? |
|---|---|---|---|---|:--:|
| 1 | Background theme | Warm cream | Pure white / true black | Bone / charcoal-navy | ✅ |
| 2 | Shadow style | Soft warm diffuse | None — hairline only | Glow + deep cast | ✅ |
| 3 | Border treatment | Warm hairline `#E7E3DB` | Crisp cool hairline `#E3E6EC` | Translucent white `rgba(255,255,255,.10)` | ✅ |
| 4 | Corner radius | 16px (2xl) | 2px — near-sharp | 10px + full-round pills | ✅ |
| 5 | Type weight | 300 light editorial | 600 semibold grotesque | 400 body / 700 display | ✅ |
| 6 | Status expression | 6px dot, no label | Animated glyph + tracked label | Neon dot with glow ring | ✅ |
| 7 | Nav theme | Transparent → cream solid | Transparent → white solid | Always dark glass | ✅ |

**Result: 7 / 7 differ — passes the 5/7 threshold.**

---

## 6. Design Rules

**Do**

- Treat whitespace as a feature. Small type reads as confident.
- Keep the accent to jewellery scale — eyebrows, underlines, active states, pins, rules.
- Let every section own a distinct layout. No two sections share a grammar.
- Ship every motion with a reduced-motion fallback that is still complete and legible.
- Mark every placeholder visibly.

**Do not**

- Use illustrated skylines, stock handshakes, puzzle-piece trust imagery, or clip-art.
- Fill status as a coloured pill.
- Put a house glyph beside a square-footage figure.
- Carousel the awards.
- Autoplay any video with sound.
- Let a custom cursor replace a focus ring.

---

## 7. Deliverables Plan

| Step | Output | State |
|---|---|:--:|
| P3a | `JCX_DomainResearch.md`, `JCX_DesignGuide.md`, `DESIGN_SYSTEM_{A,B,C}.md` | ✅ |
| P3b | `JCX_VariationPrompts.md` | ✅ |
| P3c | `variations/{A,B,C}-01-homepage.html`, `showcase-ALL.html` | ✅ |
| P3d | Client picks → `DESIGN_STATUS.md` `approved: true` | ⏸ pause |
| P3e | `design/html/app/*.html` — all 11 sections of the winner | pending |
| P3f | `DESIGN_QA_STATUS.md` | pending |
| P3g | `DESIGN_STATUS.md` snapshot fields | pending |

**Variation scope.** Each variation renders a representative vertical slice — Hero,
Search bar, About and Projects — using real in-repo assets and real PRD copy. That is
enough surface to judge palette, type, motion language, card treatment and both themes.
The winning variation is then built out to all eleven sections at P3e.
