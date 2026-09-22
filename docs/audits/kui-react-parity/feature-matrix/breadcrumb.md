# Feature matrix — Breadcrumb

> KuiReact `modules/ui/Breadcrumb.tsx` (72 LOC, 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/Breadcrumb.tsx` (added 2026-09-22 in `3bdedc4`, 5 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `items` { label, href? }, `separator`, `maxItems`, `className` | ✓ | ✓ | Match |
| `href` | `<a href>` | pressable link that calls expo-router `router.push(href)` | Adapted |
| Item `onPress` | — | overrides the `href` navigation | Native-ahead |
| Trail | `flex flex-wrap items-center gap-1 text-sm`; links `text-text-secondary`; current page `text-text-primary font-medium` | same | Match |
| Link hover | `hover:text-text-primary` | pressed colour | Adapted |
| Separator | 10px chevron-right in `text-text-disabled`, or a custom node; hidden from assistive tech | same | Match |
| `maxItems` | first item, "…", last `maxItems − 1` | same | Match |
| Accessibility | `nav aria-label="Breadcrumb"`, `ol` / `li`, `aria-current="page"`, ellipsis `aria-hidden` | `role="navigation"`, `list` / `listitem`, link role, `aria-current="page"`, ellipsis hidden | Match |
| Focus ring | `focus-visible:ring-2` | — | N/A (touch) |
| Tests | 0 | 5 | Native-ahead |
| Showcase | Default, Long path, Custom separator, Overflow / ellipsis | same titles and copy | Match |
