import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // The placeholder imagery in /public is SVG. Next refuses to optimize SVG
    // unless this is on; the CSP below keeps the served files inert. When the
    // client's real photography lands (jpg/webp), both lines can be dropped.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Swap local placeholders for the client's real CDN assets by changing the
    // `image` field in data/projects.ts to a jcxbd.com URL — no other change needed.
    remotePatterns: [
      { protocol: 'https', hostname: 'jcxbd.com' },
      { protocol: 'https', hostname: 'www.jcxbd.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
};

export default nextConfig;
