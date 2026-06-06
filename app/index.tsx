import { useMemo, useState } from "react";
import { SectionList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showcaseConfig } from "@/libs/config/showcase.config";
import {
  CATEGORY_ORDER,
  REGISTRY,
  type ShowcaseCategory,
  type ShowcaseEntry,
} from "@/modules/showcase/registry";
import { ComponentCard } from "@/modules/showcase/ui/ComponentCard";
import { Header } from "@/modules/showcase/ui/Header";
import { Text, TextInput } from "@/modules/ui";

type Section = { title: ShowcaseCategory; data: ShowcaseEntry[] };

export default function Home() {
  const [query, setQuery] = useState("");

  const sections = useMemo<Section[]>(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? REGISTRY.filter(
          (e) =>
            e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
        )
      : REGISTRY;
    return CATEGORY_ORDER.map((category) => ({
      title: category,
      data: matches.filter((e) => e.category === category),
    })).filter((s) => s.data.length > 0);
  }, [query]);

  return (
    <View className="flex-1 bg-surface-base">
      <Header
        title={showcaseConfig.name}
        subtitle={`${showcaseConfig.tagline} · ${REGISTRY.length} components`}
      />
      <SafeAreaView edges={["bottom"]} className="flex-1">
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4 gap-3"
          keyboardShouldPersistTaps="handled"
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <TextInput
              placeholder="Search components…"
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
              containerClassName="mb-1"
            />
          }
          renderSectionHeader={({ section }) => (
            <Text variant="caption" className="mb-1 mt-2 font-semibold uppercase">
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => <ComponentCard entry={item} />}
          ListEmptyComponent={
            <View className="py-16">
              <Text variant="bodySm" className="text-center">
                No components match “{query}”.
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
