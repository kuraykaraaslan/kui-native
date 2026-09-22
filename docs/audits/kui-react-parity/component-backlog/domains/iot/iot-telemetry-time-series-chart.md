# TelemetryTimeSeriesChart

> Backlog item · KuiReact id `iot-telemetry-time-series-chart` · layer `domain` · **Domain — IoT** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Multi-line time-series chart built on chart.js. Supports any number of series with custom colors.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/iot/telemetry/TelemetryTimeSeriesChart.tsx` (1 file, 82 LOC) |
| Public export | `@/modules/domains/iot` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Vibration / Temp / RPM |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `chart.js`, `react-chartjs-2` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/iot/telemetry/TelemetryTimeSeriesChart.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | **yes** | — |  | same |
| `subtitle` | `string` | no | — |  | same |
| `labels` | `string[]` | **yes** | — |  | same |
| `series` | `TelemetrySeries[]` | **yes** | — |  | same |
| `yUnit` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Vibration / Temp / RPM

```tsx
<TelemetryTimeSeriesChart title="..." labels={[...]} series={[{ label, color, data }, ...]} />
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

- Location: `modules/domains/iot/TelemetryTimeSeriesChart.tsx`, named export `TelemetryTimeSeriesChart` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TelemetryTimeSeriesChartProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/iot/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `TelemetryTimeSeriesChart` from the `modules/domains/iot` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 1 KuiReact variants (Vibration / Temp / RPM)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-raised`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
