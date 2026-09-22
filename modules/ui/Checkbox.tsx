import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type CheckboxProps = {
  checked: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onChange,
  label,
  indeterminate = false,
  disabled = false,
  className,
}: CheckboxProps) {
  const t = useThemeTokens();
  const active = checked || indeterminate;

  return (
    <Pressable
      onPress={() => onChange?.(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: indeterminate ? "mixed" : checked, disabled }}
      // Pixel-for-pixel with KuiReact's Checkbox (modules/ui/Checkbox.tsx):
      // gap-3 + items-start (top-aligned, so a multi-line label matches the
      // box's baseline the way KuiReact's does) — a prior pass here used
      // gap-2/items-center.
      className={cn("flex-row items-start gap-3 active:opacity-80", disabled && "opacity-50", className)}
    >
      <View
        className={cn(
          // KuiReact's native checkbox renders at 16px (h-4 w-4) with an
          // unchecked border of `border-border`; a prior pass here used a
          // larger 20px box and `border-border-strong`.
          "mt-0.5 h-4 w-4 items-center justify-center rounded border",
          active ? "bg-primary border-primary" : "bg-surface-base border-border",
        )}
      >
        {active ? (
          <FontAwesomeIcon icon={indeterminate ? faMinus : faCheck} size={10} color={t["primary-fg"]} />
        ) : null}
      </View>
      {label ? <Text variant="label">{label}</Text> : null}
    </Pressable>
  );
}
