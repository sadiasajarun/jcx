/**
 * Testimonials — the voices on the stage and the wall.
 *
 * Quotes, names and roles are the client's real content from jcxbd.com.
 * Everything marked TODO below is missing from the source and must not be
 * invented: project attribution, dates, katha counts, portraits, video.
 */

export type TestimonialAudience = 'homeowner' | 'landowner';
export type TestimonialMedium = 'video' | 'text';

export interface Testimonial {
  id: string;
  name: string;
  audience: TestimonialAudience;
  medium: TestimonialMedium;
  /**
   * Required for every testimonial — no name without a face.
   *
   * TODO: client to supply original-resolution portraits. The live site's
   * testimonial photos are compressed thumbnails. Until they land, each person
   * gets a serif monogram card (initials in a hairline circle) rather than a
   * stock silhouette.
   */
  portrait: string;
  /** TODO: request video testimonials from JCX — none exist on the site yet. */
  video?: string;
  videoPoster?: string;
  /** The one killer line, shown on stage. */
  pullQuote: string;
  /** The untrimmed quote, shown in the modal. */
  fullQuote: string;
  /** TODO: client to confirm which project each person lives in / partnered on. */
  project?: string;
  role: string;
  /** TODO: client to confirm handover / purchase year. */
  date?: string;
  landownerDetail?: {
    kathaCount: number;
    location: string;
    handoverYear: number;
  };
  /** Only set when JCX can genuinely verify. Left unset on purpose. */
  verified?: boolean;
  language?: 'en' | 'bn';
}

const MONOGRAM = (id: string) => `/images/testimonials/monogram-${id}.svg`;

export const testimonials: Testimonial[] = [
  {
    id: 'imran-mahmudul',
    name: 'Imran Mahmudul',
    audience: 'homeowner',
    medium: 'text',
    portrait: MONOGRAM('imran-mahmudul'),
    pullQuote: 'They made buying a home stress-free.',
    fullQuote:
      'The team was responsive, supportive, and transparent throughout the entire journey. They made buying a home stress-free.',
    role: 'Homeowner',
    language: 'en',
  },
  {
    id: 'nakib-khan',
    name: 'Nakib Khan',
    audience: 'landowner',
    medium: 'text',
    portrait: MONOGRAM('nakib-khan'),
    pullQuote: 'As a landowner, I value trust above all.',
    fullQuote:
      'As a landowner, I value trust above all. This developer delivered exactly what was promised, with exceptional quality and integrity.',
    role: 'Landowner',
    language: 'en',
  },
  {
    id: 'yang-huan-huan',
    name: 'Yang Huan Huan',
    audience: 'homeowner',
    medium: 'text',
    portrait: MONOGRAM('yang-huan-huan'),
    pullQuote: 'People across the globe trust us for quality construction.',
    fullQuote:
      'People across the globe trust us for quality construction & world-class materials selection!',
    role: 'Homeowner',
    language: 'en',
  },
  {
    id: 'morshed-hossain',
    name: 'Morshed Hossain',
    audience: 'homeowner',
    medium: 'text',
    portrait: MONOGRAM('morshed-hossain'),
    pullQuote: 'The consultant helped us choose the perfect apartment.',
    fullQuote:
      'I must praise the consultant who worked with us and helped us choose the perfect apartment. Great team!',
    role: 'Homeowner',
    language: 'en',
  },
  {
    id: 'dina-akhter',
    name: 'Dina Akhter',
    audience: 'homeowner',
    medium: 'text',
    portrait: MONOGRAM('dina-akhter'),
    pullQuote: 'We found the perfect home, exactly as we imagined.',
    fullQuote:
      'JCX has made it very easy for us to find and buy the perfect home as we imagined.',
    role: 'Homeowner',
    language: 'en',
  },
];

export const homeowners = testimonials.filter((t) => t.audience === 'homeowner');
export const landowners = testimonials.filter((t) => t.audience === 'landowner');

export type AudienceFilter = 'all' | TestimonialAudience;

export function byAudience(filter: AudienceFilter): Testimonial[] {
  if (filter === 'all') return testimonials;
  return testimonials.filter((t) => t.audience === filter);
}

/**
 * Bottom-strip trust counts, derived from the data rather than hardcoded — so
 * they stay honest as testimonials are added.
 */
export const testimonialStats = {
  stories: testimonials.length,
  videos: testimonials.filter((t) => t.medium === 'video').length,
  languages: new Set(testimonials.map((t) => t.language ?? 'en')).size,
};
