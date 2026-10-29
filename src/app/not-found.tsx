import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@config';
import { ButtonLink } from '@/components/ui/button-link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  const suggestions = projects.filter((project) => project.featured).slice(0, 3);
  return (
    <div className="container-page py-24 sm:py-32">
      <p className="type-meta text-accent-text">Error 404</p>
      <h1 className="type-display mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)]">This page isn’t here.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        The link may be out of date, or the address may have a typo. Everything else is still where you left it.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to the home page
        </ButtonLink>
      </div>

      {suggestions.length > 0 ? (
        <div className="mt-20 max-w-2xl">
          <h2 className="type-meta text-muted">Or read a case study</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {suggestions.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="group flex items-baseline justify-between gap-6 py-4">
                  <span className="type-display text-xl group-hover:text-accent-text">{project.title}</span>
                  <span className="type-meta shrink-0 text-muted">{project.period}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
