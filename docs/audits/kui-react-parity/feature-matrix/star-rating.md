# Feature matrix — StarRating

> KuiReact `modules/ui/StarRating.tsx` (138 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/StarRating.tsx` (added 2026-09-22 in `e024908`; 5 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `value` (0–5, clamped), `size` (sm / md / lg), `readonly` (default true), `onChange`, `aria-label`, `caption`, `className` | ✓ | ✓ | Match |
| Stars | solid / half / regular Font Awesome stars, `text-warning` or `text-text-disabled`, `w-3.5` / `w-5` / `w-7`, `gap-0.5` / `gap-1` / `gap-1.5` | same icons at 14 / 20 / 28 px, colours from the theme tokens | Match |
| Caption | `ml-2 text-sm text-text-secondary` | same | Match |
| Read-only | `role="img"`, label "4.5 out of 5 stars" | accessible `img` with the same label | Match |
| Interactive | `radiogroup` of `radio` buttons ("1 star" … "5 stars", `aria-checked`), whole stars, hover / focus preview | same roles, labels and checked state; preview while a star is pressed (and on hover with react-native-web) | Match (adapted: hover → press) |
| Focus ring | `focus-visible:ring-2` | — | N/A (no keyboard focus on touch) |
| Tests | 0 | 5 | Native-ahead |
| Showcase | Readonly with decimals, Interactive | same titles and data | Match |
