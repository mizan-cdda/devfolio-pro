# Customization

Everything here is configured in `config/` unless a section says otherwise.
Types for every option live in `src/types/content.ts`, with comments that your editor shows on hover.

## Site settings (`config/site.ts`)

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `url` | string | | Production URL, no trailing slash. `NEXT_PUBLIC_SITE_URL` overrides it |
| `language` | string | `en` | Sets `<html lang>` |
| `locale` | string | `en_US` | Open Graph locale |
| `title` | string | | Home page title |
| `titleSuffix` | string | | Other pages use `Page · {titleSuffix}` |
| `description` | string | | 50 to 160 characters |
| `keywords` | string[] | | |
| `theme.default` | `editorial` \| `studio` \| `ledger` | `editorial` | |
| `theme.defaultMode` | `light` \| `dark` \| `system` | `system` | `system` follows the visitor's device |
| `theme.allowVisitorThemeSwitch` | boolean | `true` | Shows the theme picker. Colour mode is always switchable |
| `sections.*` | boolean | all `true` | Hides a section and its navigation link |
| `resume.enabled` | boolean | `true` | Hides every resume button when `false` |
| `resume.source` | `generated` \| `file` | `generated` | See [Resume](#resume) |
| `resume.filePath` | string | | For `file`: a path in `public/`, such as `/cv.pdf` |
| `resume.fileName` | string | | Name of the downloaded file |
| `contact.*` | | | See [Contact form](contact-form.md) |
| `sampleContent` | boolean | `true` | Footer note, and enables leftover-content tests when `false` |

## Sections and navigation

Section order on the home page is set in `src/app/page.tsx`. Navigation and section numbers follow
`src/lib/navigation.ts`; reorder the `ORDER` array there to match, or rename a link in `LABELS`.
Turning a section off in `site.sections` removes both the section and its link, so nothing is left
pointing at a missing anchor.

## Resume

**Generated (default).** `/resume.pdf` is built from your content when you run `npm run build`.
The layout in `src/resume/resume-document.tsx` is single-column with real text and standard
headings, which applicant tracking systems parse reliably. It includes your summary, experience,
up to three featured projects, skills, education and certifications.

To adjust it, edit the styles at the top of `resume-document.tsx`. It uses the built-in Helvetica
font, which covers Western European languages. For other scripts, register a TTF font with
`Font.register` from `@react-pdf/renderer`.

**Your own file.** Put the PDF in `public/` (create the folder) and set:

```ts
resume: { enabled: true, source: 'file', filePath: '/jane-doe-cv.pdf', fileName: 'jane-doe-cv.pdf' },
```

## Fonts

Fonts are declared in `src/lib/fonts.ts` and assigned per theme in `src/app/themes.css`. Only the
active theme's fonts download. For the fastest first paint, set `preload: true` on the fonts your
chosen theme uses and `false` on the rest:

| Theme | Display | Body | Labels |
| --- | --- | --- | --- |
| Editorial | Fraunces | Inter | Inter |
| Studio | Inter Tight | Inter | Inter Tight |
| Ledger | IBM Plex Sans | IBM Plex Sans | JetBrains Mono |

To use another font, add its `.woff2` file to `src/fonts/`, declare it with `localFont` in
`src/lib/fonts.ts`, add it to `fontVariables`, and point a theme's `--font-*-family` at it.

## Favicon and social images

The favicon (`/icon.svg`), Apple touch icon and Open Graph images are generated from your name,
headline and theme. To use a logo instead, replace `src/app/icon.svg/route.ts` with a static
`public/icon.svg` and keep the same path.

## Animations

The only motion is a short fade-up as sections enter the viewport, plus hover states. Both are
disabled for visitors who prefer reduced motion. To remove the scroll effect entirely, delete
`<RevealObserver />` from `src/app/layout.tsx`; content is fully visible without it.

## Analytics

None is included, so there is no cookie banner to worry about. If you add one, prefer a
privacy-friendly service and load it with `next/script` and `strategy="afterInteractive"`.
