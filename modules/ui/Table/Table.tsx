import { useState } from "react";
import { Pressable, ScrollView, View, type ViewStyle } from "react-native";
import { faChevronDown, faChevronUp, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "../Text";
import type { Column, SortDirection } from "./types";

const MIN_COL_WIDTH = 120;

const alignText = { left: "text-left", center: "text-center", right: "text-right" } as const;
const cellAlign = { left: "items-start", center: "items-center", right: "items-end" } as const;
const alignItems = { left: "justify-start", center: "justify-center", right: "justify-end" } as const;

export type TableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  rows: T[];
  caption?: string;
  emptyMessage?: string;
  defaultSortKey?: string;
  defaultSortDir?: SortDirection;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Table primitive (modules/ui/Table/Table.tsx):
 * a `rounded-lg border border-border` table with a `bg-surface-sunken`
 * header row (`px-4 py-3 text-xs font-semibold uppercase tracking-wider`),
 * `px-4 py-3 text-sm` body cells divided by borders, custom cell `render`,
 * an empty-state row and the asc → desc → unsorted cycle on sortable
 * columns. RN has no auto-sized table layout, so columns share the width
 * equally (min 120px, or a column's `width`) and the table scrolls
 * horizontally when they don't fit.
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  emptyMessage = "No results found.",
  defaultSortKey,
  defaultSortDir,
  className,
}: TableProps<T>) {
  const t = useThemeTokens();
  const [sortKey, setSortKey] = useState<string>(defaultSortKey ?? "");
  const [sortDir, setSortDir] = useState<SortDirection | null>(defaultSortDir ?? null);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") {
      setSortDir("desc");
      return;
    }
    setSortDir(null);
    setSortKey("");
  }

  const sorted =
    sortKey && sortDir
      ? [...rows].sort((a, b) => {
          const cmp = String(a[sortKey as keyof T] ?? "").localeCompare(String(b[sortKey as keyof T] ?? ""), undefined, { numeric: true });
          return sortDir === "asc" ? cmp : -cmp;
        })
      : rows;

  const cellStyle = (col: Column<T>): ViewStyle => (col.width ? { width: col.width } : { flex: 1, minWidth: MIN_COL_WIDTH });
  const minWidth = columns.reduce((sum, c) => sum + (c.width ?? MIN_COL_WIDTH), 0);

  return (
    <View role="region" aria-label={caption ?? "Table"} className={cn("w-full overflow-hidden rounded-lg border border-border", className)}>
      <ScrollView horizontal nestedScrollEnabled contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexGrow: 1, minWidth }}>
          <View role="row" className="flex-row border-b border-border bg-surface-sunken">
            {columns.map((col) => {
              const key = String(col.key);
              const dir = sortKey === key ? sortDir : null;
              const align = col.align ?? "left";
              const label = (
                <View className={cn("flex-row items-center gap-1", alignItems[align])}>
                  {typeof col.header === "string" ? (
                    <Text className={cn("text-xs font-semibold uppercase tracking-wider text-text-secondary", alignText[align])}>{col.header}</Text>
                  ) : (
                    col.header
                  )}
                  {col.sortable ? (
                    // KuiReact's `w-2.5 h-2.5` loses to FontAwesome's own CSS, so the
                    // web icon renders in a 1.25em × 1em box (15 × 12 at text-xs).
                    <View className="h-3 w-[15px] items-center justify-center">
                      <FontAwesomeIcon icon={dir === "asc" ? faChevronUp : dir === "desc" ? faChevronDown : faSort} size={12} color={t["text-secondary"]} />
                    </View>
                  ) : null}
                </View>
              );
              return col.sortable ? (
                <Pressable
                  key={key}
                  accessibilityRole="button"
                  accessibilityLabel={typeof col.header === "string" ? col.header : key}
                  accessibilityValue={{ text: dir === "asc" ? "sorted ascending" : dir === "desc" ? "sorted descending" : "not sorted" }}
                  onPress={() => handleSort(key)}
                  className={cn("justify-center px-4 py-3 active:bg-surface-overlay", col.thClass)}
                  style={cellStyle(col)}
                >
                  {label}
                </Pressable>
              ) : (
                <View key={key} role="columnheader" className={cn("justify-center px-4 py-3", col.thClass)} style={cellStyle(col)}>
                  {label}
                </View>
              );
            })}
          </View>

          <View className="bg-surface-base">
            {sorted.length === 0 ? (
              <Text className="px-4 py-8 text-center text-sm text-text-secondary">{emptyMessage}</Text>
            ) : (
              sorted.map((row, i) => (
                <View key={i} role="row" testID="table-row" className={cn("flex-row", i > 0 && "border-t border-border")}>
                  {columns.map((col) => {
                    const align = col.align ?? "left";
                    return (
                      <View key={String(col.key)} role="cell" className={cn("justify-center px-4 py-3", cellAlign[align], col.tdClass)} style={cellStyle(col)}>
                        {col.render ? (
                          (() => {
                            const node = col.render(row);
                            return typeof node === "string" || typeof node === "number" ? (
                              <Text className={cn("text-sm text-text-primary", alignText[align])}>{node}</Text>
                            ) : (
                              node
                            );
                          })()
                        ) : (
                          <Text className={cn("text-sm text-text-primary", alignText[align])}>{String(row[col.key as keyof T] ?? "")}</Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
