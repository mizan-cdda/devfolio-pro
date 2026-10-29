import { describe, expect, it } from 'vitest';
import { formatRange, formatYearMonth, initials, slugify } from '@/lib/format';

describe('format helpers', () => {
  it('formats year-month values the same everywhere', () => {
    expect(formatYearMonth('2024-03')).toBe('Mar 2024');
    expect(formatRange('2021-06', '2023-12')).toBe('Jun 2021 – Dec 2023');
    expect(formatRange('2024-01')).toBe('Jan 2024 – Present');
  });

  it('builds initials and slugs', () => {
    expect(initials('Jordan Avery')).toBe('JA');
    expect(initials('  ana  maría  lópez ')).toBe('AM');
    expect(slugify('Backend and data')).toBe('backend-and-data');
    expect(slugify('Ça va: AI/ML')).toBe('ca-va-ai-ml');
  });
});
