# Case study writing worksheet

Hiring managers skim project cards in seconds and read case studies when they want proof. This
worksheet turns a project into the fields in `config/projects.ts`. Spend 20 to 30 minutes per project.

---

## Project basics

| Field in `projects.ts` | Prompt | Your answer |
| --- | --- | --- |
| `title` | What is it, in plain words? ("Freight dispatch console", not "Project Phoenix") | |
| `summary` | One sentence: what you built and why it mattered | |
| `role` | Your role, honestly ("Lead frontend engineer", "One of four engineers") | |
| `period` | When | |
| `context` | Who it was for. Under NDA? "European logistics SaaS" is enough | |
| `stack` | Five or six technologies that mattered most | |
| `links` | Live site, source, write-up or video, only if they work and are public | |

## The problem → `caseStudy.problem`

Answer in two to four sentences:

1. Who had the problem? ______________________
2. What was going wrong, specifically? ______________________
3. What did it cost them (time, money, risk, frustration)? ______________________
4. Why did it need solving then? ______________________

## The approach → `caseStudy.approach`

Three to five steps, in order. Each step is one sentence that starts with a verb and says *why*.

1. ______________________
2. ______________________
3. ______________________
4. ______________________

Include at least one step about how you found out what to build (measuring, interviewing users,
reading support tickets). It shows judgement, not just execution.

## Challenges → `caseStudy.challenges`

One or two things that went wrong or were hard, and what you did:

| Title | What happened and how you handled it |
| --- | --- |
| | |
| | |

Trade-offs you made deliberately count. Admitting a mistake you fixed is a strength.

## Outcomes → `caseStudy.outcomes`

Two or three results. For each, fill in all three columns:

| `value` | `label` | `context`: how was it measured? |
| --- | --- | --- |
| e.g. −38% | page load time | p75 LCP, field data, 28 days before and after |
| | | |
| | | |

Checks for every outcome:

- [ ] I can explain how it was measured in an interview.
- [ ] I can say what *my* part in it was.
- [ ] It is not covered by an NDA, or it is anonymised.
- [ ] The comparison is fair (same period length, same traffic, no other big change at the same time).

**No numbers available?** Use observable outcomes instead: "adopted by every product team", "replaced a
weekly manual process", "shipped two weeks before the deadline", "still in production three years later".
Or leave `outcomes` empty: an honest case study without numbers beats one with invented ones.

## Learnings → `caseStudy.learnings` (optional)

What would you do differently, or what did this change about how you work?

______________________

## Cover image → `cover`

- [ ] 16:10, ideally 1600 × 1000 px, saved as WebP in `config/images/`.
- [ ] A real screenshot or a clean mock-up of your own work, with no confidential data.
- [ ] `alt` text describes what the image shows in one sentence.

## Final read

Read the card aloud. Does the first sentence make a stranger want to click? If not, rewrite the
`summary` around the outcome.
