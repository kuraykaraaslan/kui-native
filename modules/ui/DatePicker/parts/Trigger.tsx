// modules/ui/DatePicker/parts/Trigger.tsx
//
// Input-shaped trigger used by both DatePicker and DateRangePicker (KuiReact:
// modules/ui/DatePicker/parts/Trigger.tsx). Press anywhere to open the
// popover; the clear (×) and calendar icon sit on the trailing edge.

import type * as React from "react";
import { Pressable, View } from "react-native";
import { faCalendar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../../libs/theme";
import { cn } from "../../../../libs/utils/cn";

import { Text } from "../../Text";

type TriggerProps = {
  display: string;
  placeholder: string;
  open: boolean;
  disabled?: boolean;
  invalid?: boolean;
  showClear?: boolean;
  clearLabel: string;
  onToggle: () => void;
  onClear?: () => void;
  ariaLabel?: string;
  ariaHint?: string;
  required?: boolean;
  testId?: string;
  className?: string;
  anchorRef?: React.Ref<View>;
};

export function Trigger({
  display,
  placeholder,
  open,
  disabled,
  invalid,
  showClear,
  clearLabel,
  onToggle,
  onClear,
  ariaLabel,
  ariaHint,
  required,
  testId,
  className,
  anchorRef,
}: TriggerProps) {
  const t = useThemeTokens();
  return (
    <View
      ref={anchorRef}
      collapsable={false}
      className={cn(
        "w-full flex-row items-center rounded-md border",
        invalid ? "border-error bg-error-subtle" : open ? "border-border-focus bg-surface-base" : "border-border bg-surface-base",
        disabled && "bg-surface-sunken opacity-50",
        className,
      )}
      // KuiReact: focus-within:ring-2 ring-border-focus; the error state adds ring-1 ring-error.
      style={
        invalid
          ? { outlineWidth: 1, outlineColor: t.error, outlineStyle: "solid" }
          : open
            ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" }
            : undefined
      }
    >
      <Pressable
        testID={testId}
        onPress={onToggle}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={ariaLabel ? (required ? `${ariaLabel}, required` : ariaLabel) : undefined}
        accessibilityValue={{ text: display || placeholder }}
        accessibilityHint={ariaHint}
        accessibilityState={{ expanded: open, disabled: Boolean(disabled) }}
        className="flex-1 px-3 py-2"
      >
        <Text className={cn("text-sm", display ? "text-text-primary" : "text-text-disabled")}>{display || placeholder}</Text>
      </Pressable>

      {showClear && !disabled ? (
        <Pressable
          onPress={onClear}
          accessibilityRole="button"
          accessibilityLabel={clearLabel}
          className="mr-1 h-7 w-7 items-center justify-center rounded-md active:bg-surface-overlay"
        >
          <FontAwesomeIcon icon={faXmark} size={12} color={t["text-secondary"]} />
        </Pressable>
      ) : null}

      <View pointerEvents="none" className="mr-3" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <FontAwesomeIcon icon={faCalendar} size={14} color={t["text-secondary"]} />
      </View>
    </View>
  );
}
