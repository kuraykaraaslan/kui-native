import { Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleHalfStroke, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useThemeMode, useThemeTokens } from "@/libs/theme";

/** Cycles theme: system → light → dark → system. */
export function ThemeToggle() {
  const mode = useThemeMode((s) => s.mode);
  const cycle = useThemeMode((s) => s.cycle);
  const t = useThemeTokens();
  const icon = mode === "light" ? faSun : mode === "dark" ? faMoon : faCircleHalfStroke;

  return (
    <Pressable
      onPress={cycle}
      accessibilityRole="button"
      accessibilityLabel={`Theme: ${mode}. Tap to change.`}
      hitSlop={8}
      className="h-9 w-9 items-center justify-center rounded-lg bg-surface-overlay active:opacity-70"
    >
      <FontAwesomeIcon icon={icon} size={16} color={t["text-primary"]} />
    </Pressable>
  );
}
