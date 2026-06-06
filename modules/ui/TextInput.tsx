import { useState } from "react";
import { TextInput as RNTextInput, View, type TextInputProps as RNTextInputProps } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type TextInputProps = RNTextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
};

export function TextInput({
  label,
  hint,
  error,
  className,
  containerClassName,
  onFocus,
  onBlur,
  ...rest
}: TextInputProps) {
  const t = useThemeTokens();
  const [focused, setFocused] = useState(false);

  return (
    <View className={cn("w-full", containerClassName)}>
      {label ? (
        <Text variant="label" className="mb-1.5 font-medium">
          {label}
        </Text>
      ) : null}
      <RNTextInput
        // placeholderTextColor needs a raw color (no className) — themed text-disabled
        placeholderTextColor={t["text-disabled"]}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        accessibilityLabel={label}
        className={cn(
          "rounded-lg border bg-surface-base px-3 py-2.5 text-base text-text-primary",
          error ? "border-error" : focused ? "border-border-focus" : "border-border",
          className,
        )}
        {...rest}
      />
      {error ? (
        <Text className="mt-1 text-xs text-error">{error}</Text>
      ) : hint ? (
        <Text variant="caption" className="mt-1">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
