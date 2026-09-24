import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Easing, View } from "react-native";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

// KuiReact's sizeMap: h-3/border · h-4/border-2 · h-6/border-2 · h-8/border-[3px] · h-12/border-4.
const sizeMap: Record<SpinnerSize, { box: number; border: number }> = {
  xs: { box: 12, border: 1 },
  sm: { box: 16, border: 2 },
  md: { box: 24, border: 2 },
  lg: { box: 32, border: 3 },
  xl: { box: 48, border: 4 },
};

export type SpinnerProps = {
  size?: SpinnerSize;
  /** Override the spinning arc colour (defaults to the primary token). */
  color?: string;
  /** Accessible label announced by screen readers (default: "Loading"). */
  accessibilityLabel?: string;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Spinner: a `rounded-full border-border`
 * ring with a `border-t-primary` arc, spinning at Tailwind's `animate-spin`
 * rate (1s linear). Held still when the OS asks for reduced motion.
 */
export function Spinner({ size = "md", color, accessibilityLabel = "Loading", className }: SpinnerProps) {
  const t = useThemeTokens();
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        if (cancelled || reduce) return;
        loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true }));
        loop.start();
      });
    return () => {
      cancelled = true;
      loop?.stop();
    };
  }, [spin]);

  const { box, border } = sizeMap[size];
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View
      // `accessible` is required for a plain View's accessibilityRole to reach VoiceOver / TalkBack.
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      className={cn("items-center justify-center", className)}
    >
      <Animated.View
        testID="spinner-ring"
        style={{
          width: box,
          height: box,
          borderRadius: box / 2,
          borderWidth: border,
          borderColor: t.border,
          borderTopColor: color ?? t.primary,
          transform: [{ rotate }],
        }}
      />
    </View>
  );
}
