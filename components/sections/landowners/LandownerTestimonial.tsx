'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import {
  landownerTestimonials,
  landownersCopy,
  type LandownerTestimonial as Testimonial,
} from '@/data/landowners';

export interface LandownerTestimonialProps {
  reduced: boolean;
}

/**
 * The State-5 payoff. When `landownerTestimonials` is empty — which it is
 * until the client supplies footage — this renders the awaiting-testimonial
 * card the brief calls for, turning the gap into an invitation rather than
 * shipping a fake quote.
 */
export function LandownerTestimonial({ reduced }: LandownerTestimonialProps) {
  const [index, setIndex] = useState(0);
  const items = landownerTestimonials;
  const current: Testimonial | undefined = items[index];

  return (
    <div className="flex flex-col items-center">
      <p className="display text-[1.05rem] italic text-white/55">
        {landownersCopy.testimonialHeader}
      </p>

      <div className="mt-8 flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-10">
        {/* Left fragment */}
        <Fragment text={current?.fragments[0]} align="lg:text-right" />

        {current ? (
          <VideoCard item={current} reduced={reduced} />
        ) : (
          <AwaitingCard />
        )}

        {/* Right fragment */}
        <Fragment text={current?.fragments[1]} align="lg:text-left" />
      </div>

      {/* Rotation arrows — only when the client has given us more than one. */}
      {items.length > 1 && (
        <div className="mt-6 flex items-center gap-4">
          <RotateButton
            label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </RotateButton>
          <span className="text-[0.7rem] tracking-[0.18em] text-white/45">
            {index + 1} / {items.length}
          </span>
          <RotateButton
            label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </RotateButton>
        </div>
      )}
    </div>
  );
}

function Fragment({ text, align }: { text?: string; align: string }) {
  if (!text) return <div className="hidden lg:block lg:w-56" aria-hidden />;
  return (
    <p
      className={`display max-w-[18rem] text-center text-[1.05rem] leading-snug italic text-white/65 lg:w-56 ${align}`}
    >
      &ldquo;{text}&rdquo;
    </p>
  );
}

function VideoCard({ item, reduced }: { item: Testimonial; reduced: boolean }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          // `▶ PLAY` cursor affordance — the section swaps the cursor via CSS.
          className="lo-cursor-play group relative w-[260px] shrink-0 overflow-hidden rounded-2xl border border-[var(--gold)]/45 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.8)] md:w-[300px]"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/* Muted preview loop; reduced motion gets the poster only. */}
          {item.video && !reduced ? (
            <video
              src={item.video}
              poster={item.poster ?? undefined}
              muted
              loop
              autoPlay
              playsInline
              className="size-full object-cover"
              aria-hidden
            />
          ) : item.poster ? (
            <Image src={item.poster} alt="" fill sizes="300px" className="object-cover" aria-hidden />
          ) : null}

          <span className="absolute inset-0 bg-gradient-to-t from-[#05070d]/88 via-[#05070d]/10 to-transparent" aria-hidden />

          <span className="absolute inset-x-0 bottom-0 p-5 text-left">
            <span className="display block text-[0.95rem] leading-snug italic text-white">
              &ldquo;{item.quote}&rdquo;
            </span>
            <span className="mt-2 block text-[0.66rem] font-medium tracking-[0.18em] text-[var(--gold-bright)] uppercase">
              {item.name} · {item.role}
            </span>
          </span>

          <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--gold-bright)]/70 bg-[#0b1428]/60 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Play className="size-5 fill-white text-white" aria-hidden />
          </span>

          <span className="sr-only">Play the testimonial from {item.name}</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[70] w-[min(94vw,420px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--gold)]/35 bg-[#0b1428] shadow-2xl">
          <Dialog.Title className="sr-only">
            Landowner testimonial — {item.name}
          </Dialog.Title>

          {item.video && (
            <video
              src={item.video}
              poster={item.poster ?? undefined}
              controls
              autoPlay
              playsInline
              className="w-full"
              style={{ aspectRatio: '3 / 4' }}
            />
          )}

          <div className="p-5">
            <p className="display text-[1.05rem] text-white">{item.name}</p>
            <p className="mt-1 text-[0.74rem] tracking-[0.14em] text-white/55 uppercase">
              {item.role} · {item.project}
            </p>
            <a
              href="#testimonials"
              className="link-underline mt-4 inline-flex cursor-pointer text-[0.74rem] font-semibold tracking-[0.14em] text-[var(--gold-bright)] uppercase"
            >
              Read more testimonials
              <ChevronRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <Dialog.Close
            aria-label="Close"
            className="absolute top-3 right-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white/80 transition-colors hover:text-white"
          >
            <X className="size-4" aria-hidden />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Shown while the client has no footage. Deliberately not a fake quote — it
 * states the gap and asks for a contribution.
 */
function AwaitingCard() {
  return (
    <div
      className="flex w-[260px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--gold)]/40 bg-[#0b1428]/55 p-7 text-center md:w-[300px]"
      style={{ aspectRatio: '3 / 4' }}
    >
      <span className="flex size-12 items-center justify-center rounded-full border border-[var(--gold-bright)]/50">
        <Play className="size-4 text-[var(--gold-bright)]" aria-hidden />
      </span>
      <p className="display text-[1.05rem] text-white">{landownersCopy.awaiting.title}</p>
      <p className="text-[0.82rem] leading-relaxed text-white/55">
        {landownersCopy.awaiting.body}
      </p>
      <a
        href="#contact"
        className="link-underline cursor-pointer text-[0.7rem] font-semibold tracking-[0.16em] text-[var(--gold-bright)] uppercase"
      >
        Share yours
      </a>
    </div>
  );
}

function RotateButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[var(--gold-bright)]/60 hover:text-white"
    >
      {children}
    </button>
  );
}
