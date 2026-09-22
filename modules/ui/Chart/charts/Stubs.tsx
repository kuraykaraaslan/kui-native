// KuiReact's M3 chart types (Bubble, Heatmap, Treemap, Radar, Funnel,
// Sankey, Candlestick, Gauge) are stubs that render nothing; the public
// surface is reserved the same way here.

import type { BaseChartProps } from "../types";

type StubProps = Partial<BaseChartProps> & Record<string, unknown>;

export function BubbleChart(_props: StubProps) {
  return null;
}
export function HeatmapChart(_props: StubProps) {
  return null;
}
export function TreemapChart(_props: StubProps) {
  return null;
}
export function RadarChart(_props: StubProps) {
  return null;
}
export function FunnelChart(_props: StubProps) {
  return null;
}
export function SankeyChart(_props: StubProps) {
  return null;
}
export function CandlestickChart(_props: StubProps) {
  return null;
}
export function GaugeChart(_props: StubProps) {
  return null;
}
