import type * as React from "react";
import { Pressable, useWindowDimensions, View } from "react-native";

import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

export type RadioOption = {
  value: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
};

type RadioGroupVariant = "default" | "card";
type RadioGroupColumns = 1 | 2 | 3;

export type RadioGroupProps = {
  /** Kept for API parity with KuiReact (groups radios in a form); RN has no
   * form grouping, so it is only used to build `testID`s. */
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
  variant?: RadioGroupVariant;
  columns?: RadioGroupColumns;
};

// Tailwind breakpoints KuiReact's grid uses: sm 640, lg 1024.
function useColumnCount(columns: RadioGroupColumns) {
  const { width } = useWindowDimensions();
  if (columns === 3) return width >= 1024 ? 3 : width >= 640 ? 2 : 1;
  if (columns === 2) return width >= 640 ? 2 : 1;
  return 1;
}

/** Pixel-for-pixel with KuiReact's RadioGroup (modules/ui/RadioGroup.tsx). */
export function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  disabled,
  className,
  optionClassName,
  variant = "default",
  columns = 1,
}: RadioGroupProps) {
  const cols = useColumnCount(columns);

  return (
    // KuiReact: <fieldset className="space-y-1">. Tailwind v4's space-y is a zero-specificity
    // margin-bottom on every child but the last, so the legend's own mb-2 wins (8px, not 12),
    // and the options' 4px collapses with the error's mt-1.
    <View className={className} accessibilityRole="radiogroup" accessibilityLabel={legend}>
      {/* KuiReact legend: "mb-2 text-sm font-medium text-text-primary" */}
      <Text variant="label" className="mb-2 font-medium">
        {legend}
      </Text>

      <View className={cn(cols === 1 ? "gap-2" : "flex-row flex-wrap gap-2")}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              testID={`radio-${name}-${opt.value}`}
              onPress={() => onChange?.(opt.value)}
              disabled={disabled}
              accessibilityRole="radio"
              accessibilityLabel={opt.label}
              accessibilityHint={opt.hint}
              accessibilityState={{ checked: isSelected, disabled: Boolean(disabled) }}
              style={cols > 1 ? { flexBasis: `${100 / cols - 2}%`, flexGrow: 1 } : undefined}
              className={cn(
                "flex-row items-start gap-2",
                disabled && "opacity-50",
                variant === "card" && [
                  "rounded-lg border border-border bg-surface-base p-3",
                  // KuiReact: "border-primary bg-primary/5" — the /5 opacity
                  // modifier can't apply to KuiNative's var() colour tokens,
                  // so the subtle primary token stands in (KuiReact's own
                  // card-style showcase uses bg-primary-subtle too).
                  isSelected && "border-primary bg-primary-subtle",
                  error && "border-error",
                ],
                optionClassName,
              )}
            >
              {/* KuiReact's native radio: 16px circle, border-border (mt-0.5). */}
              <View
                className={cn(
                  "mt-0.5 h-4 w-4 items-center justify-center rounded-full border",
                  isSelected ? "border-primary bg-primary" : "border-border bg-surface-base",
                  error && !isSelected && "border-error",
                )}
              >
                {isSelected ? <View className="h-1.5 w-1.5 rounded-full bg-primary-fg" /> : null}
              </View>

              <View className="min-w-0 flex-1">
                <View className="flex-row items-center gap-2">
                  {opt.icon ? <View>{opt.icon}</View> : null}
                  <Text className="text-sm text-text-primary">{opt.label}</Text>
                </View>
                {opt.hint ? <Text className="mt-0.5 text-xs text-text-secondary">{opt.hint}</Text> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" className="mt-1 text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
