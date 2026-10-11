# Feature matrix — TreeView

> KuiReact `modules/ui/TreeView/` (6 files, 849 LOC: `index.tsx`, `types.ts`, `hooks/useTreeState` + `useKeyboardNav`, `parts/Node` + `DropIndicator`; 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/TreeView/` (added 2026-09-22 in `9aafffe`: `index.tsx`, `types.ts`, `hooks/useTreeState` ported unchanged, `parts/Node`; 7 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `nodes`, `selectedId`, `selectedIds`, `expandedIds`, `defaultExpandedIds`, `focusId`, `selectionMode` (default `single`), `onSelect`, `onSelectionChange`, `onExpand`, `onActivate`, `label`, `className`, `hideToolbar`, `messages` | ✓ | ✓ | Match |
| Types (`NodeId`, `TreeNode`, `SelectionMode`, `TreeViewMessages`, `TreeViewProps`) and tree state (`useTreeState`: controlled / uncontrolled expansion, all expanded by default, selection) | ✓ | same files, ported unchanged; types exported from the barrel | Match |
| Toolbar | "Expand all" / "Collapse all" ghost buttons (`px-2 py-1 rounded-md text-xs text-text-secondary`, double-angle icons), shown only when some row has children | same | Match |
| Row | `px-2 py-1.5 text-sm rounded-md`, indent `depth × 1.25rem`, chevron right / down (`text-text-disabled`), leaf spacer, selected `bg-primary-subtle text-primary font-medium` | same (indent 20px per level) | Match |
| Chevron | toggles expansion only, never selects | same | Match |
| Plain click | parent toggles and selects, leaf selects | same in single mode; also fires `onActivate` (KuiReact fires it on Enter) | Adapted (tap stands in for Enter) |
| Multi-select | Ctrl / Cmd+click toggles a row, Shift+click selects the range from the anchor | tap toggles a row (a parent also expands), long-press selects the range from the anchor | Adapted (no modifier keys on touch) |
| Keyboard navigation (`useKeyboardNav`: arrows, Home / End, `*`, type-ahead, roving tabindex) | ✓ | — | N/A (hardware-keyboard pattern) |
| Drag-and-drop (`DropIndicator`, M2), lazy load / virtualize (M3) | stubs / TODO | not ported | Match (inactive in both) |
| Hover | `hover:bg-surface-overlay` | pressed `active:bg-surface-overlay` | Adapted |
| Accessibility | `role="tree"` (`aria-multiselectable` in multi mode), `treeitem` with `aria-expanded` / `aria-selected` / `aria-level` / `aria-posinset` / `aria-setsize` | labelled `list`; rows are buttons with selected / expanded state and a "Level n, i of m" hint | Match (adapted: RN has no tree role) |
| Tests | 0 | 7 | Native-ahead |
| Showcase | File tree, Navigation menu, Flat list, Multi-select + type-ahead | same titles and data | Match |
