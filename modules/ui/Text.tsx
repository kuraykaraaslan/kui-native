import type * as React from "react";
import { Text as RNText, StyleSheet, type TextProps as RNTextProps, type TextStyle } from "react-native";

import { cn } from "../../libs/utils/cn";
import { FONT_WEIGHTS, fontStyle, fontWeightName, usesWeightFamilies, type FontWeightName } from "../../libs/utils/typography";

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

const variantWeight: Record<TextVariant, FontWeightName> = {
  h1: "bold",
  h2: "bold",
  h3: "semiBold",
  h4: "semiBold",
  title: "semiBold",
  titleSm: "semiBold",
  body: "regular",
  bodySm: "regular",
  label: "medium",
  caption: "regular",
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
  // `font-mono` resolves to the configured/default mono family (Geist Mono on
  // web, like KuiReact) rather than Tailwind's default mono stack; `font-sans`
  // / `font-serif` classes apply as written.
  const family = className && /(^|\s)font-mono(\s|$)/.test(className) ? "mono" : !className || !FAMILY_CLASS.test(className) ? "sans" : null;
  const classWeight = className ? fontWeightName(WEIGHT_CLASS.exec(className)?.[2]) : undefined;
  let base: TextStyle = {};
  let override: TextStyle | undefined;
  const weightFamilies = family !== null && usesWeightFamilies(family);
  const flat = weightFamilies ? StyleSheet.flatten(style) : undefined;
  if (family && weightFamilies && flat?.fontFamily == null) {
    // Per-weight families (configureFonts): the weight picks the family —
    // from the caller's style, a `font-*` class or the variant — and any
    // fontWeight from the class/style is reset so it can't fake-bold it.
    const styleWeight = fontWeightName(flat?.fontWeight);
    base = fontStyle(styleWeight ?? classWeight ?? variantWeight[variant], family);
    if (styleWeight || classWeight) override = { fontWeight: "400" };
  } else {
    if (family) base.fontFamily = fontStyle("regular", family).fontFamily;
    if (!classWeight) base.fontWeight = FONT_WEIGHTS[variantWeight[variant]];
  }

  return (
    <RNText
      // Headings default to the "header" role so screen readers announce
      // them as such (KuiReact renders h1-h4/title as real <h1>-<h3>
      // elements); callers can still override via accessibilityRole.
      accessibilityRole={accessibilityRole ?? (headingVariants.has(variant) ? "header" : undefined)}
      className={cn(variantCls[variant], className)}
      style={override ? [base, style, override] : [base, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
