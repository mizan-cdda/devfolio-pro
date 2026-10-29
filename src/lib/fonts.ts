import localFont from 'next/font/local';

/**
 * Every theme's fonts are declared here, but browsers only download the ones the active theme uses.
 * Set `preload: true` on the fonts of the theme you ship to improve first paint.
 * Fonts are self-hosted (SIL Open Font License, see src/fonts/OFL.txt), so builds never call out to a font CDN.
 */
export const fraunces = localFont({
  src: [
    { path: '../fonts/fraunces-latin-opsz-normal.woff2', style: 'normal', weight: '100 900' },
    { path: '../fonts/fraunces-latin-opsz-italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
});

export const interTight = localFont({
  src: '../fonts/inter-tight-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter-tight',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
});

export const plexSans = localFont({
  src: '../fonts/ibm-plex-sans-latin-wght-normal.woff2',
  weight: '100 700',
  variable: '--font-plex-sans',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
});

export const jetbrainsMono = localFont({
  src: '../fonts/jetbrains-mono-latin-wght-normal.woff2',
  weight: '100 800',
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
});

export const fontVariables = [fraunces, inter, interTight, plexSans, jetbrainsMono]
  .map((font) => font.variable)
  .join(' ');
