import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";

import { useDrawer } from "./drawer.store";
import { Sidebar } from "./Sidebar";

const PANEL_WIDTH = Math.min(320, Math.round(Dimensions.get("window").width * 0.84));
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Slide-in navigation drawer overlay, rendered above the screen stack. */
export function AppDrawer() {
  const open = useDrawer((s) => s.open);
  const close = useDrawer((s) => s.close);
  const [mounted, setMounted] = useState(open);
  const progress = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    if (open) {
      setMounted(true);
      Animated.timing(progress, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    } else {
      Animated.timing(progress, { toValue: 0, duration: 180, useNativeDriver: true }).start(
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
          backgroundColor: "rgba(0,0,0,0.55)",
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
        }}
        className="border-r border-border bg-surface-raised"
      >
        <Sidebar />
      </Animated.View>
    </View>
  );
}
