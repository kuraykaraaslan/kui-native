// modules/ui/Chart/index.ts
//
// Public barrel for the Chart primitive library, ported from KuiReact's
// modules/ui/Chart (M1): token-aware palette, primitives and seven basic
// charts drawn with react-native-svg. KuiReact's M3 chart types are stubs
// that render nothing; they are exported the same way here.

export { LineChart, AreaChart, BarChart } from "./charts/Cartesian";
export type { LineChartProps, AreaChartProps, BarChartProps } from "./charts/Cartesian";
export { PieChart, DonutChart, ScatterChart, SparkLine, arcPath } from "./charts/Radial";
export type { PieChartProps, ScatterChartProps, SparkLineProps } from "./charts/Radial";
export { BubbleChart, HeatmapChart, TreemapChart, RadarChart, FunnelChart, SankeyChart, CandlestickChart, GaugeChart } from "./charts/Stubs";

export { XAxis, YAxis, Grid, Legend, ChartTooltip, Crosshair, ResponsiveContainer } from "./primitives";
export type { AxisTick } from "./primitives";

export { defaultPalette, paletteColor, resolveColor, chartTheme, animationDuration } from "./theme";
export type { Series, SeriesPoint, BaseChartProps, TooltipDatum, PlotRect } from "./types";
export { niceTicks, yScale, bandCenter, bandWidth, yExtent, xCategories, smoothPath, linePath } from "./charts/_helpers";
