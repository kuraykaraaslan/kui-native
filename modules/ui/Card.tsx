import type * as React from "react";
import { Platform, View, type ViewProps } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type CardVariant = "raised" | "flat" | "outline";

// Pixel-for-pixel with KuiReact's Card (modules/ui/Card.tsx): every variant
// gets `border border-border`; only `raised` adds a shadow.
const variantCls: Record<CardVariant, string> = {
  raised: "bg-surface-raised border border-border shadow-sm",
  flat: "bg-surface-base border border-border",
  outline: "bg-transparent border border-border",
};

export type CardProps = ViewProps & {
  title?: string;
  subtitle?: string;
  /** Slot rendered opposite the title/subtitle in the header row (e.g. an
   * action button or menu trigger). Mirrors KuiReact's `headerRight`. */
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  children?: React.ReactNode;
};

export function Card({
  title,
  subtitle,
  headerRight,
  footer,
  variant = "raised",
  className,
  children,
  style,
  ...rest
}: CardProps) {
  const hasHeader = Boolean(title || subtitle || headerRight);
  return (
    <View
      className={cn("rounded-xl overflow-hidden", variantCls[variant], className)}
      // NativeWind's `shadow-sm` sets the iOS shadow* style props but not
      // Android's `elevation`, so Android needs it set explicitly to render
      // the same raised look KuiReact gets from a CSS box-shadow.
      style={[variant === "raised" && Platform.OS === "android" ? { elevation: 2 } : null, style]}
      {...rest}
    >
      {hasHeader ? (
        // KuiReact: "flex items-start justify-between gap-3 px-6 py-4 border-b border-border"
        <View className="flex-row items-start justify-between gap-3 px-6 py-4 border-b border-border">
          <View className="flex-1">
            {title ? <Text variant="titleSm">{title}</Text> : null}
            {subtitle ? (
              <Text variant="caption" className="mt-0.5">
                {subtitle}
              </Text>
            ) : null}
          </View>
          {headerRight ? <View>{headerRight}</View> : null}
        </View>
      ) : null}
      {children ? <View className="px-6 py-4">{children}</View> : null}
      {footer ? (
        // KuiReact's footer always uses `bg-surface-base`, even inside an
        // `outline`/`flat` card — this is intentional, not a mismatch.
        <View className="px-6 py-3 border-t border-border bg-surface-base">{footer}</View>
      ) : null}
    </View>
  );
}
