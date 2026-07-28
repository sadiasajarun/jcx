# JCX Developments Ltd. Homepage — PRD (2026-07-27)

> **Track:** PM (`/fullstack-pm`) · **Phase:** P2-prd · **Deliverable of this engagement:** an approved static HTML prototype (P3). Production implementation is a later, separately-scoped phase.
>
> **Source of truth:** `.claude-project/status/jcx/seed-jcx-homepage-a1f3c7.yaml` (P1 seed, ambiguity 0.146) and the client's design PRD v1.0 at `.claude-project/context/PRD_FULL_CONTENT.md`.

---

# Part 1: Basic Information

## Title

JCX Developments Ltd. — Homepage

## Terminology

| Term | Definition |
|------|------------|
| **Project** | A single JCX development. The portfolio's atomic unit. Carries slug, name, category, status, location, address, apartmentSize, units, parking, floors, orientation, landSize, lat, lng, image, featured. Approximately 60 exist in the real portfolio; 12 are seeded into the prototype. |
| **Category** | A Project's type. Closed set: `residential`, `commercial`. The PRD's search filter also exposes `Condominium`; no seeded Project carries it — see Open Questions Q3. |
| **Status** | A Project's construction state. Closed set: `ongoing`, `completed`, `upcoming`. Drives the animated status glyph and the status filter. |
| **Area** | A Dhaka neighbourhood grouping Projects for the search filter and the map. Closed set of five: Bashundhara R/A, Jalshiri Abashon, Niketan (Gulshan-1), Narayanganj, Uttara. Each carries a cluster-centre coordinate. |
| **Act** | One of four scenes a featured Project plays through in Section 5. Keyed `approach`, `facade`, `interior`, `detail`. Each Act carries an image, a per-project headline, and two to three spec chips. |
| **Act label** | The constant caption for an Act, identical across all Projects: `THE ARRIVAL`, `THE ARCHITECTURE`, `THE LIVING`, `THE DETAIL`. |
| **Featured Project** | A Project with `featured: true`. Renders as a wide poster in Section 4 and as a four-Act sequence in Section 5. Five exist: JCX President Park, JCX Grand Residences, JCX Olympus, ICON 100, JCX Lakewood Residences. |
| **Testimonial** | A recorded voice. Carries id, name, audience, medium, portrait, pullQuote, fullQuote, project, role, date, landownerDetail, verified, language. |
| **Audience** | A Testimonial's segment. Closed set: `homeowner`, `landowner`. Drives the audience toggle and the section's background tint. |
| **Pull quote** | The single cherry-picked line from a Testimonial displayed on the stage. Distinct from `fullQuote`, which appears only in the modal. |
| **Stage** | The centre zone of Section 8 holding the one active Testimonial. |
| **Wall** | The ambient scatter of non-active Testimonials surrounding the Stage in Section 8. |
| **Award** | A third-party recognition rendered in Section 9. Carries image, name, awarding body, year, citation. Maximum six displayed. |
| **Theme** | `light` or `dark`. A first-class product requirement, not a styling detail: every section, image treatment and map tile carries a defined appearance in each. |
| **Filter state** | The shared `{type, status, location}` selection written by the hero Search bar and the Projects command bar, and read by the Projects strip and the Map. One value, two views. |
| **Section** | One of eleven ordered page regions. Each carries a distinct visual signature, an eyebrow label, its own motion vocabulary, and defined reduced-motion and mobile fallbacks. |
| **Eyebrow** | The small-caps, letter-spaced accent label introducing every Section. |
| **JV** | Joint Venture. JCX's landowner partnership model, the subject of Section 6. |
| **Katha** | Bangladeshi land-area unit used throughout landowner-facing copy. |
| **Creed Group** | JCX's Japanese joint-venture partner. The basis of the "Japanese precision" positioning. |
| **Beyond Bonding** | JCX's locked tagline. |
| **Reel change** | The cinema-bar wipe transition between Featured Projects in Section 5. |
| **Scroll-hijack** | Binding vertical scroll to a non-vertical transform. Used in Sections 4 and 6. |

## Project Information

### Description

A single-page, cinematic, highly interactive homepage for JCX Developments Ltd., a premium Dhaka real-estate developer operating a Japanese joint venture with Creed Group. The page presents JCX's portfolio, its landowner JV programme, and its client voices across eleven sections, each carrying a distinct visual signature, unified by one design system and one motion language. The page ships in both light and dark mode.

### Goals

1. Produce a static HTML prototype that JCX signs off in writing as the definitive visual and motion specification for a later production build.
2. Present all eleven sections at full motion fidelity, in both themes, verified on desktop.
3. Communicate three facts within thirty seconds of arrival: the Japanese collaboration, the flagship projects, and the landowner JV offer.
4. Differentiate JCX from every other Bangladeshi developer site on visual identity, motion and interactivity — matching them only on content language.

### Visitor Types

This is an unauthenticated marketing page. There is no login, no signup, no session and no user account. "Visitor types" are audience segments the page addresses, not permission roles.

- **Prospective homeowner** — Evaluating apartments to buy. Primary targets: the Search bar, the Projects strip, Featured Projects, homeowner Testimonials, the Map.
- **Landowner** — Evaluating whether to commit land to a JCX joint venture. Primary targets: Section 6 end to end, landowner Testimonials, the hotline and WhatsApp actions.
- **General visitor / business partner** — Press, prospective employees, and Japanese business partners assessing credibility. Primary targets: About, Awards, Footer.

### Visitor Relationships

Independent. No visitor type has a relationship to, or visibility of, another. No data is shared between visitors. Segmentation is presentational only: the audience toggle in Section 8 filters which Testimonials display, and the filter state in Sections 2, 4 and 7 is per-browser-session and never persisted server-side.

### Project Type

- **Prototype deliverable (this engagement):** Static HTML + CSS + JavaScript, no build step. See Tech Stack.
- **Production build (later engagement):** Web application on the declared stack. See Tech Stack.

## System Modules (Step-by-step Flows)

### Module 1 — Portfolio filtering

1. Visitor selects a Project Type, Status or Area in the hero Search bar.
2. The shared filter state updates.
3. The Projects strip re-choreographs: surviving Projects reposition with spring physics, exiting Projects slide up and rotate out, entering Projects rise from below.
4. The odometer count rolls to the new total.
5. The Map dims pins outside the filter to 30 percent opacity and retains them for context.
6. Visitor activates the Search button.
7. The page smooth-scrolls to the Projects section.

### Module 2 — Portfolio browsing

1. Visitor scrolls vertically within the Projects section.
2. Vertical scroll drives horizontal translation of the poster strip.
3. Visitor hovers a poster.
4. The poster tilts toward the cursor, a glare highlight tracks the cursor, and the base image zooms.
5. After 200 milliseconds of hover, a cover panel rises over the poster carrying extended detail and an Explore action.
6. Visitor activates Explore.
7. The page navigates to the Project's detail route.

### Module 3 — Featured Project viewing

1. The section auto-plays Act 1 of the first Featured Project for five seconds under a Ken Burns move.
2. The act rail fills left to right for the duration of the Act.
3. At five seconds, a directional wipe reveals the next Act; the act label types in character by character, the headline rises with a blur-to-focus, and the spec chips slide in staggered.
4. Steps 1 to 3 repeat for Acts 2, 3 and 4.
5. After Act 4, the reel-change cinema-bar wipe closes to a slit and reopens on the next Featured Project's Act 1.
6. Visitor hovers the canvas at any point; autoplay pauses and resumes 800 milliseconds after the cursor leaves.

### Module 4 — Landowner conversion

1. Visitor scrolls into Section 6; the section pins.
2. Scroll position drives five states: The Plot, The Survey, The Agreement, The Build, The Landmark.
3. In The Build state, scroll drives the tower's construction: survey lines snap to foundation, foundation extrudes to rebar, floors stack, facade sweeps up, windows light.
4. A sixth state raises a landowner testimonial card carrying the final calls to action.
5. Visitor activates "Start your joint venture" or "Talk to us · 16777".
6. The pin releases and the page continues.

### Module 5 — Geographic exploration

1. Visitor scrolls the Map section into view, or activates the "Load map" cover.
2. The map mounts.
3. Visitor selects an Area from the side list.
4. The map pans and zooms to that Area's cluster.
5. Visitor activates a pin.
6. A frosted popup card opens carrying cover image, name, location, status glyph and an Explore action.

### Module 6 — Trust evaluation

1. The Stage displays one Testimonial; autoplay advances every eight seconds.
2. Visitor selects an audience segment.
3. The Stage resets to the first Testimonial in that segment; counts update.
4. Visitor activates a Wall card.
5. The active Testimonial flies to a Wall slot and the selected card flies to the Stage.
6. Visitor activates the pull quote or "Watch full testimonial".
7. A modal opens carrying the untrimmed quote and structured metadata.

### Module 7 — Contact

1. Visitor activates the WhatsApp floating action button.
2. A tooltip reveals: "Hi! How can JCX help you today?"
3. Visitor activates it again; the WhatsApp chat opens in a new tab.
4. Alternatively, visitor activates the hotline `16777` in the utility strip or footer, initiating a call.

### Module 8 — Theme switching

1. Visitor activates the sun/moon toggle in the primary navigation.
2. Every section, image scrim, map tile and floating action button repaints for the target theme.
3. The choice persists across sessions and applies before first paint.

## 3rd Party API List

| Service | Purpose | Required for prototype |
|---|---|:--:|
| OpenStreetMap / CARTO basemap tiles | Section 7 map tiles. Light mode uses a Positron-style muted set; dark mode uses a dark set. No API key required. | Yes |
| WhatsApp click-to-chat (`web.whatsapp.com` / `wa.me`) | Floating action button and footer contact. Link-out only, no API integration. | Yes |
| Google Fonts | Serif display and grotesque body families. | Yes |
| GSAP CDN | Motion library. See Tech Stack. | Yes |
| YouTube embed | Testimonial video modal player, when video testimonials exist. | No — no videos exist yet |

No analytics, CRM, payment, SMS or email service is integrated in the prototype. The footer newsletter input is presentational in the prototype; its submission target is an Open Question.

---

# Part 2: Page & Section Specification

The deliverable is one page. "Pages" below are the eleven ordered sections plus the stub routes the page links out to.

## Global Elements

### Primary Navigation

Sticky. Transparent over the hero, solid on scroll.

- Left: JCX logo lockup.
- Right: `Contact` pill call-to-action, theme toggle, hamburger.

### Utility Strip

A thin bar above the primary navigation, hidden on scroll. Carries the hotline `16777` as a telephone link and four social glyphs. Social glyphs carry an accent hover state.

Social destinations: Facebook `facebook.com/JCXBD`, LinkedIn `linkedin.com/company/jcx-developments-limited`, YouTube `youtube.com/channel/UCTm39QNanD7ScTT_anGndAw`, Instagram `instagram.com/jcxbd`.

### Menu Overlay

Triggered by the hamburger. Full-screen, carrying a background image montage and the complete menu list: Home, About, Management Team, Properties, Concerns, Landowner, Buyer, Blogs, News & Events, Contact, CSR. Closes on the same control or on Escape. Locks body scroll while open.

### Floating Action Group

Fixed bottom-right, stacked top to bottom:

1. **Scroll-to-top** — appears after the visitor scrolls past the hero.
2. **WhatsApp** — green circle carrying the WhatsApp glyph and a resting pulse. On desktop hover, or after eight seconds idle on mobile, a tooltip reveals "Hi! How can JCX help you today?". Activation opens `https://web.whatsapp.com/send?phone=+8801324437947&text=` in a new tab; mobile uses the `wa.me` equivalent.

### Theme Toggle

Sun/moon glyph in the primary navigation. Defaults to `prefers-color-scheme`. Persists across sessions. Applies before first paint — no flash of the wrong theme.

### Scoped Custom Cursors

Sections 4, 5, 6 and 8 replace the cursor within their own canvas only: an accent-ringed disc carrying a contextual label (`DRAG`, `VIEW`, `EXPLORE`, `HOLD`, `← PREV`, `NEXT →`, `LISTEN`, `▶ WATCH`, `∥ PAUSE`, `SWITCH`, `↓ SCROLL TO BUILD`, `▶ PLAY`). The native cursor remains standard everywhere else. Disabled on touch devices and under reduced motion. Custom cursors never replace focus rings.

### Film Grain

A low-opacity animated grain overlay unifies Sections 5, 6 and 8.

---

## Section 1 — Hero

**Purpose:** Set the tone within three seconds.

**Layout:** Full viewport (`100svh`). Background video, muted, autoplaying, looping, carrying no burned-in text. A dark scrim ramps bottom to top for legibility.

**Video:** One continuous camera journey across five scenes — golden-hour approach, iconic ascent, community descent, amenity drift, landmark reveal — grade-matched to a single LUT. Two exports: 16:9 desktop at 1920×1080 and 9:16 mobile at 1080×1920. Poster JPG for instant paint.

**Taglines:** Five overlay lines, timed to scene changes, each wiping in with an accent underline sweep:

1. Discover — Perfection — In Every Detail
2. Iconic — Destination — for Business Excellence
3. Luxury — Elegance — You Deserve
4. Embrace the — Eco-Friendly — Abode
5. Modern — Architecture — Made Easy

**Motion:** Scroll-driven zoom-out contracting the frame by approximately eight percent before the section releases. Cursor parallax applies a subtle depth shift.

**Search bar placement:** Upper third of the hero, over the video.

**Reduced motion:** Video swaps to the poster image. Taglines cross-fade in place.

---

## Section 2 — Search Bar

**Purpose:** Filter Projects by Type, Status and Area. Writes the shared filter state consumed by Sections 4 and 7.

**Design:** Frosted, backdrop-blurred container with a hairline border, corner radius approximately 20px, maximum width approximately 980px, deep soft shadow. Three fields separated by floating hairline dividers at 60 percent height. Each field carries a small-caps eyebrow label and its current value in the display serif. The chevron rotates 180 degrees on open.

**Search button:** A brand capsule carrying a hairline accent thread inside its border. Label plus right arrow. Not a magnifier glyph.

**Fields:**

| Field | Options |
|---|---|
| Project Type | All · Residential · Commercial · Condominium |
| Status | All · Ongoing · Completed · Upcoming |
| Location | All · Bashundhara R/A · Jalshiri Abashon · Niketan (Gulshan-1) · Narayanganj · Uttara |

**Dropdown panels:** Match the container's frosted treatment. Each row carries the option label and a live count badge that recalculates as other filters change. The selected row carries a check. Full keyboard operation.

**Behaviour:** Every field change filters the Projects section with a crossfade — no reload, no route change. The Search button smooth-scrolls to the Projects section with an accent pulse on arrival; it does not submit a form. When a combination matches zero Projects, the button label becomes `No matches — Adjust filters` in a muted state.

**Mobile:** Collapses to a single tappable summary opening a bottom-sheet modal carrying the same fields stacked vertically.

#### ⚠️ Known Risks

| Risk | Frequency | Prevention Spec |
|---|---|---|
| Search/filter returns nothing or silently shows everything (`search_filter-001`) | 6 occurrences (high) | Distinguish "no filter applied — show all" from "filter applied, zero matches — show empty state". The zero-match case renders the dedicated empty state and the `No matches — Adjust filters` button label; it never falls through to the unfiltered set. |

---

## Section 3 — About / Overview

**Purpose:** Convey what JCX stands for in one memorable moment.

**Concept:** The letters `J`, `C` and `X` are giant cutout windows onto looping JCX footage. A brand mark — a brand-coloured disc carrying a white monogram inside an accent ring — sits centred on the `C`.

**Letter content:**

| Letter | Caption | Footage |
|---|---|---|
| `J` | `THE CRAFT` | Macro architectural detail, material push-in |
| `C` | `THE COMMUNITY` | Landscaped courtyard. The calmest frame — the brand mark sits on it |
| `X` | `THE SKYLINE` | Blue-hour aerial of a JCX tower |

**Copy card** floats beneath the wordmark:

- Eyebrow: `BEYOND BONDING`
- Headline: `Not every home carries 20 years of Japanese precision.` — the figure is a placeholder pending Open Question Q1.
- Body, two sentences maximum: `Since 2004, JCX has partnered with Japan's Creed Group to build residences and towers that honor detail, sustainability, and trust — across Dhaka's most sought-after addresses.`
- Call to action: `Discover JCX →`

**Motion:** Letters slide in from separate directions and lock. The brand mark clicks in with a coin-drop settle and a single ring pulse. Hovering a letter intensifies its footage, dims the other two, and reveals its caption. Sparse ambient particles drift behind the wordmark. The brand mark follows the cursor within a small radius.

**Exclusions:** This section carries no paragraph of body copy, no stat counter row, and no stock imagery.

---

## Section 4 — Projects

**Purpose:** Surface the portfolio with expressive filtering. Receives the Search bar's filter state.

**Concept:** A horizontally-scrolling strip of oversized posters. Vertical scroll drives horizontal translation.

**Command bar,** sticky through the section:

- Left: eyebrow `OUR PORTFOLIO — 60+ PROJECTS`; headline `Addresses that hold` / *`their value.`*; one line of body: `Residential and commercial developments across Dhaka's most sought-after neighborhoods.`
- Right: category toggle (`All` / `Residential` / `Commercial`) with a spring-glide highlight; status row (`All · Ongoing · Completed · Upcoming`) with a morphing underline; a live odometer count.

**Poster cards:** Approximately 580×720px on desktop. Every third or fourth card breaks rhythm as a wide featured card of approximately 1180px. Adjacent cards carry a vertical offset of approximately 40px.

**Card composition,** bottom to top: full-bleed render; scrim; accent serial number top-left (`01.`); animated status glyph top-right; location badge; project name in the display serif at 32–40px; spec row separated by hairline dividers; hover cover panel.

**Status glyphs:**

| Status | Glyph |
|---|---|
| Ongoing | Pulsing dot inside a hairline ring, plus `ONGOING` |
| Completed | Static check, plus `COMPLETED` |
| Upcoming | Dashed ring, plus `UPCOMING` |

Status is never rendered as a filled pill.

**Card motion:** Base image parallax on horizontal scroll at staggered rates. Cursor tilt on a 3D perspective with a glare highlight tracking the cursor. Zoom on hover with `object-position` micro-parallax. Cover panel rises from the bottom with staggered content.

**Filter interaction:** The odometer rolls to the new total over 400 milliseconds. The active underline morphs to its new position. Surviving cards reposition with spring physics; exiting cards slide up with rotation; entering cards fade in from below.

**Bottom strip:** A thin accent progress bar showing strip position, and a `View all 60+ projects →` call to action.

**Tablet:** Scroll-hijack disabled; native horizontal scroll takes over.
**Mobile:** Snap-scroll, one card per viewport, cursor effects removed, filter controls stacked.
**Reduced motion:** Scroll-hijack releases to a two-column vertical grid. Tilt, parallax and glare disabled.

---

## Section 5 — Featured Projects

**Purpose:** Deep-dive the five flagships.

**Concept:** Four acts, one address. Each Featured Project plays four images as four Acts with cinematic transitions and synced overlays.

**Layout:** Eyebrow `FEATURED PROJECTS`; title `Four acts. One address.`; vertical project markers top-right, one thin bar per Featured Project, carrying hover-preview thumbnails. A full-bleed image canvas. A bottom-left overlay group carrying act label, headline and spec chips. A right column carrying persistent project data that never moves between Acts. A bottom act rail of four scrubbable bars, each filling over its Act's five seconds.

**Acts:**

| Act | Label | Content | Chips |
|:-:|---|---|---|
| 1 | `THE ARRIVAL` | Wide or aerial approach | Land size |
| 2 | `THE ARCHITECTURE` | Facade | Orientation, structure |
| 3 | `THE LIVING` | Interior | Unit size, parking |
| 4 | `THE DETAIL` | Material or amenity | Collaboration, consultant |

**Between Acts:** A directional accent wipe approximately 24px wide sweeps left to right. Overlay text lifts and dissolves. The next label types in character by character. The headline rises blur-to-focus. Spec chips slide in staggered from the left.

**Between Projects:** The reel-change cinema-bar wipe closes two horizontal bars to a slit and reopens on the next Project's Act 1.

**Degradation:** A Project carrying fewer than four Acts renders only the rail bars it has. A Project carrying one Act renders as a single-still hero with Ken Burns and no wipes. A Project carrying zero Acts is skipped from the pagination.

**Interactivity:** The section pins while playing and releases once every Featured Project has played through once. Hover pauses autoplay and adds cursor-tracked parallax plus an accent vignette. Keyboard: `←`/`→` Acts, `↑`/`↓` Projects, `Space` pause, `1`–`4` jump to Act, `Enter` opens the Project route.

**Reduced motion:** Autoplay disabled. All four images render as a static 2×2 grid. Ken Burns, wipes and typewriter disabled.

---

## Section 6 — Landowners

**Purpose:** Convert landowners into JV partners.

**Concept:** A pinned-scroll cinematic in which an empty plot transforms into a finished tower as the visitor scrolls.

**States:**

| State | Scroll | Content |
|:-:|---|---|
| 0 · The Plot | 0–15% | Empty land, boundary stones, a lone tree. Eyebrow `FOR LANDOWNERS`; headline `Your land.` / *`Our craft.`* / `Together, a landmark.`; stat block `40+ landowners partnered · 200+ katha delivered · Since 2013` — placeholder pending Open Question Q2. |
| 1 · The Survey | 15–30% | Measurement lines and dimension arrows. `STEP 01 · CONSULT` / `We survey. You watch.` Trust line: `Typical turnaround: 14 days.` |
| 2 · The Agreement | 30–50% | Document panel carrying Landowner Share, Timeline, Quality Standard with check marks. An abstract two-lines-meeting motif replaces handshake imagery. `STEP 02 · AGREE` / `Terms, in writing. No fine print.` |
| 3 · The Build | 50–75% | The tower constructs under scroll. Stage markers activate: `PILING → FRAME → SLAB → FACADE → FINISH`. `STEP 03 · BUILD` / `We build. You watch that too.` |
| 4 · The Landmark | 75–90% | Completed tower at blue hour, windows glowing, the State 0 tree preserved at the base. `STEP 04 · A LANDMARK` / `Your name, on a Dhaka address.` Detail: `Every JCX project carries a landowner signature plate at the entrance.` |
| 5 · The Voice | 90–100% | Tower recedes; a landowner testimonial card rises carrying two floating quote fragments and the final calls to action. |

**Calls to action:** Primary `Start your joint venture →`; secondary `Talk to us · 16777`.

**Build path:** Ships as a layered SVG plus motion timeline. An architectural visualization video, scrubbed by scroll, replaces it when the client supplies one. Both use the same scrub interface.

**Interactivity:** A vertical progress rail on the right edge carries four step dots and jumps on activation. Hover on the growing tower reveals construction annotations.

**Tablet:** Pin retained; info panels drop below the visual.
**Mobile:** Pin abandoned; states become stacked vertical panels.
**Reduced motion:** Pin released; states render as a stacked sequence.

---

## Section 7 — Custom Map

**Purpose:** Show the geographic footprint.

**Layout:** Eyebrow `FIND US ON THE MAP`; headline `Explore JCX across Dhaka.` Left column at approximately 30 percent carries the Area list with per-Area Project counts. Right column at approximately 70 percent carries the map canvas, centred on Bashundhara R/A.

**Pins:** Custom SVG markers carrying the JCX monogram. Ongoing pins pulse; completed pins are static; upcoming pins carry a dashed ring. Pins cluster into numbered circles when zoomed out and separate on zoom in.

**Popups:** Activation opens a frosted card carrying cover image, name in the display serif, location badge, animated status glyph, key spec line and an `Explore →` action, with a pointer tail.

**Performance:** The map is lazy-loaded. A poster image carrying a `Load map` prompt displays until the visitor activates it or scrolls it into view.

**Filter integration:** Pins outside the current filter fade to 30 percent opacity and remain visible for context. Area counts reflect the current filter.

**Interactivity:** Scroll-wheel zoom is disabled by default and enables on a click-inside gesture, with a `Click to interact` hover hint. Keyboard: tab to focus, arrows pan, `+`/`-` zoom.

**Mobile:** Map takes full viewport width; the Area list becomes a horizontal chip strip above it.

---

## Section 8 — Testimonials

**Purpose:** Prove the experience through the people who lived it.

**Concept:** One voice on stage, the wall listening.

**Layout:** Eyebrow `TESTIMONIALS`; headline `Beyond Bonding —` / *`in their words.`*; audience toggle `All voices` · `Homeowners` · `Landowners` carrying a gliding highlight and hover count previews.

**Zone A — Stage:** Portrait video or photo at approximately 520px wide in a 3:4 frame, carrying a hairline accent border and a slow Ken Burns drift. Beside it, a pull quote in italic display serif at 40–56px. Below: name, role, project. Video variants carry a `▶ Watch full testimonial` action.

**Zone B — Wall:** Eight to twelve smaller Testimonial cards at varying depths and opacities, drifting slowly on independent cycles. Hover lifts a card, corrects its tilt and raises a preview tooltip. Activation promotes it to the Stage.

**Zone C — Frame:** Bottom strip carrying an odometer trust counter, progress dots, a pause/play toggle and a `Read all testimonials →` action.

**Trust context** on every Testimonial: full name; role in the form `Homeowner · [Project] (year)` or `Landowner · [Area] · Delivered [year]`; for landowners an additional micro-line `[N] katha · [Area] · Handed over [year]`. A verification glyph displays only where JCX genuinely verifies.

**Transition,** approximately 700 milliseconds: the Stage portrait exits on a radial mask-out; the quote lifts 20px, blurs and widens its letter-spacing; the Wall reshuffles with the exiting card flying to a Wall slot and the incoming card flying to the Stage; the incoming portrait enters on a radial mask-in; the quote reveals word by word on a blur-to-focus stagger.

**Ambient:** The background cools during landowner Testimonials and warms during homeowner Testimonials, tinting over the active theme rather than replacing it.

**Audio:** Video never autoplays with audio. When a Testimonial is unmuted and the Stage rotates, audio ducks to zero over 200 milliseconds and the next Testimonial starts muted.

**Modal:** Carries the untrimmed quote, structured metadata and a `More from this project →` action that filters the Projects section.

**Mobile:** The Wall collapses to a horizontal snap-scroll strip of avatar chips below the Stage; autoplay advances every five seconds instead of eight.

**Reduced motion:** Wall cards hold static positions. Ken Burns off. Transition simplifies to a 300ms opacity crossfade. Autoplay disabled. Quotes fade in whole.

---

## Section 9 — Awards & Recognition

**Purpose:** Establish third-party credibility.

**Layout:** Eyebrow `AWARDS & RECOGNITION`; headline `Your trust is our greatest award.` A horizontal row of three to six award marks on a subtle band, each in a hairline frame, each carrying a caption of award name, awarding body and year.

**Motion:** On scroll into view, marks reveal with a diagonal shine sweep staggered approximately 150 milliseconds apart. On hover a mark lifts approximately 4px, replays its shine, and expands its caption to a longer citation.

**Exclusions:** No slider, no carousel, no auto-rotation, no trophy glyphs. Six marks is the maximum; beyond six, a curated set displays alongside a `View all recognitions →` action.

**Mobile:** The row becomes a horizontal snap-scroll; captions truncate to the essential line.

---

## Section 10 — Footer

**Layout:** Multi-column. Brand-coloured in light mode, near-black in dark mode.

| Column | Content |
|---|---|
| 1 — Brand | JCX wordmark; positioning line `Beyond Bonding. Since 2004.` (pending Q1); address `JCX Business Tower, Plot 1136/A, Japan Street, Block I, Bashundhara R/A, Dhaka-1229, Bangladesh.` |
| 2 — Explore | Home, About, Management Team, Properties, Concerns |
| 3 — More | Landowner, Buyer, Blogs, News & Events, Contact, CSR, Career, Construction Status, Video, Privacy Policy |
| 4 — Get in touch | Hotline `16777` as a telephone link, rendered large; WhatsApp `+880 1324 437 947`; email (pending Q5); newsletter input plus `Subscribe →`; social icon row |

**Bottom bar:** `© 2026 JCX Developments Ltd. — All rights reserved.` on the left; agency credit on the right; Privacy Policy · Terms · Sitemap.

**Motion:** The footer reveals on a gentle upward drift. The wordmark carries a slow drift so the footer is never visually static. The newsletter input carries an underline sweep on focus and confirms with a check plus `Thanks — you're on the list.`

**Mobile:** Columns stack; the social row centres; hotline and WhatsApp remain large.

---

## Section 11 — Global Overlays

The WhatsApp button, scroll-to-top button and menu overlay are specified under Global Elements above. This section number exists because the client brief enumerates it; the implementation is global rather than sectional.

---

## Section 12 — Light and Dark Mode

Specified as a design-system requirement across every section. The toggle sits in the primary navigation, defaults to `prefers-color-scheme`, persists across sessions, and applies before first paint. Sections 6 and 8 tint further in response to content state; those tints sit on top of the active theme rather than replacing it.

---

## Stub Routes

The homepage links out to these routes. They exist as stubs; their pages are built in a later engagement.

| Route | Linked from |
|---|---|
| `/projects/[slug]` | Poster Explore actions, map popups, Featured Project Enter key |
| `/properties` | `View all 60+ projects →` |
| `/landowner` | `Start your joint venture →` |
| `/contact` | `Contact` pill, `Talk to us` |
| `/about`, `/management-team`, `/concerns`, `/buyer`, `/blogs`, `/news-events`, `/csr`, `/career`, `/construction-status`, `/video`, `/privacy-policy` | Menu overlay and footer |

---

# Part 3: Admin Dashboard

**Omitted.** This project carries no admin dashboard, no authentication, no user accounts and no server-side data management. Content is static and edited in source. The skill's Part 3 template is not applicable.

If JCX later requires content management, that is a separate PRD — see Open Question Q6.

---

# Tech Stack

## Prototype (this engagement — P3 deliverable)

| Layer | Choice | Source |
|---|---|---|
| Markup | Static HTML5, one page plus route stubs | P1 seed hard constraint |
| Styling | CSS with custom properties for the two themes; Tailwind permitted via CDN | P1 seed; client design PRD §5 |
| Motion | **GSAP + ScrollTrigger via CDN** | Client answer, P2 interview |
| Map | Leaflet via CDN with CARTO/OSM tiles | Client design PRD §7 |
| Fonts | Google Fonts — display serif plus grotesque body | Client design PRD §5.2 |
| Build step | None | P1 seed hard constraint |

**Licensing note:** GSAP's commercial licence terms apply to production deployment. Confirmation is Open Question Q7.

## Production build (later engagement — declared stack)

Derived from `.claude/rules/stacks/*.rules.md` and `.claude/rules/stacks/stack-lock.json`. Every entry below traces to those files.

| Layer | Choice | Source |
|---|---|---|
| Backend framework | NestJS | `rules/stacks/nestjs.rules.md` |
| ORM | TypeORM | `stack-lock.json` → `nestjs.required` |
| Database | PostgreSQL | `rules/stacks/nestjs.rules.md` |
| Backend architecture | Controller → Service → Repository → Entity, all extending base classes in `src/core/base/` | `rules/stacks/nestjs.rules.md` |
| Frontend build | Vite | `rules/stacks/react.rules.md` |
| Frontend framework | React + TypeScript | `rules/stacks/react.rules.md` |
| Routing | React Router 7, framework mode | `rules/stacks/react.rules.md` |
| Styling | Tailwind CSS v4 | `rules/stacks/react.rules.md` |
| State / data fetching | Redux Toolkit with `createAsyncThunk` | `stack-lock.json` → `react.required` |
| Component primitives | Shadcn/UI | `rules/stacks/react.rules.md` |
| Source layout | `app/` directory, `~/` import alias | `rules/stacks/react.rules.md` |

**Prohibited on the frontend** (`stack-lock.json` → `react.forbidden`): TanStack Query, React Query, Zustand, MobX, Recoil, Jotai, Valtio, SWR.
**Prohibited on the backend** (`nestjs.forbidden`): Prisma, Mongoose, Sequelize, MikroORM, Drizzle, Typegoose.

**Library versions:** No scaffold `package.json` exists in the `.claude` submodule at PRD-creation time. Versions are **TBD — client confirmation needed**, except where a rules file states a major line: Tailwind CSS **4.x**, React Router **7.x**.

## ⚠️ Stack mismatches recorded, not adopted

Two tools named in the client's section-level design prompts contradict the declared stack. Per the generate-prd skill's Tech Stack rules, the declared stack is retained and the conflict is recorded here and in Open Questions.

| Client-named tool | Conflict | Resolution |
|---|---|---|
| **Next.js** (App Router) — named in every section prompt | The declared frontend is Vite + React Router 7. | Declared stack retained. See Q8. Does not affect the prototype, which is static HTML. |
| **Zustand** — named in the Projects section prompt for cross-section filter state | Explicitly listed in `stack-lock.json` → `react.forbidden`. Redux Toolkit is `required`. | Declared stack retained: filter state uses Redux Toolkit. See Q8. |

Two further tools named in the prompts — **GSAP ScrollTrigger** and **Radix UI** — appear in neither the required nor the forbidden lists. GSAP is adopted for the prototype per the client answer above. Radix UI for the production build is **TBD — client confirmation needed**.

---

# Non-Functional Requirements

## Accessibility

- AA contrast in both themes on every text-over-media element. Radial vignettes sit behind copy wherever legibility over video drops.
- Every interactive element is keyboard-reachable. Focus rings are always visible at 6px offset and are never replaced by a custom cursor.
- Custom comboboxes carry `role="combobox"`; segmented toggles carry `role="radiogroup"` with `role="radio"` children; dialogs use accessible dialog primitives.
- Portrait photographs carry descriptive alternative text. Icon-only controls carry `aria-label`.
- `prefers-reduced-motion` is honoured in every section: pinned sections release, custom cursors disable, Ken Burns, drift, particles and letter-level reveals stop. Every section remains complete and legible.
- Bangla content carries a language marker.

## Performance

| Metric | Target | Source |
|---|---|---|
| Largest Contentful Paint | Under 2.5s on 4G | Client design PRD §12 |
| Total Blocking Time | Under 300ms | Client design PRD §12 |
| Hero video, desktop | 8 MB maximum | Client design PRD §12 |
| Hero video, mobile | 4 MB maximum | Client design PRD §12 |

Below-fold media lazy-loads. The map, ambient videos and testimonial previews mount on intersection.

## Responsive

| Breakpoint | Behaviour |
|---|---|
| Desktop, 1280px and above | Full experience — every scroll-hijack, custom cursor and layered animation |
| Tablet, 768–1279px | Scroll-hijack releases to native scroll; layouts consolidate; custom cursors disable; core motion retained |
| Mobile, below 768px | Horizontal strips become snap-scroll one-per-viewport; pins abandon; ambient walls collapse to chip strips; bottom sheets replace popovers |

Mobile is a designed experience, not a compressed desktop.

## Browser support

**Evergreen plus Safari 15 / iOS 15** (client answer, P2 interview). Latest two versions of Chrome, Edge, Firefox and Safari, plus Safari 15 and iOS 15.

Consequence: `backdrop-filter` carries a solid-colour fallback, and CSS scroll-driven animations are not relied upon — GSAP ScrollTrigger drives all scroll-bound motion.

## Timeline

**No fixed deadline** (client answer, P2 interview). The engagement is quality-gated rather than date-gated. Scope holds at eleven sections at full motion fidelity.

---

# Asset Inventory and Gap

Imagery is restricted to assets already present in this repository (P1 seed hard constraint). Current coverage:

| Asset | Path | Covers |
|---|---|---|
| Hero film | `public/videos/hero.mp4` | Section 1 |
| Hero poster | `public/images/hero/hero-poster.jpg` | Section 1 |
| President Park — 4 Acts | `public/images/projects/president-park/{approach,facade,interior,detail}.jpg` | Sections 4, 5, 7 for one Project |
| About backdrop | `public/images/about/about-backdrop.jpg` | Section 3 |
| Team photograph | `public/images/beliefs/backdrop.jpg` | Available |
| Logo | `public/logo-jcx.jpg` | Global |

**Gap.** Nine real assets exist against thirty-three generated placeholders. Sections 6, 8 and 9 carry no real imagery. The Projects strip carries one real render of twelve. Featured Projects carries one complete Project of five.

Every placeholder carries an explicit marker, and the handoff list below enumerates what JCX supplies to close the gap. This is recorded as the seed's `blocked_on_assets` exit condition — the phase completes with marked placeholders rather than failing.

---

# Additional Questions (Client Confirmation Required)

## Required Clarifications

| # | Question | Context |
|:-:|:---------|:--------|
| Q1 | What is the founding year of the JCX–Creed Group joint venture? | The About headline reads "20 years of Japanese precision" and the footer reads "Since 2004". Both are placeholders. The specificity is what makes the line land. |
| Q2 | What are the real landowner trust numbers — landowners partnered, katha delivered, JV share range, on-time delivery percentage, and the "since" year? | Section 6 State 0 and the per-step trust lines currently carry invented figures. Per PRD §8.3, round numbers read as invented; specific ones earn trust. |
| Q3 | Is Condominium a distinct Category, or a label applied to Residential projects? | The search filter exposes Condominium but no seeded Project carries it, so selecting it currently returns zero. |
| Q4 | Confirmed Status for every Project in the portfolio. | All twelve seeded statuses are guesses. Status drives the filter, the glyph and the map pin treatment. |
| Q5 | What is the canonical public email address? | The footer Get-in-touch column requires it; none is published on the live site. |
| Q6 | Does JCX require content management for Projects, Testimonials and Awards, or is content edited in source? | Determines whether a later engagement carries an admin dashboard and a backend at all. Part 3 is omitted from this PRD on the assumption of static content. |
| Q7 | Does JCX hold, or will JCX obtain, a GSAP commercial licence? | GSAP is adopted for the prototype. Commercial deployment carries licence terms. |
| Q8 | Confirm the production stack: the declared stack is NestJS + Vite/React Router 7 + Redux Toolkit, but the section prompts name Next.js and Zustand — and Zustand is explicitly forbidden by `stack-lock.json`. | The PRD retains the declared stack. Written confirmation prevents a mismatch at `/fullstack-dev` handoff. Does not affect the prototype. |

## Recommended Clarifications

| # | Question | Context |
|:-:|:---------|:--------|
| Q9 | Project attribution and year for each Testimonial. | Section 8 requires `Homeowner · [Project] (year)`. Currently unavailable, so role renders alone. |
| Q10 | Award name, awarding body, year and citation for each emblem. | Section 9 captions require them. No award is currently confirmed, so none can be displayed truthfully. |
| Q11 | Does the newsletter input submit anywhere, and to which service? | The footer input is presentational in the prototype. |
| Q12 | Is a Bangla language toggle in scope for the production build? | PRD §9.3 lists it as nice-to-have. It affects typography and layout decisions taken during design. |
| Q13 | Which YouTube videos back the testimonial modal, if any? | The channel exists with few published videos; none are testimonials. |
| Q14 | Is the agency credit line "Site by Dcastalia" wanted in the footer? | The client PRD marks it conditional. |

---

# Feature Change Log

## Version 1.0 (2026-07-27)

Initial canonical PRD. Derived from the client's design PRD v1.0 and the P1 seed.

| Change Type | Before | After | Source |
|:-----------|:-------|:------|:-------|
| **Scope narrowed** | Shipped, instrumented website with analytics success criteria | Approved static HTML prototype serving as the visual and motion specification | P1 interview |
| **Section added** | — | Terminology, System Modules, Tech Stack, Non-Functional Requirements, Asset Inventory | P2 gate requirements |
| **Section omitted** | — | Part 3 Admin Dashboard | No authentication, no admin, no server-side data in scope |
| **Feature constrained** | "Real over stock — every image is a JCX render" | Imagery restricted to the nine real assets in-repo; all other imagery is explicitly-marked placeholder | P1 interview |
| **Decision deferred** | Navy `#003C8C` + gold `#C6A15B` stated as locked | Palette deliberately unresolved; P3 tests navy+gold, logo blue+red, and a hybrid across its three variations | P1 interview |
| **Stack recorded** | Next.js and Zustand named in section prompts | Declared stack retained (Vite/React Router 7 + Redux Toolkit); conflicts logged as Q8 | `stack-lock.json`, generate-prd skill Tech Stack rules |
| **Constraint added** | Browser support unstated | Evergreen plus Safari 15 / iOS 15 | P2 interview |
| **Constraint added** | Motion library unstated | GSAP + ScrollTrigger via CDN | P2 interview |
| **Constraint added** | Deadline unstated | No fixed deadline; quality-gated | P2 interview |
| **Constraint resolved** | WordPress compatibility unknown | Greenfield build; no CMS constraint | P2 interview |

---

# Client Handoff Checklist

To close the asset gap and remove every placeholder:

### Blocks full fidelity

1. Real renders for the eleven Projects that currently carry generated placeholders.
2. Four images per Featured Project, standardised to Approach / Facade / Interior / Detail, for Grand Residences, Olympus, ICON 100 and Lakewood Residences. President Park is complete.
3. Confirmed Status for every Project (Q4).
4. Approximate coordinates per Project, or at minimum per Area cluster.
5. Logo files as SVG plus transparent PNG, light and dark variants, wordmark and monogram.
6. Founding year of the Creed Group joint venture (Q1).

### Blocks polish

7. Portrait photographs of every Testimonial subject at original resolution.
8. Three or more video testimonials, ideally one landowner and two homeowners, 60–90 seconds, portrait framing, with English and Bangla subtitles.
9. Project attribution and handover year per Testimonial (Q9).
10. One cherry-picked pull quote per Testimonial.
11. Landowner trust numbers (Q2).
12. Award name, awarding body, year and citation per emblem (Q10).
13. Canonical public email address (Q5).

### Upgrades

14. Architectural visualization video of a plot-to-tower transformation for Section 6, approximately 15 seconds, isometric or three-quarter perspective, unbranded.
15. Existing JCX b-roll or drone footage.
16. Ambient audio beds for the opt-in sound layers.
17. Bangla copy for a future language toggle.
18. Additional landowner testimonials — one exists.
