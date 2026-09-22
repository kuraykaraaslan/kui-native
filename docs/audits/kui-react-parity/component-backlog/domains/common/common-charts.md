# Charts

> Backlog item · KuiReact id `common-charts` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Large** · Wave 3 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

react-chartjs-2 chart components wrapped in Cards: Bar, Line, Doughnut, Radar, and Polar Area.

**Why it matters for KuiNative:** Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/charts/Charts.tsx` (1 file, 259 LOC) |
| Public export | `@/modules/domains/common/charts/Charts` — source-only (not exported from a barrel) |
| Registry | yes · status `beta` · since 2025-05 |
| Showcase variants | Bar — Revenue vs Expenses, Line — User Activity, Doughnut — Sales by Category, Radar — Product Comparison, Polar Area — Regional Sales |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `chart.js`, `react-chartjs-2` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/common/charts/Charts.tsx` (fallback: first exported function `RevenueBarChart`; registry name did not match an export). **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Bar — Revenue vs Expenses

```tsx
<RevenueBarChart />
```

### Line — User Activity

```tsx
<UserActivityLineChart />
```

### Doughnut — Sales by Category

```tsx
<SalesByCategoryDoughnut />
```

### Radar — Product Comparison

```tsx
<ProductComparisonRadar />
```

### Polar Area — Regional Sales

```tsx
<RegionalSalesPolar />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `chart.js` → victory-native / gifted-charts, `react-chartjs-2` → victory-native

## Implementation Notes

- Location: `modules/domains/common/Charts.tsx`, named export `Charts` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ChartsProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `Charts` from the `modules/domains/common` barrel with its props type
- [ ] All 1 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 5 KuiReact variants (Bar — Revenue vs Expenses, Line — User Activity, Doughnut — Sales by Category, Radar — Product Comparison, Polar Area — Regional Sales)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-raised`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
