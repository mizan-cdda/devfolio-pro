import { describe, expect, it } from 'vitest';
import { content } from '@config';

/**
 * Guards against the mistakes buyers make most often when editing config/.
 * Run with `npm test`. Failing tests name the exact entry to fix.
 */
const { site, profile, projects, experience, credentials } = content;
const yearMonth = /^\d{4}-(0[1-9]|1[0-2])$/;

function allStrings(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => allStrings(item, `${path}[${index}]`));
  if (value && typeof value === 'object' && !('src' in value && 'width' in value)) {
    return Object.entries(value).flatMap(([key, item]) => allStrings(item, path ? `${path}.${key}` : key));
  }
  return [];
}

describe('site config', () => {
  it('has an absolute site URL without a trailing slash', () => {
    expect(site.url).toMatch(/^https?:\/\/[^/]+(\/.*[^/])?$/);
  });

  it('keeps the description within the length search engines show', () => {
    expect(site.description.length).toBeGreaterThan(50);
    expect(site.description.length).toBeLessThanOrEqual(170);
  });

  it('configures the contact provider completely', () => {
    const provider = site.contact.provider;
    if (provider.type === 'endpoint') expect(provider.url).toMatch(/^https:\/\//);
    if (provider.type === 'web3forms') expect(provider.accessKey.length).toBeGreaterThan(10);
  });

  it('points a custom resume file at public/', () => {
    if (site.resume.enabled && site.resume.source === 'file') expect(site.resume.filePath).toMatch(/^\/.+\.pdf$/);
    expect(site.resume.fileName).toMatch(/\.pdf$/);
  });
});

describe('profile', () => {
  it('has a valid email', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('uses absolute URLs or mailto for social links', () => {
    for (const social of profile.socials) expect(social.href, social.label).toMatch(/^(https:\/\/|mailto:)/);
  });
});

describe('projects', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('features at least one project', () => {
    expect(projects.some((project) => project.featured)).toBe(true);
  });

  it('describes every cover image', () => {
    for (const project of projects) expect(project.cover.alt.length, project.slug).toBeGreaterThan(10);
  });

  it('explains how each outcome was measured', () => {
    for (const project of projects) {
      for (const outcome of project.caseStudy.outcomes) expect(outcome.context, `${project.slug}: ${outcome.label}`).toBeTruthy();
    }
  });

  it('uses absolute URLs for project links', () => {
    for (const project of projects) for (const link of project.links) expect(link.href).toMatch(/^https:\/\//);
  });
});

describe('dates', () => {
  it('uses YYYY-MM and ends after it starts', () => {
    const ranges = [
      ...experience.map((job) => ({ label: job.company, start: job.start, end: job.end })),
      ...credentials.education.map((item) => ({ label: item.institution, start: item.start, end: item.end })),
    ];
    for (const { label, start, end } of ranges) {
      expect(start, label).toMatch(yearMonth);
      if (end) {
        expect(end, label).toMatch(yearMonth);
        expect(end >= start, label).toBe(true);
      }
    }
  });

  it('lists experience newest first, with at most one current role', () => {
    const starts = experience.map((job) => job.start);
    expect([...starts].sort().reverse()).toEqual(starts);
    expect(experience.filter((job) => !job.end).length).toBeLessThanOrEqual(1);
  });

  it('has no expired certifications', () => {
    const now = new Date().toISOString().slice(0, 7);
    for (const cert of credentials.certifications) {
      expect(cert.issued).toMatch(yearMonth);
      if (cert.expires) expect(cert.expires >= now, `${cert.name} expired ${cert.expires}`).toBe(true);
    }
  });
});

describe('launch readiness', () => {
  it.runIf(!site.sampleContent)('contains no leftover sample content', () => {
    const leftovers = allStrings(content).filter(([, value]) =>
      /example\.com|\(fictional\)|Jordan Avery|Sample (Cloud|Accessibility)/i.test(value),
    );
    expect(leftovers.map(([path, value]) => `${path}: ${value}`)).toEqual([]);
  });
});
