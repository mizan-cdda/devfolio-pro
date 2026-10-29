'use client';

import { FileDown, Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { buttonClasses } from '@/components/ui/button-link';
import { AppearanceMenu } from '@/components/theme/appearance-menu';
import type { NavItem } from '@/lib/navigation';
import type { ColorMode, ThemeName } from '@/types/content';
import { NavLinks } from './nav-links';

interface MobileNavProps {
  items: NavItem[];
  name: string;
  resume: { href: string; fileName: string } | null;
  appearance: { defaultTheme: ThemeName; defaultMode: ColorMode; allowThemeSwitch: boolean };
}

/**
 * Full-screen menu built on the native <dialog> element: it traps focus, closes on Escape,
 * makes the page behind it inert and returns focus to the menu button when closed.
 */
export function MobileNav({ items, name, resume, appearance }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Close if the viewport grows past the mobile breakpoint while the menu is open.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 64rem)');
    const onChange = () => media.matches && dialogRef.current?.close();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex size-10 items-center justify-center rounded-control text-ink transition-colors hover:bg-surface-2 lg:hidden"
      >
        <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClick={(event) => event.target === dialogRef.current && close()}
        className="mobile-nav m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-black/40"
      >
        <div className="container-page flex min-h-full flex-col py-4">
          <div className="flex items-center justify-between">
            <span className="type-display text-xl">{name}</span>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="inline-flex size-10 items-center justify-center rounded-control transition-colors hover:bg-surface-2"
            >
              <X aria-hidden="true" size={20} strokeWidth={1.75} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10">
            <NavLinks
              items={items}
              onNavigate={close}
              className="space-y-1"
              linkClassName="type-display block py-2 text-4xl"
              inactiveClassName="text-ink"
            />
          </nav>

          <div className="mt-auto space-y-8 pt-10">
            <AppearanceMenu variant="inline" {...appearance} />
            {resume ? (
              <a href={resume.href} download={resume.fileName} className={buttonClasses('primary', 'w-full')}>
                <FileDown aria-hidden="true" size={16} />
                Download resume (PDF)
              </a>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
