// Trigger — combobox shell (input + clear + caret), ported from KuiReact's
// modules/ui/ComboBox/parts/Trigger.tsx. Pure presentational.

import type * as React from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../../libs/theme";
import { cn } from "../../../../libs/utils/cn";
import { fontStyle } from "../../../../libs/utils/typography";

type TriggerProps = {
  id: string;
  label: string;
  hint?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  clearable: boolean;
  open: boolean;
  focused: boolean;
  showClear: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (next: string) => void;
  onPress: () => void;
  onClear: () => void;
  inputRef?: React.Ref<RNTextInput>;
};

export function Trigger({
  id,
  label,
  hint,
  value,
  placeholder,
  disabled,
  required,
  error,
  clearable,
  open,
  focused,
  showClear,
  onFocus,
  onBlur,
  onChange,
  onPress,
  onClear,
  inputRef,
}: TriggerProps) {
  const t = useThemeTokens();
  return (
    <Pressable
      testID={`combobox-${id}`}
      accessible={false}
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "min-h-10 w-full flex-row items-center gap-2 rounded-md border bg-surface-base px-3 py-1.5",
        error ? "border-error bg-error-subtle" : "border-border",
        disabled && "bg-surface-sunken opacity-50",
      )}
      // KuiReact: focus-within:ring-2 ring-border-focus; error adds ring-1 ring-error.
      style={
        error
          ? { outlineWidth: focused ? 2 : 1, outlineColor: focused ? t["border-focus"] : t.error, outlineStyle: "solid" }
          : focused
            ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" }
            : undefined
      }
    >
      <RNTextInput
        ref={inputRef}
        testID={`combobox-${id}-input`}
        role="combobox"
        accessibilityLabel={required ? `${label}, required` : label}
        accessibilityHint={error ?? hint}
        accessibilityState={{ expanded: open, disabled: Boolean(disabled) }}
        editable={!disabled}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={t["text-disabled"]}
        autoComplete="off"
        autoCorrect={false}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChange}
        className="flex-1 p-0 text-sm text-text-primary"
        style={fontStyle()}
      />

      {clearable && showClear && !disabled ? (
        <Pressable onPress={onClear} accessibilityRole="button" accessibilityLabel="Clear selection" hitSlop={8} className="rounded px-1">
          <FontAwesomeIcon icon={faXmark} size={12} color={t["text-disabled"]} />
        </Pressable>
      ) : null}

      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} size={12} color={t["text-disabled"]} />
      </View>
    </Pressable>
  );
}
