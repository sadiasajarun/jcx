'use client';

import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';
import { Odometer } from '@/components/ui/Odometer';
import { testimonialStats } from '@/data/testimonials';

export function TestimonialCounter() {
  const items = [
    { value: testimonialStats.stories, label: testimonialStats.stories === 1 ? 'story' : 'stories' },
    { value: testimonialStats.videos, label: testimonialStats.videos === 1 ? 'video' : 'videos' },
    {
      value: testimonialStats.languages,
      label: testimonialStats.languages === 1 ? 'language' : 'languages',
    },
  ];

  return (
    <p className="flex items-baseline gap-3 text-[0.7rem] tracking-[0.16em] text-white/45 uppercase">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-baseline gap-1.5">
          <span className="font-display text-lg text-white/80">
            <Odometer value={item.value} />
          </span>
          {item.label}
          {i < items.length - 1 && (
            <span className="ml-2 text-white/20" aria-hidden>
              ·
            </span>
          )}
        </span>
      ))}
      <span className="sr-only">
        {testimonialStats.stories} stories, {testimonialStats.videos} videos,{' '}
        {testimonialStats.languages} languages
      </span>
    </p>
  );
}

export function StageControls({
  list,
  activeIndex,
  playing,
  durationMs,
  onJump,
  onTogglePlay,
  onReadAll,
}: {
  list: Testimonial[];
  activeIndex: number;
  playing: boolean;
  durationMs: number;
  onJump: (index: number) => void;
  onTogglePlay: () => void;
  onReadAll: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
      <TestimonialCounter />

      {/* Progress dots + autoplay rail. */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2.5">
          {list.map((testimonial, i) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Go to ${testimonial.name}'s testimonial`}
              aria-current={i === activeIndex}
              className="cursor-pointer p-1.5"
            >
              <span
                className={`block size-1.5 rounded-full transition-all duration-400 ${
                  i === activeIndex ? 'scale-150 bg-accent' : 'bg-white/25 hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="h-px w-40 overflow-hidden bg-white/12" aria-hidden>
          <motion.div
            key={`${activeIndex}-${playing}`}
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: playing ? '100%' : '0%' }}
            transition={{ duration: playing ? durationMs / 1000 : 0, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? 'Pause autoplay' : 'Resume autoplay'}
          className="inline-flex cursor-pointer items-center gap-2 text-[0.7rem] tracking-[0.16em] text-white/60 uppercase transition-colors hover:text-accent"
        >
          {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </button>

        <button
          type="button"
          onClick={onReadAll}
          className="link-underline cursor-pointer text-[0.72rem] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:text-accent"
        >
          Read all testimonials →
        </button>
      </div>
    </div>
  );
}
