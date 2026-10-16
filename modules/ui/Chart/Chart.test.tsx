import { fireEvent, render, screen } from "@testing-library/react-native";

import {
  alignedDomain,
  AreaChart,
  arcPath,
  BarChart,
  continuePath,
  dashArray,
  dateCategoryLabels,
  dayMonthText,
  DonutChart,
  formatTick,
  GaugeChart,
  groupedStackTops,
  LineChart,
  linearRegression,
  niceStep,
  niceTicks,
  PieChart,
  pointPath,
  resolveColor,
  resolveDomain,
  ScatterChart,
  seriesStats,
  smoothPath,
  SparkLine,
  stackKeys,
  stepPath,
  thinLabels,
  topsExtent,
  yExtent,
  type Series,
} from "./index";

const LINE: Series[] = [
  { id: "active", name: "Active users", data: [{ x: "Mon", y: 1200 }, { x: "Tue", y: 1900 }, { x: "Wed", y: 1500 }] },
  { id: "signups", name: "New signups", data: [{ x: "Mon", y: 300 }, { x: "Tue", y: 480 }, { x: "Wed", y: 220 }] },
];
const PIE: Series[] = [{ id: "share", name: "Share", data: [{ x: "A", y: 60 }, { x: "B", y: 40 }] }];

/** Give every chart container a width so the render prop draws. */
async function layout(width = 320) {
  for (const c of screen.queryAllByTestId("chart-container")) {
    await fireEvent(c, "layout", { nativeEvent: { layout: { width, height: 240, x: 0, y: 0 } } });
  }
}

describe("chart helpers (ported from KuiReact)", () => {
  it("nice ticks, extents and paths", () => {
    expect(niceTicks(0, 100, 4)).toEqual([0, 25, 50, 75, 100]);
    expect(yExtent(LINE)).toEqual({ min: 0, max: 1900 });
    expect(smoothPath([{ x: 0, y: 0 }, null, { x: 10, y: 10 }])).toBe("M0 0 M10 10");
    expect(arcPath(50, 50, 0, 40, 0, 90)).toMatch(/^M50 50 L50 10 A40 40 0 0 1 90 50 Z$/);
  });

  it("resolves CSS-variable palette colours to theme hex values", () => {
    expect(resolveColor("var(--primary)", { primary: "#3b82f6" })).toBe("#3b82f6");
    expect(resolveColor("#123456", { primary: "#3b82f6" })).toBe("#123456");
  });
});

describe("cartesian charts", () => {
  it("LineChart draws one path per series and a legend", async () => {
    await render(<LineChart series={LINE} />);
    await layout();
    expect(screen.getByTestId("chart-line-active")).toBeTruthy();
    expect(screen.getByTestId("chart-line-signups")).toBeTruthy();
    expect(screen.getByText("Active users")).toBeTruthy();
    expect(screen.getByLabelText("Line chart")).toBeTruthy();
  });

  it("touching a band shows the tooltip with every series' value", async () => {
    await render(<LineChart series={LINE} />);
    await layout(320);
    // Plot starts at x=40 and is 264px wide → 3 bands of 88px; x=180 is band 1 (Tue).
    await fireEvent(screen.getByLabelText("Line chart"), "responderGrant", { nativeEvent: { locationX: 180, locationY: 50 } });
    expect(screen.getByTestId("chart-tooltip")).toBeTruthy();
    expect(screen.getByText("Tue")).toBeTruthy();
    expect(screen.getByText("1900")).toBeTruthy();
    expect(screen.getByText("480")).toBeTruthy();
    // Tapping outside the plot dismisses it.
    await fireEvent(screen.getByLabelText("Line chart"), "responderGrant", { nativeEvent: { locationX: 5, locationY: 50 } });
    expect(screen.queryByTestId("chart-tooltip")).toBeNull();
  });

  it("AreaChart draws fills; BarChart draws one bar per point", async () => {
    await render(<AreaChart series={LINE} fillOpacity={0.18} />);
    await layout();
    expect(screen.getByTestId("chart-area-active")).toBeTruthy();
    await render(<BarChart series={LINE} />);
    await layout();
    expect(screen.getAllByTestId("chart-bar")).toHaveLength(6);
  });

  it("showLegend={false} hides the legend", async () => {
    await render(<BarChart series={LINE} showLegend={false} />);
    await layout();
    expect(screen.queryByText("Active users")).toBeNull();
  });
});

describe("radial and inline charts", () => {
  it("PieChart draws a wedge per point with a per-slice legend", async () => {
    await render(<PieChart series={PIE} />);
    await layout();
    expect(screen.getAllByTestId("chart-wedge")).toHaveLength(2);
    expect(screen.getByText("A")).toBeTruthy();
  });

  it("DonutChart: tapping a wedge highlights it and dims the others", async () => {
    await render(<DonutChart series={PIE} />);
    await layout();
    const wedges = () => screen.getAllByTestId("chart-wedge");
    expect(wedges().map((w) => w.props.opacity)).toEqual([1, 1]);
    await fireEvent.press(wedges()[0]);
    expect(wedges().map((w) => w.props.opacity)).toEqual([1, 0.5]);
    await fireEvent.press(wedges()[0]);
    expect(wedges().map((w) => w.props.opacity)).toEqual([1, 1]);
  });

  it("ScatterChart draws a point per datum", async () => {
    await render(<ScatterChart series={[{ id: "s", name: "S", data: [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: null }] }]} />);
    await layout();
    expect(screen.getAllByTestId("chart-point")).toHaveLength(2);
  });

  it("SparkLine draws a line, and an area when filled", async () => {
    await render(<SparkLine values={[1, 3, 2, 5]} filled ariaLabel="MRR trend" />);
    expect(screen.getByLabelText("MRR trend")).toBeTruthy();
    expect(screen.getByTestId("spark-line")).toBeTruthy();
    expect(screen.getByTestId("spark-area")).toBeTruthy();
  });

  it("M3 stubs render nothing, as in KuiReact", async () => {
    const { toJSON } = await render(<GaugeChart series={[]} />);
    expect(toJSON()).toBeNull();
  });
});

// Ported from KuiReact's Chart.test.tsx ("helpers for the settings surface" and "domains, second
// axis, stacks, regression"): the pure helpers must behave exactly as KuiReact's.
const cats: Series[] = [
  { id: "a", name: "A", data: [{ x: "Mon", y: 1 }, { x: "Tue", y: 3 }, { x: "Wed", y: 2 }] },
  { id: "b", name: "B", data: [{ x: "Mon", y: 2 }, { x: "Tue", y: 1 }, { x: "Wed", y: 4 }] },
];

describe("helpers for the settings surface (KuiReact parity)", () => {
  it("step paths retrace in reverse; dash patterns; domains; stats", () => {
    expect(stepPath([{ x: 0, y: 0 }, { x: 10, y: 5 }])).toBe("M0 0 H10 V5");
    expect(stepPath([{ x: 10, y: 5 }, { x: 0, y: 0 }], "before")).toBe("M10 5 V0 H0");
    expect(continuePath([{ x: 1, y: 2 }, { x: 3, y: 4 }], "linear", "after")).toBe("L1 2 L3 4");
    expect(dashArray("solid")).toBeUndefined();
    expect(dashArray("dotted", 2)).toBe("0 4");
    expect(resolveDomain({ min: 0, max: 10 }, { thresholds: [{ value: 15 }] })).toEqual({ min: 0, max: 15 });
    expect(resolveDomain({ min: 0, max: 10 }, { min: 2, max: 8, thresholds: [{ value: 15 }] })).toEqual({ min: 2, max: 8 });
    expect(seriesStats(cats[0])).toEqual({ latest: 2, min: 1, max: 3, avg: 2, total: 6 });
  });

  it("a resolved domain is spanned exactly by its ticks", () => {
    for (const [lo, hi] of [[16.6, 25.3], [0, 351], [3, 7.2], [-12, 48]]) {
      const d = resolveDomain({ min: lo, max: hi }, { count: 4 });
      const t = niceTicks(d.min, d.max, 4);
      expect(t[0]).toBeCloseTo(d.min, 9);
      expect(t[t.length - 1]).toBeCloseTo(d.max, 9);
    }
    expect(resolveDomain({ min: 0, max: 80 }, { count: 8 }).max).toBe(80);
  });

  it("round steps: never 263.25 on a 0-351 axis", () => {
    expect(niceStep(351, 4)).toBe(100);
    expect(niceStep(10, 4)).toBe(2.5);
    expect(resolveDomain({ min: 0, max: 351 })).toEqual({ min: 0, max: 400 });
    expect(niceTicks(0, 400, 4)).toEqual([0, 100, 200, 300, 400]);
    expect(niceTicks(0, 1, 4)).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  it("the right axis takes the left grid: same intervals, round step, covering its data", () => {
    const r = alignedDomain({ min: 41, max: 53 }, 3);
    expect(r.ticks).toHaveLength(4);
    expect(r.min).toBeLessThanOrEqual(41);
    expect(r.max).toBeGreaterThanOrEqual(53);
    expect(r.ticks[1] - r.ticks[0]).toBe(5);
    expect(alignedDomain({ min: 0, max: 1 }, 2, { min: 0, max: 100 }).ticks).toEqual([0, 50, 100]);
  });

  it("stack groups: series sharing a key stack, others stand alone; extents can leave zero out", () => {
    const s: Series[] = [
      { id: "a", name: "a", data: [{ x: 1, y: 1 }], stack: "g" },
      { id: "b", name: "b", data: [{ x: 1, y: 2 }], stack: "g" },
      { id: "c", name: "c", data: [{ x: 1, y: 5 }] },
    ];
    const keys = stackKeys(s, false);
    expect(keys[2]).toBeNull();
    const { tops, below } = groupedStackTops(s, keys);
    expect(tops.map((t) => t[0])).toEqual([1, 3, 5]);
    expect(below).toEqual([-1, 0, -1]);
    expect(topsExtent([[5, 7]], false)).toEqual({ min: 5, max: 7 });
    expect(topsExtent([[5, 7]])).toEqual({ min: 0, max: 7 });
  });

  it("linear regression and point shapes", () => {
    expect(linearRegression([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }])).toEqual({ slope: 2, intercept: 1 });
    expect(linearRegression([{ x: 1, y: 1 }, { x: 1, y: 2 }])).toBeNull();
    expect(pointPath("diamond", 10, 10, 4)).toMatch(/^M10 5L15 10/);
  });

  it("crowded labels are thinned to every k-th, keeping their positions", () => {
    const ticks = Array.from({ length: 30 }, (_, i) => ({ position: i * 10, label: `Day ${i + 1}` }));
    const thin = thinLabels(ticks, 300);
    expect(thin).toHaveLength(30);
    expect(thin[0].label).toBe("Day 1");
    expect(thin[1].label).toBe("");
    expect(thin.filter((t) => t.label).length).toBeLessThanOrEqual(Math.floor(300 / (Math.ceil(6 * 11 * 0.6) + 12)));
    expect(thinLabels(ticks.slice(0, 3), 300)).toEqual(ticks.slice(0, 3));
  });

  it("time ticks are 24 h; dates read d MMM; ISO date categories get the short text", () => {
    const t = Date.UTC(2026, 9, 6, 15, 30);
    expect(formatTick(t, 3_600_000, "en-US", "UTC")).toBe("15:30");
    expect(dayMonthText(t, "en-US", "UTC")).toBe("6 Oct");
    expect(dateCategoryLabels(["2026-10-06", "2026-10-07"], "en-US")).toEqual({ ticks: ["6 Oct", "7 Oct"], full: ["6 Oct 2026", "7 Oct 2026"] });
    expect(dateCategoryLabels(["Mon", "2026-10-07"])).toBeNull();
  });
});

type HostNode = { type: string; props: Record<string, unknown>; children: (HostNode | string)[] | null };
/** Host nodes of a type in the rendered tree. */
function hostNodes(type: string): HostNode[] {
  const out: HostNode[] = [];
  const walk = (n: unknown) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(walk);
    const node = n as HostNode;
    if (node.type === type) out.push(node);
    (node.children ?? []).forEach(walk);
  };
  walk(screen.toJSON());
  return out;
}
/** Every SVG text drawn (react-native-svg puts the text in its TSpans' `content`). */
const svgTexts = () => hostNodes("RNSVGTSpan").map((n) => String(n.props.content ?? ""));
const hostCount = (type: string) => hostNodes(type).length;

describe("chart settings surface (KuiReact parity)", () => {
  it("value axes print round ticks", async () => {
    await render(<BarChart series={[{ id: "p", name: "Power", data: [{ x: "A", y: 120 }, { x: "B", y: 351 }] }]} />);
    await layout();
    const t = svgTexts();
    for (const v of ["0", "100", "200", "300", "400"]) expect(t).toContain(v);
    expect(t).not.toContain("263.25");
  });

  it("right axis on lines: two value axes and a title on the right", async () => {
    const two: Series[] = [cats[0], { ...cats[1], yAxis: "right" }];
    await render(<LineChart series={two} yFormat={(v) => `${v}L`} y2Format={(v) => `${v}R`} y2Label="Right" />);
    await layout();
    const t = svgTexts();
    const left = t.filter((x) => x.endsWith("L"));
    const right = t.filter((x) => x.endsWith("R"));
    expect(left.length).toBeGreaterThan(1);
    expect(right.length).toBe(left.length);
    expect(t).toContain("Right");
  });

  it("gradient fills, point shapes and value labels on lines", async () => {
    await render(<AreaChart series={[{ ...cats[0], fillGradient: true, showPoints: true, pointShape: "square" }]} showValues />);
    await layout();
    expect(hostCount("RNSVGLinearGradient")).toBe(1);
    expect(screen.getAllByTestId("chart-point")).toHaveLength(3);
    expect(screen.getAllByTestId("chart-value-label").length).toBeGreaterThan(0);
  });

  it("dashed grid by default; dotted and solid on request", async () => {
    await render(<LineChart series={cats} />);
    await layout();
    expect(screen.getByTestId("chart-grid-dashed")).toBeTruthy();
    await render(<LineChart series={cats} gridStyle="solid" />);
    await layout();
    expect(screen.getByTestId("chart-grid-solid")).toBeTruthy();
  });

  it("bars: category ticks, markers, end-rounded paths, hidden axis labels", async () => {
    await render(<BarChart series={[cats[0]]} categoryTicks={[{ at: 0, label: "E0" }, { at: 3, label: "E3" }]} markers={[{ at: 1.5, label: "Mean" }]} showYAxis={false} />);
    await layout();
    const t = svgTexts();
    expect(t).toContain("E0");
    expect(t).toContain("E3");
    expect(t).not.toContain("Mon");
    expect(screen.getByTestId("chart-marker-Mean")).toBeTruthy();
    expect(screen.getAllByTestId("chart-bar")[0].props.d).toMatch(/Q/);
  });

  it("grouped stacks: two stacks stand side by side", async () => {
    const s: Series[] = [
      { id: "a", name: "a", data: [{ x: "X", y: 1 }], stack: "g" },
      { id: "b", name: "b", data: [{ x: "X", y: 2 }], stack: "g" },
      { id: "c", name: "c", data: [{ x: "X", y: 5 }] },
    ];
    await render(<BarChart series={s} />);
    await layout();
    expect(screen.getAllByTestId("chart-bar")).toHaveLength(3);
  });

  it("a stacked tooltip can add a total row and drop its heading", async () => {
    await render(<BarChart series={cats} stacked tooltipTotal tooltipHeader={false} />);
    await layout();
    await fireEvent(screen.getByLabelText("Bar chart"), "responderGrant", { nativeEvent: { locationX: 100, locationY: 100 } });
    expect(screen.getByTestId("chart-tooltip-total")).toBeTruthy();
    expect(screen.getByText("Total")).toBeTruthy();
    expect(screen.queryByText("Mon")).toBeNull();
  });

  it("legend: values, toggling a series, side placement", async () => {
    await render(<LineChart series={[cats[0], { ...cats[1], hidden: true }]} legendValues={["latest", "max"]} legendPosition="right" />);
    await layout();
    expect(screen.getByText("2 · max 3")).toBeTruthy();
    expect(screen.queryByTestId("chart-line-b")).toBeNull();
    await fireEvent.press(screen.getByLabelText("B"));
    expect(screen.getByTestId("chart-line-b")).toBeTruthy();
  });

  it("thresholds draw a labelled line", async () => {
    await render(<LineChart series={cats} thresholds={[{ value: 3.5, label: "Limit" }]} />);
    await layout();
    expect(svgTexts()).toContain("Limit");
  });

  it("scatter trend line and point opacity; pie outside labels and the donut centre", async () => {
    await render(<ScatterChart series={[{ id: "s", name: "s", data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2.5 }] }]} trendLine pointOpacity={0.4} />);
    await layout();
    expect(screen.getByTestId("chart-trend-s")).toBeTruthy();
    expect(screen.getAllByTestId("chart-point")[0].props.fillOpacity).toBe(0.4);
    await render(<PieChart series={[{ id: "p", name: "p", data: [{ x: "A", y: 3 }, { x: "B", y: 1 }] }]} labels="name" labelPosition="outside" legendLayout="grid" />);
    await layout();
    expect(screen.getAllByTestId("chart-slice-leader")).toHaveLength(2);
    await render(<DonutChart series={PIE} centerLabel="Total" legendValue="percent" />);
    await layout();
    expect(screen.getByTestId("chart-center")).toBeTruthy();
    expect(screen.getByText("60%")).toBeTruthy();
  });

  it("ISO date categories print short dates", async () => {
    await render(<LineChart series={[{ id: "d", name: "D", data: [{ x: "2026-10-06", y: 1 }, { x: "2026-10-07", y: 2 }] }]} />);
    await layout();
    const t = svgTexts();
    expect(t).toContain(dayMonthText(new Date(2026, 9, 6).getTime()));
    expect(t).not.toContain("2026-10-06");
  });
});
