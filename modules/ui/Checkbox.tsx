import { useState } from "react";
import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type CheckboxProps = {
  /** Controlled value. Omit it and pass `defaultChecked` for an uncontrolled checkbox (as KuiReact allows). */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Receives the next value (KuiReact passes a DOM change event). */
  onChange?: (next: boolean) => void;
  label?: string;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
};

/** Pixel-for-pixel with KuiReact's Checkbox (modules/ui/Checkbox.tsx). */
export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  hint,
  error,
  indeterminate = false,
  disabled = false,
  className,
}: CheckboxProps) {
  const t = useThemeTokens();
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked = checked ?? internal;
  const active = isChecked || indeterminate;
  const uncheckedBorder = error ? "border-error" : "border-border";

  function toggle() {
    const next = !isChecked;
    if (checked === undefined) setInternal(next);
    onChange?.(next);
  }

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityHint={error ?? hint}
      accessibilityState={{ checked: indeterminate ? "mixed" : isChecked, disabled }}
      // KuiReact: "flex items-start gap-3"
      className={cn("flex-row items-start gap-3 active:opacity-80", className)}
    >
      <View
        className={cn(
          // KuiReact: native 16px checkbox, "mt-0.5 h-4 w-4 rounded border-border",
          // "border-error" on error, "disabled:opacity-50" on the box only.
          "mt-0.5 h-4 w-4 items-center justify-center rounded border",
          active ? "border-primary bg-primary" : cn("bg-surface-base", uncheckedBorder),
          disabled && "opacity-50",
        )}
      >
        {active ? <FontAwesomeIcon icon={indeterminate ? faMinus : faCheck} size={10} color={t["primary-fg"]} /> : null}
      </View>
      {label || hint || error ? (
        <View className="flex-1">
          {label ? (
            // KuiReact: "text-sm font-medium", text-text-disabled when disabled.
            <Text className={cn("text-sm font-medium", disabled ? "text-text-disabled" : "text-text-primary")}>
              {label}
            </Text>
          ) : null}
          {hint && !error ? <Text className="mt-0.5 text-xs text-text-secondary">{hint}</Text> : null}
          {error ? (
            <Text accessibilityRole="alert" accessibilityLiveRegion="polite" className="mt-0.5 text-xs text-error">
              {error}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
