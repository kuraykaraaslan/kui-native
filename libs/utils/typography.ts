import { Platform, type TextStyle } from "react-native";

/**
 * Font-family + weight constants, and the hook for a consumer app to swap the
 * library's font (`configureFonts`).
 *
 * The default uses the OS system font on native so it runs with zero font
 * assets; the web build uses Geist (loaded from Google Fonts in
 * app/+html.tsx). Weight is expressed via `fontWeight`: a single base family
 * + numeric weight lets both iOS (San Francisco) and Android (Roboto) resolve
 * the correct built-in bold/medium face themselves.
 *
 * Custom fonts loaded with expo-font (e.g. @expo-google-fonts/inter) register
 * one family *per weight* ("Inter_400Regular", "Inter_600SemiBold", …).
 * Android ignores `fontWeight` for such a family and iOS may synthesize a fake
 * bold on top of it, so for a per-weight map the library picks the
 * weight-specific family and does not set `fontWeight` (see `fontStyle`).
 */

export type FontWeightName = "regular" | "medium" | "semiBold" | "bold";
export type FontFamilyName = "sans" | "mono";

/**
 * One family per weight (expo-font / @expo-google-fonts style). `regular` is
 * required; a missing weight falls back to the nearest configured one.
 * `web` optionally replaces the families on the web with a CSS font stack,
 * which is then combined with `fontWeight` as usual.
 */
export type FontWeightMap = {
  regular: string;
  medium?: string;
  semiBold?: string;
  bold?: string;
  web?: string;
};

/** A single family name / CSS stack (weight via `fontWeight`), or a per-weight map. */
export type FontFamilyConfig = string | FontWeightMap;

export type FontConfig = {
  sans?: FontFamilyConfig;
  mono?: FontFamilyConfig;
};

export type FontStyle = Pick<TextStyle, "fontFamily" | "fontWeight">;

const DEFAULT_FONTS: Record<FontFamilyName, string> = {
  // Web loads Geist + Geist Mono from Google Fonts in app/+html.tsx (same
  // request as KUIejs's _head.ejs), so the web build sets type exactly like
  // KUIreact/KUIejs; native keeps the zero-asset system font.
  sans: Platform.select({
    ios: "System",
    android: "sans-serif",
    web: "Geist, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    default: "System",
  }),
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    web: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    default: "monospace",
  }),
};

export const FONT_WEIGHTS: Record<FontWeightName, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
};

/**
 * The base family per role on the current platform (for a per-weight map,
 * its `regular` family). Reflects `configureFonts`; components use
 * `fontStyle()` so each weight resolves to the right family.
 */
export const FONTS: { readonly sans: string; readonly mono: string } = { ...DEFAULT_FONTS };

/** Resolved per-role config; `families` set ⇒ per-weight mode (no fontWeight). */
type Resolved = { family: string; families?: Record<FontWeightName, string> } | undefined;

let resolved: Record<FontFamilyName, Resolved> = { sans: undefined, mono: undefined };

// Nearest configured weight when a per-weight map leaves one out.
const FALLBACK: Record<FontWeightName, FontWeightName[]> = {
  regular: [],
  medium: ["regular"],
  semiBold: ["bold", "medium", "regular"],
  bold: ["semiBold", "medium", "regular"],
};

function resolve(config: FontFamilyConfig | undefined): Resolved {
  if (config == null) return undefined;
  if (typeof config === "string") return { family: config };
  if (Platform.OS === "web" && config.web) return { family: config.web };
  const pick = (w: FontWeightName) => config[w] ?? FALLBACK[w].map((f) => config[f]).find(Boolean) ?? config.regular;
  return {
    family: config.regular,
    families: { regular: config.regular, medium: pick("medium"), semiBold: pick("semiBold"), bold: pick("bold") },
  };
}

/**
 * Sets the font family (or per-weight families) every kui-native component
 * uses. Call it once at module scope, before the first render (e.g. at the
 * top of the consumer's app/_layout.tsx): components read the config while
 * rendering and don't re-render when it changes. Not calling it keeps the
 * default fonts; `configureFonts({})` restores them.
 *
 * ```ts
 * configureFonts({
 *   sans: {
 *     regular: "Inter_400Regular",
 *     medium: "Inter_500Medium",
 *     semiBold: "Inter_600SemiBold",
 *     bold: "Inter_700Bold",
 *     web: "Inter, ui-sans-serif, system-ui, sans-serif", // optional
 *   },
 * });
 * ```
 *
 * - Per-weight map: on native (and on the web without `web`) the
 *   weight-specific family is used and `fontWeight` is not set.
 * - Plain string: one family for every weight, plus `fontWeight`.
 * - `web`: a CSS stack used on the web instead, plus `fontWeight`.
 */
export function configureFonts(config: FontConfig = {}): void {
  resolved = { sans: resolve(config.sans), mono: resolve(config.mono) };
  const fonts = FONTS as { sans: string; mono: string };
  fonts.sans = resolved.sans?.family ?? DEFAULT_FONTS.sans;
  fonts.mono = resolved.mono?.family ?? DEFAULT_FONTS.mono;
}

/** True when `configureFonts` set the given role. */
export function isFontConfigured(family: FontFamilyName = "sans"): boolean {
  return resolved[family] !== undefined;
}

/** True when the role uses weight-specific families (so `fontWeight` must stay unset). */
export function usesWeightFamilies(family: FontFamilyName = "sans"): boolean {
  return resolved[family]?.families !== undefined;
}

/**
 * `{ fontFamily, fontWeight? }` for a weight of a role, honouring
 * `configureFonts`. A per-weight map returns the weight's own family and no
 * `fontWeight`; otherwise the base family + the numeric weight.
 */
export function fontStyle(weight: FontWeightName = "regular", family: FontFamilyName = "sans"): FontStyle {
  const r = resolved[family];
  if (r?.families) return { fontFamily: r.families[weight] };
  return { fontFamily: r?.family ?? DEFAULT_FONTS[family], fontWeight: FONT_WEIGHTS[weight] };
}

/**
 * Like `fontStyle`, but for text whose default font comes from its host
 * rather than the library (SVG chart labels, Leaflet's DOM tooltips): `{}`
 * until `configureFonts` sets the role. In per-weight mode it sets
 * `fontWeight: "400"` so a weight given next to it can't fake-bold the
 * weight-specific family.
 */
export function configuredFontStyle(weight: FontWeightName = "regular", family: FontFamilyName = "sans"): FontStyle {
  const r = resolved[family];
  if (!r) return {};
  return r.families ? { fontFamily: r.families[weight], fontWeight: "400" } : fontStyle(weight, family);
}

/** Maps a Tailwind weight suffix ("semibold") or a `fontWeight` value ("600", 700, "bold") to a weight name. */
export function fontWeightName(weight: string | number | undefined | null): FontWeightName | undefined {
  if (weight == null || weight === "") return undefined;
  switch (weight) {
    case "normal":
    case "thin":
    case "extralight":
    case "light":
      return "regular";
    case "medium":
      return "medium";
    case "semibold":
      return "semiBold";
    case "bold":
    case "extrabold":
    case "black":
      return "bold";
  }
  const n = Number(weight);
  if (!Number.isFinite(n)) return undefined;
  if (n < 500) return "regular";
  if (n < 600) return "medium";
  if (n < 700) return "semiBold";
  return "bold";
}
