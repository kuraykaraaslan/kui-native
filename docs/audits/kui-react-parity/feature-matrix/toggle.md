# Feature matrix — Toggle (KuiNative `Switch`)

> KuiReact `modules/ui/Toggle.tsx` (81 LOC, 6 tests, 4 showcase variants) ↔ KuiNative `modules/ui/Switch.tsx` (40 LOC, 0 tests, 1 demo).
> **Status: PARITY_MAJOR_GAPS.**

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Component name | `Toggle` | `Switch` | **Differs** |
| Value prop | `checked` (required) | `value` (required) | **Differs** |
| Change callback | `onChange(checked)` (required) | `onValueChange?(next)` | **Differs** (name; optionality) |
| `label` | required | optional | Differs |
| `ariaLabel` (name when label is elsewhere) | ✓ | ✗ | **Missing** |
| `description` | ✓ | ✗ | **Missing** |
| `size` `sm · md · lg` | ✓ | ✗ | **Missing** (OS switch has fixed size; custom track needed) |
| `disabled` | ✓ | ✓ | Match |
| `id` | required | — | N/A |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Rendering | custom track + thumb, identical on every browser | OS `Switch` — iOS and Android look different from each other and from KuiReact | **Differs** |
| Track on | `bg-primary` | `trackColor.true = primary` | Match |
| Track off | `bg-surface-sunken border-border` | `trackColor.false = border-strong`; `ios_backgroundColor` unset | **Differs** |
| Thumb | `bg-white shadow-sm` | `thumbColor="#ffffff"` | Match (both hard-code white) |
| Layout | switch **left**, label + description right, `items-start gap-3` | label **left** (`flex-1`), switch right, `justify-between` | **Differs** — native settings-row idiom; decide and record |
| Motion | 200 ms colour + translate | OS animation | Differs (acceptable) |

## Behaviour

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Pressing the label toggles | ✓ (`<label>` wraps) | ✗ label is plain Text | **Gap** |
| Disabled | `opacity-50 cursor-not-allowed` | `opacity-50` | Match |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Role/state | `role="switch"` + `aria-checked` | RN Switch (implicit) + explicit `accessibilityRole/State` | Match |
| Single accessible element | ✓ (label and control are one) | ✗ label Text and Switch are separate focus stops → label read twice | **Gap** |
| Description announced | visible text | — | Missing |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Sizes, With description, Disabled, Settings list | Interactive | Gap |
| Unit tests | 6 cases | 0 | **Missing** |

## Required changes (R-toggle)

Export as `Toggle` (keep `Switch` alias), `checked/onChange`, `description`, `ariaLabel`, `size` (custom track with Reanimated, or document OS switch as an approved exception and drop `size`), make the whole row one accessible `Pressable` (`accessibilityRole="switch"`), set `ios_backgroundColor`, decide control position.
