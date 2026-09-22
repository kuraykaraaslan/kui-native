import { useEffect, useRef } from "react";
import { Animated, Easing, View, type ViewProps } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type ProgressVariant = "primary" | "success" | "warning" | "error";
type ProgressSize = "sm" | "md" | "lg";

// Pixel-for-pixel with KuiReact's Progress (modules/ui/Progress.tsx).
const barColorMap: Record<ProgressVariant, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};
const barHeightMap: Record<ProgressSize, string> = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
const circleDimMap: Record<ProgressSize, number> = { sm: 40, md: 64, lg: 96 };
const circleStrokeMap: Record<ProgressSize, number> = { sm: 4, md: 6, lg: 8 };

// KuiReact: "transition-[width|stroke-dashoffset] duration-300 ease-out".
const TRANSITION = { duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: false } as const;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type ProgressProps = Omit<ViewProps, "children"> & {
  value: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  shape?: "bar" | "circle";
  showLabel?: boolean;
  /** Accessible name (default "<n>% complete"). */
  label?: string;
  className?: string;
};

export function Progress({
  value,
  variant = "primary",
  size = "md",
  shape = "bar",
  showLabel = false,
  label,
  className,
  ...rest
}: ProgressProps) {
  const t = useThemeTokens();
  const clamped = Math.min(100, Math.max(0, value));
  const percent = Math.round(clamped);
  const anim = useRef(new Animated.Value(clamped)).current;
  const shown = useRef(clamped);

  useEffect(() => {
    // Only animate real changes — the first render already shows the value.
    if (shown.current === clamped) return;
    shown.current = clamped;
    Animated.timing(anim, { toValue: clamped, ...TRANSITION }).start();
  }, [clamped, anim]);

  const a11y = {
    accessible: true,
    accessibilityRole: "progressbar" as const,
    accessibilityLabel: label ?? `${percent}% complete`,
    accessibilityValue: { min: 0, max: 100, now: clamped },
  };

  if (shape === "circle") {
    const dim = circleDimMap[size];
    const stroke = circleStrokeMap[size];
    const radius = (dim - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = anim.interpolate({ inputRange: [0, 100], outputRange: [circumference, 0] });

    return (
      <View
        {...a11y}
        className={cn("relative items-center justify-center self-start", className)}
        style={{ width: dim, height: dim }}
        {...rest}
      >
        {/* KuiReact rotates the SVG -90° so the arc starts at 12 o'clock. */}
        <Svg width={dim} height={dim} style={{ transform: [{ rotate: "-90deg" }] }}>
          <Circle cx={dim / 2} cy={dim / 2} r={radius} strokeWidth={stroke} stroke={t["surface-sunken"]} fill="none" />
          <AnimatedCircle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke={t[variant]}
            fill="none"
          />
        </Svg>
        {showLabel ? (
          <Text className="absolute text-xs font-semibold text-text-primary" style={{ fontVariant: ["tabular-nums"] }}>
            {percent}%
          </Text>
        ) : null}
      </View>
    );
  }

  const width = anim.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] });

  return (
    <View className={cn("w-full", className)} {...rest}>
      <View {...a11y} className={cn("w-full overflow-hidden rounded-full bg-surface-sunken", barHeightMap[size])}>
        <Animated.View style={{ width, height: "100%" }}>
          <View className={cn("h-full w-full rounded-full", barColorMap[variant])} />
        </Animated.View>
      </View>
      {showLabel ? (
        <Text className="mt-1 text-xs text-text-secondary" style={{ fontVariant: ["tabular-nums"] }}>
          {percent}%
        </Text>
      ) : null}
    </View>
  );
}
