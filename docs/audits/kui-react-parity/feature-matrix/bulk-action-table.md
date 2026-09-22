# Feature matrix — BulkActionTable

> KuiReact `modules/ui/BulkActionTable.tsx` (236 LOC, on `<Table />`; 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/BulkActionTable.tsx` (added 2026-09-22 in `10af451`, 156 LOC on `<Table />` + `Table/parts/SelectBox`; 6 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `columns`, `rows`, `rowId`, `selected`, `onSelectedChange`, `actions`, `totalMatching`, `onSelectAllMatching`, `isRowSelectable`, `caption`, `emptyMessage`, `className`, `labels` | ✓ | ✓ | Match |
| `BulkAction` (`key`, `label`, `icon`, `destructive`, `onAction(ids)`, `disabled(ids) → reason`) | ✓ | ✓ | Match |
| Selection model | id-keyed (never the row index); the header checkbox (de)selects only the visible selectable rows, so a selection made on another page survives | same | Match |
| Checkboxes | native `h-4 w-4` checkboxes (`accent-[var(--primary)]`), indeterminate header via the DOM property, `w-10` column | drawn `SelectBox` with checked / mixed / disabled state, 48px column | Match (adapted) |
| Unselectable rows | disabled checkbox with the reason as `title` | disabled `SelectBox` with the reason as the accessibility hint | Adapted (no tooltips on touch) |
| Bulk bar | `rounded-lg border bg-surface-overlay px-3 py-2`: "{n} selected", "Select all {n} matching" link, actions (`bg-primary`, destructive `bg-error text-white`), "Clear selection" | same; link underline on press instead of hover | Match (adapted) |
| Disabled actions | `disabled` with the reason as `title` | disabled with the reason as the accessibility hint | Adapted |
| Accessibility | `role="region"` "Bulk actions", labelled checkboxes ("Select row {id}", "Select all rows on this page") | same labels; checkbox role with checked / mixed / disabled state | Match |
| Tests | 0 | 6 | Native-ahead |
| Showcase | Selection and actions, Unselectable rows, and select-all-matching | same titles and data | Match |
