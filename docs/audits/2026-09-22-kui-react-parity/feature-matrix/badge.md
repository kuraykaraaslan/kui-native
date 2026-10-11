# Feature matrix — Badge

> KuiReact `modules/ui/Badge.tsx` (87 LOC, 0 tests, 9 showcase variants, **109 production imports**; wrapped by ~60 domain status badges) ↔ KuiNative `modules/ui/Badge.tsx` (39 LOC, 0 tests, 1 demo).
> **Status (2026-09-22): PARITY_COMPLETE.** Audit-time detail below; see the Update blocks for what changed.

## Update 2026-09-22 (API parity, `3e48fad`)

**Fixed**

- `children` (label alias), `neutral` default (`default` alias).
- `size` sm / md / lg, `dot`, `dismissible` + `onDismiss` (× with hitSlop).
- 15 tests; showcase shows all 9 KuiReact variants.

**Still open**

- Nothing for parity.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- Nothing needed visually: the rendering already matched KuiReact's `md` size pixel for pixel.

**Still open**

- `label` vs `children`; `default` vs `neutral`.
- `size`, `dot`, `dismissible` / `onDismiss`.
- No tests yet.

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Content | `children: ReactNode` (required) | `label: string` (required) | **Differs** (no icons/counts inside) |
| Variant names | `success · error · warning · info · neutral · primary` | `default · primary · success · warning · error · info` | **Differs**: `neutral` ≠ `default` |
| Default variant | `neutral` | `default` | **Differs** (same visual, different name) |
| `size` (`sm · md · lg`, default `md`) | ✓ | ✗ (fixed ≈ md) | **Missing** |
| `dot` | ✓ | ✗ | **Missing** |
| `dismissible` + `onDismiss` | ✓ | ✗ | **Missing** (blocks TagInput port) |
| Polymorphic `as` | ✓ | ✗ | N/A |
| Rest props | ✓ | ✗ | Missing |
| Exported props type | ✗ | ✓ | Native-ahead |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Variant colours | subtle bg + `*-fg` text; neutral `surface-sunken/text-secondary`; primary `primary-subtle/primary` | identical | Match |
| Shape | `rounded-full` | `rounded-full` | Match |
| md padding / text | `px-2 py-0.5 text-xs font-medium` | `px-2 py-0.5 text-xs font-medium` | Match |
| sm / lg | `px-1.5 text-[10px]` / `px-3 py-1 text-sm` | — | Missing |
| Dot colours | `bg-success/error/warning/info/text-disabled/primary` | — | Missing |
| Layout | `inline-flex` | `self-start` | Match (RN equivalent) |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Dot hidden | `aria-hidden` | — | Missing |
| Dismiss button | `<button aria-label="Remove">` | — | Missing (needs `accessibilityRole="button"` + label + hitSlop; 10 px icon is far below 44 pt) |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Success, Error, Warning, Info, Neutral, Primary, Sizes, Dot badge, Dismissible | Variants | Gap |
| Unit tests | 0 | 0 | Both missing |

## Required changes (R-badge)

`children`, rename `default` → `neutral` (alias one release), add `size`, `dot`, `dismissible/onDismiss` (with hitSlop), rest spread.
