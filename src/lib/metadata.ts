import type { Metadata } from 'next';
import { profile, site } from '@config';
import { absoluteUrl, siteUrl, withBasePath } from '@/lib/site-url';
import { OG_SIZE } from '@/lib/og-size';

export const baseMetadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: site.title, template: `%s · ${site.titleSuffix}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: absoluteUrl('/'),
    siteName: profile.name,
    title: site.title,
    description: site.description,
    images: [{ url: absoluteUrl('/og.png'), ...OG_SIZE, alt: `${profile.name}, ${profile.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [absoluteUrl('/og.png')],
  },
  icons: {
    icon: [{ url: withBasePath('/icon.svg'), type: 'image/svg+xml' }],
    apple: [{ url: withBasePath('/apple-touch-icon.png'), sizes: '180x180' }],
  },
  manifest: withBasePath('/manifest.webmanifest'),
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false, address: false },
};

/** schema.org Person data for search engines. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: site.description,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: profile.socials.filter((social) => social.href.startsWith('http')).map((social) => social.href),
  };
}

/** Serialises JSON-LD safely for an inline script tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
