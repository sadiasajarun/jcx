'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { beliefs } from '@/data/content';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BeliefsProps {
  /**
   * Full-bleed photograph behind the section.
   *
   * TODO: client to supply a higher-resolution original — the current file is
   * 800×422, which upscales softly on a 1440px+ viewport. The scrim hides most
   * of it, but a 2400px-wide version would be noticeably crisper.
   */
  backdropSrc?: string;
}

export function Beliefs({ backdropSrc = '/images/beliefs/backdrop.jpg' }: BeliefsProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="beliefs"
      aria-labelledby="beliefs-heading"
      // Photo-led band, dark in both themes so the white cards and the
      // headline hold contrast either way.
      className="relative isolate overflow-hidden bg-ink dark:bg-bg"
    >
      {/* ── Backdrop photograph ────────────────────────────────── */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src={backdropSrc}
          alt=""
          fill
          sizes="100vw"
          // Lifted a touch so the photograph carries the section rather than
          // just tinting it.
          className="object-cover object-center brightness-110"
        />

        {/* A light base wash, plus ONE directional gradient that darkens only
            where the headline sits. Stacking more than this drove the whole
            photograph to near-black. The cards are opaque, so the side they
            sit on needs no scrim at all. */}
        <div className="absolute inset-0 bg-black/28" />
        {/* Mobile stacks headline-over-cards, so the pool runs top-to-bottom. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/25 to-transparent lg:hidden" />
        {/* From lg the headline is a left column, so the pool runs left-to-right. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/72 via-black/20 to-transparent lg:block" />
      </div>

      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        {/* ── Left: sticky headline ────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow"
            >
              The Basis of Our Beliefs
            </motion.p>

            <motion.h2
              id="beliefs-heading"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="display mt-7 text-[clamp(2.6rem,5vw,4rem)] text-white"
            >
              built on
              <span className="block italic text-accent">four beliefs.</span>
            </motion.h2>

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
              className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70"
            >
              Four commitments decide how JCX takes on a site, signs an agreement and hands
              over a key. They are the reason landowners come back.
            </motion.p>

            {/* Brand-red disc — the same anchoring device as the JCX mark. */}
            <motion.span
              aria-hidden
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-12 hidden size-28 rounded-full bg-accent-strong shadow-[0_18px_50px_-12px_rgba(236,28,45,0.6)] lg:block"
            />
          </div>
        </div>

        {/* ── Right: stacked belief cards ──────────────────────── */}
        <ol className="flex flex-col gap-5 lg:col-span-7">
          {beliefs.map((belief, i) => (
            <motion.li
              key={belief.key}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.06 * i }}
              className="group relative"
            >
              {/* Red edge bar, offset behind the card — the inspiration's
                  signature detail. It extends on hover. */}
              <span
                aria-hidden
                className="absolute top-4 -right-1.5 bottom-4 w-1.5 bg-accent-strong transition-all duration-500 group-hover:top-0 group-hover:bottom-0"
              />

              <article className="relative bg-[#FBFBFC] p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:-translate-x-1.5 md:p-9 dark:bg-[#F4F5F7]">
                <p className="flex items-center gap-2.5 font-mono text-[0.7rem] font-semibold tracking-[0.22em] text-accent uppercase">
                  <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="text-accent/50">
                    ·
                  </span>
                  <span>{belief.title}</span>
                </p>

                <h3 className="mt-4 text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold leading-tight text-[#0B0D12]">
                  {belief.headline}
                </h3>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-[#454C58]">{belief.body}</p>

                <Link
                  href={belief.cta.href}
                  className="mt-6 inline-flex cursor-pointer items-center gap-3 text-[0.72rem] font-bold tracking-[0.16em] text-accent uppercase transition-colors hover:text-accent-strong"
                >
                  {belief.cta.label}
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-strong text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
