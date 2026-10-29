'use client';

import { Check, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { MODES, THEMES } from '@/lib/theme';
import type { ColorMode, ThemeName } from '@/types/content';
import { useAppearance } from './use-appearance';

interface AppearanceMenuProps {
  defaultTheme: ThemeName;
  defaultMode: ColorMode;
  allowThemeSwitch: boolean;
  /** `inline` renders the controls directly, for the mobile menu. */
  variant?: 'popover' | 'inline';
}

const modeIcon: Record<ColorMode, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };

function AppearanceControls({
  allowThemeSwitch,
  theme,
  mode,
  setTheme,
  setMode,
}: {
  allowThemeSwitch: boolean;
  theme: ThemeName;
  mode: ColorMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ColorMode) => void;
}) {
  const name = useId();
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="type-meta mb-2 text-muted">Colour mode</legend>
        <div className="grid grid-cols-3 gap-1 rounded-control border border-line p-1">
          {MODES.map((option) => {
            const Icon = modeIcon[option.id];
            const checked = mode === option.id;
            return (
              <label
                key={option.id}
                className={cn(
                  'relative flex cursor-pointer items-center justify-center gap-1.5 rounded-control px-2 py-2 text-sm transition-colors',
                  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus',
                  checked ? 'bg-ink text-bg' : 'text-muted hover:text-ink',
                )}
              >
                <input
                  type="radio"
                  name={`${name}-mode`}
                  value={option.id}
                  checked={checked}
                  onChange={() => setMode(option.id)}
                  className="sr-only"
                />
                <Icon aria-hidden="true" size={15} strokeWidth={1.75} />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {allowThemeSwitch ? (
        <fieldset>
          <legend className="type-meta mb-2 text-muted">Theme</legend>
          <div className="space-y-1">
            {THEMES.map((option) => {
              const checked = theme === option.id;
              return (
                <label
                  key={option.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-card border px-3 py-2.5 transition-colors',
                    'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus',
                    checked ? 'border-ink bg-surface' : 'border-transparent hover:bg-surface',
                  )}
                >
                  <input
                    type="radio"
                    name={`${name}-theme`}
                    value={option.id}
                    checked={checked}
                    onChange={() => setTheme(option.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border',
                      checked ? 'border-ink bg-ink text-bg' : 'border-line-strong',
                    )}
                  >
                    {checked ? <Check size={11} strokeWidth={3} /> : null}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{option.label}</span>
                    <span className="block text-xs leading-snug text-muted">{option.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}

/** Colour mode and (optionally) theme picker. Uses native radio inputs for keyboard and screen reader support. */
export function AppearanceMenu({ defaultTheme, defaultMode, allowThemeSwitch, variant = 'popover' }: AppearanceMenuProps) {
  const appearance = useAppearance({ theme: defaultTheme, mode: defaultMode });
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Close when keyboard focus moves to something outside. A null target means a click on
    // non-focusable content (such as a label inside the panel), which must not close it.
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !wrapperRef.current?.contains(next)) setOpen(false);
    };
    const wrapper = wrapperRef.current;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    wrapper?.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      wrapper?.removeEventListener('focusout', onFocusOut);
    };
  }, [open]);

  if (variant === 'inline') {
    return <AppearanceControls allowThemeSwitch={allowThemeSwitch} {...appearance} />;
  }

  const ModeIcon = modeIcon[appearance.mode];

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-control text-ink transition-colors hover:bg-surface-2"
      >
        {allowThemeSwitch ? (
          <Palette aria-hidden="true" size={18} strokeWidth={1.75} />
        ) : (
          <ModeIcon aria-hidden="true" size={18} strokeWidth={1.75} />
        )}
        <span className="sr-only">Appearance settings</span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 w-72 rounded-card border border-line bg-bg p-4 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.35)]"
      >
        <AppearanceControls allowThemeSwitch={allowThemeSwitch} {...appearance} />
      </div>
    </div>
  );
}
