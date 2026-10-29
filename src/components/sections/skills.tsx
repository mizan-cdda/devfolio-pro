import { skills } from '@config';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { slugify } from '@/lib/format';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I reach for"
      intro={
        <>
          Grouped by where they fit in a product. <strong className="font-medium text-ink">Bold</strong> marks the
          areas I go deepest in.
        </>
      }
    >
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => {
          const headingId = `skills-${slugify(group.name)}`;
          return (
          <section key={group.name} aria-labelledby={headingId} className="rule pt-5" data-reveal>
            <h3 id={headingId} className="text-lg font-medium">
              {group.name}
            </h3>
            {group.description ? <p className="mt-2 text-sm leading-relaxed text-muted">{group.description}</p> : null}
            <ul className="mt-5 space-y-2">
              {group.skills.map((skill) => (
                <li key={skill.name} className={cn('flex items-baseline gap-2.5', skill.core ? 'font-medium' : 'text-muted')}>
                  <span
                    aria-hidden="true"
                    className={cn('inline-block size-1.5 shrink-0 translate-y-[-2px] rounded-full', skill.core ? 'bg-accent' : 'bg-line-strong')}
                  />
                  {skill.name}
                  {skill.core ? <span className="sr-only">(core skill)</span> : null}
                </li>
              ))}
            </ul>
          </section>
          );
        })}
      </div>
    </Section>
  );
}
