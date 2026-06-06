import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showcaseConfig } from "@/libs/config/showcase.config";
import { REGISTRY } from "@/modules/showcase/registry";
import { Text } from "@/modules/ui";

export default function Home() {
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-surface-base">
      <FlatList
        data={REGISTRY}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4 gap-2"
        ListHeaderComponent={
          <View className="mb-2">
            <Text variant="h2">{showcaseConfig.name}</Text>
            <Text variant="bodySm">
              {showcaseConfig.tagline} · {REGISTRY.length} components
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Link href={{ pathname: "/component/[id]", params: { id: item.id } }} asChild>
            <Pressable className="flex-row items-center justify-between rounded-xl border border-border bg-surface-raised px-4 py-3 active:opacity-80">
              <View>
                <Text variant="label" className="font-semibold">
                  {item.title}
                </Text>
                <Text variant="caption">{item.category}</Text>
              </View>
              {/* FontAwesome needs a raw color — text-disabled token value */}
              <FontAwesomeIcon icon={faChevronRight} size={14} color="#9ca3af" />
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
