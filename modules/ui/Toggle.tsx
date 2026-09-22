import { useEffect, useRef } from "react";
import { Animated, Platform, Pressable, View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type ToggleSize = "sm" | "md" | "lg";

// Pixel-for-pixel with KuiReact's Toggle (modules/ui/Toggle.tsx):
// sm track h-4 w-7 / thumb h-3 w-3 / on translate-x-3.5 (14px)
// md track h-5 w-9 / thumb h-3.5 w-3.5 / on translate-x-4 (16px)
// lg track h-6 w-11 / thumb h-4 w-4 / on translate-x-5 (20px)
// Thumb sits at top-0.5 left-0.5. The OS Switch used previously cannot be
// sized or restyled, so it never matched KuiReact's look on either platform.
const sizes: Record<ToggleSize, { track: string; thumb: string; on: number }> = {
  sm: { track: "h-4 w-7", thumb: "h-3 w-3", on: 14 },
  md: { track: "h-5 w-9", thumb: "h-3.5 w-3.5", on: 16 },
  lg: { track: "h-6 w-11", thumb: "h-4 w-4", on: 20 },
};

export type ToggleProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  /** Accessible name when the visible label lives elsewhere, e.g. a
   * settings row (KuiReact's `ariaLabel`). */
  ariaLabel?: string;
  /** Secondary line under the label. */
  description?: string;
  size?: ToggleSize;
  disabled?: boolean;
  className?: string;
};

/** Pixel-for-pixel with KuiReact's Toggle (modules/ui/Toggle.tsx). */
export function Toggle({
  checked: value,
  onChange: onValueChange,
  label,
  ariaLabel: accessibilityLabel,
  description,
  size = "md",
  disabled = false,
  className,
}: ToggleProps) {
  const { track, thumb, on } = sizes[size];
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    // KuiReact: "transition-transform duration-200" on the thumb.
    Animated.timing(progress, { toValue: value ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [value, progress]);

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, on] });

  return (
    // KuiReact wraps track + text in a <label> so the whole row toggles and
    // is announced once; a single Pressable gives the same on RN (the prior
    // version left the label as a separate, non-pressable focus stop).
    <Pressable
      onPress={() => onValueChange?.(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityLabel={label || accessibilityLabel}
      accessibilityHint={description}
      accessibilityState={{ checked: value, disabled }}
      className={cn("flex-row items-start gap-3", disabled && "opacity-50", className)}
    >
      <View className="relative mt-0.5 shrink-0">
        <View className={cn("rounded-full", track, value ? "bg-primary" : "bg-surface-sunken border border-border")} />
        {/* Animated.View only carries the transform; the styled thumb is a
            plain View so NativeWind classes apply without an Animated interop. */}
        <Animated.View style={{ position: "absolute", left: 2, top: 2, transform: [{ translateX }] }}>
          <View
            className={cn("rounded-full bg-white shadow-sm", thumb)}
            style={Platform.OS === "android" ? { elevation: 1 } : undefined}
          />
        </Animated.View>
      </View>
      {label || description ? (
        <View className="flex-1">
          {label ? (
            <Text variant="label" className="font-medium">
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text variant="caption" className="mt-0.5">
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}

/** @deprecated Use `Toggle` (KuiReact's name) with `checked` / `onChange` / `ariaLabel`. */
export type SwitchProps = Omit<ToggleProps, "checked" | "onChange" | "ariaLabel"> & {
  value: boolean;
  onValueChange?: (next: boolean) => void;
  accessibilityLabel?: string;
};

/** @deprecated Use `Toggle` (KuiReact's name). */
export function Switch({ value, onValueChange, accessibilityLabel, ...rest }: SwitchProps) {
  return <Toggle checked={value} onChange={onValueChange} ariaLabel={accessibilityLabel} {...rest} />;
}
