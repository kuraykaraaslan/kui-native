# Progress

> Backlog item · KuiReact id `progress` · layer `ui` · **Feedback** · Priority **Critical** · Complexity **Medium** · Wave 1 · Fit `direct` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Determinate progress indicator as a bar or a circle, with variant colors and an optional percentage label.

**Why it matters for KuiNative:** Determinate progress (bar + circle) is a baseline feedback primitive for uploads, onboarding and quotas.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Progress.tsx` (1 file, 109 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-09 |
| Showcase variants | Bar, Circle |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/ui/Progress.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `value` | `number` | **yes** | — |  | same |
| `variant` | `ProgressVariant` | no | `'primary'` |  | same |
| `size` | `ProgressSize` | no | `'md'` |  | same |
| `shape` | `'bar' \| 'circle'` | no | `'bar'` |  | same |
| `showLabel` | `boolean` | no | `false` |  | same |
| `label` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.HTMLAttributes<HTMLDivElement> (omitting children)` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Bar

```tsx
<Progress value={30} />
<Progress value={62} variant="warning" showLabel />
<Progress value={90} variant="success" size="lg" showLabel />
```

### Circle

```tsx
<Progress value={40} shape="circle" showLabel />
<Progress value={75} shape="circle" variant="success" size="lg" showLabel />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `shape`: 'bar' · 'circle' (default 'bar')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `value` | highlighted | `accessibilityState.selected` |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="progressbar"` | `accessibilityRole="progressbar"` |
| `aria-label` | `accessibilityLabel` |
| `aria-valuemax` | `accessibilityValue.max` |
| `aria-valuemin` | `accessibilityValue.min` |
| `aria-valuenow` | `accessibilityValue.now` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `error` | #ef4444 | #f87171 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

**Suggested RN libraries:** `react-native-svg`, `react-native-reanimated`

## Implementation Notes

Bar: nested `View`s with width %; animate with Reanimated `withTiming`. Circle: `react-native-svg` `Circle` with `strokeDasharray`. a11y: `accessibilityRole="progressbar"` + `accessibilityValue={{min:0,max:100,now:value}}`.

- Location: `modules/ui/Progress.tsx`, named export `Progress` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ProgressProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Progress` from the `modules/ui` barrel with its props type
- [ ] All 7 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Bar, Circle)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`error`, `primary`, `success`, `surface-sunken`, `text-primary`, `text-secondary`, `warning`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
