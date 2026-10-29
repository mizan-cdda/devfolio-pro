import type { PortfolioContent } from '@/types/content';
import { credentials } from './credentials';
import { experience } from './experience';
import { profile } from './profile';
import { projects } from './projects';
import { site } from './site';
import { skills } from './skills';

/** Single entry point for all portfolio content. Components import from here, never from files directly. */
export const content: PortfolioContent = {
  site,
  profile,
  skills,
  projects,
  experience,
  credentials,
};

export { credentials, experience, profile, projects, site, skills };
