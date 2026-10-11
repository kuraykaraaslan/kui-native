# Feature matrix — Accordion

> KuiReact `modules/ui/Accordion.tsx` (84 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Accordion.tsx` (added 2026-09-22 in `6798bc6`, 7 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `items` { id, title, content, disabled? }, `defaultOpenIds`, `openIds`, `onChange`, `allowMultiple`, `className`, rest props | ✓ | ✓ (rest = `ViewProps`) | Match |
| Controlled / uncontrolled, single-open by default | ✓ | ✓ (same toggle logic) | Match |
| Container | `divide-y divide-border rounded-lg border border-border bg-surface-base` | same; `divide-y` drawn as `border-t` on every item after the first (NativeWind has no `divide-*`) | Match (adapted) |
| Header | `px-4 py-3 text-sm font-medium`, `opacity-50` when disabled | same | Match |
| Header hover | `hover:bg-surface-overlay` | pressed state with the same token | Adapted |
| Chevron | `h-3.5 w-3.5 text-text-secondary`, 200ms rotate-180 when open | 14px, same colour and 200ms rotation; skipped when the OS Reduce Motion setting is on | Native-ahead |
| Panel | `px-4 pb-4 text-sm text-text-secondary`, `hidden` when closed | same; unmounted when closed | Match |
| Accessibility | `h3 > button` with `aria-expanded` / `aria-controls`, panel `role="region"` labelled by the header | button with expanded + disabled state; panel uses the `summary` role | Match (adapted: RN has no heading-wrapped button or region link) |
| Focus ring | `focus-visible:ring-2 ring-inset` | — | N/A (touch) |
| Tests | 0 | 7 | Native-ahead |
| Showcase | Single open (default), Allow multiple open | same titles and copy | Match |
