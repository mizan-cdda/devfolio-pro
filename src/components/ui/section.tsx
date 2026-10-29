import { cn } from '@/lib/cn';
import { sectionNumber } from '@/lib/navigation';
import type { SectionId } from '@/types/content';

interface SectionProps {
  id: SectionId;
  /** Short label shown next to the number, for example `About`. */
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Numbered page section with an accessible heading. The number follows the navigation order. */
export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('container-page py-20 sm:py-28', className)}>
      <div className="rule grid gap-6 pt-6 md:grid-cols-12 md:gap-10" data-reveal>
        <p className="type-meta text-muted md:col-span-3">
          <span className="text-accent-text">{sectionNumber(id)}</span>
          <span aria-hidden="true"> / </span>
          {eyebrow}
        </p>
        <div className="md:col-span-9">
          <h2 id={headingId} className="type-display max-w-3xl text-4xl sm:text-5xl">
            {title}
          </h2>
          {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
        </div>
      </div>
      <div className="mt-12 sm:mt-16">{children}</div>
    </section>
  );
}
