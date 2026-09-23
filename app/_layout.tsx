import "../global.css";

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colorScheme as nativewindColorScheme } from "nativewind";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { themes, tokenMaps, useResolvedScheme } from "@/libs/theme";
import { AppDrawer } from "@/modules/showcase/ui/AppDrawer";
import { useDrawer, useIsDesktop } from "@/modules/showcase/ui/drawer.store";
import { Header } from "@/modules/showcase/ui/Header";
import { Sidebar } from "@/modules/showcase/ui/Sidebar";
import { Toaster } from "@/modules/ui";

function ThemedRoot() {
  const scheme = useResolvedScheme();
  const desktop = useIsDesktop();

  // Crossing into the desktop layout unmounts the drawer; drop its open state
  // so it doesn't pop back open when the window narrows again.
  useEffect(() => {
    if (desktop) useDrawer.getState().close();
  }, [desktop]);

  // Keep NativeWind's internal scheme in sync (for any `dark:` variants).
  useEffect(() => {
    nativewindColorScheme.set(scheme);
  }, [scheme]);

  return (
    <View style={themes[scheme]} className="flex-1 bg-surface-base">
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      {/* KuiReact AppShell: a persistent aside at lg (>=1024px), the drawer below it. */}
      <View className="flex-1 flex-row">
        {desktop ? <Sidebar variant="desktop" /> : null}
        {/* KuiReact AppShell's content column: the header, then the scrolling `main`. */}
        <View className="min-w-0 flex-1">
          <Header />
          <View className="flex-1">
            <Stack
              screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokenMaps[scheme]["surface-base"] } }}
            />
          </View>
        </View>
      </View>
      {!desktop ? <AppDrawer /> : null}
      {/* Mounted last so toasts draw above screens and the drawer. */}
      <Toaster />
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
