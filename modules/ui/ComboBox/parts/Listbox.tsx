// Listbox — the option list, ported from KuiReact's
// modules/ui/ComboBox/parts/Listbox.tsx, including its fixed-height
// windowing: past `virtualize` options (default 50) only the rows in view
// (plus overscan) render, with spacers keeping the scroll height.

import { useState } from "react";
import { Pressable, ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";

import { cn } from "../../../../libs/utils/cn";

import { SkeletonLine } from "../../Skeleton";
import { Text } from "../../Text";
import type { ComboBoxOption } from "../types";

// 36px ≈ py-2 + text-sm (+ optional description), as in KuiReact.
const ROW_HEIGHT = 36;
const OVERSCAN = 4;
const DEFAULT_THRESHOLD = 50;
// KuiReact: max-h-60 (15rem).
const MAX_HEIGHT = 240;

type ListboxProps = {
  id: string;
  label: string;
  options: ComboBoxOption[];
  selectedValue: string;
  loading: boolean;
  loadingMore: boolean;
  noResultsText: string;
  virtualize: boolean | number;
  onEndScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onSelect: (option: ComboBoxOption) => void;
};

export function Listbox({ id, label, options, selectedValue, loading, loadingMore, noResultsText, virtualize, onEndScroll, onSelect }: ListboxProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const threshold = typeof virtualize === "number" ? virtualize : virtualize === true ? 0 : DEFAULT_THRESHOLD;
  const windowed = options.length > threshold;

  let visibleStart = 0;
  let visibleEnd = options.length;
  if (windowed) {
    visibleStart = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    visibleEnd = Math.min(options.length, Math.ceil((scrollTop + MAX_HEIGHT) / ROW_HEIGHT) + OVERSCAN);
  }
  const topPad = windowed ? visibleStart * ROW_HEIGHT : 0;
  const bottomPad = windowed ? (options.length - visibleEnd) * ROW_HEIGHT : 0;

  return (
    <ScrollView
      testID={`combobox-${id}-listbox`}
      accessibilityRole="list"
      accessibilityLabel={label}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      scrollEventThrottle={16}
      onScroll={(e) => {
        if (windowed) setScrollTop(e.nativeEvent.contentOffset.y);
        onEndScroll?.(e);
      }}
      style={{ maxHeight: MAX_HEIGHT }}
      className="w-full rounded-md border border-border bg-surface-raised shadow-lg"
      contentContainerClassName="py-1"
    >
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <View key={`sk-${i}`} testID="combobox-skeleton" className="px-3 py-2">
            <SkeletonLine className="bg-surface-overlay" />
          </View>
        ))
      ) : options.length === 0 ? (
        <Text className="px-3 py-3 text-sm text-text-secondary">{noResultsText}</Text>
      ) : (
        <>
          {topPad > 0 ? <View style={{ height: topPad }} /> : null}
          {options.slice(visibleStart, visibleEnd).map((option) => {
            const isSelected = option.value === selectedValue;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityLabel={option.description ? `${option.label}, ${option.description}` : option.label}
                accessibilityState={{ selected: isSelected, disabled: Boolean(option.disabled) }}
                disabled={option.disabled}
                onPress={() => onSelect(option)}
                className={cn("w-full flex-row items-start gap-2 px-3 py-2 active:bg-surface-overlay", option.disabled && "opacity-50")}
              >
                {option.icon ? <View className="mt-0.5 shrink-0">{option.icon}</View> : null}
                <View className="min-w-0 flex-1">
                  <Text numberOfLines={1} className={cn("text-sm", isSelected ? "font-medium text-primary" : "text-text-primary")}>
                    {option.label}
                  </Text>
                  {option.description ? (
                    <Text numberOfLines={1} className="text-xs text-text-secondary">
                      {option.description}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
          {bottomPad > 0 ? <View style={{ height: bottomPad }} /> : null}
          {loadingMore ? (
            <Text accessibilityLiveRegion="polite" className="px-3 py-2 text-xs text-text-secondary">
              Loading more…
            </Text>
          ) : null}
        </>
      )}
    </ScrollView>
  );
}
