import { vars } from "nativewind";
import { useColorScheme } from "react-native";
import { create } from "zustand";

/**
 * Single source of truth for the design tokens (values mirror KUIREACT's
 * globals.css 1:1). Exposed two ways:
 *  - `themes` — NativeWind `vars()` style objects applied at the app root so every
 *    `bg-primary` / `text-text-primary` className resolves to the active scheme.
 *  - `tokenMaps` — the raw hex, for RN props that take a color string and can't use
 *    a className (FontAwesome `color`, Switch `trackColor`, `placeholderTextColor`).
 */
type TokenMap = Record<string, string>;

const light: TokenMap = {
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
};

const dark: TokenMap = {
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
};

function toVars(map: TokenMap) {
  const out: Record<string, string> = {};
  for (const key in map) out["--color-" + key] = map[key];
  return vars(out);
}

export const themes = { light: toVars(light), dark: toVars(dark) } as const;
export const tokenMaps = { light, dark } as const;

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

/** The concrete scheme to render (resolves "system" against the OS). */
export function useResolvedScheme(): "light" | "dark" {
  const mode = useThemeMode((s) => s.mode);
  const system = useColorScheme() ?? "light";
  return mode === "system" ? (system as "light" | "dark") : mode;
}

/** Raw token hex for the active scheme — for color props that can't take a className. */
export function useThemeTokens(): TokenMap {
  return tokenMaps[useResolvedScheme()];
}
