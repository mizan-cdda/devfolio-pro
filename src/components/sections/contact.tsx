import { profile, site } from '@config';
import { ContactForm } from '@/components/contact/contact-form';
import { SocialIcon } from '@/components/icons/social-icon';
import { Section } from '@/components/ui/section';
import { isExternalHref } from '@/lib/format';

export function Contact() {
  const { contact } = site;
  return (
    <Section id="contact" eyebrow="Contact" title={contact.heading} intro={contact.intro}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7" data-reveal>
          <ContactForm provider={contact.provider} email={profile.email} minSecondsBeforeSubmit={contact.minSecondsBeforeSubmit} />
        </div>

        <aside aria-label="Other ways to reach me" className="lg:col-span-4 lg:col-start-9" data-reveal>
          <h3 className="type-meta text-muted">Prefer email?</h3>
          <p className="mt-3">
            <a href={`mailto:${profile.email}`} className="type-display link-underline break-all text-2xl">
              {profile.email}
            </a>
          </p>

          <h3 className="type-meta mt-10 text-muted">Elsewhere</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {profile.socials
              .filter((social) => social.platform !== 'email')
              .map((social) => {
                const external = isExternalHref(social.href);
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      {...(external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                      className="group flex items-center gap-3 py-3.5"
                    >
                      <SocialIcon platform={social.platform} className="text-muted transition-colors group-hover:text-ink" />
                      <span className="font-medium">{social.label}</span>
                      {social.handle ? <span className="ml-auto text-sm text-muted">{social.handle}</span> : null}
                      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </a>
                  </li>
                );
              })}
          </ul>

          <p className="mt-10 text-sm leading-relaxed text-muted">
            {profile.availability.label}. {profile.timezone ? `Working hours: ${profile.timezone}.` : null}
          </p>
        </aside>
      </div>
    </Section>
  );
}
