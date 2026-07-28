# JCX Developments Ltd. — Homepage Project Requirements Document

**Client:** JCX Developments Ltd. (jcxbd.com)
**Deliverable:** Single-page homepage redesign, highly interactive, light + dark mode
**Document type:** Design-focused PRD — describes intent, look, feel, motion, and content. Implementation and tech stack decisions live in the section-level prompts that accompany this document.
**Version:** 1.0

---

## 1. Executive summary

JCX Developments Ltd. is a premium Dhaka real-estate developer built on a Japanese joint venture with Creed Group, tagline *"Beyond Bonding."* Their current site is content-complete but visually generic — it looks like several other Bangladeshi developer sites and does not communicate the premium, Japanese-collaboration positioning JCX actually stands for.

The homepage brief is to replace the current site with a **single, cinematic, highly interactive homepage** that reads at the level of the reference set (Shanta Holdings, Sanmar, Fortress) while carrying JCX's own visual identity. The page ships with **eleven distinct sections**, unified by one design system, one motion language, and one narrative arc: *the JCX story, told in scenes*.

The design bar: restraint over noise, motion over static, real over stock. Every section is designed to give the visitor a reason to keep scrolling; no section repeats the visual grammar of another.

---

## 2. About the client

**Company:** JCX Developments Ltd.
**Tagline:** Beyond Bonding
**Positioning:** Contemporary Residential, Commercial, and Condominium developments in Bangladesh, delivered with Japanese engineering standards through partnership with Creed Group, Japan.

**Core facts:**
- Approximately 60 projects across the portfolio
- Concentrated in Bashundhara R/A, Jalshiri Abashon, Niketan/Gulshan-1, and Narayanganj
- Three flagship residential lines (President Park, Grand Residences, Olympus)
- Two flagship commercial towers (ICON 100, JCX Business Tower)
- Four brand values: Trust, Closeness, Uniqueness, Integrity
- Active joint-venture program for landowners
- Head office: JCX Business Tower, Plot 1136/A, Japan Street, Block I, Bashundhara R/A, Dhaka-1229
- Hotline: **16777** · WhatsApp: **+880 1324 437 947**
- Existing social: Facebook, LinkedIn, Instagram, YouTube (channel exists, few videos published)

**Existing site color anchor:** deep navy `#003C8C` — carries into the new design system as the primary brand color.

**Existing tagline slides on the site (retain, become hero scene cues):**
1. Discover — Perfection — In Every Detail
2. Iconic — Destination — for Business Excellence
3. Luxury — Elegance — You Deserve
4. Embrace the — Eco-Friendly — Abode
5. Modern — Architecture — Made Easy

---

## 3. Inspiration analysis

The six reference sites share DNA that we borrow selectively rather than clone:

- **Shanta Holdings** — black-luxury minimalism, cinematic loading, deep hero video. Take: the discipline of one visual per section.
- **Rupayan Housing Estate** — traditional developer information density. Take: nothing to borrow visually; a reminder of what NOT to do.
- **Sanmar Properties** — warm bronze palette, elegant transitions. Take: the warmth of a residential brand (not the color palette itself — JCX owns navy).
- **Fortress Group** — stone/cream minimalism, restrained typography. Take: the confidence to leave whitespace and let renders speak. Same agency as JCX (Dcastalia), so we deliberately move away from a matching aesthetic.
- **Tropical Homes** — image-forward hero, quiet layouts. Take: hero real estate matters more than any other section.
- **Akter Properties** — status-first project surfacing. Take: status filtering is a first-class navigation, not a footnote.

**Synthesis for JCX:** premium and restrained (Shanta), warm through content not color (Sanmar), image-forward hero (Tropical), status-first project surfacing (Akter), but rendered in JCX's own **navy + gold** identity so the site never resembles the group.

---

## 4. Design principles

Five principles govern every section-level decision. Any component or animation that violates one gets rebuilt.

1. **Restraint over noise.** Whitespace is a feature. Small type is confident. Gold is jewelry — never wall paint.
2. **Real over stock.** Every image is a JCX render or JCX photograph. Placeholder skyline illustrations, handshake stock photos, and clip-art icons are banned.
3. **Motion is meaning.** Nothing animates for decoration alone. Each animation reveals structure, expresses transition, or signals interactivity.
4. **One voice per section.** Every section has its own visual signature — the horizontal strip, the letter cutouts, the theatre stage. No two sections reuse the same layout pattern.
5. **Premium respects everyone.** All motion has a reduced-motion fallback. Every interactive element is keyboard-reachable. Contrast passes AA in both light and dark modes.

---

## 5. Brand identity & design system

### 5.1 Color

**Light mode**
| Token | Value | Use |
|---|---|---|
| Background | `#F7F6F3` | Warm off-white, not pure white |
| Surface | `#FFFFFF` | Cards and panels |
| Ink (primary text) | `#0E1726` | Headings, body |
| Muted (secondary text) | `#5B6472` | Captions, meta |
| Brand (JCX navy) | `#003C8C` | Primary CTAs, active states |
| Brand deep | `#012A63` | Hovers, gradients |
| Gold (accent) | `#C6A15B` | Dividers, active dots, eyebrow labels, awards |
| Line | `#E7E3DB` | Hairline borders |

**Dark mode**
| Token | Value | Use |
|---|---|---|
| Background | `#0A0F1A` | Near-black navy |
| Surface | `#111827` | Cards |
| Ink | `#F3F4F6` | Primary text |
| Muted | `#9AA3B2` | Secondary text |
| Brand (lifted) | `#3E7BD6` | Lightened navy so it reads on dark |
| Gold | `#D8B978` | Warmer gold to hold in dark |
| Line | `#1F2A3C` | Hairline borders |

Gold is the sparing accent. It appears as eyebrow labels, active-state indicators, and hairline dividers — never as large fills. Navy is the anchor; gold is the jewelry.

### 5.2 Typography

- **Display / headings** — an elegant serif (e.g., Cormorant Garamond, Fraunces). Large sizes, tight leading, slightly negative letter-spacing on large sizes. Mixes roman + italic in headline pairs (e.g., `Addresses that hold` / *`their value.`*).
- **Body / UI** — a neutral grotesque (e.g., Inter, Geist). Sizes: 16–18px body, 14px meta.
- **Eyebrow labels** — small caps, tracked-out (~0.14em), 11–13px, gold. Every section is introduced by one (e.g., `OUR PORTFOLIO`).
- **Type scale (desktop):**
  - Section headlines (H2): 40–56px
  - Sub-heads (H3): 24–28px
  - Body: 16–18px
  - Eyebrow: 11–13px

### 5.3 Motion language

Motion in this site follows five rules:

- **Slow and weighted.** Nothing bounces. Nothing wobbles. Easing curve is a soft outExpo (`[0.22, 1, 0.36, 1]`) across the site.
- **Purposeful.** Every animation communicates: a filter changed, a section arrived, a scene ended, a step advanced.
- **Layered.** Multiple elements animate on stagger, not in sync — content reveals feel choreographed, not scripted.
- **Continuous over instant.** Prefer scroll-driven and scrub-based motion over on/off toggles wherever the section supports it.
- **Reversible.** Scrolling back plays the sequence backward cleanly.

A **film grain overlay** and subtle **letter/pixel-level reveals** appear across multiple sections to unify the cinematic feel.

### 5.4 Spacing and layout

- Max content width ~1280px, with generous section padding (approx. `py-24` to `py-32`).
- 12-column responsive grid.
- Cards use `rounded-2xl` corners; light mode uses soft shadows, dark mode uses hairline borders.
- Sections are large — most take `min-h-[100svh]` on desktop. This is a scroll-heavy site by design.

### 5.5 Iconography

- Line-weight icons only (Lucide as the reference set). No filled solid icons.
- No decorative real-estate cliché icons (little house glyphs on spec rows, tag icons on prices). Typography and hairlines carry hierarchy.

### 5.6 Photography and imagery direction

- **Required:** real JCX renders and photographs. Interior renders, aerial exteriors, dusk/blue-hour exteriors, material details, amenity decks.
- **Banned:** illustrated skyline silhouettes, stock handshake photos, stock "puzzle piece" trust imagery, generic real-estate clip-art.
- **Preferred palette in imagery:** warm gold highlights and deep navy-blue shadows — grade all imagery to a shared LUT so the site feels like one film.

---

## 6. Global elements

### 6.1 Navigation

The homepage nav is deliberately minimal — the page IS the experience, and no visitor should be pulled away to secondary pages before the story lands.

**Primary bar (sticky, transparent over hero → solid on scroll):**
- Left: JCX logo (wordmark with monogram)
- Right: `Contact` pill CTA + theme toggle + hamburger

**Full menu overlay (on hamburger click):**
The full menu items from the current site — Home, About, Management Team, Properties, Concerns, Landowner, Buyer, Blogs, News & Events, Contact, CSR — live in a full-screen overlay with a background image montage. This satisfies the requirement that "menu items and contents will be as per the existing website" without cluttering the hero.

### 6.2 Theme toggle

- Sun/moon toggle in the primary nav.
- Default respects `prefers-color-scheme`.
- Choice persists across sessions.
- Every section, every image treatment, every map tile is verified in both modes.

### 6.3 Floating action group (bottom-right, fixed)

Stacked vertically, in this order top-to-bottom:
- **Scroll-to-top** — small navy circle, arrow up, appears after scrolling past hero
- **WhatsApp chat** — larger green FAB with the WhatsApp glyph. Gentle pulse animation on rest. On hover, a small chat bubble tooltip appears with the line: *"Hi! How can JCX help you today?"* Click opens `https://web.whatsapp.com/send?phone=+8801324437947&text=` in a new tab. On mobile, the same button uses the direct `wa.me` link.

### 6.4 Social icons

Placed in **two locations**:
- **Header utility strip** (thin bar above the primary nav, hidden on scroll): hotline `16777` as a tel-link, plus the four social glyphs.
- **Footer:** larger, more visible, in the Get-in-touch column.

Social links: Facebook (`facebook.com/JCXBD`), LinkedIn (`linkedin.com/company/jcx-developments-limited`), YouTube (`youtube.com/channel/UCTm39QNanD7ScTT_anGndAw`), Instagram (`instagram.com/jcxbd`). Gold hover state.

### 6.5 Custom cursors

Several sections scope a **custom cursor** inside their canvas — a small navy circle with a gold hairline ring and a label that changes contextually (`DRAG`, `VIEW`, `LISTEN`, `HOLD`, `▶ WATCH`, etc.). The native cursor is hidden within that scope only; global cursor remains standard for accessibility. Disabled on touch devices and under reduced-motion.

### 6.6 Film grain and ambient sound

- A very subtle animated film grain overlay unifies the cinematic sections (Featured Projects, Landowners, Testimonials).
- **Ambient sound is opt-in, never default.** A small speaker toggle in select sections enables state-matched audio (see per-section notes). Default is muted.

---

## 7. Sections — design requirements

The homepage is built as eleven ordered sections. Each has its own visual signature; together they read as one film.

### Section 1 — Hero (video)

**Purpose:** Set the tone in the first 3 seconds. Land the JCX brand promise cinematically.

**Layout:**
- Full-viewport (`100svh`) with a **background video** cinematic reel (~28 seconds, seamless loop).
- The video shows one continuous camera journey across five scenes: approach → ascend → descend → drift → pull-back.
- Dark gradient scrim from bottom-to-top for text legibility.

**Video content specification:**
Five connected shots grade-matched to a single navy-and-gold LUT:
1. Golden-hour approach — dolly push-in toward a residential tower entrance
2. Iconic ascent — low-angle crane rising along a commercial tower
3. Community descent — crane descending into a landscaped courtyard
4. Amenity drift — lateral track across a rooftop amenity deck
5. Landmark reveal — pull-back and rise at blue hour revealing the flagship tower

The video is **muted, autoplays, loops, and carries no burned-in text**. All taglines live as HTML overlays timed to scene changes.

Two exports required: **16:9 desktop (1920×1080)** and **9:16 mobile (1080×1920)**. Poster JPG for instant paint. Files kept under 8 MB.

**Taglines (overlay, sync to scene changes):**
1. Discover — Perfection — In Every Detail
2. Iconic — Destination — for Business Excellence
3. Luxury — Elegance — You Deserve
4. Embrace the — Eco-Friendly — Abode
5. Modern — Architecture — Made Easy

Each tagline **wipes in on the beat of its scene change** with a soft gold underline sweep.

**Motion behavior:**
- Slow **scroll-driven zoom-out** on the video as the user begins scrolling — the frame contracts by ~8% before the section releases.
- **Cursor-parallax** on the video — very subtle depth shift as the mouse moves.

**Search bar placement:** in the **upper third of the hero**, sitting over the video, not at the bottom. This is the first interactive touch on the page.

### Section 2 — Search bar

**Purpose:** Filter projects by Type, Status, and Location. The filter state is shared with the Projects section below; changes update both places live.

**Design:**
- **Frosted glass container** — translucent, backdrop-blurred, hairline gold-tinted border in dark mode, hairline ink-tinted in light mode. Rounded (~20px, not fully pill). Contained max-width ~980px. Deep soft shadow — it floats.
- **Three custom fields** separated by hairline gold dividers (60% height, floating dividers).
- Each field shows an eyebrow label in small caps + the current value in serif display. Custom chevron rotates 180° on open.
- **Search button** is a navy capsule with a **gold hairline inside the border** — that gold thread is the whole tell. Label + right-arrow (not a magnifier).

**Fields:**
- Project Type: All · Residential · Commercial · Condominium
- Status: All · Ongoing · Completed · Upcoming
- Location: All · Bashundhara R/A · Jalshiri Abashon · Niketan (Gulshan-1) · Narayanganj · Uttara

**Dropdown panels:** match the container's frosted style. Rows show option label + a **live gold count badge** (e.g., `Residential · 42`) that recalculates as other filters change. Selected rows show a gold check. Full keyboard support.

**Behavior:**
- Every field change instantly filters the **Projects section** below with a crossfade — no reload, no route change.
- The Search button **smooth-scrolls** to the Projects section with a gold pulse on arrival. It doesn't submit a form.
- If a combination has zero matches, the button label becomes `No matches — Adjust filters` in muted state.

**Mobile:** collapses to a single tappable summary that opens a **bottom-sheet modal** — same fields, stacked vertically, native pattern.

### Section 3 — About / Overview

**Purpose:** Convey what JCX stands for in a single memorable moment. Short copy, high visual impact.

**Concept:** The letters `J`, `C`, `X` are giant **cutout windows** onto looping JCX footage. A brand mark (navy disc with white monogram, gold ring) sits centered on the middle letter `C`. The wordmark IS the visual — the story is told through what's playing inside each letter.

**Letter content:**
- `J` — **The Craft.** Macro architectural detail, material push-in.
- `C` — **The Community.** Landscaped courtyard, residents in the greenery.
- `X` — **The Skyline.** Blue-hour aerial of a JCX tower.

**Copy card** floats beneath the wordmark:
- Eyebrow: `BEYOND BONDING`
- Headline (placeholder — client to confirm founding year): `Not every home carries 20 years of Japanese precision.`
- Body (two sentences maximum): `Since 2004, JCX has partnered with Japan's Creed Group to build residences and towers that honor detail, sustainability, and trust — across Dhaka's most sought-after addresses.`
- CTA: `Discover JCX →`

**Motion:**
- Letters slide in from separate directions and lock as the section enters viewport.
- Brand mark "clicks in" with a coin-drop settle and a single gold-ring pulse.
- Hovering any letter intensifies its video and dims the other two, and reveals its caption in gold small caps (`THE CRAFT` / `THE COMMUNITY` / `THE SKYLINE`).
- Ambient gold dust particles drift behind the wordmark (very sparse).
- Cursor magnetism: the brand mark gently follows the cursor within a small radius.

**Do not:** put a paragraph of body copy in this section; use a stat counter row (that lives elsewhere); use any stock imagery.

### Section 4 — Projects (by category and status)

**Purpose:** Surface the full JCX portfolio with fast, expressive filtering. This is where the hero search bar's changes land.

**Concept:** A **horizontally-scrolling cinematic strip** of oversized project posters. Vertical scroll on the page drives horizontal translation of the strip (scroll-hijack). Reads as a walk through the portfolio, not a grid.

**Top command bar (sticky through the section):**
- Left: eyebrow `OUR PORTFOLIO — 60+ PROJECTS`, editorial headline (`Addresses that hold` / *`their value.`*), one line of body.
- Right: category toggle (`All / Residential / Commercial`) with a spring-glide highlight, status filter row (`All · Ongoing · Completed · Upcoming`) with a morphing gold underline, and a **live odometer count** (`24 projects`).

**Poster cards:**
- Cinema-scale (~580×720px on desktop), not thumbnails.
- **Mosaic rhythm:** every 3rd or 4th card breaks the mold as a wide featured card (~1180px) or paired half-height cards. Vertical offset ~40px between adjacent cards creates a wave, not a bar.
- Card composition (bottom to top): full-bleed render, navy scrim, gold serial number top-left (`01.`), custom animated status glyph top-right (not a pill), location badge, project name in serif (32–40px), spec row with hairline dividers, hover-cover panel with extended details.

**Card status glyphs:**
- Ongoing → pulsing gold dot + hairline ring + `ONGOING` small caps
- Completed → static gold check + `COMPLETED`
- Upcoming → dashed gold ring + `UPCOMING`

**Card motion:**
- Base image parallax on horizontal scroll (different cards drift at slightly different rates).
- Cursor-tilt (3D perspective) on hover with a gold glare highlight following the cursor.
- Zoom-on-hover with `object-position` micro-parallax.
- Cover panel rises from bottom on hover with staggered content fade-in.

**Filter interaction:**
- Odometer count digits roll to the new total (400ms).
- Filter underline morphs to its new position.
- Cards **choreograph** — survivors reposition with spring physics, exiting cards slide up with rotation (like being pulled from a deck), incoming cards fade in from below.

**Scoped custom cursor:** navy circle with gold ring, label morphs `DRAG` → `VIEW` → `EXPLORE`.

**Bottom strip:** thin gold horizontal progress bar showing strip position, `View all 60+ projects →` CTA.

**Tablet:** scroll-hijack disabled; native horizontal scroll takes over.
**Mobile:** snap-scrollable strip, one card per viewport, cursor effects removed, filter controls stack.

### Section 5 — Featured Projects

**Purpose:** Deep-dive into flagship projects with the depth that a strip card can't carry.

**Concept:** **Four acts, one address.** Each featured project uses **four images as four acts** — Approach, Facade, Interior, Detail — that transition automatically with cinematic wipes and synced spec overlays. It reads as a 20-second film per project.

**Layout:**
- Top: eyebrow `FEATURED PROJECTS`, small title `Four acts. One address.`, and vertical **project markers** on the top-right (thin gold bars, one per project, with hover-preview thumbnails).
- Center: full-bleed **image canvas** with cinematic transitions.
- Overlay group: bottom-left act label, headline, and morphing spec chips.
- Right column: persistent project data (name, location, land size, floor count) that stays through all four acts.
- Bottom: **act rail** — four scrubbable horizontal bars, one per act, each filling gold as its act plays (5 seconds).

**The four acts** (constant labels, per-project content):
- Act 1 · **THE ARRIVAL** — wide/aerial approach shot, land-size chips
- Act 2 · **THE ARCHITECTURE** — facade shot, orientation and structure chips
- Act 3 · **THE LIVING** — interior render, unit-size and parking chips
- Act 4 · **THE DETAIL** — material/amenity close-up, collaboration and consultant chips

**Motion between acts:** directional gold wipe (~24px light bar sweeping left-to-right) reveals the next act. Overlay text lifts and dissolves, next act's label types in character-by-character, headline rises with blur-to-focus, spec chips slide in staggered from the left.

**Motion between projects:** **cinema-bar wipe** — two horizontal bars close in from top and bottom to a slit, then reopen with the next project's Act 1 image loaded. Signals a "reel change."

**Interactivity:**
- Scroll-hijack: section pins while playing. Once all featured projects have played through once, pinning releases.
- Scoped custom cursor labels: `HOLD` on canvas, `← PREV` / `NEXT →` on left/right halves, `EXPLORE` on CTA.
- Hover pauses autoplay; canvas gains cursor-tracked parallax and a subtle gold vignette from the cursor position.
- Keyboard: `←/→` acts, `↑/↓` projects, `Space` pause, `1–4` jump to act, `Enter` open project detail.
- Optional opt-in ambient audio that crossfades between projects.

**Seed projects (5 flagships):** JCX President Park, JCX Grand Residences, JCX Olympus, ICON 100, JCX Lakewood Residences.

### Section 6 — Landowners

**Purpose:** Convert landowners into JV partners. The audience is deciding whether to hand over an asset worth crores — trust has to be visualized, not claimed.

**Concept:** **A pinned-scroll cinematic** where an empty plot of Bashundhara land visibly transforms into a finished JCX tower as the visitor scrolls, with the JV process narrated in five scroll-driven states. The visual IS the pitch.

**Five scroll states:**
- **State 0 · The Plot (0–15% scroll)** — empty land, boundary stones, a lone tree, distant rickshaw. Overlay: eyebrow `FOR LANDOWNERS`, headline `Your land.` / *`Our craft.`* / `Together, a landmark.` Stat block: `40+ landowners partnered · 200+ katha delivered · Since 2013` (placeholder — client to confirm).
- **State 1 · The Survey (15–30%)** — gold measurement lines and dimension arrows fade in over the plot. Copy: `STEP 01 · CONSULT` / `We survey. You watch.` Trust line: `Typical turnaround: 14 days.`
- **State 2 · The Agreement (30–50%)** — a document panel slides in showing key JV terms (Landowner Share, Timeline, Quality Standard) with gold check marks. Abstract two-lines-meeting graphic (a signature motif) replaces stock handshake imagery. Copy: `STEP 02 · AGREE` / `Terms, in writing. No fine print.` Trust line: standard JV share range.
- **State 3 · The Build (50–75%)** — the plot transforms in real time as the user scrolls: survey lines snap to foundation, foundation extrudes into rebar, floors stack accelerating, facade sweeps up, windows light up. Stage markers activate along the tower: `PILING → FRAME → SLAB → FACADE → FINISH`. Copy: `STEP 03 · BUILD` / `We build. You watch that too.` Trust line: on-time delivery percentage.
- **State 4 · The Landmark (75–90%)** — completed tower at blue hour, warm windows glowing, the small tree from State 0 preserved at the base. Copy: `STEP 04 · A LANDMARK` / `Your name, on a Dhaka address.` Detail: `Every JCX project carries a landowner signature plate at the entrance.`
- **State 5 · The Voice (90–100%)** — tower recedes; a **landowner testimonial video card** rises center stage with two floating quote fragments and final CTAs.

**Final CTAs:**
- Primary: `Start your joint venture →` (navy capsule with gold hairline)
- Secondary: `Talk to us · 16777` (ghost button with phone icon)

**Build path:** ship first with a **layered SVG + motion timeline** so the section works without waiting on rendering. Swap in an **architectural visualization video** (scrubbed by scroll) when the client provides it. Same scrub API for both.

**Ambient details:** dust particles during the Build stage; opt-in state-matched audio (birdsong → sketching → construction → city ambience); background gradient warms as the tower reaches completion; film grain overlay.

**Interactivity:**
- Vertical progress rail on the right edge with 4 step dots; click to jump.
- Scoped custom cursor: `↓ SCROLL TO BUILD`; on the video card, `▶ PLAY`.
- Hover on the growing tower reveals floating construction annotations.

**Tablet:** pin retained; info panels drop below the visual.
**Mobile:** pin abandoned; states become stacked vertical panels.

### Section 7 — Custom Map

**Purpose:** Show JCX's geographic footprint at a glance. Enable exploration by area.

**Concept:** An **interactive map of Dhaka** with custom gold JCX pins for every project. Clustered by area. The map itself is styled to sit with the brand — muted positron-style tiles in light mode, dark tiles in dark mode. Nothing about it should feel like a raw open-source map.

**Layout:**
- Eyebrow: `FIND US ON THE MAP`
- Headline: `Explore JCX across Dhaka.`
- Left column (~30%): **area list** with project counts per area (Bashundhara R/A · 42, Jalshiri Abashon · 8, Niketan · 5, Narayanganj · 3, Uttara · 2). Clicking any area smoothly pans and zooms the map to that cluster; hovered area gets a gold hairline.
- Right column (~70%): the **map canvas**, centered on Bashundhara R/A by default.

**Pins:**
- Custom SVG gold pin markers with the JCX monogram inside a small navy disc.
- Ongoing projects get a **subtle pulse animation**; completed pins are static; upcoming pins have a dashed ring.
- Clustered when zoomed out (numbered gold circles); pins separate as user zooms in.

**Pin popups:**
- On click, opens a floating card: cover image (from `featuredImages.approach` if available), project name in serif, location badge, animated status glyph, key spec line, and an `Explore →` link.
- Popup card floats above the pin with a small pointer tail, styled as a frosted-glass panel matching the search bar's language.

**Performance:**
- **Lazy-loaded.** Before the map enters the viewport, a poster image with a `Load map` prompt is shown. The map mounts on click or on scroll-into-view.
- Once loaded, the section behaves smoothly even on lower-end devices.

**Filter integration:**
- The map respects the global filter state — if a Type/Status filter is set elsewhere, pins outside the filter fade to 30% opacity (not hidden, so context remains).
- The area list also shows counts filtered by current selection.

**Interactivity:**
- Scroll wheel zoom disabled by default (prevents accidental zoom on page scroll); enabled on click-inside gesture, with a small hint on hover: `Click to interact`.
- Keyboard-accessible: tab to focus map, arrow keys pan, `+`/`-` zoom.

**Mobile:** map takes full-viewport width, area list becomes a horizontal chip strip above the map.

### Section 8 — Testimonials (video + text)

**Purpose:** Prove the JCX experience through the people who lived it. Segmented by audience — homeowners and landowners — so visitors can hear voices like their own.

**Concept:** **One voice on stage, the wall listening.** A single testimonial takes center stage — video or portrait + editorial pull-quote — while other voices float as an ambient wall around it. Autoplay rotates the stage every 8 seconds; clicking any wall card promotes it to the stage instantly.

**Layout:**
- Top: eyebrow `TESTIMONIALS`, headline `Beyond Bonding —` / *`in their words.`*, and an **audience toggle** on the right: `All voices` · `Homeowners` · `Landowners` with a gliding highlight and live counts on hover.
- Center (Zone A — the stage): **portrait video or photo** at ~520px wide (3:4 aspect), soft gold hairline border, subtle Ken Burns drift. Beside it, a **massive editorial pull-quote** (40–56px italic serif). Below: name, role, project (`— homeowner at JCX Grand Residences`). For video: `▶ Watch full testimonial` opens a modal player.
- Around the stage (Zone B — the wall): 8–12 smaller floating testimonial cards at varying depths and opacities, drifting slowly, hoverable to preview, clickable to promote.
- Bottom: **odometer trust counter** (`24 stories · 7 videos · 3 languages`), **progress dots** (one per testimonial), pause/play toggle, `Read all testimonials →`.

**Trust context on every testimonial:**
- Full name (never initials unless requested)
- Role: `Homeowner · JCX Grand Residences (2024)` or `Landowner · Bashundhara R/A · Delivered 2023`
- Optional verified glyph (only if JCX can genuinely verify)
- For landowners: a micro-line — `12 katha · Bashundhara R/A · Handed over 2023`

**Transition between testimonials (~700ms):**
1. Stage portrait exits with a radial mask-out from center.
2. Quote lifts up 20px, blurs, letter-spacing widens (dispersal feel).
3. Wall reshuffles — exiting card flies into a wall slot, incoming card flies from wall to stage (motion `layoutId` swap).
4. Incoming portrait enters through radial mask-in; Ken Burns starts.
5. Quote reveals word-by-word with a blur → focus stagger.

**Ambient details:** background subtly cools during landowner testimonials, warms during homeowner ones; film grain; opt-in warm-room ambient hum.

**Scoped custom cursor:** `LISTEN` on general area, `▶ WATCH` on stage video, `∥ PAUSE` on controls, `SWITCH` on audience toggle.

**Modal:** full-screen Dialog with the full quote, structured metadata, and a `More from this project →` link that filters the Projects section.

**Seed content (from jcxbd.com):**
- Homeowners: Imran Mahmudul, Yang Huan Huan, Morshed Hossain, Mehazabien Chowdhury, Mohshin Ahmed, Dina Akhter
- Landowners: Nakib Khan (currently the only landowner testimonial)
- Videos: none currently exist on the live site — flagged for client

**Mobile:** wall collapses to a horizontal snap-scroll strip of small avatar chips below the stage; autoplay speeds up to 5s.

### Section 9 — Awards & Recognition

**Purpose:** Establish credibility through third-party validation. Restrained, elegant, not busy.

**Concept:** A **quiet gallery row** of award emblems on a subtle band. No slider, no auto-rotation — just presence.

**Layout:**
- Eyebrow: `AWARDS & RECOGNITION`
- Headline: `Your trust is our greatest award.`
- A **horizontal row** of 3–6 award marks (emblems, certificates, or logo lockups) on a subtle background band, each in a gold-hairline frame.
- Below each mark: a compact caption — award name, awarding body, year.

**Motion:**
- On scroll-into-view, marks reveal with a **soft shine sweep** (a diagonal light glint moves across each emblem, staggered ~150ms between marks).
- On hover, the emblem **lifts** ~4px, its shine sweep replays, and the caption expands to include a longer citation line.

**Do not:** use a slider or carousel here; use gaudy trophy icons; overcrowd — six is the maximum. If JCX has more than six credible awards, cycle a curated set and add a `View all recognitions →` link.

**Seed content:** the existing three award images on the current site (from `wp-content/uploads/2023/09/Award-*.webp`) are the starting set; the client to supply full names, awarding body, and year for each.

**Mobile:** row becomes a horizontal snap-scroll; captions truncate to the essential line.

### Section 10 — Footer

**Purpose:** Wayfinding, contact, credibility, and closure.

**Layout:** rich multi-column footer, navy in light mode / near-black in dark mode.

**Column 1 — Brand block:**
- Large JCX wordmark (secondary logo lockup — could be a compact monogram card here)
- Positioning line: `Beyond Bonding. Since 2004.` (year to confirm with client)
- Full address:
  *JCX Business Tower*
  *Plot 1136/A, Japan Street, Block I*
  *Bashundhara R/A, Dhaka-1229, Bangladesh.*

**Column 2 — Explore:**
Home, About, Management Team, Properties, Concerns.

**Column 3 — More:**
Landowner, Buyer, Blogs, News & Events, Contact, CSR, Career, Construction Status, Video, Privacy Policy.

**Column 4 — Get in touch:**
- Hotline: **16777** (tel-link, large and prominent)
- WhatsApp: `+880 1324 437 947` (opens chat)
- Email: (placeholder — client to supply canonical email)
- Newsletter signup: single-line email input + `Subscribe →` button, gold hairline
- Social icon row: Facebook, LinkedIn, YouTube, Instagram

**Bottom bar:**
- Left: `© 2026 JCX Developments Ltd. — All rights reserved.`
- Right: `Site by Dcastalia` (if agency credit is desired)
- Center or right: small links — Privacy Policy · Terms · Sitemap

**Motion:**
- Footer reveals with a gentle upward drift as the user reaches the end of the page.
- The JCX wordmark in the brand block has a very slow Ken Burns-like drift, or a subtle looped monogram animation, so the footer isn't visually dead.
- Newsletter input has a **gold underline sweep** on focus and a success confetti-free confirmation (small gold check + `Thanks — you're on the list.`).

**Mobile:** columns stack; social row centers; hotline and WhatsApp stay large and prominent (these are the mobile actions).

### Section 11 — Global overlays (WhatsApp + Scroll-to-top + Menu)

Handled in **Section 6.3 (floating action group)** and **Section 6.1 (navigation)** above. Called out as its own numbered section here because it appears in the original brief, but the actual implementation is global.

**WhatsApp FAB:** stationary bottom-right, green circle, gentle pulse. On hover (desktop) or after 8 seconds of idle (mobile), a small chat bubble tooltip appears: *"Hi! How can JCX help you today?"* Tapping opens the WhatsApp chat.

**Menu overlay:** triggered from the primary nav's hamburger. Full-screen overlay with a background image montage and the complete menu list. Closes with the same button or ESC. Locks body scroll when open.

### Section 12 — Light and dark mode

Handled as a design system requirement across every section (see Section 5.1). Called out here for the brief.

**Behavior:**
- Toggle placed in the primary nav (sun/moon glyph).
- Default respects `prefers-color-scheme`.
- Choice persists across sessions and applies before first paint (no flash of wrong theme).
- Every section, every image treatment, every embedded map is verified in both modes.
- Some sections' background tones **respond to content state** (e.g., Testimonials warms for homeowners, cools for landowners; Landowners warms toward the completion state). Those responses respect the base theme — the tint sits on top of the light or dark base, not instead of it.

---

## 8. Content and copy inventory

### 8.1 Copy already locked (JCX-owned language)

- Tagline: **Beyond Bonding**
- Hero rotating headlines: five taglines listed in Section 1
- About body: adapted from the current site's "Our Ascendance" paragraph — trimmed to two sentences per the redesign
- Landowner promise language: adapted from the current site's landowner page
- Testimonials: seven text quotes from the current site (five homeowners, one landowner, one team member); to be curated and cherry-picked to one pull-quote line each

### 8.2 Copy created for the redesign (placeholders — client to review)

**About section:**
- Headline: `Not every home carries 20 years of Japanese precision.` (year is placeholder — client to confirm founding)
- Micro-eyebrow: `BEYOND BONDING`
- Alternative headline directions:
  - Craft-led: *"Every square foot, built like it's ours."*
  - Legacy-led: *"Two nations. One standard of building."*
  - Poetic: *"Where Bangladeshi soul meets Japanese detail."*

**Projects section:**
- Eyebrow: `OUR PORTFOLIO — 60+ PROJECTS`
- Headline: `Addresses that hold` / *`their value.`*
- Body: `Residential and commercial developments across Dhaka's most sought-after neighborhoods.`

**Featured Projects section:**
- Small title: `Four acts. One address.`
- Act labels (constant): `THE ARRIVAL` · `THE ARCHITECTURE` · `THE LIVING` · `THE DETAIL`

**Landowners section:**
- Headline: `Your land.` / *`Our craft.`* / `Together, a landmark.`
- Step labels: `STEP 01 · CONSULT` · `STEP 02 · AGREE` · `STEP 03 · BUILD` · `STEP 04 · A LANDMARK`
- Step headlines:
  - `We survey. You watch.`
  - `Terms, in writing. No fine print.`
  - `We build. You watch that too.`
  - `Your name, on a Dhaka address.`
- Signature detail: `Every JCX project carries a landowner signature plate at the entrance.`

**Custom Map section:**
- Eyebrow: `FIND US ON THE MAP`
- Headline: `Explore JCX across Dhaka.`

**Testimonials section:**
- Headline: `Beyond Bonding —` / *`in their words.`*
- Audience toggle: `All voices` · `Homeowners` · `Landowners`

**Awards section:**
- Eyebrow: `AWARDS & RECOGNITION`
- Headline: `Your trust is our greatest award.`

**Footer:**
- Positioning line: `Beyond Bonding. Since 2004.` (year to confirm)
- Copyright: `© 2026 JCX Developments Ltd. — All rights reserved.`

### 8.3 Copy language

- **Voice:** confident, elegant, understated. Never salesy-loud.
- **Sentence rhythm:** short, weighted, unafraid of full stops.
- **Numbers:** specific numbers earn trust; round numbers feel invented. Prefer `92%` to `over 90%`.
- **Avoid:** exclamation marks; the words `luxurious`, `state-of-the-art`, `world-class`, `unparalleled`, and other real-estate cliché phrases already scrubbed from the current site.

---

## 9. Client handoff checklist — what JCX must supply

For the site to hit its intended quality bar, the following assets and confirmations are required from the client. Items are grouped by urgency.

### 9.1 Critical (blocks first ship)

- **Hero video source imagery:** 3–4 high-quality photos or renders per scene (five scenes total), minimum 1920×1080, no baked-in text or watermarks. Categories:
  - Scene 1: macro / detail shots (facade textures, materials, brass fixtures, lobby details)
  - Scene 2: commercial tower exteriors (ICON 100, JCX Business Tower — dusk if available)
  - Scene 3: green/community renders (landscaped courtyards, family/lifestyle)
  - Scene 4: amenity/rooftop imagery (pools, decks, landscaped terraces)
  - Scene 5: aerial or elevated exteriors of flagship residential towers at blue hour
- **Real project renders** to replace all illustrated skyline placeholders. Every project card, poster, popup, and act must use an actual JCX render.
- **Four images per featured project**, standardized to Approach / Facade / Interior / Detail. Featured projects: JCX President Park, JCX Grand Residences, JCX Olympus, ICON 100, JCX Lakewood Residences.
- **Project statuses** (Ongoing / Completed / Upcoming) confirmed for every project in the portfolio.
- **Approximate coordinates** for every project (or at minimum, area cluster centers) for the Custom Map.
- **Logo files:** SVG + transparent PNG, light and dark variants, primary wordmark and secondary monogram.
- **Founding year** for the JCX–Creed Group joint venture (drives the About section's specificity claim).

### 9.2 High priority (blocks polish)

- **Real portrait photos** of every testimonial subject, higher resolution than the current site's compressed thumbnails.
- **At least three video testimonials** — ideally one landowner + two homeowners, 60–90 seconds each, portrait framing, with subtitles in English and (ideally) Bangla.
- **Project attribution** for every testimonial — which JCX project each person lives in or partnered on.
- **Handover year** for each landowner testimonial (`Handed over 2023`).
- **Cherry-picked pull-quote** — one killer line per testimonial. The current site's paragraphs are too long for the stage treatment.
- **Trust numbers for landowners:** actual katha delivered, actual landowner count, typical JV share range, on-time delivery percentage. Every unconfirmed number is a placeholder marked in the code.
- **Award details:** name, awarding body, year, and citation for each award emblem.
- **Award emblems in higher resolution** if the current site's images are compressed.
- **Canonical email address** for the footer.

### 9.3 Nice-to-have (upgrades over time)

- **Architectural visualization video** of a plot-to-tower transformation for the Landowners section (replaces the in-browser SVG animation). ~15 seconds, isometric or 3/4 perspective, unbranded.
- **Existing b-roll or drone footage** that JCX already owns — real footage intercut with generated video always looks better.
- **Ambient audio tracks** for the optional opt-in sound layers (Landowners state audio, Testimonials warm-room hum, Featured Projects atmospheric bed).
- **Bangla-language versions** of all copy, for a future language toggle.
- **Additional landowner testimonials** (video or text) — currently only one on the site.

---

## 10. Accessibility

Non-negotiable requirements:

- **AA color contrast** in both light and dark modes on every text-over-media element. Radial vignettes are added behind copy where legibility over hero video ever drops.
- **Keyboard reachability** for every interactive element. Custom cursors do not replace focus rings — focus rings are always visible, gold, with 6px offset.
- **ARIA correctness:** custom comboboxes carry `role="combobox"`, segmented toggles are `role="radiogroup"`, dialogs use Radix or equivalent primitives.
- **Screen-reader labels:** portrait photos have descriptive alt text (`Portrait of Yang Huan Huan, homeowner at JCX Grand Residences`); icon-only buttons have `aria-label`s.
- **`prefers-reduced-motion` respected across every section.** Under reduced motion:
  - Hero video swaps to a poster image; scenes cross-fade in place if visible at all.
  - Scroll-hijack sections release to standard vertical layouts.
  - Cursor customization is disabled.
  - Wall drifts, Ken Burns, letter-by-letter reveals, dust particles all disabled.
  - Sections stay complete and legible — just quiet.
- **Captions on all videos** — burned or SRT — including hero video's implied narrative (which currently carries no dialogue, so N/A for hero specifically).
- **Language markers** on Bangla content so screen readers pronounce correctly.

---

## 11. Responsive strategy

Three breakpoints govern the site:

- **Desktop (≥1280px):** full experience as designed. Every scroll-hijack, every custom cursor, every layered animation.
- **Tablet (768–1279px):** scroll-hijack sections release to native scroll where possible; layouts consolidate to fewer columns; custom cursors disabled; core motion retained.
- **Mobile (<768px):** cinematic ambition retained but delivered through different mechanics. Horizontal-scroll strips become snap-scroll one-per-viewport. Pinned sections abandon the pin. Ambient walls collapse to horizontal chip strips. Bottom-sheet modals replace desktop popovers.

**Mobile is not a compressed desktop.** Every section has an intentionally mobile-first version — designed, not just responsive.

---

## 12. Performance targets

- **Largest Contentful Paint** under 2.5s on a 4G connection. Hero poster image loads instantly; video streams behind it.
- **All below-fold media lazy-loads.** The map, ambient videos, and testimonial video previews mount on `IntersectionObserver` triggers.
- **Total blocking time** under 300ms.
- **Hero video** compressed to ≤ 8 MB (desktop) and ≤ 4 MB (mobile). H.264 MP4 + WebM fallback. Poster JPG for instant paint.
- **Route to `/projects/[slug]` and `/landowner`** exists as stubs for the homepage's outbound CTAs — actual pages built in a subsequent phase.

---

## 13. Success criteria

The site ships successfully when:

1. **A visitor scrolls to the end.** Every section has been designed to give a reason to keep scrolling. Bounce at hero is the failure mode we're designing against.
2. **The visitor can name three things about JCX** within 30 seconds — the Japanese collaboration, the flagship projects, and either the landowner offer or the "Beyond Bonding" positioning.
3. **A landowner-type visitor engages the Landowners section.** Measured by scroll depth into the pinned sequence and clicks on the final CTAs.
4. **A homeowner-type visitor engages the Featured Projects section.** Measured by clicks through to project detail pages.
5. **The site is indistinguishable from a Bangladeshi developer site in one dimension only** — the language of the content. In every other dimension (visual identity, motion, interactivity, copywriting), it stands apart.
6. **Every accessibility requirement in Section 10 passes automated and manual testing.**
7. **The client can confidently show it to a Japanese business partner** — the design carries the collaboration credibly.

---

## 14. Section-level design prompts

The detailed design prompts for each section — motion timings, exact copy, per-component behavior, do/don't lists — live in separate documents, one per section:

1. `JCX-Homepage-Design-Prompt.md` — original homepage brief and design system
2. `JCX-Search-Bar-Redesign-Prompt.md` — Section 2
3. `JCX-About-Section-Prompt.md` — Section 3
4. `JCX-Projects-Section-Redesign-Prompt.md` — Section 4
5. `JCX-Featured-Projects-Redesign-Prompt.md` — Section 5
6. `JCX-Landowners-Section-Redesign-Prompt.md` — Section 6
7. `JCX-Testimonials-Section-Redesign-Prompt.md` — Section 8

Custom Map, Awards, Footer, Global overlays, and Light/Dark mode are covered in this PRD.

---

## 15. Appendix — inspiration reference table

| Site | What we take | What we don't |
|---|---|---|
| Shanta Holdings | Loading discipline, single-visual-per-section restraint | Black-luxury palette (JCX owns navy) |
| Rupayan Housing Estate | (nothing) | Information density, traditional layouts |
| Sanmar Properties | Warmth expressed through content | Bronze palette, page routing |
| Fortress Group | Whitespace confidence, letting renders speak | Stone/cream aesthetic (agency overlap) |
| Tropical Homes | Image-forward hero | Slower motion pacing |
| Akter Properties | Status-first project surfacing | Card grid template |

---

*End of document.*
