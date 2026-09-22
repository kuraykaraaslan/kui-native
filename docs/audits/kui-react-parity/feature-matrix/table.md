# Feature matrix — Table

> KuiReact `modules/ui/Table/Table.tsx` (158 LOC + `core/columnHelpers`, `types.ts`; 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/Table/` (added 2026-09-22 in `b83d87f`: `Table.tsx`, `types.ts` ported whole, `index.tsx`; 6 tests, 3 demos). Only the `<Table />` primitive is ported; `DataTable`, `ServerDataTable` and the paginated / server modes are still on the backlog ([data-table.md](../component-backlog/data-table.md)).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `columns`, `rows`, `caption`, `emptyMessage` (default "No results found."), `defaultSortKey`, `defaultSortDir`, `className` | ✓ | ✓ | Match |
| Column: `key`, `header` (ReactNode), `render`, `align`, `sortable`, `thClass`, `tdClass` | ✓ | ✓ | Match |
| Column `width` | — | fixed width in px | Native-ahead |
| Types (`Column`, `TableColumn`, `SortDirection`, `SortState`, filter / pagination / DataTable types) | ✓ | ✓, same file | Match |
| Sort | asc → desc → unsorted cycle, `localeCompare` with `numeric: true` | same | Match |
| Frame | `overflow-x-auto rounded-lg border border-border`, `role="region"` labelled by the caption | same frame; horizontal `ScrollView` | Match (adapted) |
| Header | `bg-surface-sunken border-b`, `px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary`, sort icon (sort / chevron up / down) | same | Match |
| Body | `divide-y divide-border bg-surface-base`, `px-4 py-3 text-sm text-text-primary`, empty row `py-8 text-center` | same (`divide-y` → `border-t`) | Match |
| Column widths | auto table layout | equal flex columns, min 120px (or `width`); scrolls sideways when they don't fit | Adapted (RN has no table layout) |
| Row hover | `hover:bg-surface-overlay` | — | N/A (no hover on touch) |
| Accessibility | `<caption class="sr-only">`, `scope="col"`, `aria-sort` | region label from the caption, `row` / `columnheader` / `cell` roles, sortable headers are buttons whose value reads "sorted ascending / descending / not sorted" | Match (adapted) |
| Tests | 0 | 6 | Native-ahead |
| Showcase | With data, Empty state, Sortable columns | same titles and data | Match |
