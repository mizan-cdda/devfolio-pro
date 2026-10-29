import { profile } from '@config';
import { Section } from '@/components/ui/section';

export function About() {
  const { about } = profile;
  return (
    <Section id="about" eyebrow="About" title={about.heading}>
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-4" data-reveal>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>

      {about.highlights.length > 0 ? (
        <dl className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3" data-reveal>
          {about.highlights.map((highlight) => (
            <div key={highlight.label} className="flex flex-col-reverse gap-2 bg-bg p-6 sm:p-8">
              <dt className="text-sm text-muted">{highlight.label}</dt>
              <dd className="type-display text-4xl sm:text-5xl">{highlight.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}
