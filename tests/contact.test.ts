import { describe, expect, it, vi } from 'vitest';
import { buildMailtoHref, looksLikeSpam, submitToProvider, validateContact, type ContactValues } from '@/lib/contact';

const valid: ContactValues = {
  name: 'Sam Lee',
  email: 'sam@example.org',
  topic: 'A full-time role',
  message: 'We are hiring a senior frontend engineer for our platform team.',
};

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('flags every missing field', () => {
    const errors = validateContact({ name: '', email: '', topic: '', message: '' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'topic']);
  });

  it('rejects malformed email addresses', () => {
    for (const email of ['sam', 'sam@', 'sam@example', 'sam @example.org']) {
      expect(validateContact({ ...valid, email }).email).toBeDefined();
    }
  });

  it('rejects topics that are not offered', () => {
    expect(validateContact({ ...valid, topic: 'Buy backlinks' }).topic).toBeDefined();
  });

  it('rejects messages with too many links', () => {
    const message = 'Great site https://a.test https://b.test https://c.test www.d.test';
    expect(validateContact({ ...valid, message }).message).toMatch(/links/);
  });

  it('trims whitespace before measuring length', () => {
    expect(validateContact({ ...valid, message: `   ${'a'.repeat(10)}   ` }).message).toBeDefined();
  });
});

describe('looksLikeSpam', () => {
  it('flags a filled honeypot', () => {
    expect(looksLikeSpam({ honeypot: 'https://spam.test', elapsedMs: 60_000, minSeconds: 3 })).toBe(true);
  });

  it('flags submissions faster than the minimum time', () => {
    expect(looksLikeSpam({ honeypot: '', elapsedMs: 1200, minSeconds: 3 })).toBe(true);
  });

  it('lets a normal human submission through', () => {
    expect(looksLikeSpam({ honeypot: '', elapsedMs: 45_000, minSeconds: 3 })).toBe(false);
  });
});

describe('buildMailtoHref', () => {
  it('encodes the subject and body', () => {
    const href = buildMailtoHref('me@example.com', { ...valid, message: 'Hi & hello\nLine two' });
    expect(href.startsWith('mailto:me@example.com?subject=')).toBe(true);
    expect(href).toContain(encodeURIComponent('Hi & hello\nLine two'));
    expect(href).not.toContain(' ');
  });
});

describe('submitToProvider', () => {
  const ok = () => new Response(JSON.stringify({ success: true }), { status: 200 });

  it('posts JSON to a form endpoint', async () => {
    const fetchMock = vi.fn(async () => ok());
    vi.stubGlobal('fetch', fetchMock);
    await submitToProvider({ type: 'endpoint', url: 'https://formspree.io/f/abc', serviceName: 'Formspree' }, valid);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://formspree.io/f/abc');
    expect(JSON.parse(init.body as string)).toMatchObject({ name: 'Sam Lee', email: 'sam@example.org' });
    vi.unstubAllGlobals();
  });

  it('sends the Web3Forms access key and fails on success: false', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: false }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(submitToProvider({ type: 'web3forms', accessKey: 'public-key-123' }, valid)).rejects.toThrow();
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toMatchObject({ access_key: 'public-key-123' });
    vi.unstubAllGlobals();
  });

  it('throws when the service answers with an error status', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 422 })));
    await expect(submitToProvider({ type: 'endpoint', url: 'https://x.test', serviceName: 'X' }, valid)).rejects.toThrow(/422/);
    vi.unstubAllGlobals();
  });
});
