# Screenshot plan

Screenshots for the product page, marketplace listings (Gumroad, Lemon Squeezy, Envato-style
galleries) and social posts. The current set lives in `marketing/screenshots/` and was captured
from the sample portfolio.

## Capture settings

| Setting | Desktop | Mobile |
| --- | --- | --- |
| Viewport | 1440 × 900 | 390 × 844 |
| Device scale | 1× (export at 1440 wide) | 2× (export at 780 wide) |
| Format | WebP, quality 78 to 80 | WebP, quality 78 to 80 |
| Motion | Reduced motion on, so reveal effects are finished | Same |
| Browser chrome | None (crop to the page) | None |
| Content | Sample portfolio, `sampleContent: true` | Same |

Set the theme and mode before loading the page by writing `devfolio:theme` (`editorial`, `studio`,
`ledger`) and `devfolio:mode` (`light`, `dark`) to `localStorage`, or use the picker and reload.
Wait for fonts to load (`document.fonts.ready`) before capturing.

## Shot list

| # | File | Theme / mode | Page and state | Used for |
| --- | --- | --- | --- | --- |
| 1 | `hero-editorial-light.webp` | Editorial / light | Home, top | Product page hero, listing cover, Open Graph |
| 2 | `hero-studio-light.webp` | Studio / light | Home, top | Theme comparison |
| 3 | `hero-ledger-dark.webp` | Ledger / dark | Home, top | Theme comparison |
| 4 | `hero-editorial-dark.webp` | Editorial / dark | Home, top | Dark mode feature |
| 5 | `projects-editorial-light.webp` | Editorial / light | Home, `#projects` | Project cards and outcomes |
| 6 | `case-study-studio-light.webp` | Studio / light | `/projects/clinical-notes-assistant` | Case study feature |
| 7 | `contact-ledger-light.webp` | Ledger / light | Home, `#contact` | Contact form feature |
| 8 | `mobile-menu-editorial.webp` | Editorial / light | Home, mobile menu open | Mobile feature |
| 9 | `mobile-hero-studio-dark.webp` | Studio / dark | Home, top, mobile | Mobile feature |

## Still to capture by hand

These need a person or editing software:

| # | Subject | How |
| --- | --- | --- |
| 10 | Resume PDF | Open `/resume.pdf`, capture page 1 at 100% on a neutral background |
| 11 | Config editing | VS Code with `config/profile.ts` open beside the running site, showing a type hint |
| 12 | Theme switching | 6 to 10 second screen recording (MP4 or GIF under 5 MB) of the Appearance menu cycling themes |
| 13 | Lighthouse | Report of the deployed demo with scores visible |
| 14 | Listing cover | 1280 × 720 composite: shots 1 to 3 overlapped at an angle on a plain background, with the product name |

## Rules

- Never show real personal data. Only the fictional sample.
- Re-capture after any visual change and before each release (see `docs/release-checklist.md`).
- Keep file names stable so the product page and listings don't break.
- Describe every image in its `alt` text on the product page.
