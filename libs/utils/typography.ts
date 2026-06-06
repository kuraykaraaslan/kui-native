import { Platform } from "react-native";

/**
 * Font-family constants. The minimal base uses the OS system font so it runs
 * with zero font assets. To match KUIREACT's Inter, bundle the font files and
 * load them with expo-font (`useFonts`) in app/_layout.tsx, then swap the values
 * below for the loaded family names.
 */
export const FONTS = {
  sans: {
    regular: Platform.select({ ios: "System", android: "sans-serif", default: "System" }),
    medium: Platform.select({ ios: "System", android: "sans-serif-medium", default: "System" }),
    semiBold: Platform.select({ ios: "System", android: "sans-serif-medium", default: "System" }),
    bold: Platform.select({ ios: "System", android: "sans-serif", default: "System" }),
  },
  mono: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
} as const;
