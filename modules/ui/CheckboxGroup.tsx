import { Pressable, View } from "react-native";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type CheckboxOption = { value: string; label: string };

export type CheckboxGroupProps = {
  legend: string;
  options: CheckboxOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's CheckboxGroup (modules/ui/CheckboxGroup.tsx):
 * a legend above wrapping `px-3 py-1.5 rounded-lg border text-sm` chips.
 * Selected chips use `bg-primary-subtle border-primary text-primary` with a
 * check icon; `disabled` dims the whole group; `error` shows below it.
 * KuiReact's fieldset `space-y-2` is a `gap-2` column here.
 */
export function CheckboxGroup({ legend, options, selected, onChange, disabled, error, className }: CheckboxGroupProps) {
  const t = useThemeTokens();

  function toggle(value: string, checked: boolean) {
    onChange(checked ? [...selected, value] : selected.filter((s) => s !== value));
  }

  return (
    <View role="group" aria-label={legend} className={cn("gap-2", className)}>
      <Text className="mb-2 text-sm font-medium text-text-primary">{legend}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map(({ value, label }) => {
          const isSelected = selected.includes(value);
          return (
            <Pressable
              key={value}
              testID={`checkboxgroup-${value}`}
              accessibilityRole="checkbox"
              accessibilityLabel={label}
              accessibilityState={{ checked: isSelected, disabled: Boolean(disabled) }}
              disabled={disabled}
              onPress={() => toggle(value, !isSelected)}
              className={cn(
                "flex-row items-center gap-2 rounded-lg border px-3 py-1.5",
                disabled && "opacity-50",
                // KuiReact's hover background becomes the pressed state.
                isSelected ? "border-primary bg-primary-subtle" : "border-border bg-surface-base active:bg-surface-overlay",
              )}
            >
              {isSelected ? (
                <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                  <FontAwesomeIcon icon={faCheck} size={12} color={t.primary} />
                </View>
              ) : null}
              <Text className={cn("text-sm", isSelected ? "text-primary" : "text-text-primary")}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? (
        <Text accessibilityRole="alert" className="mt-1 text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
