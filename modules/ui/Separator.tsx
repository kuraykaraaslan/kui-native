import { View, type ViewProps } from "react-native";

import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

export type SeparatorProps = ViewProps & {
  orientation?: "horizontal" | "vertical";
  /** Purely visual, no semantic meaning (e.g. a card's internal rule).
   * Mirrors KuiReact's `decorative` — hides the line from assistive tech. */
  decorative?: boolean;
  /** Optional centered label (horizontal only), e.g. "OR". */
  label?: string;
  className?: string;
};

/** Thin dividing rule — mirrors KuiReact's `Separator`. */
export function Separator({ orientation = "horizontal", decorative = false, label, className, ...rest }: SeparatorProps) {
  const isVertical = orientation === "vertical";

  if (label && !isVertical) {
    return (
      <View
        className={cn("flex-row items-center gap-3", className)}
        accessibilityElementsHidden={decorative}
        importantForAccessibility={decorative ? "no-hide-descendants" : "auto"}
        accessibilityRole={decorative ? undefined : "none"}
        {...rest}
      >
        <View className="h-px flex-1 bg-border" />
        <Text variant="caption">{label}</Text>
        <View className="h-px flex-1 bg-border" />
      </View>
    );
  }

  return (
    <View
      className={cn(isVertical ? "w-px self-stretch bg-border" : "h-px w-full bg-border", className)}
      accessibilityElementsHidden={decorative}
      importantForAccessibility={decorative ? "no-hide-descendants" : "auto"}
      accessibilityRole={decorative ? undefined : "none"}
      {...rest}
    />
  );
}
