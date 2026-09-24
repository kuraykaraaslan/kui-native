import type * as React from "react";
import { useState } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

export type SearchBarProps = {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  ref?: React.Ref<RNTextInput>;
};

/**
 * Pixel-for-pixel with KuiReact's SearchBar (modules/ui/SearchBar.tsx): a
 * `rounded-md border border-border bg-surface-base px-3 py-2 pl-8 text-sm`
 * field with a leading magnifier and, once it has text, a clear button
 * (`pr-8`). Controlled via `value`, or uncontrolled. Focus draws KuiReact's
 * `ring-2 ring-border-focus border-border-focus` as an outline.
 */
export function SearchBar({ id = "search", placeholder = "Search…", value, onChange, onClear, className, ref }: SearchBarProps) {
  const t = useThemeTokens();
  const [internal, setInternal] = useState("");
  const [focused, setFocused] = useState(false);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internal;

  function handleChange(next: string) {
    if (!controlled) setInternal(next);
    onChange?.(next);
  }

  function handleClear() {
    if (!controlled) setInternal("");
    onChange?.("");
    onClear?.();
  }

  return (
    <View className={cn("relative flex-row items-center", className)}>
      <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" className="absolute left-3 z-10 h-4 w-5 items-center justify-center">
        {/* KuiReact's icon renders in FA's web box: a 16px glyph in a 20x16 svg. */}
        <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color={t["text-disabled"]} />
      </View>
      <RNTextInput
        ref={ref}
        testID={`searchbar-${id}`}
        role="searchbox"
        accessibilityLabel={placeholder}
        value={currentValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={t["text-disabled"]}
        autoComplete="off"
        autoCorrect={false}
        returnKeyType="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full rounded-md border bg-surface-base px-3 py-2 pl-8 text-sm text-text-primary",
          focused ? "border-border-focus" : "border-border",
          currentValue ? "pr-8" : null,
        )}
        style={focused ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" } : undefined}
      />
      {currentValue ? (
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={10}
          className="absolute right-2 rounded"
        >
          <FontAwesomeIcon icon={faXmark} size={12} color={t["text-disabled"]} />
        </Pressable>
      ) : null}
    </View>
  );
}
