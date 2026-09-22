import { useEffect, useMemo, useState } from "react";
import { Pressable, TextInput as RNTextInput, ScrollView, View } from "react-native";
import { faCheck, faChevronDown, faChevronUp, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { useAsync } from "./ComboBox/hooks/useAsync";
import { useFilter } from "./ComboBox/hooks/useFilter";
import { useLoadMore } from "./ComboBox/hooks/useLoadMore";
import type { ComboBoxOption } from "./ComboBox/types";
import { Label } from "./Label";
import { AnchoredPanel, useAnchor } from "./Overlays/shared";
import { SkeletonLine } from "./Skeleton";
import { Text } from "./Text";

export type MultiSelectOption = ComboBoxOption;

export type MultiSelectProps = {
  id: string;
  label: string;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  /** Async search; signature mirrors ComboBox. */
  onSearch?: (q: string, signal?: AbortSignal) => MultiSelectOption[] | Promise<MultiSelectOption[]>;
  /** Cursor pagination — fires when the list is scrolled near its end. */
  onLoadMore?: () => Promise<MultiSelectOption[]>;
  debounceMs?: number;
};

/**
 * Pixel-for-pixel with KuiReact's MultiSelect (modules/ui/MultiSelect.tsx):
 * a `min-h-[2.5rem] rounded-md border px-3 py-1.5` trigger holding
 * `rounded-full bg-primary-subtle text-primary text-xs` chips with remove
 * buttons, opening a `rounded-md border bg-surface-raised shadow-lg` panel
 * 4px below (`mt-1`) with an optional search field and a `max-h-48` list of
 * checkbox rows. Shares KuiReact's ComboBox filter / async / load-more
 * hooks. The panel is anchored in a transparent window, so tapping outside
 * or Android back closes it (KuiReact: outside click / Escape).
 */
export function MultiSelect({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Select…",
  hint,
  error,
  disabled,
  searchable,
  className,
  onSearch,
  onLoadMore,
  debounceMs = 300,
}: MultiSelectProps) {
  const t = useThemeTokens();
  const [internal, setInternal] = useState<string[]>(value ?? []);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { ref, rect, measure } = useAnchor<View>();

  const selected = value !== undefined ? value : internal;

  const { results: asyncResults, loading, appendResults } = useAsync(open && !!onSearch, search, onSearch, debounceMs);
  const { loadingMore, onScroll } = useLoadMore(open, onLoadMore, appendResults);

  const sourceOptions = asyncResults ?? options;
  const localFiltered = useFilter(sourceOptions, searchable ? search : "");
  const filtered: MultiSelectOption[] = onSearch ? sourceOptions : searchable ? localFiltered : sourceOptions;

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  function toggleOpen() {
    if (disabled) return;
    if (!open) measure();
    setOpen((o) => !o);
  }

  function toggle(v: string) {
    const next = selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v];
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  // Chips keep their labels even when their option left the async page.
  const optionsById = useMemo(() => {
    const m = new Map<string, MultiSelectOption>();
    for (const o of options) m.set(o.value, o);
    for (const o of sourceOptions) if (!m.has(o.value)) m.set(o.value, o);
    return m;
  }, [options, sourceOptions]);

  const selectedLabels = selected.map((v) => optionsById.get(v)?.label ?? v);

  return (
    // KuiReact: "space-y-1"
    <View className={cn("w-full gap-1", className)}>
      <Label onPress={toggleOpen}>{label}</Label>

      <View ref={ref} collapsable={false}>
        <Pressable
          testID={`multiselect-${id}`}
          onPress={toggleOpen}
          disabled={disabled}
          accessibilityRole="combobox"
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          accessibilityValue={{ text: selectedLabels.length ? selectedLabels.join(", ") : placeholder }}
          accessibilityState={{ expanded: open, disabled: Boolean(disabled) }}
          className={cn(
            "min-h-10 w-full flex-row flex-wrap items-center gap-1 rounded-md border px-3 py-1.5",
            error ? "border-error bg-error-subtle" : open ? "border-border-focus bg-surface-base" : "border-border bg-surface-base",
            disabled && "bg-surface-sunken opacity-50",
          )}
        >
          {selected.length === 0 ? (
            <Text className="text-sm text-text-disabled">{placeholder}</Text>
          ) : (
            selected.map((v) => {
              const opt = optionsById.get(v);
              const chipLabel = opt?.label ?? v;
              return (
                <View key={v} className="flex-row items-center gap-1 rounded-full bg-primary-subtle px-2 py-0.5">
                  {opt?.icon ? <View className="shrink-0">{opt.icon}</View> : null}
                  <Text className="text-xs font-medium text-primary">{chipLabel}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${chipLabel}`}
                    disabled={disabled}
                    hitSlop={8}
                    onPress={() => toggle(v)}
                    className="active:opacity-70"
                  >
                    <FontAwesomeIcon icon={faXmark} size={10} color={t.primary} />
                  </Pressable>
                </View>
              );
            })
          )}
          <View className="ml-auto" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} size={12} color={t["text-disabled"]} />
          </View>
        </Pressable>
      </View>

      <AnchoredPanel open={open} onClose={() => setOpen(false)} anchor={rect} placement="bottom" align="start" gap={4}>
        <View
          testID="multiselect-panel"
          className="overflow-hidden rounded-md border border-border bg-surface-raised shadow-lg"
          style={rect.width ? { width: rect.width } : undefined}
        >
          {searchable || onSearch ? (
            <View className="border-b border-border p-2">
              <View className="relative justify-center">
                <View pointerEvents="none" className="absolute left-2 z-10">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size={12} color={t["text-disabled"]} />
                </View>
                <RNTextInput
                  autoFocus
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search…"
                  placeholderTextColor={t["text-disabled"]}
                  accessibilityLabel={`Search ${label}`}
                  className="w-full rounded-md border border-border bg-surface-base py-1.5 pl-7 pr-3 text-sm text-text-primary"
                />
              </View>
            </View>
          ) : null}
          {/* KuiReact listbox: "py-1 max-h-48 overflow-y-auto" (192px). */}
          <ScrollView
            accessibilityRole="list"
            accessibilityLabel={label}
            keyboardShouldPersistTaps="handled"
            onScroll={onScroll}
            scrollEventThrottle={100}
            style={{ maxHeight: 192 }}
            contentContainerClassName="py-1"
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <View key={`sk-${i}`} testID="multiselect-skeleton" className="px-3 py-2">
                  <SkeletonLine className="bg-surface-overlay" />
                </View>
              ))
            ) : filtered.length === 0 ? (
              <Text className="px-3 py-4 text-center text-sm text-text-secondary">No results found.</Text>
            ) : (
              <>
                {filtered.map((opt) => {
                  const checked = selected.includes(opt.value);
                  return (
                    <Pressable
                      key={opt.value}
                      accessibilityRole="checkbox"
                      accessibilityLabel={opt.label}
                      accessibilityState={{ checked, disabled: Boolean(opt.disabled) }}
                      disabled={opt.disabled}
                      onPress={() => toggle(opt.value)}
                      className={cn("flex-row items-center gap-2 px-3 py-2 active:bg-surface-overlay", opt.disabled && "opacity-50")}
                    >
                      <View
                        className={cn(
                          "h-4 w-4 shrink-0 items-center justify-center rounded border-2",
                          checked ? "border-primary bg-primary" : "border-border bg-surface-base",
                        )}
                      >
                        {checked ? <FontAwesomeIcon icon={faCheck} size={10} color={t["primary-fg"]} /> : null}
                      </View>
                      {opt.icon ? <View className="shrink-0">{opt.icon}</View> : null}
                      <Text className={cn("text-sm", checked ? "font-medium text-primary" : "text-text-primary")}>{opt.label}</Text>
                    </Pressable>
                  );
                })}
                {loadingMore ? (
                  <Text accessibilityLiveRegion="polite" className="px-3 py-2 text-xs text-text-secondary">
                    Loading more…
                  </Text>
                ) : null}
              </>
            )}
          </ScrollView>
        </View>
      </AnchoredPanel>

      {hint && !error ? <Text className="text-xs text-text-secondary">{hint}</Text> : null}
      {error ? (
        <Text accessibilityRole="alert" className="text-xs text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
