// PieChart, DonutChart, ScatterChart and SparkLine, ported from KuiReact's charts/PieChart.tsx,
// DonutChart.tsx, ScatterChart.tsx and SparkLine.tsx. Arc / scale maths are KuiReact's.
// Pie / Donut: slice labels (percent / value / name / name and percent) inside or outside with
// a leader line, start angle, an even gap between slices, the donut centre (total + caption, or
// off), legend position / layout / values / toggling, the tooltip text. Scatter: round axes on
// both sides (`resolveDomain`), point shapes and opacity, a least-squares trend line, thresholds,
// axis titles and the shared legend surface. Hover becomes a tap on a wedge or point (tap again
// to dismiss).

import { useId, useMemo, useState } from "react";
import { View, type TextStyle } from "react-native";
import Svg, { ClipPath, Defs, G, Line, Path, Polyline, Rect, Text as SvgText } from "react-native-svg";

import { cn } from "../../../../libs/utils/cn";

import { AxisTitles, ChartFrame, ChartTooltip, Grid, Legend, ResponsiveContainer, svgFont, Thresholds, useChartColor, XAxis, YAxis } from "../primitives";
import { paletteColor } from "../theme";
import type { AxisTextStyle, BaseChartProps, LegendPosition, PlotRect, PointShape, Series, TooltipDatum } from "../types";
import { chartLegend, plotPadding, useSeriesVisibility, valueText } from "./_cartesian";
import { defaultNumber, linePath, linearRegression, niceTicks, resolveDomain, smoothPath, yExtent, yScale } from "./_helpers";
import { PointMark, ValueLabel } from "./_marks";

/** Polar (cx, cy, r, angle°) → cartesian. */
function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

const DEG = 180 / Math.PI;

/**
 * An annular wedge (r0 = 0: a pie slice) with an even `gap` px to its neighbours: both straight edges
 * are moved inward by gap / 2, so the gap is parallel-sided like a cut, not a tapering wedge.
 */
export function arcPath(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number, gap = 0): string {
  // A full circle cannot be one arc: split it.
  if (a1 - a0 >= 359.999) {
    if (r0 <= 0) return `M${cx} ${cy - r1} A${r1} ${r1} 0 1 1 ${cx} ${cy + r1} A${r1} ${r1} 0 1 1 ${cx} ${cy - r1} Z`;
    return `${arcPath(cx, cy, r0, r1, a0, a0 + 180)} ${arcPath(cx, cy, r0, r1, a0 + 180, a1 - 0.001)}`;
  }
  const half = gap / 2;
  const sweep = a1 - a0;
  const d1 = half > 0 ? Math.asin(Math.min(1, half / r1)) * DEG : 0;
  if (sweep - 2 * d1 <= 0.2) return "";
  const o0 = a0 + d1;
  const o1 = a1 - d1;
  const large = o1 - o0 > 180 ? 1 : 0;
  const [x0, y0] = polar(cx, cy, r1, o0);
  const [x1, y1] = polar(cx, cy, r1, o1);
  if (r0 <= 0) {
    // The apex sits on the bisector, gap / 2 from both edges.
    const halfRad = sweep / 2 / DEG;
    const apexR = half > 0 && sweep < 180 ? half / Math.sin(halfRad) : 0;
    const [px, py] = apexR > 0 ? polar(cx, cy, Math.min(apexR, r1 * 0.5), (a0 + a1) / 2) : [cx, cy];
    return `M${px} ${py} L${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} Z`;
  }
  const d0 = half > 0 ? Math.asin(Math.min(1, half / r0)) * DEG : 0;
  const i0 = a0 + d0;
  const i1 = a1 - d0;
  const [x2, y2] = polar(cx, cy, r0, Math.max(i0, i1));
  const [x3, y3] = polar(cx, cy, r0, Math.min(i0, i1));
  const largeIn = Math.abs(i1 - i0) > 180 ? 1 : 0;
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${largeIn} 0 ${x3} ${y3} Z`;
}

export type PieChartProps = Omit<BaseChartProps, "legendValues"> & {
  /** Inner radius ratio (0 = pie, 0.6 = donut). Default = 0. */
  innerRadius?: number;
  /** Text drawn on each slice. Default = 'none'. Slices under `minLabelShare` stay unlabelled. */
  labels?: "none" | "percent" | "value" | "name" | "name-percent";
  /** Labels inside the slice (default) or outside it with a leader line. */
  labelPosition?: "inside" | "outside";
  /** Slice label text style. */
  labelStyle?: AxisTextStyle;
  /** Smallest share (0..1) that gets a label. Default = 0.04. */
  minLabelShare?: number;
  /** Value text (tooltip, labels, legend, centre). Default = rounded number. */
  valueFormat?: (value: number) => string;
  /** Donut only: show the total (or the tapped share) in the centre. Default = true. */
  showCenter?: boolean;
  /** Donut only: a caption under the centre total, e.g. "Total". */
  centerLabel?: string;
  /** Text after each legend name. Default = 'none'. */
  legendValue?: "none" | "value" | "percent";
  legendPosition?: LegendPosition;
  legendStyle?: TextStyle;
  /** 'grid' lines legend entries up in columns (top / bottom). Default = 'wrap'. */
  legendLayout?: "wrap" | "grid";
  /** Legend entries hide / show their slice. Default = false (on when `hiddenSlices` is set). */
  legendToggle?: boolean;
  /** Slice names hidden at first. */
  hiddenSlices?: string[];
  /** Where the first slice starts, in degrees clockwise from 12 o'clock. Default = 0. */
  startAngle?: number;
  /** Pixels between slices (an even gap, whatever the background). Default = 0. */
  sliceGap?: number;
  /** What the tooltip prints for a slice. Default = 'both' (value and share). */
  tooltipValue?: "both" | "value" | "percent";
};

export function PieChart({
  series,
  height = 240,
  showLegend = true,
  showTooltip = true,
  innerRadius = 0,
  labels = "none",
  labelPosition = "inside",
  labelStyle,
  minLabelShare = 0.04,
  valueFormat,
  showCenter = true,
  centerLabel,
  legendValue = "none",
  legendPosition = "bottom",
  legendStyle,
  legendLayout = "wrap",
  legendToggle,
  hiddenSlices,
  tooltipMode,
  tooltipValue = "both",
  startAngle = 0,
  sliceGap = 0,
  fill,
  ariaLabel,
  className,
}: PieChartProps) {
  const c = useChartColor();
  const [hover, setHover] = useState<number | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(() => new Set(hiddenSlices ?? []));
  const fmt = valueFormat ?? defaultNumber;
  const tipOn = showTooltip && tooltipMode !== "none";

  // The first series; each point is a wedge.
  const all = useMemo(() => {
    const first = series[0];
    if (!first) return [] as { id: string; name: string; value: number; color: string }[];
    return first.data
      .filter((p) => p.y !== null && p.y !== undefined && p.y >= 0)
      .map((p, i) => ({ id: `${first.id}-${i}`, name: String(p.label ?? p.x), value: p.y as number, color: paletteColor(i, p.color) }));
  }, [series]);
  const slices = all.filter((s) => !hidden.has(s.name));
  const total = slices.reduce((acc, s) => acc + s.value, 0) || 1;
  const allTotal = all.reduce((acc, s) => acc + s.value, 0) || 1;
  const pctText = (v: number, t: number) => `${Math.round((v / t) * 100)}%`;

  // Synthetic per-slice series for the legend (one entry per slice).
  const legendSeries: Series[] = all.map((s) => ({ id: s.id, name: s.name, data: [], color: s.color }));
  const toggleable = legendToggle ?? (hiddenSlices?.length ?? 0) > 0;
  const legend =
    showLegend && legendSeries.length ? (
      <Legend
        series={legendSeries}
        position={legendPosition}
        style={legendStyle}
        layout={legendLayout}
        hiddenIds={new Set(all.filter((s) => hidden.has(s.name)).map((s) => s.id))}
        onToggle={
          toggleable
            ? (id) => {
                const name = all.find((s) => s.id === id)?.name;
                if (name === undefined) return;
                setHover(null);
                setHidden((prev) => {
                  const next = new Set(prev);
                  if (next.has(name)) next.delete(name);
                  else next.add(name);
                  return next;
                });
              }
            : undefined
        }
        values={legendValue === "none" ? undefined : Object.fromEntries(all.map((s) => [s.id, legendValue === "percent" ? pctText(s.value, hidden.has(s.name) ? allTotal : total) : fmt(s.value)]))}
      />
    ) : null;

  const labelOf = (w: { name: string; value: number }) =>
    labels === "percent" ? pctText(w.value, total) : labels === "value" ? fmt(w.value) : labels === "name" ? w.name : `${w.name} ${pctText(w.value, total)}`;

  return (
    <ChartFrame legend={legend} position={legendPosition} className={className} fill={fill}>
      <ResponsiveContainer height={height} fill={fill}>
        {({ width, height }) => {
          const outside = labels !== "none" && labelPosition === "outside";
          const longest = outside ? Math.max(0, ...slices.map((s) => labelOf(s).length)) : 0;
          const textRoom = outside ? longest * 6.4 + 22 : 0;
          const cx = width / 2;
          const cy = height / 2;
          const radius = Math.max(0, outside ? Math.min(width / 2 - textRoom, height / 2 - 18) : Math.min(width, height) / 2 - 4);
          const r0 = innerRadius > 0 ? radius * innerRadius : 0;

          let cursor = 0;
          const wedges = slices.map((s) => {
            const a0 = startAngle + (cursor / total) * 360;
            cursor += s.value;
            const a1 = startAngle + (cursor / total) * 360;
            return { ...s, a0, a1, d: arcPath(cx, cy, r0, radius, a0, a1, slices.length > 1 ? sliceGap : 0) };
          });
          const hv = hover !== null ? wedges[hover] : undefined;
          const tipText = (v: number) => (tooltipValue === "value" ? fmt(v) : tooltipValue === "percent" ? pctText(v, total) : `${fmt(v)} (${pctText(v, total)})`);
          const tooltipData: TooltipDatum[] = hv ? [{ seriesId: hv.id, seriesName: hv.name, color: hv.color, x: hv.name, y: hv.value, valueLabel: tipText(hv.value) }] : [];
          const labelR = r0 > 0 ? (r0 + radius) / 2 : radius * 0.64;
          const centreSize = Math.round(Math.max(14, Math.min(30, r0 * 0.42)));
          const labelSize = labelStyle?.fontSize ?? 11;
          // RN SVG has no dominant-baseline everywhere: centre the glyphs by hand (about 0.35 em).
          const mid = labelSize * 0.35;
          const [tx, ty] = hv ? polar(cx, cy, radius * 0.7, (hv.a0 + hv.a1) / 2) : [0, 0];

          return (
            <>
              <View accessible role="img" accessibilityLabel={ariaLabel ?? "Pie chart"}>
                <Svg width={width} height={height}>
                  {wedges.map((w, i) => (
                    <Path
                      key={w.id}
                      testID="chart-wedge"
                      d={w.d}
                      fill={c(w.color)}
                      opacity={hover === null || hover === i ? 1 : 0.5}
                      onPress={tipOn ? () => setHover((h) => (h === i ? null : i)) : undefined}
                    />
                  ))}
                  {labels !== "none"
                    ? wedges.map((w) => {
                        if ((w.a1 - w.a0) / 360 < minLabelShare) return null;
                        const angle = (w.a0 + w.a1) / 2;
                        const text = labelOf(w);
                        if (outside) {
                          const [ax, ay] = polar(cx, cy, radius + 2, angle);
                          const [bx, by] = polar(cx, cy, radius + 12, angle);
                          const right = bx >= cx;
                          const ex = bx + (right ? 8 : -8);
                          return (
                            <G key={`l-${w.id}`}>
                              <Polyline testID="chart-slice-leader" points={`${ax},${ay} ${bx},${by} ${ex},${by}`} fill="none" stroke={c(w.color)} strokeWidth={1} opacity={0.8} />
                              <ValueLabel testID="chart-slice-label" x={ex + (right ? 4 : -4)} y={by + mid} anchor={right ? "start" : "end"} style={{ color: "var(--text-primary)", ...labelStyle }}>
                                {text}
                              </ValueLabel>
                            </G>
                          );
                        }
                        const [lx, ly] = polar(cx, cy, labelR, angle);
                        return (
                          <ValueLabel key={`l-${w.id}`} testID="chart-slice-label" x={lx} y={ly + mid} style={{ fontWeight: 600, ...labelStyle }} onFill>
                            {text}
                          </ValueLabel>
                        );
                      })
                    : null}
                  {r0 > 0 && showCenter ? (
                    <>
                      <SvgText
                        testID="chart-center"
                        x={cx}
                        y={(centerLabel && !hv ? cy - centreSize * 0.32 : cy) + centreSize * 0.35}
                        textAnchor="middle"
                        fill={c("var(--text-primary)")}
                        fontSize={centreSize}
                        letterSpacing={-0.01 * centreSize}
                        {...svgFont("semiBold")}
                      >
                        {hv ? pctText(hv.value, total) : valueFormat ? fmt(total) : String(Math.round(total))}
                      </SvgText>
                      {centerLabel && !hv ? (
                        <SvgText x={cx} y={cy + centreSize * 0.62 + 11 * 0.35} textAnchor="middle" fill={c("var(--text-secondary)")} fontSize={11} {...svgFont("regular")}>
                          {centerLabel}
                        </SvgText>
                      ) : null}
                    </>
                  ) : null}
                </Svg>
              </View>
              {tipOn && hv ? <ChartTooltip label="" data={tooltipData} x={tx} y={ty} containerWidth={width} visible /> : null}
            </>
          );
        }}
      </ResponsiveContainer>
    </ChartFrame>
  );
}

/** Thin wrapper around PieChart with a non-zero inner radius. */
export function DonutChart({ innerRadius = 0.6, ...rest }: PieChartProps) {
  return <PieChart {...rest} innerRadius={innerRadius} />;
}

export type ScatterChartProps = BaseChartProps & {
  /** Point radius in pixels. Default = 4. */
  pointRadius?: number;
  /** Fixed x bounds; default = the data's extent. */
  xMin?: number;
  xMax?: number;
  /** Format an x tick / tooltip x value. */
  xFormat?: (value: number) => string;
  /** Point mark for series without their own. Default = 'circle'. */
  pointShape?: PointShape;
  /** Point fill opacity (0..1). Default = 0.85. */
  pointOpacity?: number;
  /** A least-squares line through each series. Default = false. */
  trendLine?: boolean;
  /** Trend line colour; default = the series'. */
  trendColor?: string;
};

export function ScatterChart({
  series,
  height = 240,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  pointRadius = 4,
  ariaLabel,
  className,
  yFormat,
  xFormat,
  xMin,
  xMax,
  yMin,
  yMax,
  xLabel,
  yLabel,
  thresholds,
  tooltipMode,
  legendPosition = "bottom",
  legendValues,
  legendStyle,
  legendToggle,
  gridColor,
  tickStyle,
  fill,
  yTickCount = 4,
  showXAxis = true,
  showYAxis = true,
  gridStyle,
  tooltipHeader = true,
  tooltipValueFormat,
  pointShape = "circle",
  pointOpacity = 0.85,
  trendLine = false,
  trendColor,
}: ScatterChartProps) {
  const c = useChartColor();
  const [hover, setHover] = useState<{ si: number; pi: number } | null>(null);
  const vis = useSeriesVisibility(series);
  const visible = vis.visible;
  const tipOn = showTooltip && tooltipMode !== "none";
  const fy = yFormat ?? defaultNumber;
  const fx = xFormat ?? defaultNumber;
  const clipId = `scatter-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Numeric x-extent across the visible series, widened to round bounds.
  const xExt = useMemo(() => {
    let mn = Infinity;
    let mx = -Infinity;
    for (const s of visible)
      for (const p of s.data) {
        const xv = typeof p.x === "number" ? p.x : Number(p.x);
        if (!isFinite(xv)) continue;
        if (xv < mn) mn = xv;
        if (xv > mx) mx = xv;
      }
    if (!isFinite(mn)) mn = 0;
    if (!isFinite(mx)) mx = 1;
    if (mn === mx) {
      mn -= 1;
      mx += 1;
    }
    return resolveDomain({ min: mn, max: mx }, { min: xMin, max: xMax, count: 5 });
  }, [visible, xMin, xMax]);

  // Unlike bars, a scatter's value axis need not start at zero: it spans the data.
  const base = useMemo(() => {
    const e = yExtent(visible);
    let lo = Infinity;
    let hi = -Infinity;
    for (const s of visible)
      for (const p of s.data) {
        if (typeof p.y !== "number" || !Number.isFinite(p.y)) continue;
        if (p.y < lo) lo = p.y;
        if (p.y > hi) hi = p.y;
      }
    if (!Number.isFinite(lo)) return e;
    if (lo === hi) return { min: lo - 1, max: hi + 1 };
    return { min: lo, max: hi };
  }, [visible]);
  const { min, max } = resolveDomain(base, { min: yMin, max: yMax, thresholds, count: yTickCount });

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
          const yVals = niceTicks(min, max, yTickCount);
          const yLabels = yVals.map(fy);
          const pad = plotPadding({ yTickLabels: yLabels, xLabel, yLabel, tickStyle, showXAxis, showYAxis });
          pad.right = Math.max(pad.right, 16);
          const rect: PlotRect = { x: pad.left, y: pad.top, width: Math.max(0, width - pad.left - pad.right), height: Math.max(0, height - pad.top - pad.bottom) };
          const xVals = niceTicks(xExt.min, xExt.max, Math.max(2, Math.min(5, Math.floor(rect.width / 70))));
          const xScale = (v: number) => rect.x + ((v - xExt.min) / (xExt.max - xExt.min)) * rect.width;
          const yPx = (v: number) => yScale(v, min, max, rect);
          const yTicks = yVals.map((v, i) => ({ position: yPx(v), label: yLabels[i] }));
          const xTicks = xVals.map((v) => ({ position: xScale(v), label: fx(v) }));
          const hs = hover ? visible[hover.si] : undefined;
          const hp = hs && hover ? hs.data[hover.pi] : undefined;
          const tooltipData: TooltipDatum[] =
            hs && hp
              ? [
                  {
                    seriesId: hs.id,
                    seriesName: hs.name,
                    color: hs.color,
                    x: hp.x,
                    y: hp.y,
                    valueLabel: hp.y === null ? undefined : tooltipValueFormat ? tooltipValueFormat(hp.y, hs) : valueText(hs, hp.y, hp, yFormat),
                  },
                ]
              : [];

          return (
            <>
              <View accessible role="img" accessibilityLabel={ariaLabel ?? "Scatter chart"}>
                <Svg width={width} height={height}>
                  <Defs>
                    <ClipPath id={clipId}>
                      <Rect x={rect.x - pointRadius} y={rect.y - pointRadius} width={rect.width + 2 * pointRadius} height={rect.height + 2 * pointRadius} />
                    </ClipPath>
                  </Defs>
                  {showGrid ? <Grid rect={rect} yTicks={yTicks.map((t) => t.position)} color={gridColor} lineStyle={gridStyle} /> : null}
                  <YAxis ticks={yTicks} x={rect.x} yStart={rect.y} yEnd={rect.y + rect.height} textStyle={tickStyle} hideLine tickMarks={false} showLabels={showYAxis} />
                  <XAxis ticks={xTicks} y={rect.y + rect.height} xStart={rect.x} xEnd={rect.x + rect.width} textStyle={tickStyle} tickMarks={false} showLabels={showXAxis} />
                  <AxisTitles rect={rect} height={height} xLabel={xLabel} yLabel={yLabel} style={tickStyle} />
                  <G clipPath={`url(#${clipId})`}>
                    <Thresholds lines={thresholds} rect={rect} scale={yPx} />
                    {trendLine
                      ? visible.map((s) => {
                          const pts = s.data.flatMap((p) => {
                            const xv = typeof p.x === "number" ? p.x : Number(p.x);
                            return p.y === null || p.y === undefined || !isFinite(xv) ? [] : [{ x: xv, y: p.y }];
                          });
                          const fit = linearRegression(pts);
                          if (!fit) return null;
                          const x0 = Math.min(...pts.map((p) => p.x));
                          const x1 = Math.max(...pts.map((p) => p.x));
                          return (
                            <Line
                              key={`trend-${s.id}`}
                              testID={`chart-trend-${s.id}`}
                              x1={xScale(x0)}
                              y1={yPx(fit.intercept + fit.slope * x0)}
                              x2={xScale(x1)}
                              y2={yPx(fit.intercept + fit.slope * x1)}
                              stroke={c(trendColor ?? s.color)}
                              strokeWidth={1.5}
                              strokeDasharray="6 4"
                              strokeLinecap="round"
                              opacity={0.9}
                            />
                          );
                        })
                      : null}
                    {visible.map((s, si) => (
                      <G key={s.id}>
                        {s.data.map((p, pi) => {
                          if (p.y === null || p.y === undefined) return null;
                          const xv = typeof p.x === "number" ? p.x : Number(p.x);
                          if (!isFinite(xv)) return null;
                          const active = hover?.si === si && hover?.pi === pi;
                          const r = s.pointSize ?? pointRadius;
                          const col = c(p.color ?? s.color);
                          return (
                            <PointMark
                              key={`${s.id}-${pi}`}
                              testID="chart-point"
                              shape={s.pointShape ?? pointShape}
                              x={xScale(xv)}
                              y={yPx(p.y)}
                              r={active ? r + 2 : r}
                              fill={col}
                              fillOpacity={hover === null || active ? pointOpacity : pointOpacity * 0.45}
                              stroke={col}
                              strokeOpacity={hover === null || active ? Math.min(1, pointOpacity + 0.15) : 0.3}
                              strokeWidth={1}
                              onPress={tipOn ? () => setHover(active ? null : { si, pi }) : undefined}
                            />
                          );
                        })}
                      </G>
                    ))}
                  </G>
                </Svg>
              </View>
              {tipOn && hp && tooltipData.length > 0 ? (
                <ChartTooltip label={tooltipHeader ? fx(Number(hp.x)) : ""} data={tooltipData} x={xScale(Number(hp.x))} y={yPx(Number(hp.y ?? 0))} containerWidth={width} visible />
              ) : null}
            </>
          );
        }}
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export type SparkLineProps = {
  series?: Series[];
  /** Shorthand single-series numeric array. */
  values?: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  smooth?: boolean;
  /** Fill below the line. Default = false. */
  filled?: boolean;
  /** Colour override. Default = `var(--primary)`. */
  color?: string;
  className?: string;
  ariaLabel?: string;
};

/** Inline mini line — no axes, grid or legend — for table cells and KPI cards. */
export function SparkLine({ series, values, width = 80, height = 24, strokeWidth = 1.5, smooth = true, filled = false, color, className, ariaLabel = "Sparkline" }: SparkLineProps) {
  const c = useChartColor();
  const resolved = useMemo<Series[]>(() => {
    if (series && series.length) return series;
    if (values && values.length) return [{ id: "spark", name: "spark", data: values.map((y, i) => ({ x: i, y })) }];
    return [];
  }, [series, values]);
  const { min, max } = useMemo(() => yExtent(resolved), [resolved]);
  const s = resolved[0];
  const w = width;

  let path = "";
  let areaPath = "";
  if (s && s.data.length) {
    const n = s.data.length;
    const points = s.data.map((p, i) =>
      p.y === null || p.y === undefined ? null : { x: n === 1 ? w / 2 : (i / (n - 1)) * (w - 2) + 1, y: max === min ? height / 2 : height - ((p.y - min) / (max - min)) * (height - 2) - 1 },
    );
    path = smooth ? smoothPath(points) : linePath(points);
    const pts = points.filter(Boolean) as { x: number; y: number }[];
    if (filled && pts.length > 1) areaPath = `${path} L${pts[pts.length - 1].x} ${height} L${pts[0].x} ${height} Z`;
  }
  const stroke = c(color ?? paletteColor(0, s?.color));

  return (
    <View accessible role="img" accessibilityLabel={ariaLabel} className={cn("self-center", className)} style={{ width, height }}>
      <Svg width={w} height={height}>
        {areaPath ? <Path testID="spark-area" d={areaPath} fill={stroke} opacity={0.15} /> : null}
        {path ? <Path testID="spark-line" d={path} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" /> : null}
      </Svg>
    </View>
  );
}
