# Feature matrix — Spinner

> KuiReact `modules/ui/Spinner.tsx` (33 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Spinner.tsx` (32 LOC, 0 tests, 1 demo).
> **Status: PARITY_MINOR_GAPS** (API shape identical; enumeration and visual differ; one bug).

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `size` values | `xs · sm · md · lg · xl` | `sm · md · lg` | **Missing** `xs`, `xl` |
| `size` default | `md` | `md` | Match |
| Size rendering | 12 / 16 / 24 / 32 / 48 px | sm → `small`, **md → `small`**, lg → `large` (~36 dp) | **Bug**: `sm` and `md` are identical |
| Visual | two-tone ring: `border-border` + `border-t-primary`, rotating | OS `ActivityIndicator` (spokes on iOS, arc on Android) | **Differs** |
| Colour | `primary` (via class) | `primary` via `useThemeTokens`, overridable `color` prop | Match + native-only `color` |
| `className` | ✓ | ✓ (on wrapper) | Match |
| a11y | spinner `aria-hidden` + sr-only "Loading…" | `accessibilityRole="progressbar"` + label "Loading" | Match (adapted); label not overridable/localisable in either |
| Reduced motion | ✗ | ✗ (OS indicator) | Match |
| Showcase | Sizes, In a Button | Sizes | Gap |
| Tests | 0 | 0 | Both missing |

## Required changes (R-spinner)

Map five sizes to numeric sizes (Reanimated rotating `View` with the KuiReact two-tone border reproduces the look exactly and supports every size on both platforms), add `accessibilityLabel` prop.
