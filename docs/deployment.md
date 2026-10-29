# Deployment

DevFolio Pro builds to static files, so it runs on almost any host. Pick one:

| Host | Build command | Output | Image optimization | Cost |
| --- | --- | --- | --- | --- |
| **GitHub Pages** (workflow included) | `npm run build:static` | `out/` | Pre-sized WebP images | Free |
| **Vercel** | `npm run build` | automatic | Automatic AVIF/WebP resizing | Free tier |
| Netlify, Cloudflare Pages, any static host | `npm run build:static` | `out/` | Pre-sized WebP images | Free tiers |

Before any deployment, run `npm run check` and set `site.url` in `config/site.ts`.

## GitHub Pages: quick start

The workflow in `.github/workflows/deploy-pages.yml` checks, builds and publishes the site on every
push to `main`.

1. Push the project to a GitHub repository.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, set
   **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow from the **Actions** tab (**Deploy to GitHub Pages →
   Run workflow**).
4. When it finishes, the site is at `https://<user>.github.io/<repository>/`. The workflow sets the
   base path and site URL for you.

### Custom domain

1. In **Settings → Pages → Custom domain**, enter your domain and follow GitHub's DNS instructions.
2. Add a repository variable named `SITE_URL` (**Settings → Secrets and variables → Actions →
   Variables**) with the full URL, such as `https://janedoe.dev`.
3. Set the same URL as `site.url` in `config/site.ts`, and run the workflow again.

With a custom domain, the base path is empty and links resolve from the root.

## Vercel

1. Import the repository at https://vercel.com/new. The Next.js preset is detected automatically.
2. Keep the default build command (`next build`) and deploy.
3. Add your domain under **Project → Settings → Domains** and set `site.url` to match.

On Vercel you can disable the GitHub Pages workflow by deleting `.github/workflows/deploy-pages.yml`.
Keep `ci.yml`: it checks every pull request.

## Netlify or Cloudflare Pages

- Build command: `npm run build:static`
- Publish directory: `out`
- Node version: 22 (set `NODE_VERSION=22` if the host asks)

## Any other static host

```bash
npm run build:static
```

Upload the contents of `out/`. The export uses trailing slashes (`/projects/name/index.html`), which
every static server understands. Serve `404.html` as the not-found page if your host needs to be told.

## After deploying

- Open the site on a phone and a desktop, in light and dark mode.
- Download the resume and check the links inside it.
- Send a test message through the contact form.
- Paste the URL into https://www.opengraph.xyz or a LinkedIn post draft to check the preview image.
- Submit `https://your-domain/sitemap.xml` in Google Search Console.

The full list is in the [release checklist](release-checklist.md).
