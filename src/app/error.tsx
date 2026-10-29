'use client';

import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { buttonClasses } from '@/components/ui/button-link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Replace with your error reporting service if you use one.
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="container-page py-24 sm:py-32">
      <p className="type-meta text-accent-text">Something went wrong</p>
      <h1 className="type-display mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">This part of the page didn’t load.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        It’s usually temporary. Try again, and if it keeps happening, the home page is a safe place to start over.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonClasses('primary')}>
          <RotateCcw aria-hidden="true" size={16} />
          Try again
        </button>
        <Link href="/" className={buttonClasses('secondary')}>
          Go to the home page
        </Link>
      </div>
      {error.digest ? <p className="type-meta mt-10 text-muted">Reference: {error.digest}</p> : null}
    </div>
  );
}
