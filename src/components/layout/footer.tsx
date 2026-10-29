import { ArrowUp } from 'lucide-react';
import { profile, site } from '@config';
import { SocialIcon } from '@/components/icons/social-icon';
import { isExternalHref } from '@/lib/format';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm">
            © {year} {profile.name}
          </p>
          {site.sampleContent ? (
            <p className="text-xs text-muted">
              Sample content for a fictional developer, made with DevFolio Pro. Names, companies and figures are illustrative.
            </p>
          ) : null}
        </div>

        <ul aria-label="Social links" className="flex flex-wrap items-center gap-1">
          {profile.socials.map((social) => {
            const external = isExternalHref(social.href);
            return (
              <li key={social.href}>
                <a
                  href={social.href}
                  {...(external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                  className="inline-flex size-10 items-center justify-center rounded-control text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <SocialIcon platform={social.platform} />
                  <span className="sr-only">
                    {social.label}
                    {external ? ' (opens in a new tab)' : ''}
                  </span>
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#top"
              className="ml-2 inline-flex items-center gap-1.5 rounded-control px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowUp aria-hidden="true" size={15} />
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
