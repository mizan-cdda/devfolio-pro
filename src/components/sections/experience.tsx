import { experience } from '@config';
import { TagList } from '@/components/ui/tag-list';
import { Section } from '@/components/ui/section';
import { formatYearMonth, toDateTime } from '@/lib/format';

export function ExperienceTimeline() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve done the work">
      <ol className="relative space-y-14 md:space-y-16">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="grid gap-4 md:grid-cols-12 md:gap-10" data-reveal>
            <div className="md:col-span-3">
              <p className="type-meta text-muted">
                <time dateTime={toDateTime(job.start)}>{formatYearMonth(job.start)}</time>
                {' – '}
                {job.end ? <time dateTime={toDateTime(job.end)}>{formatYearMonth(job.end)}</time> : 'Present'}
              </p>
              <p className="mt-1 text-sm text-muted">
                {job.employment} · {job.location}
              </p>
            </div>

            <div className="relative md:col-span-9 md:border-l md:border-line md:pl-10">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-2.5 hidden size-[9px] rounded-full border border-line-strong bg-bg md:block"
              />
              <h3 className="text-xl font-medium sm:text-2xl">
                {job.role}
                <span className="text-muted"> · </span>
                {job.companyUrl ? (
                  <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {job.company}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
              {job.achievements.length > 0 ? (
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {job.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 leading-relaxed">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              ) : null}
              <TagList items={job.stack} label={`Technologies at ${job.company}`} className="mt-6" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
