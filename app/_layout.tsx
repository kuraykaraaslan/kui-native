import "../global.css";

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colorScheme as nativewindColorScheme } from "nativewind";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { themes, useResolvedScheme } from "@/libs/theme";
import { AppDrawer } from "@/modules/showcase/ui/AppDrawer";

function ThemedRoot() {
  const scheme = useResolvedScheme();

  // Keep NativeWind's internal scheme in sync (for any `dark:` variants).
  useEffect(() => {
    nativewindColorScheme.set(scheme);
  }, [scheme]);

  return (
    <View style={themes[scheme]} className="flex-1 bg-surface-base">
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }} />
      <AppDrawer />
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemedRoot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
