import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getEntry, REGISTRY } from "@/modules/showcase/registry";
import { CodeBlock } from "@/modules/showcase/ui/CodeBlock";
import { Header } from "@/modules/showcase/ui/Header";
import { SiteHead } from "@/modules/showcase/ui/SiteHead";
import { Badge, EmptyState, Text } from "@/modules/ui";

// Pre-render one HTML page per component for the static web export.
export function generateStaticParams(): { id: string }[] {
  return REGISTRY.map((entry) => ({ id: entry.id }));
}

export default function ComponentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = getEntry(id);

  if (!entry) {
    return (
      <View className="flex-1 bg-surface-base">
        <SiteHead title="404 — Not Found" absolute />
        <Header title="Not found" />
        <EmptyState title="Not found" description={`No component "${id}".`} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-base">
      <SiteHead title={entry.title} description={entry.description} path={`/component/${entry.id}`} />
      <Header title={entry.title} />
      <SafeAreaView edges={["bottom"]} className="flex-1">
        <ScrollView contentContainerClassName="p-4 sm:p-6 gap-5" keyboardShouldPersistTaps="handled">
          <View className="gap-2">
            <Badge variant="primary">{entry.category}</Badge>
            <Text variant="body">{entry.description}</Text>
            <CodeBlock code={entry.usage} />
          </View>

          {entry.variants.map((variant) => {
            const { Demo } = variant;
            return (
              <View key={variant.title} className="gap-2">
                <Text variant="label" className="font-semibold">
                  {variant.title}
                </Text>
                <View className="items-start rounded-2xl border border-border bg-surface-raised p-5">
                  <Demo />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
