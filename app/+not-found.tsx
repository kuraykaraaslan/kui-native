import { router } from "expo-router";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { SiteHead } from "@/modules/showcase/ui/SiteHead";
import { Button, Text } from "@/modules/ui";

// 1:1 with kui-ejs views/404.ejs (and kui-react app/not-found.tsx).
export default function NotFound() {
  const t = useThemeTokens();

  return (
    <View className="flex-1 items-center justify-center bg-surface-base px-6">
      <SiteHead title="404 — Not Found" absolute />
      <Text className="mb-4 text-7xl font-bold text-primary">404</Text>
      <Text variant="h2" className="mb-2 text-center text-2xl font-semibold text-text-primary">
        Page not found
      </Text>
      <Text className="mb-8 text-center text-text-secondary">
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <Button
        onPress={() => router.replace("/")}
        iconLeft={<FontAwesomeIcon icon={faHouse} size={14} color={t["primary-fg"]} />}
      >
        Back to showcase
      </Button>
    </View>
  );
}
