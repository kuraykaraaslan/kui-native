# Feature matrix — Progress

> KuiReact `modules/ui/Progress.tsx` (109 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Progress.tsx` (added 2026-09-22, 16 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `value` (clamped 0–100) | ✓ | ✓ | Match |
| `variant` primary / success / warning / error | ✓ | ✓ | Match |
| `size` sm / md / lg | bar h-1.5 / h-2.5 / h-4; circle 40 / 64 / 96px, stroke 4 / 6 / 8 | same | Match |
| `shape` bar / circle | CSS bar / SVG circle rotated -90° | View bar / react-native-svg circle rotated -90° | Match |
| `showLabel` | `text-xs tabular-nums` (below the bar; centred and semibold in the circle) | same | Match |
| `label` | aria-label, default "<n>% complete" | accessibilityLabel, same default | Match |
| Motion | 300ms ease-out width / dashoffset | 300ms ease-out Animated | Match |
| Accessibility | progressbar + valuenow / min / max | progressbar + accessibilityValue | Match |
| Showcase | Bar, Circle | same titles and values | Match |
