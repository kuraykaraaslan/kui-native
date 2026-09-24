// PieChart, DonutChart, ScatterChart and SparkLine — ported from KuiReact's
// charts/PieChart.tsx, DonutChart.tsx, ScatterChart.tsx and SparkLine.tsx.
// Arc / scale maths are KuiReact's. Hover becomes a tap on a wedge or
// point (tap again to dismiss).

import { useMemo, useState } from "react";
import { View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";

import { cn } from "../../../../libs/utils/cn";
import { configuredFontStyle } from "../../../../libs/utils/typography";

import { ChartTooltip, Grid, Legend, ResponsiveContainer, useChartColor, XAxis, YAxis } from "../primitives";
import { paletteColor } from "../theme";
import type { BaseChartProps, PlotRect, Series, TooltipDatum } from "../types";
import { linePath, niceTicks, smoothPath, yExtent, yScale } from "./_helpers";

/** Polar (cx, cy, r, angle°) → cartesian. */
function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/** SVG path for an annular wedge (a pie wedge when r0 is 0). */
export function arcPath(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number): string {
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  if (r0 <= 0) return `M${cx} ${cy} L${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} Z`;
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

export type PieChartProps = BaseChartProps & {
  /** Inner radius ratio (0 = pie, 0.6 = donut). Default = 0. */
  innerRadius?: number;
};

export function PieChart({ series, height = 240, showLegend = true, showTooltip = true, innerRadius = 0, ariaLabel, className }: PieChartProps) {
  const c = useChartColor();
  const [hover, setHover] = useState<number | null>(null);

  // The first series; each point is a wedge.
  const slices = useMemo(() => {
    const first = series[0];
    if (!first) return [] as { id: string; name: string; value: number; color: string }[];
    return first.data
      .filter((p) => p.y !== null && p.y !== undefined && p.y >= 0)
      .map((p, i) => ({ id: `${first.id}-${i}`, name: String(p.label ?? p.x), value: p.y as number, color: paletteColor(i, p.color) }));
  }, [series]);
  const total = slices.reduce((acc, s) => acc + s.value, 0) || 1;
  const legendSeries: Series[] = slices.map((s) => ({ id: s.id, name: s.name, data: [], color: s.color }));

  return (
    <View className={cn("w-full", className)}>
      <ResponsiveContainer height={height}>
        {({ width }) => {
          const cx = width / 2;
          const cy = height / 2;
          const radius = Math.max(0, Math.min(width, height) / 2 - 8);
          const r0 = innerRadius > 0 ? radius * innerRadius : 0;
          let cursor = 0;
          const wedges = slices.map((s) => {
            const a0 = (cursor / total) * 360;
            cursor += s.value;
            const a1 = (cursor / total) * 360;
            return { ...s, d: arcPath(cx, cy, r0, radius, a0, a1) };
          });
          const pct = hover === null ? 0 : Math.round((wedges[hover].value / total) * 100);
          const tooltip: TooltipDatum[] =
            hover === null ? [] : [{ seriesId: wedges[hover].id, seriesName: wedges[hover].name, color: wedges[hover].color, x: wedges[hover].name, y: wedges[hover].value }];
          return (
            <>
              <Svg width={width} height={height} accessibilityLabel={ariaLabel ?? "Pie chart"}>
                {wedges.map((w, i) => (
                  <Path
                    key={w.id}
                    testID="chart-wedge"
                    d={w.d}
                    fill={c(w.color)}
                    opacity={hover === null || hover === i ? 1 : 0.55}
                    onPress={showTooltip ? () => setHover((h) => (h === i ? null : i)) : undefined}
                  />
                ))}
                {r0 > 0 ? (
                  <SvgText x={cx} y={cy + 5} textAnchor="middle" fill={c("var(--text-primary)")} fontSize={14} fontWeight="600" {...configuredFontStyle("semiBold")}>
                    {hover === null ? String(Math.round(total)) : `${pct}%`}
                  </SvgText>
                ) : null}
              </Svg>
              {showTooltip && hover !== null ? <ChartTooltip label={wedges[hover].name} data={tooltip} x={cx} y={cy} containerWidth={width} visible /> : null}
            </>
          );
        }}
      </ResponsiveContainer>
      {showLegend ? <Legend series={legendSeries} /> : null}
    </View>
  );
}

/** Thin wrapper around PieChart with a non-zero inner radius. */
export function DonutChart({ innerRadius = 0.6, ...rest }: PieChartProps) {
  return <PieChart {...rest} innerRadius={innerRadius} />;
}

const PADDING = { top: 12, right: 16, bottom: 28, left: 40 };

export type ScatterChartProps = BaseChartProps & {
  /** Point radius in pixels. Default = 4. */
  pointRadius?: number;
};

export function ScatterChart({ series, height = 240, showLegend = true, showGrid = true, showTooltip = true, pointRadius = 4, ariaLabel, className }: ScatterChartProps) {
  const c = useChartColor();
  const [hover, setHover] = useState<{ si: number; pi: number } | null>(null);
  const xExt = useMemo(() => {
    let mn = Infinity;
    let mx = -Infinity;
    for (const s of series)
      for (const p of s.data) {
        const xv = typeof p.x === "number" ? p.x : Number(p.x);
        if (!isFinite(xv)) continue;
        mn = Math.min(mn, xv);
        mx = Math.max(mx, xv);
      }
    if (!isFinite(mn)) mn = 0;
    if (!isFinite(mx)) mx = 1;
    if (mn === mx) {
      mn -= 1;
      mx += 1;
    }
    return { min: mn, max: mx };
  }, [series]);
  const { min, max } = useMemo(() => yExtent(series), [series]);

  return (
    <View className={cn("w-full", className)}>
      <ResponsiveContainer height={height}>
        {({ width }) => {
          const rect: PlotRect = { x: PADDING.left, y: PADDING.top, width: Math.max(0, width - PADDING.left - PADDING.right), height: Math.max(0, height - PADDING.top - PADDING.bottom) };
          const xScale = (v: number) => rect.x + ((v - xExt.min) / (xExt.max - xExt.min)) * rect.width;
          const yTicks = niceTicks(min, max, 4).map((v) => ({ position: yScale(v, min, max, rect), label: String(Math.round(v * 100) / 100) }));
          const xTicks = niceTicks(xExt.min, xExt.max, 5).map((v) => ({ position: xScale(v), label: String(Math.round(v * 100) / 100) }));
          const hp = hover ? series[hover.si].data[hover.pi] : null;
          return (
            <>
              <Svg width={width} height={height} accessibilityLabel={ariaLabel ?? "Scatter chart"}>
                {showGrid ? <Grid rect={rect} yTicks={yTicks.map((t) => t.position)} /> : null}
                <YAxis ticks={yTicks} x={rect.x} yStart={rect.y} yEnd={rect.y + rect.height} />
                <XAxis ticks={xTicks} y={rect.y + rect.height} xStart={rect.x} xEnd={rect.x + rect.width} />
                {series.map((s, si) => (
                  <G key={s.id}>
                    {s.data.map((p, pi) => {
                      const xv = typeof p.x === "number" ? p.x : Number(p.x);
                      if (p.y === null || p.y === undefined || !isFinite(xv)) return null;
                      const active = hover?.si === si && hover?.pi === pi;
                      return (
                        <Circle
                          key={`${s.id}-${pi}`}
                          testID="chart-point"
                          cx={xScale(xv)}
                          cy={yScale(p.y, min, max, rect)}
                          r={active ? pointRadius + 2 : pointRadius}
                          fill={c(paletteColor(si, s.color))}
                          opacity={hover === null || active ? 0.85 : 0.4}
                          onPress={showTooltip ? () => setHover(active ? null : { si, pi }) : undefined}
                        />
                      );
                    })}
                  </G>
                ))}
              </Svg>
              {showTooltip && hover && hp ? (
                <ChartTooltip
                  label={String(hp.x)}
                  data={[{ seriesId: series[hover.si].id, seriesName: series[hover.si].name, color: paletteColor(hover.si, series[hover.si].color), x: hp.x, y: hp.y }]}
                  x={xScale(Number(hp.x))}
                  y={yScale(Number(hp.y ?? 0), min, max, rect)}
                  containerWidth={width}
                  visible
                />
              ) : null}
            </>
          );
        }}
      </ResponsiveContainer>
      {showLegend ? <Legend series={series} /> : null}
    </View>
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
