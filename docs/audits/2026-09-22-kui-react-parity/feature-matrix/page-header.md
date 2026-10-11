# Feature matrix — PageHeader

> KuiReact `modules/ui/PageHeader.tsx` (84 LOC, 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/PageHeader.tsx` (added 2026-09-22 in `1f19759`, 6 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `title`, `subtitle`, `badge`, `actions`, `className` | ✓ | ✓ | Match |
| Actions `{ label, href?, variant?, disabled? }` | ✓ | ✓ | Match |
| Action `onClick` | ✓ | `onPress` | Match (onClick → onPress, approved) |
| Action `href` | `<a href>` (ignores `disabled`) | expo-router `router.push(href)`, link role; `disabled` also applies to links | Adapted |
| Layout | `flex items-start justify-between gap-4 pb-5 border-b border-border` | same | Match |
| Title / subtitle | `h1 text-2xl font-bold leading-tight`, badge beside it; `text-sm text-text-secondary mt-0.5` | same; title has the header role | Match |
| Action variants | primary, secondary, outline, danger, ghost; `px-4 py-2 rounded-md text-sm font-medium` | same | Match |
| Hover | `hover:bg-*-hover` / `hover:opacity-90` / `hover:bg-surface-overlay` | pressed state with the same tokens | Adapted |
| Focus ring | `focus-visible:ring-2` | — | N/A (touch) |
| Tests | 0 | 6 | Native-ahead |
| Showcase | With actions, Danger action, Minimal | same titles and copy | Match |
