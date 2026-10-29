import type { Metadata, Viewport } from 'next';
import { site } from '@config';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { InlineScript } from '@/components/layout/inline-script';
import { RevealObserver } from '@/components/layout/reveal-observer';
import { SkipLink } from '@/components/layout/skip-link';
import { fontVariables } from '@/lib/fonts';
import { baseMetadata } from '@/lib/metadata';
import { getTheme, themeInitScript } from '@/lib/theme';
import './globals.css';

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: getTheme(site.theme.default).chrome.light },
    { media: '(prefers-color-scheme: dark)', color: getTheme(site.theme.default).chrome.dark },
  ],
};

const initScript = themeInitScript({
  theme: site.theme.default,
  mode: site.theme.defaultMode,
  allowThemeSwitch: site.theme.allowVisitorThemeSwitch,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const serverMode = site.theme.defaultMode === 'dark' ? 'dark' : 'light';
  return (
    <html
      lang={site.language}
      data-theme={site.theme.default}
      data-mode={serverMode}
      data-mode-preference={site.theme.defaultMode}
      data-scroll-behavior="smooth"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={initScript} />
      </head>
      <body id="top">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
