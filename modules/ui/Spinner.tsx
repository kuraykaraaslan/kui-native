import { ActivityIndicator, View } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

// RN's ActivityIndicator only ships two native sizes ("small" / "large"), so
// the xs/md/xl steps are reached by scaling — this keeps the five-step scale
// distinguishable (mirrors KuiReact's Button/Badge/Avatar size ladders)
// instead of xs/sm and md/sm collapsing onto each other.
const rnSize: Record<SpinnerSize, "small" | "large"> = {
  xs: "small",
  sm: "small",
  md: "small",
  lg: "large",
  xl: "large",
};

const scale: Record<SpinnerSize, number> = {
  xs: 0.7,
  sm: 1,
  md: 1.3,
  lg: 1,
  xl: 1.4,
};

export type SpinnerProps = {
  size?: SpinnerSize;
  /** Override color (defaults to the primary token for the active theme). */
  color?: string;
  /** Accessible label announced by screen readers (default: "Loading"). */
  accessibilityLabel?: string;
  className?: string;
};

export function Spinner({ size = "md", color, accessibilityLabel = "Loading", className }: SpinnerProps) {
  const t = useThemeTokens();
  return (
    <View
      // `accessible` is required for a plain View's accessibilityRole to be
      // exposed to assistive tech at all (RN treats a View with a role but no
      // `accessible` as a non-accessibility element, invisible to
      // VoiceOver/TalkBack) — see docs/audits/kui-react-parity B5.
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      className={cn("items-center justify-center", className)}
    >
      <ActivityIndicator
        size={rnSize[size]}
        color={color ?? t.primary}
        style={scale[size] !== 1 ? { transform: [{ scale: scale[size] }] } : undefined}
      />
    </View>
  );
}
