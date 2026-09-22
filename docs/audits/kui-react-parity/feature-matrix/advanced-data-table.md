# Feature matrix — AdvancedDataTable

> KuiReact `modules/ui/Table/index.tsx` (`AdvancedDataTable`, a deprecated wrapper over `DataTable`'s `LegacyAdvancedView`; the registry counts the Table family, 12 files, 1999 LOC; 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Table/AdvancedDataTable.tsx` (added 2026-09-22 in `172a657`, 173 LOC + `Table/parts/SelectBox`; 4 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `columns`, `rows` (with `_expanded`), `caption`, `selectable`, `stickyHeader`, `emptyMessage` (default "No results found."), `onSelectionChange(indices)`, `className` | ✓ | ✓ | Match |
| `AdvancedDataTableRow` type | ✓ (from `DataTable.tsx`) | ✓ (+ `AdvancedDataTableProps`) | Match |
| Implementation | wrapper passing `legacyAdvancedRows` to `DataTable` | standalone component with the same render path | Adapted (same output) |
| Selection | index-keyed, indeterminate "Select all rows" header checkbox, "{n} of {m} row(s) selected" caption, selected rows `bg-primary-subtle` | same (drawn `SelectBox`) | Match |
| Expandable rows | `w-10` chevron column ("Expand row" / "Collapse row", `aria-expanded`), empty cell on rows without detail, detail row `bg-surface-sunken px-6 py-3 text-sm text-text-secondary` | same | Match |
| Sticky header | `overflow-auto max-h-80` scroller with a `sticky top-0` header | header row above a 320px (`max-h-80`) vertical scroller | Adapted (RN has no sticky table header) |
| Frame, cells, column widths | table classes as `<Table />`, auto layout | same classes, equal flex columns (min 120px), horizontal scroll | Adapted |
| Row hover | `hover:bg-surface-overlay` | — | N/A (no hover on touch) |
| Tests | 0 | 4 | Native-ahead |
| Showcase | Selectable + Expandable, Sticky Header | same titles and data | Match |
