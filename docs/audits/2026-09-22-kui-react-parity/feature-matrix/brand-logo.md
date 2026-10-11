# Feature matrix — BrandLogo

> KuiReact `modules/ui/BrandLogo.tsx` (27 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/BrandLogo.tsx` (added 2026-09-22 in `44cdca3`; 2 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `children`, `size` (sm / md / lg / xl / 2xl, default md), `className` | ✓ | ✓ | Match |
| Tile | `rounded-2xl bg-primary shadow-sm`, `h-8 w-8` → `h-24 w-24` | same classes (+ Android elevation 1) | Match |
| Label | `font-bold text-primary-fg`, `text-sm` → `text-4xl`, inherited by any child | same classes on a `Text` for string / number children; other nodes render as given | Adapted (RN has no text-style inheritance) |
| Accessibility | none | none | Match |
| Tests | 0 | 2 | Native-ahead |
| Showcase | Default sizes, Custom content | same titles and content | Match |
