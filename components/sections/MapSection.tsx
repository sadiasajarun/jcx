'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MapPin, Play } from 'lucide-react';
import { AREA_CENTERS, projects } from '@/data/projects';
import { Reveal } from '@/components/ui/Reveal';

// Leaflet touches `window`, so the map is client-only and code-split away
// from the initial bundle.
const ProjectsMap = dynamic(() => import('@/components/map/ProjectsMap'), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center bg-surface text-sm text-muted">
      Loading map…
    </div>
  ),
});

const AREAS = Object.keys(AREA_CENTERS);

export function MapSection() {
  const [mounted, setMounted] = useState(false);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mount on scroll-into-view as well as on click, so the map is ready by the
  // time the visitor reaches it without costing anything above the fold.
  useEffect(() => {
    if (mounted || !sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const countsByArea = useMemo(() => {
    return projects.reduce<Record<string, number>>((acc, p) => {
      acc[p.location] = (acc[p.location] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  return (
    <section id="map" aria-labelledby="map-heading" className="py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Find Us On The Map</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id="map-heading" className="display mt-6 text-[clamp(2.5rem,4.5vw,3.5rem)] text-ink">
            Explore JCX <span className="italic text-brand dark:text-accent">across Dhaka.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12" ref={sectionRef}>
          {/* ── Area list ─────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <ul className="card divide-y divide-[var(--line)] overflow-hidden">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMounted(true);
                    setActiveArea(null);
                  }}
                  aria-pressed={activeArea === null}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/5 ${
                    activeArea === null ? 'text-accent' : 'text-ink'
                  }`}
                >
                  <span className="text-sm font-medium">All locations</span>
                  <span className="text-[0.7rem] tabular-nums text-muted">{projects.length}</span>
                </button>
              </li>

              {AREAS.map((area) => {
                const count = countsByArea[area] ?? 0;
                const isActive = activeArea === area;
                return (
                  <li key={area}>
                    <button
                      type="button"
                      onClick={() => {
                        setMounted(true);
                        setActiveArea(area);
                      }}
                      aria-pressed={isActive}
                      className={`flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/5 ${
                        isActive ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-sm font-medium">
                        <MapPin
                          className={`size-4 ${isActive ? 'text-accent' : 'text-muted'}`}
                          aria-hidden
                        />
                        {area}
                      </span>
                      <span className="text-[0.7rem] tabular-nums text-muted">
                        {count > 0 ? count : '—'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-[0.75rem] leading-relaxed text-muted">
              Pin positions are approximate area markers. TODO: client to confirm exact
              coordinates per project.
            </p>
          </div>

          {/* ── Map ───────────────────────────────────────────── */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line md:aspect-[16/10]">
              {mounted ? (
                <ProjectsMap activeArea={activeArea} />
              ) : (
                <button
                  type="button"
                  onClick={() => setMounted(true)}
                  className="group relative size-full cursor-pointer"
                  aria-label="Load the interactive map of JCX projects"
                >
                  <Image
                    src="/images/map/map-cover.svg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    aria-hidden
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#000000]/45 transition-colors group-hover:bg-[#000000]/35">
                    <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/60 bg-black/25 text-accent backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <Play className="size-5" aria-hidden />
                    </span>
                    <span className="text-[0.75rem] font-medium tracking-[0.2em] text-white uppercase">
                      Load map
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
