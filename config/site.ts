import type { SiteConfig } from '@/types/content';

/**
 * Site-wide settings: SEO, theme, which sections appear, resume and contact form.
 * See docs/customization.md for every option.
 */
export const site: SiteConfig = {
  url: 'https://devfolio-pro.example.com',
  language: 'en',
  locale: 'en_US',
  title: 'Jordan Avery · Full-stack and AI engineer',
  titleSuffix: 'Jordan Avery',
  description:
    'Jordan Avery is a full-stack engineer in Lisbon building fast, accessible web products and practical AI features for logistics and health teams.',
  keywords: ['full-stack engineer', 'Next.js', 'React', 'TypeScript', 'AI engineer', 'remote', 'portfolio'],

  theme: {
    default: 'editorial',
    defaultMode: 'system',
    allowVisitorThemeSwitch: true,
  },

  sections: {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    credentials: true,
    contact: true,
  },

  resume: {
    enabled: true,
    fileName: 'jordan-avery-resume.pdf',
    source: 'generated',
  },

  contact: {
    heading: 'Let’s talk about your next build',
    intro:
      'I reply within two working days. Share a little about the team, the problem and the timeline, and I will tell you honestly whether I am a good fit.',
    // The sample uses `mailto` so it works without any account.
    // For production, switch to a form service. See docs/contact-form.md.
    provider: { type: 'mailto' },
    minSecondsBeforeSubmit: 3,
  },

  sampleContent: true,
};
