// LineChart, AreaChart and BarChart, ported from KuiReact's charts/_SeriesChart.tsx (the one
// renderer behind Line and Area), LineChart.tsx, AreaChart.tsx and BarChart.tsx.
//
// Value axes widen to round bounds (`resolveDomain` + `niceTicks`, about `yTickCount`
// intervals); crowded category labels are thinned (`thinLabels`); a second value axis on the
// right (`yAxis: 'right'`, `y2Min` / `y2Max` / `y2Label` / `y2Format`) shares the left one's grid
// lines (`alignedDomain`). Line / Area: curve (smooth / linear / step), per-series stroke style,
// width, point marks (circle / square / diamond / triangle) and fill (flat or gradient), grouped
// stacks (`Series.stack`), value labels. Bar: grouped or stacked (several stacks by
// `Series.stack`), vertical or horizontal, end-rounded bars, bar width / gap, value labels,
// category ticks and markers. All: legend position / values / toggling, fixed bounds, axis
// titles, thresholds, tooltip mode / heading / total, grid colour and pattern, axis text style,
// `fill`. Hover becomes touch (see primitives/plotTouchHandlers).
//
// KuiNative has no time axis: KuiReact's `xAxis="time"` (drag-zoom) is not ported. ISO date
// categories on the band axis print the time axis' short text instead (`6 Oct`).

import { useId, useMemo, useState } from "react";
import { View } from "react-native";
import Svg, { ClipPath, Defs, G, Line, LinearGradient, Path, Rect, Stop } from "react-native-svg";

import {
  AxisTitles,
  ChartFrame,
  ChartTooltip,
  Crosshair,
  Grid,
  plotTouchHandlers,
  ResponsiveContainer,
  Thresholds,
  useChartColor,
  XAxis,
  YAxis,
} from "../primitives";
import { chartTheme } from "../theme";
import type { BaseChartProps, CategoryMarker, CurveType, PlotRect, PointShape, TooltipDatum } from "../types";
import { chartLegend, plotPadding, useSeriesVisibility, valueText } from "./_cartesian";
import {
  alignedDomain,
  bandCenter,
  continuePath,
  curvePath,
  dashArray,
  defaultNumber,
  groupedStackTops,
  labelWidth,
  niceTicks,
  resolveDomain,
  stackKeys,
  thinLabels,
  topsExtent,
  xCategories,
  yScale,
} from "./_helpers";
import { PointMark, ValueLabel } from "./_marks";
import { dateCategoryLabels } from "./_time";

type RightAxis = { min: number; max: number; ticks: number[] } | null;

/** Left / right value domains: right-axis series get their own, aligned to the left one's grid lines. */
function valueDomains(
  extentOf: (right: boolean) => { min: number; max: number },
  hasLeft: boolean,
  hasRight: boolean,
  p: Pick<BaseChartProps, "yMin" | "yMax" | "y2Min" | "y2Max" | "thresholds">,
  thrL: BaseChartProps["thresholds"],
  thrR: BaseChartProps["thresholds"],
  count: number,
) {
  const L = hasLeft
    ? resolveDomain(extentOf(false), { min: p.yMin, max: p.yMax, thresholds: thrL, count })
    : resolveDomain(extentOf(true), { min: p.y2Min, max: p.y2Max, thresholds: thrR, count });
  const ticks = niceTicks(L.min, L.max, count);
  let R: RightAxis = null;
  if (hasRight && hasLeft) {
    const e = extentOf(true);
    for (const t of thrR ?? []) {
      if (t.value < e.min) e.min = t.value;
      if (t.value > e.max) e.max = t.value;
    }
    R = alignedDomain(e, ticks.length - 1, { min: p.y2Min, max: p.y2Max });
  } else if (hasRight) {
    R = { min: L.min, max: L.max, ticks };
  }
  return { L, ticks, R };
}

/** Category tick text and tooltip headings: ISO dates shortened, everything else as given. */
function useCategoryText(categories: string[], locale?: string) {
  return useMemo(() => {
    const dates = dateCategoryLabels(categories, locale);
    return { ticks: dates?.ticks ?? categories, full: dates?.full ?? categories };
  }, [categories, locale]);
}

type SeriesChartProps = BaseChartProps & {
  variant: "line" | "area";
  /** Smooth curves. Default = true. `curve` wins when set. */
  smooth?: boolean;
  /** How points are joined. Default = 'smooth' ('linear' for a stacked area without an explicit curve). */
  curve?: CurveType;
  /** Default stroke width (px) for series without their own. Default = 2. */
  strokeWidth?: number;
  /** Area fill alpha (0..1) for series without their own. Default = 0.2. */
  fillOpacity?: number;
  /** Stack the series (see `Series.stack` for several stacks). */
  stacked?: boolean;
  /** Locale for date category labels; default = the runtime's. */
  locale?: string;
  /** Point mark for series without their own. Default = 'circle'. */
  pointShape?: PointShape;
  /** Point radius (px) for series without their own. Default = stroke width + 1.5. */
  pointSize?: number;
  /** Print each point's value (thinned so labels never collide). Default = false. */
  showValues?: boolean;
  /** Value labels above (default) or below their point. */
  valueLabelPosition?: "top" | "bottom";
};

function SeriesChart({
  series,
  variant,
  height = 240,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  smooth = true,
  curve: curveProp,
  strokeWidth = 2,
  fillOpacity = 0.2,
  stacked = false,
  yFormat,
  locale,
  ariaLabel,
  className,
  legendPosition = "bottom",
  legendValues,
  legendStyle,
  legendToggle,
  yMin,
  yMax,
  yLabel,
  xLabel,
  thresholds,
  tooltipMode,
  gridColor,
  tickStyle,
  fill,
  yTickCount = 4,
  showXAxis = true,
  showYAxis = true,
  gridStyle,
  y2Min,
  y2Max,
  y2Label,
  y2Format,
  tooltipHeader = true,
  tooltipValueFormat,
  tooltipTotal = false,
  valueLabelStyle,
  pointShape,
  pointSize,
  showValues = false,
  valueLabelPosition = "top",
  yIncludeZero = true,
}: SeriesChartProps) {
  const c = useChartColor();
  const tipMode = showTooltip ? (tooltipMode ?? "axis") : "none";
  const vis = useSeriesVisibility(series);
  const visible = vis.visible;
  const keys = useMemo(() => stackKeys(visible, stacked), [visible, stacked]);
  const isStacked = keys.some((k) => k !== null);
  const curve: CurveType = curveProp ?? (smooth && !isStacked ? "smooth" : "linear");
  const [hover, setHover] = useState<{ key: number; y: number } | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `sc-clip-${uid}`;
  const fmt = yFormat ?? defaultNumber;
  const fmt2 = y2Format ?? fmt;

  const categories = useMemo(() => xCategories(vis.colored), [vis.colored]);
  const catText = useCategoryText(categories, locale);
  const stack = useMemo(() => groupedStackTops(visible, keys), [visible, keys]);

  const onRight = visible.map((s) => s.yAxis === "right");
  const hasRight = onRight.some(Boolean);
  const hasLeft = onRight.some((r) => !r) || !hasRight;
  // A stack always starts at zero; otherwise the author decides.
  const extentOf = (right: boolean) => topsExtent(stack.tops.filter((_, i) => onRight[i] === right), yIncludeZero || isStacked);
  const thrL = thresholds?.filter((t) => t.yAxis !== "right");
  const thrR = thresholds?.filter((t) => t.yAxis === "right");
  const { L, ticks: leftTicks, R } = valueDomains(extentOf, hasLeft, hasRight, { yMin, yMax, y2Min, y2Max }, thrL, thrR, yTickCount);

  const legend = chartLegend({
    show: showLegend,
    series: vis.colored,
    hidden: vis.hidden,
    toggle: vis.toggle,
    position: legendPosition,
    values: legendValues,
    style: legendStyle,
    toggleable: legendToggle,
    yFormat,
  });
  const label = ariaLabel ?? (variant === "area" ? "Area chart" : "Line chart");

  return (
    <ChartFrame legend={legend} position={legendPosition} className={className} fill={fill}>
      <ResponsiveContainer height={height} fill={fill}>
        {({ width, height }) => {
          const yTickLabels = hasLeft ? leftTicks.map(fmt) : [];
          const y2TickLabels = R ? R.ticks.map(fmt2) : undefined;
          const pad = plotPadding({ yTickLabels, y2TickLabels, xLabel, yLabel, y2Label: R ? y2Label : undefined, tickStyle, showXAxis, showYAxis, minLeft: hasLeft ? 28 : 8 });
          const rect: PlotRect = { x: pad.left, y: pad.top, width: Math.max(0, width - pad.left - pad.right), height: Math.max(0, height - pad.top - pad.bottom) };
          const yPxL = (v: number) => yScale(v, L.min, L.max, rect);
          const yPxR = R ? (v: number) => yScale(v, R.min, R.max, rect) : yPxL;
          const scaleOf = (si: number) => (onRight[si] && hasLeft ? yPxR : yPxL);
          const xPx = (k: number) => bandCenter(k, categories.length, rect);
          const yPixels = leftTicks.map(yPxL);
          const yTicks = hasLeft ? leftTicks.map((_, i) => ({ position: yPixels[i], label: yTickLabels[i] })) : [];
          const y2Ticks = R ? R.ticks.map((v, i) => ({ position: yPxR(v), label: y2TickLabels![i] })) : [];
          const fontSize = typeof tickStyle?.fontSize === "number" ? tickStyle.fontSize : 11;
          const xTicks = thinLabels(
            catText.ticks.map((t, i) => ({ position: bandCenter(i, categories.length, rect), label: t })),
            rect.width,
            fontSize,
          );

          const plotY = (si: number, j: number, y: number) => scaleOf(si)(isStacked ? (stack.tops[si]?.[j] ?? 0) : y);
          const projected = visible.map((s, si) => {
            const color = c(s.color);
            const w = s.strokeWidth ?? strokeWidth;
            const scale = scaleOf(si);
            const pts = s.data.map((p, j) => (p.y === null || p.y === undefined ? null : { x: xPx(j), y: plotY(si, j, p.y), v: p.y, j }));
            const solid = pts.filter(Boolean) as { x: number; y: number; v: number; j: number }[];
            const opacity = variant === "area" ? (s.fillOpacity ?? fillOpacity) : (s.fillOpacity ?? 0);
            const baselineY = scale(Math.min(onRight[si] && R ? R.max : L.max, Math.max(onRight[si] && R ? R.min : L.min, 0)));
            let areaPath = "";
            if (opacity > 0 && solid.length > 1) {
              const top = curvePath(solid, curve);
              const under = stack.below[si];
              if (isStacked && under >= 0) {
                const lower = s.data
                  .map((p, j) => (p.y !== null && p.y !== undefined && stack.tops[under]?.[j] != null ? { x: xPx(j), y: scale(stack.tops[under][j] as number) } : null))
                  .filter(Boolean) as { x: number; y: number }[];
                areaPath = `${top} ${continuePath(lower.reverse(), curve, "before")} Z`;
              } else {
                areaPath = `${top} L${solid[solid.length - 1].x} ${baselineY} L${solid[0].x} ${baselineY} Z`;
              }
            }
            return {
              s,
              si,
              color,
              w,
              solid,
              opacity,
              areaPath,
              gradientId: s.fillGradient ? `sc-grad-${uid}-${si}` : null,
              path: curvePath(pts, curve),
              solo: solid.length === 1 ? solid[0] : null,
              shape: s.pointShape ?? pointShape ?? "circle",
              r: s.pointSize ?? pointSize ?? w + 1.5,
            };
          });

          // Value labels: every k-th point so neighbouring labels never collide.
          const labelTexts = showValues ? projected.map((p) => p.solid.map((q) => valueText(p.s, q.v, p.s.data[q.j], yFormat))) : [];
          const labelEvery = showValues
            ? projected.map((p, i) => {
                if (p.solid.length < 2) return 1;
                const room = Math.abs(p.solid[p.solid.length - 1].x - p.solid[0].x) / (p.solid.length - 1);
                return Math.max(1, Math.ceil((labelWidth(labelTexts[i]) + 8) / Math.max(1, room)));
              })
            : [];

          let anchor: number | null = null;
          let header = "";
          let tip: (TooltipDatum & { py: number })[] = [];
          if (hover && tipMode !== "none" && hover.key >= 0 && hover.key < categories.length) {
            anchor = hover.key;
            header = catText.full[hover.key];
            const at = anchor;
            tip = visible.map((s, si) => {
              const p = s.data[at];
              const y = p?.y ?? null;
              return {
                seriesId: s.id,
                seriesName: s.name,
                color: s.color,
                x: categories[at],
                y,
                valueLabel: y === null ? undefined : tooltipValueFormat ? tooltipValueFormat(y, s) : valueText(s, y, p, yFormat),
                py: y === null ? Number.NaN : plotY(si, at, y),
              };
            });
            if (tipMode === "point") {
              const near = tip.filter((d) => d.y !== null).sort((a, b) => Math.abs(a.py - hover.y) - Math.abs(b.py - hover.y))[0];
              tip = near ? [near] : [];
            }
          }
          const hoverX = anchor === null ? null : xPx(anchor);
          const total = tooltipTotal && isStacked && tip.length > 1 ? { label: "Total", value: fmt(tip.reduce((a, d) => a + (d.y ?? 0), 0)) } : undefined;

          return (
            <>
              <View
                {...plotTouchHandlers(rect, categories.length, tipMode !== "none", (i, at) => setHover(i === null ? null : { key: i, y: at?.y ?? 0 }))}
                accessible
                role="img"
                accessibilityLabel={label}
              >
                <Svg width={width} height={height}>
                  <Defs>
                    <ClipPath id={clipId}>
                      <Rect x={rect.x - 4} y={rect.y - 4} width={rect.width + 8} height={rect.height + 8} />
                    </ClipPath>
                    {projected.map((p) =>
                      p.gradientId ? (
                        <LinearGradient key={p.gradientId} id={p.gradientId} x1="0" y1="0" x2="0" y2="1">
                          <Stop offset="0" stopColor={p.color} stopOpacity={Math.min(1, p.opacity * 1.6)} />
                          <Stop offset="1" stopColor={p.color} stopOpacity={0} />
                        </LinearGradient>
                      ) : null,
                    )}
                  </Defs>
                  {showGrid ? <Grid rect={rect} yTicks={yPixels} color={gridColor} lineStyle={gridStyle} /> : null}
                  {hasLeft ? <YAxis ticks={yTicks} x={rect.x} yStart={rect.y} yEnd={rect.y + rect.height} textStyle={tickStyle} hideLine tickMarks={false} showLabels={showYAxis} /> : null}
                  {R ? (
                    <YAxis side="right" ticks={y2Ticks} x={rect.x + rect.width} yStart={rect.y} yEnd={rect.y + rect.height} textStyle={tickStyle} hideLine tickMarks={false} showLabels={showYAxis} />
                  ) : null}
                  <XAxis ticks={xTicks} y={rect.y + rect.height} xStart={rect.x} xEnd={rect.x + rect.width} textStyle={tickStyle} tickMarks={false} showLabels={showXAxis} />
                  <AxisTitles rect={rect} height={height} width={width} xLabel={xLabel} yLabel={yLabel} y2Label={R ? y2Label : undefined} style={tickStyle} />
                  <Crosshair rect={rect} x={tipMode === "none" ? null : hoverX} />
                  <G clipPath={`url(#${clipId})`}>
                    {projected.map((p) => (
                      <G key={p.s.id}>
                        {p.areaPath ? (
                          <Path
                            testID={`chart-area-${p.s.id}`}
                            d={p.areaPath}
                            fill={p.gradientId ? `url(#${p.gradientId})` : p.color}
                            opacity={p.gradientId ? undefined : p.opacity}
                          />
                        ) : null}
                        <Path
                          testID={`chart-line-${p.s.id}`}
                          d={p.path}
                          fill="none"
                          stroke={p.color}
                          strokeWidth={p.w}
                          strokeDasharray={dashArray(p.s.lineStyle, p.w)}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {p.s.showPoints
                          ? p.solid.map((q, i) => <PointMark key={i} testID="chart-point" shape={p.shape} x={q.x} y={q.y} r={p.r} fill={p.color} stroke={c("var(--surface-raised)")} strokeWidth={1} />)
                          : p.solo
                            ? <PointMark shape={p.shape} x={p.solo.x} y={p.solo.y} r={Math.max(3, p.r)} fill={p.color} />
                            : null}
                      </G>
                    ))}
                    {hasLeft ? <Thresholds lines={thrL} rect={rect} scale={yPxL} /> : null}
                    {R ? <Thresholds lines={hasLeft ? thrR : thresholds} rect={rect} scale={hasLeft ? yPxR : yPxL} /> : null}
                  </G>
                  {showValues
                    ? projected.map((p, pi) => (
                        <G key={`v-${p.s.id}`}>
                          {p.solid.map((q, i) => {
                            const last = p.solid.length - 1;
                            const every = labelEvery[pi];
                            if (!((i % every === 0 || i === last) && (i === last || last - i >= every))) return null;
                            const anchorAt = i === 0 && q.x - rect.x < 16 ? "start" : i === last && rect.x + rect.width - q.x < 16 ? "end" : "middle";
                            return (
                              <ValueLabel key={i} x={q.x} y={valueLabelPosition === "bottom" ? q.y + p.r + 13 : q.y - p.r - 5} anchor={anchorAt} style={valueLabelStyle}>
                                {labelTexts[pi][i]}
                              </ValueLabel>
                            );
                          })}
                        </G>
                      ))
                    : null}
                  {hoverX !== null
                    ? tip.map((d) => (Number.isFinite(d.py) ? <PointMark key={d.seriesId} x={hoverX} y={d.py} r={4} fill={c("var(--surface-raised)")} stroke={c(d.color)} strokeWidth={2} /> : null))
                    : null}
                </Svg>
              </View>
              {hoverX !== null && tip.length > 0 ? (
                <ChartTooltip label={tooltipHeader ? header : ""} data={tip} x={hoverX} y={rect.y + rect.height / 2} containerWidth={width} visible footer={total} />
              ) : null}
            </>
          );
        }}
      </ResponsiveContainer>
    </ChartFrame>
  );
}

type SeriesOptions = Pick<SeriesChartProps, "pointShape" | "pointSize" | "showValues" | "valueLabelPosition" | "locale">;

export type LineChartProps = BaseChartProps & {
  /** Smooth curves instead of straight segments. Default = true. `curve` wins when set. */
  smooth?: boolean;
  /** How points are joined: 'smooth' | 'linear' | 'step'. */
  curve?: CurveType;
  /** Stroke width in pixels. Default = 2. */
  strokeWidth?: number;
} & SeriesOptions;

export function LineChart(props: LineChartProps) {
  return <SeriesChart variant="line" {...props} />;
}

export type AreaChartProps = BaseChartProps & {
  /** Smooth curves between points. Default = true (straight when stacked). `curve` wins when set. */
  smooth?: boolean;
  /** How points are joined: 'smooth' | 'linear' | 'step'. */
  curve?: CurveType;
  /** Translucent fill alpha (0..1). Default = 0.2. A series' own `fillOpacity` wins. */
  fillOpacity?: number;
  /** Stack the areas. */
  stacked?: boolean;
  /** Stroke width in pixels. Default = 2. */
  strokeWidth?: number;
} & SeriesOptions;

export function AreaChart(props: AreaChartProps) {
  return <SeriesChart variant="area" {...props} />;
}

export type BarChartProps = BaseChartProps & {
  /** Corner radius in pixels at the end of each bar (the baseline end stays square). Default = 4. */
  radius?: number;
  /** Stack the series in one bar per category (see `Series.stack` for several stacks). */
  stacked?: boolean;
  /** 'vertical' (columns, default) or 'horizontal' (bars growing to the right). */
  orientation?: "vertical" | "horizontal";
  /** Print each bar's value. Default = false. */
  showValues?: boolean;
  /** Where value labels sit: past the bar's end (default), inside its end, or centred. */
  valueLabelPosition?: "outside" | "inside" | "center";
  /** Share of each category slot the bars take (0.05–1). Default = 0.75. */
  barWidth?: number;
  /** Pixels between the bars of one category. Default = 2. */
  barGap?: number;
  /** Ticks at fractional category positions instead of one per category (vertical bars). */
  categoryTicks?: { at: number; label: string }[];
  /** Category tick text. */
  xTickFormat?: (label: string, index: number) => string;
  /** Reference lines across the category axis (vertical bars). */
  markers?: CategoryMarker[];
};

/** A bar with only its far end rounded: `dir` is where the bar grows (up, down, right, left). */
export function barPath(x: number, y: number, w: number, h: number, r: number, dir: "up" | "down" | "right" | "left"): string {
  const rr = Math.max(0, Math.min(r, (dir === "up" || dir === "down" ? w : h) / 2, dir === "up" || dir === "down" ? h : w));
  if (rr <= 0) return `M${x} ${y}h${w}v${h}h${-w}Z`;
  if (dir === "up") return `M${x} ${y + h}V${y + rr}Q${x} ${y} ${x + rr} ${y}H${x + w - rr}Q${x + w} ${y} ${x + w} ${y + rr}V${y + h}Z`;
  if (dir === "down") return `M${x} ${y}V${y + h - rr}Q${x} ${y + h} ${x + rr} ${y + h}H${x + w - rr}Q${x + w} ${y + h} ${x + w} ${y + h - rr}V${y}Z`;
  if (dir === "right") return `M${x} ${y}H${x + w - rr}Q${x + w} ${y} ${x + w} ${y + rr}V${y + h - rr}Q${x + w} ${y + h} ${x + w - rr} ${y + h}H${x}Z`;
  return `M${x + w} ${y}H${x + rr}Q${x} ${y} ${x} ${y + rr}V${y + h - rr}Q${x} ${y + h} ${x + rr} ${y + h}H${x + w}Z`;
}

export function BarChart({
  series,
  height = 240,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  radius = 4,
  stacked = false,
  orientation = "vertical",
  showValues = false,
  valueLabelPosition = "outside",
  barWidth = 0.75,
  barGap = 2,
  categoryTicks,
  xTickFormat,
  markers,
  yFormat,
  ariaLabel,
  className,
  legendPosition = "bottom",
  legendValues,
  legendStyle,
  legendToggle,
  yMin,
  yMax,
  yLabel,
  xLabel,
  thresholds,
  tooltipMode,
  gridColor,
  tickStyle,
  fill,
  yTickCount = 4,
  showXAxis = true,
  showYAxis = true,
  gridStyle,
  y2Min,
  y2Max,
  y2Label,
  y2Format,
  tooltipHeader = true,
  tooltipValueFormat,
  tooltipTotal = false,
  valueLabelStyle,
}: BarChartProps) {
  const c = useChartColor();
  const [hover, setHover] = useState<{ index: number; along: number; pos: number } | null>(null);
  const vis = useSeriesVisibility(series);
  const visible = vis.visible;
  const horizontal = orientation === "horizontal";
  const tipMode = showTooltip ? (tooltipMode ?? "axis") : "none";
  const fmt = yFormat ?? defaultNumber;
  const fmt2 = y2Format ?? fmt;
  const clipId = `bar-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const categories = useMemo(() => xCategories(vis.colored), [vis.colored]);
  const catText = useCategoryText(categories);
  // Horizontal bars have one value axis: a right-axis series is drawn on it like the others.
  const axisSeries = useMemo(() => (horizontal ? visible.map((s) => ({ ...s, yAxis: undefined })) : visible), [horizontal, visible]);
  const keys = useMemo(() => stackKeys(axisSeries, stacked), [axisSeries, stacked]);
  const isStacked = keys.some((k) => k !== null);
  const stack = useMemo(() => groupedStackTops(axisSeries, keys), [axisSeries, keys]);
  const slotOf = useMemo(() => {
    const order: string[] = [];
    return keys
      .map((k, si) => {
        const id = k ?? `\u0000solo:${axisSeries[si].id}`;
        let at = order.indexOf(id);
        if (at < 0) {
          order.push(id);
          at = order.length - 1;
        }
        return at;
      })
      .map((at, _, all) => ({ at, count: Math.max(...all) + 1 }));
  }, [keys, axisSeries]);
  const slots = slotOf[0]?.count ?? 1;

  const onRight = axisSeries.map((s) => s.yAxis === "right");
  const hasRight = onRight.some(Boolean);
  const hasLeft = onRight.some((r) => !r) || !hasRight;
  const extentOf = (right: boolean) => topsExtent(stack.tops.filter((_, i) => onRight[i] === right));
  const thrL = thresholds?.filter((t) => t.yAxis !== "right" || horizontal);
  const thrR = horizontal ? [] : thresholds?.filter((t) => t.yAxis === "right");
  const { L, ticks: valueTicks, R } = valueDomains(extentOf, hasLeft, hasRight, { yMin, yMax, y2Min, y2Max }, thrL, thrR, yTickCount);

  const legend = chartLegend({
    show: showLegend,
    series: vis.colored,
    hidden: vis.hidden,
    toggle: vis.toggle,
    position: legendPosition,
    values: legendValues,
    style: legendStyle,
    toggleable: legendToggle,
    yFormat,
  });

  return (
    <ChartFrame legend={legend} position={legendPosition} className={className} fill={fill}>
      <ResponsiveContainer height={height} fill={fill}>
        {({ width, height }) => {
          const valueLabels = hasLeft ? valueTicks.map(fmt) : [];
          const y2Labels = R ? R.ticks.map(fmt2) : undefined;
          const catLabels = catText.ticks.map((t, i) => (xTickFormat ? xTickFormat(categories[i], i) : t));
          // The left axis carries values (vertical) or category names (horizontal).
          const pad = horizontal
            ? {
                ...plotPadding({ yTickLabels: catLabels, xLabel, yLabel, tickStyle, showXAxis: showYAxis, showYAxis: showXAxis }),
                right: 12 + (showValues && valueLabelPosition === "outside" ? labelWidth(valueTicks.map(fmt)) : 0),
              }
            : plotPadding({ yTickLabels: valueLabels, y2TickLabels: y2Labels, xLabel, yLabel, y2Label: R ? y2Label : undefined, tickStyle, showXAxis, showYAxis, minLeft: hasLeft ? 28 : 8 });
          if (!horizontal && showValues && valueLabelPosition === "outside") pad.top = Math.max(pad.top, 18);
          if (horizontal) pad.left = Math.min(pad.left, Math.max(40, width * 0.4));
          const rect: PlotRect = { x: pad.left, y: pad.top, width: Math.max(0, width - pad.left - pad.right), height: Math.max(0, height - pad.top - pad.bottom) };
          // Value → pixel along the value axis; category index → centre along the category axis.
          const lin = (lo: number, hi: number) => (horizontal ? (v: number) => (hi === lo ? rect.x : rect.x + ((v - lo) / (hi - lo)) * rect.width) : (v: number) => yScale(v, lo, hi, rect));
          const vPxL = lin(L.min, L.max);
          const vPxR = R ? lin(R.min, R.max) : vPxL;
          const scaleOf = (si: number) => (onRight[si] && hasLeft ? vPxR : vPxL);
          const catRect: PlotRect = horizontal ? { x: rect.y, y: rect.x, width: rect.height, height: rect.width } : rect;
          const step = categories.length ? catRect.width / categories.length : 0;
          const cPx = (i: number) => bandCenter(i, categories.length, catRect);
          const valuePixels = valueTicks.map(vPxL);
          const valueAxis = hasLeft ? valueTicks.map((_, i) => ({ position: valuePixels[i], label: valueLabels[i] })) : [];
          const y2Axis = R ? R.ticks.map((v, i) => ({ position: vPxR(v), label: y2Labels![i] })) : [];
          const catAxis = catLabels.map((t, i) => ({ position: cPx(i), label: t }));
          const catAxisX = thinLabels(
            categoryTicks ? categoryTicks.map((t) => ({ position: catRect.x + t.at * step, label: t.label })) : catAxis,
            rect.width,
            typeof tickStyle?.fontSize === "number" ? tickStyle.fontSize : 11,
          );

          const groupWidth = step * Math.min(1, Math.max(0.05, barWidth));
          const gap = slots > 1 ? Math.min(barGap, groupWidth / slots / 2) : 0;
          const thick = Math.max(1, (groupWidth - gap * (slots - 1)) / slots);

          const bars = axisSeries.map((s, si) =>
            s.data.map((p, i) => {
              if (p.y === null || p.y === undefined || i >= categories.length) return null;
              const vPx = scaleOf(si);
              const zero = vPx(Math.min(onRight[si] && R ? R.max : L.max, Math.max(onRight[si] && R ? R.min : L.min, 0)));
              const inStack = keys[si] !== null;
              const start = cPx(i) - groupWidth / 2 + slotOf[si].at * (thick + gap);
              const topV = inStack ? (stack.tops[si]?.[i] ?? 0) : p.y;
              const a = inStack ? vPx(topV - Math.max(0, p.y)) : zero;
              const b = vPx(topV);
              const lo = Math.min(a, b);
              const len = Math.abs(b - a);
              // The far end is rounded only on the top segment of a stack.
              const topOfStack = !inStack || !axisSeries.some((o, oi) => oi > si && keys[oi] === keys[si] && typeof o.data[i]?.y === "number" && (o.data[i].y as number) > 0);
              const negative = p.y < 0;
              const dir = horizontal ? (negative ? "left" : "right") : negative ? "down" : "up";
              const x = horizontal ? lo : start;
              const yy = horizontal ? start : lo;
              const w = horizontal ? len : thick;
              const h = horizontal ? thick : len;
              return { i, y: p.y, label: valueText(s, p.y, p, yFormat), from: a, end: b, mid: (a + b) / 2, negative, centre: start + thick / 2, d: barPath(x, yy, w, h, topOfStack ? radius : 0, dir), len };
            }),
          );

          // Value labels: thinned to every k-th category when they would collide.
          const longest = showValues ? Math.max(0, ...bars.flatMap((row) => row.map((b) => (b ? b.label.length : 0)))) : 0;
          const labelEvery = !showValues || horizontal || isStacked ? 1 : Math.max(1, Math.ceil((longest * 6.6 + 6) / Math.max(1, slots > 1 ? thick + gap : step)));

          let tip: TooltipDatum[] = [];
          if (hover && tipMode !== "none") {
            tip = visible.map((s) => {
              const p = s.data[hover.index];
              const y = p?.y ?? null;
              return {
                seriesId: s.id,
                seriesName: s.name,
                color: s.color,
                x: p?.x ?? "",
                y,
                valueLabel: y === null ? undefined : tooltipValueFormat ? tooltipValueFormat(y, s) : valueText(s, y, p, yFormat),
              };
            });
            if (tipMode === "point") {
              // Grouped: the bar under the finger along the category axis; stacked: the segment under it.
              const k = visible.findIndex((_, si) => {
                const b = bars[si][hover.index];
                if (!b) return false;
                const alongOk = hover.along >= b.centre - thick / 2 - gap / 2 && hover.along <= b.centre + thick / 2 + gap / 2;
                const posOk = hover.pos >= Math.min(b.from, b.end) - 1 && hover.pos <= Math.max(b.from, b.end) + 1;
                return keys[si] !== null ? alongOk && posOk : alongOk;
              });
              tip = k >= 0 && k < tip.length && tip[k].y !== null ? [tip[k]] : [];
            }
          }
          const hoverC = hover === null ? null : cPx(hover.index);
          const total = tooltipTotal && isStacked && tip.length > 1 ? { label: "Total", value: fmt(tip.reduce((a, d) => a + (d.y ?? 0), 0)) } : undefined;
          const header = hover ? (catText.full[hover.index] ?? "") : "";
          const onFill = valueLabelPosition !== "outside" || isStacked;
          const clipPad = showValues ? { x: 24, y: 18, w: horizontal ? 84 : 48, h: 19 } : { x: 1, y: 1, w: 2, h: 2 };

          return (
            <>
              <View
                {...plotTouchHandlers(
                  rect,
                  categories.length,
                  tipMode !== "none",
                  (i, at) => {
                    if (i === null || !at) return setHover(null);
                    setHover({ index: i, along: horizontal ? at.y : at.x, pos: horizontal ? at.x : at.y });
                  },
                  horizontal ? "y" : "x",
                )}
                accessible
                role="img"
                accessibilityLabel={ariaLabel ?? "Bar chart"}
              >
                <Svg width={width} height={height}>
                  <Defs>
                    <ClipPath id={clipId}>
                      <Rect x={rect.x - clipPad.x} y={rect.y - clipPad.y} width={rect.width + clipPad.w} height={rect.height + clipPad.h} />
                    </ClipPath>
                  </Defs>
                  {hoverC !== null && tip.length > 0 ? (
                    <Rect
                      testID="chart-band-highlight"
                      x={horizontal ? rect.x : hoverC - step / 2}
                      y={horizontal ? hoverC - step / 2 : rect.y}
                      width={horizontal ? rect.width : step}
                      height={horizontal ? step : rect.height}
                      fill={c("var(--text-secondary)")}
                      opacity={0.08}
                      rx={4}
                    />
                  ) : null}
                  {showGrid ? (
                    horizontal ? (
                      <Grid rect={rect} yTicks={[]} xTicks={valuePixels} color={gridColor} lineStyle={gridStyle} />
                    ) : (
                      <Grid rect={rect} yTicks={valuePixels} color={gridColor} lineStyle={gridStyle} />
                    )
                  ) : null}
                  {horizontal ? (
                    <>
                      <YAxis ticks={catAxis} x={rect.x} yStart={rect.y} yEnd={rect.y + rect.height} textStyle={tickStyle} tickMarks={false} showLabels={showXAxis} />
                      <XAxis ticks={valueAxis} y={rect.y + rect.height} xStart={rect.x} xEnd={rect.x + rect.width} textStyle={tickStyle} hideLine tickMarks={false} showLabels={showYAxis} />
                    </>
                  ) : (
                    <>
                      {hasLeft ? <YAxis ticks={valueAxis} x={rect.x} yStart={rect.y} yEnd={rect.y + rect.height} textStyle={tickStyle} hideLine tickMarks={false} showLabels={showYAxis} /> : null}
                      {R ? (
                        <YAxis side="right" ticks={y2Axis} x={rect.x + rect.width} yStart={rect.y} yEnd={rect.y + rect.height} textStyle={tickStyle} hideLine tickMarks={false} showLabels={showYAxis} />
                      ) : null}
                      <XAxis ticks={catAxisX} y={rect.y + rect.height} xStart={rect.x} xEnd={rect.x + rect.width} textStyle={tickStyle} tickMarks={false} showLabels={showXAxis} />
                    </>
                  )}
                  <AxisTitles rect={rect} height={height} width={width} xLabel={xLabel} yLabel={yLabel} y2Label={R ? y2Label : undefined} style={tickStyle} />
                  <G clipPath={`url(#${clipId})`}>
                    {axisSeries.map((s, si) => (
                      <G key={s.id}>
                        {bars[si].map((b) =>
                          b ? <Path key={`${s.id}-${b.i}`} testID="chart-bar" d={b.d} fill={c(s.color)} opacity={hover === null || hover.index === b.i ? 1 : 0.55} /> : null,
                        )}
                        {showValues
                          ? bars[si].map((b) => {
                              if (!b || b.i % labelEvery !== 0) return null;
                              const inside = valueLabelPosition === "inside";
                              const center = valueLabelPosition === "center" || (isStacked && valueLabelPosition === "outside");
                              if ((inside || center) && b.len < (horizontal ? b.label.length * 6.6 + 8 : 16)) return null;
                              const sign = b.negative ? -1 : 1;
                              let tx: number;
                              let ty: number;
                              let anchor: "start" | "middle" | "end" = "middle";
                              if (horizontal) {
                                ty = b.centre + 4;
                                if (center) tx = b.mid;
                                else if (inside) {
                                  tx = b.end - sign * 6;
                                  anchor = b.negative ? "start" : "end";
                                } else {
                                  tx = b.end + sign * 5;
                                  anchor = b.negative ? "end" : "start";
                                }
                              } else {
                                tx = b.centre;
                                if (center) ty = b.mid + 4;
                                else if (inside) ty = b.end + (b.negative ? -6 : 14);
                                else ty = b.end + (b.negative ? 13 : -5);
                              }
                              return (
                                <ValueLabel key={`v-${s.id}-${b.i}`} x={tx} y={ty} anchor={anchor} style={valueLabelStyle} onFill={onFill}>
                                  {b.label}
                                </ValueLabel>
                              );
                            })
                          : null}
                      </G>
                    ))}
                    {hasLeft ? <Thresholds lines={thrL} rect={rect} scale={vPxL} orientation={horizontal ? "vertical" : "horizontal"} /> : null}
                    {R && hasLeft ? <Thresholds lines={thrR} rect={rect} scale={vPxR} /> : null}
                  </G>
                  {!horizontal
                    ? markers?.map((m, k) => {
                        const x = catRect.x + m.at * step;
                        if (!Number.isFinite(x) || x < rect.x - 0.5 || x > rect.x + rect.width + 0.5) return null;
                        const color = m.color ?? "var(--text-primary)";
                        const w = m.width ?? 1.5;
                        const right = x < rect.x + rect.width - 70;
                        return (
                          <G key={k} testID={`chart-marker-${m.label ?? k}`}>
                            <Line x1={x} x2={x} y1={rect.y + (m.label ? 4 : 0)} y2={rect.y + rect.height} stroke={c(color)} strokeWidth={w} strokeDasharray={dashArray(m.style ?? "dashed", w)} strokeLinecap="round" />
                            {m.label ? (
                              <ValueLabel x={x + (right ? 5 : -5)} y={rect.y + 8 + k * 14} anchor={right ? "start" : "end"} style={{ color, fontSize: chartTheme.fontSize.axis }}>
                                {m.label}
                              </ValueLabel>
                            ) : null}
                          </G>
                        );
                      })
                    : null}
                </Svg>
              </View>
              {tip.length > 0 && hoverC !== null ? (
                <ChartTooltip
                  label={tooltipHeader ? header : ""}
                  data={tip}
                  x={horizontal ? rect.x + rect.width / 2 : hoverC + step / 2}
                  y={horizontal ? hoverC : rect.y + rect.height / 2}
                  containerWidth={width}
                  visible
                  footer={total}
                />
              ) : null}
            </>
          );
        }}
      </ResponsiveContainer>
    </ChartFrame>
  );
}
