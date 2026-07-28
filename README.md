# JCX Developments Ltd. — Homepage

Production-quality homepage for **JCX Developments Ltd.** ("Beyond Bonding") — a premium
real-estate developer in Dhaka, Bangladesh. Logo-derived blue + red identity, cinematic hero, light &
dark mode, scroll-reveal motion throughout.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the build
npm run typecheck
```

Node 20+ recommended (built and verified on Node 24).

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4, CSS variables driven by a `.dark` class |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Theming | `next-themes` (class strategy, persisted, defaults to system) |
| Icons | `lucide-react` |
| Map | Leaflet + react-leaflet, CARTO/OSM tiles (no API key), lazy-mounted |
| Carousels | Embla Carousel |
| Fonts | `next/font` — Cormorant Garamond (display) + Inter (body/UI) |

## Structure

```
app/
  layout.tsx          fonts, metadata, theme provider
  page.tsx            section assembly, in brief order
  globals.css         design tokens, eyebrow/display/card primitives, Leaflet skin
  providers.tsx       next-themes wrapper
components/
  filters-context.tsx shared state: hero search bar ⇄ projects grid
  sections/           Header, Hero, SearchBar, About, Projects, Featured,
                      Landowners, MapSection, Testimonials, Awards, Footer,
                      FloatingActions
  ui/                 Logo, Button, ThemeToggle, StatusChip, SocialIcons,
                      ProjectCard, CountUp, Reveal
  map/ProjectsMap.tsx client-only Leaflet map (dynamic import, `ssr: false`)
data/
  site.ts             brand, hotline, WhatsApp, address, nav, socials
  projects.ts         all project data + filter helpers + map coordinates
  content.ts          hero slides, beliefs, stats, testimonials, awards, copy
public/images/        placeholder imagery (see "Assets to replace")
```

**All content is data-driven.** Header, footer, nav, grid, featured slider and map pins
all read from `data/`. Editing a project in `data/projects.ts` updates every surface.

## Design system

The palette is sampled **directly from the client's logo** (`public/logo-jcx.jpg`) — the
blue ring/wordmark, the red X-stroke and bottom chevron, and the periwinkle mid-chevron:

| Brand colour | Value | Sampled from |
|---|---|---|
| Blue | `#2050A0` | logo ring + "JCX" wordmark |
| Red | `#EC1C2D` | X upper stroke + bottom chevron |
| Periwinkle | `#9AA2DB` | middle chevron |

**Light mode is mostly white; dark mode is mostly black.** Blue and red are the only
colour in either — blue carries interaction (buttons, active tabs, links, focus rings,
map pins), red is the accent (eyebrow labels, hover underlines, status chips, dividers,
stat highlights).

Tokens live in `app/globals.css` under `:root` and `.dark`, exposed to Tailwind through
`@theme inline` (`bg-bg`, `text-ink`, `text-muted`, `bg-brand`, `text-accent`,
`border-line`, …). One component tree serves both themes.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FFFFFF` | `#07080A` |
| `--surface` | `#F6F7FA` | `#101217` |
| `--ink` | `#0B0D12` | `#F2F4F7` |
| `--muted` | `#5A6472` | `#98A1AE` |
| `--brand` | `#2050A0` | `#4E86E8` |
| `--brand-deep` | `#173C79` | `#2F63C4` |
| `--accent` | `#D81829` | `#FF4256` |
| `--accent-strong` | `#EC1C2D` | `#EC1C2D` |
| `--line` | `#E3E6EC` | `#1B1E26` |

`--accent` is the logo red nudged darker in light mode and lighter in dark mode so it
clears AA contrast against white and black respectively; `--accent-strong` is the logo
red untouched, used for fills where contrast is carried by white text.

Reusable class primitives: `.shell`, `.eyebrow`, `.display`, `.card`, `.link-underline`.

## Sections

1. **Hero** — full `100svh`, rotating headline slides (5s), Ken Burns drift, scrim,
   indicators, scroll cue. Swap to video with `<Hero media="video" />` in `app/page.tsx`.
2. **Search bar** — glass filter card floating over the hero (Type · Status · Location).
   Live-filters the grid below; **Search** scrolls to the filtered results. (When a
   `/properties` page exists, push `?type=&status=&location=` from `handleSubmit`.)
3. **About** (`components/sections/AboutSection.tsx`) — the wordmark *is* the visual.
   Three giant white `J` `C` `X` letters over the backdrop photograph, with the JCX
   disc mark anchored on the `C`. Minimal copy: one eyebrow, one headline, two
   sentences, one CTA, two flanking stat pills. See "About section" below.
3b. **The Basis of Our Beliefs** (`Beliefs.tsx`) — photo-led band: full-bleed team
   photograph under a directional scrim, a sticky headline column on the left, and four
   numbered white cards on the right (`01 · TRUST` → `04 · INTEGRITY`), each with a red
   offset edge bar and a circular-arrow CTA. Replaces the earlier vertical tab strip.
4. **Our Projects** — category tabs + status pills, animated `layout` grid, empty state.
5. **Our Perfections** — cinematic Embla slider of the five flagships, arrows + progress.
6. **Landowners** — brand-blue-overlaid band (near-black in dark), two CTAs, three-step "how it works".
7. **Map** — "Load map" cover until scrolled into view/clicked; blue/red JCX pins, popup
   cards, area side list that flies the map. Tiles switch light/dark with the theme.
8. **Testimonials** — mixed carousel of text quotes and a video card with a lightbox.
9. **Awards** — emblem band with hover zoom.
10. **Footer** (`#contact`) — 3-column brand-blue footer (near-black in dark), address, hotline, WhatsApp, email, socials, bottom bar.
11. **Floating actions** — WhatsApp FAB (first tap opens a teaser card, second launches
    the chat) above a scroll-to-top button.
12. **Light/dark** — toggle in the utility strip and the mobile menu; persisted,
    system-default. Every section, the map tiles, the scrims and the FABs are tuned.

## About section — the wordmark treatment

`<AboutSection />` is self-contained and takes a `media` prop of exactly three sources,
in `J · C · X` order, so the client can swap content without touching the component:

```tsx
<AboutSection
  media={[
    { kind: 'video', src: '/videos/about-craft.mp4',     poster: '…', caption: 'The Craft',     alt: '…' },
    { kind: 'image', src: '/images/about/collage-2.svg',               caption: 'The Community', alt: '…' },
    { kind: 'video', src: '/videos/about-skyline.mp4',   poster: '…', caption: 'The Skyline',   alt: '…' },
  ]}
/>
```

**Two fills, one `letterFill` prop.**

- `letterFill="white"` (**default, current design**) — the glyphs render as solid white
  `<text>` over the backdrop photograph. The hovered letter goes to full opacity, the
  others sit at 0.9; nothing dims to unreadable.
- `letterFill="media"` — the original cutout treatment: each letter becomes a
  `<clipPath>` mask and a sibling `<g clip-path="…">` holds a `<foreignObject>` with that
  letter's `<video>` or `<img>` at full canvas size, Ken Burns drifting inside. Still
  fully wired — flip the prop to get it back.

Either way, glyph widths are pinned with `textLength` +
`lengthAdjust="spacingAndGlyphs"`, so the layout is deterministic and does **not** shift
when the web font finishes loading. The captions, brand mark and every animation behave
identically in both modes.

**Interactions**

| | Behaviour |
|---|---|
| Letter reveal | `J` slides in from the left, `C` scales up from centre, `X` from the right — 0.85s, weighted ease-out, staggered |
| Ken Burns | `letterFill="media"` only — each window pans/zooms independently (`.kb-a/.kb-b/.kb-c`, different directions, 19–27s) |
| Brand mark | Fades up with a rotational settle 0.75s after the letters, then a single red ring pulse |
| Hover | The hovered letter lifts to full white (or full brightness in media mode) and its caption rises in above it |
| Touch | No hover, so captions auto-cycle every 2.6s while the section is in view |
| Parallax | Wordmark drifts ±60px, copy card ±110px — the card outruns it, giving depth |
| Cursor magnetism | The mark follows the cursor up to 20px on spring physics (desktop + `hover: hover` only) |
| Particles | 18 fixed-position red specks drifting behind the wordmark |
| Copy card | Rises with `blur(12px) → blur(0)` 1.1s after the letters land |

**Reduced motion** disables Ken Burns, parallax, magnetism, particle drift, the letter
slide and the caption cycle — everything fades in place instead.

The section is near-black in **both** themes (`bg-ink dark:bg-bg`): the letters only read
as windows against a dark field, so it stays cinematic either way. The copy card is a
light surface with dark text in both modes, over a radial vignette, for AA legibility.

**Known deviation from the brief:** letter height is width-constrained, not the specified
65–80vh. Three letters at 65vh would be ~1550px wide — wider than a 1440px viewport. The
wordmark is full-bleed and sized to fit, landing at roughly 45–50vh on desktop. Going
larger means letting `J` and `X` bleed off both edges; say the word if that's wanted.

## Navigation — single page, zero dead links

This is a homepage-only build, so **the nav points at sections on this page**, not at
stub routes that would 404. Every link resolves:

| Link | Target |
|---|---|
| About · Projects · Featured · Landowners · Locations · Testimonials | `#about` `#projects` `#featured` `#landowners` `#map` `#testimonials` |
| Contact (header pill, mobile menu, landowner CTAs) | `#contact` — the footer, which carries hotline, WhatsApp and email |
| Project card / featured slide / map popup CTA | `#contact`, labelled **Enquire →** |
| Logo | `#hero` |

The nav array lives in `data/site.ts`. When real detail pages exist, change those hrefs
to `/properties/{slug}` and add the routes — nothing else needs to move.

## ⚠️ Client must supply / confirm

Everything below is a clearly-marked placeholder. Search the codebase for
`TODO: confirm with client`.

### Assets to replace

| What | Where | Notes |
|---|---|---|
| **Logo (vector)** | `public/logo-jcx.jpg` | The client's supplied JPEG is in use and renders as a circular badge in both themes. A transparent **SVG** would be crisper — drop it at `public/logo-jcx.svg` and change `LOGO_SRC` in `components/ui/Logo.tsx`. |
| **Hero film** | `public/videos/hero.mp4` | **Supplied and live** — `app/page.tsx` runs `<Hero media="video" />`. Swap the file to change the reel. |
| **Hero poster** | `public/images/hero/hero-poster.svg` | Abstract placeholder. |
| **Project photography** | `public/images/projects/*.svg` | One per project; point `image` in `data/projects.ts` at the real file or a `jcxbd.com` CDN URL (already allow-listed in `next.config.ts`). |
| **About letter footage** | `public/images/about/letter-{craft,community,skyline}.svg` | **The three windows in the `JCX` wordmark.** Client to supply 4–6s muted loops, grade-matched to the hero reel: `J` = craft (slow push-in on a facade/material detail), `C` = community (courtyard, the calmest frame — the brand mark sits on it), `X` = skyline (blue-hour aerial, warm lit windows). Drop at `public/videos/about-*.mp4`, add a poster, and flip `kind` to `'video'` in the `media` prop. |
| **About collage** | `public/images/about/collage-1…4.svg` | Orphaned — the *Our Ascendance* band that used them was removed. Safe to delete, or reuse for a future section. |
| **Beliefs backdrop** | `public/images/beliefs/backdrop.jpg` | Client-supplied team photograph, in use. **Only 800×422** — it upscales softly on a 1440px+ viewport. The scrim hides most of it, but a ~2400px-wide original would be noticeably crisper. Swap via the `backdropSrc` prop on `<Beliefs />`. |
| **Landowner background** | `public/images/landowner/land.svg` | |
| **Award emblems** | `public/images/awards/award-1…4.svg` | Real files live at `wp-content/uploads/2023/09/Award-*.webp`. |
| **Testimonial video** | `data/content.ts` → `youtubeId` | Empty; the lightbox shows a "coming soon" panel until an id is set. Pull from the JCX YouTube channel. |
| **Favicon** | `public/favicon.svg` | Placeholder wordmark. |

Once real raster imagery is in, you can drop `dangerouslyAllowSVG` +
`contentSecurityPolicy` from `next.config.ts` — they exist only so the placeholder SVGs
pass through the image optimizer.

### Data to confirm

| What | Where |
|---|---|
| **Project statuses** (ongoing / completed / upcoming) | `data/projects.ts` — all guessed |
| **Map coordinates** | `data/projects.ts` — approximate area cluster points |
| **Founding year** — the About headline reads *"20 years of Japanese precision"* and the body says *"Since 2004"* | `components/sections/AboutSection.tsx` — **placeholder**. The specificity is what makes the line land, so this needs the real Creed Group JV date. The phrasing scales with any year. |
| **Stat numbers** (`60+ Projects`, `20+ Completed`) | `data/content.ts` → `stats`, and the two pills in `AboutSection.tsx` |
| **Belief blurbs + card headlines** | `data/content.ts` → `beliefs`. The `body` text is written in JCX's voice and needs sign-off against the live-site wording; the `headline` and `cta` on each card are new and also need approval |
| **Award captions** | `data/content.ts` → `awards` — descriptive placeholders, no claims invented |
| **Public email address** | `data/site.ts` → `email` — not published on the live site |
| **"Condominium" filter** | `components/sections/SearchBar.tsx` — the option exists but no seeded project uses it, so it currently maps to Residential. Confirm whether Condominium is its own category. |
| **Footer credit line** | `components/sections/Footer.tsx` |

Project names, categories, apartment sizes, unit counts, floor counts, testimonial quotes,
the hero headlines, the address, hotline, WhatsApp number
and social links are the client's real data and were not invented.

## Accessibility & performance

- Semantic landmarks, ordered headings, `aria-label`s on every icon-only control,
  `role="tablist"`/`tabpanel` on the belief and category tabs, `aria-roledescription`
  on both carousels, brand-blue `:focus-visible` rings, Esc + scroll-lock on the mobile menu
  and video lightbox.
- `prefers-reduced-motion` disables Ken Burns, the pulse ring, hero auto-rotation,
  count-up animation and all reveal translation.
- `next/image` with `sizes` everywhere; the hero is `priority`, everything else lazy.
- Leaflet is a `dynamic()` import with `ssr: false` and only mounts on
  intersection/click — it is not in the initial bundle.
- Verified at 360 / 768 / 1024 / 1440.

## Known deferrals

- **Marker clustering** — pins are grouped visually by area and the side list flies
  between clusters, but no clustering plugin is installed. Add
  `react-leaflet-cluster` if the project count grows past ~30.
- **Linked pages** — homepage scope only, as briefed.
