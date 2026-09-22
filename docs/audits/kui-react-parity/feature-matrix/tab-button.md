# Feature matrix — TabButton

> KuiReact `modules/ui/TabButton.tsx` (39 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/TabButton.tsx` (added 2026-09-22 in `e024908`; 3 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `active`, `children`, `count`, `className` | ✓ | ✓ | Match |
| `onClick` | ✓ | `onPress` | Match (onClick → onPress, approved) |
| Pill | `px-4 py-2 rounded-lg text-sm font-semibold`; active `bg-primary text-primary-fg shadow-sm`, idle `text-text-secondary` with hover `bg-surface-overlay` | same; hover becomes the pressed state (+ Android elevation when active) | Match (adapted) |
| Count badge | `text-[10px] font-bold px-1.5 py-0.5 rounded-full`; active `bg-primary-fg/20 text-primary-fg`, idle `bg-surface-sunken text-text-disabled` | same; `/20` computed from the `primary-fg` token | Match |
| Accessibility | plain `<button>`, no role or pressed state | `tab` role + selected state | Native-ahead |
| Tests | 0 | 3 | Native-ahead |
| Showcase | Interactive, Without count | same titles and data | Match |
