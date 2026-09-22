import { Pressable, type GestureResponderEvent } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type LabelProps = {
  children: string;
  /** Adds a required-field marker; also appended to the accessible name. */
  required?: boolean;
  disabled?: boolean;
  /** Fires when the label itself is pressed (mirrors KuiReact's `<label>` /
   * `htmlFor` click-through — press the label to focus/toggle the field it
   * describes). Pass the paired field's ref/toggle here. */
  onPress?: (e: GestureResponderEvent) => void;
  className?: string;
};

/**
 * Form-field label — mirrors KuiReact's `Label`. Every KuiNative field
 * (Textarea, Select, TextInput, Checkbox, Toggle) can compose it instead of an ad-hoc label
 * `Text`; this is the shared primitive they should compose instead.
 */
export function Label({ children, required, disabled, onPress, className }: LabelProps) {
  const text = (
    <Text
      variant="label"
      className={cn("select-none", disabled ? "text-text-disabled" : "font-medium", className)}
      // Setting accessibilityLabel overrides the announced name entirely on
      // both platforms, so this is the single source of truth for what a
      // screen reader says — the visible "*" below is purely decorative,
      // matching KuiReact's visible "*" + sr-only "(required)" pattern.
      accessibilityLabel={required ? `${children}, required` : undefined}
    >
      {children}
      {required ? <Text variant="label" className="text-error">{" *"}</Text> : null}
    </Text>
  );

  if (!onPress) return text;

  return (
    <Pressable onPress={disabled ? undefined : onPress} disabled={disabled} accessibilityRole="none">
      {text}
    </Pressable>
  );
}
