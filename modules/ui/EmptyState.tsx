import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

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
  icon = faInbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const t = useThemeTokens();
  return (
    <View className={cn("items-center justify-center px-6 py-12", className)}>
      <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-surface-sunken">
        <FontAwesomeIcon icon={icon} size={24} color={t["text-secondary"]} />
      </View>
      <Text variant="h4" className="text-center">
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
