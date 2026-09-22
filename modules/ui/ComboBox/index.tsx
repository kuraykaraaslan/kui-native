// ComboBox — ported from KuiReact's modules/ui/ComboBox/index.tsx. Composes
// Trigger + Listbox and wires the shared useFilter / useAsync / useLoadMore
// hooks; controlled and uncontrolled both work.
//
// RN adaptations: KuiReact's listbox sits in normal flow below the input,
// and so does this one (a native Modal would take focus away from the text
// field). Tapping outside blurs the input, which closes the list — after a
// short delay so a tap on an option lands first. KuiReact's arrow / Home /
// End / Enter navigation is hardware-keyboard behaviour and isn't ported.

import { useEffect, useMemo, useRef, useState } from "react";
import { TextInput as RNTextInput, View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Label } from "../Label";
import { Text } from "../Text";
import { useAsync } from "./hooks/useAsync";
import { useFilter } from "./hooks/useFilter";
import { useLoadMore } from "./hooks/useLoadMore";
import { Listbox } from "./parts/Listbox";
import { Trigger } from "./parts/Trigger";
import type { ComboBoxOption, ComboBoxProps } from "./types";

export type { ComboBoxOption, ComboBoxProps } from "./types";

// Lets an option's onPress run before the blur closes the list.
const BLUR_CLOSE_DELAY = 150;

export function ComboBox({
  id,
  label,
  options,
  value,
  onChange,
  onSearch,
  onLoadMore,
  placeholder = "Search or select...",
  hint,
  error,
  disabled,
  required,
  clearable = true,
  noResultsText = "No results found.",
  className,
  debounceMs = 300,
  virtualize = false,
}: ComboBoxProps) {
  const inputRef = useRef<RNTextInput>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(value ?? "");

  const selectedValue = value !== undefined ? value : internalValue;

  const { results: asyncResults, loading, appendResults } = useAsync(open && !!onSearch, query, onSearch, debounceMs);
  const { loadingMore, onScroll } = useLoadMore(open, onLoadMore, appendResults);

  const sourceOptions = asyncResults ?? options;
  const selectedOption = useMemo(
    () => sourceOptions.find((opt) => opt.value === selectedValue) ?? options.find((opt) => opt.value === selectedValue),
    [options, selectedValue, sourceOptions],
  );

  const localFiltered = useFilter(sourceOptions, query);
  const filteredOptions = onSearch ? sourceOptions : localFiltered;

  useEffect(() => {
    if (!open) setQuery(selectedOption?.label ?? "");
  }, [open, selectedOption?.label]);

  useEffect(
    () => () => {
      if (blurTimer.current) clearTimeout(blurTimer.current);
    },
    [],
  );

  function commitValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function handleSelect(option: ComboBoxOption) {
    if (option.disabled) return;
    if (blurTimer.current) clearTimeout(blurTimer.current);
    commitValue(option.value);
    setQuery(option.label);
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleClear() {
    if (disabled) return;
    commitValue("");
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    // KuiReact: "space-y-1"
    <View className={cn("gap-1", className)}>
      <Label required={required} onPress={() => inputRef.current?.focus()}>
        {label}
      </Label>

      <Trigger
        inputRef={inputRef}
        id={id}
        label={label}
        hint={hint}
        value={open ? query : selectedOption?.label ?? query}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        error={error}
        clearable={clearable}
        open={open}
        focused={focused}
        showClear={!!selectedValue}
        onFocus={() => {
          if (blurTimer.current) clearTimeout(blurTimer.current);
          setFocused(true);
          if (!disabled) setOpen(true);
        }}
        onBlur={() => {
          setFocused(false);
          blurTimer.current = setTimeout(() => setOpen(false), BLUR_CLOSE_DELAY);
        }}
        onChange={(next) => {
          setQuery(next);
          setOpen(true);
        }}
        onPress={() => {
          if (disabled) return;
          inputRef.current?.focus();
          setOpen(true);
        }}
        onClear={handleClear}
      />

      {open ? (
        <Listbox
          id={id}
          label={label}
          options={filteredOptions}
          selectedValue={selectedValue}
          loading={loading}
          loadingMore={loadingMore}
          noResultsText={noResultsText}
          virtualize={virtualize}
          onEndScroll={onLoadMore ? onScroll : undefined}
          onSelect={handleSelect}
        />
      ) : null}

      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
