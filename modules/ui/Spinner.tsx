import { ActivityIndicator, View } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

type SpinnerSize = "sm" | "md" | "lg";

const rnSize: Record<SpinnerSize, "small" | "large"> = {
  sm: "small",
  md: "small",
  lg: "large",
};

export type SpinnerProps = {
  size?: SpinnerSize;
  /** Override color (defaults to the primary token for the active theme). */
  color?: string;
  className?: string;
};

export function Spinner({ size = "md", color, className }: SpinnerProps) {
  const t = useThemeTokens();
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      className={cn("items-center justify-center", className)}
    >
      <ActivityIndicator size={rnSize[size]} color={color ?? t.primary} />
    </View>
  );
}
