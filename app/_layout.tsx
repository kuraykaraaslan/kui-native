import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ title: "KUInative" }} />
          <Stack.Screen name="component/[id]" options={{ title: "Component" }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
