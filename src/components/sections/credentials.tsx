import { ArrowUpRight } from 'lucide-react';
import { credentials } from '@config';
import { Section } from '@/components/ui/section';
import { formatRange, formatYearMonth, toDateTime } from '@/lib/format';

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="rule pt-5" data-reveal>
      <h3 className="type-meta text-muted">{title}</h3>
      <ul className="mt-6 space-y-8">{children}</ul>
    </section>
  );
}

export function CredentialsSection() {
  const { education, certifications, achievements } = credentials;
  return (
    <Section id="credentials" eyebrow="Credentials" title="Education, certifications and recognition">
      <div className="grid gap-12 md:grid-cols-3 md:gap-10">
        {education.length > 0 ? (
          <Column title="Education">
            {education.map((item) => (
              <li key={`${item.institution}-${item.start}`}>
                <p className="text-lg font-medium">{item.qualification}</p>
                <p className="mt-1 text-muted">{item.institution}</p>
                <p className="type-meta mt-2 text-muted">
                  {formatRange(item.start, item.end)}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                {item.notes ? <p className="mt-3 text-sm leading-relaxed text-muted">{item.notes}</p> : null}
              </li>
            ))}
          </Column>
        ) : null}

        {certifications.length > 0 ? (
          <Column title="Certifications">
            {certifications.map((cert) => (
              <li key={`${cert.name}-${cert.issued}`}>
                <p className="text-lg font-medium">
                  {cert.credentialUrl ? (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-baseline gap-1">
                      {cert.name}
                      <ArrowUpRight aria-hidden="true" size={15} className="self-center" />
                      <span className="sr-only">(verify credential, opens in a new tab)</span>
                    </a>
                  ) : (
                    cert.name
                  )}
                </p>
                <p className="mt-1 text-muted">{cert.issuer}</p>
                <p className="type-meta mt-2 text-muted">
                  Issued <time dateTime={toDateTime(cert.issued)}>{formatYearMonth(cert.issued)}</time>
                  {cert.expires ? (
                    <>
                      {' · '}Valid to <time dateTime={toDateTime(cert.expires)}>{formatYearMonth(cert.expires)}</time>
                    </>
                  ) : null}
                </p>
              </li>
            ))}
          </Column>
        ) : null}

        {achievements.length > 0 ? (
          <Column title="Talks, open source and community">
            {achievements.map((item) => (
              <li key={item.title}>
                <p className="text-lg font-medium">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {item.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    item.title
                  )}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
                <p className="type-meta mt-2 text-muted">{item.year}</p>
              </li>
            ))}
          </Column>
        ) : null}
      </div>
    </Section>
  );
}
