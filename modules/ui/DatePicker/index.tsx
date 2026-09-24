// modules/ui/DatePicker/index.tsx
//
// Public surface for the DatePicker suite, ported from KuiReact's
// modules/ui/DatePicker/index.tsx:
//
//   <DatePicker>       — single date selection, popover variant.
//   <DateRangePicker>  — start → end with two calendars.
//   <DateTimePicker>   — stub that aliases DatePicker (as in KuiReact).
//
// The popover is anchored in a transparent window (Overlays/shared
// AnchoredPanel), so tapping outside or Android back closes it (KuiReact:
// outside mousedown / Escape). KuiReact's hidden `<input name>` form payload
// has no RN equivalent; `name` is accepted and ignored.

import { useCallback, useEffect, useMemo, useState } from "react";
import { View, useWindowDimensions } from "react-native";

import { cn } from "../../../libs/utils/cn";

import { Label } from "../Label";
import { AnchoredPanel, useAnchor } from "../Overlays/shared";
import { Text } from "../Text";
import { Calendar } from "./calendar/Calendar";
import { addMonths, clampToBounds, formatDate, isBefore, isDisabled, isSameMonth, resolveLocale, startOfDay, startOfMonth } from "./hooks/useDateFns";
import { Trigger } from "./parts/Trigger";
import type { DatePickerMessages, DatePickerProps, DateRange, DateRangePickerProps, DateTimePickerProps } from "./types";

export type {
  DatePickerProps,
  DateRangePickerProps,
  DateTimePickerProps,
  DateRange,
  DateValue,
  LocaleCode,
  DatePickerMessages,
  DatePickerLocale,
  DisabledDates,
} from "./types";

function mergeMessages(base: DatePickerMessages, override?: Partial<DatePickerMessages>): DatePickerMessages {
  return override ? { ...base, ...override } : base;
}

// KuiReact popover: "absolute z-30 mt-1 rounded-lg border border-border bg-surface-raised shadow-lg p-1".
const POPOVER = "rounded-lg border border-border bg-surface-raised p-1 shadow-lg";

function FieldLabel({ label, required, onPress }: { label?: string; required?: boolean; onPress: () => void }) {
  if (!label) return null;
  return (
    <Label required={required} onPress={onPress}>
      {label}
    </Label>
  );
}

function FieldMessages({ hint, error }: { hint?: string; error?: string }) {
  return (
    <>
      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </>
  );
}

// ---------------------------------------------------------------------------
// DatePicker — single date
// ---------------------------------------------------------------------------

export function DatePicker({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  disabled,
  required,
  min,
  max,
  disabledDates,
  locale: localeCode,
  format,
  messages,
  variant = "popover",
  className,
}: DatePickerProps) {
  const baseId = id ?? "dp";
  const locale = resolveLocale(localeCode);
  const msgs = mergeMessages(locale.messages, messages);
  const fmt = format ?? locale.displayFormat;
  // KuiReact passes the raw locale to Calendar, so a `messages` override never
  // reaches its Today / chevron copy; the merged messages are passed here.
  const calendarLocale = useMemo(() => ({ ...locale, messages: msgs }), [locale, msgs]);

  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState<Date>(() => startOfMonth(value ?? clampToBounds(new Date(), min, max)));
  const { ref, rect, measure } = useAnchor<View>();

  // Sync the visible month when an external value lands outside it.
  useEffect(() => {
    if (value && !isSameMonth(value, visibleMonth)) setVisibleMonth(startOfMonth(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.getTime()]);

  const display = formatDate(value, fmt);

  const handleSelect = useCallback(
    (d: Date) => {
      if (isDisabled(d, disabledDates, min, max)) return;
      onChange(startOfDay(d));
      setOpen(false);
    },
    [disabledDates, min, max, onChange],
  );

  function toggle() {
    if (disabled) return;
    if (!open) measure();
    setOpen((o) => !o);
  }

  return (
    // KuiReact: "relative space-y-1"
    <View testID={`datepicker-${baseId}`} className={cn("gap-1", className)}>
      <FieldLabel label={label} required={required} onPress={toggle} />
      <Trigger
        anchorRef={ref}
        display={display}
        placeholder={msgs.placeholder}
        open={open}
        disabled={disabled}
        invalid={!!error}
        showClear={!!value}
        clearLabel={msgs.clear}
        onToggle={toggle}
        onClear={() => onChange(null)}
        ariaLabel={label}
        ariaHint={error ?? hint}
        required={required}
        testId={`datepicker-${baseId}-trigger`}
      />
      <AnchoredPanel open={open && variant === "popover"} onClose={() => setOpen(false)} anchor={rect} placement="bottom" align="start" gap={4}>
        <View testID={`datepicker-${baseId}-popover`} accessibilityLabel={msgs.dialogLabel} className={POPOVER}>
          <Calendar
            month={visibleMonth}
            selected={value ?? null}
            onSelect={handleSelect}
            onMonthChange={(m) => setVisibleMonth(startOfMonth(m))}
            locale={calendarLocale}
            min={min}
            max={max}
            disabledDates={disabledDates}
            ariaLabel={msgs.dialogLabel}
          />
        </View>
      </AnchoredPanel>
      <FieldMessages hint={hint} error={error} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// DateRangePicker — start + end with two calendars
// ---------------------------------------------------------------------------

function normaliseRange(r: DateRange | null | undefined): DateRange {
  return { start: r?.start ?? null, end: r?.end ?? null };
}

export function DateRangePicker({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  disabled,
  required,
  min,
  max,
  disabledDates,
  locale: localeCode,
  format,
  messages,
  variant = "popover",
  className,
}: DateRangePickerProps) {
  const baseId = id ?? "dr";
  const locale = resolveLocale(localeCode);
  const msgs = mergeMessages(locale.messages, messages);
  const fmt = format ?? locale.displayFormat;
  // KuiReact passes the raw locale to Calendar, so a `messages` override never
  // reaches its Today / chevron copy; the merged messages are passed here.
  const calendarLocale = useMemo(() => ({ ...locale, messages: msgs }), [locale, msgs]);
  const { width: screenWidth } = useWindowDimensions();

  const range = normaliseRange(value);
  const [open, setOpen] = useState(false);
  const [leftMonth, setLeftMonth] = useState<Date>(() => startOfMonth(range.start ?? clampToBounds(new Date(), min, max)));
  const rightMonth = useMemo(() => addMonths(leftMonth, 1), [leftMonth]);
  const { ref, rect, measure } = useAnchor<View>();

  const startStr = formatDate(range.start, fmt);
  const endStr = formatDate(range.end, fmt);
  const display = range.start || range.end ? `${startStr || msgs.placeholder}  →  ${endStr || msgs.placeholder}` : "";

  // Two-tap selection: first tap sets start, second sets end; tapping before
  // the start, or after a completed range, starts over.
  const handleSelect = useCallback(
    (d: Date) => {
      if (isDisabled(d, disabledDates, min, max)) return;
      const day = startOfDay(d);
      if (!range.start || (range.start && range.end)) {
        onChange({ start: day, end: null });
        return;
      }
      if (isBefore(day, range.start)) {
        onChange({ start: day, end: null });
        return;
      }
      onChange({ start: range.start, end: day });
      setOpen(false);
    },
    [range.start, range.end, disabledDates, min, max, onChange],
  );

  function toggle() {
    if (disabled) return;
    if (!open) measure();
    setOpen((o) => !o);
  }

  return (
    <View testID={`daterangepicker-${baseId}`} className={cn("gap-1", className)}>
      <FieldLabel label={label} required={required} onPress={toggle} />
      <Trigger
        anchorRef={ref}
        display={display}
        placeholder={`${msgs.placeholder}  →  ${msgs.placeholder}`}
        open={open}
        disabled={disabled}
        invalid={!!error}
        showClear={!!(range.start || range.end)}
        clearLabel={msgs.clear}
        onToggle={toggle}
        onClear={() => onChange({ start: null, end: null })}
        ariaLabel={label}
        ariaHint={error ?? hint}
        required={required}
        testId={`daterangepicker-${baseId}-trigger`}
      />
      <AnchoredPanel open={open && variant === "popover"} onClose={() => setOpen(false)} anchor={rect} placement="bottom" align="start" gap={4}>
        {/* KuiReact lays the two months side by side ("flex"); on a phone
            that's wider than the screen, so the row wraps and the months stack. */}
        <View
          testID={`daterangepicker-${baseId}-popover`}
          accessibilityLabel={msgs.dialogLabel}
          className={cn(POPOVER, "flex-row flex-wrap")}
          style={{ maxWidth: screenWidth - 16 }}
        >
          <Calendar
            month={leftMonth}
            selected={range.start ?? null}
            rangeStart={range.start ?? null}
            rangeEnd={range.end ?? null}
            onSelect={handleSelect}
            onMonthChange={(m) => setLeftMonth(startOfMonth(m))}
            locale={calendarLocale}
            min={min}
            max={max}
            disabledDates={disabledDates}
            hideNextButton
            ariaLabel={msgs.dialogLabel}
          />
          <Calendar
            month={rightMonth}
            selected={range.end ?? null}
            rangeStart={range.start ?? null}
            rangeEnd={range.end ?? null}
            onSelect={handleSelect}
            onMonthChange={(m) => setLeftMonth(startOfMonth(addMonths(m, -1)))}
            locale={calendarLocale}
            min={min}
            max={max}
            disabledDates={disabledDates}
            hidePrevButton
            ariaLabel={msgs.dialogLabel}
          />
        </View>
      </AnchoredPanel>
      <FieldMessages hint={hint} error={error} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// DateTimePicker — stub (KuiReact renders the date-only picker for now)
// ---------------------------------------------------------------------------

export function DateTimePicker(props: DateTimePickerProps) {
  return <DatePicker {...props} />;
}
