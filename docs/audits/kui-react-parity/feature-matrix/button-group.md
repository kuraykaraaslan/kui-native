# Feature matrix — ButtonGroup

> KuiReact `modules/ui/ButtonGroup.tsx` (95 LOC, 0 tests, 5 showcase variants) ↔ KuiNative `modules/ui/ButtonGroup.tsx` (added 2026-09-22 in `98242aa`, 6 tests, 5 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `items` { value, label, disabled? }, `value`, `onChange`, `variant` (default outline), `size` (default md), `className` | ✓ | ✓ | Match |
| Variants | primary, secondary, outline, ghost | same | Match |
| Sizes | xs `px-2 py-1 text-xs` · sm `px-3 py-1.5 text-sm` · md `px-4 py-2 text-sm` · lg `px-5 py-2.5 text-base` | same | Match |
| Frame | `inline-flex rounded-md overflow-hidden`; outline adds `border border-border divide-x divide-border` | same; `divide-x` drawn as `border-l` on every item after the first | Match (adapted) |
| Primary / secondary inactive | `bg-primary/20`, `hover:bg-primary/40` | 20 % / 40 % alpha computed from the hex theme token (opacity modifiers do not work on `var()` tokens); 40 % is the pressed state | Adapted |
| Active | primary / secondary solid; outline / ghost `bg-surface-overlay font-semibold` | same | Match |
| End rounding | `rounded-l-md` / `rounded-r-md` on first / last (non-outline) | same | Match |
| Hover | `hover:bg-surface-overlay` | pressed state | Adapted |
| Accessibility | `role="group"`, `aria-pressed` per item | `role="group"`, `accessibilityState.selected` per item | Match (adapted: RN has no pressed state) |
| Tests | 0 | 6 | Native-ahead |
| Showcase | Outline (default), Sizes, Primary / secondary / ghost, With disabled item, Icon-style labels | same titles and copy | Match |
