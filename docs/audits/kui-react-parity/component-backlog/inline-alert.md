# InlineAlert

> Backlog item · KuiReact id `inline-alert` · layer `app` · **Feedback** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Compact inline alert strip used next to form fields or inside cards. success / error / warning / info variants; icon + single-line message.

**Why it matters for KuiNative:** Compact inline alert used inside forms/cards.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/InlineAlert.tsx` (1 file, 42 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Tüm variantlar |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 4 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/InlineAlert.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `variant` | `InlineAlertVariant` | no | `'success'` |  | same |
| `message` | `React.ReactNode` | **yes** | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Tüm variantlar

```tsx
<InlineAlert variant="success" message="Changes saved successfully." />
<InlineAlert variant="error"   message="Something went wrong." />
<InlineAlert variant="warning" message="Please review before saving." />
<InlineAlert variant="info"    message="This action cannot be undone." />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Same token mapping as AlertBanner, smaller padding; no dismiss.

- Location: `modules/app/InlineAlert.tsx`, named export `InlineAlert` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `InlineAlertProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `InlineAlert` from the `modules/app` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 1 KuiReact variants (Tüm variantlar)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`error`, `error-subtle`, `info`, `info-subtle`, `success`, `success-fg`, `success-subtle`, `text-primary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
