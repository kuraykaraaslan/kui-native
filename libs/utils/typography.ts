import { Platform, type TextStyle } from "react-native";

/**
 * Font-family + weight constants. The minimal base uses the OS system font so
 * it runs with zero font assets. To match KUIREACT's Geist, bundle the font
 * files and load them with expo-font (`useFonts`) in app/_layout.tsx, then
 * swap FONTS.sans below for the loaded family name(s).
 *
 * Weight is expressed via `fontWeight`, not by swapping font families: a
 * single base family + numeric weight lets both iOS (San Francisco) and
 * Android (Roboto) resolve the correct built-in bold/medium face themselves.
 * (A prior version mapped "bold" to a *different* family per weight, and the
 * Android "bold" entry pointed at the same family as "regular" — so h1-h4
 * rendered visually regular-weight on Android too, not just iOS/web.)
 */
export const FONTS = {
  sans: Platform.select({ ios: "System", android: "sans-serif", default: "System" }),
  mono: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
} as const;

export const FONT_WEIGHTS: Record<"regular" | "medium" | "semiBold" | "bold", TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
};
