import { useMemo } from "react";
import { View } from "react-native";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type ScoreRule = {
  label: string;
  check: (value: string) => boolean;
  points: number;
  hint?: string;
};

type Tier = "great" | "ok" | "poor";

const tierMap: Record<Tier, { bar: string; text: string; bg: string; border: string; dot: string; token: string; label: string }> = {
  great: { bar: "bg-success", text: "text-success-fg", bg: "bg-success-subtle", border: "border-success", dot: "bg-success", token: "success-fg", label: "Good" },
  ok: { bar: "bg-warning", text: "text-warning-fg", bg: "bg-warning-subtle", border: "border-warning", dot: "bg-warning", token: "warning-fg", label: "Fair" },
  poor: { bar: "bg-error", text: "text-error-fg", bg: "bg-error-subtle", border: "border-error", dot: "bg-error", token: "error-fg", label: "Poor" },
};

export type ContentScoreBarProps = {
  value: string;
  rules: ScoreRule[];
  label?: string;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's ContentScoreBar: scores `value` against
 * weighted rules into Good (≥70) / Fair (≥40) / Poor tiers, shown as a
 * tinted `rounded-lg border p-3` card with the percentage, a `h-1.5`
 * progress bar, one chip per rule (checked when passed) and an "N / M rules
 * passed" line. The bar is exposed as a progressbar with its value (what
 * KuiReact's description promises).
 */
export function ContentScoreBar({ value, rules, label, className }: ContentScoreBarProps) {
  const theme = useThemeTokens();
  const { score, results } = useMemo(() => {
    let earned = 0;
    let total = 0;
    const res = rules.map((rule) => {
      const pass = rule.check(value);
      if (pass) earned += rule.points;
      total += rule.points;
      return { label: rule.label, pass, hint: rule.hint };
    });
    return { score: total > 0 ? Math.round((earned / total) * 100) : 0, results: res };
  }, [value, rules]);

  const tier: Tier = score >= 70 ? "great" : score >= 40 ? "ok" : "poor";
  const t = tierMap[tier];
  const passCount = results.filter((r) => r.pass).length;

  return (
    <View testID="content-score-bar" className={cn("gap-2 rounded-lg border p-3", t.bg, t.border, className)}>
      <View className="flex-row items-center gap-2">
        <View className={cn("h-1.5 w-1.5 shrink-0 rounded-full", t.dot)} />
        {label ? <Text className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</Text> : null}
        <View className="ml-auto flex-row items-center gap-1.5">
          <Text className={cn("text-xs font-medium", t.text)}>{t.label}</Text>
          <Text
            accessibilityLabel={`${label ?? "Content score"}: ${score}%`}
            className={cn("text-sm font-bold leading-none", t.text)}
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {score}%
          </Text>
        </View>
      </View>

      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={label ?? "Content score"}
        accessibilityValue={{ min: 0, max: 100, now: score }}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken"
      >
        <View testID="content-score-fill" className={cn("h-full rounded-full", t.bar)} style={{ width: `${score}%` }} />
      </View>

      <View className="flex-row flex-wrap gap-1">
        {results.map((r, i) => (
          <View
            key={i}
            accessibilityLabel={`${r.label}: ${r.pass ? "passed" : "not passed"}`}
            accessibilityHint={r.hint}
            className={cn("flex-row items-center gap-1 rounded-full border px-2 py-0.5", r.pass ? cn(t.bg, t.border) : "border-border bg-surface-sunken")}
          >
            {r.pass ? <FontAwesomeIcon icon={faCheck} size={10} color={theme[t.token]} /> : null}
            <Text className={cn("text-xs font-medium", r.pass ? t.text : "text-text-disabled")}>{r.label}</Text>
          </View>
        ))}
      </View>

      <Text className="text-xs leading-none text-text-secondary">
        {passCount} / {results.length} rules passed
      </Text>
    </View>
  );
}
