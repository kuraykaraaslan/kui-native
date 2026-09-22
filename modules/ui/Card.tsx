import type * as React from "react";
import { Platform, Pressable, View, type ViewProps } from "react-native";

import { cn } from "@/libs/utils/cn";

import { SkeletonLine } from "./Skeleton";
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
  /** Slot rendered opposite the title/subtitle in the header row (KuiReact's `headerRight`). */
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  /** Makes the whole card pressable (KuiReact's `onClick`, which renders a <button>). */
  onPress?: () => void;
  /** KuiReact's hover elevation; on touch it is the pressed state. Implied by `onPress`. */
  hoverable?: boolean;
  /** Replaces the content with KuiReact's four-line pulsing skeleton. */
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type CardContentProps = Pick<CardProps, "loading" | "title" | "subtitle" | "headerRight" | "footer" | "children">;

function CardContent({ loading, title, subtitle, headerRight, footer, children }: CardContentProps) {
  // KuiReact renders the header only when there is a title or headerRight.
  const hasHeader = Boolean(title || headerRight);
  return loading ? (
    // KuiReact: "px-6 py-4 space-y-3 animate-pulse" with h-4 w-2/3 · h-3 w-full · h-3 w-4/5 · h-3 w-1/2.
    <View className="gap-3 px-6 py-4" accessible accessibilityRole="progressbar" accessibilityLabel="Loading content">
      <SkeletonLine width="w-2/3" className="h-4" />
      <SkeletonLine width="w-full" />
      <SkeletonLine width="w-4/5" />
      <SkeletonLine width="w-1/2" />
    </View>
  ) : (
    <>
      {hasHeader ? (
        // KuiReact: "flex items-start justify-between gap-3 px-6 py-4 border-b border-border"
        <View className="flex-row items-start justify-between gap-3 border-b border-border px-6 py-4">
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
        <View className="border-t border-border bg-surface-base px-6 py-3">{footer}</View>
      ) : null}
    </>
  );
}

export function Card({
  title,
  subtitle,
  headerRight,
  footer,
  variant = "raised",
  onPress,
  hoverable,
  loading = false,
  className,
  children,
  style,
  ...rest
}: CardProps) {
  const interactive = Boolean(onPress);
  const pressFeedback = Boolean(hoverable || interactive);

  const body = <CardContent {...{ loading, title, subtitle, headerRight, footer, children }} />;

  const cls = cn(
    "overflow-hidden rounded-xl",
    variantCls[variant],
    // KuiReact: "hover:shadow-md hover:border-border-focus" → pressed state on touch.
    pressFeedback && "active:border-border-focus active:shadow-md",
    className,
  );
  // NativeWind's shadow-sm sets the iOS shadow props only; Android needs elevation.
  const elevation = variant === "raised" && Platform.OS === "android" ? { elevation: 2 } : null;

  if (interactive && !loading) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
        className={cn(cls, "w-full")}
        style={[elevation, style as never]}
        {...(rest as object)}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View className={cls} style={[elevation, style]} {...rest}>
      {body}
    </View>
  );
}
