'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { landownersCopy } from '@/data/landowners';

/**
 * The section's ONLY CTAs, and they appear only here — after the story has
 * been told. Navy capsule with a gold hairline inside the border, matching the
 * hero search button. No red anywhere in this section, per the brief.
 */
export function LandownersCTAs() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a
        href="#contact"
        className="lo-pulse group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-brand px-8 py-4 text-[0.8rem] font-semibold tracking-[0.14em] text-white uppercase shadow-[inset_0_0_0_1px_var(--gold),0_18px_40px_-18px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        {landownersCopy.primaryCta}
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </a>

      <a
        href={site.hotline.href}
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/25 px-7 py-4 text-[0.8rem] font-semibold tracking-[0.14em] text-white/85 uppercase transition-colors duration-300 hover:border-[var(--gold-bright)]/60 hover:text-white"
      >
        <Phone className="size-4" aria-hidden />
        {landownersCopy.secondaryCta} · {site.hotline.label}
      </a>
    </div>
  );
}
