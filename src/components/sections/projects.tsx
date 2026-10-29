import Link from 'next/link';
import { projects } from '@config';
import { ProjectCard } from '@/components/projects/project-card';
import { Section } from '@/components/ui/section';

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects with a measurable before and after"
      intro="Each case study covers the problem, the approach, what went wrong and the results, with a note on how every number was measured."
    >
      <div className="space-y-24 sm:space-y-32">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} reverse={index % 2 === 1} />
        ))}
      </div>

      {more.length > 0 ? (
        <div className="mt-24 sm:mt-32" data-reveal>
          <h3 className="type-meta text-muted">More projects</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {more.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  <span className="type-display text-2xl sm:col-span-4">
                    <span className="link-underline decoration-transparent group-hover:decoration-current">{project.title}</span>
                  </span>
                  <span className="text-muted sm:col-span-6">{project.summary}</span>
                  <span className="type-meta text-muted sm:col-span-2 sm:text-right">{project.period}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
