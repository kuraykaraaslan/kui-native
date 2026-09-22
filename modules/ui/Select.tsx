import type * as React from "react";
import { useState } from "react";
import { Pressable, ScrollView, TextInput as RNTextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Label } from "./Label";
import { Text } from "./Text";

export type SelectOption = { value: string; label: string; icon?: React.ReactNode };

export type SelectProps = {
  /** Kept for API parity with KuiReact; used to build testIDs. */
  id: string;
  label: string;
  options: SelectOption[];
  value?: string;
  /** Value-based callback (KuiReact passes a DOM change event). */
  onChange?: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Select (modules/ui/Select.tsx).
 *
 * KuiReact renders a native <select> unless an option has an icon or
 * `searchable` is set, in which case it renders its own trigger plus an
 * inline listbox panel below it (normal flow, not a floating popover).
 * React Native has no <select>, so both modes open that same inline panel;
 * the trigger keeps each mode's look (the native mode's `appearance-none`
 * trigger has no chevron, the custom mode's has one). KuiReact also closes
 * the panel on an outside mousedown; an inline RN view can't observe taps
 * outside itself without a full-screen catcher (which would turn the
 * in-flow panel into an overlay), so it closes on selection or on another
 * press of the trigger.
 */
export function Select({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  hint,
  error,
  disabled,
  required,
  searchable,
  className,
}: SelectProps) {
  const t = useThemeTokens();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const custom = searchable || options.some((o) => o.icon);

  const selected = options.find((o) => o.value === value);
  const filtered =
    searchable && search ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())) : options;

  function toggle() {
    if (disabled) return;
    setOpen((o) => {
      if (o) setSearch("");
      return !o;
    });
  }

  function select(v: string) {
    onChange?.(v);
    setOpen(false);
    setSearch("");
  }

  return (
    // KuiReact: "space-y-1"
    <View className={cn("w-full gap-1", className)}>
      <Label required={required} disabled={disabled} onPress={toggle}>
        {label}
      </Label>

      {/* KuiReact trigger: "flex items-center gap-2 w-full rounded-md border px-3 py-2 text-sm" */}
      <Pressable
        testID={`select-${id}`}
        onPress={toggle}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityLabel={required ? `${label}, required` : label}
        accessibilityHint={error ?? hint}
        accessibilityValue={{ text: selected ? selected.label : placeholder ?? "Select…" }}
        accessibilityState={{ expanded: open, disabled: Boolean(disabled) }}
        className={cn(
          "w-full flex-row items-center gap-2 rounded-md border px-3 py-2",
          error ? "border-error bg-error-subtle" : open ? "border-border-focus bg-surface-base" : "border-border bg-surface-base",
          disabled && "opacity-50 bg-surface-sunken",
        )}
      >
        {selected?.icon ? <View className="shrink-0">{selected.icon}</View> : null}
        <Text className={cn("flex-1 text-sm", selected ? "text-text-primary" : "text-text-disabled")}>
          {selected ? selected.label : placeholder ?? (custom ? "Select…" : "")}
        </Text>
        {custom ? (
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} size={12} color={t["text-disabled"]} />
        ) : null}
      </Pressable>

      {open ? (
        // KuiReact panel: "w-full rounded-md border border-border bg-surface-raised shadow-lg overflow-hidden"
        <View className="w-full overflow-hidden rounded-md border border-border bg-surface-raised shadow-lg">
          {searchable ? (
            <View className="border-b border-border p-2">
              <RNTextInput
                autoFocus
                value={search}
                onChangeText={setSearch}
                placeholder="Search…"
                placeholderTextColor={t["text-disabled"]}
                accessibilityLabel={`Search ${label}`}
                className="w-full rounded-md border border-border bg-surface-base px-3 py-1.5 text-sm text-text-primary"
              />
            </View>
          ) : null}
          {/* KuiReact listbox: "py-1 max-h-48 overflow-y-auto" (192px). */}
          <ScrollView
            accessibilityRole="list"
            accessibilityLabel={label}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            style={{ maxHeight: 192 }}
            contentContainerClassName="py-1"
          >
            {placeholder && !search ? (
              <Pressable
                onPress={() => select("")}
                accessibilityRole="button"
                accessibilityState={{ selected: !value }}
                className="flex-row items-center gap-2 px-3 py-2 active:bg-surface-overlay"
              >
                <Text className="text-sm text-text-disabled">{placeholder}</Text>
              </Pressable>
            ) : null}
            {filtered.length === 0 ? (
              <Text className="px-3 py-4 text-center text-sm text-text-secondary">No results found.</Text>
            ) : (
              filtered.map((opt) => {
                const active = opt.value === value;
                return (
                  <Pressable
                    key={opt.value}
                    testID={`select-${id}-option-${opt.value}`}
                    onPress={() => select(opt.value)}
                    accessibilityRole="button"
                    accessibilityLabel={opt.label}
                    accessibilityState={{ selected: active }}
                    className="flex-row items-center gap-2 px-3 py-2 active:bg-surface-overlay"
                  >
                    {opt.icon ? (
                      <View className="shrink-0" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                        {opt.icon}
                      </View>
                    ) : null}
                    <Text className={cn("flex-1 text-sm", active ? "font-medium text-primary" : "text-text-primary")}>
                      {opt.label}
                    </Text>
                    {active ? <FontAwesomeIcon icon={faCheck} size={12} color={t.primary} /> : null}
                  </Pressable>
                );
              })
            )}
          </ScrollView>
        </View>
      ) : null}

      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
