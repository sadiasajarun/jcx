# DESIGN_QA_STATUS — jcx

> P3f output. Role-aware QA over `.claude-project/design/html/`.
> Design system: **Mix — Variation B base + Variation C shadow**.

**Result: PASS — 8 / 8 checks.**

---

## 1. Routing validation

Every internal `href` resolves to an element that exists in the document.

| Anchor | Target | Result |
|---|---|:--:|
| `#hero` `#about` `#projects` `#featured` `#landowners` `#map` `#testimonials` `#awards` `#contact` | Section elements | ✅ 9 / 9 |
| External | `tel:16777`, WhatsApp, Facebook, LinkedIn, YouTube, Instagram | ✅ all intentional |
| Dead ends | none | ✅ |

**Fixed during QA:**
- `#map` resolved to the inner grid rather than the section, so anchor scroll landed
  below the heading. Section now owns `id="map"`; the grid is `id="mapGrid"`.
- `id="awards"` was duplicated on the section and its grid — invalid HTML and an
  ambiguous `getElementById`. Grid renamed to `id="awardsGrid"`.
- Full-document duplicate-ID scan after the fix returns **none**.

**Outbound CTAs.** Per UX suggestion #10 in the PRD, every outbound call to action targets
an in-page anchor rather than an unbuilt route. During client review a click on
`Explore`, `View all 60+ projects` or `Start your joint venture` lands on the footer
contact block instead of a 404. When the production routes exist, repoint them to
`/properties/[slug]`, `/properties` and `/landowner`.

## 2. Shared component consistency

Single-page delivery, single role folder. The navigation, utility strip, menu overlay,
footer and floating action group each exist exactly once, so cross-page drift is not
possible. ✅

## 3. Design-system compliance

Every token in the rendered HTML traces to `DESIGN_SYSTEM.md`.

| Token | Value | Present |
|---|---|:--:|
| `--brand` | `#2050A0` | ✅ |
| `--accent-strong` | `#EC1C2D` | ✅ |
| `--accent` light | `#D81829` | ✅ |
| `--bg` light / dark | `#FFFFFF` / `#08090B` | ✅ |
| `--line` light | `#E3E6EC` | ✅ |
| `--radius` | `2px` | ✅ |
| Shadow set | `--shadow` · `--shadow-lift` · `--shadow-float` | ✅ |

Signature verified against the approved Mix: B's pure-white/true-black grounds, crisp
hairline, 2px radii, 600-weight grotesque display and glyph-plus-label status, with C's
glow-plus-deep-cast shadow. Glow is brand blue in both themes — no red glow, per the
allocation rule.

## 4. Page completeness

No `routes.yaml` exists, so route coverage is evaluated against the PRD's eleven sections.

| PRD Section | Present | Notes |
|---|:--:|---|
| S1 Hero | ✅ | `hero.mp4` autoplay, 5 rotating taglines, scroll cue |
| S2 Search bar | ✅ | Upper third, 3 fields, live filter, zero-match state |
| S3 About | ✅ | J/C/X cutout windows, brand mark on the C, copy card |
| S4 Projects | ✅ | Command bar, odometer, horizontal strip, hover cover panel |
| S5 Featured | ✅ | Four acts, wipe, typewriter label, act rail, reel change |
| S6 Landowners | ✅ | Five states, scroll-driven SVG plot→tower, step rail |
| S7 Map | ✅ | Area list, Leaflet, JCX pins, lazy `Load map` cover |
| S8 Testimonials | ✅ | Stage, wall, audience toggle, modal, mood tint |
| S9 Awards | ✅ | Static row, shine sweep, hover citation |
| S10 Footer | ✅ | 4 columns, large hotline, newsletter |
| S11 Global overlays | ✅ | WhatsApp FAB + tooltip, scroll-to-top, menu overlay |
| S12 Light/dark | ✅ | Toggle, persisted, pre-paint, all sections |

**12 / 12.**

## 5. Role-folder presence

| Role | Files | Result |
|---|:--:|:--:|
| `app` | `home.page.html` | ✅ ≥ 1 |

Single role, as determined in the Design Guide: the PRD declares no `user_type` list and
no per-role surfaces, so `pm-3-design.md` P3e priority 4 (fallback `app`) applies.

## 6. Role match

Role folders on disk = `[app]`. `DESIGN_STATUS.roles` = `[app]`. ✅

## 7. Cross-role navigation

Only one role exists, so no cross-role hrefs are possible. ✅

## 8. Accessibility

| Check | Count | Result |
|---|:--:|:--:|
| `aria-label` | 51 | ✅ |
| `role=` | 28 | ✅ |
| `aria-current` | 16 | ✅ |
| `<img>` missing `alt` | 0 | ✅ |
| `prefers-reduced-motion` blocks | 2 | ✅ |
| `:focus-visible` styling | present | ✅ |
| Landmarks | 1 header · 1 main · 1 footer · 8 section · 5 nav | ✅ |

**Reduced motion** collapses the pinned landowner sequence to a stacked list, unstacks the
featured acts, flattens the poster hover panel into static content, and disables autoplay,
Ken Burns, stagger and the typewriter. Every section stays complete and legible.

**Keyboard.** The portfolio strip is focusable and pans with `←`/`→`. The featured canvas
responds to `←`/`→`. Escape closes both the menu overlay and the testimonial modal.
Segmented toggles are `role="radiogroup"` with `role="radio"` children.

## 9. Asset resolution

All 33 referenced assets resolve, including runtime-composed paths.

| Group | Result |
|---|:--:|
| Hero film + poster | ✅ 2 / 2 |
| President Park act renders | ✅ 4 / 4 |
| About letter windows + backdrop | ✅ 4 / 4 |
| Project stand-ins | ✅ 11 / 11 |
| Testimonial monograms | ✅ 5 / 5 |
| Award emblems | ✅ 4 / 4 |
| Map cover, logo | ✅ 2 / 2 |

## 10. Network resilience

Three external dependencies, each with a fallback:

| Dependency | Fallback if unavailable |
|---|---|
| GSAP + ScrollTrigger (CDN) | IntersectionObserver reveal path; the page still animates in |
| Leaflet (CDN) | `Load map` cover stays; area list remains usable |
| Google Fonts | `Georgia, serif` and `system-ui` stacks |

The prototype opens and functions from `file://` with no network.

---

---

## Revision 2 — hero rebuilt to client references (2026-07-27)

Client supplied two references: **Residida** (glass X lens over a blurred film bed) and
**Aterra** (segmented pill + labelled field card). Sections 1 and 2 were rebuilt to match.

### What changed

| | Before | After |
|---|---|---|
| Hero background | Single film + gradient scrims | **Blurred, dimmed film bed** + vignette |
| Focal element | none | **Glass X lens** — the same film again, unblurred and lifted, clipped to two hourglass panes with opposing refraction offsets, specular bloom, and a chromatic edge in brand blue + red |
| Headline | Stacked 3 lines, left-aligned | **Three parts laid across the lens waist**, outward-in stagger with blur-to-focus |
| Search bar | Inline row, upper third | **Segmented pill + frosted field card + square submit**, centred below the headline |
| Bottom band | none | **Copy left, area switcher right** — the area row drives the real location filter |

### New QA checks

| Check | Result |
|---|:--:|
| Filter state shared across **four** views (segbar, card selects, projects command bar, hero area row) | ✅ all four sync |
| Area row toggles off when the active area is re-clicked | ✅ not a trap |
| Zero-match state still reachable and labelled | ✅ button becomes `No matches — Adjust filters` |
| Stale references to removed hero elements (`#tagRule`, `#heroVid`, `.hero-media`, `.hero-scrim`) | ✅ 0 |
| Duplicate IDs after rebuild | ✅ none |
| Anchors resolve | ✅ 9 / 9 |
| Assets resolve | ✅ all |

### Two defects found and fixed during this revision

1. **`.hero-in` set `min-height:100svh` inside an already-full-height flex parent**, which
   with a 118px nav offset would overflow the viewport. Replaced with `flex:1` plus auto
   margins so the headline group parks in the optical centre and the foot band on the
   floor, neither overflowing.
2. **The lens broke reduced-motion.** The rebuild introduced *three* concurrent autoplaying
   videos of the same file, and the existing `prefers-reduced-motion` block did not cover
   them — the exact thing that preference exists to stop. All three layers now carry a
   poster `<img class="still">` sibling; reduced motion hides every video and reveals the
   stills, per PRD §S1.

### Two further defects found on client review of the rebuilt hero

3. **The Map section rendered on top of the hero.** Root cause was mine, introduced during
   Revision 1: the map section was renamed to `id="map"` to fix an anchor target, but the
   stylesheet still carried `#map{position:absolute;inset:0}` — a rule written for the old
   Leaflet canvas div. Applied to a whole `<section>`, it pulled Section 7 out of document
   flow and pinned it over the hero. Selector corrected to `#mapCanvas`.

   *Guard added to this QA pass:* every `#id` selector in the stylesheet is now checked
   against a real element, and every `position:absolute` rule is checked for a positioned
   ancestor. Both audits pass.

4. **Hero headline overflowed the right edge.** `clamp(26px, 5.4vw, 74px)` on a three-part
   nowrap row is too large for the longest tagline — *DISCOVER · PERFECTION · IN EVERY
   DETAIL*, 33 characters — which exceeded the 1280px shell. Reduced to
   `clamp(20px, 3.9vw, 56px)` with a tightened gap, sized so that worst-case line clears
   the shell at every width above the 760px stacking breakpoint.

### Performance note

Three simultaneous decoders of a 9.4 MB file is heavy for the declared support floor
(evergreen + Safari 15 / iOS 15, mid-range Android). **Below 900px the two lens panes fall
back to the poster still** and only the bed keeps playing, cutting decoders from three to
one on mobile. The lens still reads — it is a bright, sharp, refracted still against a
blurred bed — it simply stops moving.

### PRD deviation recorded

PRD §Section 2 places the search bar in the **upper third** of the hero. The Aterra
reference places it **centred beneath the headline**, and that is what the client asked
for. The build follows the client direction. `docs/PRD.md` §Section 2 needs a one-line
amendment at the next PRD revision, or this stands as a knowing deviation.

---

## Carried findings — not defects

These are known states recorded in the PRD and seed, not QA failures.

1. **Placeholder imagery.** 11 of 12 project cards and 4 of 5 featured projects use in-repo
   stand-ins, each labelled `PLACEHOLDER RENDER` on the card itself. Sections 6, 8 and 9
   have no real photography at all. Closing this needs the PRD §9.1 handoff list.
2. **Featured degradation is visible.** Only President Park has four real act renders, so
   only it plays a true four-act sequence. The other four correctly fall back to the
   single-still hero defined in the PRD, which means the reel-change is the main motion
   the client will see on those.
3. **Placeholder statistics.** Landowner trust numbers and award captions render with an
   explicit "Placeholder — client to confirm" line rather than being silently presented.
4. **Three consecutive scroll-capturing sections** (4, 5, 6) — flagged as UX suggestion #1,
   priority High, in the PRD. Not yet mitigated; awaiting the client's call on whether to
   add skip affordances.
