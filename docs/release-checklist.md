# Release checklist

Use the first part before publishing your portfolio. Use both parts before releasing a new version
of DevFolio Pro for sale.

## Part 1: Before publishing your portfolio

### Content
- [ ] `sampleContent` is `false` and `npm test` passes (no leftover sample text).
- [ ] `site.url`, `title`, `description` and `resume.fileName` are yours.
- [ ] Every outcome is true, and you can explain how it was measured.
- [ ] Every project link works and opens what its label says.
- [ ] Cover images have meaningful `alt` text and no confidential data in the screenshots.
- [ ] Spelling and grammar checked (paste the text into a spell checker).

### Functionality
- [ ] `npm run check` and `npm run build` succeed.
- [ ] Resume downloads, opens, fits on one or two pages, and its links work.
- [ ] Contact form: empty submit shows errors; a real message arrives in your inbox.
- [ ] Theme and light/dark switching work and are remembered after a reload.
- [ ] Every navigation link scrolls to its section, on the home page and from a case study.
- [ ] A made-up URL shows the custom 404 page.

### Responsive layout
- [ ] Phone (360 to 430 px wide): no horizontal scrolling, menu opens and closes.
- [ ] Tablet (768 to 1024 px) and desktop (1280 px and wider).
- [ ] Browser zoom at 200% keeps everything readable.

### Accessibility
- [ ] Tab through the whole page: the skip link appears first, focus is always visible, nothing is skipped.
- [ ] Mobile menu: Escape closes it and focus returns to the menu button.
- [ ] With reduced motion enabled in your operating system, nothing animates.
- [ ] A screen reader (VoiceOver, NVDA or TalkBack) announces headings, links and form errors sensibly.
- [ ] Lighthouse or axe DevTools reports no accessibility issues.

### SEO and sharing
- [ ] `/sitemap.xml` and `/robots.txt` load and use your domain.
- [ ] Link previews show the right title, description and image (test on LinkedIn).
- [ ] Lighthouse on the deployed site: Performance 90+, Accessibility, Best Practices and SEO 100.

## Part 2: Before releasing a new version of the kit

### Code
- [ ] Dependencies updated within compatible ranges; `npm audit` reviewed.
- [ ] CI passes on a clean clone: `npm ci && npm run check && npm run build && npm run build:static`.
- [ ] No console errors or hydration warnings in the browser, in `dev` and production builds.
- [ ] All three themes reviewed in light and dark on the home page, a case study and the 404 page.
- [ ] `config/` still contains the complete sample, with `sampleContent: true`.

### Deployment
- [ ] Fresh fork deploys to GitHub Pages using only the steps in `docs/deployment.md`.
- [ ] Fresh import deploys to Vercel with default settings.
- [ ] Static export served from a sub-path loads styles, images, the resume and case studies.

### Documentation and package
- [ ] README, guides and worksheets match the current code (option names, file paths, screenshots).
- [ ] `CHANGELOG` or release notes written.
- [ ] `LICENSE.md` placeholders filled in for this release.
- [ ] `npm run package:release` produces a zip without `marketing/`, `node_modules/` or build output.
- [ ] Unzip the package into a new folder, run `npm install && npm run dev`, and follow the
      quick start as a buyer would.
- [ ] Product page screenshots updated using `marketing/screenshot-plan.md`.
- [ ] `CHECKOUT_URL`, `DEMO_URL` and `SUPPORT_EMAIL` replaced in `marketing/index.html`, and prices confirmed.
- [ ] The `og:image` in `marketing/index.html` uses an absolute URL on your product domain.
