import { useMemo, type ReactNode } from "react";
import { Pressable, View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";
import { Table } from "./Table/Table";
import { SelectBox } from "./Table/parts/SelectBox";
import type { Column } from "./Table/types";

export type BulkAction<Id> = {
  /** Stable key, used for React and for telemetry. */
  key: string;
  label: string;
  icon?: ReactNode;
  /** Rendered in a way that reads as destructive. */
  destructive?: boolean;
  onAction: (ids: Id[]) => void;
  /** Disable for the current selection, with a reason (announced as the hint). */
  disabled?: (ids: Id[]) => string | false;
};

const DEFAULT_LABELS = {
  selectRow: "Select row",
  selectAllOnPage: "Select all rows on this page",
  selectedCount: (n: number) => `${n} selected`,
  selectAllMatching: (n: number) => `Select all ${n} matching`,
  clear: "Clear selection",
};

export type BulkActionTableProps<T extends Record<string, unknown>, Id extends string | number> = {
  columns: Column<T>[];
  rows: T[];
  /** Stable identity for a row. Never the array index. */
  rowId: (row: T) => Id;
  selected: readonly Id[];
  onSelectedChange: (ids: Id[]) => void;
  actions?: BulkAction<Id>[];
  /** Total rows matching the current filter; turns on "select all N matching". */
  totalMatching?: number;
  onSelectAllMatching?: () => void;
  /** Rows that cannot be selected, with the reason announced on the checkbox. */
  isRowSelectable?: (row: T) => string | true;
  caption?: string;
  emptyMessage?: string;
  className?: string;
  labels?: Partial<typeof DEFAULT_LABELS>;
};

/**
 * Pixel-for-pixel with KuiReact's BulkActionTable: a <Table /> with an
 * id-keyed selection column and, once something is selected, a
 * `rounded-lg border bg-surface-overlay px-3 py-2` bar showing the count,
 * an explicit "Select all N matching" offer when more rows match than are
 * shown, the actions (destructive ones in `bg-error`) and "Clear
 * selection". The header checkbox only (de)selects the visible rows, so a
 * selection made on another page survives. Disabled reasons (KuiReact's
 * `title` tooltips) are announced as accessibility hints.
 */
export function BulkActionTable<T extends Record<string, unknown>, Id extends string | number>({
  columns,
  rows,
  rowId,
  selected,
  onSelectedChange,
  actions = [],
  totalMatching,
  onSelectAllMatching,
  isRowSelectable,
  caption,
  emptyMessage,
  className,
  labels: labelOverrides,
}: BulkActionTableProps<T, Id>) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  const selectedSet = useMemo(() => new Set<Id>(selected), [selected]);
  const selectableRows = useMemo(() => rows.filter((row) => (isRowSelectable ? isRowSelectable(row) === true : true)), [rows, isRowSelectable]);

  const visibleSelectedCount = selectableRows.filter((r) => selectedSet.has(rowId(r))).length;
  const allVisibleSelected = selectableRows.length > 0 && visibleSelectedCount === selectableRows.length;
  const someVisibleSelected = visibleSelectedCount > 0 && !allVisibleSelected;

  function toggleRow(id: Id) {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectedChange([...next]);
  }

  function toggleAllVisible() {
    const next = new Set(selectedSet);
    // Deselect only what is visible: a selection made on another page must survive.
    if (allVisibleSelected) for (const row of selectableRows) next.delete(rowId(row));
    else for (const row of selectableRows) next.add(rowId(row));
    onSelectedChange([...next]);
  }

  const selectionColumn: Column<T> = {
    key: "__selection",
    // KuiReact's inline 16px checkbox (3px margins) sits at the top of a
    // 20px line box in the text-xs header and a 21px one in text-sm rows.
    header: (
      <View className="h-5">
        <SelectBox checked={allVisibleSelected} mixed={someVisibleSelected} disabled={selectableRows.length === 0} label={labels.selectAllOnPage} onPress={toggleAllVisible} />
      </View>
    ),
    width: 48,
    render: (row) => {
      const id = rowId(row);
      const selectable = isRowSelectable ? isRowSelectable(row) : true;
      const reason = selectable === true ? undefined : selectable;
      return (
        <View className="h-[21px]">
          <SelectBox checked={selectedSet.has(id)} disabled={reason !== undefined} hint={reason} label={`${labels.selectRow} ${String(id)}`} onPress={() => toggleRow(id)} />
        </View>
      );
    },
  };

  const hasMoreMatching = typeof totalMatching === "number" && totalMatching > rows.length && onSelectAllMatching;

  return (
    <View className={cn("flex-col gap-3", className)}>
      {selected.length > 0 ? (
        <View role="region" aria-label="Bulk actions" className="flex-row flex-wrap items-center gap-3 rounded-lg border border-border bg-surface-overlay px-3 py-2">
          <Text className="text-sm font-medium text-text-primary">{labels.selectedCount(selected.length)}</Text>
          {hasMoreMatching ? (
            <Pressable accessibilityRole="button" onPress={onSelectAllMatching}>
              {({ pressed }) => <Text className={cn("text-sm text-primary", pressed && "underline")}>{labels.selectAllMatching(totalMatching)}</Text>}
            </Pressable>
          ) : null}
          <View className="ml-auto flex-row flex-wrap items-center gap-2">
            {actions.map((action) => {
              const disabledReason = action.disabled?.([...selected]);
              return (
                <Pressable
                  key={action.key}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                  accessibilityHint={disabledReason || undefined}
                  accessibilityState={{ disabled: Boolean(disabledReason) }}
                  disabled={Boolean(disabledReason)}
                  onPress={() => action.onAction([...selected])}
                  className={cn(
                    "flex-row items-center gap-2 rounded-md px-3 py-1.5",
                    action.destructive ? "bg-error active:opacity-90" : "bg-primary active:bg-primary-hover",
                    disabledReason && "opacity-50",
                  )}
                >
                  {action.icon}
                  <Text className={cn("text-sm", action.destructive ? "text-white" : "text-primary-fg")}>{action.label}</Text>
                </Pressable>
              );
            })}
            <Pressable accessibilityRole="button" onPress={() => onSelectedChange([])}>
              {({ pressed }) => <Text className={cn("text-sm", pressed ? "text-text-primary" : "text-text-secondary")}>{labels.clear}</Text>}
            </Pressable>
          </View>
        </View>
      ) : null}
      <Table<T> columns={[selectionColumn, ...columns]} rows={rows} caption={caption} emptyMessage={emptyMessage} />
    </View>
  );
}
