'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import type { NavItem } from '@/lib/navigation';

/** Tracks which section is in view so the matching link gets `aria-current`. */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        const [best] = [...visible.entries()].filter(([, ratio]) => ratio > 0).sort((a, b) => b[1] - a[1]);
        setActive(best ? best[0] : null);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}

interface NavLinksProps {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  /** Colour of links that are not the current section. */
  inactiveClassName?: string;
  onNavigate?: () => void;
}

export function NavLinks({ items, className, linkClassName, inactiveClassName = 'text-muted', onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const active = useActiveSection(
    items.map((item) => item.id),
    pathname === '/',
  );

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active === item.id ? 'location' : undefined}
            className={cn(
              'transition-colors hover:text-ink aria-[current=location]:text-ink',
              active === item.id ? 'text-ink' : inactiveClassName,
              linkClassName,
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
