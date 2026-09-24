// modules/ui/DatePicker/calendar/YearSelect.tsx
//
// Quick year picker — shown when the user presses the year in the calendar
// header. KuiReact: a `max-h-56 overflow-y-auto p-2` list of years
// (current ±10) in a `grid-cols-3 gap-1.5` grid, scrolled so the active
// year is centred.

import { useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { cn } from "../../../../libs/utils/cn";

import { Text } from "../../Text";
import { yearRange } from "../hooks/useDateFns";

type YearSelectProps = {
  value: number;
  min?: Date;
  max?: Date;
  onSelect: (year: number) => void;
};

// KuiReact: max-h-56 (14rem).
const MAX_HEIGHT = 224;

export function YearSelect({ value, min, max, onSelect }: YearSelectProps) {
  const scrollRef = useRef<ScrollView>(null);
  const years = yearRange(value, 10);
  const rows = Array.from({ length: Math.ceil(years.length / 3) }, (_, i) => years.slice(i * 3, i * 3 + 3));

  return (
    <ScrollView ref={scrollRef} accessibilityRole="list" aria-label="Year" style={{ maxHeight: MAX_HEIGHT }} contentContainerClassName="gap-1.5 p-2">
      {rows.map((row) => (
        <View
          key={row[0]}
          className="flex-row gap-1.5"
          onLayout={
            row.includes(value)
              ? (e) => {
                  const { y, height } = e.nativeEvent.layout;
                  scrollRef.current?.scrollTo({ y: Math.max(0, y - MAX_HEIGHT / 2 + height / 2), animated: false });
                }
              : undefined
          }
        >
          {row.map((y) => {
            const disabled = Boolean((min && y < min.getFullYear()) || (max && y > max.getFullYear()));
            const active = y === value;
            return (
              <Pressable
                key={y}
                accessibilityRole="button"
                accessibilityLabel={String(y)}
                accessibilityState={{ selected: active, disabled }}
                disabled={disabled}
                onPress={() => onSelect(y)}
                className={cn("flex-1 items-center rounded-md px-2 py-1.5", disabled && "opacity-40", active ? "bg-primary" : "active:bg-surface-overlay")}
              >
                <Text className={cn("text-sm", active ? "text-primary-fg" : "text-text-primary")}>{y}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}
