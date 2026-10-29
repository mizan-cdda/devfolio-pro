import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { profile, site } from '@config';
import type { ThemeName } from '@/types/content';

import { OG_SIZE } from './og-size';

/** Open Graph colours per theme (light mode), so social previews match the site. */
const palette: Record<ThemeName, { bg: string; ink: string; muted: string; accent: string; line: string; serif: boolean }> = {
  editorial: { bg: '#f5f1e8', ink: '#1d1a16', muted: '#5d574e', accent: '#8e2f1f', line: '#ddd5c6', serif: true },
  studio: { bg: '#ffffff', ink: '#0a0a0a', muted: '#545452', accent: '#cc3814', line: '#0a0a0a', serif: false },
  ledger: { bg: '#f3f5f4', ink: '#111816', muted: '#52605b', accent: '#1d6c59', line: '#d6dedb', serif: false },
};

// Satori (behind ImageResponse) reads TTF, OTF and WOFF, not WOFF2, so OG images use these copies.
const fontDir = join(process.cwd(), 'src/fonts/og');
const fonts = Promise.all([
  readFile(join(fontDir, 'fraunces-latin-400-normal.woff')),
  readFile(join(fontDir, 'inter-latin-500-normal.woff')),
]);

interface OgImageOptions {
  eyebrow: string;
  title: string;
  description?: string;
}

/** Renders a 1200×630 social preview image at build time. */
export async function renderOgImage({ eyebrow, title, description }: OgImageOptions): Promise<ImageResponse> {
  const [serif, sans] = await fonts;
  const colors = palette[site.theme.default];
  const displayFont = colors.serif ? 'Fraunces' : 'Inter';
  const titleSize = title.length > 60 ? 64 : title.length > 36 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: colors.bg,
          color: colors.ink,
          padding: '72px 80px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 24, color: colors.muted, letterSpacing: 2, textTransform: 'uppercase' }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: colors.accent }} />
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontFamily: displayFont, fontSize: titleSize, lineHeight: 1.04, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          {description ? (
            <div style={{ fontSize: 30, lineHeight: 1.4, color: colors.muted, maxWidth: 960 }}>{description}</div>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `2px solid ${colors.line}`,
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <span>{profile.name}</span>
          <span style={{ color: colors.muted }}>{profile.role}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Fraunces', data: serif, weight: 400, style: 'normal' },
        { name: 'Inter', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
