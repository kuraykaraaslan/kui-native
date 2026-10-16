// modules/ui/Chart/types.ts
//
// Shared type definitions for the modules/ui/Chart primitive library, kept
// in step with KuiReact's modules/ui/Chart/types.ts.
//
// All chart primitives below operate on the same `Series<T>` shape so a
// caller can swap chart types without rewriting data. Where KuiReact takes
// a CSS style object (legend text) KuiNative takes an RN `TextStyle`; the
// time-axis props (`xAxis="time"`, zoom, time zone) have no native chart yet.

import type { TextStyle } from "react-native";

export type SeriesPoint = {
  /** Categorical or numeric x value. Strings are placed on a band scale. */
  x: string | number;
  /** Numeric y value. `null` skips the point (line gaps, missing bars). */
  y: number | null;
  /** Optional override color (else picked from theme palette by series index). */
  color?: string;
  /** Free-form label override for tooltips / a11y. */
  label?: string;
};

export type Series = {
  /** Stable identifier; used for legend toggle and series lookup. */
  id: string;
  /** Human-readable label shown in the legend + tooltip. */
  name: string;
  /** Points in plotted order. */
  data: SeriesPoint[];
  /** Optional override color. Falls back to defaultPalette[seriesIndex]. */
  color?: string;
  /** Line / Area: stroke pattern. Default = 'solid'. */
  lineStyle?: LineStyle;
  /** Line / Area: stroke width in px. Default = the chart's `strokeWidth` (2). */
  strokeWidth?: number;
  /** Line / Area: draw a mark on every point. Default = false. */
  showPoints?: boolean;
  /** Area: this series' fill alpha (0..1), else the chart's. Line: a value above 0 fills under the line. */
  fillOpacity?: number;
  /** Starts toggled off; the viewer shows it from the legend (which then becomes interactive). */
  hidden?: boolean;
  /** Line / Area / Bar (vertical): the value axis this series is drawn against. Default = 'left'. */
  yAxis?: "left" | "right";
  /** Line / Area / Scatter: the point mark. Default = 'circle'. */
  pointShape?: PointShape;
  /** Line / Area / Scatter: the point mark's radius in px. Default = stroke width + 1.5 (line), the chart's (scatter). */
  pointSize?: number;
  /** Area (and a filled line): fade the fill from `fillOpacity` at the line to clear at the baseline. */
  fillGradient?: boolean;
  /**
   * Bar / Area: series with the same stack key stack on each other; different keys stand side by
   * side (bars) or overlap (areas). With the chart's `stacked`, series without a key share one stack.
   */
  stack?: string;
  /** Value text for this series' tooltip rows, legend values and value labels (else the chart's `yFormat`). */
  format?: (value: number) => string;
};

/** A stroke pattern. */
export type LineStyle = "solid" | "dashed" | "dotted";

/** A point mark. */
export type PointShape = "circle" | "square" | "diamond" | "triangle";

/** A vertical reference line on a category axis (a histogram's mean). `at` is a fractional band index: 0 = start of the first band, n = end of the last. */
export type CategoryMarker = {
  at: number;
  label?: string;
  color?: string;
  style?: LineStyle;
  width?: number;
};

/** How Line / Area connect points: curved, straight, or held until the next point (step-after). */
export type CurveType = "smooth" | "linear" | "step";

/** Where the legend sits relative to the plot. */
export type LegendPosition = "top" | "bottom" | "left" | "right";

/** Per-series statistics a legend can print next to each name. */
export type LegendValue = "latest" | "min" | "max" | "avg" | "total";

/** 'axis' = every series at the touched x; 'point' = the series nearest the finger; 'none' = off. */
export type TooltipMode = "axis" | "point" | "none";

/** A fixed reference line (a limit, a target) across the plot at a value. */
export type ThresholdLine = {
  value: number;
  label?: string;
  /** Any colour or theme token. Default = `var(--warning)`. */
  color?: string;
  style?: LineStyle;
  /** Stroke width in px. Default = 1. */
  width?: number;
  /** The value axis the line belongs to. Default = 'left'. */
  yAxis?: "left" | "right";
};

/** Text style for axis tick labels and axis titles (SVG text). */
export type AxisTextStyle = {
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  fontStyle?: "normal" | "italic";
};

/**
 * Common props every chart accepts. Individual chart components may extend
 * this with chart-specific options (e.g. `stacked` on BarChart).
 */
export type BaseChartProps = {
  /** Series array. At least one series is required for non-empty charts. */
  series: Series[];
  /** Optional fixed height (px). Default = 240. Width is 100% of parent. */
  height?: number;
  /** Show the legend strip below the chart. Default = true. */
  showLegend?: boolean;
  /** Show grid lines behind plotted shapes. Default = true. */
  showGrid?: boolean;
  /** Show the touch tooltip. Default = true. */
  showTooltip?: boolean;
  /** Optional accessibility label override for the chart. */
  ariaLabel?: string;
  /** Extra className applied to the outer container. */
  className?: string;
  /** Format a y tick / tooltip value (e.g. `(v) => v + '%'`). */
  yFormat?: (value: number) => string;
  /** Legend placement. Default = 'bottom'. */
  legendPosition?: LegendPosition;
  /** Statistics printed after each legend name. Default = none. */
  legendValues?: LegendValue[];
  /** Style for the legend text (font, colour). */
  legendStyle?: TextStyle;
  /** Legend entries are buttons that show/hide their series. Default = on when any series starts `hidden`. */
  legendToggle?: boolean;
  /** Fixed value-axis bounds; default = from the data (and thresholds). */
  yMin?: number;
  yMax?: number;
  /** Value-axis title. */
  yLabel?: string;
  /** Category / x axis title. */
  xLabel?: string;
  /** Reference lines across the plot. */
  thresholds?: ThresholdLine[];
  /** Tooltip behaviour. Default = 'axis' ('none' when `showTooltip` is false). */
  tooltipMode?: TooltipMode;
  /** Grid line colour. Default = the theme's grid token. */
  gridColor?: string;
  /** Axis tick label / title style. Default = the theme's axis text. */
  tickStyle?: AxisTextStyle;
  /** Take the parent's height (the parent must have a definite height); `height` is then the first-paint fallback. */
  fill?: boolean;
  /** The value axis always reaches zero (bars and areas need it; a line may span only its data). Default = true. */
  yIncludeZero?: boolean;
  /** About how many value-axis intervals to draw (the step stays a round number). Default = 4. */
  yTickCount?: number;
  /** Category / x axis tick labels. Default = true. */
  showXAxis?: boolean;
  /** Value axis tick labels. Default = true. */
  showYAxis?: boolean;
  /** Grid line pattern. Default = 'dashed'. */
  gridStyle?: LineStyle;
  /** Right value axis (series with `yAxis: 'right'`): fixed bounds, title and tick text. */
  y2Min?: number;
  y2Max?: number;
  y2Label?: string;
  y2Format?: (value: number) => string;
  /** The tooltip's heading (the category). Default = true. */
  tooltipHeader?: boolean;
  /** Tooltip value text, overriding the series' own format. */
  tooltipValueFormat?: (value: number, series: Series) => string;
  /** Stacked charts: a "Total" row in the tooltip. Default = false. */
  tooltipTotal?: boolean;
  /** Text style of value labels (bars, points). */
  valueLabelStyle?: AxisTextStyle;
};

/**
 * Tooltip payload passed to consumers wanting to customise rendering.
 * The default tooltip is `ChartTooltip` in primitives.
 */
export type TooltipDatum = {
  seriesId: string;
  seriesName: string;
  color: string;
  x: string | number;
  y: number | null;
  /** A ready-made value text that replaces `y` in the tooltip (`SeriesPoint.label` or the series' `format`). */
  valueLabel?: string;
};

/** Computed pixel rectangle of the plotting area (inside axes/padding). */
export type PlotRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
