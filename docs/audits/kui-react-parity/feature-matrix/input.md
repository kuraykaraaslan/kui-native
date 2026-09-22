# Feature matrix — Input (KuiNative `TextInput`)

> KuiReact `modules/ui/Input.tsx` (215 LOC, 9 tests, 12 showcase variants, 23 production imports) ↔ KuiNative `modules/ui/TextInput.tsx` (65 LOC, 0 tests, 1 demo).
> **Status (2026-09-22): PARITY_COMPLETE.** Audit-time detail below; see the Update blocks for what changed.

## Update 2026-09-22 (API parity, `92af9a3`)

**Fixed**

- Renamed to `Input` (`TextInput` kept as an alias).
- `success`, `required`, `prefixIcon` / `suffixIcon`, `clearable`, `showCount`, password eye toggle, number stepper, read-only styling, typed ref.
- `className` targets the wrapper (field: `inputClassName`), as in KuiReact; errors announced.
- 16 tests including KuiReact's 9; showcase shows all 12 KuiReact variants.

**Still open**

- Nothing for parity.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- Field `rounded-md px-3 py-2 text-sm` (was `rounded-lg py-2.5 text-base`).
- 4px spacing between label / field / message (KuiReact `space-y-1`).
- Error background `bg-error-subtle`; disabled `opacity-50 bg-surface-sunken`.
- 7 tests; showcase uses KuiReact's Default / Error / Disabled demos.

**Still open**

- The `Input` name.
- `success`, `required`, `prefixIcon` / `suffixIcon`, `clearable`, `showCount`, password toggle, number stepper, read-only styling.
- Typed ref; errors announced to screen readers; `className` targets the field instead of the wrapper.

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Component name | `Input` | `TextInput` | **Differs** — a KuiReact developer searches for `Input`; also shadows RN's own `TextInput` import |
| `label` | **required** | optional | Differs (native allows unlabeled fields → a11y risk) |
| `id` | required (label wiring, describedby ids) | — | N/A (`nativeID`/`testID` pass through rest) |
| `hint` | ✓ | ✓ | Match |
| `error` | ✓ | ✓ | Match |
| `success` message/state | ✓ | ✗ | **Missing** |
| `required` marker | ✓ `*` + sr-only | ✗ | **Missing** |
| `prefixIcon` / `suffixIcon` | ✓ | ✗ | **Missing** |
| `clearable` + `onClear` | ✓ | ✗ | **Missing** |
| `showCount` + `maxLength` counter | ✓ | ✗ (`maxLength` passes to RN, no counter) | **Missing** |
| Password visibility toggle (`type="password"`) | ✓ eye button | ✗ (`secureTextEntry` only) | **Missing** |
| Number stepper (`type="number"`) | ✓ ± buttons honouring `min/max/step` | ✗ | Missing (RN: `keyboardType="numeric"` + optional steppers) |
| Read-only | `readOnly` → sunken bg + "(read-only)" | RN `readOnly`/`editable` pass through, no styling | **Gap** |
| Disabled styling | `opacity-50 bg-surface-sunken` | none (`editable={false}` looks enabled) | **Gap** |
| Ref | `forwardRef<HTMLInputElement>` (tested) | not typed (works at runtime only because React 19 passes `ref` through `...rest`) | **Gap** — focus-next-field needs a typed ref |
| Value callback | DOM `onChange(event)` | RN `onChangeText(text)` via rest | Match (platform) |
| Container class | `className` on wrapper | `className` on input, `containerClassName` on wrapper | **Differs**: `className` targets a different element |
| Rest props | `InputHTMLAttributes` | `RNTextInputProps` | Match |
| Exported props type | ✗ | ✓ | Native-ahead |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Radius | `rounded-md` | `rounded-lg` | **Differs** |
| Padding | `px-3 py-2` | `px-3 py-2.5` | **Differs** |
| Text size | `text-sm` | `text-base` | **Differs** (note: 16 px avoids iOS-web zoom; record as exception if kept) |
| Default border/bg | `border-border bg-surface-base` | same | Match |
| Focus | `ring-2 ring-border-focus` | border → `border-border-focus` | Match (adapted — RN has no ring) |
| Error | `border-error ring-1 ring-error bg-error-subtle` | `border-error` only | **Gap** (no subtle bg) |
| Success | `border-success … bg-success-subtle` | — | Missing |
| Placeholder colour | `text-text-disabled` | `text-disabled` token via `useThemeTokens` | Match |
| Label | `text-sm font-medium`, gap 4 px (`space-y-1`) | `label` variant `text-sm` medium, `mb-1.5` (6 px) | Differs (minor) |
| Hint / error text | `text-xs text-text-secondary` / `text-xs text-error` | same | Match |
| Success text | `text-xs text-success-fg` | — | Missing |

## Behaviour

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Message precedence | error > success > hint | error > hint | Gap |
| Clear button only when value non-empty | ✓ | — | Missing |
| Counter turns `text-error` at limit | ✓ | — | Missing |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Label association | `<label htmlFor>` | `accessibilityLabel={label}` | Match (adapted) |
| Hint association | `aria-describedby` | none | **Gap** → `accessibilityHint` |
| Error announcement | `aria-invalid` + `role="alert"` | none | **Gap** → announce + live region |
| Required announced | sr-only "(required)" | — | Missing |
| Password toggle label | "Show/Hide password" | — | Missing |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Default, Error, Disabled, Prefix/suffix icon, Clearable, Success, Read only, Counter, Password, Number stepper, Prefix/suffix text, Loading | With label + hint | Gap (1/12) |
| Unit tests | 9 cases | 0 | **Missing** |

## Required changes (R-field-shell + R-input)

Export as `Input` (keep `TextInput` alias), extract FieldShell, add success/required/prefix/suffix/clearable/count/password toggle/readOnly+disabled styling, typed `ref`, make `className` target the wrapper like KuiReact (`inputClassName` for the field), a11y hint + error announcement, port 9 tests.
