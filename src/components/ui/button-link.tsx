import Link from 'next/link';
import { cn } from '@/lib/cn';
import { isExternalHref } from '@/lib/format';

type Variant = 'primary' | 'secondary' | 'quiet';

const base =
  'inline-flex items-center justify-center gap-2 rounded-control text-sm font-medium leading-none transition-[background-color,color,border-color,translate] duration-200 ease-out-soft select-none';

const variants: Record<Variant, string> = {
  primary: 'px-5 py-3 bg-ink text-bg hover:bg-accent hover:text-accent-ink',
  secondary: 'px-5 py-3 border border-line-strong text-ink hover:border-ink hover:bg-surface',
  quiet: 'py-2 text-ink underline decoration-line-strong underline-offset-[0.3em] hover:decoration-current',
};

/** Classes for a button-styled element. Pass layout extras (width, margin) in `className`, not padding or display. */
export function buttonClasses(variant: Variant = 'primary', className?: string): string {
  return cn(base, variants[variant], className);
}

interface ButtonLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: Variant;
  /** Set for files such as the resume PDF so the browser downloads instead of navigating. */
  download?: string | boolean;
}

/**
 * Link styled as a button. Internal paths use `next/link`; external URLs, `mailto:` links and file
 * downloads use a plain anchor. External links open in a new tab and say so to screen readers.
 */
export function ButtonLink({ href, variant = 'primary', className, children, download, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  const external = isExternalHref(href);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (download !== undefined || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} className={classes} download={download} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
