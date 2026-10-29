'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { ColorMode, ThemeName } from '@/types/content';
import { isColorMode, isThemeName, STORAGE_KEYS } from '@/lib/theme';

const darkQuery = '(prefers-color-scheme: dark)';

function resolveMode(preference: ColorMode): 'light' | 'dark' {
  if (preference !== 'system') return preference;
  return window.matchMedia(darkQuery).matches ? 'dark' : 'light';
}

function applyMode(preference: ColorMode) {
  const root = document.documentElement;
  const resolved = resolveMode(preference);
  root.dataset.mode = resolved;
  root.dataset.modePreference = preference;
  root.style.colorScheme = resolved;
}

function store(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private browsing or blocked storage: the choice still applies for this visit.
  }
}

/* The inline head script already wrote the visitor's choice to <html>; read it back from there. */
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/**
 * Current theme and colour mode, plus setters that persist to localStorage.
 * The server snapshot uses the configured defaults; the client reads the attributes set before paint.
 */
export function useAppearance(defaults: { theme: ThemeName; mode: ColorMode }) {
  const theme = useSyncExternalStore(
    subscribe,
    () => {
      const value = document.documentElement.dataset.theme;
      return isThemeName(value) ? value : defaults.theme;
    },
    () => defaults.theme,
  );

  const mode = useSyncExternalStore(
    subscribe,
    () => {
      const value = document.documentElement.dataset.modePreference;
      return isColorMode(value) ? value : defaults.mode;
    },
    () => defaults.mode,
  );

  // Follow the operating system while the preference is `system`.
  useEffect(() => {
    if (mode !== 'system') return;
    const media = window.matchMedia(darkQuery);
    const onChange = () => applyMode('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mode]);

  const setTheme = useCallback((next: ThemeName) => {
    document.documentElement.dataset.theme = next;
    store(STORAGE_KEYS.theme, next);
    notify();
  }, []);

  const setMode = useCallback((next: ColorMode) => {
    applyMode(next);
    store(STORAGE_KEYS.mode, next);
    notify();
  }, []);

  return { theme, mode, setTheme, setMode };
}
