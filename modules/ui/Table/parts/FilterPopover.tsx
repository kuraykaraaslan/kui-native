// Per-column filter (KuiReact: Table/parts/FilterPopover.tsx): a filter
// icon opening a panel with a text input ("Contains…") or, for `select`
// filters, a list of options, plus Clear / Apply. The panel is anchored in
// a transparent window (tap outside / Android back close it).

import { useEffect, useState } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { AnchoredPanel, useAnchor } from "../../Overlays/shared";
import { Text } from "../../Text";
import type { Column } from "../types";

export function FilterPopover<T extends Record<string, unknown>>({ column, value, onChange }: { column: Column<T>; value: string; onChange: (next: string) => void }) {
  const t = useThemeTokens();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const { ref, rect, measure } = useAnchor<View>();
  const header = typeof column.header === "string" ? column.header : String(column.key);
  const active = !!value;

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function apply(next = draft) {
    onChange(next.trim());
    setOpen(false);
  }
  function clear() {
    setDraft("");
    onChange("");
    setOpen(false);
  }

  return (
    <View ref={ref} collapsable={false}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={active ? `Edit filter on ${header}` : `Filter ${header}`}
        accessibilityState={{ expanded: open }}
        hitSlop={6}
        onPress={() => {
          if (!open) measure();
          setOpen((o) => !o);
        }}
        className="items-center justify-center rounded p-1"
      >
        <FontAwesomeIcon icon={faFilter} size={10} color={active ? t.primary : t["text-disabled"]} />
      </Pressable>
      <AnchoredPanel open={open} onClose={() => setOpen(false)} anchor={rect} placement="bottom" align="start" gap={4}>
        <View testID={`filter-panel-${String(column.key)}`} accessibilityLabel={`Filter ${header}`} className="min-w-[12rem] rounded-lg border border-border bg-surface-raised p-3 shadow-xl">
          {column.filter?.kind === "select" ? (
            <View className="gap-0.5">
              {[{ label: "All", value: "" }, ...(column.filter?.options ?? [])].map((opt) => (
                <Pressable
                  key={opt.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: draft === opt.value }}
                  onPress={() => setDraft(opt.value)}
                  className={cn("rounded-md px-2 py-1.5", draft === opt.value ? "bg-primary-subtle" : "active:bg-surface-overlay")}
                >
                  <Text className={cn("text-sm", draft === opt.value ? "font-medium text-primary" : "text-text-primary")}>{opt.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <RNTextInput
              autoFocus
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => apply()}
              placeholder={column.filter?.placeholder ?? "Contains…"}
              placeholderTextColor={t["text-disabled"]}
              accessibilityLabel={`Filter ${header}`}
              className="w-full rounded-md border border-border bg-surface-base px-2 py-1.5 text-sm text-text-primary"
            />
          )}
          <View className="mt-2 flex-row items-center justify-end gap-2">
            <Pressable accessibilityRole="button" onPress={clear} className="rounded-md px-2 py-1 active:bg-surface-overlay">
              <Text className="text-xs font-medium text-text-secondary">Clear</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => apply()} className="rounded-md bg-primary px-2 py-1 active:bg-primary-hover">
              <Text className="text-xs font-medium text-primary-fg">Apply</Text>
            </Pressable>
          </View>
        </View>
      </AnchoredPanel>
    </View>
  );
}
