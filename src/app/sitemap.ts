import type { MetadataRoute } from 'next';
import { projects } from '@config';
import { absoluteUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
