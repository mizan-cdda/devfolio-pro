# Troubleshooting

Start with `npm run check`. Most problems show up there with a precise message.

## Installing and running

**`npm install` fails with engine or syntax errors.** You are probably on an old Node.js. Run
`node -v`; you need 20.9 or newer. With nvm: `nvm install 22 && nvm use 22` (the repo's `.nvmrc`
selects 22 automatically with `nvm use`).

**Port 3000 is already in use.** Run `npm run dev -- -p 3001`.

**Changes don't appear.** Stop the dev server, delete the `.next` folder and start again.

## Content and TypeScript

**A red underline in `config/` after editing.** Hover it. The message names the missing or
mistyped field. Common causes: a date written as `2024-3` instead of `2024-03`, a missing comma, or
a `platform` value that isn't in the supported list.

**`Cannot find module './images/…'`.** The file name in the import doesn't match the file in
`config/images/`. Names are case-sensitive on Linux and in CI even if your computer isn't.

**Tests fail with "contains no leftover sample content".** You set `sampleContent: false` and the
test found sample text. The output lists the config path for each leftover, such as
`profile.email: hello@example.com`.

**Tests fail on an expired certification.** Remove it or update `expires`.

**A project page returns 404.** Check the `slug`: lowercase letters, numbers and hyphens only. Then
restart the dev server so the new page is generated.

## Themes

**The theme picker doesn't appear.** Set `theme.allowVisitorThemeSwitch: true`. The light/dark switch
always appears.

**My default theme isn't used.** Your browser remembers the last theme you picked. Clear site data
or run `localStorage.clear()` in the browser console.

**Contrast tests fail after changing colours.** The output names the token pair and ratio. Darken
text tokens in light mode or lighten them in dark mode until the ratio is at least 4.5.

## Resume

**The PDF has missing characters.** The built-in PDF font covers Western European languages. Common
symbols such as `−` and `→` are converted automatically. For other scripts, register a TTF font;
see [Customization](customization.md#resume).

**The download button gives a 404 on GitHub Pages.** Make sure you deployed with the included
workflow, which sets the base path. Building locally with plain `npm run build:static` assumes the
site is served from the domain root.

## Contact form

**The button says "Continue in email app".** The provider is `mailto`. Switch to `endpoint` or
`web3forms` to send in place; see [Contact form](contact-form.md).

**"The message couldn't be sent".** Check the endpoint URL or access key, and that your form
service account is confirmed. Open the browser's network tab to see the service's response.

**My own test submission shows success but never arrives.** You submitted within 3 seconds of
loading the page (browser autofill is fast), so it was treated as a bot. Wait a few seconds, or
lower `minSecondsBeforeSubmit` for testing.

## Deployment

**GitHub Pages shows the README or a 404.** Set **Settings → Pages → Source** to **GitHub Actions**,
then rerun the workflow.

**The site loads without styles on GitHub Pages.** The base path is wrong. Use the included workflow,
or set `NEXT_PUBLIC_BASE_PATH=/<repository>` when building. With a custom domain it must be empty.

**Social previews show an old image.** Platforms cache previews. Use LinkedIn's Post Inspector or
the X Card Validator to refresh them.

**Images are blurry or large on a static host.** Static hosts can't resize images on the fly. Export
covers at 1600 × 1000 as WebP (quality around 80) before adding them to `config/images/`.
