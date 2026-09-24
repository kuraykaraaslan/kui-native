// AdvancedDataTable — KuiReact's deprecated legacy view (Table/DataTable.tsx
// `LegacyAdvancedView`, re-exported as `AdvancedDataTable`): row selection
// with an indeterminate header checkbox, expandable detail rows (`_expanded`)
// and an optional sticky header. Selection is keyed by row index, as in
// KuiReact (prefer BulkActionTable for id-keyed selection).
//
// RN adaptations: the sticky header is a header row above a vertical
// scroller, the pair capped at `max-h-80` like KuiReact's wrapper; columns
// share the width like <Table />.

import type * as React from "react";
import { useState } from "react";
import { Pressable, ScrollView, View, type ViewStyle } from "react-native";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../libs/theme";
import { cn } from "../../../libs/utils/cn";

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
// KuiReact's `w-10 px-4` control cells grow to their content in the web
// table's auto layout: the checkbox cell is 16 + 16px box + 3px checkbox
// margin + 16, the chevron cell 16 + a 15px (1.25em) icon box + 16.
const SELECT_COL = 51;
const EXPAND_COL = 47;
// A row holding the inline 16px checkbox (with its 3px margins) gets a 21px
// line box, so selectable rows are 12 + 21 + 12 tall.
const SELECT_ROW_MIN_HEIGHT = 45;
const STICKY_MAX_HEIGHT = 320; // KuiReact: max-h-80 on the bordered wrapper
const HEADER_HEIGHT = 41; // py-3 + text-xs line (16) + border-b
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
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT);

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
  const minWidth = columns.reduce((s, c) => s + (c.width ?? MIN_COL_WIDTH), 0) + (selectable ? SELECT_COL : 0) + (hasAnyExpand ? EXPAND_COL : 0);
  const selectCell = { width: SELECT_COL, minHeight: SELECT_ROW_MIN_HEIGHT };

  const header = (
    <View className="flex-row border-b border-border bg-surface-sunken" onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
      {selectable ? (
        <View className="px-4 pt-3" style={selectCell}>
          <SelectBox checked={allSelected} mixed={someSelected} label="Select all rows" onPress={toggleAll} />
        </View>
      ) : null}
      {hasAnyExpand ? <View style={{ width: EXPAND_COL }} accessibilityLabel="Expand" /> : null}
      {columns.map((col) => (
        <View key={String(col.key)} className="justify-center px-4 py-3" style={colStyle(col)}>
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
                <View className="px-4 pt-3" style={selectCell}>
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
                  style={{ width: EXPAND_COL }}
                >
                  {/* FontAwesome web icons render in a 1.25em × 1em box. */}
                  <View className="h-3 w-[15px] items-center justify-center">
                    <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} size={12} color={t["text-disabled"]} />
                  </View>
                </Pressable>
              ) : hasAnyExpand ? (
                <View style={{ width: EXPAND_COL }} />
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
              <ScrollView testID="advanced-sticky-body" nestedScrollEnabled style={{ maxHeight: STICKY_MAX_HEIGHT - 2 - headerHeight }} className="bg-surface-base">
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
