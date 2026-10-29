import type { Profile } from '@/types/content';

/**
 * Who you are. Everything here is sample content for a fictional person.
 * Replace it with your own details. See docs/replacing-sample-content.md.
 */
export const profile: Profile = {
  name: 'Jordan Avery',
  shortName: 'J. Avery',
  role: 'Full-stack and AI engineer',
  headline: 'I build calm, fast software for teams whose work can’t wait.',
  intro:
    'Eight years shipping React and Node products for logistics and healthcare. I care about measurable performance, accessible interfaces and AI features people actually trust.',
  location: 'Lisbon, Portugal',
  timezone: 'UTC+0, overlaps with US East mornings',
  email: 'hello@example.com',
  availability: {
    status: 'selective',
    label: 'Open to senior roles and select freelance work from March',
  },
  // Add a portrait with a static import, for example:
  //   import portrait from './images/portrait.webp';
  //   portrait: { src: portrait, alt: 'Jordan Avery smiling, standing in front of a window' },
  // Without one, a monogram is shown instead.
  primaryCta: { label: 'See selected work', href: '#projects' },

  about: {
    heading: 'Engineer first, product-minded always',
    paragraphs: [
      'I started as a frontend developer at a freight start-up, where a slow dashboard meant a missed pickup. That taught me to treat performance and clarity as features, not polish.',
      'Today I work across the stack: typed APIs, React interfaces, and the evaluation and guardrails that make language-model features safe to ship. I like small teams, written decisions and code that the next person can change without fear.',
      'Outside work I maintain a small open-source linting tool for translation files and mentor career-switchers through a local bootcamp.',
    ],
    highlights: [
      { value: '8 years', label: 'building production web apps' },
      { value: '3 domains', label: 'logistics, health and developer tools' },
      { value: 'Remote', label: 'with teams in 6 time zones since 2019' },
    ],
  },

  // Sample links point to each platform's home page so nothing is broken in the demo.
  // Replace them with your profile URLs and add a `handle` to show it next to the label.
  socials: [
    { platform: 'github', label: 'GitHub', href: 'https://github.com' },
    { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { platform: 'bluesky', label: 'Bluesky', href: 'https://bsky.app' },
    { platform: 'email', label: 'Email', href: 'mailto:hello@example.com', handle: 'hello@example.com' },
  ],
};
