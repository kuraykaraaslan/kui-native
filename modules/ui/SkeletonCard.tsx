import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { cn } from "@/libs/utils/cn";

export type SkeletonCardProps = {
  className?: string;
};

/** Pulsing placeholder for loading content (mirrors KUIREACT's SkeletonCard). */
export function SkeletonCard({ className }: SkeletonCardProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      className={cn("rounded-xl border border-border bg-surface-raised p-4", className)}
    >
      <Animated.View style={{ opacity }}>
        <View className="h-4 w-1/2 rounded-md bg-surface-sunken" />
        <View className="mt-3 h-3 w-full rounded-md bg-surface-sunken" />
        <View className="mt-2 h-3 w-5/6 rounded-md bg-surface-sunken" />
      </Animated.View>
    </View>
  );
}
