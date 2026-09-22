import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";

import { useThemeTokens } from "@/libs/theme";

import { useDrawer } from "./drawer.store";
import { Sidebar } from "./Sidebar";

// KuiReact AppShell drawer: `w-72 max-w-full` (288px).
const PANEL_WIDTH = Math.min(288, Dimensions.get("window").width);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Slide-in navigation drawer overlay, rendered above the screen stack. */
export function AppDrawer() {
  const t = useThemeTokens();
  const open = useDrawer((s) => s.open);
  const close = useDrawer((s) => s.close);
  const [mounted, setMounted] = useState(open);
  const progress = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    if (open) {
      setMounted(true);
      Animated.timing(progress, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    } else {
      Animated.timing(progress, { toValue: 0, duration: 200, useNativeDriver: true }).start(
        ({ finished }) => {
          if (finished) setMounted(false);
        },
      );
    }
  }, [open, progress]);

  if (!mounted) return null;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-PANEL_WIDTH, 0],
  });

  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}>
      <AnimatedPressable
        onPress={close}
        accessibilityRole="button"
        accessibilityLabel="Close menu"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: progress,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: PANEL_WIDTH,
          transform: [{ translateX }],
          // `border-r border-border bg-surface-raised` — inline, since NativeWind
          // classes don't reach an Animated.View.
          borderRightWidth: 1,
          borderRightColor: t.border,
          backgroundColor: t["surface-raised"],
          // shadow-xl
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 25,
          shadowOffset: { width: 0, height: 20 },
          elevation: 16,
        }}

      >
        <Sidebar />
      </Animated.View>
    </View>
  );
}
