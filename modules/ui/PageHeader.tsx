import type * as React from "react";
import { Pressable, View } from "react-native";
import { router, type Href } from "expo-router";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type ActionVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";

// KuiReact's variantMap (modules/ui/PageHeader.tsx), split into box and
// label; hover states become pressed states.
const variantMap: Record<ActionVariant, { box: string; text: string }> = {
  primary: { box: "bg-primary active:bg-primary-hover", text: "text-primary-fg" },
  secondary: { box: "bg-secondary active:bg-secondary-hover", text: "text-secondary-fg" },
  outline: { box: "border border-border active:bg-surface-overlay", text: "text-text-primary" },
  danger: { box: "bg-error active:opacity-90", text: "text-text-inverse" },
  ghost: { box: "bg-transparent active:bg-surface-overlay", text: "text-text-primary" },
};

export type PageHeaderAction = {
  label: React.ReactNode;
  /** KuiReact's `onClick`. */
  onPress?: () => void;
  /** Route pushed with expo-router (KuiReact renders an `<a href>`). */
  href?: string;
  variant?: ActionVariant;
  disabled?: boolean;
};

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: PageHeaderAction[];
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's PageHeader: a `text-2xl font-bold` title
 * with an optional badge and `text-sm` subtitle on the left, `px-4 py-2
 * rounded-md text-sm font-medium` action buttons on the right, and a
 * `pb-5 border-b border-border` divider below.
 */
export function PageHeader({ title, subtitle, badge, actions, className }: PageHeaderProps) {
  return (
    <View className={cn("flex-row items-start justify-between gap-4 border-b border-border pb-5", className)}>
      <View className="min-w-0 shrink">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text accessibilityRole="header" className="text-2xl font-bold leading-tight text-text-primary">
            {title}
          </Text>
          {badge}
        </View>
        {subtitle ? <Text className="mt-0.5 text-sm text-text-secondary">{subtitle}</Text> : null}
      </View>

      {actions && actions.length > 0 ? (
        <View className="shrink-0 flex-row flex-wrap items-center justify-end gap-2">
          {actions.map((action, i) => {
            const v = variantMap[action.variant ?? "primary"];
            const onPress = action.onPress ?? (action.href ? () => router.push(action.href as Href) : undefined);
            return (
              <Pressable
                key={i}
                accessibilityRole={action.href ? "link" : "button"}
                accessibilityState={{ disabled: Boolean(action.disabled) }}
                disabled={action.disabled}
                onPress={onPress}
                className={cn("flex-row items-center gap-2 rounded-md px-4 py-2", v.box, action.disabled && "opacity-50")}
              >
                {typeof action.label === "string" ? (
                  <Text className={cn("text-sm font-medium", v.text)}>{action.label}</Text>
                ) : (
                  action.label
                )}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
