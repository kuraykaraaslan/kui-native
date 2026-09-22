// RN stand-in for KuiReact's `<input type="color">` (the OS colour dialog):
// a hue strip — tap or drag to pick a fully-saturated hue.

import { useMemo, useRef, useState } from "react";
import { PanResponder, View, type LayoutChangeEvent } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const STOPS = [0, 60, 120, 180, 240, 300, 360];

/** Fully saturated, full-value colour for a hue in degrees, as #rrggbb. */
export function hueToHex(h: number): string {
  const hue = ((h % 360) + 360) % 360;
  const x = 1 - Math.abs(((hue / 60) % 2) - 1);
  const [r, g, b] =
    hue < 60 ? [1, x, 0] : hue < 120 ? [x, 1, 0] : hue < 180 ? [0, 1, x] : hue < 240 ? [0, x, 1] : hue < 300 ? [x, 0, 1] : [1, 0, x];
  const hex = (v: number) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export function HueStrip({ onPick }: { onPick: (hex: string) => void }) {
  const [width, setWidth] = useState(0);
  const latest = useRef({ width, onPick });
  latest.current = { width, onPick };

  const pan = useMemo(() => {
    const pick = (x: number) => {
      const w = latest.current.width;
      if (!w) return;
      latest.current.onPick(hueToHex((Math.min(w, Math.max(0, x)) / w) * 360));
    };
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => pick(e.nativeEvent.locationX),
      onPanResponderMove: (e) => pick(e.nativeEvent.locationX),
    });
  }, []);

  return (
    <View
      {...pan.panHandlers}
      testID="color-hue-strip"
      accessibilityLabel="Hue"
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      className="h-5 w-full overflow-hidden rounded border border-border"
    >
      <Svg width="100%" height="100%" pointerEvents="none">
        <Defs>
          <LinearGradient id="kui-hue" x1="0" y1="0" x2="1" y2="0">
            {STOPS.map((h) => (
              <Stop key={h} offset={h / 360} stopColor={hueToHex(h)} />
            ))}
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#kui-hue)" />
      </Svg>
    </View>
  );
}
