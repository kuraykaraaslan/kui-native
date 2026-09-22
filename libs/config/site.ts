/**
 * Site identity for the web build — titles, meta, OG. Mirrors the shape of
 * KUIreact / KUIejs `SHOWCASE_BRAND` + `SHOWCASE_LINKS` so the three
 * showcases describe themselves the same way.
 */
export const SITE = {
  name: "KUInative",
  tagline: "Composable UI System for Real Products",
  description:
    "KUInative is a production-ready React Native component library built with Expo and NativeWind — a layered design system mirroring KUIreact, on shared semantic tokens, for real mobile apps.",
  url: "https://kui-native.kuray.dev",
  github: "https://github.com/kuraykaraaslan/kui-native",
  twitterHandle: "@kuraykaraaslan",
  author: { name: "Kuray Karaaslan", url: "https://kuray.dev" },
  keywords:
    "React Native UI components, Expo design system, NativeWind, component library, UI kit, mobile design system",
  /** Family dark ground — the static head can't read theme tokens. */
  backgroundColor: "#0f172a",
} as const;

/**
 * Browser `<title>`, same pattern as the sibling showcases:
 * - `pageTitle()`         → "KUInative — Composable UI System for Real Products"
 * - `pageTitle("Button")` → "Button | KUInative"
 */
export function pageTitle(page?: string | null): string {
  return page ? `${page} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
}
