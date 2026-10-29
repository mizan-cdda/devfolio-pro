import type { YearMonth } from '@/types/content';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/**
 * `2024-03` → `Mar 2024`. Formatting is done by hand rather than with `Intl`
 * so the server and the browser always render the same text.
 */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split('-');
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : String(year);
}

export function formatRange(start: YearMonth, end?: YearMonth, presentLabel = 'Present'): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : presentLabel}`;
}

/** Machine-readable value for `<time dateTime>`. */
export function toDateTime(value: YearMonth): string {
  const [year, month] = value.split('-');
  return `${year}-${String(month).padStart(2, '0')}`;
}

/** `Jordan Avery` → `JA`. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** `Backend and data` → `backend-and-data`, for element ids. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
