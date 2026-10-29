import { profile } from '@config';
import { renderOgImage } from '@/lib/og';

// Served as /og.png. A route handler (rather than opengraph-image.tsx) keeps the .png extension,
// so static hosts such as GitHub Pages send the right content type to social networks.
export const dynamic = 'force-static';

export function GET() {
  return renderOgImage({ eyebrow: profile.location, title: profile.headline });
}
