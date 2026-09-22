# Feature matrix — Pagination

> KuiReact `modules/ui/Pagination.tsx` (168 LOC, 9 tests, 3 showcase variants) ↔ KuiNative `modules/ui/Pagination.tsx` (added 2026-09-22 in `729f8ad`, 10 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `page`, `totalPages`, `onPageChange`, `size` (default md), `showFirstLast`, `showJumpTo`, `className` | ✓ | ✓ | Match |
| Page window | first, last, current ±1, ellipses between gaps | same algorithm | Match |
| Sizes | sm `w-7 h-7` / `px-2 py-1 text-xs` · md `w-9 h-9` / `px-3 py-1.5 text-sm` · lg `w-10 h-10` / `px-4 py-2 text-base` | same | Match |
| Buttons | `rounded-md font-medium border`; current `bg-primary text-primary-fg border-primary`; disabled `text-text-disabled opacity-50`; glyphs « ‹ › » | same | Match |
| Hover | `hover:bg-surface-overlay hover:text-text-primary` | pressed background (text colour stays secondary) | Adapted |
| Jump to | form: "Go to" label, `w-14` number input (`min` / `max`), "Go" submit; invalid values ignored, field cleared on success | same row; number-pad keyboard, the keyboard's submit key or "Go" submits; same validation | Match (adapted) |
| Accessibility | `nav aria-label="Pagination"`, "First / Previous / Next / Last page", "Page n", `aria-current="page"` | `role="navigation"` with the same labels, `aria-current="page"` + selected state | Match |
| Focus ring | `focus-visible:ring-2` | — | N/A (touch) |
| Tests | 9 | 10 (KuiReact's 9 cases ported, plus a class check) | Match |
| Showcase | Default, Sizes, First / Last + Jump to page | same titles and copy | Match |
