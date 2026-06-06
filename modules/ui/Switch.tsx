import { Switch as RNSwitch, View } from "react-native";

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
        // Switch needs raw color props (no className) — primary / border-strong token values
        trackColor={{ true: "#3b82f6", false: "#d1d5db" }}
        thumbColor="#ffffff"
      />
    </View>
  );
}
