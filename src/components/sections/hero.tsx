import { ArrowDown, FileDown, Mail } from 'lucide-react';
import Image from 'next/image';
import { profile, site } from '@config';
import { ButtonLink } from '@/components/ui/button-link';
import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';
import { resumeHref } from '@/lib/navigation';

const availabilityDot: Record<typeof profile.availability.status, string> = {
  available: 'bg-success',
  selective: 'bg-accent',
  unavailable: 'bg-muted',
};

export function Hero() {
  const resume = resumeHref();
  return (
    <section aria-labelledby="hero-heading" className="container-page pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p className="type-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <span>{profile.role}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span>{profile.location}</span>
          </p>

          <h1 id="hero-heading" className="type-display mt-6 text-[clamp(2.6rem,7.2vw,6.25rem)]">
            {profile.headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{profile.intro}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={profile.primaryCta.href}>
              {profile.primaryCta.label}
              <ArrowDown aria-hidden="true" size={16} />
            </ButtonLink>
            {resume ? (
              <ButtonLink href={resume} download={site.resume.fileName} variant="secondary">
                <FileDown aria-hidden="true" size={16} />
                Download resume
                <span className="sr-only">(PDF)</span>
              </ButtonLink>
            ) : null}
            {site.sections.contact ? (
              <ButtonLink href="/#contact" variant="quiet" className="ml-2">
                <Mail aria-hidden="true" size={16} />
                Get in touch
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <aside aria-label="At a glance" className="lg:col-span-4 lg:pt-3">
          <div className="rounded-card border border-line bg-surface p-6">
            <div className="flex items-center gap-4">
              {profile.portrait ? (
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  width={72}
                  height={72}
                  priority
                  className="size-18 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="type-display flex size-18 items-center justify-center rounded-full bg-ink text-2xl text-bg"
                >
                  {initials(profile.name)}
                </span>
              )}
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted">{profile.role}</p>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-line text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="shrink-0 text-muted">Based in</dt>
                <dd className="text-right">{profile.location}</dd>
              </div>
              {profile.timezone ? (
                <div className="flex justify-between gap-4 py-3">
                  <dt className="shrink-0 text-muted">Time zone</dt>
                  <dd className="text-right">{profile.timezone}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4 pt-3">
                <dt className="shrink-0 text-muted">Status</dt>
                <dd className="flex items-start justify-end gap-2 text-right">
                  <span
                    aria-hidden="true"
                    className={cn('mt-1.5 size-2 shrink-0 rounded-full', availabilityDot[profile.availability.status])}
                  />
                  {profile.availability.label}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
