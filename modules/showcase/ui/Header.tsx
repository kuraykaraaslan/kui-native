import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeTokens } from "@/libs/theme";
import { Text } from "@/modules/ui";

import { ThemeToggle } from "./ThemeToggle";

export function Header({
  title,
  subtitle,
  back = false,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
}) {
  const t = useThemeTokens();

  return (
    <SafeAreaView edges={["top"]} className="border-b border-border bg-surface-base">
      <View className="flex-row items-center gap-2 px-4 py-3">
        {back ? (
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            className="-ml-1 h-9 w-9 items-center justify-center rounded-lg active:opacity-70"
          >
            <FontAwesomeIcon icon={faChevronLeft} size={18} color={t["text-primary"]} />
          </Pressable>
        ) : null}
        <View className="flex-1">
          <Text variant="h3" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text variant="caption" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <ThemeToggle />
      </View>
    </SafeAreaView>
  );
}
