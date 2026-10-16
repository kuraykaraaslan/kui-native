// modules/ui/Chart/index.ts
//
// Public barrel for the Chart primitive library, ported from KuiReact's
// modules/ui/Chart: token-aware palette, primitives and seven charts drawn
// with react-native-svg, on KuiReact's settings surface (round value axes,
// thinned labels, a right axis, point marks, grouped stacks, thresholds,
// legend placement / values / toggling). KuiReact's Heatmap and Gauge (and
// its time axis) have no native counterpart yet: Heatmap and Gauge are
// stubs that render nothing here, like KuiReact's other M3 chart types.

export { LineChart, AreaChart, BarChart, barPath } from "./charts/Cartesian";
export type { LineChartProps, AreaChartProps, BarChartProps } from "./charts/Cartesian";
export { PieChart, DonutChart, ScatterChart, SparkLine, arcPath } from "./charts/Radial";
export type { PieChartProps, ScatterChartProps, SparkLineProps } from "./charts/Radial";
export { BubbleChart, HeatmapChart, TreemapChart, RadarChart, FunnelChart, SankeyChart, CandlestickChart, GaugeChart } from "./charts/Stubs";

export { XAxis, YAxis, Grid, Legend, ChartTooltip, Crosshair, ResponsiveContainer, ChartFrame, Thresholds, AxisTitles } from "./primitives";
export type { AxisTick } from "./primitives";
export { PointMark } from "./charts/_marks";

export { defaultPalette, paletteColor, resolveColor, chartTheme, animationDuration } from "./theme";
export type {
  Series,
  SeriesPoint,
  BaseChartProps,
  TooltipDatum,
  PlotRect,
  LineStyle,
  CurveType,
  LegendPosition,
  LegendValue,
  TooltipMode,
  ThresholdLine,
  AxisTextStyle,
  PointShape,
  CategoryMarker,
} from "./types";
export {
  niceStep,
  niceTicks,
  resolveDomain,
  alignedDomain,
  thinLabels,
  labelWidth,
  defaultNumber,
  stackKeys,
  groupedStackTops,
  topsExtent,
  stackedExtent,
  stackTops,
  linearRegression,
  pointPath,
  seriesStats,
  stepPath,
  curvePath,
  continuePath,
  dashArray,
  yScale,
  bandCenter,
  bandWidth,
  yExtent,
  xCategories,
  smoothPath,
  linePath,
} from "./charts/_helpers";
export { toTime, dayMonthText, clockText, formatTick, formatFull, dateCategoryLabels } from "./charts/_time";
