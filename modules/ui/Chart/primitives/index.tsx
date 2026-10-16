// Chart primitives, ported from KuiReact's modules/ui/Chart/primitives:
// ResponsiveContainer (onLayout instead of ResizeObserver; `fill` takes the
// parent's height), XAxis / YAxis (text style, optional tick marks and
// labels, a right-hand axis), Grid (dashed / dotted / solid), Crosshair,
// AxisTitles and Thresholds (react-native-svg), plus Legend, ChartFrame and
// the floating tooltip (RN views), and `plotTouchHandlers`, the touch
// stand-in for KuiReact's mousemove / mouseleave band hover.

import type * as React from "react";
import { useState } from "react";
import { Pressable, View, type GestureResponderEvent, type LayoutChangeEvent, type TextStyle } from "react-native";
import { G, Line, Rect, Text as SvgText } from "react-native-svg";

import { useThemeTokens } from "../../../../libs/theme";
import { cn } from "../../../../libs/utils/cn";
import { configuredFontStyle, FONT_WEIGHTS, fontWeightName, type FontWeightName } from "../../../../libs/utils/typography";

import { Text } from "../../Text";
import { dashArray } from "../charts/_helpers";
import { chartTheme, paletteColor, resolveColor } from "../theme";
import type { AxisTextStyle, LegendPosition, LineStyle, PlotRect, Series, ThresholdLine, TooltipDatum } from "../types";

export type AxisTick = { position: number; label: string };

/** Hook returning a colour resolver for the active theme. */
export function useChartColor() {
  const t = useThemeTokens();
  return (c: string) => resolveColor(c, t);
}

/** SVG font props for a weight: the numeric weight, then the configured family (which may reset it). */
export function svgFont(weight: FontWeightName = "regular") {
  return { fontWeight: FONT_WEIGHTS[weight], ...configuredFontStyle(weight) };
}

/** SVG text props for an axis text style (unset parts follow the theme), colours resolved. */
export function axisTextProps(style: AxisTextStyle | undefined, c: (color: string) => string) {
  const weight = fontWeightName(style?.fontWeight) ?? "regular";
  return {
    ...(style?.fontWeight !== undefined ? svgFont(weight) : configuredFontStyle(weight)),
    fontSize: style?.fontSize ?? chartTheme.fontSize.axis,
    fill: c(style?.color ?? chartTheme.axisText),
    ...(style?.fontFamily ? { fontFamily: style.fontFamily } : {}),
    ...(style?.fontStyle ? { fontStyle: style.fontStyle } : {}),
  };
}

export function ResponsiveContainer({
  height = 240,
  fill = false,
  className,
  children,
}: {
  /** Fixed height in pixels; width tracks the parent. With `fill`, the fallback before the first measure. */
  height?: number;
  /** Take the parent's height. */
  fill?: boolean;
  className?: string;
  children: (size: { width: number; height: number }) => React.ReactNode;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const next = { width: Math.max(0, Math.floor(e.nativeEvent.layout.width)), height: Math.max(0, Math.floor(e.nativeEvent.layout.height)) };
    setSize((prev) => (prev.width === next.width && prev.height === next.height ? prev : next));
  };
  const h = fill ? (size.height > 0 ? size.height : height) : height;
  return (
    <View testID="chart-container" className={cn("relative w-full", fill && "min-h-0 flex-1", className)} style={fill ? { minHeight: 80 } : { height }} onLayout={onLayout}>
      {size.width > 0 ? children({ width: size.width, height: h }) : null}
    </View>
  );
}

type XAxisProps = {
  ticks: AxisTick[];
  y: number;
  xStart: number;
  xEnd: number;
  hideLine?: boolean;
  /** Tick label style. Default = the theme's axis text. */
  textStyle?: AxisTextStyle;
  /** Short tick marks under the line. Default = true. */
  tickMarks?: boolean;
  /** Tick labels. Default = true. */
  showLabels?: boolean;
};

export function XAxis({ ticks, y, xStart, xEnd, hideLine, textStyle, tickMarks = true, showLabels = true }: XAxisProps) {
  const c = useChartColor();
  const text = axisTextProps(textStyle, c);
  return (
    <G>
      {!hideLine ? <Line x1={xStart} x2={xEnd} y1={y} y2={y} stroke={c(chartTheme.axisStroke)} strokeWidth={1} /> : null}
      {ticks.map((t, i) => (
        <G key={`x-${i}`}>
          {tickMarks ? <Line x1={t.position} x2={t.position} y1={y} y2={y + 4} stroke={c(chartTheme.axisStroke)} strokeWidth={1} /> : null}
          {showLabels && t.label ? (
            <SvgText x={t.position} y={y + 16} textAnchor="middle" {...text}>
              {t.label}
            </SvgText>
          ) : null}
        </G>
      ))}
    </G>
  );
}

type YAxisProps = {
  ticks: AxisTick[];
  x: number;
  yStart: number;
  yEnd: number;
  hideLine?: boolean;
  textStyle?: AxisTextStyle;
  /** Short tick marks beside the line. Default = true. */
  tickMarks?: boolean;
  /** Tick labels. Default = true. */
  showLabels?: boolean;
  /** 'right' puts the labels to the right of `x` (a second value axis). Default = 'left'. */
  side?: "left" | "right";
};

export function YAxis({ ticks, x, yStart, yEnd, hideLine, textStyle, tickMarks = true, showLabels = true, side = "left" }: YAxisProps) {
  const c = useChartColor();
  const text = axisTextProps(textStyle, c);
  const dir = side === "right" ? 1 : -1;
  return (
    <G>
      {!hideLine ? <Line x1={x} x2={x} y1={yStart} y2={yEnd} stroke={c(chartTheme.axisStroke)} strokeWidth={1} /> : null}
      {ticks.map((t, i) => (
        <G key={`y-${i}`}>
          {tickMarks ? <Line x1={x + dir * 4} x2={x} y1={t.position} y2={t.position} stroke={c(chartTheme.axisStroke)} strokeWidth={1} /> : null}
          {showLabels && t.label ? (
            <SvgText x={x + dir * 8} y={t.position + 4} textAnchor={side === "right" ? "start" : "end"} {...text}>
              {t.label}
            </SvgText>
          ) : null}
        </G>
      ))}
    </G>
  );
}

const GRID_DASH: Record<LineStyle, string | undefined> = { dashed: "3 4", dotted: "1 3", solid: undefined };

export function Grid({
  rect,
  yTicks,
  xTicks = [],
  color = chartTheme.gridStroke,
  lineStyle = "dashed",
}: {
  rect: PlotRect;
  yTicks: number[];
  xTicks?: number[];
  /** Line colour. Default = the theme's grid token. */
  color?: string;
  /** Line pattern. Default = 'dashed'. */
  lineStyle?: LineStyle;
}) {
  const c = useChartColor();
  const stroke = c(color);
  const dash = GRID_DASH[lineStyle];
  return (
    <G testID={`chart-grid-${lineStyle}`}>
      {yTicks.map((y, i) => (
        <Line key={`gy-${i}`} x1={rect.x} x2={rect.x + rect.width} y1={y} y2={y} stroke={stroke} strokeDasharray={dash} strokeWidth={1} />
      ))}
      {xTicks.map((x, i) => (
        <Line key={`gx-${i}`} x1={x} x2={x} y1={rect.y} y2={rect.y + rect.height} stroke={stroke} strokeDasharray={dash} strokeWidth={1} />
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

/** Axis titles: the y title runs up the left edge, `y2Label` down the right one, the x title sits centred under the ticks. */
export function AxisTitles({
  rect,
  height,
  width,
  xLabel,
  yLabel,
  y2Label,
  style,
}: {
  rect: PlotRect;
  height: number;
  width?: number;
  xLabel?: string;
  yLabel?: string;
  y2Label?: string;
  style?: AxisTextStyle;
}) {
  const c = useChartColor();
  if (!xLabel && !yLabel && !y2Label) return null;
  const text = axisTextProps(style, c);
  const cy = rect.y + rect.height / 2;
  // RN SVG has no dominant-baseline everywhere: centre the glyphs by hand (about 0.35 em).
  const mid = text.fontSize * 0.35;
  return (
    <G>
      {yLabel ? (
        <SvgText x={12} y={cy + mid} rotation={-90} origin={`12, ${cy}`} textAnchor="middle" {...text}>
          {yLabel}
        </SvgText>
      ) : null}
      {y2Label && width !== undefined ? (
        <SvgText x={width - 12} y={cy + mid} rotation={90} origin={`${width - 12}, ${cy}`} textAnchor="middle" {...text}>
          {y2Label}
        </SvgText>
      ) : null}
      {xLabel ? (
        <SvgText x={rect.x + rect.width / 2} y={height - 4} textAnchor="middle" {...text}>
          {xLabel}
        </SvgText>
      ) : null}
    </G>
  );
}

/** Reference lines at fixed values across the plot; 'vertical' draws them at x values (horizontal bars). */
export function Thresholds({ lines, rect, scale, orientation = "horizontal" }: { lines?: ThresholdLine[]; rect: PlotRect; scale: (value: number) => number; orientation?: "horizontal" | "vertical" }) {
  const c = useChartColor();
  if (!lines?.length) return null;
  return (
    <G testID="chart-thresholds">
      {lines.map((t, i) => {
        if (typeof t?.value !== "number" || !Number.isFinite(t.value)) return null;
        const p = scale(t.value);
        const inside = orientation === "horizontal" ? p >= rect.y - 0.5 && p <= rect.y + rect.height + 0.5 : p >= rect.x - 0.5 && p <= rect.x + rect.width + 0.5;
        if (!inside) return null;
        const color = c(t.color ?? "var(--warning)");
        const width = t.width ?? 1;
        const line = orientation === "horizontal" ? { x1: rect.x, x2: rect.x + rect.width, y1: p, y2: p } : { x1: p, x2: p, y1: rect.y, y2: rect.y + rect.height };
        let label: React.ReactNode = null;
        if (t.label) {
          // A small tinted pill, opaque so it reads over bars and lines; above the line, or below near the top.
          // KuiReact mixes 14% of the colour into the raised surface; here a 14% layer over that surface.
          const w = Math.ceil(t.label.length * 6.2) + 12;
          const h = 16;
          const px = orientation === "horizontal" ? rect.x + rect.width - w : p + 4;
          const py = orientation === "horizontal" ? (p - h - 3 < rect.y ? p + 3 : p - h - 3) : rect.y;
          label = (
            <G testID="chart-threshold-label">
              <Rect x={px} y={py} width={w} height={h} rx={4} fill={c("var(--surface-raised)")} />
              <Rect x={px} y={py} width={w} height={h} rx={4} fill={color} opacity={0.14} />
              <SvgText x={px + w / 2} y={py + h / 2 + chartTheme.fontSize.axis * 0.35} textAnchor="middle" fontSize={chartTheme.fontSize.axis} fill={color} {...svgFont("medium")}>
                {t.label}
              </SvgText>
            </G>
          );
        }
        return (
          <G key={i}>
            <Line {...line} stroke={color} strokeWidth={width} strokeDasharray={dashArray(t.style ?? "dashed", width)} strokeLinecap="round" />
            {label}
          </G>
        );
      })}
    </G>
  );
}

type LegendProps = {
  series: Series[];
  className?: string;
  /** Where the legend sits; decides spacing and direction. Default = 'bottom'. */
  position?: LegendPosition;
  /** Ids currently hidden (drawn as an outlined dot, struck through and dimmed). */
  hiddenIds?: ReadonlySet<string>;
  /** Makes the entries toggle buttons. */
  onToggle?: (id: string) => void;
  /** Extra text per series id, printed after the name. */
  values?: Record<string, string | undefined>;
  /** Style for the legend text. */
  style?: TextStyle;
  /** 'wrap' (default) flows entries in a line; 'grid' lines them up in columns of at least 124px. */
  layout?: "wrap" | "grid";
};

const LEGEND_SPACING: Record<LegendPosition, string> = {
  top: "mb-2 flex-row flex-wrap items-center gap-x-4 gap-y-1.5",
  bottom: "mt-2 flex-row flex-wrap items-center gap-x-4 gap-y-1.5",
  left: "shrink-0 flex-col justify-center gap-2",
  right: "shrink-0 flex-col justify-center gap-2",
};

/** Series legend: 8px round dots and 12px names; optional values, toggling, side placement and a column grid. */
export function Legend({ series, className, position = "bottom", hiddenIds, onToggle, values, style, layout = "wrap" }: LegendProps) {
  const c = useChartColor();
  const [width, setWidth] = useState(0);
  if (!series.length) return null;
  const side = position === "left" || position === "right";
  const grid = layout === "grid" && !side;
  const stretch = grid || side;
  // CSS `repeat(auto-fill, minmax(124px, 1fr))` with a 20px column gap.
  const cols = grid && width > 0 ? Math.max(1, Math.floor((width + 20) / (124 + 20))) : 1;
  const cell = grid && width > 0 ? (width - 20 * (cols - 1)) / cols : undefined;
  const fontSize = (style?.fontSize as number | undefined) ?? chartTheme.fontSize.legend;
  return (
    <View
      role="list"
      onLayout={grid ? (e: LayoutChangeEvent) => setWidth(Math.floor(e.nativeEvent.layout.width)) : undefined}
      className={cn(grid ? cn("flex-row flex-wrap gap-x-5 gap-y-1.5", position === "top" ? "mb-2" : "mt-2") : LEGEND_SPACING[position], side && "min-w-0 max-w-[45%]", className)}
    >
      {series.map((s, i) => {
        const color = c(paletteColor(i, s.color));
        const off = hiddenIds?.has(s.id) ?? false;
        const body = (
          <>
            <View testID="legend-dot" style={{ width: 8, height: 8, borderRadius: 4, flexShrink: 0, backgroundColor: off ? "transparent" : color, borderWidth: off ? 1.5 : 0, borderColor: color }} />
            <Text
              numberOfLines={stretch ? 1 : undefined}
              className="min-w-0 shrink text-text-secondary"
              style={[{ fontSize, lineHeight: 16 }, off ? { textDecorationLine: "line-through" } : null, style]}
            >
              {s.name}
            </Text>
            {values?.[s.id] ? (
              <Text className={cn("shrink-0 font-medium text-text-primary", stretch && "ml-auto pl-2")} style={[{ fontSize, lineHeight: 16, fontVariant: ["tabular-nums"] }, style]}>
                {values[s.id]}
              </Text>
            ) : null}
          </>
        );
        const itemStyle = [{ opacity: off ? 0.6 : 1 }, cell !== undefined ? { width: cell } : null];
        return onToggle ? (
          <Pressable
            key={s.id}
            role="listitem"
            accessibilityRole="togglebutton"
            accessibilityState={{ checked: !off }}
            accessibilityLabel={s.name}
            onPress={() => onToggle(s.id)}
            className="min-w-0 flex-row items-center gap-2"
            style={itemStyle}
          >
            {body}
          </Pressable>
        ) : (
          <View key={s.id} role="listitem" className="min-w-0 flex-row items-center gap-2" style={itemStyle}>
            {body}
          </View>
        );
      })}
    </View>
  );
}

/** Places a chart's legend above, below, left or right of the plot; with `fill` the plot takes what the legend leaves. */
export function ChartFrame({ legend, position = "bottom", className, fill, children }: { legend?: React.ReactNode; position?: LegendPosition; className?: string; fill?: boolean; children: React.ReactNode }) {
  if (!legend) {
    return <View className={cn("w-full", fill && "min-h-0 flex-1", className)}>{children}</View>;
  }
  const side = position === "left" || position === "right";
  return (
    <View className={cn("w-full", side ? cn("flex-row gap-4", fill ? "items-stretch" : "items-center") : "flex-col", fill && "min-h-0 flex-1", className)}>
      {position === "top" || position === "left" ? legend : null}
      <View className={cn("min-w-0 flex-1", fill && "min-h-0")}>{children}</View>
      {position === "bottom" || position === "right" ? legend : null}
    </View>
  );
}

export function ChartTooltip({
  label,
  data,
  x,
  y,
  containerWidth,
  visible,
  className,
  footer,
}: {
  label: string;
  data: TooltipDatum[];
  x: number;
  y: number;
  containerWidth: number;
  visible: boolean;
  className?: string;
  /** A last row under a divider, e.g. a stack's total. */
  footer?: { label: string; value: string };
}) {
  const c = useChartColor();
  const [h, setH] = useState(0);
  if (!visible || !data.length) return null;
  // KuiReact's naive overflow flip keeps the tooltip on-screen on the right edge.
  const flip = x > containerWidth - 160;
  const size = chartTheme.fontSize.tooltip;
  return (
    <View
      testID="chart-tooltip"
      pointerEvents="none"
      onLayout={(e) => setH(e.nativeEvent.layout.height)}
      className={cn("absolute z-10 min-w-[140px] max-w-[260px] rounded-lg border px-3 py-2 shadow-md", className)}
      style={[{ top: y - h / 2, backgroundColor: c(chartTheme.tooltipBg), borderColor: c(chartTheme.tooltipBorder) }, flip ? { right: containerWidth - x + 12 } : { left: x + 12 }]}
    >
      {label ? (
        <Text className="mb-1.5 font-medium" style={{ color: c(chartTheme.tooltipMutedText), fontSize: 11 }}>
          {label}
        </Text>
      ) : null}
      <View className="gap-1">
        {data.map((d) => (
          <View key={d.seriesId} className="flex-row items-center gap-2">
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c(d.color) }} />
            <Text numberOfLines={1} className="min-w-0 shrink" style={{ color: c(chartTheme.tooltipMutedText), fontSize: size }}>
              {d.seriesName}
            </Text>
            <Text className="ml-auto pl-3 font-semibold" style={{ color: c(chartTheme.tooltipText), fontSize: size, fontVariant: ["tabular-nums"] }}>
              {d.valueLabel ?? (d.y === null ? "—" : String(d.y))}
            </Text>
          </View>
        ))}
      </View>
      {footer ? (
        <View testID="chart-tooltip-total" className="mt-1.5 flex-row items-center gap-2 border-t pt-1.5" style={{ borderColor: c(chartTheme.tooltipBorder) }}>
          <Text style={{ color: c(chartTheme.tooltipMutedText), fontSize: size }}>{footer.label}</Text>
          <Text className="ml-auto pl-3 font-semibold" style={{ color: c(chartTheme.tooltipText), fontSize: size, fontVariant: ["tabular-nums"] }}>
            {footer.value}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

/**
 * Touch stand-in for KuiReact's band hover: touching or dragging across the
 * plot selects the band under the finger (and reports the finger's position
 * for the 'point' tooltip); the tooltip stays until the reader taps outside
 * the plot area. `axis = 'y'` reads bands down the plot (horizontal bars).
 */
export function plotTouchHandlers(
  rect: PlotRect,
  bands: number,
  enabled: boolean,
  onIndex: (i: number | null, at?: { x: number; y: number }) => void,
  axis: "x" | "y" = "x",
) {
  const pick = (e: GestureResponderEvent) => {
    if (!enabled || bands === 0) return;
    const { locationX, locationY } = e.nativeEvent;
    const along = axis === "x" ? locationX - rect.x : locationY - rect.y;
    const size = axis === "x" ? rect.width : rect.height;
    if (along < 0 || along > size) {
      onIndex(null);
      return;
    }
    onIndex(Math.min(bands - 1, Math.max(0, Math.floor(along / (size / bands)))), { x: locationX, y: locationY });
  };
  return {
    onStartShouldSetResponder: () => enabled,
    onMoveShouldSetResponder: () => enabled,
    onResponderGrant: pick,
    onResponderMove: pick,
    onResponderTerminationRequest: () => true,
  };
}
