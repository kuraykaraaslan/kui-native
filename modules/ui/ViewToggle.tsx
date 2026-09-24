import { Platform, Pressable, View } from "react-native";
import { faTableCells, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

export type ViewOrientation = "horizontal" | "vertical";

export type ViewToggleProps = {
  value: ViewOrientation;
  onChange: (v: ViewOrientation) => void;
  labels?: { horizontal?: string; vertical?: string };
  ariaLabel?: string;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's ViewToggle: a `rounded-lg p-0.5 border
 * bg-surface-raised` pair of `px-3 py-1.5 text-xs font-semibold` buttons
 * (list / grid icon + label); the active one is `bg-primary
 * text-primary-fg shadow-sm`.
 */
export function ViewToggle({ value, onChange, labels, ariaLabel, className }: ViewToggleProps) {
  const t = useThemeTokens();
  const text = { horizontal: labels?.horizontal ?? "Horizontal", vertical: labels?.vertical ?? "Vertical" };

  return (
    <View role="group" aria-label={ariaLabel ?? "View options"} className={cn("flex-row items-center gap-0.5 self-start rounded-lg border border-border bg-surface-raised p-0.5", className)}>
      {(["horizontal", "vertical"] as const).map((opt) => {
        const active = value === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            className={cn("flex-row items-center gap-1.5 rounded-md px-3 py-1.5", active ? "bg-primary shadow-sm" : "active:bg-surface-overlay")}
            style={active && Platform.OS === "android" ? { elevation: 1 } : undefined}
          >
            <FontAwesomeIcon icon={opt === "horizontal" ? faTableList : faTableCells} size={14} color={active ? t["primary-fg"] : t["text-secondary"]} />
            <Text className={cn("text-xs font-semibold", active ? "text-primary-fg" : "text-text-secondary")}>{text[opt]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
