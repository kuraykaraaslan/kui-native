# Feature matrix — Chart

> KuiReact `modules/ui/Chart/` (at `dbc7886`: charts on the shared `_SeriesChart` / `_cartesian` / `_marks` pieces, `_helpers` with round domains, label thinning, a right axis, grouped stacks, regression and point shapes, `_time`, primitives Axis, AxisTitles, ChartFrame, Grid, Legend, Thresholds, Tooltip, Crosshair, ResponsiveContainer, Brush (stub); Heatmap and Gauge implemented, six M3 stubs) ↔ KuiNative `modules/ui/Chart/` (added 2026-09-22 in `7bb58b2`; brought up to `dbc7886` on 2026-10-16: `charts/_helpers` and the date-text part of `charts/_time` ported 1:1, `charts/_cartesian` and `charts/_marks`, `charts/Cartesian` (Line / Area / Bar), `charts/Radial` (Pie / Donut / Scatter / SparkLine), `charts/Stubs`, `primitives/index.tsx`; drawn with `react-native-svg`; 30 tests, 7 demos).
> **Status: PARITY_MINOR_GAPS**

Re-audited 2026-10-16 against KuiReact commits `4f6c48c` and `dbc7886` (`git diff 43ce5aa dbc7886 -- modules/ui/Chart`).

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Charts: `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `DonutChart`, `ScatterChart`, `SparkLine` | ✓ | ✓ (all seven in the ui barrel) | Match |
| Pure helpers: `niceStep`, `niceTicks`, `resolveDomain`, `alignedDomain`, `thinLabels`, `labelWidth`, `defaultNumber`, `stackKeys`, `groupedStackTops`, `topsExtent`, `linearRegression`, `pointPath`, `seriesStats`, `stepPath`, `curvePath`, `continuePath`, `dashArray` | ✓ | same code, same names; KuiReact's helper tests ported | Match |
| Round value axes (0–351 becomes 0–400, step 1 / 2 / 2.5 / 5 × 10ⁿ), `yTickCount`, `yMin` / `yMax`, `yIncludeZero` | ✓ | ✓ (Line, Area, Bar, Scatter on both axes) | Match |
| Crowded category labels thinned (`thinLabels`) | ✓ | ✓ | Match |
| Right value axis: `Series.yAxis: 'right'`, `y2Min` / `y2Max` / `y2Label` / `y2Format`, grid shared via `alignedDomain` | ✓ (Line, Area, vertical Bar) | ✓ (same charts) | Match |
| Point marks: `showPoints`, `pointShape` (circle / square / diamond / triangle), `pointSize`; gradient area fill (`fillGradient`) | ✓ | ✓ | Match |
| Curves (`smooth` / `linear` / `step`), `lineStyle` (solid / dashed / dotted), per-series `strokeWidth` / `fillOpacity` | ✓ | ✓ | Match |
| Grouped stacks (`stacked`, `Series.stack`), stacked areas | ✓ | ✓ | Match |
| Bar: `orientation` (horizontal), end-rounded bars, `barWidth`, `barGap`, value labels (outside / inside / centre), `categoryTicks`, `xTickFormat`, category `markers` | ✓ | ✓ | Match |
| Line / Area value labels (`showValues`, `valueLabelPosition`, thinned) | ✓ (halo via `paint-order`) | ✓ (halo drawn as a stroked copy underneath: RN SVG has no `paint-order`) | Match (adapted) |
| Scatter: `xMin` / `xMax`, `xFormat`, `pointOpacity`, `trendLine`, `trendColor` | ✓ | ✓ | Match |
| Thresholds (`ThresholdLine`, labelled pill) | ✓ (pill tint via `color-mix`) | ✓ (pill tint as a 14% layer over the raised surface) | Match (adapted) |
| Axis surface: `xLabel` / `yLabel` titles, `tickStyle`, `showXAxis` / `showYAxis`, no tick marks, no value-axis line | ✓ | ✓ | Match |
| Grid: `gridStyle` (dashed by default, `3 4`), `gridColor`, full-strength stroke | ✓ | ✓ | Match |
| Legend: 8px round dots, `legendPosition` (top / bottom / left / right), `legendValues` (latest / min / max / avg / total), `legendToggle` + `Series.hidden`, `layout="grid"` | ✓ (buttons with `aria-pressed`) | ✓ (`Pressable` toggle buttons with `checked` state; grid columns of at least 124px computed from `onLayout`) | Match (adapted) |
| Tooltip: `tooltipMode` (axis / point / none), `tooltipHeader`, `tooltipValueFormat`, `tooltipTotal` (footer row), rounded-lg card, round dots, `valueLabel` | ✓ | ✓ (touch: the finger position picks the point) | Match (adapted) |
| Pie / Donut: slice `labels` inside / outside with leader lines, `labelStyle`, `minLabelShare`, `valueFormat`, `startAngle`, `sliceGap`, centre total sized to the hole + `centerLabel` / `showCenter`, `legendValue`, `legendLayout`, `hiddenSlices` / `legendToggle`, `tooltipValue`; dimmed slices at 0.5 | ✓ | ✓ (tap instead of hover) | Match (adapted) |
| `fill` (take the parent's height) | ✓ (`ResizeObserver`) | ✓ (`onLayout`, flex-1) | Match (adapted) |
| Date labels: `toTime`, `clockText` (24 h), `dayMonthText` (`6 Oct`), `formatTick`, `formatFull` | ✓ | ✓ (same code); additionally ISO date categories on the band axis print this short text, since KuiNative has no time axis | Match (+ native extra) |
| Time axis (`xAxis="time"` / `xScale`, drag-to-zoom, `timeZone`, `TimeSeriesChart`) | ✓ | — | Gap (no native time axis yet) |
| `HeatmapChart`, `GaugeChart` | implemented (reworked in `dbc7886`) | stubs that render `null` | Gap (chart types not ported) |
| Other M3 stubs (`BubbleChart`, `TreemapChart`, `RadarChart`, `FunnelChart`, `SankeyChart`, `CandlestickChart`) | render `null` | same | Match |
| Entrance animation (`animate`, Web Animations API) | ✓ | — | Differs (visual only; prop not accepted) |
| `Brush` primitive | M4 stub (renders `null`) | not exported | Gap (stub only; no visible effect) |
| Palette / theme | `var(--primary)` … CSS-variable palette, `chartTheme`, `animationDuration` (0 under reduced motion) | same strings, resolved to the active theme's hex values at draw time (`resolveColor`); reduced motion from `AccessibilityInfo` | Match (adapted) |
| Hover transitions | opacity / fill transitions | instant | Differs (visual only) |
| Accessibility | every chart's `<svg role="img" aria-label>` | every chart is an accessible `img` view with the label (Pie / Donut / Scatter gained it on 2026-10-16) | Match |
| Tests | Chart.test.tsx (settings surface, helpers, domains) | 30 (11 earlier + KuiReact's helper / domain / stack / regression cases + render checks for the new surface) | Match |
| Showcase | LineChart, Stacked bars and areas, BarChart, AreaChart, PieChart, DonutChart, SparkLine | same titles and data | Match |
