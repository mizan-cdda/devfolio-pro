# Architecture

DevFolio Pro is a statically generated Next.js App Router site. Content is typed data, components
are presentation only, and every route can be prerendered, so the same code deploys to a Node host
or as plain files.

## Principles

1. **Content is separate from presentation.** Everything personal lives in `config/`. Components
   import it through `@config` and never contain names, dates or URLs.
2. **Types are the contract.** `src/types/content.ts` describes every field, with comments. Strict
   TypeScript (including `noUncheckedIndexedAccess`) catches content mistakes at build time.
3. **Server components by default.** Only interactive pieces are client components: the theme
   picker, mobile menu, active navigation, contact form and scroll reveal. They add about 11 KB of
   gzipped JavaScript on top of the framework.
4. **No backend.** The resume, Open Graph images, sitemap and favicon are generated at build time
   by route handlers marked `force-static`. The contact form posts directly to a form service.
5. **Platform features first.** Native `<dialog>` for the mobile menu, radio inputs for the theme
   picker, `<time>`, `<dl>` and real lists for content. Less code and better accessibility.

## Request flow

```text
config/*.ts ──► @config (config/index.ts) ──► server components ──► static HTML
                                         ├──► src/resume  ──► /resume.pdf (route handler)
                                         ├──► src/lib/og  ──► /og.png, /projects/{slug}/og.png
                                         └──► sitemap.ts, robots.ts, manifest.ts, icon.svg
```

## Themes

`src/app/themes.css` sets CSS custom properties per `[data-theme]` and `[data-mode]` on `<html>`.
`src/app/globals.css` maps them to Tailwind utilities with `@theme inline`. An inline script in
`<head>` (`themeInitScript` in `src/lib/theme.ts`) reads `localStorage` and sets both attributes
before first paint. The client hook `useAppearance` reads them back with `useSyncExternalStore`,
so server and client render the same markup and there is no hydration mismatch.

## Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Sections toggled by `site.sections` |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | `generateStaticParams`, `dynamicParams = false` |
| `/resume.pdf` | `src/app/resume.pdf/route.tsx` | `@react-pdf/renderer`, built once |
| `/og.png`, `/projects/[slug]/og.png` | `route.tsx` files | `ImageResponse`, keeps the `.png` extension for static hosts |
| `/icon.svg`, `/apple-touch-icon.png` | `route.ts(x)` files | Generated from your initials |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | metadata files | |
| 404, errors, loading | `not-found.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx` | |

Open Graph images use route handlers instead of the `opengraph-image` convention so that the files
keep a `.png` extension in a static export, which GitHub Pages needs to send the right content type.

## Build targets

`next.config.ts` switches on `STATIC_EXPORT=true`: `output: 'export'`, trailing slashes and
unoptimized images (the sample covers are pre-sized WebP). `NEXT_PUBLIC_BASE_PATH` supports
sub-path hosting. Without those variables it is a normal Next.js build with full image optimization.

## Quality gates

- `npm run typecheck`: route type generation plus strict TypeScript.
- `npm run lint`: `eslint-config-next` Core Web Vitals and TypeScript rules (includes jsx-a11y).
- `npm test`: Vitest. Content integrity, contact validation and spam checks, form service requests,
  formatting, and WCAG AA contrast for every theme token in both modes.
- CI runs all of the above plus both build targets on every pull request.

## Design decisions

- **No proficiency bars or skill percentages.** They can't be defended in an interview.
- **No testimonials section.** Fabricated quotes are a trust risk; real ones belong on LinkedIn.
- **Outcome `context` is encouraged and tested.** Every number says how it was measured.
- **Fonts are self-hosted** so builds are deterministic and work offline or behind firewalls.
- **Dates are formatted by hand**, not with `Intl`, so server and browser output always match.
