# Feature matrix — DataTable

> KuiReact `modules/ui/Table/DataTable.tsx` (808 LOC, including the deprecated `LegacyAdvancedView` / `LegacyServerView` branches, + `core/useTable`, `core/useServerTable`, `parts/` HeaderCell, BodyRow, Toolbar, FilterPopover, EmptyState; 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/Table/DataTable.tsx` (added 2026-09-22 in `da93014`, 368 LOC + `core/useTable` and `core/useServerTable` ported unchanged + `parts/FilterPopover` on `Overlays/shared/AnchoredPanel`; 10 tests, 3 demos). The legacy advanced branch is its own component in KuiNative ([advanced-data-table.md](advanced-data-table.md)).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `columns`, `rows`, `mode` (`static` / `paginated` (default) / `server`), `fetchPage`, `caption`, `searchable` (true), `searchPlaceholder`, `pageSize` (10), `pageSizeOptions` ([5, 10, 25, 50]), `emptyMessage`, `loadingMessage`, `errorMessage`, `state`, `messages`, `initialSort`, `className`, `id` | ✓ | ✓ | Match |
| `onRowClick` | ✓ | `onRowPress` | Match (platform rename) |
| Deprecated legacy props (`legacyAdvancedRows`, `selectable`, `stickyHeader`, `onSelectionChange`, `serverControlled`) that route to KuiReact's `AdvancedDataTable` / `ServerDataTable` shims | ✓ (@deprecated) | not on `DataTable`; `AdvancedDataTable` is a separate component with the same props; the `ServerDataTable` shim is not ported (use `mode="server"`) | Deviation (deprecated entry points) |
| Hooks and helpers (`useTable`, `useServerTable`, `applySort`, `applySearch`, `applyColumnFilters`, `nextSortState`) and types (`DataTableMode`, `DataTableFetchArgs` / `Result`, `DataTableMessages`, `SortState`, `FilterState`, …) | ✓ | same code; hooks and main types exported from the ui barrel (`Table/` also exports the helpers and `DEFAULT_MESSAGES` as `DATA_TABLE_MESSAGES`) | Match |
| Sort | click cycles asc → desc → off; Shift+click adds a secondary sort; order badge (`h-4 min-w-[1rem] rounded-full bg-primary text-[10px]`) when several keys sort | tap cycles; long-press adds a secondary sort; same badge | Adapted (no Shift on touch) |
| Filters | per-column filter icon opening a text ("Contains…") or `select` option popover with Clear / Apply | same, in an anchored panel | Match (adapted) |
| Toolbar | search field (`flex-1 min-w-40`) + "Rows per page" `<select>` | `SearchBar` + "Rows per page" outline button opening a `DropdownMenu` | Adapted (RN has no `<select>`) |
| Frame, header, body | `overflow-x-auto rounded-lg border`, `bg-surface-sunken` header `px-4 py-3 text-xs font-semibold uppercase tracking-wider`, `divide-y` body, `px-4 py-3 text-sm` cells | same classes (`divide-y` → `border-t`); horizontal `ScrollView` | Match (adapted) |
| Column widths | auto table layout | equal flex columns, min 120px (or `width`), as `<Table />` | Adapted |
| States | loading row (`Spinner sm` + message), error row `bg-error-subtle text-error-fg`, empty row, `No results for "q"` while searching; server errors show the fetch error | same strings and classes; the error row is an `alert` | Match |
| Footer | "Showing a–b of n (filtered from m)" / "No results" + `Pagination` (not in `static` mode) | same | Match |
| Row hover | `hover:bg-surface-overlay` on clickable rows | pressed state | Adapted |
| Accessibility | `role="region"` labelled by the caption, sr-only `<caption>`, `aria-sort` on sortable headers | labelled region; sortable headers are buttons whose value reads "sorted ascending / descending / not sorted" with a long-press hint; clickable rows are buttons | Match (adapted) |
| Tests | 0 | 10 | Native-ahead |
| Showcase | Full example, Sortable columns, Server mode (mode="server") | same titles and data | Match |
