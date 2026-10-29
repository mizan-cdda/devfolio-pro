import { profile, site } from '@config';
import { initials } from '@/lib/format';
import { getTheme } from '@/lib/theme';

export const dynamic = 'force-static';

/** Favicon with your initials, generated from the config. Replace with a file in public/ if you have a logo. */
export function GET() {
  const { dark } = getTheme(site.theme.default).chrome;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${dark}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#fff">${initials(profile.name)}</text></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
