// modules/ui/Chart/theme.ts
//
// Token-aware palette + style helpers, ported from KuiReact's
// modules/ui/Chart/theme.ts. KuiReact names colours as CSS variables
// (`var(--primary)`); RN SVG can't read CSS variables, so the same strings
// are kept for API parity and resolved to the active theme's hex values at
// draw time with `resolveColor`.

import { AccessibilityInfo } from "react-native";

export const defaultPalette = [
  "var(--primary)",
  "var(--secondary)",
  "var(--success)",
  "var(--warning)",
  "var(--error)",
  "var(--info)",
  "var(--primary-active)",
  "var(--text-secondary)",
] as const;

/** Resolve a fill / stroke colour for a series by index, with wrap-around. */
export function paletteColor(index: number, override?: string): string {
  if (override) return override;
  return defaultPalette[index % defaultPalette.length];
}

/** Turn `var(--token)` (or a bare token name) into the theme's hex; other colours pass through. */
export function resolveColor(color: string, tokens: Record<string, string>): string {
  const m = /^var\(--([\w-]+)\)$/.exec(color.trim());
  if (m) return tokens[m[1]] ?? color;
  return tokens[color] ?? color;
}

export const chartTheme = {
  background: "transparent",
  axisStroke: "var(--border)",
  axisText: "var(--text-secondary)",
  gridStroke: "var(--border)",
  tooltipBg: "var(--surface-raised)",
  tooltipBorder: "var(--border)",
  tooltipText: "var(--text-primary)",
  tooltipMutedText: "var(--text-secondary)",
  crosshair: "var(--border-strong)",
  legendSwatchBorder: "var(--border)",
  fontSize: { axis: 11, tooltip: 12, legend: 12 },
} as const;

let reduceMotion = false;
AccessibilityInfo.isReduceMotionEnabled?.()
  .then((v) => {
    reduceMotion = v;
  })
  .catch(() => {});

/** Reduced-motion-aware animation duration in ms (0 when the OS asks for reduced motion). */
export function animationDuration(base = 250): number {
  return reduceMotion ? 0 : base;
}
