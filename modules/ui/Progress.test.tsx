import { render, screen } from "@testing-library/react-native";

import { Progress } from "./Progress";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("Progress", () => {
  it("exposes a progressbar with min/max/now and a default '<n>% complete' label", async () => {
    await render(<Progress value={30} />);
    const bar = screen.getByRole("progressbar", { name: "30% complete" });
    expect(bar.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 30 });
  });

  it("clamps the value to 0-100", async () => {
    const over = await render(<Progress value={140} />);
    expect(over.getByRole("progressbar").props.accessibilityValue.now).toBe(100);
    const under = await render(<Progress value={-5} />);
    expect(under.getByRole("progressbar").props.accessibilityValue.now).toBe(0);
  });

  it("uses a custom accessible label when given", async () => {
    await render(<Progress value={50} label="Upload progress" />);
    expect(screen.getByRole("progressbar", { name: "Upload progress" })).toBeTruthy();
  });

  it.each([
    ["sm", "h-1.5"],
    ["md", "h-2.5"],
    ["lg", "h-4"],
  ] as const)("bar size=%s uses KuiReact's %s track", async (size, h) => {
    await render(<Progress value={10} size={size} />);
    const track = classNameOf(screen.getByRole("progressbar"));
    expect(track).toContain(h);
    expect(track).toContain("bg-surface-sunken");
    expect(track).toContain("rounded-full");
  });

  it.each(["primary", "success", "warning", "error"] as const)("variant=%s fills the bar with its colour token", async (variant) => {
    await render(<Progress value={10} variant={variant} />);
    const fill = screen.container.queryAll((n) => classNameOf(n as never).includes(`bg-${variant}`));
    expect(fill.length).toBeGreaterThan(0);
  });

  it("showLabel renders the rounded percentage", async () => {
    await render(<Progress value={62.4} showLabel />);
    expect(screen.getByText("62%")).toBeTruthy();
  });

  it("does not render a label by default", async () => {
    await render(<Progress value={62} />);
    expect(screen.queryByText("62%")).toBeNull();
  });

  it.each([
    ["sm", 40],
    ["md", 64],
    ["lg", 96],
  ] as const)("circle size=%s is KuiReact's %ipx", async (size, dim) => {
    await render(<Progress value={40} shape="circle" size={size} />);
    const bar = screen.getByRole("progressbar");
    const style = Array.isArray(bar.props.style) ? Object.assign({}, ...bar.props.style) : bar.props.style;
    expect(style.width).toBe(dim);
    expect(style.height).toBe(dim);
  });

  it("circle showLabel renders the percentage in the middle", async () => {
    await render(<Progress value={75} shape="circle" showLabel />);
    expect(screen.getByText("75%")).toBeTruthy();
  });
});
