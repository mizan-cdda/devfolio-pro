import type { SkillGroup } from '@/types/content';

/** Group skills the way a hiring manager scans them. Mark the ones you want to be hired for as `core`. */
export const skills: SkillGroup[] = [
  {
    name: 'Frontend',
    description: 'Interfaces that stay fast and accessible as they grow.',
    skills: [
      { name: 'TypeScript', core: true },
      { name: 'React', core: true },
      { name: 'Next.js', core: true },
      { name: 'Tailwind CSS' },
      { name: 'Accessibility (WCAG 2.2)', core: true },
      { name: 'Web performance' },
      { name: 'Testing Library' },
      { name: 'Playwright' },
    ],
  },
  {
    name: 'Backend and data',
    description: 'Typed services and data models that are easy to reason about.',
    skills: [
      { name: 'Node.js', core: true },
      { name: 'PostgreSQL', core: true },
      { name: 'tRPC' },
      { name: 'REST and webhooks' },
      { name: 'Redis' },
      { name: 'Prisma' },
    ],
  },
  {
    name: 'AI engineering',
    description: 'Language-model features with evaluation and human review built in.',
    skills: [
      { name: 'Retrieval-augmented generation', core: true },
      { name: 'Prompt and eval design', core: true },
      { name: 'Embeddings and pgvector' },
      { name: 'Structured outputs' },
      { name: 'Python' },
    ],
  },
  {
    name: 'Delivery',
    description: 'The habits that keep a team shipping.',
    skills: [
      { name: 'GitHub Actions' },
      { name: 'Docker' },
      { name: 'AWS (ECS, S3, CloudFront)' },
      { name: 'Observability with OpenTelemetry' },
      { name: 'Technical writing' },
      { name: 'Mentoring' },
    ],
  },
];
