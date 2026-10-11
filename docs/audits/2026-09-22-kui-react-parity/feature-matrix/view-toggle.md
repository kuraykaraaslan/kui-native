# Feature matrix — ViewToggle

> KuiReact `modules/ui/ViewToggle.tsx` (52 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/ViewToggle.tsx` (added 2026-09-22 in `08c1c32`; 2 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `value` (`horizontal` / `vertical`), `onChange`, `labels` ({ horizontal?, vertical? }, default "Horizontal" / "Vertical"), `ariaLabel` (default "View options"), `className`; `ViewOrientation` type | ✓ | ✓ | Match |
| Group | `flex gap-0.5 rounded-lg p-0.5 border border-border bg-surface-raised` | same | Match |
| Buttons | `px-3 py-1.5 rounded-md text-xs font-semibold`, list / grid icon, active `bg-primary text-primary-fg shadow-sm`, idle `text-text-secondary` with hover `text-text-primary` | same; hover → pressed `bg-surface-overlay` (+ Android elevation when active) | Match (adapted) |
| Accessibility | `role="group"` + label, `aria-pressed` | `group` + label, buttons with selected state | Match (adapted) |
| Tests | 0 | 2 | Native-ahead |
| Showcase | Default (EN labels), Custom labels | same titles and labels | Match |
