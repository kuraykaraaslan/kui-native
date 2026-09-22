# Chart

> Backlog item · KuiReact id `chart` · layer `ui` · **Charts** · Priority **Medium** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Token-aware primitive chart library at @/modules/ui/Chart. M1 ships seven SVG-based charts (Line, Bar, Area, Pie, Donut, Scatter, SparkLine) that consume a unified `Series` data shape. Colors auto-resolve from --primary / --secondary / --success / --warning / --error / --info, so dark mode and theme swaps work without any extra work. Pixel-identical EJS sibling at modules/ui/Chart/Chart.ejs. M3+ stubs (BubbleChart, HeatmapChart, TreemapChart, RadarChart, FunnelChart, SankeyChart, CandlestickChart, GaugeChart) are exported but render null until implemented; see PLANS/38-Charts.md.

**Why it matters for KuiNative:** KuiReact wraps Chart.js (1.8k LOC); canvas is not available on RN.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Chart/index.ts` (26 files, 1824 LOC) |
| Public export | `@/modules/ui/Chart/index` — source-only (not exported from a barrel) |
| Registry | yes · status `beta` · since 2026-05 |
| Showcase variants | LineChart, BarChart, AreaChart, PieChart, DonutChart, SparkLine |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | reduced-motion aware |

## Required Props

_Props could not be extracted statically (component is a barrel/re-export or uses a non-standard signature). Read `kui-react/modules/ui/Chart/index.ts` and fill this section before implementation._

## Variants

### LineChart

```tsx
<LineChart
  series={[
    { id: 'active',  name: 'Active users', data: [{ x: 'Mon', y: 1200 }, /* … */] },
    { id: 'signups', name: 'New signups',  data: [{ x: 'Mon', y: 300 },  /* … */] },
  ]}
  height={220}
/>
```

### BarChart

```tsx
<BarChart
  series={[
    { id: 'revenue',  name: 'Revenue',  data: [{ x: 'Jan', y: 4200 }, /* … */] },
    { id: 'expenses', name: 'Expenses', data: [{ x: 'Jan', y: 2800 }, /* … */] },
  ]}
  radius={4}
/>
```

### AreaChart

```tsx
<AreaChart series={series} smooth fillOpacity={0.18} />
```

### PieChart

```tsx
<PieChart
  series={[{
    id: 'share', name: 'Category share',
    data: [
      { x: 'Electronics', y: 35 },
      { x: 'Clothing',    y: 25 },
      { x: 'Food',        y: 20 },
      { x: 'Books',       y: 12 },
      { x: 'Other',       y: 8 },
    ],
  }]}
/>
```

### DonutChart

```tsx
<DonutChart series={pieSeries} innerRadius={0.62} />
```

### SparkLine

```tsx
<SparkLine values={[12, 14, 11, 17, 19, 16, 22]} width={120} height={28} filled />
<SparkLine values={[5, 7, 6, 9, 8, 11]} width={120} height={28} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="img"` | `accessibilityRole="image"` |
| `role="list"` | `accessibilityRole="list"` |
| `role="tooltip"` | review manually |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

**Suggested RN libraries:** `victory-native or react-native-gifted-charts`

## Implementation Notes

Use `victory-native` (Skia) or `react-native-gifted-charts`; mirror the KuiReact chart type set and token palette.

- Location: `modules/ui/Chart.tsx`, named export `Chart` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ChartProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Chart` from the `modules/ui` barrel with its props type
- [ ] Showcase demos for all 6 KuiReact variants (LineChart, BarChart, AreaChart, PieChart, DonutChart, SparkLine)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`primary`, `secondary`, `success`, `warning`, `error`, `info`, `surface-raised`, `border`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
