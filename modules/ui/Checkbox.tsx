import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";

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
  const active = checked || indeterminate;

  return (
    <Pressable
      onPress={() => onChange?.(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: indeterminate ? "mixed" : checked, disabled }}
      className={cn("flex-row items-center gap-2 active:opacity-80", disabled && "opacity-50", className)}
    >
      <View
        className={cn(
          "h-5 w-5 items-center justify-center rounded border",
          active ? "bg-primary border-primary" : "bg-surface-base border-border-strong",
        )}
      >
        {active ? (
          <FontAwesomeIcon icon={indeterminate ? faMinus : faCheck} size={12} color="#ffffff" />
        ) : null}
      </View>
      {label ? <Text variant="label">{label}</Text> : null}
    </Pressable>
  );
}
