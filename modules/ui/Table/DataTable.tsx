// DataTable — ported from KuiReact's modules/ui/Table/DataTable.tsx: the
// unified rich table with `mode="static" | "paginated" | "server"`, global
// search, per-column filters, multi-column sort, page-size menu, pagination
// and loading / empty / error states. `useTable` / `useServerTable` are
// KuiReact's hooks unchanged.
//
// RN adaptations: Shift+click multi-sort is a long-press on a sortable
// header; the page-size `<select>` is a DropdownMenu; filter popovers are
// anchored panels. Columns share the width equally (min 120px or a
// column's `width`) and the table scrolls horizontally, as in <Table />.
// KuiReact's legacy AdvancedDataTable / ServerDataTable branches are a
// separate roadmap item.

import type * as React from "react";
import { Pressable, ScrollView, View, type ViewStyle } from "react-native";
import { faChevronDown, faChevronUp, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../libs/theme";
import { cn } from "../../../libs/utils/cn";

import { DropdownMenu } from "../DropdownMenu";
import { Pagination } from "../Pagination";
import { SearchBar } from "../SearchBar";
import { Spinner } from "../Spinner";
import { Text } from "../Text";
import { useServerTable } from "./core/useServerTable";
import { useTable } from "./core/useTable";
import { FilterPopover } from "./parts/FilterPopover";
import {
  DEFAULT_MESSAGES,
  type Column,
  type DataTableFetchArgs,
  type DataTableFetchResult,
  type DataTableMessages,
  type DataTableMode,
  type DataTableStateValue,
  type FilterState,
  type SortState,
} from "./types";

export type DataTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  /** Rows — required for `static` / `paginated`; ignored for `server` (use `fetchPage`). */
  rows?: T[];
  /** Defaults to `paginated`. */
  mode?: DataTableMode;
  /** Server-side fetcher, required when `mode="server"`. */
  fetchPage?: (args: DataTableFetchArgs) => Promise<DataTableFetchResult<T>>;
  caption?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  /** Manual override of the data state (loading / error skeletons). */
  state?: DataTableStateValue;
  /** KuiReact's `onRowClick`. */
  onRowPress?: (row: T) => void;
  messages?: Partial<DataTableMessages>;
  initialSort?: SortState[];
  className?: string;
  id?: string;
};

const MIN_COL_WIDTH = 120;
const alignText = { left: "text-left", center: "text-center", right: "text-right" } as const;
const alignJustify = { left: "justify-start", center: "justify-center", right: "justify-end" } as const;
const alignItems = { left: "items-start", center: "items-center", right: "items-end" } as const;

function cellStyle<T>(col: Column<T>): ViewStyle {
  return col.width ? { width: col.width } : { flex: 1, minWidth: MIN_COL_WIDTH };
}

type Controls = {
  sort: SortState[];
  filters: FilterState;
  toggleSort: (key: string, multi: boolean) => void;
  setColumnFilter: (key: string, value: string) => void;
};

function HeaderRow<T extends Record<string, unknown>>({ columns, ctl }: { columns: Column<T>[]; ctl: Controls }) {
  const t = useThemeTokens();
  return (
    <View className="flex-row border-b border-border bg-surface-sunken">
      {columns.map((col) => {
        const key = String(col.key);
        const entry = ctl.sort.find((s) => s.key === key);
        const dir = entry?.dir ?? null;
        const order = entry && ctl.sort.length > 1 ? ctl.sort.findIndex((s) => s.key === key) + 1 : null;
        const align = col.align ?? "left";
        const label = typeof col.header === "string" ? col.header : key;
        const content = (
          <View className={cn("flex-row items-center gap-1", alignJustify[align])}>
            {typeof col.header === "string" ? (
              <Text className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{col.header}</Text>
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
            {order !== null ? (
              <View testID={`sort-order-${key}`} className="ml-0.5 h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1">
                <Text className="text-[10px] font-bold text-primary-fg">{order}</Text>
              </View>
            ) : null}
            {col.filter ? <FilterPopover column={col} value={ctl.filters[key] ?? ""} onChange={(v) => ctl.setColumnFilter(key, v)} /> : null}
          </View>
        );
        return col.sortable ? (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityHint="Long-press to add as a secondary sort"
            accessibilityValue={{ text: dir === "asc" ? "sorted ascending" : dir === "desc" ? "sorted descending" : "not sorted" }}
            onPress={() => ctl.toggleSort(key, false)}
            onLongPress={() => ctl.toggleSort(key, true)}
            className={cn("justify-center px-4 py-3 active:bg-surface-overlay", col.thClass)}
            style={cellStyle(col)}
          >
            {content}
          </Pressable>
        ) : (
          <View key={key} role="columnheader" className={cn("justify-center px-4 py-3", col.thClass)} style={cellStyle(col)}>
            {content}
          </View>
        );
      })}
    </View>
  );
}

function BodyRows<T extends Record<string, unknown>>({ columns, rows, onRowPress }: { columns: Column<T>[]; rows: T[]; onRowPress?: (row: T) => void }) {
  return (
    <>
      {rows.map((row, i) => {
        const cells = columns.map((col) => {
          const align = col.align ?? "left";
          const node = col.render ? col.render(row) : String(row[col.key as keyof T] ?? "");
          return (
            <View key={String(col.key)} className={cn("justify-center px-4 py-3", alignItems[align], col.tdClass)} style={cellStyle(col)}>
              {typeof node === "string" || typeof node === "number" ? <Text className={cn("text-sm text-text-primary", alignText[align])}>{node}</Text> : node}
            </View>
          );
        });
        const rowClass = cn("flex-row", i > 0 && "border-t border-border");
        return onRowPress ? (
          <Pressable key={i} testID="datatable-row" accessibilityRole="button" onPress={() => onRowPress(row)} className={cn(rowClass, "active:bg-surface-overlay")}>
            {cells}
          </Pressable>
        ) : (
          <View key={i} testID="datatable-row" className={rowClass}>
            {cells}
          </View>
        );
      })}
    </>
  );
}

function StateRow({ state, message }: { state: "empty" | "loading" | "error"; message: string }) {
  if (state === "loading") {
    return (
      <View className="flex-row items-center justify-center gap-2 px-4 py-10">
        <Spinner size="sm" />
        <Text className="text-sm text-text-secondary">{message}</Text>
      </View>
    );
  }
  return (
    <Text accessibilityRole={state === "error" ? "alert" : undefined} className={cn("px-4 py-10 text-center text-sm", state === "error" ? "bg-error-subtle text-error-fg" : "text-text-secondary")}>
      {message}
    </Text>
  );
}

function Toolbar({
  id,
  searchable,
  search,
  placeholder,
  onSearch,
  pageSize,
  pageSizeOptions,
  onPageSize,
  rowsPerPageLabel,
}: {
  id: string;
  searchable: boolean;
  search: string;
  placeholder: string;
  onSearch: (v: string) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSize?: (n: number) => void;
  rowsPerPageLabel: string;
}) {
  const t = useThemeTokens();
  if (!searchable && !pageSizeOptions) return null;
  return (
    <View className="flex-row flex-wrap items-center gap-2">
      {searchable ? <SearchBar id={`${id}-search`} value={search} onChange={onSearch} placeholder={placeholder} className="min-w-40 flex-1" /> : null}
      {pageSizeOptions && onPageSize && pageSize !== undefined ? (
        <View className="shrink-0 flex-row items-center gap-2">
          <Text className="text-xs text-text-secondary">{rowsPerPageLabel}</Text>
          <DropdownMenu
            align="right"
            trigger={
              // KuiReact's native <select>: `rounded-md border px-2 py-1.5 text-sm`,
              // sized to its widest option plus the browser's chevron.
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${rowsPerPageLabel} ${pageSize}`}
                className="w-14 flex-row items-center rounded-md border border-border bg-surface-base py-1.5 pl-3 pr-0.5"
              >
                <Text className="flex-1 text-sm leading-5 text-text-primary">{String(pageSize)}</Text>
                <FontAwesomeIcon icon={faChevronDown} size={10} color={t["text-primary"]} />
              </Pressable>
            }
            items={pageSizeOptions.map((n) => ({ label: String(n), onPress: () => onPageSize(n) }))}
          />
        </View>
      ) : null}
    </View>
  );
}

function Frame<T extends Record<string, unknown>>({ caption, columns, children, ctl }: { caption?: string; columns: Column<T>[]; children: React.ReactNode; ctl: Controls }) {
  const minWidth = columns.reduce((sum, c) => sum + (c.width ?? MIN_COL_WIDTH), 0);
  return (
    <View role="region" aria-label={caption ?? "Data table"} className="w-full overflow-hidden rounded-lg border border-border">
      <ScrollView horizontal nestedScrollEnabled contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexGrow: 1, minWidth }}>
          <HeaderRow columns={columns} ctl={ctl} />
          <View className="bg-surface-base">{children}</View>
        </View>
      </ScrollView>
    </View>
  );
}

function Footer({ summary, page, totalPages, onPage }: { summary: string; page: number; totalPages: number; onPage: (p: number) => void }) {
  return (
    <View className="flex-row flex-wrap items-center justify-between gap-4">
      <Text className="text-xs text-text-secondary">{summary}</Text>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPage} />
    </View>
  );
}

function ClientView<T extends Record<string, unknown>>(props: DataTableProps<T> & { mode: DataTableMode; id: string }) {
  const {
    columns,
    rows = [],
    caption,
    searchable = true,
    searchPlaceholder,
    pageSize: defaultPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    emptyMessage,
    state,
    loadingMessage,
    errorMessage,
    onRowPress,
    messages,
    initialSort = [],
    className,
    mode,
    id,
  } = props;
  const msgs: DataTableMessages = { ...DEFAULT_MESSAGES, ...messages };
  const isStatic = mode === "static";
  const table = useTable<T>({ rows, columns, initialSort, initialPageSize: isStatic ? Math.max(rows.length, defaultPageSize) : defaultPageSize });

  const total = table.total;
  const pageRows = isStatic ? table.rows : table.rows.slice((table.page - 1) * table.pageSize, table.page * table.pageSize);
  const start = total === 0 ? 0 : (table.page - 1) * table.pageSize + 1;
  const end = Math.min(table.page * table.pageSize, total);
  const resolved: DataTableStateValue = state ?? (pageRows.length === 0 ? "empty" : "ready");
  const message =
    resolved === "loading"
      ? loadingMessage ?? msgs.loading
      : resolved === "error"
        ? errorMessage ?? msgs.error
        : table.search && total === 0
          ? `No results for "${table.search}"`
          : emptyMessage ?? msgs.empty;

  return (
    <View className={cn("gap-3", className)}>
      {searchable ? (
        <Toolbar
          id={id}
          searchable={searchable}
          search={table.search}
          placeholder={searchPlaceholder ?? msgs.searchPlaceholder}
          onSearch={table.setGlobalSearch}
          pageSize={isStatic ? undefined : table.pageSize}
          pageSizeOptions={isStatic ? undefined : pageSizeOptions}
          onPageSize={isStatic ? undefined : table.changePageSize}
          rowsPerPageLabel={msgs.rowsPerPage}
        />
      ) : null}
      <Frame caption={caption} columns={columns} ctl={table}>
        {resolved !== "ready" ? <StateRow state={resolved} message={message} /> : <BodyRows columns={columns} rows={pageRows} onRowPress={onRowPress} />}
      </Frame>
      {!isStatic ? (
        <Footer
          summary={total === 0 ? "No results" : `Showing ${start}–${end} of ${total}${table.search ? ` (filtered from ${rows.length})` : ""}`}
          page={table.page}
          totalPages={table.totalPages}
          onPage={table.setPage}
        />
      ) : null}
    </View>
  );
}

function ServerView<T extends Record<string, unknown>>(props: DataTableProps<T> & { id: string }) {
  const {
    columns,
    fetchPage,
    caption,
    searchable = true,
    searchPlaceholder,
    pageSize: defaultPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    emptyMessage,
    state: stateOverride,
    loadingMessage,
    errorMessage,
    onRowPress,
    messages,
    initialSort = [],
    className,
    id,
  } = props;
  const msgs: DataTableMessages = { ...DEFAULT_MESSAGES, ...messages };
  if (!fetchPage) throw new Error('DataTable mode="server" requires a `fetchPage` prop.');
  const table = useServerTable<T>({ fetchPage, initialPageSize: defaultPageSize, initialSort });

  const resolved: DataTableStateValue = stateOverride ?? (table.loading ? "loading" : table.error ? "error" : table.rows.length === 0 ? "empty" : "ready");
  const start = table.total === 0 ? 0 : (table.page - 1) * table.pageSize + 1;
  const end = Math.min(table.page * table.pageSize, table.total);
  const message = resolved === "loading" ? loadingMessage ?? msgs.loading : resolved === "error" ? errorMessage ?? table.error ?? msgs.error : emptyMessage ?? msgs.empty;

  return (
    <View className={cn("gap-3", className)}>
      <Toolbar
        id={id}
        searchable={searchable}
        search={table.search}
        placeholder={searchPlaceholder ?? msgs.searchPlaceholder}
        onSearch={table.setGlobalSearch}
        pageSize={table.pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSize={table.changePageSize}
        rowsPerPageLabel={msgs.rowsPerPage}
      />
      <Frame caption={caption} columns={columns} ctl={table}>
        {resolved !== "ready" ? <StateRow state={resolved} message={message} /> : <BodyRows columns={columns} rows={table.rows} onRowPress={onRowPress} />}
      </Frame>
      <Footer summary={table.total === 0 ? "No results" : `Showing ${start}–${end} of ${table.total}`} page={table.page} totalPages={table.totalPages} onPage={table.setPage} />
    </View>
  );
}

export function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>) {
  const id = props.id ?? "dt";
  const mode: DataTableMode = props.mode ?? "paginated";
  if (mode === "server") return <ServerView<T> {...props} id={id} />;
  return <ClientView<T> {...props} mode={mode} id={id} />;
}
