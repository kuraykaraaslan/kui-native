# Feature matrix — StatCard

> KuiReact `modules/ui/StatCard.tsx` (19 LOC, 0 tests, 1 showcase variant) ↔ KuiNative `modules/ui/StatCard.tsx` (added 2026-09-22 in `e024908`; 2 tests, 1 demo).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `label`, `value` (number \| string), `accent` (value colour class, default `text-text-primary`), `className` | ✓ | ✓ | Match |
| Card | `bg-surface-raised border border-border rounded-xl px-5 py-4 flex flex-col gap-1` | same | Match |
| Value / label | `text-2xl font-black tabular-nums` over `text-xs text-text-secondary` | same (`tabular-nums` via `fontVariant`) | Match |
| Tests | 0 | 2 | Native-ahead |
| Showcase | Variants | same title and data | Match |
