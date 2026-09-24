// LineChart, AreaChart and BarChart — ported from KuiReact's
// charts/LineChart.tsx, AreaChart.tsx and BarChart.tsx. KuiReact repeats
// the same frame (padding, ticks, axes, grid, tooltip, legend) in each
// file; here that frame is shared by one `CartesianChart` and each chart
// only draws its shapes. Scale / path maths come from _helpers (KuiReact's,
// unchanged). Hover becomes touch (see primitives/plotTouchHandlers).

import type * as React from "react";
import { useMemo, useState } from "react";
import { View } from "react-native";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

import { cn } from "../../../../libs/utils/cn";

import { ChartTooltip, Crosshair, Grid, Legend, ResponsiveContainer, useChartColor, plotTouchHandlers, XAxis, YAxis } from "../primitives";
import { paletteColor } from "../theme";
import type { BaseChartProps, PlotRect, TooltipDatum } from "../types";
import { bandCenter, bandWidth, linePath, niceTicks, smoothPath, xCategories, yExtent, yScale } from "./_helpers";

const PADDING = { top: 12, right: 16, bottom: 28, left: 40 };

type Frame = {
  rect: PlotRect;
  categories: string[];
  min: number;
  max: number;
  hoverIndex: number | null;
  color: (c: string) => string;
};

function CartesianChart({
  series,
  height = 240,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  ariaLabel,
  defaultLabel,
  crosshair,
  className,
  draw,
}: BaseChartProps & { defaultLabel: string; crosshair: boolean; draw: (f: Frame) => React.ReactNode }) {
  const color = useChartColor();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const categories = useMemo(() => xCategories(series), [series]);
  const { min, max } = useMemo(() => yExtent(series), [series]);

  return (
    <View className={cn("w-full", className)}>
      <ResponsiveContainer height={height}>
        {({ width }) => {
          const rect: PlotRect = {
            x: PADDING.left,
            y: PADDING.top,
            width: Math.max(0, width - PADDING.left - PADDING.right),
            height: Math.max(0, height - PADDING.top - PADDING.bottom),
          };
          const tickValues = niceTicks(min, max, 4);
          const yPixels = tickValues.map((v) => yScale(v, min, max, rect));
          const xTicks = categories.map((label, i) => ({ position: bandCenter(i, categories.length, rect), label }));
          const yTicks = tickValues.map((v, i) => ({ position: yPixels[i], label: String(Math.round(v * 100) / 100) }));
          const hoverX = hoverIndex === null ? null : bandCenter(hoverIndex, categories.length, rect);
          const tooltipData: TooltipDatum[] =
            hoverIndex === null
              ? []
              : series.map((s, si) => ({ seriesId: s.id, seriesName: s.name, color: paletteColor(si, s.color), x: s.data[hoverIndex]?.x ?? "", y: s.data[hoverIndex]?.y ?? null }));
          const label = ariaLabel ?? defaultLabel;
          return (
            <>
              <View {...plotTouchHandlers(rect, categories.length, showTooltip, setHoverIndex)} accessible role="img" accessibilityLabel={label}>
                <Svg width={width} height={height}>
                  {showGrid ? <Grid rect={rect} yTicks={yPixels} /> : null}
                  <YAxis ticks={yTicks} x={rect.x} yStart={rect.y} yEnd={rect.y + rect.height} />
                  <XAxis ticks={xTicks} y={rect.y + rect.height} xStart={rect.x} xEnd={rect.x + rect.width} />
                  {crosshair ? <Crosshair rect={rect} x={hoverX} /> : null}
                  {draw({ rect, categories, min, max, hoverIndex, color })}
                </Svg>
              </View>
              {showTooltip && hoverIndex !== null && hoverX !== null ? (
                <ChartTooltip label={String(series[0]?.data[hoverIndex]?.x ?? "")} data={tooltipData} x={hoverX} y={rect.y + rect.height / 2} containerWidth={width} visible />
              ) : null}
            </>
          );
        }}
      </ResponsiveContainer>
      {showLegend ? <Legend series={series} /> : null}
    </View>
  );
}


type Point = { x: number; y: number } | null;
function project(series: BaseChartProps["series"], f: Frame) {
  return series.map((s, si) => ({
    id: s.id,
    color: f.color(paletteColor(si, s.color)),
    points: s.data.map((p, i): Point => (p.y === null || p.y === undefined ? null : { x: bandCenter(i, f.categories.length, f.rect), y: yScale(p.y, f.min, f.max, f.rect) })),
  }));
}

function HoverDot({ p, color, f }: { p: Point; color: string; f: Frame }) {
  if (!p) return null;
  return <Circle cx={p.x} cy={p.y} r={4} fill={f.color("var(--surface-base)")} stroke={color} strokeWidth={2} />;
}

export type LineChartProps = BaseChartProps & {
  /** Smooth Catmull-Rom-ish curves instead of straight segments. Default = true. */
  smooth?: boolean;
  /** Stroke width in pixels. Default = 2. */
  strokeWidth?: number;
};

export function LineChart({ smooth = true, strokeWidth = 2, ...props }: LineChartProps) {
  return (
    <CartesianChart
      {...props}
      defaultLabel="Line chart"
      crosshair
      draw={(f) =>
        project(props.series, f).map((p) => (
          <G key={p.id}>
            <Path testID={`chart-line-${p.id}`} d={smooth ? smoothPath(p.points) : linePath(p.points)} fill="none" stroke={p.color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            {f.hoverIndex !== null ? <HoverDot p={p.points[f.hoverIndex]} color={p.color} f={f} /> : null}
          </G>
        ))
      }
    />
  );
}

export type AreaChartProps = BaseChartProps & {
  smooth?: boolean;
  /** Translucent fill alpha (0..1). Default = 0.2. */
  fillOpacity?: number;
};

export function AreaChart({ smooth = true, fillOpacity = 0.2, ...props }: AreaChartProps) {
  return (
    <CartesianChart
      {...props}
      defaultLabel="Area chart"
      crosshair
      draw={(f) => {
        const baselineY = yScale(0, f.min, f.max, f.rect);
        return project(props.series, f).map((p) => {
          const path = smooth ? smoothPath(p.points) : linePath(p.points);
          const pts = p.points.filter(Boolean) as { x: number; y: number }[];
          const areaPath = pts.length > 1 ? `${path} L${pts[pts.length - 1].x} ${baselineY} L${pts[0].x} ${baselineY} Z` : "";
          return (
            <G key={p.id}>
              {areaPath ? <Path testID={`chart-area-${p.id}`} d={areaPath} fill={p.color} opacity={fillOpacity} /> : null}
              <Path d={path} fill="none" stroke={p.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              {f.hoverIndex !== null ? <HoverDot p={p.points[f.hoverIndex]} color={p.color} f={f} /> : null}
            </G>
          );
        });
      }}
    />
  );
}

export type BarChartProps = BaseChartProps & {
  /** Corner radius in pixels for each bar. Default = 4. */
  radius?: number;
};

export function BarChart({ radius = 4, ...props }: BarChartProps) {
  return (
    <CartesianChart
      {...props}
      defaultLabel="Bar chart"
      crosshair={false}
      draw={(f) => {
        const n = props.series.length;
        const groupWidth = bandWidth(f.categories.length, f.rect, 0.25);
        const barWidth = n > 0 ? groupWidth / n : 0;
        const baselineY = yScale(0, f.min, f.max, f.rect);
        return props.series.map((s, si) => {
          const fill = f.color(paletteColor(si, s.color));
          return (
            <G key={s.id}>
              {s.data.map((p, i) => {
                if (p.y === null || p.y === undefined) return null;
                const bx = bandCenter(i, f.categories.length, f.rect) - groupWidth / 2 + si * barWidth;
                const ty = yScale(p.y, f.min, f.max, f.rect);
                return (
                  <Rect
                    key={`${s.id}-${i}`}
                    testID="chart-bar"
                    x={bx}
                    y={Math.min(ty, baselineY)}
                    width={Math.max(0, barWidth - 2)}
                    height={Math.max(0, Math.abs(ty - baselineY))}
                    rx={Math.min(radius, barWidth / 2)}
                    fill={fill}
                    opacity={f.hoverIndex === null || f.hoverIndex === i ? 1 : 0.45}
                  />
                );
              })}
            </G>
          );
        });
      }}
    />
  );
}
