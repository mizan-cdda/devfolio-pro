# Themes

DevFolio Pro ships three themes. Each has a light and a dark mode, and each changes typography,
colour, corner radius and rule weight, not just colours.

| Theme | Personality | Suits |
| --- | --- | --- |
| **Editorial** | Fraunces serif headlines, warm paper tones, oxblood accent, soft corners | Senior engineers, writers, consultants, anyone who wants a calm, considered feel |
| **Studio** | Tight Inter Tight headlines, pure white or black, vermilion accent, square corners, heavy rules | Frontend and design engineers, freelancers who want a bold, graphic look |
| **Ledger** | IBM Plex Sans with JetBrains Mono labels, cool neutrals, deep green accent | Backend, data, platform and AI engineers who want a precise, technical feel |

## Choosing a theme

In `config/site.ts`:

```ts
theme: {
  default: 'ledger',
  defaultMode: 'system',          // 'light', 'dark' or 'system'
  allowVisitorThemeSwitch: false, // hide the theme picker, keep the light/dark switch
},
```

Visitors' choices are remembered in `localStorage`. A small inline script applies them before the
first paint, so the page never flashes the wrong theme.

## How themes work

`src/app/themes.css` defines the same set of CSS custom properties for each theme and mode:

| Token | Used for |
| --- | --- |
| `--bg`, `--surface`, `--surface-2` | Page background, cards, subtle fills |
| `--ink`, `--muted` | Main and secondary text |
| `--line`, `--line-strong` | Borders and rules |
| `--accent`, `--accent-ink` | Accent fills and the text on top of them |
| `--accent-text` | Accent-coloured small text, contrast-safe |
| `--accent-soft` | Tinted backgrounds |
| `--focus` | Keyboard focus ring |
| `--success`, `--danger` | Form states |
| `--font-display-family`, `--font-body-family`, `--font-meta-family` | Fonts |
| `--display-weight`, `--display-tracking`, `--display-leading` | Headline typesetting |
| `--meta-transform`, `--meta-tracking`, `--meta-size` | Small labels |
| `--card-radius`, `--control-radius`, `--rule-width` | Shape |

Tailwind utilities map to the tokens (`bg-surface`, `text-muted`, `border-line`, `rounded-card`,
`font-display`), so components never contain theme-specific colours.

## Changing colours

Edit the values in `themes.css`, then run `npm test`. The theme tests check that every text token
meets WCAG AA contrast (4.5:1) against the backgrounds in both modes, and fail with the exact pair
and ratio if one doesn't. Also update the matching `chrome` colours in `src/lib/theme.ts` (browser
UI colour) and the palette in `src/lib/og.tsx` (social preview images).

## Adding a fourth theme

1. Copy a theme's two blocks in `themes.css` and rename the selector, for example
   `[data-theme='mono']` and `[data-theme='mono'][data-mode='dark']`.
2. Add `'mono'` to the `ThemeName` type in `src/types/content.ts`.
3. Add an entry to `THEMES` in `src/lib/theme.ts` with a label, description and chrome colours.
4. Add a palette entry in `src/lib/og.tsx`.
5. Run `npm run check`. The contrast tests pick up the new theme automatically.
