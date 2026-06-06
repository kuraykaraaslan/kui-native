import { useMemo, useState } from "react";
import type * as React from "react";
import { router, usePathname } from "expo-router";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeTokens } from "@/libs/theme";
import { Text } from "@/modules/ui";

import {
  CATEGORY_ORDER,
  REGISTRY,
  type ShowcaseCategory,
  type ShowcaseEntry,
} from "../registry";
import { useDrawer } from "./drawer.store";

/** Two-letter codes for the abbr badge (KUIREACT style). */
const ABBR: Record<string, string> = {
  button: "Bt",
  text: "Tx",
  card: "Cd",
  avatar: "Av",
  badge: "Bg",
  "text-input": "In",
  checkbox: "Cb",
  switch: "Sw",
  spinner: "Sp",
  "empty-state": "Es",
  "skeleton-card": "Sk",
  modal: "Md",
};

const categoryBadge: Record<ShowcaseCategory, string> = {
  Atoms: "bg-info-subtle",
  Forms: "bg-primary-subtle",
  Feedback: "bg-success-subtle",
  Overlays: "bg-warning-subtle",
};
const categoryBadgeText: Record<ShowcaseCategory, string> = {
  Atoms: "text-info-fg",
  Forms: "text-primary",
  Feedback: "text-success-fg",
  Overlays: "text-warning-fg",
};

function NavRow({
  active,
  children,
  onPress,
  accessibilityLabel,
}: {
  active: boolean;
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={accessibilityLabel}
      className={`flex-row items-center gap-3 rounded-lg px-3 py-2 active:opacity-80 ${
        active ? "bg-primary-subtle" : ""
      }`}
    >
      {children}
    </Pressable>
  );
}

export function Sidebar() {
  const t = useThemeTokens();
  const pathname = usePathname();
  const close = useDrawer((s) => s.close);
  const [query, setQuery] = useState("");

  const activeId = pathname.startsWith("/component/") ? pathname.split("/").pop() : null;
  const homeActive = pathname === "/";

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? REGISTRY.filter(
          (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
        )
      : REGISTRY;
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: matches.filter((e) => e.category === category),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const go = (path: Parameters<typeof router.navigate>[0]) => {
    close();
    router.navigate(path);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-surface-raised">
      {/* Brand header */}
      <View className="h-14 flex-row items-center gap-2.5 border-b border-border px-4">
        <View className="h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <Text className="text-sm font-bold text-primary-fg">K</Text>
        </View>
        <View>
          <Text variant="label" className="font-semibold leading-tight">
            KUInative
          </Text>
          <Text variant="caption">Component library</Text>
        </View>
      </View>

      {/* Search */}
      <View className="border-b border-border px-3 py-2">
        <View className="flex-row items-center gap-2 rounded-md border border-border bg-surface-base px-2.5">
          <FontAwesomeIcon icon={faMagnifyingGlass} size={12} color={t["text-secondary"]} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search components…"
            placeholderTextColor={t["text-disabled"]}
            autoCapitalize="none"
            autoCorrect={false}
            className="flex-1 py-2 text-sm text-text-primary"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-2 py-3 gap-1"
        keyboardShouldPersistTaps="handled"
      >
        {/* Home */}
        <NavRow active={homeActive} onPress={() => go("/")} accessibilityLabel="Home">
          <View
            className={`h-7 w-7 items-center justify-center rounded-md ${
              homeActive ? "bg-primary" : "bg-surface-sunken"
            }`}
          >
            <FontAwesomeIcon
              icon={faHouse}
              size={12}
              color={homeActive ? t["primary-fg"] : t["text-secondary"]}
            />
          </View>
          <Text
            variant="label"
            className={homeActive ? "font-medium text-primary" : "text-text-secondary"}
          >
            Home
          </Text>
        </NavRow>

        {groups.map((group) => (
          <View key={group.category} className="gap-0.5">
            <Text className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-text-disabled">
              {group.category}
            </Text>
            {group.items.map((entry: ShowcaseEntry) => {
              const active = entry.id === activeId;
              return (
                <NavRow
                  key={entry.id}
                  active={active}
                  accessibilityLabel={entry.title}
                  onPress={() => go({ pathname: "/component/[id]", params: { id: entry.id } })}
                >
                  <View
                    className={`h-7 w-7 items-center justify-center rounded-md ${
                      active ? "bg-primary" : "bg-surface-sunken"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        active ? "text-primary-fg" : "text-text-secondary"
                      }`}
                    >
                      {ABBR[entry.id] ?? entry.title.slice(0, 2)}
                    </Text>
                  </View>
                  <Text
                    variant="label"
                    numberOfLines={1}
                    className={`flex-1 ${active ? "font-medium text-primary" : "text-text-primary"}`}
                  >
                    {entry.title}
                  </Text>
                  <View className={`rounded-full px-1.5 py-0.5 ${categoryBadge[entry.category]}`}>
                    <Text className={`text-[10px] font-medium ${categoryBadgeText[entry.category]}`}>
                      {entry.category}
                    </Text>
                  </View>
                </NavRow>
              );
            })}
          </View>
        ))}

        {groups.length === 0 ? (
          <Text variant="bodySm" className="px-3 py-6 text-center">
            No results for “{query}”.
          </Text>
        ) : null}
      </ScrollView>

      {/* Footer */}
      <View className="flex-row items-center gap-2.5 border-t border-border px-4 py-3">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-subtle">
          <Text className="text-xs font-bold text-primary">K</Text>
        </View>
        <View>
          <Text variant="caption" className="font-semibold text-text-primary">
            Kuray Karaaslan
          </Text>
          <Text className="text-[10px] text-text-secondary">kui-native</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
