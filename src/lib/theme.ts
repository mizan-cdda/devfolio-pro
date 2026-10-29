import type { ColorMode, ThemeName } from '@/types/content';

export interface ThemeOption {
  id: ThemeName;
  label: string;
  description: string;
  /** Browser UI colour (`<meta name="theme-color">`), matching each mode's background. */
  chrome: { light: string; dark: string };
}

/** The three bundled visual themes. Their tokens live in src/app/themes.css. */
export const THEMES: readonly ThemeOption[] = [
  { id: 'editorial', label: 'Editorial', description: 'Serif headlines on warm paper. Calm and literary.', chrome: { light: '#f5f1e8', dark: '#14120f' } },
  { id: 'studio', label: 'Studio', description: 'Tight grotesk type on a strict grid. Bold and graphic.', chrome: { light: '#ffffff', dark: '#0b0b0b' } },
  { id: 'ledger', label: 'Ledger', description: 'Plex and mono details on cool neutrals. Precise and technical.', chrome: { light: '#f3f5f4', dark: '#0c1110' } },
];

export function getTheme(id: ThemeName): ThemeOption {
  return THEMES.find((theme) => theme.id === id) ?? (THEMES[0] as ThemeOption);
}

export const MODES: readonly { id: ColorMode; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];

export const STORAGE_KEYS = { theme: 'devfolio:theme', mode: 'devfolio:mode' } as const;

export function isThemeName(value: unknown): value is ThemeName {
  return THEMES.some((theme) => theme.id === value);
}

export function isColorMode(value: unknown): value is ColorMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Runs before first paint (inlined in <head>) so the page never flashes the wrong theme.
 * It sets `data-theme`, `data-mode` (resolved light or dark) and `data-mode-preference` on <html>.
 */
export function themeInitScript(defaults: {
  theme: ThemeName;
  mode: ColorMode;
  allowThemeSwitch: boolean;
}): string {
  const config = JSON.stringify({ ...defaults, keys: STORAGE_KEYS, themes: THEMES.map((t) => t.id) });
  return `(function(){try{var c=${config},d=document.documentElement,s=window.localStorage;d.classList.add('js');var t=c.theme;if(c.allowThemeSwitch){var st=s.getItem(c.keys.theme);if(c.themes.indexOf(st)>-1)t=st}var m=s.getItem(c.keys.mode);if(m!=='light'&&m!=='dark'&&m!=='system')m=c.mode;var r=m==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m;d.dataset.theme=t;d.dataset.mode=r;d.dataset.modePreference=m;d.style.colorScheme=r}catch(e){document.documentElement.classList.add('js')}})();`;
}
