import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeTokens } from "@/libs/theme";
import { Text } from "@/modules/ui";

import { useDrawer, useIsDesktop } from "./drawer.store";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const t = useThemeTokens();
  const setOpen = useDrawer((s) => s.setOpen);
  const desktop = useIsDesktop();

  return (
    // KuiReact AppShell header: `h-14 px-4 border-b border-border bg-surface-raised`; the menu
    // button is `lg:hidden` (the aside is always visible at lg and above).
    <SafeAreaView edges={["top"]} className="border-b border-border bg-surface-raised">
      <View className="h-14 flex-row items-center gap-2 px-4">
        {!desktop ? (
        <Pressable
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          hitSlop={8}
          className="h-9 w-9 items-center justify-center rounded-md active:bg-surface-overlay"
        >
          <FontAwesomeIcon icon={faBars} size={16} color={t["text-secondary"]} />
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
