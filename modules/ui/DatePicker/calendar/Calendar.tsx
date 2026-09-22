// modules/ui/DatePicker/calendar/Calendar.tsx
//
// Single-month calendar grid — used by both DatePicker (one Calendar) and
// DateRangePicker (two Calendars). Ported from KuiReact's
// modules/ui/DatePicker/calendar/Calendar.tsx: locale-aware grid,
// min/max/disabledDates, quick month/year picker via the header. KuiReact's
// arrow-key grid navigation (useKeyboardNav) is desktop keyboard behaviour
// and isn't ported. KuiReact's CSS `grid-cols-7` is drawn as explicit
// 7-cell rows: RN flex-wrap would fit only six 32px cells per row.

import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "../../Text";
import { addMonths, buildMonthGrid, clampToBounds, isDisabled, isSameDay, isSameMonth, isWithinBounds, startOfDay } from "../hooks/useDateFns";
import type { DatePickerLocale, DisabledDates } from "../types";
import { MonthSelect } from "./MonthSelect";
import { YearSelect } from "./YearSelect";

type CalendarProps = {
  /** Currently visible month (any day inside it works). */
  month: Date;
  /** Selected date — drawn with the active styling. */
  selected: Date | null;
  /** Optional secondary highlight — start of a range. */
  rangeStart?: Date | null;
  /** Optional secondary highlight — end of a range. */
  rangeEnd?: Date | null;
  onSelect: (d: Date) => void;
  onMonthChange?: (next: Date) => void;
  locale: DatePickerLocale;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  min?: Date;
  max?: Date;
  disabledDates?: DisabledDates;
  ariaLabel?: string;
  /** Compact mode for popovers (default true). */
  compact?: boolean;
  className?: string;
};

type HeaderView = "days" | "months" | "years";

const chunk = <T,>(arr: T[], size: number) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

export function Calendar({
  month,
  selected,
  rangeStart,
  rangeEnd,
  onSelect,
  onMonthChange,
  locale,
  hidePrevButton,
  hideNextButton,
  min,
  max,
  disabledDates,
  ariaLabel,
  compact = true,
  className,
}: CalendarProps) {
  const t = useThemeTokens();
  const today = startOfDay(new Date());
  const [view, setView] = useState<HeaderView>("days");

  const goMonth = useCallback((delta: number) => onMonthChange?.(addMonths(month, delta)), [month, onMonthChange]);

  const grid = buildMonthGrid(month.getFullYear(), month.getMonth(), locale.weekStartsOn);
  const weekdays: string[] = [];
  for (let i = 0; i < 7; i++) weekdays.push(locale.weekdaysShort[(i + locale.weekStartsOn) % 7]);

  const navButton = (dir: -1 | 1) => (
    <Pressable
      onPress={() => goMonth(dir)}
      accessibilityRole="button"
      accessibilityLabel={dir < 0 ? locale.messages.prevMonth : locale.messages.nextMonth}
      className="h-7 w-7 items-center justify-center rounded-md active:bg-surface-overlay"
    >
      <FontAwesomeIcon icon={dir < 0 ? faChevronLeft : faChevronRight} size={14} color={t["text-secondary"]} />
    </Pressable>
  );

  const headerToggle = (target: "months" | "years", label: string) => (
    <Pressable
      onPress={() => setView(view === target ? "days" : target)}
      accessibilityRole="button"
      accessibilityState={{ expanded: view === target }}
      className={cn("rounded-md px-2 py-1 active:bg-surface-overlay", view === target && "bg-surface-overlay")}
    >
      <Text className="text-sm font-medium text-text-primary">{label}</Text>
    </Pressable>
  );

  return (
    <View className={cn(compact ? "w-[15.5rem]" : "w-[18rem]", className)}>
      <View className="flex-row items-center justify-between px-2 pb-1 pt-2">
        {!hidePrevButton ? navButton(-1) : <View className="h-7 w-7" />}
        <View className="flex-row items-center gap-1">
          {headerToggle("months", locale.months[month.getMonth()])}
          {headerToggle("years", String(month.getFullYear()))}
        </View>
        {!hideNextButton ? navButton(1) : <View className="h-7 w-7" />}
      </View>

      {view === "days" ? (
        <View role="grid" aria-label={ariaLabel ?? locale.messages.dialogLabel} className="px-2 pb-2">
          <View className="flex-row gap-0.5">
            {weekdays.map((w, i) => (
              <Text
                key={`wd-${i}`}
                role="columnheader"
                className="flex-1 py-1 text-center text-[11px] font-medium uppercase tracking-wide text-text-secondary"
              >
                {w}
              </Text>
            ))}
          </View>

          <View className="mt-1 gap-0.5">
            {chunk(grid, 7).map((week, r) => (
              <View key={r} className="flex-row gap-0.5">
                {week.map((d) => {
                  const inMonth = isSameMonth(d, month);
                  const disabled = isDisabled(d, disabledDates, min, max);
                  const isSelected = isSameDay(d, selected);
                  const isStart = isSameDay(d, rangeStart);
                  const isEnd = isSameDay(d, rangeEnd);
                  const active = isSelected || isStart || isEnd;
                  const isToday = isSameDay(d, today);
                  return (
                    <View key={d.toISOString()} className="flex-1 items-center">
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`${d.getDate()} ${locale.months[d.getMonth()]} ${d.getFullYear()}`}
                        accessibilityState={{ selected: active, disabled }}
                        disabled={disabled}
                        onPress={() => onSelect(d)}
                        className={cn(
                          "items-center justify-center rounded-md",
                          compact ? "h-8 w-8" : "h-9 w-9",
                          inMonth && !disabled && !active && "active:bg-surface-overlay",
                          disabled && "opacity-40",
                          active && "bg-primary active:bg-primary-hover",
                          // KuiReact: "ring-1 ring-inset ring-primary" — an inset ring is an inner border.
                          isToday && !active && "border border-primary",
                        )}
                      >
                        <Text className={cn("text-sm", active ? "text-primary-fg" : inMonth ? "text-text-primary" : "text-text-disabled")}>
                          {d.getDate()}
                        </Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>

          <View className="mt-2 flex-row items-center justify-end px-1">
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                const target = clampToBounds(today, min, max);
                if (!isWithinBounds(target, min, max)) return;
                onMonthChange?.(target);
                if (!isDisabled(target, disabledDates, min, max)) onSelect(target);
              }}
              className="rounded-md px-2 py-1 active:bg-primary-subtle"
            >
              <Text className="text-xs font-medium text-primary">{locale.messages.today}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {view === "months" ? (
        <MonthSelect
          value={month.getMonth()}
          locale={locale}
          onSelect={(m) => {
            onMonthChange?.(new Date(month.getFullYear(), m, 1));
            setView("days");
          }}
        />
      ) : null}
      {view === "years" ? (
        <YearSelect
          value={month.getFullYear()}
          min={min}
          max={max}
          onSelect={(y) => {
            onMonthChange?.(new Date(y, month.getMonth(), 1));
            setView("days");
          }}
        />
      ) : null}
    </View>
  );
}

