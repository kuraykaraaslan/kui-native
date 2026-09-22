import type * as React from "react";
import { ActivityIndicator, Pressable, View, type PressableProps, type View as RNView } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

/** `destructive` is a deprecated alias for KuiReact's `danger`. */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline" | "destructive";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Pixel-for-pixel with KuiReact's Button (modules/ui/Button.tsx). KuiReact's
// hover colours become the pressed (`active:`) state on touch.
const containerVariant: Record<ButtonVariant, string> = {
  primary: "bg-primary active:bg-primary-hover",
  secondary: "bg-secondary active:bg-secondary-hover",
  ghost: "bg-transparent active:bg-surface-overlay",
  danger: "bg-error active:opacity-90",
  outline: "border border-border active:bg-surface-overlay",
  destructive: "bg-error active:opacity-90",
};

const labelVariant: Record<ButtonVariant, string> = {
  primary: "text-primary-fg",
  secondary: "text-secondary-fg",
  ghost: "text-text-primary",
  danger: "text-text-inverse",
  outline: "text-text-primary",
  destructive: "text-text-inverse",
};

// KuiReact: xs px-2 py-1 text-xs · sm px-3 py-1.5 text-sm · md px-4 py-2 text-sm ·
// lg px-5 py-2.5 text-base · xl px-6 py-3 text-lg.
const sizeContainer: Record<ButtonSize, string> = {
  xs: "px-2 py-1",
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-5 py-2.5",
  xl: "px-6 py-3",
};

// KuiReact iconOnly: xs p-1 · sm p-1.5 · md p-2 · lg p-2.5 · xl p-3.
const iconOnlySize: Record<ButtonSize, string> = {
  xs: "p-1",
  sm: "p-1.5",
  md: "p-2",
  lg: "p-2.5",
  xl: "p-3",
};

const sizeLabel: Record<ButtonSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  /** Button content (KuiReact's API). Strings are rendered in the variant's text style. */
  children?: React.ReactNode;
  /** @deprecated Use `children` (KuiReact's API). */
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Square padding for an icon-only button; pass `accessibilityLabel` (KuiReact: aria-label). */
  iconOnly?: boolean;
  /** Toggle-button pressed state: focus ring + `selected` accessibility state (KuiReact: aria-pressed). */
  selected?: boolean;
  className?: string;
  ref?: React.Ref<RNView>;
};

export function Button({
  children,
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  selected = false,
  className,
  accessibilityLabel,
  accessibilityState,
  ref,
  ...rest
}: ButtonProps) {
  const t = useThemeTokens();
  const isDisabled = disabled || loading;
  const content = children ?? label;
  const textual = typeof content === "string" || typeof content === "number";
  const lightSpinner = variant !== "outline" && variant !== "ghost";

  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (textual ? String(content) : undefined)}
      accessibilityState={{ disabled: isDisabled, busy: loading, selected, ...accessibilityState }}
      className={cn(
        // KuiReact: "inline-flex items-center justify-center gap-2 rounded-md font-medium"
        "flex-row items-center justify-center gap-2 rounded-md",
        containerVariant[variant],
        iconOnly ? iconOnlySize[size] : sizeContainer[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50",
        className,
      )}
      // KuiReact's `selected` adds "ring-2 ring-border-focus" — an outline
      // outside the border, which RN renders with the outline style props.
      style={selected ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" } : undefined}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={lightSpinner ? t["primary-fg"] : t.primary} />
      ) : iconLeft ? (
        <View className="shrink-0" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {iconLeft}
        </View>
      ) : null}
      {textual ? (
        <Text className={cn("font-medium", labelVariant[variant], sizeLabel[size])}>{content}</Text>
      ) : (
        content
      )}
      {!loading && iconRight ? (
        <View className="shrink-0" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {iconRight}
        </View>
      ) : null}
    </Pressable>
  );
}
