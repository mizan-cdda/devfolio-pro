import { site } from '@config';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { CredentialsSection } from '@/components/sections/credentials';
import { ExperienceTimeline } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { jsonLdScript, personJsonLd } from '@/lib/metadata';

export default function HomePage() {
  const { sections } = site;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }} />
      <Hero />
      {sections.about ? <About /> : null}
      {sections.skills ? <Skills /> : null}
      {sections.projects ? <Projects /> : null}
      {sections.experience ? <ExperienceTimeline /> : null}
      {sections.credentials ? <CredentialsSection /> : null}
      {sections.contact ? <Contact /> : null}
    </>
  );
}
