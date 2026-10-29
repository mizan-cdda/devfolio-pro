# Replacing the sample content

The sample portfolio belongs to **Jordan Avery**, a fictional engineer. This guide replaces it with
yours in about an hour, file by file. Everything lives in `config/`; you never need to edit
components to change content.

> Keep the dev server running (`npm run dev`) while you edit, so you see each change immediately.
> TypeScript will underline any field that is missing or has the wrong shape.

## 1. `config/profile.ts`: who you are

| Field | Tips |
| --- | --- |
| `name`, `shortName` | Your name as it appears on your resume |
| `role` | The job title you want, not necessarily the one you have. `Senior frontend engineer` beats `Developer` |
| `headline` | One sentence about the value you bring, written for the person hiring. Avoid "passionate" and "rockstar" |
| `intro` | Two or three sentences: years of experience, domain, what you care about |
| `location`, `timezone` | Remote employers look for time zone overlap. Say it plainly |
| `availability` | `available`, `selective` or `unavailable`, plus a short label |
| `portrait` | Optional. See [Adding a portrait](#adding-a-portrait). Without one, your initials are shown |
| `about` | Three short paragraphs and up to three highlights. Highlights must be facts you can defend |
| `socials` | Your profile URLs. Add `handle` to show it in the contact section |

Supported social platforms: `github`, `gitlab`, `linkedin`, `x`, `bluesky`, `mastodon`,
`stackoverflow`, `devto`, `medium`, `youtube`, `dribbble`, `leetcode`, `website`, `blog`, `rss`
and `email`.

### Adding a portrait

1. Save a square photo, at least 400 × 400 pixels, as `config/images/portrait.webp` (JPEG and PNG work too).
2. In `config/profile.ts`, import it and set the field:

```ts
import portrait from './images/portrait.webp';

export const profile: Profile = {
  // ...
  portrait: { src: portrait, alt: 'Your Name, smiling, in front of a bookshelf' },
};
```

## 2. `config/site.ts`: settings

1. Set `url` to your final domain, without a trailing slash.
2. Rewrite `title`, `titleSuffix`, `description` and `keywords`. The description is what search
   engines and link previews show; keep it under 160 characters.
3. Choose a `theme.default` (`editorial`, `studio` or `ledger`) and set
   `allowVisitorThemeSwitch: false` unless you want visitors to try the themes.
4. Set `resume.fileName`, for example `ana-lopez-resume.pdf`.
5. Set up the contact form. See [Contact form](contact-form.md).
6. When you've finished every file, set `sampleContent: false`.

## 3. `config/skills.ts`

Group skills the way a hiring manager scans them: by layer (frontend, backend, data, AI, delivery)
or by discipline. Mark three to six skills per group as `core: true`. There are no proficiency bars
on purpose: they invite questions you can't answer well in an interview.

## 4. `config/projects.ts`: the most important file

Use the [case study worksheet](worksheets/case-study-worksheet.md) first. Then for each project:

- `slug`: lowercase and hyphenated. It becomes `/projects/{slug}`.
- `featured: true` puts it on the home page. Feature two to four projects.
- `cover`: a 16:10 image, ideally 1600 × 1000 pixels, in `config/images/`. Screenshots work well
  with a plain background around them. Describe the image in `alt`.
- `links`: optional live site, source code, write-up or video. Leave the list empty rather than
  linking to something that doesn't work.
- `caseStudy.outcomes`: two or three results with a `context` that says how they were measured.

> **Only publish outcomes you can explain.** If you don't have numbers, use observable facts
> ("adopted by 4 teams", "replaced a weekly manual export") or leave outcomes out. Under NDA?
> Describe the client generically ("a European logistics company") and use relative numbers.

## 5. `config/experience.ts`

Newest first. Omit `end` for your current role. Write achievements as results, not duties:
"Cut checkout errors by a third by…" rather than "Responsible for checkout". Two to four per role.

## 6. `config/credentials.ts`

Education, certifications and achievements (talks, open source, awards, community work). Any empty
list hides its column. Add `credentialUrl` so people can verify a certification, and remove expired
ones: the tests fail on an expired certification.

## 7. Replace the images

Delete the four sample covers in `config/images/` once your projects have their own, and update the
imports at the top of `config/projects.ts`.

## 8. Finish

```bash
npm run check
```

With `sampleContent: false`, the tests list any leftover sample text (such as `example.com` or
"fictional") with the exact config path to fix. Then download `/resume.pdf` from your local build
and read it once end to end; it is generated from the same content.
