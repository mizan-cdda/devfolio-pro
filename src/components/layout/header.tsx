import { FileDown } from 'lucide-react';
import Link from 'next/link';
import { profile, site } from '@config';
import { AppearanceMenu } from '@/components/theme/appearance-menu';
import { buttonClasses } from '@/components/ui/button-link';
import { navItems, resumeHref } from '@/lib/navigation';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';

export function Header() {
  const href = resumeHref();
  const resume = href ? { href, fileName: site.resume.fileName } : null;
  const appearance = {
    defaultTheme: site.theme.default,
    defaultMode: site.theme.defaultMode,
    allowThemeSwitch: site.theme.allowVisitorThemeSwitch,
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="type-display text-lg tracking-tight sm:text-xl">
          {profile.name}
          <span className="sr-only">, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={navItems} className="flex items-center gap-7 text-sm" />
        </nav>

        <div className="flex items-center gap-1.5">
          <AppearanceMenu {...appearance} />
          {resume ? (
            <div className="hidden sm:block">
              <a href={resume.href} download={resume.fileName} className={buttonClasses('secondary')}>
                <FileDown aria-hidden="true" size={15} />
                Resume
                <span className="sr-only">(PDF download)</span>
              </a>
            </div>
          ) : null}
          <MobileNav items={navItems} name={profile.name} resume={resume} appearance={appearance} />
        </div>
      </div>
    </header>
  );
}
