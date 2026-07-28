/**
 * Single source of truth for the project grid, the featured slider and the map.
 *
 * Project names, categories, apartment sizes, unit counts and floor counts are the
 * client's real data (jcxbd.com).
 *
 * TODO: confirm with client — every `status` value below is a placeholder.
 * TODO: confirm with client — every `lat`/`lng` is an approximate area cluster point.
 * TODO: replace `image` with the real CDN asset (see README §Assets).
 */

export type Status = 'ongoing' | 'completed' | 'upcoming';
export type Category = 'residential' | 'commercial';

/**
 * The four "acts" a featured project plays through in the Featured section.
 * Order matters — it is the running order of the sequence.
 */
export const ACT_KEYS = ['approach', 'facade', 'interior', 'detail'] as const;
export type ActKey = (typeof ACT_KEYS)[number];

export interface Act {
  image: string;
  /** Per-project line shown beside the constant act label. */
  headline: string;
  /** 2–3 short chips, pulled from the real project record. */
  specs: string[];
}

/**
 * Acts are one record each rather than three parallel objects keyed by act —
 * an image can't drift out of sync with its own headline that way. A project
 * may supply any subset; the section renders only the acts that exist.
 */
export type Acts = Partial<Record<ActKey, Act>>;

export interface Project {
  slug: string;
  name: string;
  category: Category;
  status: Status;
  location: string;
  address: string;
  apartmentSize: string;
  units?: string;
  parking?: string;
  floors: string;
  orientation?: string;
  landSize?: string;
  lat: number;
  lng: number;
  /** MUST be a real JCX render. See README — the illustrated placeholders are a ship-blocker. */
  image: string;
  /** Drives the wide split-layout poster variant in the portfolio strip. */
  featured?: boolean;
  /** Featured posters play this on loop instead of the still. */
  hasVideo?: boolean;
  video?: string;
  /** Editorial pull-quote shown on the wide variant. */
  pullQuote?: string;
  /**
   * Four-act sequence for the Featured section. Only President Park has real
   * renders so far — see README. Projects with one act or none fall back to a
   * single-still hero; projects with zero are skipped from the pagination.
   */
  acts?: Acts;
}

/** Area labels used by the search filters, the project grid and the map side list. */
export const LOCATIONS = [
  'Bashundhara R/A',
  'Jolshiri Abashon',
  'Niketan (Gulshan-1)',
  'Narayanganj',
  'Uttara',
] as const;

export type LocationName = (typeof LOCATIONS)[number];

/** Approximate cluster centre per area — TODO: confirm with client. */
export const AREA_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  'Bashundhara R/A': { lat: 23.8188, lng: 90.4308, zoom: 14 },
  'Jolshiri Abashon': { lat: 23.8449, lng: 90.4881, zoom: 14 },
  'Niketan (Gulshan-1)': { lat: 23.7761, lng: 90.4109, zoom: 15 },
  Narayanganj: { lat: 23.6238, lng: 90.5, zoom: 13 },
  Uttara: { lat: 23.8759, lng: 90.3795, zoom: 14 },
};

export const DEFAULT_MAP_CENTER = AREA_CENTERS['Bashundhara R/A'];

export const projects: Project[] = [
  {
    slug: 'jcx-president-park',
    name: 'JCX President Park',
    category: 'residential',
    status: 'ongoing',
    location: 'Bashundhara R/A',
    address: 'Block I, Bashundhara R/A, Dhaka',
    apartmentSize: '4395 sq ft',
    units: '26',
    parking: '30+',
    floors: 'B1+B2+G+13',
    orientation: 'South facing',
    landSize: '20 katha',
    lat: 23.8202,
    lng: 90.4321,
    // The only project with real client renders so far.
    image: '/images/projects/president-park/facade.jpg',
    featured: true,
    pullQuote: '20 katha. 26 residences. One address.',
    // TODO: confirm with client — headlines are drafted from the project page
    // on jcxbd.com and need sign-off. Spec chips are real record data.
    acts: {
      approach: {
        image: '/images/projects/president-park/approach.jpg',
        headline: 'A Block I address, twenty katha of it.',
        specs: ['20 Katha', 'Block I', '130 ft Road'],
      },
      facade: {
        image: '/images/projects/president-park/facade.jpg',
        headline: 'Thirteen storeys, oriented to the light.',
        specs: ['South Facing', 'B1+B2+G+13'],
      },
      interior: {
        image: '/images/projects/president-park/interior.jpg',
        headline: 'Twenty-six homes of 4,395 square feet.',
        specs: ['4395 sqft', '26 Units', '30+ Parking'],
      },
      detail: {
        image: '/images/projects/president-park/detail.jpg',
        headline: 'Water, deck and shade at the heart of the plan.',
        specs: ['Japanese Collaboration', 'Creed Group'],
      },
    },
  },
  {
    slug: 'jcx-grand-residences',
    name: 'JCX Grand Residences',
    category: 'residential',
    status: 'ongoing',
    location: 'Bashundhara R/A',
    address: 'Block I, Bashundhara R/A, Dhaka',
    apartmentSize: '3242–8370 sq ft',
    units: '122+',
    parking: '150+',
    floors: '2B+G+M+19',
    orientation: 'South-east facing',
    landSize: '60 katha',
    lat: 23.8175,
    lng: 90.4287,
    image: '/images/projects/grand-residences.svg',
    featured: true,
    pullQuote: '60 katha. 122 units. One landmark.',
  },
  {
    slug: 'jcx-olympus',
    name: 'JCX Olympus',
    category: 'residential',
    status: 'completed',
    location: 'Bashundhara R/A',
    address: 'Block G, Bashundhara R/A, Dhaka',
    apartmentSize: '1790–2210 sq ft',
    units: '30',
    parking: '32',
    floors: 'B+G+11',
    orientation: 'South facing',
    lat: 23.8151,
    lng: 90.4344,
    image: '/images/projects/olympus.svg',
    featured: true,
    pullQuote: 'Thirty homes. Eleven floors. Zero compromise.',
  },
  {
    slug: 'icon-100',
    name: 'ICON 100',
    category: 'commercial',
    status: 'ongoing',
    location: 'Bashundhara R/A',
    address: 'Block I, Bashundhara R/A, Dhaka',
    apartmentSize: '6900–15300 sq ft',
    floors: '3B+G+24',
    parking: '200+',
    lat: 23.8221,
    lng: 90.4269,
    image: '/images/projects/icon-100.svg',
    featured: true,
    pullQuote: 'Twenty-four floors of business address.',
  },
  {
    slug: 'jcx-business-tower',
    name: 'JCX Business Tower',
    category: 'commercial',
    status: 'completed',
    location: 'Bashundhara R/A',
    address: 'Plot 1136/A, Japan Street, Block I, Bashundhara R/A, Dhaka',
    apartmentSize: '19,722 sq ft',
    floors: '3B+G+12',
    parking: '80+',
    lat: 23.8188,
    lng: 90.4308,
    image: '/images/projects/business-tower.svg',
  },
  {
    slug: 'jcx-lakewood-residences',
    name: 'JCX Lakewood Residences',
    category: 'residential',
    status: 'upcoming',
    location: 'Jolshiri Abashon',
    address: 'Jolshiri Abashon, Dhaka',
    apartmentSize: '2850 sq ft',
    units: '8',
    parking: '10',
    floors: 'G+8',
    orientation: 'Lake facing',
    lat: 23.8462,
    lng: 90.4903,
    image: '/images/projects/lakewood.svg',
    featured: true,
    pullQuote: 'Eight homes. One lake. Nothing between.',
  },
  {
    slug: 'jcx-atlantis',
    name: 'JCX Atlantis',
    category: 'residential',
    status: 'ongoing',
    location: 'Bashundhara R/A',
    address: 'Block J, Bashundhara R/A, Dhaka',
    apartmentSize: '2257–3977 sq ft',
    units: '50',
    parking: '55',
    floors: 'B+G+M+13',
    lat: 23.8233,
    lng: 90.4351,
    image: '/images/projects/atlantis.svg',
  },
  {
    slug: 'jcx-n71-lake-condos',
    name: 'JCX N71 Lake Condos',
    category: 'residential',
    status: 'ongoing',
    location: 'Bashundhara R/A',
    address: 'Block N, Bashundhara R/A, Dhaka',
    apartmentSize: '3051–3204 sq ft',
    units: '70',
    parking: '75',
    floors: '2B+G+M+18',
    orientation: 'Lake facing',
    lat: 23.8264,
    lng: 90.4295,
    image: '/images/projects/n71-lake-condos.svg',
  },
  {
    slug: 'jcx-serenity',
    name: 'JCX Serenity',
    category: 'residential',
    status: 'completed',
    location: 'Bashundhara R/A',
    address: 'Block C, Bashundhara R/A, Dhaka',
    apartmentSize: '1715–2282 sq ft',
    units: '39',
    parking: '40',
    floors: 'B+G+13',
    lat: 23.8129,
    lng: 90.4256,
    image: '/images/projects/serenity.svg',
  },
  {
    slug: 'jcx-signature',
    name: 'JCX Signature',
    category: 'residential',
    status: 'upcoming',
    location: 'Bashundhara R/A',
    address: 'Block K, Bashundhara R/A, Dhaka',
    apartmentSize: '2900–3080 sq ft',
    units: '25',
    parking: '28',
    floors: 'B+G+13',
    lat: 23.8246,
    lng: 90.4372,
    image: '/images/projects/signature.svg',
  },
  {
    slug: 'jcx-crystal-oasis',
    name: 'JCX Crystal Oasis',
    category: 'residential',
    status: 'upcoming',
    location: 'Jolshiri Abashon',
    address: 'Jolshiri Abashon, Dhaka',
    apartmentSize: '2575 sq ft',
    units: '8',
    parking: '10',
    floors: 'G+8',
    lat: 23.8431,
    lng: 90.4858,
    image: '/images/projects/crystal-oasis.svg',
  },
  {
    slug: 'jcx-cascade',
    name: 'JCX Cascade',
    category: 'residential',
    status: 'ongoing',
    location: 'Niketan (Gulshan-1)',
    address: 'Niketan, Gulshan-1, Dhaka',
    apartmentSize: '3000 sq ft',
    units: '9',
    parking: '10',
    floors: 'G+9',
    lat: 23.7768,
    lng: 90.4121,
    image: '/images/projects/cascade.svg',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export interface ProjectFilters {
  type: Category | 'all';
  status: Status | 'all';
  location: string;
}

export const DEFAULT_FILTERS: ProjectFilters = {
  type: 'all',
  status: 'all',
  location: 'all',
};

export function filterProjects(all: Project[], filters: ProjectFilters): Project[] {
  return all.filter((p) => {
    if (filters.type !== 'all' && p.category !== filters.type) return false;
    if (filters.status !== 'all' && p.status !== filters.status) return false;
    if (filters.location !== 'all' && p.location !== filters.location) return false;
    return true;
  });
}
