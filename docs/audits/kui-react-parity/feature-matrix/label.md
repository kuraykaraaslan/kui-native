# Feature matrix — Label

> KuiReact `modules/ui/Label.tsx` (31 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Label.tsx` (added 2026-09-22, 7 tests, 2 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Content | `children` | `children: string` | Match (string only: RN label text must be a Text child) |
| `required` | red `*` + sr-only "(required)" | red `*` + accessible name "<label>, required" | Match (adapted) |
| `disabled` | `text-text-disabled cursor-not-allowed` | `text-text-disabled` | Match |
| Typography | `block text-sm font-medium text-text-primary select-none` | `label` variant (text-sm, medium) + `font-medium` | Match |
| `htmlFor` | links the label to its field | `onPress` (press the label to focus or toggle the paired field) | Adapted: no id-based linking on RN |
| Rest props (`LabelHTMLAttributes`) | ✓ | ✗ | Gap |
| Showcase | Basic + required, Paired with a custom control | same two titles and copy | Match |
