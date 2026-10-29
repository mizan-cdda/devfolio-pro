import type { ContactProvider } from '@/types/content';

export const TOPICS = ['A full-time role', 'A freelance or contract project', 'Something else'] as const;
export type Topic = (typeof TOPICS)[number];

export interface ContactValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 20, max: 4000 },
  /** Messages with more links than this are almost always spam. */
  maxLinks: 3,
} as const;

// Pragmatic check: something@something.tld, no spaces. Real verification happens when you reply.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_PATTERN = /(https?:\/\/|www\.)/gi;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < LIMITS.name.min) errors.name = 'Please enter your name.';
  else if (name.length > LIMITS.name.max) errors.name = `Please keep your name under ${LIMITS.name.max} characters.`;

  if (!email) errors.email = 'Please enter your email address so I can reply.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'That email address doesn’t look right. Check for typos.';

  if (!TOPICS.includes(values.topic as Topic)) errors.topic = 'Please choose what your message is about.';

  if (message.length < LIMITS.message.min)
    errors.message = `Please write a little more (at least ${LIMITS.message.min} characters).`;
  else if (message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;
  else if ((message.match(LINK_PATTERN) ?? []).length > LIMITS.maxLinks)
    errors.message = `Please include no more than ${LIMITS.maxLinks} links.`;

  return errors;
}

export interface SpamSignals {
  /** Value of the hidden honeypot field. People never see it, so any value means a bot. */
  honeypot: string;
  /** Milliseconds between the form appearing and being submitted. */
  elapsedMs: number;
  minSeconds: number;
}

/** True when the submission looks automated. Callers should pretend it succeeded and send nothing. */
export function looksLikeSpam({ honeypot, elapsedMs, minSeconds }: SpamSignals): boolean {
  return honeypot.trim().length > 0 || elapsedMs < minSeconds * 1000;
}

export function buildMailtoHref(to: string, values: ContactValues): string {
  const subject = `${values.topic} · from ${values.name.trim()}`;
  const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Sends the message to the configured form service. Resolves when the service accepted it. */
export async function submitToProvider(
  provider: Exclude<ContactProvider, { type: 'mailto' }>,
  values: ContactValues,
  signal?: AbortSignal,
): Promise<void> {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: `${values.topic} · from ${values.name.trim()}`,
    topic: values.topic,
    message: values.message.trim(),
  };

  const request =
    provider.type === 'web3forms'
      ? { url: 'https://api.web3forms.com/submit', body: { ...payload, access_key: provider.accessKey, botcheck: '' } }
      : { url: provider.url, body: payload };

  const response = await fetch(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(request.body),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Form service responded with ${response.status}`);
  }

  // Web3Forms can answer 200 with `success: false`, for example for an invalid access key.
  if (provider.type === 'web3forms') {
    const data: unknown = await response.json().catch(() => null);
    if (data && typeof data === 'object' && 'success' in data && data.success === false) {
      throw new Error('Form service rejected the submission');
    }
  }
}
