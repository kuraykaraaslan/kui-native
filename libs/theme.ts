import { useSyncExternalStore } from "react";
import { vars } from "nativewind";
import { Appearance } from "react-native";
import { create } from "zustand";

/**
 * Single source of truth for the design tokens (values mirror KUIREACT's
 * globals.css 1:1). Exposed two ways:
 *  - `themes` — NativeWind `vars()` style objects applied at the app root so every
 *    `bg-primary` / `text-text-primary` className resolves to the active scheme.
 *  - `tokenMaps` — the raw hex, for RN props that take a color string and can't use
 *    a className (FontAwesome `color`, Switch `trackColor`, `placeholderTextColor`).
 * Both are generated from the same maps, and `configureTheme()` regenerates both,
 * so a className and `useThemeTokens()` always agree.
 */
const defaultLight = {
  primary: "#3b82f6",
  "primary-hover": "#2563eb",
  "primary-active": "#1d4ed8",
  "primary-subtle": "#eff6ff",
  "primary-fg": "#ffffff",
  secondary: "#8b5cf6",
  "secondary-hover": "#7c3aed",
  "secondary-active": "#6d28d9",
  "secondary-subtle": "#f5f3ff",
  "secondary-fg": "#ffffff",
  "surface-base": "#ffffff",
  "surface-raised": "#f9fafb",
  "surface-overlay": "#f3f4f6",
  "surface-sunken": "#e5e7eb",
  "text-primary": "#111827",
  "text-secondary": "#6b7280",
  "text-disabled": "#9ca3af",
  "text-inverse": "#ffffff",
  border: "#e5e7eb",
  "border-strong": "#d1d5db",
  "border-focus": "#3b82f6",
  success: "#22c55e",
  "success-subtle": "#f0fdf4",
  "success-fg": "#14532d",
  warning: "#f59e0b",
  "warning-subtle": "#fffbeb",
  "warning-fg": "#78350f",
  error: "#ef4444",
  "error-subtle": "#fef2f2",
  "error-fg": "#7f1d1d",
  info: "#06b6d4",
  "info-subtle": "#ecfeff",
  "info-fg": "#164e63",
  // Brand-mark domain tokens, on top of the family contract (see
  // libs/brand/geometry.ts): the native kit's second tone and the family tile.
  "brand-native": "#f97316",
  "brand-tile": "#0f172a",
};

/** A design-token name, e.g. `"primary"` or `"text-secondary"` (a `--color-<name>` var / `bg-<name>` class). */
export type TokenName = keyof typeof defaultLight;
/** Every token of one scheme, as a color string. */
export type TokenMap = Record<TokenName, string>;
/**
 * What `tokenMaps` / `useThemeTokens()` hand out: every token, still indexable by
 * any string, as before the token names were typed (so `t[`${tone}-subtle`]` compiles).
 */
export type ThemeTokens = TokenMap & Record<string, string>;
/** Per-scheme token overrides for `configureTheme()`. */
export type ThemeOverrides = { light?: Partial<TokenMap>; dark?: Partial<TokenMap> };

const defaultDark: TokenMap = {
  primary: "#60a5fa",
  "primary-hover": "#93c5fd",
  "primary-active": "#1d4ed8",
  "primary-subtle": "#1e3a5f",
  "primary-fg": "#ffffff",
  secondary: "#a78bfa",
  "secondary-hover": "#c4b5fd",
  "secondary-active": "#7c3aed",
  "secondary-subtle": "#2e1065",
  "secondary-fg": "#ffffff",
  "surface-base": "#0f172a",
  "surface-raised": "#1e293b",
  "surface-overlay": "#334155",
  "surface-sunken": "#1e293b",
  "text-primary": "#f1f5f9",
  "text-secondary": "#94a3b8",
  "text-disabled": "#475569",
  "text-inverse": "#111827",
  border: "#334155",
  "border-strong": "#475569",
  "border-focus": "#60a5fa",
  success: "#4ade80",
  "success-subtle": "#052e16",
  "success-fg": "#bbf7d0",
  warning: "#fbbf24",
  "warning-subtle": "#451a03",
  "warning-fg": "#fef3c7",
  error: "#f87171",
  "error-subtle": "#450a0a",
  "error-fg": "#fee2e2",
  info: "#22d3ee",
  "info-subtle": "#083344",
  "info-fg": "#cffafe",
  "brand-native": "#f97316",
  "brand-tile": "#0f172a",
};

type Scheme = "light" | "dark";

const DEFAULTS: Readonly<Record<Scheme, Readonly<TokenMap>>> = Object.freeze({
  light: Object.freeze({ ...defaultLight }),
  dark: Object.freeze({ ...defaultDark }),
});
const TOKEN_NAMES = Object.keys(defaultLight) as TokenName[];

function toVars(map: TokenMap) {
  const out: Record<string, string> = {};
  for (const key of TOKEN_NAMES) out["--color-" + key] = map[key];
  return vars(out);
}

const themeVars: Record<Scheme, ReturnType<typeof toVars>> = {
  light: toVars(DEFAULTS.light),
  dark: toVars(DEFAULTS.dark),
};

/**
 * NativeWind `vars()` style for each scheme — apply `themes[scheme]` as the root
 * view's `style`. Read through getters because on native `vars()` returns an
 * opaque handle (its variables live in a WeakMap keyed by the object), which
 * can't be patched in place: `configureTheme()` swaps in a new one instead.
 */
export const themes = {
  get light() {
    return themeVars.light;
  },
  get dark() {
    return themeVars.dark;
  },
};

/** Raw token values per scheme. Plain objects, updated in place by `configureTheme()`. */
export const tokenMaps: { readonly light: ThemeTokens; readonly dark: ThemeTokens } = {
  light: { ...DEFAULTS.light },
  dark: { ...DEFAULTS.dark },
};

/**
 * Override design tokens (e.g. a brand color). Merges `overrides` onto the
 * built-in defaults — not onto a previous call — and regenerates both the
 * NativeWind vars (`themes`, used by classNames) and the raw values
 * (`tokenMaps`, returned by `useThemeTokens()`), so the two stay in sync.
 *
 * Call it once at startup, before the first render (e.g. at module scope of the
 * root layout): components already mounted are not re-rendered. Not calling it
 * keeps the defaults; `configureTheme()` with no argument restores them.
 *
 *   configureTheme({ light: { primary: "#f4511e" }, dark: { primary: "#ff7043" } });
 */
export function configureTheme(overrides: ThemeOverrides = {}): void {
  for (const scheme of ["light", "dark"] as const) {
    const patch = overrides[scheme] ?? {};
    const merged = { ...DEFAULTS[scheme] };
    for (const name of TOKEN_NAMES) {
      const value = patch[name];
      if (value !== undefined) merged[name] = value;
    }
    Object.assign(tokenMaps[scheme], merged);
    themeVars[scheme] = toVars(merged);
  }
}

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycle: () => void;
};

/** Theme preference: system → light → dark → system. */
export const useThemeMode = create<ThemeState>((set, get) => ({
  mode: "system",
  setMode: (mode) => set({ mode }),
  cycle: () =>
    set({ mode: get().mode === "system" ? "light" : get().mode === "light" ? "dark" : "system" }),
}));

function subscribeToScheme(onChange: () => void) {
  const sub = Appearance.addChangeListener(onChange);
  return () => sub.remove();
}

/**
 * The concrete scheme to render (resolves "system" against the OS).
 *
 * Read through useSyncExternalStore rather than useColorScheme: the static web
 * export is rendered in Node (always "light"), and useColorScheme's first
 * client render already says "dark" — React does not patch mismatched
 * attributes during hydration, so the root's theme variables stayed light
 * while JS-side tokens went dark. The server snapshot keeps hydration on
 * "light", then React re-renders with the real scheme.
 */
export function useResolvedScheme(): "light" | "dark" {
  const mode = useThemeMode((s) => s.mode);
  const system = useSyncExternalStore(
    subscribeToScheme,
    () => Appearance.getColorScheme() ?? "light",
    () => "light" as const,
  );
  return mode === "system" ? (system === "dark" ? "dark" : "light") : mode;
}

/** Raw token hex for the active scheme — for color props that can't take a className. */
export function useThemeTokens(): ThemeTokens {
  return tokenMaps[useResolvedScheme()];
}

/**
 * The active scheme's NativeWind vars, for content rendered outside the app
 * root: an RN `Modal` mounts its children in a separate tree, so the vars()
 * applied on the root View don't reach it and token classes fall back to the
 * light defaults. Overlays pass this as the style of their first View.
 */
export function useThemeVars() {
  return themes[useResolvedScheme()];
}
