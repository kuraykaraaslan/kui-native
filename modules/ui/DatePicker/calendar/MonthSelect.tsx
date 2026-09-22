// modules/ui/DatePicker/calendar/MonthSelect.tsx
//
// Quick month picker — shown when the user presses the month name in the
// calendar header. KuiReact: a `grid-cols-3 gap-1.5 p-2` grid of month
// buttons (4 rows × 3 here).

import { Pressable, View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "../../Text";
import type { DatePickerLocale } from "../types";

type MonthSelectProps = {
  /** 0–11 — currently visible month. */
  value: number;
  locale: DatePickerLocale;
  onSelect: (month: number) => void;
};

export function MonthSelect({ value, locale, onSelect }: MonthSelectProps) {
  const rows = [0, 3, 6, 9].map((start) => [start, start + 1, start + 2]);
  return (
    <View accessibilityRole="list" aria-label="Month" className="gap-1.5 p-2">
      {rows.map((row) => (
        <View key={row[0]} className="flex-row gap-1.5">
          {row.map((idx) => {
            const active = idx === value;
            return (
              <Pressable
                key={idx}
                accessibilityRole="button"
                accessibilityLabel={locale.months[idx]}
                accessibilityState={{ selected: active }}
                onPress={() => onSelect(idx)}
                className={cn("flex-1 items-center rounded-md px-2 py-1.5", active ? "bg-primary" : "active:bg-surface-overlay")}
              >
                <Text className={cn("text-sm", active ? "text-primary-fg" : "text-text-primary")}>{locale.monthsShort[idx]}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
