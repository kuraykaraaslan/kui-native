import type * as React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

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

const sizeContainer: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5",
  md: "px-4 py-2.5",
  lg: "px-5 py-3",
};

const sizeLabel: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
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
        "flex-row items-center justify-center gap-2 rounded-lg active:opacity-80",
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
      <Text className={cn("font-semibold", labelVariant[variant], sizeLabel[size])}>{label}</Text>
    </Pressable>
  );
}
