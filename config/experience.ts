import type { Experience } from '@/types/content';

/**
 * Most recent first. Omit `end` for your current role.
 * The companies below are fictional sample content.
 */
export const experience: Experience[] = [
  {
    company: 'Harbourline Health',
    role: 'Senior full-stack engineer',
    employment: 'Full-time',
    location: 'Remote, Portugal',
    start: '2024-01',
    summary: 'Building clinician-facing tools and the AI features behind them for an outpatient clinic network.',
    achievements: [
      'Led the clinical notes assistant from discovery to a 14-clinician pilot, with evaluation and review built in.',
      'Introduced a weekly accessibility review that cleared the backlog of keyboard issues in two quarters.',
      'Mentor two engineers through the company’s first internal promotion track.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL'],
  },
  {
    company: 'Kestrel Freight',
    role: 'Frontend lead',
    employment: 'Full-time',
    location: 'Lisbon, Portugal',
    start: '2021-06',
    end: '2023-12',
    summary: 'Owned the planner and driver web apps for a regional freight network.',
    achievements: [
      'Rebuilt the dispatch console with live updates and keyboard-first flows, cutting interaction latency by 63%.',
      'Set up visual regression and end-to-end tests that ran on every pull request.',
      'Hired and onboarded three frontend engineers.',
    ],
    stack: ['Next.js', 'TypeScript', 'WebSockets', 'Playwright'],
  },
  {
    company: 'Tessellate Analytics',
    role: 'Frontend engineer',
    employment: 'Full-time',
    location: 'Porto, Portugal',
    start: '2018-09',
    end: '2021-05',
    summary: 'Worked on dashboards for B2B analytics customers and created the shared design system.',
    achievements: [
      'Consolidated three UI kits into one typed, accessible component library.',
      'Cut dashboard bundle size by a third by splitting chart code per route.',
    ],
    stack: ['React', 'TypeScript', 'Storybook', 'D3'],
  },
  {
    company: 'Independent',
    role: 'Web developer',
    employment: 'Freelance',
    location: 'Lisbon, Portugal',
    start: '2017-01',
    end: '2018-08',
    summary: 'Built websites and small booking tools for local businesses.',
    achievements: ['Delivered eleven client projects, most of them still maintained by the same clients today.'],
    stack: ['JavaScript', 'PHP', 'WordPress'],
  },
];
