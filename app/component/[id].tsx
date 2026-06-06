import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getEntry } from "@/modules/showcase/registry";
import { CodeBlock } from "@/modules/showcase/ui/CodeBlock";
import { Header } from "@/modules/showcase/ui/Header";
import { Badge, EmptyState, Text } from "@/modules/ui";

export default function ComponentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = getEntry(id);

  if (!entry) {
    return (
      <View className="flex-1 bg-surface-base">
        <Header title="Not found" back />
        <EmptyState title="Not found" description={`No component "${id}".`} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-base">
      <Header title={entry.title} back />
      <SafeAreaView edges={["bottom"]} className="flex-1">
        <ScrollView contentContainerClassName="p-4 gap-5" keyboardShouldPersistTaps="handled">
          <View className="gap-2">
            <Badge label={entry.category} variant="primary" />
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
