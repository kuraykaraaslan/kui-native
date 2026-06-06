import { ActivityIndicator, View } from "react-native";

import { cn } from "@/libs/utils/cn";

type SpinnerSize = "sm" | "md" | "lg";

const rnSize: Record<SpinnerSize, "small" | "large"> = {
  sm: "small",
  md: "small",
  lg: "large",
};

export type SpinnerProps = {
  size?: SpinnerSize;
  /** Raw color (ActivityIndicator has no className). Defaults to the primary token value. */
  color?: string;
  className?: string;
};

export function Spinner({ size = "md", color = "#3b82f6", className }: SpinnerProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      className={cn("items-center justify-center", className)}
    >
      <ActivityIndicator size={rnSize[size]} color={color} />
    </View>
  );
}
