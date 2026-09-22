// ColorPicker — ported from KuiReact's modules/ui/ColorPicker/index.tsx (M1):
// a trigger opening a popover with a swatch grid, a hex field (or the
// HEX/RGBA/HSLA/HWB/OKLCH format switcher), a native picker and a "no
// colour" button. KuiReact's colour maths (color/convert, parse, contrast)
// and useColorState are ported unchanged.
//
// RN adaptations: the popover is anchored in a transparent window (tap
// outside / Android back close it); `<input type="color">` has no RN
// counterpart, so the native-picker button toggles a hue strip.

import { useEffect, useMemo, useState } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Label } from "../Label";
import { AnchoredPanel, useAnchor } from "../Overlays/shared";
import { Text } from "../Text";
import { rgbaToHex } from "./color/convert";
import { parseColor } from "./color/parse";
import { formatRgbaAs, useColorState } from "./hooks/useColorState";
import { HueStrip } from "./parts/HueStrip";
import { InputRow } from "./parts/InputRow";
import { Swatch } from "./parts/Swatch";
import type { ColorFormat, ColorPickerProps, RGBA } from "./types";

export type { ColorPickerProps, ColorFormat, ColorValue } from "./types";

export const DEFAULT_COLOR_SWATCHES = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb", "#f3f4f6", "#ffffff",
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6",
  "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#fca5a5", "#fdba74", "#fcd34d", "#fde047", "#bef264", "#86efac", "#6ee7b7", "#5eead4",
];

/** KuiReact's legacy hex normalizer: accepts "abc", "#abc", "#aabbcc". */
export function normalizeHex(input: string): string | null {
  let s = input.trim();
  if (!s) return null;
  if (s[0] !== "#") s = "#" + s;
  if (/^#[0-9a-fA-F]{3}$/.test(s)) s = "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
  if (/^#[0-9a-fA-F]{6}$/.test(s)) return s.toLowerCase();
  return null;
}

const chunk = <T,>(arr: T[], size: number) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

export function ColorPicker({
  id,
  label,
  value,
  onChange,
  swatches = DEFAULT_COLOR_SWATCHES,
  showHexInput = true,
  showNativePicker = true,
  showNoColor = false,
  align = "left",
  triggerLabel,
  className,
  popoverClassName,
  disabled = false,
  iconOnly = false,
  icon,
  showFormatSwitcher = false,
  defaultFormat = "hex",
}: ColorPickerProps) {
  const t = useThemeTokens();
  const [open, setOpen] = useState(false);
  const [hueOpen, setHueOpen] = useState(false);
  const [hex, setHex] = useState(value ?? "");
  const [format, setFormat] = useState<ColorFormat>(defaultFormat);
  const { ref, rect, measure } = useAnchor<View>();
  const { rgba, setRgba, syncFromString } = useColorState({ value: value ?? null, format });

  useEffect(() => {
    setHex(value ?? "");
    syncFromString(value ?? null);
  }, [value, syncFromString]);

  function toggle() {
    if (disabled) return;
    if (!open) measure();
    setOpen((o) => !o);
  }

  const commitHex = () => {
    const n = normalizeHex(hex);
    if (n) {
      onChange(n);
      setOpen(false);
    }
  };
  const handleRgbaChange = (next: RGBA) => {
    setRgba(next);
    onChange(formatRgbaAs(next, format));
  };
  const handleFormatChange = (next: ColorFormat) => {
    setFormat(next);
    if (value) onChange(formatRgbaAs(rgba, next));
  };
  const nativeHex = useMemo(() => normalizeHex(value ?? "") ?? rgbaToHex({ ...rgba, a: 1 }).slice(0, 7), [value, rgba]);
  const pickNative = (next: string) => {
    if (showFormatSwitcher) {
      const parsed = parseColor(next);
      if (parsed) {
        setRgba(parsed);
        onChange(formatRgbaAs(parsed, format));
      }
    } else {
      onChange(next);
    }
  };

  return (
    <View className={cn("self-start", className)}>
      {label && !iconOnly ? (
        <Label className="mb-1" onPress={toggle}>
          {label}
        </Label>
      ) : null}
      <View ref={ref} collapsable={false} className="self-start">
        {iconOnly ? (
          <Pressable
            testID={id}
            disabled={disabled}
            onPress={toggle}
            accessibilityRole="button"
            accessibilityLabel={triggerLabel || "Pick a color"}
            accessibilityState={{ expanded: open, disabled }}
            className={cn("relative h-8 w-8 items-center justify-center rounded active:bg-surface-overlay", disabled && "opacity-50")}
          >
            {icon ? <FontAwesomeIcon icon={icon} size={14} color={t["text-primary"]} /> : null}
            <View className="absolute bottom-0.5 left-1 right-1 h-0.5 rounded-sm" style={{ backgroundColor: value || "transparent" }} />
          </Pressable>
        ) : (
          <Pressable
            testID={id}
            disabled={disabled}
            onPress={toggle}
            accessibilityRole="button"
            accessibilityLabel={triggerLabel || label || "Pick a color"}
            accessibilityValue={{ text: value || "none" }}
            accessibilityState={{ expanded: open, disabled }}
            className={cn("flex-row items-center gap-2 rounded-md border border-border bg-surface-base px-2.5 py-1.5 active:bg-surface-overlay", disabled && "opacity-50")}
          >
            {/* KuiReact draws a checkerboard for "no colour"; a sunken tile stands in. */}
            <View className={cn("h-4 w-4 shrink-0 rounded-sm border border-border", !value && "bg-surface-sunken")} style={value ? { backgroundColor: value } : undefined} />
            <Text className="font-mono text-xs text-text-primary">{value || "none"}</Text>
            <FontAwesomeIcon icon={faChevronDown} size={10} color={t["text-disabled"]} />
          </Pressable>
        )}
      </View>

      <AnchoredPanel open={open} onClose={() => setOpen(false)} anchor={rect} placement="bottom" align={align === "right" ? "end" : "start"} gap={4}>
        <View testID="color-picker-panel" accessibilityLabel="Color picker" className={cn("w-64 rounded-lg border border-border bg-surface-raised p-3 shadow-lg", popoverClassName)}>
          {swatches.length > 0 ? (
            <View className="mb-3 gap-1">
              {chunk(swatches, 8).map((row, r) => (
                <View key={r} className="flex-row gap-1">
                  {row.map((c) => (
                    <Swatch
                      key={c}
                      color={c}
                      selected={!!value && value.toLowerCase() === c.toLowerCase()}
                      onSelect={(picked) => {
                        onChange(picked);
                        const parsed = parseColor(picked);
                        if (parsed) setRgba(parsed);
                        setOpen(false);
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {showFormatSwitcher ? (
            <View className="mb-3">
              <InputRow rgba={rgba} format={format} onFormatChange={handleFormatChange} onRgbaChange={handleRgbaChange} />
            </View>
          ) : null}

          {showHexInput || showNativePicker || showNoColor ? (
            <View className="flex-row items-center gap-2">
              {showHexInput && !showFormatSwitcher ? (
                <RNTextInput
                  value={hex}
                  onChangeText={setHex}
                  onSubmitEditing={commitHex}
                  onBlur={commitHex}
                  placeholder="#000000"
                  placeholderTextColor={t["text-disabled"]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Hex color"
                  className="min-w-0 flex-1 rounded border border-border bg-surface-base px-2 py-1 font-mono text-xs text-text-primary"
                />
              ) : null}
              {showNativePicker ? (
                <Pressable
                  onPress={() => setHueOpen((o) => !o)}
                  accessibilityRole="button"
                  accessibilityLabel="Native color picker"
                  accessibilityState={{ expanded: hueOpen }}
                  className="h-7 w-7 rounded border border-border"
                  style={{ backgroundColor: nativeHex }}
                />
              ) : null}
              {showNoColor ? (
                <Pressable
                  onPress={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="No color"
                  className="h-7 w-7 items-center justify-center rounded border border-border bg-surface-base active:bg-surface-overlay"
                >
                  <FontAwesomeIcon icon={faXmark} size={12} color={t["text-secondary"]} />
                </Pressable>
              ) : null}
            </View>
          ) : null}
          {showNativePicker && hueOpen ? (
            <View className="mt-2">
              <HueStrip onPick={pickNative} />
            </View>
          ) : null}
        </View>
      </AnchoredPanel>
    </View>
  );
}
