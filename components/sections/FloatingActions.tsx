'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';
import { site } from '@/data/site';

function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Floating WhatsApp FAB with a teaser card, plus a scroll-to-top button. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {/* ── Scroll to top ─────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink shadow-soft transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp className="size-4" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── WhatsApp teaser ───────────────────────────────────── */}
      <AnimatePresence>
        {teaserOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="card relative w-64 p-4 pr-8"
            role="status"
          >
            <button
              type="button"
              onClick={() => {
                setTeaserOpen(false);
                setTeaserDismissed(true);
              }}
              aria-label="Dismiss chat prompt"
              className="absolute top-2 right-2 cursor-pointer text-muted transition-colors hover:text-accent"
            >
              <X className="size-4" aria-hidden />
            </button>
            <p className="text-sm leading-relaxed text-ink">
              Hi! How can {site.shortName} help you today?
            </p>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex cursor-pointer items-center gap-2 text-[0.7rem] font-medium tracking-[0.14em] text-accent uppercase"
            >
              Start chat →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp FAB ──────────────────────────────────────── */}
      <div className="relative">
        {!teaserDismissed && (
          <span
            className="pulse-ring absolute inset-0 rounded-full bg-[#25D366]/40"
            aria-hidden
          />
        )}
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // First click reveals the teaser; the link itself opens on the second.
            if (!teaserOpen && !teaserDismissed) {
              e.preventDefault();
              setTeaserOpen(true);
            }
          }}
          aria-label={`Chat with ${site.shortName} on WhatsApp`}
          className="relative inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <WhatsAppGlyph className="size-7" />
        </a>
      </div>
    </div>
  );
}
