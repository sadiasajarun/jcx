/**
 * Landowners section — copy, trust signals and testimonial data.
 *
 * ─────────────────────────────────────────────────────────────────────
 * CLIENT HANDOFF — every value marked `confirmed: false` below is a
 * PLACEHOLDER and must be confirmed or corrected before launch. The brief
 * is explicit: if the client cannot supply a number, the line is CUT, not
 * invented. Setting `confirmed: false` does not hide a badge — set the
 * badge's `value` to `null` to drop it from the render entirely.
 * ─────────────────────────────────────────────────────────────────────
 */

export type LandownerStateId = 'plot' | 'survey' | 'agreement' | 'build' | 'landmark' | 'voice';

export interface TrustBadge {
  /** `null` removes the badge from the UI — use when the client has no figure. */
  value: string | null;
  label: string;
  /** False until the client signs off on the figure. Surfaces in the README. */
  confirmed: boolean;
}

export interface LandownerState {
  id: LandownerStateId;
  /** Where this state starts and ends as a fraction of the pinned scroll. */
  range: [number, number];
  /** Rail label. Kept short — it has to fit a 1-line dot label. */
  rail: string;
  /** Rail hover tooltip: the state's core promise in a handful of words. */
  promise: string;
  stepLabel?: string;
  headline?: string;
  body?: string;
  micro?: string;
  badges: TrustBadge[];
}

/**
 * The five narrated states. `range` values are fractions of the pinned
 * scroll (0–1) and are the single source of truth: the canvas, the panels
 * and the rail all derive their timing from these, so retiming the sequence
 * means editing one array.
 */
export const landownerStates: LandownerState[] = [
  {
    id: 'plot',
    range: [0, 0.15],
    rail: 'The Plot',
    promise: 'Your land, as it stands today',
    badges: [
      { value: '40+', label: 'landowners partnered', confirmed: false },
      { value: '200+', label: 'katha delivered', confirmed: false },
      { value: '2013', label: 'partnering since', confirmed: false },
    ],
  },
  {
    id: 'survey',
    range: [0.15, 0.3],
    rail: 'Consult',
    promise: 'Feasibility study at no cost',
    stepLabel: 'Step 01 · Consult',
    headline: 'We survey. You watch.',
    body: 'Share your land. Our team runs the site survey, feasibility study, and preliminary design — at no cost, no commitment.',
    micro: 'Typical turnaround: 14 days.',
    badges: [{ value: '14 days', label: 'typical turnaround', confirmed: false }],
  },
  {
    id: 'agreement',
    range: [0.3, 0.5],
    rail: 'Agree',
    promise: 'Transparent terms, fully documented',
    stepLabel: 'Step 02 · Agree',
    headline: 'Terms, in writing. No fine print.',
    body: 'We agree a transparent JV share, a fixed timeline, and a quality standard — all documented, all disclosed. You keep your title. We shoulder the build.',
    micro: 'Standard JV structures: 45–60% landowner share, project-dependent.',
    badges: [{ value: '45–60%', label: 'typical landowner share', confirmed: false }],
  },
  {
    id: 'build',
    range: [0.5, 0.75],
    rail: 'Build',
    promise: 'Monthly reports, unrestricted site access',
    stepLabel: 'Step 03 · Build',
    headline: 'We build. You watch that too.',
    body: 'Design, approvals, construction, handover — end to end. You get a monthly progress report with photos, a live dashboard for milestones, and unrestricted site access. No black-box construction.',
    micro: 'Average project: 30 months. On-time delivery record: 92%.',
    badges: [
      { value: '30 months', label: 'average project', confirmed: false },
      { value: '92%', label: 'on-time delivery', confirmed: false },
    ],
  },
  {
    id: 'landmark',
    range: [0.75, 0.9],
    rail: 'A Landmark',
    promise: 'A signature plate at every entrance',
    stepLabel: 'Step 04 · A Landmark',
    headline: 'Your name, on a Dhaka address.',
    body: "Handover, occupancy, and ongoing partnership — because your relationship with JCX doesn't end at delivery.",
    micro: 'Every JCX project carries a landowner signature plate at the entrance.',
    badges: [{ value: 'Signature plate', label: 'at every entrance', confirmed: false }],
  },
  {
    id: 'voice',
    range: [0.9, 1],
    rail: 'In Their Words',
    promise: 'Hear it from a landowner',
    badges: [],
  },
];

/** Stage markers that light up alongside the tower during the BUILD state. */
export const buildStages = ['Piling', 'Frame', 'Slab', 'Facade', 'Finish'] as const;

/**
 * Construction annotations revealed when the visitor hovers the structure.
 * Keyed by state — each state exposes what is legible at that point.
 */
export const hoverAnnotations: Record<LandownerStateId, string[]> = {
  plot: ['Boundary stones', 'Road frontage', 'Existing tree — preserved'],
  survey: ['Orientation', 'Soil analysis', 'Feasibility'],
  agreement: ['Landowner share', 'Timeline', 'Quality standard'],
  build: ['Column spacing', 'Load-bearing spec', 'Seismic rating'],
  landmark: ['Handover', 'Occupancy', 'Signature plate'],
  voice: [],
};

export interface LandownerTestimonial {
  name: string;
  role: string;
  project: string;
  quote: string;
  /** Portrait clip, ~60–90s. `null` renders the awaiting-testimonial card. */
  video: string | null;
  poster: string | null;
  /** Two short fragments flanking the video card. */
  fragments: [string, string];
}

/**
 * CLIENT HANDOFF — no landowner testimonial has been supplied yet, so this
 * array is intentionally EMPTY. `LandownerTestimonial` renders the
 * awaiting-testimonial invitation card in that case, exactly as the brief
 * requires. Push a real entry here and the card, the rotation arrows and the
 * modal player all light up with no further code changes.
 */
export const landownerTestimonials: LandownerTestimonial[] = [];

export const landownersCopy = {
  eyebrow: 'For Landowners',
  headline: ['Your land.', 'Our craft.'],
  subline: 'Together, a landmark.',
  testimonialHeader: 'In their words.',
  primaryCta: 'Start your joint venture',
  secondaryCta: 'Talk to us',
  awaiting: {
    title: 'Awaiting landowner testimonial',
    body: 'Contact us if you would like to share yours.',
  },
} as const;
