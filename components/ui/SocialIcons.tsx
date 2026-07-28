import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { site, type SocialLink } from '@/data/site';

const icons = {
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
} as const;

export function SocialIcons({
  className = '',
  itemClassName = '',
  size = 'sm',
}: {
  className?: string;
  itemClassName?: string;
  size?: 'sm' | 'md';
}) {
  const box = size === 'md' ? 'size-10' : 'size-8';
  const glyph = size === 'md' ? 'size-[1.05rem]' : 'size-[0.9rem]';

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {site.socials.map((s: SocialLink) => {
        const Icon = icons[s.icon];
        return (
          <li key={s.icon}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.shortName} on ${s.label}`}
              className={`inline-flex ${box} cursor-pointer items-center justify-center rounded-full border border-current/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent ${itemClassName}`}
            >
              <Icon className={glyph} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
