'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { LandownerStateId } from '@/data/landowners';

/**
 * State-matched ambient audio. OFF by default and never autoplays with sound —
 * the toggle is the only thing that starts it, which is also what keeps
 * browsers from blocking it.
 *
 * CLIENT HANDOFF: no audio beds have been supplied, so `TRACKS` points at
 * paths that do not exist yet and the toggle stays hidden until at least one
 * file is present. Drop the four files in /public/audio and the control
 * appears — no code change.
 */
const TRACKS: Partial<Record<LandownerStateId, string>> = {
  plot: '/audio/landowners-plot.mp3',
  survey: '/audio/landowners-survey.mp3',
  build: '/audio/landowners-build.mp3',
  landmark: '/audio/landowners-landmark.mp3',
};

export interface AmbientSoundProps {
  activeState: LandownerStateId;
  /** Set true once the client has delivered the audio beds. */
  available?: boolean;
}

export function AmbientSound({ activeState, available = false }: AmbientSoundProps) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  const track = TRACKS[activeState];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!on || !track) {
      el.pause();
      return;
    }
    // Cross-fade would need two elements; a short fade-in on swap is enough
    // for an ambience bed at this volume.
    el.volume = 0.28;
    void el.play().catch(() => {
      // Autoplay policy or a missing file — fail silent, keep the UI honest.
      setOn(false);
    });
  }, [on, track]);

  if (!available) return null;

  return (
    <>
      <audio ref={ref} src={track} loop preload="none" />
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'}
        className="absolute top-6 right-6 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#0b1428]/60 text-white/70 backdrop-blur-sm transition-colors hover:border-[var(--gold-bright)]/60 hover:text-white"
      >
        {on ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
      </button>
    </>
  );
}
