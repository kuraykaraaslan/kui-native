/**
 * The kui-native brand mark, as raw geometry.
 *
 * The mark is a "K" whose stem forks into two arms at 45 degrees — the house
 * construction, shared with every @kuraykaraaslan/kui-* package and written
 * down in the Brand_Positioning_Rules/logo-system.md ruleset. Nothing in the
 * SHARED block below may differ between packages; only `toneTwo` does.
 *
 * This module is the single source of truth for two consumers:
 *  - `modules/showcase/ui/BrandMark.tsx`, the in-app mark (theme tokens), and
 *  - `brand/build.mjs`, which writes every static asset (fixed hex).
 * It therefore stays framework-free and uses only erasable TypeScript, so
 * Node can run it directly:
 *
 *   node brand/build.mjs
 */

/** ---- Shared across the family. Do not diverge. ---------------------- */

export const GRID = 64;
export const VIEW_BOX = "0 0 64 64";
/** Stem: a rect, because a 32-long stroke would round its own ends. */
export const STEM = { x: 16, y: 16, width: 7, height: 32, radius: 1.5 };
/** The fork, and the two arm tips. dx === dy === 16, i.e. exactly 45deg. */
export const FORK = { x: 25, y: 32 };
export const ARMS = [
  { x: 41, y: 16 },
  { x: 41, y: 48 },
] as const;
/** ~10.9% of the grid — the family's optical weight. */
export const STROKE_WIDTH = 7;
/** ~22% of the tile edge. */
export const TILE_RADIUS = 14;

/** SVG path data for an arm, shared by the component and the generator. */
export function armPath(index: 0 | 1): string {
  const tip = ARMS[index];
  return `M${FORK.x} ${FORK.y} L${tip.x} ${tip.y}`;
}

/** ---- Palette. The first tone is the family's; the second is ours. --- */

/**
 * Fixed hex — for the static assets only, which cannot read a theme token.
 * The in-app mark colors from `libs/theme.ts` (`primary`, `brand-native`,
 * `brand-tile`) and must never import these.
 */
export const COLORS = {
  /** `--primary` at blue-500, the family's first tone. */
  toneOne: "#3b82f6",
  /** Dark-surface variant of the same. */
  toneOneInverse: "#60a5fa",
  /** THE NATIVE KIT — the on-device runtime this kit targets, the React
   *  Native sibling of kui-react (violet) and kui-ejs (pink). Like those two
   *  it has no single domain highlight to name, so the second tone names the
   *  runtime; orange is the one hue no sibling package already owns. */
  toneTwo: "#f97316",
  /** Family dark ground / light foreground. */
  tile: "#0f172a",
  tileInverse: "#020617",
  foreground: "#111827",
  foregroundInverse: "#f1f5f9",
  foregroundMutedInverse: "#cbd5e1",
  grid: "#1e293b",
} as const;

/** ---- Wordmark ------------------------------------------------------- */

export const WORDMARK = { lead: "kui", trail: " native" };
/** Mean advance per character at 26px SemiBold, in user units, measured
 *  against the system fallback stack rather than Geist: the lockup width is
 *  derived from the label, and sizing for the wider fallback means the last
 *  letters are never clipped on a machine without the brand font. */
export const WORDMARK_ADVANCE = 19.5;
/** Text starts at 96 = mark (64) + clear space (half the mark's height). */
export const WORDMARK_X = 96;
export const TAGLINE = "A React Native component library";
export const FONT_STACK =
  "Geist, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
