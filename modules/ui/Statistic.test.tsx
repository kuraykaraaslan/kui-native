import { render, screen } from "@testing-library/react-native";

import { Statistic } from "./Statistic";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("Statistic", () => {
  it("renders the label and value", async () => {
    await render(<Statistic label="Active users" value={1284} />);
    expect(screen.getByText("Active users")).toBeTruthy();
    expect(classNameOf(screen.getByText("1284"))).toContain("text-2xl font-bold");
  });

  it("applies precision, prefix, suffix and trend", async () => {
    await render(<Statistic label="Conversion rate" value={4.2} precision={1} prefix="~" suffix="%" trend="down" trendValue="-0.6%" />);
    expect(screen.getByText("4.2")).toBeTruthy();
    expect(screen.getByText("~")).toBeTruthy();
    expect(screen.getByText("%")).toBeTruthy();
    expect(classNameOf(screen.getByText("-0.6%"))).toContain("text-error");
  });

  it("up trends are green", async () => {
    await render(<Statistic label="Revenue" value={82400} prefix="$" trend="up" trendValue="+12.4%" />);
    expect(classNameOf(screen.getByText("+12.4%"))).toContain("text-success");
  });

  it("loading swaps the value for a busy placeholder", async () => {
    const { toJSON } = await render(<Statistic label="Loading example" value={0} loading />);
    expect(screen.queryByText("0")).toBeNull();
    expect(screen.getByTestId("statistic-loading", { hidden: true } as never)).toBeTruthy();
    expect((toJSON() as unknown as { props: { accessibilityState: { busy: boolean } } }).props.accessibilityState.busy).toBe(true);
  });
});
