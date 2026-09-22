import type * as React from "react";
import { Pressable, View } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type ButtonGroupVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonGroupSize = "xs" | "sm" | "md" | "lg";

// KuiReact's variantClasses (modules/ui/ButtonGroup.tsx), split into the
// pressable box and its label. `bg-primary/20` / `hover:bg-primary/40` can't
// use opacity modifiers on KuiNative's var() tokens, so those two are
// computed from the raw hex token below (20% = 33, 40% = 66 alpha).
const variantClasses: Record<ButtonGroupVariant, { box: string; text: string; active: string; activeText: string; inactive: string }> = {
  primary: { box: "", text: "text-primary-fg", active: "bg-primary", activeText: "", inactive: "" },
  secondary: { box: "", text: "text-secondary-fg", active: "bg-secondary", activeText: "", inactive: "" },
  outline: {
    box: "border-y border-border",
    text: "text-text-primary",
    active: "bg-surface-overlay",
    activeText: "font-semibold",
    inactive: "bg-surface-base active:bg-surface-overlay",
  },
  ghost: {
    box: "",
    text: "text-text-primary",
    active: "bg-surface-overlay",
    activeText: "font-semibold",
    inactive: "active:bg-surface-overlay",
  },
};

const sizeClasses: Record<ButtonGroupSize, { box: string; text: string }> = {
  xs: { box: "px-2 py-1", text: "text-xs" },
  sm: { box: "px-3 py-1.5", text: "text-sm" },
  md: { box: "px-4 py-2", text: "text-sm" },
  lg: { box: "px-5 py-2.5", text: "text-base" },
};

export type ButtonGroupItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export type ButtonGroupProps = {
  items: ButtonGroupItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's ButtonGroup: a segmented, single-select
 * group (`inline-flex rounded-md overflow-hidden`). The outline variant adds
 * a bordered frame with dividers (KuiReact's `divide-x`, drawn here as a
 * `border-l` on every item after the first). Each item reports its pressed
 * state (KuiReact: aria-pressed).
 */
export function ButtonGroup({ items, value, onChange, variant = "outline", size = "md", className }: ButtonGroupProps) {
  const t = useThemeTokens();
  const v = variantClasses[variant];
  const s = sizeClasses[size];
  const tinted = variant === "primary" || variant === "secondary" ? t[variant] : null;

  return (
    <View
      role="group"
      className={cn(
        "flex-row self-start overflow-hidden rounded-md",
        variant === "outline" && "border border-border",
        className,
      )}
    >
      {items.map((item, i) => {
        const active = item.value === value;
        return (
          <Pressable
            key={item.value}
            accessibilityRole="button"
            accessibilityState={{ selected: active, disabled: Boolean(item.disabled) }}
            disabled={item.disabled}
            onPress={() => onChange(item.value)}
            className={cn(
              "items-center justify-center",
              v.box,
              active ? v.active : v.inactive,
              s.box,
              variant === "outline" && i > 0 && "border-l border-l-border",
              i === 0 && variant !== "outline" && "rounded-l-md",
              i === items.length - 1 && variant !== "outline" && "rounded-r-md",
              item.disabled && "opacity-50",
            )}
            style={tinted && !active ? ({ pressed }) => ({ backgroundColor: `${tinted}${pressed ? "66" : "33"}` }) : undefined}
          >
            {typeof item.label === "string" ? (
              <Text className={cn("font-medium", s.text, v.text, active && v.activeText)}>{item.label}</Text>
            ) : (
              item.label
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
