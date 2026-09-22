# Feature matrix — Card

> KuiReact `modules/ui/Card.tsx` (84 LOC, 0 tests, 6 showcase variants, 9 production imports) ↔ KuiNative `modules/ui/Card.tsx` (46 LOC, 0 tests, 2 demos).
> **Status (2026-09-22): PARITY_COMPLETE.** Audit-time detail below; see the Update blocks for what changed.

## Update 2026-09-22 (API parity, `dbdbdbd`)

**Fixed**

- `onPress` (KuiReact `onClick`), `hoverable` (pressed-state hover look), `loading` skeleton.
- Showcase shows all 6 KuiReact variants.

**Still open**

- Nothing for parity.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- Header / body / footer sections with KuiReact's `px-6 py-4` (footer `py-3`, `bg-surface-base`) and dividers.
- Title `text-sm font-semibold`, subtitle `text-xs` (were `text-lg` / `text-sm`).
- `shadow-sm` on `raised` (+ Android elevation); new `flat` variant; new `headerRight` slot.
- 10 tests; showcase uses KuiReact's Raised / With footer / Flat / Outline demos.

**Still open**

- Interactive `onPress` (KuiReact `onClick`), `hoverable` pressed feedback.
- `loading` skeleton state.

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `title` / `subtitle` | ✓ | ✓ | Match |
| `footer` | ✓ | ✓ | Match |
| `children` | ✓ | ✓ | Match |
| `headerRight` slot | ✓ | ✗ | **Missing** |
| `variant` values | `raised · flat · outline` | `raised · outline` | **Missing** `flat` |
| `variant` default | `raised` | `raised` | Match |
| Interactive (`onClick` → button) | ✓ auto-switches to `<button>` | ✗ | **Missing** (`onPress` + `accessibilityRole="button"`) |
| `hoverable` | ✓ | ✗ | N/A as hover; needs pressed feedback equivalent (Gap) |
| `loading` (built-in skeleton) | ✓ | ✗ | **Missing** |
| Polymorphic `as` | ✓ | ✗ | N/A |
| Rest props | `Record<string, unknown>` | `ViewProps` spread | Match (typed better in native) |
| Exported props type | ✗ | ✓ | Native-ahead |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Radius | `rounded-xl` | `rounded-xl` | Match |
| Border | `border border-border` all variants | `border border-border` | Match |
| Raised background | `bg-surface-raised` + `shadow-sm` | `bg-surface-raised`, no shadow | **Gap** (no shadow anywhere in KuiNative) |
| Flat background | `bg-surface-base` | — | Missing |
| Structure | header / body / footer **sections**, each `px-6`, header `py-4 border-b`, body `py-4`, footer `py-3 border-t bg-surface-base`, `overflow-hidden` | one container `p-4`; body `mt-3`; footer `mt-3 border-t pt-3` inside the padding | **Differs**: no header divider, footer not edge-to-edge, no footer background, 16 px vs 24 px horizontal padding |
| Title typography | `text-sm font-semibold` | `Text variant="h4"` → `text-lg`, and (see Text) regular weight on iOS | **Differs** (much larger) |
| Subtitle typography | `text-xs text-text-secondary` | `bodySm` → `text-sm text-text-secondary` | **Differs** |
| Hover | `hover:shadow-md hover:border-border-focus` | — | N/A → pressed state |
| Focus ring (interactive) | ✓ | — | Missing |

## Behaviour

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Subtitle without title | not rendered (header renders only when `title \|\| headerRight`) | rendered | Differs (minor) |
| Loading blocks pointer events | ✓ | — | Missing |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Title semantics | `<h3>` | plain Text | **Gap** (`accessibilityRole="header"`) |
| Interactive card role | `<button>` | — | Missing |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase variants | Raised, With footer, Flat, Outline, Clickable/hoverable, Loading skeleton | Raised, Outline | Gap |
| Unit tests | 0 | 0 | Match (both missing) |

## Required changes (R-card)

Add `flat`, `headerRight`, `onPress`, `loading`; restructure into header/body/footer sections with KuiReact spacing; title `text-sm font-semibold` with `accessibilityRole="header"`; shadow via R-shadow.
