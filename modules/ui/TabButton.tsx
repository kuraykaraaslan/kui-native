import type * as React from "react";
import { Platform, Pressable } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type TabButtonProps = {
  active: boolean;
  /** KuiReact's `onClick`. */
  onPress: () => void;
  children: React.ReactNode;
  count?: number;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's TabButton: a `px-4 py-2 rounded-lg
 * text-sm font-semibold` pill — `bg-primary text-primary-fg shadow-sm` when
 * active — with an optional `text-[10px]` count badge. The active badge's
 * `bg-primary-fg/20` is computed from the raw token (20% = 33 alpha); hover
 * becomes the pressed state.
 */
export function TabButton({ active, onPress, children, count, className }: TabButtonProps) {
  const t = useThemeTokens();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      className={cn(
        "flex-row items-center gap-1.5 self-start rounded-lg px-4 py-2",
        active ? "bg-primary shadow-sm" : "active:bg-surface-overlay",
        className,
      )}
      style={active && Platform.OS === "android" ? { elevation: 1 } : undefined}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-semibold", active ? "text-primary-fg" : "text-text-secondary")}>{children}</Text>
      ) : (
        children
      )}
      {count !== undefined ? (
        <Text
          testID="tab-button-count"
          className={cn(
            "overflow-hidden rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
            active ? "text-primary-fg" : "bg-surface-sunken text-text-disabled",
          )}
          style={active ? { backgroundColor: `${t["primary-fg"]}33` } : undefined}
        >
          {count}
        </Text>
      ) : null}
    </Pressable>
  );
}
