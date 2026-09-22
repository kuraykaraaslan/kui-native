// Chart primitives, ported from KuiReact's modules/ui/Chart/primitives:
// ResponsiveContainer (onLayout instead of ResizeObserver), XAxis / YAxis,
// Grid, Crosshair (react-native-svg), Legend and the floating tooltip
// (RN views), plus `plotTouchHandlers` — the touch stand-in for KuiReact's
// mousemove / mouseleave band hover.

import type * as React from "react";
import { useState } from "react";
import { View, type GestureResponderEvent, type LayoutChangeEvent } from "react-native";
import { G, Line, Text as SvgText } from "react-native-svg";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "../../Text";
import { chartTheme, paletteColor, resolveColor } from "../theme";
import type { PlotRect, Series, TooltipDatum } from "../types";

export type AxisTick = { position: number; label: string };

/** Hook returning a colour resolver for the active theme. */
export function useChartColor() {
  const t = useThemeTokens();
  return (c: string) => resolveColor(c, t);
}

export function ResponsiveContainer({ height = 240, className, children }: { height?: number; className?: string; children: (size: { width: number; height: number }) => React.ReactNode }) {
  const [width, setWidth] = useState(0);
  return (
    <View testID="chart-container" className={cn("relative w-full", className)} style={{ height }} onLayout={(e: LayoutChangeEvent) => setWidth(Math.max(0, Math.floor(e.nativeEvent.layout.width)))}>
      {width > 0 ? children({ width, height }) : null}
    </View>
  );
}

export function XAxis({ ticks, y, xStart, xEnd, hideLine }: { ticks: AxisTick[]; y: number; xStart: number; xEnd: number; hideLine?: boolean }) {
  const c = useChartColor();
  return (
    <G>
      {!hideLine ? <Line x1={xStart} x2={xEnd} y1={y} y2={y} stroke={c(chartTheme.axisStroke)} strokeWidth={1} /> : null}
      {ticks.map((t, i) => (
        <G key={`x-${i}`}>
          <Line x1={t.position} x2={t.position} y1={y} y2={y + 4} stroke={c(chartTheme.axisStroke)} strokeWidth={1} />
          <SvgText x={t.position} y={y + 16} textAnchor="middle" fontSize={chartTheme.fontSize.axis} fill={c(chartTheme.axisText)}>
            {t.label}
          </SvgText>
        </G>
      ))}
    </G>
  );
}

export function YAxis({ ticks, x, yStart, yEnd, hideLine }: { ticks: AxisTick[]; x: number; yStart: number; yEnd: number; hideLine?: boolean }) {
  const c = useChartColor();
  return (
    <G>
      {!hideLine ? <Line x1={x} x2={x} y1={yStart} y2={yEnd} stroke={c(chartTheme.axisStroke)} strokeWidth={1} /> : null}
      {ticks.map((t, i) => (
        <G key={`y-${i}`}>
          <Line x1={x - 4} x2={x} y1={t.position} y2={t.position} stroke={c(chartTheme.axisStroke)} strokeWidth={1} />
          <SvgText x={x - 8} y={t.position + 4} textAnchor="end" fontSize={chartTheme.fontSize.axis} fill={c(chartTheme.axisText)}>
            {t.label}
          </SvgText>
        </G>
      ))}
    </G>
  );
}

export function Grid({ rect, yTicks, xTicks = [] }: { rect: PlotRect; yTicks: number[]; xTicks?: number[] }) {
  const c = useChartColor();
  const stroke = c(chartTheme.gridStroke);
  return (
    <G opacity={0.5}>
      {yTicks.map((y, i) => (
        <Line key={`gy-${i}`} x1={rect.x} x2={rect.x + rect.width} y1={y} y2={y} stroke={stroke} strokeDasharray="2 4" strokeWidth={1} />
      ))}
      {xTicks.map((x, i) => (
        <Line key={`gx-${i}`} x1={x} x2={x} y1={rect.y} y2={rect.y + rect.height} stroke={stroke} strokeDasharray="2 4" strokeWidth={1} />
      ))}
    </G>
  );
}

export function Crosshair({ rect, x, y, showHorizontal }: { rect: PlotRect; x: number | null; y?: number | null; showHorizontal?: boolean }) {
  const c = useChartColor();
  if (x === null) return null;
  const stroke = c(chartTheme.crosshair);
  return (
    <G>
      <Line x1={x} x2={x} y1={rect.y} y2={rect.y + rect.height} stroke={stroke} strokeWidth={1} strokeDasharray="3 3" />
      {showHorizontal && y !== null && y !== undefined ? <Line x1={rect.x} x2={rect.x + rect.width} y1={y} y2={y} stroke={stroke} strokeWidth={1} strokeDasharray="3 3" /> : null}
    </G>
  );
}

export function Legend({ series, className }: { series: Series[]; className?: string }) {
  const c = useChartColor();
  if (!series.length) return null;
  return (
    <View role="list" className={cn("mt-3 flex-row flex-wrap items-center gap-x-4 gap-y-1.5", className)}>
      {series.map((s, i) => (
        <View key={s.id} role="listitem" className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c(paletteColor(i, s.color)), borderWidth: 1, borderColor: c(chartTheme.legendSwatchBorder) }} />
          <Text className="text-text-secondary" style={{ fontSize: chartTheme.fontSize.legend }}>
            {s.name}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function ChartTooltip({ label, data, x, y, containerWidth, visible, className }: { label: string; data: TooltipDatum[]; x: number; y: number; containerWidth: number; visible: boolean; className?: string }) {
  const c = useChartColor();
  const [h, setH] = useState(0);
  if (!visible || !data.length) return null;
  // KuiReact's naive overflow flip keeps the tooltip on-screen on the right edge.
  const flip = x > containerWidth - 160;
  return (
    <View
      testID="chart-tooltip"
      pointerEvents="none"
      onLayout={(e) => setH(e.nativeEvent.layout.height)}
      className={cn("absolute z-10 min-w-[140px] rounded-md border px-3 py-2 shadow-md", className)}
      style={[
        { top: y - h / 2, backgroundColor: c(chartTheme.tooltipBg), borderColor: c(chartTheme.tooltipBorder) },
        flip ? { right: containerWidth - x + 12 } : { left: x + 12 },
      ]}
    >
      <Text className="mb-1 text-xs font-semibold" style={{ color: c(chartTheme.tooltipText) }}>
        {label}
      </Text>
      <View className="gap-0.5">
        {data.map((d) => (
          <View key={d.seriesId} className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-sm" style={{ backgroundColor: c(d.color) }} />
            <Text style={{ color: c(chartTheme.tooltipMutedText), fontSize: chartTheme.fontSize.tooltip }}>{d.seriesName}</Text>
            <Text className="ml-auto font-medium" style={{ color: c(chartTheme.tooltipText), fontSize: chartTheme.fontSize.tooltip, fontVariant: ["tabular-nums"] }}>
              {d.y === null ? "—" : String(d.y)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * Touch stand-in for KuiReact's band hover: touching or dragging across the
 * plot selects the band under the finger; the tooltip stays until the
 * reader taps outside the plot area.
 */
export function plotTouchHandlers(rect: PlotRect, bands: number, enabled: boolean, onIndex: (i: number | null) => void) {
  const pick = (e: GestureResponderEvent) => {
    if (!enabled || bands === 0) return;
    const localX = e.nativeEvent.locationX - rect.x;
    if (localX < 0 || localX > rect.width) {
      onIndex(null);
      return;
    }
    onIndex(Math.min(bands - 1, Math.max(0, Math.floor(localX / (rect.width / bands)))));
  };
  return {
    onStartShouldSetResponder: () => enabled,
    onMoveShouldSetResponder: () => enabled,
    onResponderGrant: pick,
    onResponderMove: pick,
    onResponderTerminationRequest: () => true,
  };
}
