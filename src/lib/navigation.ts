import { site } from '@config';
import type { SectionId } from '@/types/content';
import { withBasePath } from '@/lib/site-url';

export interface NavItem {
  id: SectionId;
  label: string;
  href: string;
}

const LABELS: Record<SectionId, string> = {
  about: 'About',
  skills: 'Skills',
  projects: 'Work',
  experience: 'Experience',
  credentials: 'Credentials',
  contact: 'Contact',
};

const ORDER: SectionId[] = ['about', 'skills', 'projects', 'experience', 'credentials', 'contact'];

/** Navigation follows `site.sections`, so a disabled section never leaves a dead link behind. */
export const navItems: NavItem[] = ORDER.filter((id) => site.sections[id]).map((id) => ({
  id,
  label: LABELS[id],
  href: `/#${id}`,
}));

export const sectionNumber = (id: SectionId): string =>
  String(navItems.findIndex((item) => item.id === id) + 1).padStart(2, '0');

/** Where the resume download points, or null when the resume is turned off. */
export function resumeHref(): string | null {
  if (!site.resume.enabled) return null;
  if (site.resume.source === 'file' && site.resume.filePath) return withBasePath(site.resume.filePath);
  return withBasePath('/resume.pdf');
}
