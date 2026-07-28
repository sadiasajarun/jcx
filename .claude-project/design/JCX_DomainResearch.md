# JCX Homepage — Domain & Reference Research

> P3a Part 1 output. Feeds `JCX_DesignGuide.md` and the three DESIGN_SYSTEM variants.
> Source PRD: `.claude-project/docs/PRD.md` (v2). Seed: `seed-jcx-homepage-a1f3c7`.

---

## 1. Domain classification

| Dimension | Value |
|---|---|
| Industry | Real-estate development (premium residential + commercial) |
| Market | Dhaka, Bangladesh |
| Product type | Single-page brand/marketing site — not a listings portal, not a SaaS app |
| Commercial model | Two-sided: apartment buyers *and* landowners offering land into joint ventures |
| Differentiator | Japanese joint venture (Creed Group) — engineering-standard credibility |
| Conversion events | Hotline call, WhatsApp chat, JV enquiry |

**Consequence for design.** This is a *trust-and-desire* page, not a *find-and-filter* tool.
Portal conventions (dense result grids, price-per-sqft tables, saved searches, mortgage
calculators) are actively wrong here. The nearest correct analogues are luxury-brand and
architecture-studio sites, not Zillow or bproperty.

---

## 2. Competitor / reference research

### 2.1 Named in the PRD

| Reference | Finding | Take | Reject |
|---|---|---|---|
| **Shanta Holdings** | Dhaka conglomerate, founded 2005, pivoted to real estate 2010. Superbrand Bangladesh in Real Estate across 2018-19, 2020-21, 2023-24, 2025-26 — the credibility benchmark JCX is measured against. | Discipline of one visual per section; award/recognition as a first-class trust block. | Black-luxury palette — JCX owns a different colour story. |
| **Sanmar Properties** | Founded 1999. Residential, commercial, mall and land-subdivision development. Positions on "pioneering, innovative, sustainable". | Warmth expressed through content and imagery rather than through palette. | Bronze palette; multi-page routing. |
| **Fortress Group** | Stone/cream minimalism, restrained type. Shares an agency with JCX (Dcastalia). | Whitespace confidence; letting renders carry the page. | The aesthetic itself — deliberate divergence to avoid an agency house-style match. |
| **Tropical Homes** | Image-forward hero, quiet layouts. | Hero real estate matters more than any other section. | Slower motion pacing. |
| **Akter Properties** | Status-first project surfacing. | Status as first-class navigation, not a footnote. | Card-grid template. |
| **Rupayan Housing Estate** | Traditional developer information density. | Nothing. | Everything — the anti-pattern reference. |

### 2.2 Wider 2026 luxury real-estate web patterns

Research into current award-listed luxury property sites surfaces four dominant patterns,
each of which the JCX PRD already independently arrives at:

1. **"Quiet luxury" palettes** — warm, muted, earthy; exclusivity signalled by restraint
   rather than excess. Confirms the PRD's "gold is jewelry, never wall paint" rule and
   argues against a saturated-accent treatment.
2. **Cinematic full-screen hero with video** — the single highest-leverage element.
   Confirms PRD §7 Section 1.
3. **Scroll-triggered animation, commonly GSAP** — fade-in, slide-up, scroll-bound
   transforms. Confirms the P2 decision to adopt GSAP + ScrollTrigger.
4. **Trust signals as structural sections** — testimonials, awards, delivery record given
   real estate on the page rather than footer placement. Confirms PRD Sections 8 and 9.

**Benchmark noted:** K11 ARTUS recurs across 2026 "best real-estate website" lists as the
Asian luxury benchmark — full-bleed imagery, restrained type, motion used as pacing.

---

## 3. Standard patterns by page type

Elements present in the large majority of top products in this domain. Each row records
whether the JCX PRD already covers it.

### 3.1 Brand homepage (the whole deliverable)

| Standard pattern | Present in PRD? | Where |
|---|:--:|---|
| Full-viewport hero, video or high-res still | ✅ | §1 |
| Sticky nav, transparent over hero → solid on scroll | ✅ | Global |
| Property search/filter as the first interactive touch | ✅ | §2 |
| Brand story block with a single strong visual idea | ✅ | §3 |
| Portfolio browse with category + status filtering | ✅ | §4 |
| Flagship deep-dive with multiple images per project | ✅ | §5 |
| Geographic footprint / map | ✅ | §7 |
| Testimonials with named, attributed people | ✅ | §8 |
| Awards / recognition band | ✅ | §9 |
| Rich footer with hotline prominent | ✅ | §10 |
| Persistent chat affordance (WhatsApp in this market) | ✅ | Global |
| Light/dark theming | ⚠️ above-standard | §12 — rare in this domain; a differentiator |
| **Landowner / JV conversion track** | ✅ **domain-specific** | §6 |

**Gap check: nothing standard is missing.** The PRD covers every pattern the domain
expects, and adds two the domain does not: dual theming, and a dedicated landowner
conversion narrative.

### 3.2 The landowner section has no web precedent

JV land acquisition is a Bangladesh/South-Asia market structure. Competitor sites treat it
as a text page with a contact form. The PRD's scroll-driven plot-to-tower transformation
has no comparable implementation in the reference set.

**Consequence:** Section 6 is the page's genuine originality and its largest execution
risk. There is no pattern to borrow and no competitor render to benchmark against. It also
carries zero real assets today.

---

## 4. Market-specific constraints

| Constraint | Evidence | Design consequence |
|---|---|---|
| WhatsApp is the primary business channel | PRD makes it a persistent FAB, not a footer link | The chat affordance must never be visually subordinate |
| Hotline short-codes (`16777`) carry trust | Prominent on every Bangladeshi developer site | Render large in footer and utility strip, as a `tel:` link |
| Mid-range Android + older iOS are common | P2 answer set the floor at evergreen + Safari 15 / iOS 15 | Motion needs static fallbacks; `backdrop-filter` needs a solid-colour fallback |
| Katha is the land unit | Landowner copy throughout | Never convert to sqft in landowner-facing copy |
| Bangla is a likely second language | PRD §9.3 | Type must tolerate longer strings; avoid tightly-fitted fixed-width labels |

---

## 5. Anti-patterns for this domain

Derived from the reference set and the PRD's own exclusions.

- ❌ Dense listing grids with price-per-sqft tables — portal grammar, wrong register.
- ❌ Stock handshake / puzzle-piece "trust" imagery — PRD explicitly bans.
- ❌ Illustrated skyline silhouettes — PRD explicitly bans.
- ❌ Star ratings or "5.0 Google Reviews" badges — PRD explicitly bans.
- ❌ Trophy glyphs in the awards band.
- ❌ Filled status pills — the PRD mandates animated glyphs instead.
- ❌ Real-estate cliché icons (house glyph on a sqft row, tag glyph on a price).
- ❌ Carousel-for-everything — the PRD mandates a static gallery for Awards specifically.
- ❌ Exclamation marks and the words *luxurious, state-of-the-art, world-class, unparalleled*.

---

## 6. Research-driven inputs to the three variations

The palette is unresolved by client decision (P1). Research supports all three candidate
directions, which is why the variation set tests them head to head rather than picking one.

| Direction | Research support | Risk |
|---|---|---|
| **Navy + gold** (PRD §5.1) | Matches "quiet luxury" earthy/muted guidance. Closest to the established premium-developer register. | Closest to the reference set — weakest differentiation, and gold trends toward the Sanmar bronze the PRD wants to avoid. |
| **Logo blue + red** | Only direction actually derived from the client's own mark. Strongest brand truth and strongest differentiation in a market of navy-and-gold sites. | Red reads as alert/urgency in UI convention; it must be disciplined to accent-only or it cheapens the register. |
| **Navy + gold + red accent** | Reconciles the PRD system with the real logo. Lets the mark sit on the page without clashing. | Three-colour systems drift toward busy; needs a hard allocation rule per colour. |

---

## 7. Design pillars for JCX

**Core inspiration (study these):**

1. **Shanta Holdings** — one visual per section; award block as structure.
2. **Fortress Group** — whitespace confidence; renders carry the page.
3. **Tropical Homes** — hero primacy.
4. **K11 ARTUS** — motion as pacing, not decoration.

**The four pillars:**

- **Hero** = Tropical Homes (image-forward, full-bleed, first-3-seconds)
- **Portfolio** = Akter Properties (status-first surfacing) rendered as cinema, not grid
- **Trust** = Shanta Holdings (awards + testimonials as structural sections)
- **Restraint** = Fortress Group (whitespace, hairlines, small confident type)

**The one thing borrowed from nobody:** Section 6. No reference site narrates the JV
process visually. This is where JCX stops resembling its market.

---

## Sources

- [Shanta Holdings Limited — Wikipedia](https://en.wikipedia.org/wiki/Shanta_Holdings_Limited)
- [Sanmar Properties Ltd](https://mysanmar.com/)
- [Bangladesh Real Estate Company List — Top 20 Developers 2026](https://www.dreamwayhl.com/blogs/bangladesh-real-estate-company-list)
- [Bangladesh's real estate sector has expanded significantly — The Business Standard](https://www.tbsnews.net/supplement/bangladeshs-real-estate-sector-has-expanded-significantly-despite-various-challenges)
- [7 Luxury Real Estate Website Design Trends Dominating 2026 — DMR Media](https://www.dmrmedia.org/blog/Real-Estate-Website-Design-Trends)
- [12 Luxury Real Estate Websites Redefining Design — DiverseKit](https://diversekit.com/blog/12-luxury-real-estate-websites-redefining-design)
- [10 Real Estate Website Design Trends in 2026 — Placester](https://placester.com/real-estate-marketing-academy/10-real-estate-website-design-trends-in-2026)
- [10 Best Real Estate Website Designs of 2026 — Azuro Digital](https://azurodigital.com/real-estate-website-examples/)
