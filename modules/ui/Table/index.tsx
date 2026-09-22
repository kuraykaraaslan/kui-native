// Table family — public entry point (KuiReact: modules/ui/Table/index.tsx).
// Exposes the <Table /> primitive and the unified <DataTable /> (static /
// paginated / server modes) plus its core hooks. Also exposes the
// legacy AdvancedDataTable view (KuiReact's deprecated wrapper).

export { Table } from "./Table";
export type { TableProps } from "./Table";
export { DataTable } from "./DataTable";
export { AdvancedDataTable } from "./AdvancedDataTable";
export type { AdvancedDataTableProps, AdvancedDataTableRow } from "./AdvancedDataTable";
export type { DataTableProps } from "./DataTable";
export { useTable, applySort, applySearch, applyColumnFilters, nextSortState } from "./core/useTable";
export type { UseTableArgs, UseTableReturn } from "./core/useTable";
export { useServerTable } from "./core/useServerTable";
export type { UseServerTableArgs, UseServerTableReturn } from "./core/useServerTable";
export { DEFAULT_MESSAGES as DATA_TABLE_MESSAGES } from "./types";
export type {
  Column,
  TableColumn,
  SortDirection,
  SortState,
  FilterState,
  PaginationState,
  ColumnFilterConfig,
  DataTableMode,
  DataTableStateValue,
  DataTableFetchArgs,
  DataTableFetchResult,
  DataTableMessages,
} from "./types";
