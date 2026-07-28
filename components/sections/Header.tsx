'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { site } from '@/data/site';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SocialIcons } from '@/components/ui/SocialIcons';

/** Images behind the mobile overlay menu (montage, like the live site). */
const MENU_MONTAGE = [
  '/images/projects/grand-residences.svg',
  '/images/projects/icon-100.svg',
  '/images/projects/lakewood.svg',
  '/images/projects/president-park.svg',
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and allow Esc to close while the overlay menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Solid once scrolled; transparent over the hero at the top of the page.
  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Utility strip ─────────────────────────────────────────── */}
      <div
        className={`hidden border-b transition-colors duration-500 md:block ${
          solid
            ? 'border-line bg-surface text-muted'
            : 'border-white/10 bg-black/25 text-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="shell flex h-10 items-center justify-between text-[0.75rem]">
          <div className="flex items-center gap-5">
            <a
              href={site.hotline.href}
              className="link-underline cursor-pointer transition-colors hover:text-accent"
            >
              <Phone className="size-3.5 text-accent" aria-hidden />
              <span>
                Hotline <span className="font-semibold tracking-wide">{site.hotline.label}</span>
              </span>
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline cursor-pointer transition-colors hover:text-accent"
            >
              <MessageCircle className="size-3.5 text-accent" aria-hidden />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="tracking-[0.22em] uppercase">{site.tagline}</span>
            <span className={`h-4 w-px ${solid ? 'bg-line' : 'bg-white/20'}`} aria-hidden />
            <SocialIcons size="sm" itemClassName="size-7" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* ── Primary nav ───────────────────────────────────────────── */}
      <div
        className={`border-b transition-all duration-500 ${
          solid
            ? 'border-line bg-bg/92 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-gradient-to-b from-black/45 to-transparent'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo variant={solid ? 'auto' : 'invert'} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline cursor-pointer text-[0.78rem] font-medium tracking-[0.1em] uppercase transition-colors hover:text-accent ${
                  solid ? 'text-ink' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className={`hidden h-9 cursor-pointer items-center justify-center rounded-full px-5 text-[0.8rem] font-medium transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
                solid
                  ? 'bg-brand text-white hover:bg-brand-deep'
                  : 'border border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-accent hover:text-accent'
              }`}
            >
              Contact
            </Link>

            <ThemeToggle className={`md:hidden ${solid ? 'text-ink' : 'text-white'}`} />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`inline-flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors lg:hidden ${
                solid
                  ? 'border-line text-ink hover:text-accent'
                  : 'border-white/25 text-white hover:text-accent'
              }`}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* ── Full-screen overlay menu ──────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black"
          >
            {/* Background image montage */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-2 opacity-[0.18]">
              {MENU_MONTAGE.map((src) => (
                <div key={src} className="relative">
                  <Image src={src} alt="" fill sizes="50vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />

            <div className="relative flex min-h-full flex-col">
              <div className="shell flex h-16 items-center justify-between md:h-20">
                <Logo variant="invert" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:text-accent"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              <nav aria-label="Mobile" className="shell flex-1 py-8">
                <ul className="flex flex-col">
                  {[...site.nav, { label: 'Contact', href: '#contact' }].map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.4 }}
                      className="border-b border-white/10"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block cursor-pointer py-4 font-display text-3xl font-light text-white transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="shell border-t border-white/10 py-6">
                <div className="flex flex-wrap items-center justify-between gap-4 text-white/80">
                  <div className="flex flex-col gap-1 text-sm">
                    <a href={site.hotline.href} className="cursor-pointer hover:text-accent">
                      Hotline {site.hotline.label}
                    </a>
                    <a
                      href={site.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-accent"
                    >
                      {site.whatsapp.number}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <SocialIcons itemClassName="border-white/25 text-white" />
                    <ThemeToggle className="border-white/25 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
