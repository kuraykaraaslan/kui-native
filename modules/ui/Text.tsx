import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { cn } from "@/libs/utils/cn";
import { FONTS } from "@/libs/utils/typography";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "bodySm" | "label" | "caption";

const variantCls: Record<TextVariant, string> = {
  h1: "text-3xl text-text-primary",
  h2: "text-2xl text-text-primary",
  h3: "text-xl text-text-primary",
  h4: "text-lg text-text-primary",
  body: "text-base text-text-primary",
  bodySm: "text-sm text-text-secondary",
  label: "text-sm text-text-primary",
  caption: "text-xs text-text-secondary",
};

const variantFont: Record<TextVariant, string | undefined> = {
  h1: FONTS.sans.bold,
  h2: FONTS.sans.bold,
  h3: FONTS.sans.semiBold,
  h4: FONTS.sans.semiBold,
  body: FONTS.sans.regular,
  bodySm: FONTS.sans.regular,
  label: FONTS.sans.medium,
  caption: FONTS.sans.regular,
};

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  className?: string;
};

/** Typography primitive — semantic variants on the shared token palette. */
export function Text({ variant = "body", className, style, children, ...rest }: TextProps) {
  return (
    <RNText
      className={cn(variantCls[variant], className)}
      style={[{ fontFamily: variantFont[variant] }, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
