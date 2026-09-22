# Stepper

> Backlog item · KuiReact id `stepper` · layer `ui` · **Navigation** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Multi-step progress indicator with complete, active, error, and pending states. Supports horizontal and vertical orientations.

**Why it matters for KuiNative:** Step indicator used by wizards/checkout.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Stepper.tsx` (1 file, 127 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Horizontal, Vertical |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/ui/Stepper.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `steps` | `StepItem[]` | **yes** | — |  | same |
| `orientation` | `'horizontal' \| 'vertical'` | no | `'horizontal'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Horizontal

```tsx
<Stepper steps={[
  { label: 'Account', state: 'complete' },
  { label: 'Billing', state: 'active' },
  { label: 'Review', state: 'pending' },
  { label: 'Confirm', state: 'pending' },
]} />
```

### Vertical

```tsx
<Stepper orientation="vertical" steps={[
  { label: 'Create account', state: 'complete' },
  { label: 'Verify email', state: 'error' },
  { label: 'Set up profile', state: 'pending' },
]} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `orientation`: 'horizontal' · 'vertical' (default 'horizontal')

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-fg` | #7f1d1d | #fee2e2 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-inverse` | #ffffff | #111827 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Horizontal or vertical step dots with connectors; `accessibilityValue` text "Step n of m".

- Location: `modules/ui/Stepper.tsx`, named export `Stepper` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StepperProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Stepper` from the `modules/ui` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Horizontal, Vertical)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error`, `error-fg`, `primary`, `primary-fg`, `success`, `surface-base`, `text-disabled`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
