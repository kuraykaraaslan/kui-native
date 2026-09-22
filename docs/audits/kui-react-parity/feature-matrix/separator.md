# Feature matrix — Separator

> KuiReact `modules/ui/Separator.tsx` (34 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Separator.tsx` (added 2026-09-22, 8 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `orientation` horizontal / vertical | `h-px w-full` / `w-px self-stretch` | same | Match |
| `decorative` | `role="none"` vs `role="separator"` | hidden from the accessibility tree when decorative | Match (RN has no separator role) |
| `label` | centred label between two rules | same, `caption` text | Match |
| Colour | `bg-border` | `bg-border` | Match |
| Rest props | ✓ | `ViewProps` | Match |
| Showcase | Horizontal, Vertical + labeled | same titles and copy | Match |
