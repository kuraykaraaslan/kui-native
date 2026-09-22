# Feature matrix — RangeSlider

> KuiReact `modules/ui/RangeSlider.tsx` (112 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/RangeSlider.tsx` (added 2026-09-22 in `0770214`, 10 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `label`, `hint`, `min` (0), `max` (100), `step` (1), `disabled`, `showValue` (true), `className` | ✓ | ✓ | Match |
| Single: `value: number`, `onChange(number)` · Range: `range`, `value: [lo, hi]`, `onChange([lo, hi])`, handles cannot cross | ✓ (discriminated union) | ✓ (same union and clamping) | Match |
| Header | `flex justify-between text-sm`, label `font-medium`, value `tabular-nums text-text-secondary` (`lo – hi` for ranges) | same | Match |
| Track / fill | `h-1.5 rounded-full bg-surface-sunken`, `bg-primary` fill (gradient for single, absolute bar for range) | drawn `h-1.5` track with an absolute `bg-primary` fill for both modes | Match (adapted: no `<input type="range">` on RN) |
| Thumb | `h-4 w-4 rounded-full bg-primary border-2 border-surface-base shadow` | same (+ Android elevation), 12px hit slop | Match |
| Input | native range input (drag, click on track, arrow keys) | drag via PanResponder, tap on track moves the nearest thumb, screen-reader increment / decrement by `step` | Adapted |
| Disabled | `disabled:opacity-50` | `opacity-50`, adjustments ignored | Match |
| Accessibility | range inputs labelled "{label} minimum / maximum" (or "Minimum / Maximum value"), hint via `aria-describedby` | adjustable thumbs with the same labels, min / max / now values, hint as accessibility hint | Match (adapted) |
| Focus ring | `focus-visible:ring-2` on the thumb | — | N/A (touch) |
| Tests | 0 | 10 | Native-ahead |
| Showcase | Single value, Dual handle (range) | same titles and copy | Match |
