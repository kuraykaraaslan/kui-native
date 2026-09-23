import type * as React from "react";
import { useState } from "react";
import { Pressable, TextInput as RNTextInput, View, type TextInputProps as RNTextInputProps } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type InputProps = Omit<RNTextInputProps, "secureTextEntry"> & {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  required?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  showCount?: boolean;
  /** KuiReact's input types that change behaviour: password (eye toggle) and number (stepper). */
  type?: "text" | "password" | "number" | "email";
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  /** Wrapper classes, as in KuiReact. Use `inputClassName` for the field itself. */
  className?: string;
  inputClassName?: string;
  /** @deprecated Use `className` (it now targets the wrapper, as in KuiReact). */
  containerClassName?: string;
  ref?: React.Ref<RNTextInput>;
};

/** Pixel-for-pixel with KuiReact's Input (modules/ui/Input.tsx). */
export function Input({
  label,
  hint,
  error,
  success,
  required,
  prefixIcon,
  suffixIcon,
  clearable,
  onClear,
  showCount,
  maxLength,
  type = "text",
  step = 1,
  min,
  max,
  disabled,
  readOnly,
  editable,
  className,
  inputClassName,
  containerClassName,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ref,
  ...rest
}: InputProps) {
  const t = useThemeTokens();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isNumber = type === "number";
  const isReadOnly = Boolean(readOnly) || editable === false;
  const state = error ? "error" : success ? "success" : "default";

  const showClear = Boolean(clearable && value && !isReadOnly && !isPassword);
  const hasSuffix = Boolean(suffixIcon || showClear || isPassword);
  const charCount = typeof value === "string" ? value.length : 0;

  function step_(dir: 1 | -1) {
    const current = Number(value ?? 0) || 0;
    const next = dir === 1 ? Math.min(current + step, max ?? Infinity) : Math.max(current - step, min ?? -Infinity);
    onChangeText?.(String(next));
  }

  return (
    // KuiReact: "space-y-1" wrapper carrying `className`.
    <View className={cn("w-full gap-1", containerClassName, className)}>
      {label ? (
        // KuiReact: "block text-sm font-medium text-text-primary" + "*" + "(read-only)".
        <Text className="text-sm font-medium text-text-primary">
          {label}
          {required ? <Text className="text-sm font-medium text-error">{" *"}</Text> : null}
          {isReadOnly && readOnly ? <Text className="text-xs font-normal text-text-disabled">{"  (read-only)"}</Text> : null}
        </Text>
      ) : null}

      <View className="relative justify-center">
        {prefixIcon ? (
          <View pointerEvents="none" className="absolute left-3 z-10">
            {prefixIcon}
          </View>
        ) : null}

        <RNTextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={isNumber ? "numeric" : type === "email" ? "email-address" : rest.keyboardType}
          autoCapitalize={type === "email" || isPassword ? "none" : rest.autoCapitalize}
          editable={!disabled && !isReadOnly}
          placeholderTextColor={t["text-disabled"]}
          accessibilityLabel={label ? (required ? `${label}, required` : label) : rest.accessibilityLabel}
          accessibilityHint={error ?? success ?? hint}
          accessibilityState={{ disabled: Boolean(disabled) }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            // KuiReact: "block w-full rounded-md border px-3 py-2 text-sm text-text-primary"
            "w-full rounded-md border px-3 py-2 text-sm text-text-primary",
            state === "error" && "border-error bg-error-subtle",
            state === "success" && "border-success bg-success-subtle",
            state === "default" && (focused ? "border-border-focus bg-surface-base" : "border-border bg-surface-base"),
            (disabled || isReadOnly) && "bg-surface-sunken",
            disabled && "opacity-50",
            prefixIcon && "pl-9",
            (hasSuffix || isNumber) && "pr-9",
            inputClassName,
          )}
          {...rest}
        />

        {isPassword && !isReadOnly ? (
          <Pressable
            onPress={() => setShowPassword((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            hitSlop={10}
            className="absolute right-3"
          >
            {/* `w-3.5 h-3.5` loses to FontAwesome's 1em height at the button's 14px: an 16×14 eye glyph. */}
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size={16} color={t["text-disabled"]} />
          </Pressable>
        ) : null}

        {showClear ? (
          <Pressable onPress={onClear} accessibilityRole="button" accessibilityLabel="Clear" hitSlop={10} className="absolute right-3">
            {/* `w-3 h-3` loses to FontAwesome's 1em height at 16px: a 12×16 xmark glyph. */}
            <FontAwesomeIcon icon={faXmark} size={16} color={t["text-disabled"]} />
          </Pressable>
        ) : null}

        {suffixIcon && !clearable && !isPassword ? (
          <View pointerEvents="none" className="absolute right-3">
            {suffixIcon}
          </View>
        ) : null}

        {isNumber && !isReadOnly ? (
          // KuiReact: "absolute right-0 top-0 h-full flex flex-col border-l border-border rounded-r-md"
          <View className="absolute bottom-0 right-0 top-0 overflow-hidden rounded-r-md border-l border-border">
            <Pressable
              onPress={() => step_(1)}
              accessibilityRole="button"
              accessibilityLabel="Increment"
              className="flex-1 items-center justify-center border-b border-border px-2 active:bg-surface-overlay"
            >
              {/* KuiReact's `w-2 h-2` loses to FontAwesome's 1.25em × 1em box (16px font). */}
              <View className="h-4 w-5 items-center justify-center">
                <FontAwesomeIcon icon={faChevronUp} size={16} color={t["text-secondary"]} />
              </View>
            </Pressable>
            <Pressable
              onPress={() => step_(-1)}
              accessibilityRole="button"
              accessibilityLabel="Decrement"
              className="flex-1 items-center justify-center px-2 active:bg-surface-overlay"
            >
              <View className="h-4 w-5 items-center justify-center">
                <FontAwesomeIcon icon={faChevronDown} size={16} color={t["text-secondary"]} />
              </View>
            </Pressable>
          </View>
        ) : null}
      </View>

      {/* KuiReact always renders this row (even empty), so `space-y-1` adds its 4px gap. */}
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-1">
          {hint && !error && !success ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
          {error ? (
            <Text accessibilityRole="alert" accessibilityLiveRegion="polite" className="text-xs text-error">
              {error}
            </Text>
          ) : null}
          {success && !error ? <Text className="text-xs text-success-fg">{success}</Text> : null}
        </View>
        {showCount && maxLength ? (
          <Text className={cn("shrink-0 text-xs", charCount >= maxLength ? "text-error" : "text-text-disabled")}>
            {charCount}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
