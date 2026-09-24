import { useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Label } from "./Label";
import { AnchoredPanel, useAnchor } from "./Overlays/shared";
import { Text } from "./Text";

export type TimePickerProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  /** "HH:MM" (24-hour), as `<input type="time">` reports it. */
  value?: string;
  onChange: (time: string) => void;
  disabled?: boolean;
  required?: boolean;
  /** Step in seconds (KuiReact's `step`, default 60); minutes advance by step / 60. */
  step?: number;
  className?: string;
};

const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));
const ROW = 32;
const LIST_HEIGHT = 192;

function parse(value?: string): { h: number; m: number } | null {
  const match = value ? /^(\d{1,2}):(\d{2})/.exec(value) : null;
  return match ? { h: Number(match[1]), m: Number(match[2]) } : null;
}

function Column({ label, values, selected, onPick }: { label: string; values: number[]; selected: number | null; onPick: (v: number) => void }) {
  const ref = useRef<ScrollView>(null);
  const index = selected === null ? -1 : values.indexOf(selected);
  return (
    <ScrollView
      ref={ref}
      accessibilityRole="list"
      accessibilityLabel={label}
      style={{ maxHeight: LIST_HEIGHT }}
      contentContainerClassName="py-1"
      onLayout={() => {
        if (index > 0) ref.current?.scrollTo({ y: Math.max(0, index * ROW - LIST_HEIGHT / 2 + ROW / 2), animated: false });
      }}
    >
      {values.map((v) => {
        const active = v === selected;
        return (
          <Pressable
            key={v}
            accessibilityRole="button"
            accessibilityLabel={`${pad2(v)} ${label.toLowerCase()}`}
            accessibilityState={{ selected: active }}
            onPress={() => onPick(v)}
            className={cn("h-8 w-14 items-center justify-center rounded-md", active ? "bg-primary" : "active:bg-surface-overlay")}
          >
            <Text className={cn("text-sm", active ? "text-primary-fg" : "text-text-primary")} style={{ fontVariant: ["tabular-nums"] }}>
              {pad2(v)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/**
 * KuiReact's TimePicker is a native `<input type="time">` styled `rounded-md
 * border px-3 py-2 text-sm`. RN has no time input, so the same-looking
 * field opens an anchored panel with hour (00–23) and minute columns
 * (stepped by `step`); picking either updates the "HH:MM" value. Tap outside
 * or Android back closes it.
 */
export function TimePicker({ id, label, hint, error, value, onChange, disabled, required, step = 60, className }: TimePickerProps) {
  const t = useThemeTokens();
  const [open, setOpen] = useState(false);
  const { ref, rect, measure } = useAnchor<View>();
  const time = parse(value);
  const minuteStep = Math.max(1, Math.round(step / 60));
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);

  function toggle() {
    if (disabled) return;
    if (!open) measure();
    setOpen((o) => !o);
  }

  return (
    // KuiReact: "space-y-1"
    <View className={cn("gap-1", className)}>
      <Label required={required} onPress={toggle}>
        {label}
      </Label>
      <View ref={ref} collapsable={false}>
        <Pressable
          testID={`timepicker-${id}`}
          onPress={toggle}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={required ? `${label}, required` : label}
          accessibilityValue={{ text: value || "no time selected" }}
          accessibilityHint={error ?? hint}
          accessibilityState={{ expanded: open, disabled: Boolean(disabled) }}
          className={cn(
            "w-full rounded-md border px-3 py-2",
            error ? "border-error bg-error-subtle" : open ? "border-border-focus bg-surface-base" : "border-border bg-surface-base",
            disabled && "bg-surface-sunken opacity-50",
          )}
          style={
            error
              ? { outlineWidth: 1, outlineColor: t.error, outlineStyle: "solid" }
              : open
                ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" }
                : undefined
          }
        >
          <Text className="text-sm text-text-primary" style={{ fontVariant: ["tabular-nums"] }}>
            {time ? `${pad2(time.h)}:${pad2(time.m)}` : "--:--"}
          </Text>
        </Pressable>
      </View>

      <AnchoredPanel open={open} onClose={() => setOpen(false)} anchor={rect} placement="bottom" align="start" gap={4}>
        <View testID={`timepicker-${id}-panel`} className="flex-row gap-1 rounded-lg border border-border bg-surface-raised p-1 shadow-lg">
          <Column label="Hours" values={hours} selected={time?.h ?? null} onPick={(h) => onChange(`${pad2(h)}:${pad2(time?.m ?? 0)}`)} />
          <Column label="Minutes" values={minutes} selected={time?.m ?? null} onPick={(m) => onChange(`${pad2(time?.h ?? 0)}:${pad2(m)}`)} />
        </View>
      </AnchoredPanel>

      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
