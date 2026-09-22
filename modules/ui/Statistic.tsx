import type * as React from "react";
import { View, type ViewProps } from "react-native";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { SkeletonLine } from "./Skeleton";
import { Text } from "./Text";

type StatisticTrend = "up" | "down";

const trendColorMap: Record<StatisticTrend, { text: string; token: string }> = {
  up: { text: "text-success", token: "success" },
  down: { text: "text-error", token: "error" },
};
const trendIconMap: Record<StatisticTrend, IconDefinition> = { up: faArrowUp, down: faArrowDown };

export type StatisticProps = {
  label: string;
  value: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  trend?: StatisticTrend;
  trendValue?: string;
  loading?: boolean;
  className?: string;
} & Omit<ViewProps, "children">;

const affix = (node: React.ReactNode) =>
  typeof node === "string" || typeof node === "number" ? <Text className="text-lg text-text-secondary">{node}</Text> : node;

/**
 * Pixel-for-pixel with KuiReact's Statistic: a `text-xs font-medium` label
 * above a baseline-aligned row of optional prefix, `text-2xl font-bold
 * tabular-nums` value, suffix and a coloured trend arrow. `loading` swaps
 * the row for a pulsing `h-7 w-24` placeholder.
 */
export function Statistic({ label, value, precision, prefix, suffix, trend, trendValue, loading = false, className, ...rest }: StatisticProps) {
  const t = useThemeTokens();
  const displayValue = typeof value === "number" && precision !== undefined ? value.toFixed(precision) : value;

  return (
    <View className={cn("gap-1", className)} accessibilityState={{ busy: loading }} {...rest}>
      <Text className="text-xs font-medium text-text-secondary">{label}</Text>
      {loading ? (
        <View testID="statistic-loading" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <SkeletonLine width="w-24" className="h-7" />
        </View>
      ) : (
        <View className="flex-row items-baseline gap-1.5">
          {prefix ? affix(prefix) : null}
          <Text className="text-2xl font-bold text-text-primary" style={{ fontVariant: ["tabular-nums"] }}>
            {displayValue}
          </Text>
          {suffix ? affix(suffix) : null}
          {trend ? (
            <View className="flex-row items-center gap-0.5">
              <FontAwesomeIcon icon={trendIconMap[trend]} size={10} color={t[trendColorMap[trend].token]} />
              {trendValue ? <Text className={cn("text-xs font-semibold", trendColorMap[trend].text)}>{trendValue}</Text> : null}
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}
