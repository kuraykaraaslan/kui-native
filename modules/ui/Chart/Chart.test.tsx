import { fireEvent, render, screen } from "@testing-library/react-native";

import { AreaChart, arcPath, BarChart, DonutChart, GaugeChart, LineChart, niceTicks, PieChart, resolveColor, ScatterChart, smoothPath, SparkLine, yExtent, type Series } from "./index";

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
    expect(wedges().map((w) => w.props.opacity)).toEqual([1, 0.55]);
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
