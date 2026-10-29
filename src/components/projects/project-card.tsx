import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TagList } from '@/components/ui/tag-list';
import { cn } from '@/lib/cn';
import type { Project } from '@/types/content';
import { OutcomeList } from './outcome-list';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Alternates image and text sides on large screens. */
  reverse?: boolean;
  /** Set on the first card so the browser loads its image early. */
  priority?: boolean;
}

/**
 * Featured project. The whole card is clickable through the title link's stretched hit area,
 * so keyboard and screen reader users get one clear link instead of several duplicates.
 */
export function ProjectCard({ project, index, reverse = false, priority = false }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="group relative grid gap-8 rounded-card lg:grid-cols-12 lg:gap-12"
      data-reveal
    >
      <div className={cn('lg:col-span-7', reverse && 'lg:order-2')}>
        <div className="overflow-hidden rounded-card border border-line bg-surface-2">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            sizes="(min-width: 80rem) 44rem, (min-width: 64rem) 58vw, 100vw"
            priority={priority}
            placeholder="blur"
            className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.015]"
          />
        </div>
      </div>

      <div className={cn('flex flex-col lg:col-span-5 lg:py-4', reverse && 'lg:order-1')}>
        <p className="type-meta text-muted">
          <span className="text-accent-text">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> · </span>
          {project.period}
        </p>
        <h3 id={headingId} className="type-display mt-4 text-3xl sm:text-4xl">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-focus"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">
          {project.role} · {project.context}
        </p>
        <p className="mt-5 text-lg leading-relaxed">{project.summary}</p>

        <OutcomeList outcomes={project.caseStudy.outcomes.slice(0, 2)} className="mt-8 grid-cols-2 sm:grid-cols-2" />

        <TagList items={project.stack} label={`Technologies used in ${project.title}`} className="mt-8" />

        <p className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium" aria-hidden="true">
          <span className="link-underline group-hover:decoration-current">Read the case study</span>
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}
