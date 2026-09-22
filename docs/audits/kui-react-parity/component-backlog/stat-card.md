# StatCard

> Backlog item · KuiReact id `stat-card` · layer `ui` · **Data Display** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Compact metric display card with value, label, and optional accent color.

**Why it matters for KuiNative:** Card-wrapped KPI.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/StatCard.tsx` (1 file, 19 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Variants |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 3 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/ui/StatCard.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `label` | `string` | **yes** | — |  | same |
| `value` | `number \| string` | **yes** | — |  | same |
| `accent` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Variants

```tsx
<StatCard label="Total Users" value={1284} />
<StatCard label="Active"      value={947}  accent="text-success" />
<StatCard label="Transferred" value={38}   accent="text-info" />
<StatCard label="Cancelled"   value={12}   accent="text-error" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `value` | highlighted | `accessibilityState.selected` |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `error` | #ef4444 | #f87171 | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

**Suggested RN libraries:** `card`

## Implementation Notes

Compose Card + Statistic.

- Location: `modules/ui/StatCard.tsx`, named export `StatCard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StatCardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `StatCard` from the `modules/ui` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 1 KuiReact variants (Variants)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Uses only semantic tokens (`error`, `success`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
