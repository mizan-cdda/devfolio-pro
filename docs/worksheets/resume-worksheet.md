# Resume worksheet and template

Fill this in before you edit `config/`. The generated resume (`/resume.pdf`) and the website read
from the same content, so writing it once here keeps both consistent.

Print it, or copy it into a document and answer in place. Aim for one page if you have under eight
years of experience, two pages at most otherwise.

---

## 1. Target

- **The role you want next** (one title): ______________________
- **Seniority**: junior / mid / senior / staff / lead / freelance
- **Where**: on-site in ______ / remote within time zones ______ / relocation to ______
- **Three companies or job ads you would apply to today**:
  1. ______________________
  2. ______________________
  3. ______________________

Read those ads and underline the skills and outcomes they repeat. Your resume should answer them.

## 2. Header → `config/profile.ts`

| Field | Your answer |
| --- | --- |
| Name | |
| Role (from section 1) | |
| Location and time zone | |
| Email (one you check daily) | |
| Website URL | |
| GitHub, LinkedIn, other | |

## 3. Summary → `profile.intro`

Two or three sentences. Use this pattern, then rewrite it in your own voice:

> [Years] years building [kind of product] for [domain or users]. I specialise in [two or three
> strengths from the ads]. Most recently I [one concrete result].

Draft: ____________________________________________________________

## 4. Experience → `config/experience.ts`

For each role, newest first:

| | |
| --- | --- |
| Company, role, dates (YYYY-MM) | |
| Type (full-time, contract, freelance, internship) | |
| One-line summary of the team or product | |
| Achievement 1 | |
| Achievement 2 | |
| Achievement 3 | |
| Main technologies | |

**Writing achievements.** Use *action → result → evidence*:

> Rebuilt the checkout form (action), cutting failed payments by 22% (result) over the following
> quarter, measured in Stripe (evidence).

Weak: "Responsible for the checkout." Strong: what changed because you were there.

No numbers? Use scope ("used by 40 support agents daily"), adoption ("adopted by 3 teams"),
frequency ("replaced a weekly manual export"), or quality ("zero priority incidents after launch").

**Never invent a number.** Interviewers ask how you measured it.

## 5. Selected projects → `config/projects.ts`

Pick two or three that prove the skills from section 1. Complete the
[case study worksheet](case-study-worksheet.md) for each.

## 6. Skills → `config/skills.ts`

Group into three to five categories. List only what you would happily be interviewed on.

| Group | Core skills (bold on the site) | Other skills |
| --- | --- | --- |
| | | |
| | | |
| | | |

## 7. Education and certifications → `config/credentials.ts`

| Qualification | Institution | Dates | Verification link |
| --- | --- | --- | --- |
| | | | |

Drop certifications that have expired or don't relate to the target role.

## 8. Achievements → `credentials.achievements`

Talks, open-source work, writing, awards, mentoring, community roles. Only list things with a
public trace or that you can describe in detail.

## Final checks

- [ ] Every bullet starts with a verb and ends with a result.
- [ ] No personal data you don't want public (home address, date of birth, photo if applying to
      regions where that's discouraged).
- [ ] The words from the job ads in section 1 appear naturally.
- [ ] A friend read it in 30 seconds and could say what you do and how senior you are.
