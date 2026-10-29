import { projects } from '@config';
import type { Project } from '@/types/content';

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Previous and next project for the case study footer, wrapping around. */
export function getAdjacentProjects(slug: string): { previous: Project; next: Project } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return null;
  const previous = projects[(index - 1 + projects.length) % projects.length] as Project;
  const next = projects[(index + 1) % projects.length] as Project;
  return { previous, next };
}
