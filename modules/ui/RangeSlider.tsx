import { useMemo, useRef, useState } from "react";
import { PanResponder, Pressable, View, type AccessibilityActionEvent, type LayoutChangeEvent } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type BaseProps = {
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
};

type SingleProps = BaseProps & {
  range?: false;
  value: number;
  onChange: (value: number) => void;
};

type RangeProps = BaseProps & {
  range: true;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export type RangeSliderProps = SingleProps | RangeProps;

// KuiReact's native thumb: "h-4 w-4 rounded-full bg-primary border-2 border-surface-base shadow".
const THUMB = 16;

function Thumb({
  x,
  top,
  label,
  value,
  min,
  max,
  disabled,
  onDragStart,
  onDrag,
  onStep,
}: {
  x: number;
  top: number;
  label: string;
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  onDragStart: () => void;
  onDrag: (dx: number) => void;
  onStep: (dir: 1 | -1) => void;
}) {
  // The responder is created once; the latest callbacks are read through a ref.
  const handlers = useRef({ onDragStart, onDrag, disabled });
  handlers.current = { onDragStart, onDrag, disabled };
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !handlers.current.disabled,
        onMoveShouldSetPanResponder: () => !handlers.current.disabled,
        // Keep the drag when a parent ScrollView wants the gesture.
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => handlers.current.onDragStart(),
        onPanResponderMove: (_, g) => handlers.current.onDrag(g.dx),
      }),
    [],
  );

  return (
    <View
      {...pan.panHandlers}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min, max, now: value }}
      accessibilityState={{ disabled: Boolean(disabled) }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e: AccessibilityActionEvent) => {
        if (disabled) return;
        if (e.nativeEvent.actionName === "increment") onStep(1);
        if (e.nativeEvent.actionName === "decrement") onStep(-1);
      }}
      hitSlop={12}
      className="absolute h-4 w-4 rounded-full border-2 border-surface-base bg-primary shadow"
      style={{ left: x, top, elevation: 2 }}
      testID="range-slider-thumb"
      aria-valuetext={String(value)}
    />
  );
}

/**
 * Pixel-for-pixel with KuiReact's RangeSlider (modules/ui/RangeSlider.tsx),
 * whose native `<input type="range">` is drawn here as a `h-1.5
 * rounded-full bg-surface-sunken` track with a `bg-primary` fill and 16px
 * primary thumbs. Single-handle by default; `range` gives a dual min/max
 * selector whose handles can't cross. Thumbs drag, the track jumps the
 * nearest thumb on tap, and screen readers adjust by `step`
 * (increment / decrement actions).
 */
export function RangeSlider(props: RangeSliderProps) {
  const { label, hint, min = 0, max = 100, step = 1, disabled, showValue = true, className } = props;
  const [width, setWidth] = useState(0);
  const dragStart = useRef(0);
  const usable = Math.max(width - THUMB, 0);
  const span = max - min || 1;

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snap = (v: number) => clamp(Math.round((v - min) / step) * step + min);
  const toX = (v: number) => ((v - min) / span) * usable;
  const fromX = (x: number) => snap(min + (usable ? x / usable : 0) * span);
  const pct = (v: number) => ((v - min) / span) * 100;

  const values: number[] = props.range ? props.value : [props.value];
  // Range mode: KuiReact's `relative h-5` box, track centred (10px). Single mode: a bare
  // 6px-tall inline-block <input type="range"> sitting on the baseline of a 24px
  // (16px / 1.5 body strut) line box, so the row is 24px with the track centred at 13px.
  const boxHeight = props.range ? 20 : 24;
  const trackCenter = props.range ? 10 : 13;

  function emit(index: number, next: number) {
    if (props.range) {
      const [lo, hi] = props.value;
      if (index === 0) props.onChange([Math.min(next, hi), hi]);
      else props.onChange([lo, Math.max(next, lo)]);
    } else {
      props.onChange(next);
    }
  }

  function onTrackPress(locationX: number) {
    if (disabled) return;
    const next = fromX(locationX - THUMB / 2);
    const index = props.range ? (Math.abs(next - props.value[0]) <= Math.abs(next - props.value[1]) ? 0 : 1) : 0;
    emit(index, next);
  }

  const thumbLabels = props.range
    ? [label ? `${label} minimum` : "Minimum value", label ? `${label} maximum` : "Maximum value"]
    : [label ?? "Value"];

  return (
    // KuiReact: "space-y-2"
    <View className={cn("gap-2", className)}>
      {label || showValue ? (
        <View className="flex-row items-center justify-between">
          {label ? <Text className="text-sm font-medium text-text-primary">{label}</Text> : <View />}
          {showValue ? (
            <Text className="text-sm text-text-secondary" style={{ fontVariant: ["tabular-nums"] }}>
              {props.range ? `${props.value[0]} – ${props.value[1]}` : props.value}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View
        className={cn("relative", disabled && "opacity-50")}
        style={{ height: boxHeight }}
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
        accessibilityHint={hint}
      >
        <Pressable
          testID="range-slider-track"
          accessible={false}
          disabled={disabled}
          onPress={(e) => onTrackPress(e.nativeEvent.locationX)}
          className="absolute inset-0"
        >
          <View className="absolute h-1.5 w-full rounded-full bg-surface-sunken" style={{ top: trackCenter - 3 }} />
        </Pressable>
        <View
          pointerEvents="none"
          testID="range-slider-fill"
          className="absolute h-1.5 rounded-full bg-primary"
          style={
            props.range
              ? { top: trackCenter - 3, left: `${pct(values[0])}%`, right: `${100 - pct(values[1])}%` }
              : { top: trackCenter - 3, left: 0, width: `${pct(values[0])}%` }
          }
        />
        {values.map((v, i) => (
          <Thumb
            key={i}
            x={toX(v)}
            top={trackCenter - THUMB / 2}
            label={thumbLabels[i]}
            value={v}
            min={min}
            max={max}
            disabled={disabled}
            onDragStart={() => {
              dragStart.current = toX(values[i]);
            }}
            onDrag={(dx) => emit(i, fromX(dragStart.current + dx))}
            onStep={(dir) => emit(i, snap(v + dir * step))}
          />
        ))}
      </View>

      {hint ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
    </View>
  );
}
