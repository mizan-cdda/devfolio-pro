# Installation

## Requirements

- **Node.js 20.9 or newer.** Node 22 LTS is recommended and is what the GitHub workflows use (see `.nvmrc`).
  Check with `node -v`.
- **npm 10** (bundled with Node). pnpm, Yarn and Bun also work; replace `npm` in the commands below.
- **Git**, if you plan to deploy with GitHub Pages.

## 1. Get the code

Unzip the download, or create your own repository from it:

```bash
cd devfolio-pro
git init
git add .
git commit -m "Start from DevFolio Pro"
```

## 2. Install dependencies

```bash
npm install
```

The fonts are bundled in `src/fonts/`, so installs and builds never need to reach a font CDN.

## 3. Run it

```bash
npm run dev
```

Open http://localhost:3000. Changes to anything in `config/` or `src/` reload instantly.

## 4. Make it yours

Follow [Replacing the sample content](replacing-sample-content.md). It walks through each file
in `config/` in the order that gives the quickest result.

## 5. Check before you publish

```bash
npm run check          # typecheck, lint and tests
npm run build          # production build
npm start              # serve it at http://localhost:3000
```

The content tests catch common mistakes: duplicate project slugs, malformed dates, missing image
descriptions, expired certifications and, once `sampleContent` is `false`, any sample text you
forgot to replace.

## Optional environment variables

Copy `.env.example` to `.env.local`. All variables are optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Overrides `site.url`. Useful for preview deployments |
| `NEXT_PUBLIC_BASE_PATH` | Only for sub-path hosting such as `https://user.github.io/repo` |
| `STATIC_EXPORT` | `true` builds a static site into `out/`. `npm run build:static` sets it for you |

Next step: [Deployment](deployment.md).
