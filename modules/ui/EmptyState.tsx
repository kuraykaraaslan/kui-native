import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Button } from "./Button";
import { Text } from "./Text";

export type EmptyStateProps = {
  icon?: IconDefinition;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

/** Placeholder for empty lists/screens — use as FlatList's ListEmptyComponent. */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const t = useThemeTokens();
  return (
    // KuiReact: "flex flex-col items-center justify-center text-center py-16 px-6"
    <View className={cn("items-center justify-center px-6 py-16", className)}>
      {/* KuiReact: 48px (h-12 w-12) circle, text-disabled icon, and no circle at
          all when `icon` is omitted (its "Minimal" variant). A prior pass here
          used 56px, text-secondary, and always defaulted to an inbox icon. */}
      {icon ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-surface-sunken"
        >
          <FontAwesomeIcon icon={icon} size={24} color={t["text-disabled"]} />
        </View>
      ) : null}
      {/* KuiReact's title is "text-sm font-semibold", not the h4 (text-lg)
          scale; `titleSm` also defaults to the "header" accessibility role. */}
      <Text variant="titleSm" className="text-center">
        {title}
      </Text>
      {description ? (
        <Text variant="bodySm" className="mt-1 text-center">
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} className="mt-4" />
      ) : null}
    </View>
  );
}
