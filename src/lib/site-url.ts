import { site } from '@config';

/** Absolute site URL without a trailing slash. Includes the base path when hosted on a sub-path. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, '');

/** Base path for sub-path hosting such as GitHub Pages project sites. Empty for root hosting. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/**
 * Prefix a root-relative asset path with the base path. `next/link` and static image imports do this
 * automatically; plain `<a href>` to files in `public/` or route handlers need this helper.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

/** Static exports use trailing slashes (`/projects/x/`) so every route maps to an index.html. */
const trailingSlash = process.env.STATIC_EXPORT === 'true';

/** Absolute URL for a route, for canonical links, the sitemap and Open Graph. */
export function absoluteUrl(path = '/'): string {
  if (path === '/') return `${siteUrl}/`;
  const isFile = /\.[a-z0-9]+$/i.test(path);
  const normalised = trailingSlash && !isFile && !path.endsWith('/') ? `${path}/` : path;
  return `${siteUrl}${normalised}`;
}
