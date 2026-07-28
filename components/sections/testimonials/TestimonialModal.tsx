'use client';

import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

/**
 * Full-story view. Radix Dialog gives focus trapping, Esc and click-outside
 * for free; the nav lets the reader move on without closing.
 */
export function TestimonialModal({
  testimonial,
  open,
  onOpenChange,
  onPrev,
  onNext,
}: {
  testimonial: Testimonial;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const meta = [
    { label: 'Name', value: testimonial.name },
    { label: 'Relationship', value: testimonial.role },
    // TODO: client to supply project attribution and dates.
    { label: 'Project', value: testimonial.project ?? 'To be confirmed' },
    { label: 'Year', value: testimonial.date ?? 'To be confirmed' },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm" />

        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-[90] max-h-[92svh] overflow-y-auto border-t border-white/15 bg-[#08090C] p-6 md:inset-0 md:m-auto md:h-fit md:max-h-[88svh] md:max-w-5xl md:border md:p-10"
          aria-describedby={undefined}
        >
          <div className="flex items-start justify-between gap-6">
            <Dialog.Title className="text-[0.68rem] font-semibold tracking-[0.24em] text-accent uppercase">
              {testimonial.role}
            </Dialog.Title>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous testimonial"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next testimonial"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden border border-white/15">
                {testimonial.medium === 'video' && testimonial.video ? (
                  <video
                    className="size-full object-cover"
                    src={testimonial.video}
                    poster={testimonial.videoPoster ?? testimonial.portrait}
                    controls
                    playsInline
                  />
                ) : (
                  <Image
                    src={testimonial.portrait}
                    alt={`Portrait of ${testimonial.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="md:col-span-7">
              <blockquote className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-white italic">
                &ldquo;{testimonial.fullQuote}&rdquo;
              </blockquote>

              <dl className="mt-8 border-t border-white/10">
                {meta.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3"
                  >
                    <dt className="text-[0.6rem] font-medium tracking-[0.22em] text-white/40 uppercase">
                      {row.label}
                    </dt>
                    <dd className="text-right text-[0.9rem] text-white">{row.value}</dd>
                  </div>
                ))}

                {testimonial.landownerDetail && (
                  <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3">
                    <dt className="text-[0.6rem] font-medium tracking-[0.22em] text-white/40 uppercase">
                      Land
                    </dt>
                    <dd className="text-right text-[0.9rem] text-white">
                      {testimonial.landownerDetail.kathaCount} katha ·{' '}
                      {testimonial.landownerDetail.location}
                    </dd>
                  </div>
                )}
              </dl>

              <a
                href="#projects"
                onClick={() => onOpenChange(false)}
                className="link-underline mt-7 inline-flex cursor-pointer text-[0.72rem] font-semibold tracking-[0.14em] text-accent uppercase"
              >
                More from this project →
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
