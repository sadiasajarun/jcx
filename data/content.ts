/** Homepage editorial content: hero slides, beliefs, stats, testimonials, awards. */

export interface HeroSlide {
  /** Three-part line — rendered as small / display / small for the JCX rhythm. */
  lines: [string, string, string];
}

export const heroSlides: HeroSlide[] = [
  { lines: ['DISCOVER', 'Perfection', 'IN EVERY DETAIL'] },
  { lines: ['ICONIC', 'Destination', 'FOR BUSINESS EXCELLENCE'] },
  { lines: ['LUXURY', 'Elegance', 'YOU DESERVE'] },
  { lines: ['EMBRACE THE', 'Eco-Friendly', 'ABODE'] },
  { lines: ['MODERN', 'Architecture', 'MADE EASY'] },
];

/**
 * The client's own "Our Ascendance" paragraph, verbatim from jcxbd.com.
 *
 * Retained deliberately: the section that rendered it was removed, but this is
 * real client copy — keep it here for whichever section needs it next rather
 * than re-typing it from the live site.
 */
export const aboutCopy =
  'JCX Developments Ltd embarked on the real-estate journey with a commitment to bring contemporary design and develop large-scale Residential, Commercial, and Condominium projects in Bangladesh, with Japanese collaboration and experience. We strive to deliver precise, exquisite solutions to our clients’ wishes so their aspirations become reality — introducing state-of-the-art Japanese technologies through our partnership with the Creed Group of Japan.';

export interface Stat {
  value: number | null;
  suffix?: string;
  /** Used when `value` is null — a non-numeric stat. */
  display?: string;
  label: string;
}

/**
 * TODO: confirm with client — all figures are sensible placeholders.
 *
 * Retained after the stat-counter row was removed with the Our Ascendance
 * section. The only stats on the page now are the two pills in AboutSection.
 */
export const stats: Stat[] = [
  { value: 60, suffix: '+', label: 'Projects' },
  { value: 20, suffix: '+', label: 'Completed' },
  { value: null, display: 'Creed Group', label: 'Japanese Joint Venture' },
  { value: null, display: 'Across Dhaka', label: 'Prime Locations' },
];

export interface Belief {
  key: string;
  /** Short label used in the card eyebrow, e.g. `01 · TRUST`. */
  title: string;
  /** The card's own statement line — short, declarative. */
  headline: string;
  body: string;
  cta: { label: string; href: string };
}

export const beliefs: Belief[] = [
  {
    key: 'trust',
    title: 'Trust',
    headline: 'Promised in writing. Delivered in concrete.',
    body: 'Trust is the foundation every JCX relationship is built on. We honour our commitments in writing and in practice — from the first conversation about a piece of land to the day the keys change hands.',
    cta: { label: 'See our projects', href: '#projects' },
  },
  {
    key: 'closeness',
    title: 'Closeness',
    headline: 'One team. Your file. Every stage.',
    body: 'We stay close to the people we build for. Landowners and buyers deal with a team that knows their file, answers directly, and keeps them informed at every stage of construction.',
    cta: { label: 'Talk to us', href: '#contact' },
  },
  {
    key: 'uniqueness',
    title: 'Uniqueness',
    headline: 'No two JCX addresses are alike.',
    body: 'Each project is designed around its site, its light and its neighbourhood — bringing contemporary architecture and Japanese detailing to the streets of Dhaka.',
    cta: { label: 'See our perfections', href: '#featured' },
  },
  {
    key: 'integrity',
    title: 'Integrity',
    headline: 'We would rather lose the shortcut than the name.',
    body: 'Quality of materials, transparency of terms and accuracy of handover dates are not negotiable. We would rather say no to a shortcut than compromise the building that carries our name.',
    cta: { label: 'Partner with us', href: '#landowners' },
  },
];

export interface Award {
  id: string;
  image: string;
  /** TODO: confirm with client — captions are descriptive placeholders, not claims. */
  caption: string;
}

export const awards: Award[] = [
  { id: 'award-1', image: '/images/awards/award-1.svg', caption: 'Recognition of Excellence' },
  { id: 'award-2', image: '/images/awards/award-2.svg', caption: 'Certificate of Membership' },
  { id: 'award-3', image: '/images/awards/award-3.svg', caption: 'Quality Assurance' },
  { id: 'award-4', image: '/images/awards/award-4.svg', caption: 'Partner Accreditation' },
];
