'use client';

/**
 * Last-resort error screen when the root layout itself fails. It replaces the whole document,
 * so it cannot rely on the theme stylesheet and uses inline styles that work in light and dark.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: 'Canvas',
          color: 'CanvasText',
          colorScheme: 'light dark',
          padding: '1.5rem',
        }}
      >
        <main role="alert" style={{ maxWidth: '32rem' }}>
          <h1 style={{ fontSize: '2rem', lineHeight: 1.15, margin: 0 }}>The site couldn’t load.</h1>
          <p style={{ opacity: 0.75, lineHeight: 1.6 }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ font: 'inherit', padding: '0.75rem 1.25rem', borderRadius: 999, border: '1px solid currentColor', background: 'transparent', color: 'inherit', cursor: 'pointer' }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
