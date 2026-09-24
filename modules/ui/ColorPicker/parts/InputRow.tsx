// Format switcher tab row + per-format input + copy button (KuiReact:
// ColorPicker/parts/InputRow.tsx). The field validates on commit (submit
// or blur); invalid input reverts to the last good colour.

import { useEffect, useRef, useState } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../../libs/theme";
import { cn } from "../../../../libs/utils/cn";
import { fontStyle } from "../../../../libs/utils/typography";

import { Text } from "../../Text";
import { parseColor } from "../color/parse";
import { formatRgbaAs } from "../hooks/useColorState";
import type { ColorFormat, RGBA } from "../types";

const FORMATS: ColorFormat[] = ["hex", "rgba", "hsla", "hwb", "oklch"];
const FORMAT_LABELS: Record<ColorFormat, string> = { hex: "HEX", rgba: "RGBA", hsla: "HSLA", hwb: "HWB", oklch: "OKLCH" };

type InputRowProps = {
  rgba: RGBA;
  format: ColorFormat;
  onFormatChange: (f: ColorFormat) => void;
  onRgbaChange: (next: RGBA) => void;
};

export function InputRow({ rgba, format, onFormatChange, onRgbaChange }: InputRowProps) {
  const t = useThemeTokens();
  const [draft, setDraft] = useState(formatRgbaAs(rgba, format));
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(formatRgbaAs(rgba, format));
  }, [rgba, format]);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const commit = () => {
    const parsed = parseColor(draft);
    if (parsed) onRgbaChange(parsed);
    else setDraft(formatRgbaAs(rgba, format));
  };

  const copy = async () => {
    try {
      await Clipboard.setStringAsync(formatRgbaAs(rgba, format));
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard unavailable — the value is still in the field.
    }
  };

  return (
    // KuiReact: "space-y-2"
    <View className="gap-2">
      <View role="tablist" aria-label="Color format" className="flex-row items-center gap-0.5 rounded-md border border-border bg-surface-base p-0.5">
        {FORMATS.map((f) => {
          const active = f === format;
          return (
            <Pressable
              key={f}
              role="tab"
              accessibilityLabel={FORMAT_LABELS[f]}
              accessibilityState={{ selected: active }}
              onPress={() => onFormatChange(f)}
              className={cn("flex-1 items-center rounded px-1.5 py-1", active ? "bg-primary" : "active:bg-surface-overlay")}
            >
              <Text className={cn("text-[10px] font-medium uppercase tracking-wide", active ? "text-primary-fg" : "text-text-secondary")}>{FORMAT_LABELS[f]}</Text>
            </Pressable>
          );
        })}
      </View>
      <View className="flex-row items-center gap-2">
        <RNTextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={commit}
          onBlur={commit}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel={`${FORMAT_LABELS[format]} value`}
          className="min-w-0 flex-1 rounded border border-border bg-surface-base px-2 py-1 font-mono text-xs text-text-primary"
          style={fontStyle("regular", "mono")}
        />
        <Pressable
          onPress={copy}
          accessibilityRole="button"
          accessibilityLabel={copied ? "Copied" : "Copy value"}
          className="h-7 w-7 items-center justify-center rounded border border-border bg-surface-base active:bg-surface-overlay"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} size={12} color={t["text-secondary"]} />
        </Pressable>
      </View>
    </View>
  );
}
