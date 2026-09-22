import type * as React from "react";
import { useState } from "react";
import { TextInput as RNTextInput, View, type TextInputProps as RNTextInputProps } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Label } from "./Label";
import { Text } from "./Text";

// A browser sizes <textarea rows={n}> as n × line-height. KuiReact's field is
// text-sm (line-height 20px) with py-2 (8+8) and a 1px border (1+1).
const LINE_HEIGHT = 20;
const CHROME = 8 + 8 + 1 + 1;

export type TextareaProps = Omit<RNTextInputProps, "multiline"> & {
  label: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  /** Visible lines (KuiReact default 4). */
  rows?: number;
  className?: string;
  ref?: React.Ref<RNTextInput>;
};

/** Pixel-for-pixel with KuiReact's Textarea (modules/ui/Textarea.tsx). */
export function Textarea({
  label,
  hint,
  error,
  disabled,
  required,
  rows = 4,
  className,
  onFocus,
  onBlur,
  style,
  ref,
  ...rest
}: TextareaProps) {
  const t = useThemeTokens();
  const [focused, setFocused] = useState(false);

  return (
    // KuiReact: "space-y-1" wrapper — className targets the wrapper there too.
    <View className={cn("w-full gap-1", className)}>
      <Label required={required} disabled={disabled}>
        {label}
      </Label>
      <RNTextInput
        ref={ref}
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        editable={!disabled}
        placeholderTextColor={t["text-disabled"]}
        accessibilityLabel={required ? `${label}, required` : label}
        accessibilityHint={error ?? hint}
        accessibilityState={{ disabled: Boolean(disabled) }}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm text-text-primary",
          error ? "border-error bg-error-subtle" : focused ? "border-border-focus bg-surface-base" : "border-border bg-surface-base",
          disabled && "opacity-50 bg-surface-sunken",
        )}
        style={[{ minHeight: rows * LINE_HEIGHT + CHROME, lineHeight: LINE_HEIGHT }, style]}
        {...rest}
      />
      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
