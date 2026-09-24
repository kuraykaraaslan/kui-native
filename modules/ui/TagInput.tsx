import { useRef, useState } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Label } from "./Label";
import { Text } from "./Text";

export type TagInputProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

// Two taps on a chip within this window count as KuiReact's double-click.
const DOUBLE_TAP_MS = 300;

/**
 * Pixel-for-pixel with KuiReact's TagInput: a `min-h-10 rounded-md border
 * px-3 py-2` field of `rounded-full bg-primary-subtle text-primary text-xs`
 * chips followed by a free-text input. Enter (the keyboard's submit key) or
 * a comma adds tags; duplicates are ignored; Backspace on an empty input
 * removes the last tag; double-tap (or long-press) a chip to edit it.
 */
export function TagInput({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  placeholder = "Type and press Enter or comma…",
  disabled,
  className,
}: TagInputProps) {
  const t = useThemeTokens();
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<RNTextInput>(null);
  const lastTap = useRef<{ idx: number; at: number } | null>(null);

  function addTags(raw: string) {
    const tags = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (tags.length) onChange([...new Set([...value, ...tags])]);
    setInput("");
  }

  function removeTag(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function handleInputChange(v: string) {
    if (v.includes(",")) {
      // KuiReact adds each completed part separately; adding them in one
      // update avoids its stale-`value` race when several are pasted.
      const parts = v.split(",");
      const done = parts.slice(0, -1).join(",");
      if (done.trim()) addTags(done);
      setInput(parts[parts.length - 1]);
    } else {
      setInput(v);
    }
  }

  function startEdit(i: number) {
    if (disabled) return;
    setEditingIdx(i);
    setEditValue(value[i]);
  }

  function onChipPress(i: number) {
    const now = Date.now();
    if (lastTap.current && lastTap.current.idx === i && now - lastTap.current.at < DOUBLE_TAP_MS) {
      lastTap.current = null;
      startEdit(i);
    } else {
      lastTap.current = { idx: i, at: now };
    }
  }

  function finishEdit() {
    if (editingIdx === null) return;
    const trimmed = editValue.trim();
    if (trimmed) {
      const next = [...value];
      next[editingIdx] = trimmed;
      onChange([...new Set(next)]);
    }
    setEditingIdx(null);
    setEditValue("");
  }

  return (
    // KuiReact: "space-y-1"
    <View className={cn("gap-1", className)}>
      <Label onPress={() => inputRef.current?.focus()}>{label}</Label>
      <Pressable
        testID={`taginput-${id}`}
        accessible={false}
        onPress={() => inputRef.current?.focus()}
        disabled={disabled}
        className={cn(
          "min-h-10 w-full flex-row flex-wrap items-center gap-1.5 rounded-md border px-3 py-2",
          disabled ? "border-border bg-surface-sunken opacity-50" : "bg-surface-base",
          !disabled && (focused ? "border-border-focus" : "border-border"),
          error && "border-error bg-error-subtle",
        )}
        // KuiReact: focus-within:ring-2 ring-border-focus; the error state adds ring-1 ring-error.
        style={
          error
            ? { outlineWidth: 1, outlineColor: t.error, outlineStyle: "solid" }
            : focused
              ? { outlineWidth: 2, outlineColor: t["border-focus"], outlineStyle: "solid" }
              : undefined
        }
      >
        {value.map((tag, i) =>
          editingIdx === i ? (
            <RNTextInput
              key={i}
              autoFocus
              value={editValue}
              onChangeText={setEditValue}
              onBlur={finishEdit}
              onSubmitEditing={finishEdit}
              accessibilityLabel={`Edit ${tag}`}
              className="w-24 rounded border border-border-focus bg-surface-base px-1.5 py-0.5 text-xs text-text-primary"
            />
          ) : (
            <Pressable
              key={i}
              onPress={() => onChipPress(i)}
              onLongPress={() => startEdit(i)}
              disabled={disabled}
              accessibilityLabel={tag}
              accessibilityHint={disabled ? undefined : "Double-tap and hold to edit"}
              className="flex-row items-center gap-1 rounded-full bg-primary-subtle px-2 py-0.5"
            >
              <Text className="text-xs font-medium text-primary">{tag}</Text>
              {!disabled ? (
                <Pressable
                  onPress={() => removeTag(i)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${tag}`}
                  hitSlop={8}
                  className="rounded-full active:opacity-70"
                >
                  <FontAwesomeIcon icon={faXmark} size={10} color={t.primary} />
                </Pressable>
              ) : null}
            </Pressable>
          ),
        )}
        {!disabled ? (
          <RNTextInput
            ref={inputRef}
            testID={`taginput-${id}-input`}
            value={input}
            onChangeText={handleInputChange}
            onSubmitEditing={() => input.trim() && addTags(input)}
            submitBehavior="submit"
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Backspace" && !input && value.length) removeTag(value.length - 1);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              if (input.trim()) addTags(input);
            }}
            placeholder={value.length === 0 ? placeholder : undefined}
            placeholderTextColor={t["text-disabled"]}
            accessibilityLabel={label}
            accessibilityHint={error ?? hint}
            className="min-w-24 flex-1 p-0 text-sm text-text-primary"
          />
        ) : null}
      </Pressable>
      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {!hint && !error && value.length > 0 ? <Text className="text-xs text-text-disabled">Double-click a tag to edit it</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
