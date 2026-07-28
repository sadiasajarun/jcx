# JCX Homepage — Variation Prompts (P3b)

> Generation prompts used to produce `variations/{A,B,C}-01-homepage.html`.
> Each renders the same representative slice — Hero → Search → About → Projects — so the
> only difference the client judges is the design system.

---

## Shared constraints (all three variations)

- Static HTML, one file, no build step. Tailwind via CDN, GSAP + ScrollTrigger via CDN.
- Light **and** dark mode, toggled in-page, persisted to `localStorage`, honouring
  `prefers-color-scheme` before first paint.
- **Real in-repo assets only**, referenced at `../../../public/…`:
  - `videos/hero.mp4`, `images/hero/hero-poster.jpg`
  - `images/projects/president-park/{approach,facade,interior,detail}.jpg`
  - `images/about/about-backdrop.jpg`, `images/beliefs/backdrop.jpg`, `logo-jcx.jpg`
  - Generated SVG stand-ins for the eleven projects without renders — each visibly marked.
- **Real PRD copy only.** Five hero taglines verbatim. Real project names, sizes, unit and
  floor counts. No invented awards, statistics or testimonials.
- Every file contains the class hook `var-nav-bar` on its navigation element.
- `prefers-reduced-motion` disables scroll-bound motion, Ken Burns and stagger.
- Semantic landmarks, visible focus rings, `aria-label` on icon-only controls.

## Shared section slice

| Section | Content |
|---|---|
| Hero | `100svh`, `hero.mp4` autoplay muted loop, scrim, rotating taglines, scroll cue |
| Search bar | Upper third, three fields + Search button, live filter of the strip below |
| About | `JCX` treatment + copy card (eyebrow, headline, two sentences, CTA) |
| Projects | Command bar (eyebrow, headline, category toggle, status row, odometer) + poster strip |

---

## Variation A — "Editorial Luxe"

> Build the slice using `DESIGN_SYSTEM_A.md`.
>
> Warm off-white `#F7F6F3` page, white cards, **soft warm diffuse shadows**, warm hairline
> `#E7E3DB`, **16px** radii, display serif at **weight 300** running up to 92px.
> Navy `#003C8C` carries every interaction; gold `#C6A15B` appears only as eyebrow rules,
> hover underlines, active dots and frames — never filling more than a 48px control.
> Status is a **6px dot with no label**. Nav is transparent over the hero and resolves to
> **cream solid** on scroll. Motion is restrained: fade + 24px rise, 0.6s, 90ms stagger,
> 2px hover lift, no glow. Dark mode drops to `#0A0F1A` with gold at `#D8B978`.
> Reference feel: a printed architecture monograph.

## Variation B — "Brand Modernist"

> Build the slice using `DESIGN_SYSTEM_B.md`.
>
> **Pure white** `#FFFFFF` page, **no shadows anywhere** — separation by hairline
> `#E3E6EC` and spacing alone. **2px** radii throughout, near-sharp. Headlines in Inter
> **600** with tight `-0.03em` tracking; serif italic reserved for pull quotes and the
> second line of headline pairs. Blue `#2050A0` (sampled from the logo ring) carries
> structure and interaction; red `#D81829` / `#EC1C2D` (sampled from the logo X-stroke)
> carries attention only — eyebrows, the active filter underline, the ongoing glyph, the
> pin core — and never exceeds 5% of any viewport. Status is an **animated glyph plus a
> tracked label**. Nav resolves to **white solid**. Motion is crisp: fade + 16px rise,
> 0.45s, 60ms stagger; underlines wipe rather than fade. Dark mode is **true black**
> `#08090B`. Reference feel: a contemporary brand system, graphic and current.

## Variation C — "Cinematic Noir"

> Build the slice using `DESIGN_SYSTEM_C.md`.
>
> Bone `#F4F2EE` page in light, deep charcoal-navy `#0B1017` in dark — **dark-leaning in
> both**. Translucent white borders, **glow plus deep cast shadows**, **10px** radii with
> full-round pills. Display serif at **700**, body at 400 — high contrast between them.
> Three colours on a hard split: navy for structure, gold `#C6A15B` for frames, rules, act
> rails and progress fills, red `#EC1C2D` for the JCX mark, the ongoing glyph and exactly
> one CTA per viewport. Red and gold never touch the same element. Status is a **neon dot
> with a glow ring**. Nav is **always dark glass** — it never goes light, in either mode.
> Motion is filmic and heavy: fade + 32px rise, 0.7s, 120ms stagger, Ken Burns 1.06→1.20,
> glow bloom on hover, film grain overlay. Reference feel: a title sequence.

---

## Showcase

`variations/showcase-ALL.html` presents the three side by side in labelled desktop device
frames, each an `<iframe>` of the variation file, with a shared theme toggle so the client
can compare light and dark across all three simultaneously.
