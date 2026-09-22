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
    // KuiReact wraps label+field+hint in "space-y-1" (4px between each).
    <View className={cn("w-full gap-1", containerClassName)}>
      {label ? (
        <Text variant="label" className="font-medium">
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
          // Pixel-for-pixel with KuiReact's Input (modules/ui/Input.tsx):
          // rounded-md, py-2, text-sm — a prior pass here used
          // rounded-lg/py-2.5/text-base, one step off KuiReact's actual look.
          "rounded-md border bg-surface-base px-3 py-2 text-sm text-text-primary",
          error ? "border-error bg-error-subtle" : focused ? "border-border-focus" : "border-border",
          // KuiReact: "disabled:opacity-50 disabled:bg-surface-sunken".
          rest.editable === false && "opacity-50 bg-surface-sunken",
          className,
        )}
        {...rest}
      />
      {error ? (
        <Text className="text-xs text-error">{error}</Text>
      ) : hint ? (
        <Text variant="caption">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
