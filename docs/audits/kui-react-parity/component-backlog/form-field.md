# FormField

> Backlog item · KuiReact id `form-field` · layer `app` · **Forms** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Render-prop wrapper wiring react-hook-form to accessible label/hint/error markup. Exported, not in registry.

**Why it matters for KuiNative:** react-hook-form bridge (render-prop) — exported but not in registry.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/FormField.tsx` (1 file, 73 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `react-hook-form` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/FormField.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `name` | `Path<T>` | **yes** | — |  | same |
| `label` | `string` | **yes** | — |  | same |
| `hint` | `string` | no | — |  | same |
| `required` | `boolean` | no | — |  | same |
| `rules` | `RegisterOptions<T>` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `children` | `(props: { id: string; 'aria-describedby': string \| undefined; 'aria-invalid': b…` | **yes** | — |  | keep (strings must be wrapped in `Text`) |

## Variants

_No showcase variants recorded in the KuiReact registry._

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| required | `required` | asterisk + sr-only (required) | asterisk + "required" in accessibilityLabel |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `aria-describedby` | `accessibilityHint` |
| `aria-invalid` | announce error; include in hint |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `error` | #ef4444 | #f87171 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `react-hook-form`

**Suggested RN libraries:** `react-hook-form`

## Implementation Notes

Port verbatim (react-hook-form works on RN); wire `error` into Input/Select props.

- Location: `modules/app/FormField.tsx`, named export `FormField` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `FormFieldProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `FormField` from the `modules/app` barrel with its props type
- [ ] All 7 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] State **required** implemented: asterisk + "required" in accessibilityLabel
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`error`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
