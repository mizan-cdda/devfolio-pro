'use client';

import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { buttonClasses } from '@/components/ui/button-link';
import { cn } from '@/lib/cn';
import {
  buildMailtoHref,
  LIMITS,
  looksLikeSpam,
  submitToProvider,
  TOPICS,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/contact';
import type { ContactProvider } from '@/types/content';

interface ContactFormProps {
  provider: ContactProvider;
  email: string;
  minSecondsBeforeSubmit: number;
}

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'sent' }
  | { state: 'mail-app' }
  | { state: 'failed' };

const EMPTY: ContactValues = { name: '', email: '', topic: '', message: '' };
const FIELD_ORDER: (keyof ContactValues)[] = ['name', 'email', 'topic', 'message'];

const inputClasses =
  'block w-full rounded-card border border-line-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/80 transition-colors focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-focus aria-[invalid=true]:border-danger';

/**
 * Contact form with client-side validation and two backend-free spam checks:
 *   1. A honeypot field hidden from people. Bots that fill it are silently ignored.
 *   2. A minimum time between the form appearing and being sent.
 * Delivery depends on `site.contact.provider`; see docs/contact-form.md.
 */
export function ContactForm({ provider, email, minSecondsBeforeSubmit }: ContactFormProps) {
  const id = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === 'sent' || status.state === 'mail-app' || status.state === 'failed') statusRef.current?.focus();
  }, [status.state]);

  const usesMailApp = provider.type === 'mailto';
  const fieldId = (name: keyof ContactValues) => `${id}-${name}`;
  const errorId = (name: keyof ContactValues) => `${id}-${name}-error`;

  const update = (name: keyof ContactValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [name]: event.target.value };
    setValues(next);
    // Re-validate a field as soon as the visitor fixes it, but don't nag before the first submit.
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateContact(next)[name] }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    if (looksLikeSpam({ honeypot, elapsedMs: Date.now() - startedAt.current, minSeconds: minSecondsBeforeSubmit })) {
      // Show the normal confirmation so automated senders learn nothing.
      setStatus({ state: 'sent' });
      return;
    }

    if (provider.type === 'mailto') {
      window.location.href = buildMailtoHref(email, values);
      setStatus({ state: 'mail-app' });
      return;
    }

    setStatus({ state: 'submitting' });
    try {
      await submitToProvider(provider, values, AbortSignal.timeout(15000));
      setStatus({ state: 'sent' });
      setValues(EMPTY);
      startedAt.current = Date.now();
    } catch {
      setStatus({ state: 'failed' });
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const submitting = status.state === 'submitting';

  if (status.state === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-card border border-line bg-surface p-8 focus:outline-none">
        <CheckCircle2 aria-hidden="true" className="text-success" size={28} strokeWidth={1.75} />
        <p className="type-display mt-4 text-2xl">Thanks, your message is on its way.</p>
        <p className="mt-2 text-muted">I’ll reply to the address you gave within two working days.</p>
        <button type="button" className={buttonClasses('quiet', 'mt-4')} onClick={() => setStatus({ state: 'idle' })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${id}-delivery`} className="space-y-6">
      {errorCount > 0 ? (
        <p role="alert" className="rounded-card border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
          {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor={fieldId('name')} error={errors.name} errorId={errorId('name')}>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            value={values.name}
            onChange={update('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={inputClasses}
          />
        </Field>
        <Field label="Email" htmlFor={fieldId('email')} error={errors.email} errorId={errorId('email')}>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={update('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="What’s it about?" htmlFor={fieldId('topic')} error={errors.topic} errorId={errorId('topic')}>
        <select
          id={fieldId('topic')}
          name="topic"
          required
          value={values.topic}
          onChange={update('topic')}
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={errors.topic ? errorId('topic') : undefined}
          className={cn(inputClasses, 'appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Choose one
          </option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        htmlFor={fieldId('message')}
        error={errors.message}
        errorId={errorId('message')}
        hint={`${values.message.trim().length} / ${LIMITS.message.max}`}
        hintId={`${id}-message-count`}
      >
        <textarea
          id={fieldId('message')}
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message.max}
          value={values.message}
          onChange={update('message')}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={[errors.message ? errorId('message') : null, `${id}-message-count`].filter(Boolean).join(' ')}
          className={cn(inputClasses, 'min-h-40 resize-y leading-relaxed')}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, but present for bots that fill every field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-delivery`} className="text-sm text-muted sm:max-w-sm">
          {usesMailApp
            ? 'Sending opens your email app with this message filled in, so you can review it before it goes.'
            : 'Your message is delivered straight to my inbox. I only use your email to reply.'}
        </p>
        <button type="submit" disabled={submitting} className={buttonClasses('primary', 'shrink-0 disabled:opacity-70')}>
          {submitting ? (
            <Loader2 aria-hidden="true" size={16} className="animate-spin" />
          ) : usesMailApp ? (
            <Mail aria-hidden="true" size={16} />
          ) : (
            <Send aria-hidden="true" size={16} />
          )}
          {submitting ? 'Sending…' : usesMailApp ? 'Continue in email app' : 'Send message'}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {status.state === 'mail-app' ? (
          <p className="rounded-card border border-line bg-surface px-4 py-3 text-sm">
            Your email app should now be open with the message ready to send. Nothing happened?{' '}
            <a href={`mailto:${email}`} className="link-underline font-medium">
              Email {email}
            </a>{' '}
            directly.
          </p>
        ) : null}
        {status.state === 'failed' ? (
          <p role="alert" className="rounded-card border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
            Sorry, the message couldn’t be sent. Your text is still here, so please try again, or{' '}
            <a href={buildMailtoHref(email, values)} className="font-medium underline">
              send it by email instead
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  hint,
  hintId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {hint ? (
          <span id={hintId} className="type-meta tabular-nums text-muted">
            {hint}
            <span className="sr-only"> characters</span>
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
