# Feature matrix — Chart

> KuiReact `modules/ui/Chart/` (26 files, 1824 LOC: `index.ts`, `theme.ts`, `types.ts`, `charts/` seven M1 charts + eight M3 stubs + `_helpers`, `primitives/` Axis, Grid, Legend, Tooltip, Crosshair, ResponsiveContainer, Brush (M4 stub); 0 tests, 6 showcase variants) ↔ KuiNative `modules/ui/Chart/` (added 2026-09-22 in `7bb58b2`: `index.ts`, `theme.ts`, `types.ts` and `charts/_helpers` ported unchanged, `charts/Cartesian` (Line / Area / Bar on one shared frame), `charts/Radial` (Pie / Donut / Scatter / SparkLine), `charts/Stubs`, `primitives/index.tsx`; drawn with `react-native-svg`; 11 tests, 6 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Charts: `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `DonutChart`, `ScatterChart`, `SparkLine` | ✓ | ✓ (all seven in the ui barrel) | Match |
| Props: `BaseChartProps` (`series`, `height`, `showLegend`, `showGrid`, `showTooltip`, `ariaLabel`, `className`) + `smooth` / `strokeWidth` (Line), `smooth` / `fillOpacity` (Area), `radius` (Bar), `innerRadius` (Pie, Donut), `pointRadius` (Scatter); SparkLine `series` / `values`, `width`, `height`, `strokeWidth`, `smooth`, `filled`, `color`, `className`, `ariaLabel` | ✓ | ✓ (60 / 60, checked by hand: the extractor does not parse KuiReact's `index.ts` barrel) | Match |
| Types (`Series`, `SeriesPoint`, `BaseChartProps`, `TooltipDatum`, `PlotRect`, `AxisTick`), `_helpers` scale / path maths | ✓ | same code | Match |
| M3 stubs (`BubbleChart`, `HeatmapChart`, `TreemapChart`, `RadarChart`, `FunnelChart`, `SankeyChart`, `CandlestickChart`, `GaugeChart`) | render `null` | same | Match |
| Primitives `XAxis`, `YAxis`, `Grid`, `Legend`, `ChartTooltip`, `Crosshair`, `ResponsiveContainer` | ✓ | ✓ (`onLayout` instead of `ResizeObserver`) | Match (adapted) |
| `Brush` primitive | M4 stub (renders `null`) | not exported | Gap (stub only; no visible effect) |
| Palette / theme | `var(--primary)` … CSS-variable palette, `chartTheme`, `animationDuration` (0 under reduced motion) | same strings, resolved to the active theme's hex values at draw time (`resolveColor`); reduced motion from `AccessibilityInfo` | Match (adapted) |
| Tooltip / crosshair | band hover (`mousemove` / `mouseleave`) on cartesian charts, hover on wedges / points | touch and drag across the plot; tap a wedge or point (tap again to dismiss) | Adapted (no hover on touch) |
| Hover transitions | opacity / fill transitions (`animationDuration()` ms) | instant | Differs (visual only) |
| Legend | `role="list"` of colour dots + names | same, `list` / `listitem` | Match |
| Accessibility | every chart's `<svg role="img" aria-label>` (default "Line chart", "Pie chart", …) | Line / Area / Bar and SparkLine: accessible `img` view with the label; Pie / Donut / Scatter: label on the `Svg` only, no `img` role | Gap: role on the radial charts |
| Tests | 0 | 11 | Native-ahead |
| Showcase | LineChart, BarChart, AreaChart, PieChart, DonutChart, SparkLine | same titles and data | Match |
