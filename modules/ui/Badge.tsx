import type * as React from "react";
import { Pressable, View, type ViewProps } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

/** `default` is a deprecated alias for KuiReact's `neutral`. */
type BadgeVariant = "success" | "error" | "warning" | "info" | "neutral" | "primary" | "default";
type BadgeSize = "sm" | "md" | "lg";

// Pixel-for-pixel with KuiReact's Badge (modules/ui/Badge.tsx).
const containerCls: Record<BadgeVariant, string> = {
  success: "bg-success-subtle",
  error: "bg-error-subtle",
  warning: "bg-warning-subtle",
  info: "bg-info-subtle",
  neutral: "bg-surface-sunken",
  primary: "bg-primary-subtle",
  default: "bg-surface-sunken",
};

const textCls: Record<BadgeVariant, string> = {
  success: "text-success-fg",
  error: "text-error-fg",
  warning: "text-warning-fg",
  info: "text-info-fg",
  neutral: "text-text-secondary",
  primary: "text-primary",
  default: "text-text-secondary",
};

// Raw token behind each text colour, for the FontAwesome × icon.
const textToken: Record<BadgeVariant, string> = {
  success: "success-fg",
  error: "error-fg",
  warning: "warning-fg",
  info: "info-fg",
  neutral: "text-secondary",
  primary: "primary",
  default: "text-secondary",
};

const dotCls: Record<BadgeVariant, string> = {
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
  neutral: "bg-text-disabled",
  primary: "bg-primary",
  default: "bg-text-disabled",
};

// KuiReact: sm "px-1.5 py-0 text-[10px]" · md "px-2 py-0.5 text-xs" · lg "px-3 py-1 text-sm".
const sizeBox: Record<BadgeSize, string> = { sm: "px-1.5 py-0", md: "px-2 py-0.5", lg: "px-3 py-1" };
const sizeText: Record<BadgeSize, string> = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" };

export type BadgeProps = Omit<ViewProps, "children"> & {
  /** Badge content (KuiReact's API). */
  children?: React.ReactNode;
  /** @deprecated Use `children` (KuiReact's API). */
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

export function Badge({
  children,
  label,
  variant = "neutral",
  size = "md",
  dot = false,
  dismissible = false,
  onDismiss,
  className,
  ...rest
}: BadgeProps) {
  const t = useThemeTokens();
  const content = children ?? label;
  const textual = typeof content === "string" || typeof content === "number";

  return (
    // KuiReact: "inline-flex items-center gap-1 rounded-full font-medium"
    <View
      className={cn("flex-row items-center gap-1 self-start rounded-full", containerCls[variant], sizeBox[size], className)}
      {...rest}
    >
      {dot ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotCls[variant])}
        />
      ) : null}
      {textual ? <Text className={cn("font-medium", sizeText[size], textCls[variant])}>{content}</Text> : content}
      {dismissible ? (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Remove"
          // The 10px × is far below a 44pt touch target; hitSlop fixes that
          // without changing KuiReact's visual.
          hitSlop={12}
          className="ml-0.5 rounded-full active:opacity-70"
        >
          <FontAwesomeIcon icon={faXmark} size={10} color={t[textToken[variant]]} />
        </Pressable>
      ) : null}
    </View>
  );
}
