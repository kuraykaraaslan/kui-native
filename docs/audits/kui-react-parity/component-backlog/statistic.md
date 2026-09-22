# Statistic

> Backlog item · KuiReact id `statistic` · layer `ui` · **Data Display** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Bare numeric/text figure with a label, optional prefix/suffix, trend indicator, and loading skeleton — no card chrome (compose with Card for a bordered KPI tile).

**Why it matters for KuiNative:** Numeric KPI with trend/prefix/suffix; used in dashboards.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Statistic.tsx` (1 file, 66 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-09 |
| Showcase variants | Basic, Prefix / suffix / trend |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core` |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/ui/Statistic.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `label` | `string` | **yes** | — |  | same |
| `value` | `number \| string` | **yes** | — |  | same |
| `precision` | `number` | no | — |  | same |
| `prefix` | `React.ReactNode` | no | — |  | same |
| `suffix` | `React.ReactNode` | no | — |  | same |
| `trend` | `StatisticTrend` | no | — |  | same |
| `trendValue` | `string` | no | — |  | same |
| `loading` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.HTMLAttributes<HTMLDivElement> (omitting prefix)` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Basic

```tsx
<Statistic label="Active users" value={1284} />
<Statistic label="Open tickets" value={12} />
```

### Prefix / suffix / trend

```tsx
<Statistic label="Revenue" value={82400} prefix="$" trend="up" trendValue="+12.4%" />
<Statistic label="Conversion rate" value={4.2} precision={1} suffix="%" trend="down" trendValue="-0.6%" />
<Statistic label="Loading example" value={0} loading />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| loading | `loading` | shows progress; interaction blocked | `accessibilityState.busy`; Spinner/Skeleton; disable press |
| selected / active | `value` | highlighted | `accessibilityState.selected` |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-busy` | `accessibilityState.busy` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `error` | #ef4444 | #f87171 | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core`

## Implementation Notes

Text composition; `Intl.NumberFormat` (Hermes supports it). Loading → Skeleton.

- Location: `modules/ui/Statistic.tsx`, named export `Statistic` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StatisticProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Statistic` from the `modules/ui` barrel with its props type
- [ ] All 9 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Basic, Prefix / suffix / trend)
- [ ] State **loading** implemented: `accessibilityState.busy`; Spinner/Skeleton; disable press
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`error`, `success`, `surface-sunken`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
