import type * as React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const containerVariant: Record<ButtonVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  outline: "bg-transparent border border-border",
  ghost: "bg-transparent",
  destructive: "bg-error",
};

const labelVariant: Record<ButtonVariant, string> = {
  primary: "text-primary-fg",
  secondary: "text-secondary-fg",
  outline: "text-text-primary",
  ghost: "text-text-primary",
  destructive: "text-text-inverse",
};

// Pixel-for-pixel with KuiReact's Button size ladder (modules/ui/Button.tsx):
// xs px-2 py-1 text-xs · sm px-3 py-1.5 text-sm · md px-4 py-2 text-sm ·
// lg px-5 py-2.5 text-base · xl px-6 py-3 text-lg.
const sizeContainer: Record<ButtonSize, string> = {
  xs: "px-2 py-1",
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-5 py-2.5",
  xl: "px-6 py-3",
};

const sizeLabel: Record<ButtonSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  className?: string;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  className,
}: ButtonProps) {
  const t = useThemeTokens();
  const isDisabled = disabled || loading;
  const lightSpinner = variant !== "outline" && variant !== "ghost";

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={cn(
        // rounded-md + font-medium below match KuiReact's Button exactly
        // (KuiReact: "rounded-md ... font-medium"); a prior pass here used
        // rounded-lg/font-semibold, one step off KuiReact's actual look.
        "flex-row items-center justify-center gap-2 rounded-md active:opacity-80",
        containerVariant[variant],
        sizeContainer[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator size="small" color={lightSpinner ? t["primary-fg"] : t.primary} />
      ) : (
        iconLeft
      )}
      <Text className={cn("font-medium", labelVariant[variant], sizeLabel[size])}>{label}</Text>
    </Pressable>
  );
}
