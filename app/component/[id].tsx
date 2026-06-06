import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getEntry } from "@/modules/showcase/registry";
import { EmptyState, Text } from "@/modules/ui";

export default function ComponentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = getEntry(id);

  if (!entry) {
    return (
      <SafeAreaView edges={["bottom"]} className="flex-1 bg-surface-base">
        <Stack.Screen options={{ title: "Not found" }} />
        <EmptyState title="Not found" description={`No component "${id}".`} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-surface-base">
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView contentContainerClassName="p-4 gap-4">
        <View>
          <Text variant="h2">{entry.title}</Text>
          <Text variant="bodySm">{entry.category}</Text>
        </View>
        {entry.variants.map((variant) => {
          const { Demo } = variant;
          return (
            <View key={variant.title} className="gap-2">
              <Text variant="label" className="font-semibold">
                {variant.title}
              </Text>
              <View className="rounded-xl border border-border bg-surface-raised p-4">
                <Demo />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
