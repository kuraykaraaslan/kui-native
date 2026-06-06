import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { Text } from "@/modules/ui";

import type { ShowcaseEntry } from "../registry";

export function ComponentCard({ entry }: { entry: ShowcaseEntry }) {
  const t = useThemeTokens();
  const Preview = entry.preview;

  return (
    <Link href={{ pathname: "/component/[id]", params: { id: entry.id } }} asChild>
      <Pressable className="overflow-hidden rounded-2xl border border-border bg-surface-raised active:opacity-90">
        <View className="h-24 items-center justify-center bg-surface-overlay px-3 py-2">
          <Preview />
        </View>
        <View className="flex-row items-center gap-3 px-4 py-3">
          <View className="h-9 w-9 items-center justify-center rounded-lg bg-primary-subtle">
            <FontAwesomeIcon icon={entry.icon} size={15} color={t.primary} />
          </View>
          <View className="flex-1">
            <Text variant="label" className="font-semibold" numberOfLines={1}>
              {entry.title}
            </Text>
            <Text variant="caption" numberOfLines={2}>
              {entry.description}
            </Text>
          </View>
          <FontAwesomeIcon icon={faChevronRight} size={14} color={t["text-disabled"]} />
        </View>
      </Pressable>
    </Link>
  );
}
