'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import { AREA_CENTERS, DEFAULT_MAP_CENTER, projects } from '@/data/projects';
import { StatusChip } from '@/components/ui/StatusChip';
import 'leaflet/dist/leaflet.css';

/** accent JCX teardrop pin, drawn inline so there is no marker image request. */
const jcxPin = L.divIcon({
  className: 'jcx-pin',
  html: `
    <span style="display:block;filter:drop-shadow(0 4px 6px rgba(0,0,0,.45))">
      <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JCX project">
        <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z" fill="#2050A0"/>
        <circle cx="15" cy="14.5" r="10.5" fill="#EC1C2D"/>
        <circle cx="15" cy="14.5" r="8.5" fill="#FFFFFF"/>
        <text x="15" y="18.2" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8" font-weight="700" fill="#2050A0" letter-spacing="0.2">JCX</text>
      </svg>
    </span>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -38],
});

/** Imperatively flies the map when the visitor picks an area from the side list. */
function MapFlyTo({ area }: { area: string | null }) {
  const map = useMap();

  useEffect(() => {
    const target = area ? AREA_CENTERS[area] : DEFAULT_MAP_CENTER;
    if (!target) return;
    map.flyTo([target.lat, target.lng], target.zoom, { duration: 1.1 });
  }, [area, map]);

  return null;
}

export default function ProjectsMap({ activeArea }: { activeArea: string | null }) {
  const { resolvedTheme } = useTheme();

  // CARTO basemaps: Positron in light, Dark Matter in dark. No key required.
  const tiles = useMemo(
    () =>
      resolvedTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    [resolvedTheme],
  );

  return (
    <MapContainer
      center={[DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng]}
      zoom={DEFAULT_MAP_CENTER.zoom}
      scrollWheelZoom={false}
      className="size-full"
      aria-label="Map of JCX projects across Dhaka"
    >
      <TileLayer
        key={tiles}
        url={tiles}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <MapFlyTo area={activeArea} />

      {projects.map((project) => (
        <Marker key={project.slug} position={[project.lat, project.lng]} icon={jcxPin}>
          <Popup>
            <div className="overflow-hidden rounded-[0.9rem]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg leading-tight text-ink">{project.name}</h3>
                  <StatusChip status={project.status} />
                </div>
                <p className="mt-1 text-[0.75rem] text-muted">{project.location}</p>
                <Link
                  href="#contact"
                  className="mt-3 inline-block cursor-pointer text-[0.7rem] font-semibold tracking-[0.16em] text-accent uppercase"
                >
                  Enquire →
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
