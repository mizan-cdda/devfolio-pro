import type { NextConfig } from 'next';

/**
 * Two build targets share one codebase:
 *   - `npm run build`         Node/Vercel build with full image optimization.
 *   - `npm run build:static`  Static export to `out/` for GitHub Pages or any static host.
 *
 * NEXT_PUBLIC_BASE_PATH is only needed when the site is served from a sub-path,
 * for example https://<user>.github.io/<repo>. The GitHub Pages workflow sets it for you.
 */
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: basePath || undefined,
  trailingSlash: isStaticExport,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Static hosts cannot run the image optimizer, so sample images ship pre-sized as WebP.
    unoptimized: isStaticExport,
    formats: ['image/avif', 'image/webp'],
  },
  serverExternalPackages: ['@react-pdf/renderer'],
};

export default nextConfig;
