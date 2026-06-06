import { Switch as RNSwitch, View } from "react-native";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type SwitchProps = {
  value: boolean;
  onValueChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function Switch({ value, onValueChange, label, disabled = false, className }: SwitchProps) {
  const t = useThemeTokens();
  return (
    <View
      className={cn("flex-row items-center justify-between gap-3", disabled && "opacity-50", className)}
    >
      {label ? (
        <Text variant="label" className="flex-1">
          {label}
        </Text>
      ) : null}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityState={{ checked: value, disabled }}
        // RNSwitch needs raw colors (no className): themed track, white knob (convention)
        trackColor={{ true: t.primary, false: t["border-strong"] }}
        thumbColor="#ffffff"
      />
    </View>
  );
}
