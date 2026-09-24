import { Pressable } from "react-native";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../../libs/theme";
import { cn } from "../../../../libs/utils/cn";

// KuiReact's native "h-4 w-4 rounded border-border-strong accent-[var(--primary)]" checkbox.
export function SelectBox({ checked, mixed, disabled, label, hint, onPress }: { checked: boolean; mixed?: boolean; disabled?: boolean; label: string; hint?: string; onPress: () => void }) {
  const t = useThemeTokens();
  const on = checked || mixed;
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ checked: mixed ? "mixed" : checked, disabled: Boolean(disabled) }}
      disabled={disabled}
      hitSlop={10}
      onPress={onPress}
      className={cn("h-4 w-4 items-center justify-center rounded border", on ? "border-primary bg-primary" : "border-border-strong bg-surface-base", disabled && "opacity-40")}
    >
      {on ? <FontAwesomeIcon icon={mixed ? faMinus : faCheck} size={10} color={t["primary-fg"]} /> : null}
    </Pressable>
  );
}

