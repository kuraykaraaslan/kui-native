import type * as React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { cn } from "../../libs/utils/cn";
import { FONT_WEIGHTS, FONTS } from "../../libs/utils/typography";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "title" | "titleSm" | "body" | "bodySm" | "label" | "caption";

const variantCls: Record<TextVariant, string> = {
  h1: "text-3xl text-text-primary",
  h2: "text-2xl text-text-primary",
  h3: "text-xl text-text-primary",
  h4: "text-lg text-text-primary",
  // Anchored to KuiReact's own component-title typography (Modal/Drawer use
  // `title`, Card/EmptyState use `titleSm`) rather than the generic h1-h4
  // scale, which KuiReact itself never uses at this size for chrome titles.
  title: "text-base text-text-primary",
  titleSm: "text-sm text-text-primary",
  body: "text-base text-text-primary",
  bodySm: "text-sm text-text-secondary",
  label: "text-sm text-text-primary",
  caption: "text-xs text-text-secondary",
};

const variantWeight: Record<TextVariant, (typeof FONT_WEIGHTS)[keyof typeof FONT_WEIGHTS]> = {
  h1: FONT_WEIGHTS.bold,
  h2: FONT_WEIGHTS.bold,
  h3: FONT_WEIGHTS.semiBold,
  h4: FONT_WEIGHTS.semiBold,
  title: FONT_WEIGHTS.semiBold,
  titleSm: FONT_WEIGHTS.semiBold,
  body: FONT_WEIGHTS.regular,
  bodySm: FONT_WEIGHTS.regular,
  label: FONT_WEIGHTS.medium,
  caption: FONT_WEIGHTS.regular,
};

const headingVariants = new Set<TextVariant>(["h1", "h2", "h3", "h4", "title", "titleSm"]);

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  className?: string;
  /** Forwarded to the underlying RN Text (React 19 passes `ref` as a prop). */
  ref?: React.Ref<RNText>;
};

const WEIGHT_CLASS = /(^|\s)font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)(\s|$)/;
const FAMILY_CLASS = /(^|\s)font-(sans|serif|mono)(\s|$)/;

/** Typography primitive — semantic variants on the shared token palette. */
export function Text({ variant = "body", className, style, accessibilityRole, children, ...rest }: TextProps) {
  // The variant's weight/family are inline styles, which win over NativeWind
  // classes — so when the caller passes an explicit `font-*` weight or family
  // class (e.g. <Text className="font-semibold">), leave that property to it.
  const base: { fontFamily?: string; fontWeight?: (typeof FONT_WEIGHTS)[keyof typeof FONT_WEIGHTS] } = {};
  // `font-mono` resolves to FONTS.mono (Geist Mono on web, like KuiReact) rather than
  // Tailwind's default mono stack; `font-sans` / `font-serif` classes apply as written.
  if (className && /(^|\s)font-mono(\s|$)/.test(className)) base.fontFamily = FONTS.mono;
  else if (!className || !FAMILY_CLASS.test(className)) base.fontFamily = FONTS.sans;
  if (!className || !WEIGHT_CLASS.test(className)) base.fontWeight = variantWeight[variant];

  return (
    <RNText
      // Headings default to the "header" role so screen readers announce
      // them as such (KuiReact renders h1-h4/title as real <h1>-<h3>
      // elements); callers can still override via accessibilityRole.
      accessibilityRole={accessibilityRole ?? (headingVariants.has(variant) ? "header" : undefined)}
      className={cn(variantCls[variant], className)}
      style={[base, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
