/**
 * Single source of truth for brand, contact, navigation and social links.
 * Header, mobile menu, footer and the floating action buttons all read from here.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'facebook' | 'linkedin' | 'youtube' | 'instagram';
}

export const site = {
  name: 'JCX Developments Ltd.',
  shortName: 'JCX',
  tagline: 'Beyond Bonding',
  positioning:
    'Contemporary large-scale Residential, Commercial & Condominium projects in Bangladesh, delivered with Japanese collaboration.',

  hotline: {
    label: '16777',
    href: 'tel:16777',
  },

  whatsapp: {
    number: '+8801324437947',
    // Prefilled message is intentionally empty so the visitor writes their own.
    href: 'https://web.whatsapp.com/send?phone=+8801324437947&text=',
  },

  // TODO: confirm with client — placeholder address email, not published on the live site.
  email: 'info@jcxbd.com',

  address: {
    lines: [
      'JCX Business Tower, Plot 1136/A, Japan Street',
      'Block # I, Bashundhara R/A',
      'Dhaka-1229, Bangladesh',
    ],
    single:
      'JCX Business Tower, Plot 1136/A, Japan Street, Block # I, Bashundhara R/A, Dhaka-1229, Bangladesh.',
  },

  /**
   * This is a single-page build, so the nav points at sections on this page —
   * not at stub routes that would 404. Every href matches a section `id` in
   * app/page.tsx.
   */
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Featured', href: '#featured' },
    { label: 'Landowners', href: '#landowners' },
    { label: 'Locations', href: '#map' },
    { label: 'Testimonials', href: '#testimonials' },
  ] satisfies NavItem[],

  /** Footer link column — same anchors, plus the awards band. */
  footerExplore: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Featured', href: '#featured' },
    { label: 'Landowners', href: '#landowners' },
    { label: 'Locations', href: '#map' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Awards', href: '#awards' },
  ] satisfies NavItem[],

  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/JCXBD', icon: 'facebook' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/jcx-developments-limited/',
      icon: 'linkedin',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/channel/UCTm39QNanD7ScTT_anGndAw',
      icon: 'youtube',
    },
    { label: 'Instagram', href: 'https://www.instagram.com/jcxbd/', icon: 'instagram' },
  ] satisfies SocialLink[],

  copyright: '© 2026 JCX BD | All Rights Reserved.',
} as const;

export type Site = typeof site;
