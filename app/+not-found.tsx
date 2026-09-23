import { router } from "expo-router";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { SiteHead } from "@/modules/showcase/ui/SiteHead";
import { Text } from "@/modules/ui";

// 1:1 with kui-react app/not-found.tsx (rendered inside the showcase shell's
// `main`) and kui-ejs views/404.ejs.
export default function NotFound() {
  const t = useThemeTokens();
  const { height } = useWindowDimensions();

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 sm:p-6">
      <SiteHead title="404 — Not Found" absolute />
      <View className="items-center justify-center px-6" style={{ minHeight: height * 0.6 }}>
        <Text className="mb-4 text-center text-7xl font-bold text-primary">404</Text>
        <Text accessibilityRole="header" className="mb-2 text-center text-2xl font-semibold text-text-primary">
          Page not found
        </Text>
        <Text className="mb-8 text-center text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <Pressable
          onPress={() => router.replace("/")}
          accessibilityRole="link"
          className="flex-row items-center gap-2 rounded-lg bg-primary px-5 py-2.5 active:bg-primary-hover"
        >
          <FontAwesomeIcon icon={faHouse} size={16} color={t["primary-fg"]} />
          <Text className="font-medium text-primary-fg">Back to showcase</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
