import type { MetadataRoute } from 'next';
import { profile, site } from '@config';
import { getTheme } from '@/lib/theme';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  const colors = getTheme(site.theme.default).chrome;
  return {
    name: site.title,
    short_name: profile.shortName,
    description: site.description,
    start_url: '.',
    display: 'browser',
    background_color: colors.light,
    theme_color: colors.light,
    icons: [
      { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: 'apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
