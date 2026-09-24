import type * as React from "react";
import { Platform, View } from "react-native";

import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

type BrandLogoSize = "sm" | "md" | "lg" | "xl" | "2xl";

// KuiReact's size classes, split into tile and label.
const sizeMap: Record<BrandLogoSize, { box: string; text: string }> = {
  sm: { box: "h-8 w-8", text: "text-sm" },
  md: { box: "h-12 w-12", text: "text-lg" },
  lg: { box: "h-16 w-16", text: "text-2xl" },
  xl: { box: "h-20 w-20", text: "text-3xl" },
  "2xl": { box: "h-24 w-24", text: "text-4xl" },
};

export type BrandLogoProps = {
  children?: React.ReactNode;
  size?: BrandLogoSize;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's BrandLogo: a `rounded-2xl bg-primary
 * shadow-sm` square tile holding a `font-bold text-primary-fg` letter or
 * short token, in 5 sizes (sm → 2xl). `className` restyles the tile
 * (e.g. `bg-secondary`).
 */
export function BrandLogo({ children, size = "md", className }: BrandLogoProps) {
  const s = sizeMap[size];
  return (
    <View
      className={cn("items-center justify-center rounded-2xl bg-primary shadow-sm", s.box, className)}
      style={Platform.OS === "android" ? { elevation: 1 } : undefined}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <Text className={cn("font-bold text-primary-fg", s.text)}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
