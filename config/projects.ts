import type { Project } from '@/types/content';
import dispatchCover from './images/project-dispatch.webp';
import clinicCover from './images/project-clinic-notes.webp';
import designSystemCover from './images/project-design-system.webp';
import lintCover from './images/project-i18n-lint.webp';

/**
 * Projects appear in this order. `featured: true` puts a project on the home page;
 * every project gets its own case study page at /projects/{slug}.
 *
 * The sample projects, clients and numbers are fictional. Publish only outcomes you can
 * explain in an interview, and say how each number was measured.
 * The worksheet in docs/worksheets/case-study-worksheet.md helps you write these.
 */
export const projects: Project[] = [
  {
    slug: 'freight-dispatch-console',
    title: 'Freight dispatch console',
    summary:
      'Rebuilt a slow dispatch dashboard into a real-time console that planners trust during the morning rush.',
    role: 'Lead frontend engineer',
    period: '2023 – 2024',
    context: 'Kestrel Freight (fictional), regional logistics',
    cover: {
      src: dispatchCover,
      alt: 'Dispatch console showing a list of loads beside a route timeline with status colours.',
    },
    stack: ['Next.js', 'TypeScript', 'WebSockets', 'PostgreSQL', 'Playwright'],
    featured: true,
    links: [],
    caseStudy: {
      problem:
        'Planners assigned around 900 loads each morning in a dashboard that re-rendered the full table on every update. On busy days input lag passed half a second and planners kept a spreadsheet open as a backup.',
      approach: [
        'Measured first: added field metrics for interaction latency and recorded five planner sessions to find the slow paths.',
        'Moved updates to a WebSocket stream with per-row patches, and virtualised the table so only visible rows render.',
        'Redesigned the assignment flow around the keyboard, with shortcuts that match how planners already worked.',
        'Shipped behind a flag to one depot, compared metrics for two weeks, then rolled out.',
      ],
      challenges: [
        {
          title: 'Ordering of live updates',
          detail:
            'Out-of-order messages briefly showed stale assignments. A per-load version number let the client drop older patches safely.',
        },
        {
          title: 'Trust during rollout',
          detail:
            'Planners were wary of losing the spreadsheet. We kept a CSV export and removed it only after usage dropped to zero.',
        },
      ],
      outcomes: [
        { value: '−63%', label: 'interaction latency', context: 'p75 INP, 520 ms to 190 ms, field data over 28 days' },
        { value: '−18%', label: 'time to assign the morning queue', context: 'median across 3 depots, 6 weeks before and after' },
        { value: '0', label: 'backup spreadsheets in use', context: 'eight weeks after full rollout' },
      ],
      learnings: [
        'Recording real sessions found problems that synthetic benchmarks missed.',
        'Keyboard support was the most requested feature once planners knew it existed.',
      ],
    },
  },
  {
    slug: 'clinical-notes-assistant',
    title: 'Clinical notes assistant',
    summary:
      'An AI drafting tool that turns visit transcripts into structured notes, with clinicians reviewing every line.',
    role: 'Full-stack and AI engineer',
    period: '2024',
    context: 'Harbourline Health (fictional), outpatient clinics',
    cover: {
      src: clinicCover,
      alt: 'Notes editor with a drafted summary on the left and highlighted source transcript on the right.',
    },
    stack: ['React', 'Node.js', 'Python', 'pgvector', 'Structured outputs'],
    featured: true,
    links: [],
    caseStudy: {
      problem:
        'Clinicians spent evenings finishing visit notes. Leadership wanted AI help, but clinicians would not use anything that could invent details.',
      approach: [
        'Interviewed eight clinicians and defined the note format with them before writing any prompts.',
        'Generated each section as structured output with links back to the transcript lines that support it.',
        'Built an evaluation set of 120 anonymised visits and a review rubric scored by two clinicians.',
        'Made review the default: nothing is saved until a clinician accepts or edits each section.',
      ],
      challenges: [
        {
          title: 'Unsupported statements',
          detail:
            'Early drafts added plausible but unstated details. Requiring a source citation for every sentence, and flagging uncited ones, cut these sharply.',
        },
        {
          title: 'Privacy',
          detail:
            'Transcripts never left the clinic’s cloud region, and evaluation data was anonymised before engineers could see it.',
        },
      ],
      outcomes: [
        { value: '−31%', label: 'time spent on notes', context: 'self-reported, pilot of 14 clinicians over 4 weeks' },
        { value: '97%', label: 'sentences with a valid citation', context: 'evaluation set of 120 visits' },
        { value: '11 of 14', label: 'pilot clinicians kept using it', context: 'after the pilot ended' },
      ],
      learnings: ['The evaluation set was the most valuable thing we built. It made every prompt change a measurable decision.'],
    },
  },
  {
    slug: 'shared-design-system',
    title: 'Shared design system',
    summary:
      'A typed, accessible component library that replaced three diverging UI kits across product teams.',
    role: 'Frontend engineer, design system owner',
    period: '2021 – 2023',
    context: 'Tessellate Analytics (fictional), B2B analytics',
    cover: {
      src: designSystemCover,
      alt: 'Grid of interface components including buttons, inputs, tabs and a data table in two colour modes.',
    },
    stack: ['React', 'TypeScript', 'Storybook', 'CSS variables', 'axe-core'],
    featured: true,
    links: [],
    caseStudy: {
      problem:
        'Three product teams maintained separate component kits. The same date picker existed four times, and accessibility fixes had to be made in each one.',
      approach: [
        'Audited every screen to find the 24 components that covered most of the interface.',
        'Built them with design tokens, keyboard support and automated accessibility checks in CI.',
        'Wrote migration guides and paired with each team on their first screens.',
      ],
      challenges: [
        {
          title: 'Adoption without a mandate',
          detail:
            'Teams adopted the library when it saved them time, so we prioritised the components they were about to rebuild anyway.',
        },
      ],
      outcomes: [
        { value: '3 → 1', label: 'component libraries', context: 'within 14 months' },
        { value: '−42%', label: 'accessibility issues found in audits', context: 'annual external audit, year over year' },
      ],
    },
  },
  {
    slug: 'translation-file-linter',
    title: 'Translation file linter',
    summary: 'A small open-source CLI that catches missing keys and broken placeholders in translation files before release.',
    role: 'Author and maintainer',
    period: '2022 – present',
    context: 'Personal open-source project',
    cover: {
      src: lintCover,
      alt: 'Terminal output listing missing translation keys grouped by locale.',
    },
    stack: ['TypeScript', 'Node.js', 'GitHub Actions'],
    featured: false,
    links: [],
    caseStudy: {
      problem:
        'Missing translation keys only showed up in production, as raw key names on screen in languages the team did not read.',
      approach: [
        'Compared every locale with the source locale and checked that placeholders match.',
        'Shipped a GitHub Action so teams get annotations on the pull request.',
      ],
      challenges: [
        {
          title: 'Many file formats',
          detail: 'Supporting JSON, YAML and ICU messages pushed the design towards small, testable parsers per format.',
        },
      ],
      outcomes: [{ value: '4 formats', label: 'supported', context: 'JSON, YAML, ICU and PO' }],
    },
  },
];
