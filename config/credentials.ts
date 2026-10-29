import type { Credentials } from '@/types/content';

/**
 * Education, certifications and achievements. Fictional sample content.
 * Leave a list empty to hide that column. Remove certifications that have expired.
 */
export const credentials: Credentials = {
  education: [
    {
      institution: 'Atlantic Institute of Technology',
      qualification: 'BSc, Computer Science',
      location: 'Lisbon, Portugal',
      start: '2013-09',
      end: '2016-07',
      notes: 'Final project on offline-first web apps for field workers.',
    },
  ],
  certifications: [
    {
      name: 'Cloud Developer, Associate',
      issuer: 'Sample Cloud Academy',
      issued: '2024-04',
      expires: '2027-04',
    },
    {
      name: 'Web Accessibility Specialist',
      issuer: 'Sample Accessibility Board',
      issued: '2022-10',
    },
  ],
  achievements: [
    {
      title: 'Talk: Measuring what planners feel',
      detail: 'Regional web performance meetup, on field metrics for internal tools.',
      year: '2024',
    },
    {
      title: 'Open-source maintainer',
      detail: 'Author of a translation file linter used in CI by several product teams.',
      year: '2022 – present',
    },
    {
      title: 'Bootcamp mentor',
      detail: 'Volunteer mentor for career-switchers learning web development.',
      year: '2020 – present',
    },
  ],
};
