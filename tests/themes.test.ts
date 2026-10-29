import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { THEMES } from '@/lib/theme';

/** Checks WCAG AA contrast for text tokens in every theme and mode, straight from themes.css. */
const css = readFileSync(new URL('../src/app/themes.css', import.meta.url), 'utf8');

function block(selector: string): Record<string, string> {
  const escaped = selector.replace(/[[\]'=]/g, (char) => `\\${char}`);
  const match = css.match(new RegExp(`${escaped}\\s*(?:,[^{]*)?\\{([^}]*)\\}`));
  if (!match?.[1]) throw new Error(`Missing block ${selector}`);
  return Object.fromEntries([...match[1].matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]!.trim()]));
}

function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

describe.each(THEMES.map((theme) => theme.id))('%s theme', (id) => {
  const light = block(`[data-theme='${id}']`);
  const dark = { ...light, ...block(`[data-theme='${id}'][data-mode='dark']`) };

  it.each([
    ['light', light],
    ['dark', dark],
  ] as const)('meets AA contrast in %s mode', (_mode, tokens) => {
    for (const background of ['bg', 'surface']) {
      for (const text of ['ink', 'muted', 'accent-text', 'danger']) {
        const ratio = contrast(tokens[text]!, tokens[background]!);
        expect(ratio, `${text} on ${background}: ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(4.5);
      }
    }
    expect(contrast(tokens['accent-ink']!, tokens.accent!), 'accent-ink on accent').toBeGreaterThanOrEqual(4.5);
    expect(contrast(tokens.bg!, tokens.ink!), 'bg on ink (primary button)').toBeGreaterThanOrEqual(4.5);
  });
});
