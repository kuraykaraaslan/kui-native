// AdvancedDataTable — KuiReact's deprecated legacy view (Table/DataTable.tsx
// `LegacyAdvancedView`, re-exported as `AdvancedDataTable`): row selection
// with an indeterminate header checkbox, expandable detail rows (`_expanded`)
// and an optional sticky header. Selection is keyed by row index, as in
// KuiReact (prefer BulkActionTable for id-keyed selection).
//
// RN adaptations: the sticky header is a header row above a `max-h-80`
// vertical scroller; columns share the width like <Table />.

import type * as React from "react";
import { useState } from "react";
import { Pressable, ScrollView, View, type ViewStyle } from "react-native";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "../Text";
import { SelectBox } from "./parts/SelectBox";
import type { Column } from "./types";

/** Legacy advanced-table row shape — `_expanded` holds an optional detail row. */
export type AdvancedDataTableRow<T> = T & { _expanded?: React.ReactNode };

export type AdvancedDataTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  rows: AdvancedDataTableRow<T>[];
  caption?: string;
  selectable?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  /** Receives the selected row indices. */
  onSelectionChange?: (selected: number[]) => void;
  className?: string;
};

const MIN_COL_WIDTH = 120;
const CONTROL_COL = 40; // KuiReact: w-10
const STICKY_MAX_HEIGHT = 320; // KuiReact: max-h-80
const alignText = { left: "text-left", center: "text-center", right: "text-right" } as const;

const colStyle = <T,>(col: Column<T>): ViewStyle => (col.width ? { width: col.width } : { flex: 1, minWidth: MIN_COL_WIDTH });

export function AdvancedDataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  selectable = false,
  stickyHeader = false,
  emptyMessage = "No results found.",
  onSelectionChange,
  className,
}: AdvancedDataTableProps<T>) {
  const t = useThemeTokens();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggleRow(i: number) {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setSelected(next);
    onSelectionChange?.([...next]);
  }
  function toggleAll() {
    const next = selected.size === rows.length ? new Set<number>() : new Set(rows.map((_, i) => i));
    setSelected(next);
    onSelectionChange?.([...next]);
  }
  function toggleExpand(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && selected.size < rows.length;
  const hasAnyExpand = rows.some((r) => r._expanded !== undefined);
  const minWidth = columns.reduce((s, c) => s + (c.width ?? MIN_COL_WIDTH), 0) + (selectable ? CONTROL_COL : 0) + (hasAnyExpand ? CONTROL_COL : 0);

  const header = (
    <View className="flex-row border-b border-border bg-surface-sunken">
      {selectable ? (
        <View className="justify-center px-3 py-3" style={{ width: CONTROL_COL }}>
          <SelectBox checked={allSelected} mixed={someSelected} label="Select all rows" onPress={toggleAll} />
        </View>
      ) : null}
      {hasAnyExpand ? <View style={{ width: CONTROL_COL }} accessibilityLabel="Expand" /> : null}
      {columns.map((col) => (
        <View key={String(col.key)} className="px-4 py-3" style={colStyle(col)}>
          {typeof col.header === "string" ? (
            <Text className={cn("text-xs font-semibold uppercase tracking-wider text-text-secondary", alignText[col.align ?? "left"])}>{col.header}</Text>
          ) : (
            col.header
          )}
        </View>
      ))}
    </View>
  );

  const body =
    rows.length === 0 ? (
      <Text className="px-4 py-10 text-center text-sm text-text-secondary">{emptyMessage}</Text>
    ) : (
      rows.map((row, i) => {
        const isSelected = selected.has(i);
        const isExpanded = expanded.has(i);
        const hasExpand = row._expanded !== undefined;
        return (
          <View key={i} className={cn(i > 0 && "border-t border-border")}>
            <View testID="advanced-row" className={cn("flex-row", isSelected && "bg-primary-subtle")}>
              {selectable ? (
                <View className="justify-center px-3 py-3" style={{ width: CONTROL_COL }}>
                  <SelectBox checked={isSelected} label={`Select row ${i + 1}`} onPress={() => toggleRow(i)} />
                </View>
              ) : null}
              {hasExpand ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={isExpanded ? "Collapse row" : "Expand row"}
                  accessibilityState={{ expanded: isExpanded }}
                  onPress={() => toggleExpand(i)}
                  className="items-center justify-center py-3"
                  style={{ width: CONTROL_COL }}
                >
                  <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} size={10} color={t["text-disabled"]} />
                </Pressable>
              ) : hasAnyExpand ? (
                <View style={{ width: CONTROL_COL }} />
              ) : null}
              {columns.map((col) => {
                const node = col.render ? col.render(row) : String(row[col.key as keyof T] ?? "");
                return (
                  <View key={String(col.key)} className={cn("justify-center px-4 py-3", col.tdClass)} style={colStyle(col)}>
                    {typeof node === "string" || typeof node === "number" ? <Text className={cn("text-sm text-text-primary", alignText[col.align ?? "left"])}>{node}</Text> : node}
                  </View>
                );
              })}
            </View>
            {hasExpand && isExpanded ? <View className="bg-surface-sunken px-6 py-3">{typeof row._expanded === "string" ? <Text className="text-sm text-text-secondary">{row._expanded}</Text> : row._expanded}</View> : null}
          </View>
        );
      })
    );

  return (
    <View className={cn("gap-2", className)}>
      {selectable && selected.size > 0 ? (
        <Text className="text-xs text-text-secondary">
          {selected.size} of {rows.length} row{rows.length !== 1 ? "s" : ""} selected
        </Text>
      ) : null}
      <View role="region" aria-label={caption ?? "Data table"} className="w-full overflow-hidden rounded-lg border border-border">
        <ScrollView horizontal nestedScrollEnabled contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexGrow: 1, minWidth }}>
            {header}
            {stickyHeader ? (
              <ScrollView testID="advanced-sticky-body" nestedScrollEnabled style={{ maxHeight: STICKY_MAX_HEIGHT }} className="bg-surface-base">
                {body}
              </ScrollView>
            ) : (
              <View className="bg-surface-base">{body}</View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
