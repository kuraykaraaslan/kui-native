# Feature matrix — EmptyState

> KuiReact `modules/ui/EmptyState.tsx` (37 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/EmptyState.tsx` (49 LOC, 0 tests, 1 demo).
> **Status (2026-09-22): PARITY_COMPLETE.** Audit-time detail below; see the Update block for what changed.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- `py-16`, 48px icon circle, `text-disabled` icon, `text-sm font-semibold` title.
- No icon unless one is passed; `icon` accepts a Font Awesome definition or any node.
- KuiReact's `action` node is supported (the `actionLabel` / `onAction` shorthand remains).
- 10 tests; showcase uses KuiReact's With action / Minimal demos.

**Still open**

- Nothing for parity.

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `title` (required) | ✓ | ✓ | Match |
| `description` | ✓ | ✓ | Match |
| `icon` | `ReactNode`, optional; **no icon when omitted** | `IconDefinition`, defaults to `faInbox` (always shows an icon) | **Differs** (type and default) |
| `action` | `ReactNode` (any button(s)) | `actionLabel` + `onAction` → single primary `Button` | **Differs** — cannot render outline/secondary actions, two buttons, or a link |
| `className` | ✓ | ✓ | Match |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Padding | `py-16 px-6` | `py-12 px-6` | Differs |
| Icon circle | 48 px `bg-surface-sunken`, icon `text-text-disabled` `text-2xl` | 56 px `bg-surface-sunken`, icon 24 px `text-secondary` | **Differs** (size, colour token) |
| Title | `text-sm font-semibold` | `h4` → `text-lg` (regular weight on iOS, see Text) | **Differs** |
| Description | `text-sm text-text-secondary max-w-xs` | `text-sm text-text-secondary`, no max width | Differs |
| Action gap | `mt-4` | `mt-4` | Match |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Icon hidden | `aria-hidden` | not hidden | Gap |
| Title semantics | `<h3>` | plain Text | Gap (`accessibilityRole="header"`) |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | With action, Minimal | With action | Gap (no minimal — and native cannot render a truly minimal state because the icon always shows) |
| Tests | 0 | 0 | Both missing |

## Native-only strengths

Doc comment recommends use as `FlatList` `ListEmptyComponent` — good platform guidance to keep.
