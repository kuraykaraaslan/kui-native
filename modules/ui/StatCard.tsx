import { View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type StatCardProps = {
  label: string;
  value: number | string;
  /** Text colour class for the value (default `text-text-primary`). */
  accent?: string;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's StatCard: a `bg-surface-raised border
 * border-border rounded-xl px-5 py-4` tile with a `text-2xl font-black
 * tabular-nums` value over a `text-xs` label.
 */
export function StatCard({ label, value, accent, className }: StatCardProps) {
  return (
    <View className={cn("flex-col gap-1 rounded-xl border border-border bg-surface-raised px-5 py-4", className)}>
      <Text className={cn("text-2xl font-black", accent ?? "text-text-primary")} style={{ fontVariant: ["tabular-nums"] }}>
        {value}
      </Text>
      <Text className="text-xs text-text-secondary">{label}</Text>
    </View>
  );
}
