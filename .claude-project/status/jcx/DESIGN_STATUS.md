---
project: jcx
phase: P3-design
sub_step: P3g
selected_variation: Mix
approved: true
approved_at: 2026-07-27T00:00:00Z
phase_complete: true
roles: [app]
prd_hash_at_generation: "cd139479977d8d72abdaa59556ca88c7299c18226b0e5d459488755dfc58b293"
prd_version: "v2"
html_bundle_hash: "58237671549e641aece9301ef3e9057003fa169b261b8524c22e8c1b565d2411"
generated_at: "2026-07-27T00:00:00Z"
---

# DESIGN_STATUS — jcx

## ✅ Client selection recorded (P3d)

**Selected: Mix — Variation B base, with Variation C's shadow treatment.**

| Aspect | Source | Value |
|---|:--:|---|
| Palette | **B** | Logo blue `#2050A0` + logo red `#EC1C2D` |
| Background | **B** | Pure white `#FFFFFF` / true black `#08090B` |
| Border | **B** | Crisp cool hairline `#E3E6EC` |
| Corner radius | **B** | 2px, near-sharp |
| Display type | **B** | Grotesque, weight 600 |
| Status expression | **B** | Animated glyph + tracked label |
| Nav on scroll | **B** | White solid |
| Motion character | **B** | Crisp — 0.45s, 60ms stagger |
| **Shadow** | **C** | **Glow + deep cast** (replaces B's "no shadow") |

### Note on the merge

Variation B's original signature was *no shadow — separation by hairline and spacing
alone*, which is what made it read graphic and current. Substituting C's glow + deep cast
moves the result toward premium and filmic while keeping B's sharp geometry and brand-true
palette. The two are compatible; the merged system simply reads warmer and heavier than
B did on its own.

The glow is tinted **brand blue**, not red. B's colour-allocation rule caps red at 5% of
any viewport, and a red glow on every card would break it. Red keeps its reserved roles:
eyebrows, the active filter underline, the ongoing-status glyph, and the mark.

Merged system written to `.claude-project/design/DESIGN_SYSTEM.md`.

## To approve

Edit the frontmatter at the top of this file so it reads:

```yaml
  selected_variation: A        # or B, or C, or Mix
  approved: true
  approved_at: 2026-07-27T00:00:00Z
```

> The example above is indented on purpose. The P3d gate greps for `approved:` at the
> start of a line, so an un-indented example anywhere in this file would false-pass the
> approval check. Keep illustrative YAML indented; only the real frontmatter sits at
> column zero.

Then run:

```
/fullstack-pm jcx --phase P3-design --resume
```

A **Mix** is allowed. Record it as `selected_variation: Mix` and add a note below saying
which elements come from which variation — for example *"C's palette and nav, B's sharp
radii, A's motion pacing."*

---

## The three variations

| | **A · Editorial Luxe** | **B · Brand Modernist** | **C · Cinematic Noir** |
|---|---|---|---|
| Palette source | PRD §5.1 as written | Sampled from the JCX logo | PRD system + logo reconciled |
| Primary | Navy `#003C8C` | Blue `#2050A0` | Navy `#003C8C` |
| Accent | Gold `#C6A15B` | Red `#EC1C2D` | Gold `#C6A15B` + red `#EC1C2D` |
| Light background | Warm cream `#F7F6F3` | Pure white `#FFFFFF` | Bone `#F4F2EE` |
| Dark background | Near-black navy `#0A0F1A` | True black `#08090B` | Charcoal-navy `#0B1017` |
| Shadow | Soft warm diffuse | None — hairline only | Glow + deep cast |
| Corner radius | 16px | 2px, near-sharp | 10px + full pills |
| Display type | Serif, weight 300 | Grotesque, weight 600 | Serif, weight 700 |
| Status expression | 6px dot, no label | Glyph + tracked label | Neon dot with glow ring |
| Nav on scroll | Cream solid | White solid | Always dark glass |
| Motion character | Restrained — 0.6s, 90ms stagger | Crisp — 0.45s, 60ms stagger | Filmic — 0.7s, 120ms stagger, grain |

### Differentiation check — 7 / 7 differ (threshold 5 / 7) ✅

### The trade-off in one line each

- **A** is the safest and the closest to what the PRD asked for — and the closest to what
  Shanta and Sanmar already look like. Lowest differentiation.
- **B** is the only direction actually derived from JCX's own mark, and no competitor in
  the reference set uses red. Highest differentiation; red must stay disciplined to
  accent-only or the register cheapens.
- **C** reconciles the two so the logo sits on the page without clashing, at the cost of a
  three-colour system that needs a hard allocation rule to avoid reading busy.

---

---

## ✅ P3 complete (P3g)

| Sub-step | Output | State |
|---|---|:--:|
| P3a | `JCX_DomainResearch.md`, `JCX_DesignGuide.md`, `DESIGN_SYSTEM_{A,B,C}.md` | ✅ |
| P3b | `JCX_VariationPrompts.md` | ✅ |
| P3c | `variations/{A,B,C}-01-homepage.html` + `showcase-ALL.html` | ✅ |
| P3d | Client selected **Mix** — B base + C shadow | ✅ |
| P3e | `design/html/app/home.page.html` — all 11 sections | ✅ |
| P3f | `DESIGN_QA_STATUS.md` — 8 / 8 checks PASS | ✅ |
| P3g | Snapshot fields written to this file's frontmatter | ✅ |

The snapshot above is what `/fullstack-dev` reads for its Tier 2 consistency check.
`prd_hash_at_generation` matches the current `docs/PRD.md`, so a Dev-track entry will not
trip the drift guard. If the PRD is edited, re-run P3g or pass `--accept-design-drift`.

---

## Variation scope

Each variation renders the same representative slice — **Hero · Search bar · About ·
Projects** — with real in-repo assets and real PRD copy. That is enough surface to judge
palette, typography, shadow, radius, card treatment and motion character in both themes.

The selected variation is built out to **all eleven sections** at P3e.

## Files

| File | Purpose |
|---|---|
| `design/variations/A-01-homepage.html` | Variation A, full slice, live filters |
| `design/variations/B-01-homepage.html` | Variation B |
| `design/variations/C-01-homepage.html` | Variation C |
| `design/variations/showcase-ALL.html` | Side-by-side comparison with a shared theme toggle |
| `design/DESIGN_SYSTEM_{A,B,C}.md` | Token tables and allocation rules per variation |
| `design/JCX_DesignGuide.md` | Section-by-section design brief |
| `design/JCX_DomainResearch.md` | Competitor and domain-pattern research |
| `design/JCX_VariationPrompts.md` | Generation prompts per variation |

## Known state at pause

- **Real assets in use:** hero film + poster, JCX President Park facade render, about
  backdrop, logo. Eleven project cards use generated stand-ins and are labelled
  `PLACEHOLDER RENDER` on the card itself.
- **Roles:** single role `app` — the PRD declares no user types with separate surfaces, so
  P3e writes to `design/html/app/`.
- **Not yet built:** Sections 5–12. Those are P3e work on the winning variation.
