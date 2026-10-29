import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@config';
import { OutcomeList } from '@/components/projects/outcome-list';
import { ButtonLink } from '@/components/ui/button-link';
import { TagList } from '@/components/ui/tag-list';
import { getAdjacentProjects, getProject } from '@/lib/projects';
import { OG_SIZE } from '@/lib/og-size';
import { absoluteUrl } from '@/lib/site-url';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.summary,
      url,
      images: [{ url: absoluteUrl(`/projects/${project.slug}/og.png`), ...OG_SIZE, alt: project.title }],
    },
    twitter: { title: project.title, description: project.summary, images: [absoluteUrl(`/projects/${project.slug}/og.png`)] },
  };
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const adjacent = getAdjacentProjects(project.slug);

  return (
    <article aria-labelledby="case-study-title">
      <header className="container-page pb-12 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft aria-hidden="true" size={15} />
            All projects
          </Link>
        </nav>

        <p className="type-meta mt-12 text-muted">
          {project.context}
          <span aria-hidden="true"> · </span>
          {project.period}
        </p>
        <h1 id="case-study-title" className="type-display mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{project.summary}</p>

        <dl className="mt-10 grid gap-6 border-y border-line py-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="type-meta text-muted">Role</dt>
            <dd className="mt-1.5">{project.role}</dd>
          </div>
          <div>
            <dt className="type-meta text-muted">Timeline</dt>
            <dd className="mt-1.5">{project.period}</dd>
          </div>
          <div>
            <dt className="type-meta text-muted">Stack</dt>
            <dd className="mt-1.5">{project.stack.join(', ')}</dd>
          </div>
        </dl>

        {project.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link, index) => (
              <ButtonLink key={link.href} href={link.href} variant={index === 0 ? 'primary' : 'secondary'}>
                {link.label}
                <ArrowUpRight aria-hidden="true" size={16} />
              </ButtonLink>
            ))}
          </div>
        ) : null}
      </header>

      <div className="container-page">
        <div className="overflow-hidden rounded-card border border-line bg-surface-2">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            priority
            placeholder="blur"
            sizes="(min-width: 80rem) 73rem, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="container-page py-20 sm:py-24">
        <section aria-labelledby="outcomes" className="rounded-card border border-line bg-surface p-6 sm:p-10">
          <h2 id="outcomes" className="type-meta text-muted">
            Outcomes
          </h2>
          <OutcomeList outcomes={caseStudy.outcomes} size="large" className="mt-6" />
        </section>

        <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="space-y-16 md:col-span-8 md:col-start-3">
            <CaseSection id="problem" title="The problem">
              <p className="text-lg leading-relaxed">{caseStudy.problem}</p>
            </CaseSection>

            <CaseSection id="approach" title="Approach">
              <ol className="space-y-5">
                {caseStudy.approach.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-2 text-lg leading-relaxed">
                    <span aria-hidden="true" className="type-meta pt-1.5 text-accent-text">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </CaseSection>

            {caseStudy.challenges.length > 0 ? (
              <CaseSection id="challenges" title="Challenges">
                <div className="space-y-8">
                  {caseStudy.challenges.map((challenge) => (
                    <div key={challenge.title}>
                      <h3 className="text-lg font-medium">{challenge.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{challenge.detail}</p>
                    </div>
                  ))}
                </div>
              </CaseSection>
            ) : null}

            {caseStudy.learnings && caseStudy.learnings.length > 0 ? (
              <CaseSection id="learnings" title="What I learned">
                <ul className="space-y-3">
                  {caseStudy.learnings.map((learning) => (
                    <li key={learning} className="flex gap-3 text-lg leading-relaxed">
                      <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                      {learning}
                    </li>
                  ))}
                </ul>
              </CaseSection>
            ) : null}

            <TagList items={project.stack} label={`Technologies used in ${project.title}`} />
          </div>
        </div>
      </div>

      {adjacent ? (
        <nav aria-label="More case studies" className="border-t border-line">
          <div className="container-page grid gap-px sm:grid-cols-2">
            <Link href={`/projects/${adjacent.previous.slug}`} className="group py-10 sm:pr-10">
              <span className="type-meta inline-flex items-center gap-2 text-muted">
                <ArrowLeft aria-hidden="true" size={14} /> Previous
              </span>
              <span className="type-display mt-3 block text-2xl group-hover:text-accent-text">{adjacent.previous.title}</span>
            </Link>
            <Link href={`/projects/${adjacent.next.slug}`} className="group border-line py-10 text-right sm:border-l sm:pl-10">
              <span className="type-meta inline-flex items-center gap-2 text-muted">
                Next <ArrowRight aria-hidden="true" size={14} />
              </span>
              <span className="type-display mt-3 block text-2xl group-hover:text-accent-text">{adjacent.next.title}</span>
            </Link>
          </div>
        </nav>
      ) : null}
    </article>
  );
}

function CaseSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="type-display text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
