import { View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info";

const containerCls: Record<BadgeVariant, string> = {
  default: "bg-surface-sunken",
  primary: "bg-primary-subtle",
  success: "bg-success-subtle",
  warning: "bg-warning-subtle",
  error: "bg-error-subtle",
  info: "bg-info-subtle",
};

const labelCls: Record<BadgeVariant, string> = {
  default: "text-text-secondary",
  primary: "text-primary",
  success: "text-success-fg",
  warning: "text-warning-fg",
  error: "text-error-fg",
  info: "text-info-fg",
};

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <View className={cn("self-start rounded-full px-2 py-0.5", containerCls[variant], className)}>
      <Text className={cn("text-xs font-medium", labelCls[variant])}>{label}</Text>
    </View>
  );
}
