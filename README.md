# DevFolio Pro

A premium developer portfolio and resume kit built with Next.js 16, TypeScript and Tailwind CSS.
Edit one folder of typed content, pick one of three themes, and deploy a fast, accessible portfolio
with a matching PDF resume. No backend, no database.

> The repository ships with a complete sample portfolio for **Jordan Avery**, a fictional
> full-stack engineer. Every name, company and figure in the sample is invented so you can see how
> real content looks before you replace it.

## What's included

| Area | Details |
| --- | --- |
| Sections | Hero, about with highlights, grouped skills, featured projects, experience timeline, education, certifications and achievements, contact |
| Case studies | A page per project at `/projects/{slug}` with problem, approach, challenges, measured outcomes and learnings |
| Resume | A real PDF built from the same content at build time (`/resume.pdf`), designed to be readable by applicant tracking systems. Or ship your own file |
| Themes | **Editorial**, **Studio** and **Ledger**, each with light and dark modes, no flash on load, optional visitor theme picker |
| Contact | Validated form with honeypot and timing spam checks. Works with Formspree-style endpoints, Web3Forms or plain `mailto`, all without a server |
| SEO | Metadata, canonical URLs, Open Graph images per page, `sitemap.xml`, `robots.txt`, web manifest and schema.org `Person` data |
| Accessibility | Skip link, semantic landmarks, keyboard-friendly menus built on native elements, visible focus, WCAG AA contrast checked by tests, reduced-motion support |
| Hosting | GitHub Pages workflow included. Also runs on Vercel, Netlify, Cloudflare Pages or any static host |
| Docs | Installation, customization, sample-content replacement, themes, contact form, deployment, troubleshooting, release checklist, resume and case-study worksheets |

## Quick start

Requires Node.js 20.9 or newer (22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Then:

1. Edit the files in [`config/`](config) with your details. Start with `profile.ts` and `site.ts`.
2. Set `sampleContent: false` in `config/site.ts` when the content is yours.
3. Run `npm run check` to typecheck, lint and test your content.
4. Deploy. See [docs/deployment.md](docs/deployment.md).

## Documentation

| Guide | Read it when |
| --- | --- |
| [Installation](docs/installation.md) | Setting up for the first time |
| [Replacing the sample content](docs/replacing-sample-content.md) | Turning the sample into your portfolio, file by file |
| [Customization](docs/customization.md) | Changing sections, navigation, the resume and every config option |
| [Themes](docs/themes.md) | Choosing a theme, tuning colours and fonts, adding a fourth |
| [Contact form](docs/contact-form.md) | Connecting Formspree, Web3Forms or mailto, and how spam protection works |
| [Deployment](docs/deployment.md) | Publishing to GitHub Pages, Vercel, Netlify or another host |
| [Troubleshooting](docs/troubleshooting.md) | Something doesn't work |
| [Architecture](docs/architecture.md) | You want to understand or extend the code |
| [Resume worksheet](docs/worksheets/resume-worksheet.md) | Writing the content for your resume |
| [Case study worksheet](docs/worksheets/case-study-worksheet.md) | Writing project case studies with honest, measured outcomes |
| [Release checklist](docs/release-checklist.md) | Testing before you publish (or before selling the kit) |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build for Node hosts and Vercel (full image optimization) |
| `npm run build:static` | Static export to `out/` for GitHub Pages and other static hosts |
| `npm start` | Serve the production build locally |
| `npm run typecheck` | Generate route types and run TypeScript in strict mode |
| `npm run lint` | ESLint with the Next.js Core Web Vitals and TypeScript rules |
| `npm test` | Content, contact form, formatting and colour contrast tests |
| `npm run check` | All three checks above |

## Project structure

```text
config/                     Your content. The only folder most people need to edit.
  site.ts                   SEO, theme, sections, resume and contact settings
  profile.ts                Name, headline, about, availability, social links
  skills.ts                 Skill groups
  projects.ts               Projects and case studies
  experience.ts             Work history
  credentials.ts            Education, certifications, achievements
  images/                   Project covers (and your portrait)
src/
  app/                      Routes: home, case studies, 404, errors, resume.pdf, OG images, sitemap, robots
    globals.css             Tailwind setup and base styles
    themes.css              Design tokens for the three themes
  components/
    layout/                 Header, mobile menu, footer, skip link
    sections/               One component per home page section
    projects/               Project card and outcomes
    contact/                Contact form
    theme/                  Theme and colour mode picker
    ui/                     Buttons, section shell, tags
    icons/                  Social icons
  lib/                      Helpers: navigation, metadata, theme script, contact validation, formatting
  resume/                   PDF resume layout
  types/content.ts          Types for everything in config/
  fonts/                    Self-hosted fonts (SIL Open Font License)
tests/                      Vitest tests for content and logic
docs/                       Buyer documentation and worksheets
marketing/                  Product landing page and screenshot plan (not part of the buyer download)
.github/workflows/          CI and GitHub Pages deployment
```

## Tech stack

Versions were checked for compatibility on release. See `package.json` for exact ranges.

- Next.js 16.4 (App Router) and React 19.3
- TypeScript 6.0 in strict mode, with `noUncheckedIndexedAccess`
- Tailwind CSS 4.3
- lucide-react 1.x for interface icons, Simple Icons paths for brand icons
- @react-pdf/renderer 4.9 for the resume
- ESLint 9 with `eslint-config-next`, Vitest 5

TypeScript 6.0 and ESLint 9 are used instead of the newest majors because the Next.js lint
configuration's TypeScript and React plugins don't support TypeScript 7 or ESLint 10 yet.

## License

See [LICENSE.md](LICENSE.md). Bundled fonts are under the SIL Open Font License
([src/fonts/OFL.txt](src/fonts/OFL.txt)).
