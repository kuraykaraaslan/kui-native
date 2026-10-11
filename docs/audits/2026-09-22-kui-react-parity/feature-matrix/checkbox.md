# Feature matrix — Checkbox

> KuiReact `modules/ui/Checkbox.tsx` (65 LOC, 6 tests, 5 showcase variants) ↔ KuiNative `modules/ui/Checkbox.tsx` (52 LOC, 0 tests, 1 demo).
> **Status (2026-09-22): PARITY_COMPLETE.** Audit-time detail below; see the Update blocks for what changed.

## Update 2026-09-22 (API parity, `75edb0c`)

**Fixed**

- `hint`, `error` (alert + border-error), uncontrolled `defaultChecked`.
- Disabled dims only the box and greys the label, as KuiReact does.
- Showcase shows all 5 KuiReact variants.

**Still open**

- Nothing for parity.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- 16px box (was 20px), unchecked `border-border` (was `border-border-strong`), `gap-3 items-start` (was `gap-2 items-center`).
- 6 tests; showcase uses KuiReact's Default / Disabled / Indeterminate (select all) demos.

**Still open**

- `hint`, `error`.
- Uncontrolled `defaultChecked`.

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `label` | **required** | optional | Differs |
| `id` | required | — | N/A |
| `checked` | optional (controlled or uncontrolled) | **required** (controlled only) | **Differs** |
| `defaultChecked` (uncontrolled) | ✓ via input attrs | ✗ | **Missing** |
| Change callback | DOM `onChange(event)` | `onChange(next: boolean)` | **Differs** — native signature is the better one and matches KuiReact's own `Toggle`; record as approved deviation |
| `indeterminate` | ✓ | ✓ | Match |
| `disabled` | ✓ | ✓ | Match |
| `hint` | ✓ | ✗ | **Missing** |
| `error` | ✓ | ✗ | **Missing** |
| Rest props | `InputHTMLAttributes` | ✗ | Missing (`testID`, `hitSlop`) |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Box size | 16 px (`h-4 w-4`) | 20 px (`h-5 w-5`) | Differs (defensible for touch; record) |
| Unchecked border | `border-border` | `border-border-strong` | **Differs** |
| Checked fill | `text-primary` (native checkbox accent) | `bg-primary border-primary` + FA check in `primary-fg` | Match (adapted) |
| Error border | `border-error` | — | Missing |
| Label | `text-sm font-medium`; disabled → `text-text-disabled` | `label` variant; disabled → whole row `opacity-50` | Differs |
| Gap | `gap-3`, `items-start` | `gap-2`, `items-center` | **Differs** (multi-line labels align differently) |
| Focus ring | ✓ | — | Missing |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Role / state | native checkbox, `aria-checked="mixed"` | `accessibilityRole="checkbox"`, `checked: 'mixed'` | Match |
| Whole row pressable | label click toggles | row `Pressable` | Match |
| Hint / error wiring | `aria-describedby`, `aria-invalid`, `role="alert"` | — | Missing |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Default, With hint, Error, Disabled, Indeterminate | Interactive | Gap |
| Unit tests | 6 cases | 0 | **Missing** |
