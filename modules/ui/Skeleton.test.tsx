import { render, screen } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";

import { SkeletonAvatar, SkeletonCard, SkeletonLine, SkeletonText } from "./Skeleton";
import { SkeletonCard as SkeletonCardShim } from "./SkeletonCard";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(false);
});

describe("SkeletonLine", () => {
  it("is an h-3 rounded bar on the sunken surface, full width by default", async () => {
    await render(<SkeletonLine />);
    const bar = screen.container.queryAll((n) => classNameOf(n as never).includes("h-3"))[0];
    const className = classNameOf(bar as never);
    expect(className).toContain("bg-surface-sunken");
    expect(className).toContain("rounded");
    expect(className).toContain("w-full");
  });

  it("accepts a width class and a className override (twMerge resolves h-6 over h-3)", async () => {
    await render(<SkeletonLine width="w-1/2" className="h-6" />);
    const bar = screen.container.queryAll((n) => classNameOf(n as never).includes("w-1/2"))[0];
    const className = classNameOf(bar as never);
    expect(className).toContain("h-6");
    expect(className).not.toContain("h-3");
  });
});

describe("SkeletonAvatar", () => {
  it.each([
    ["sm", "h-8"],
    ["md", "h-10"],
    ["lg", "h-12"],
  ] as const)("size=%s is KuiReact's %s circle", async (size, h) => {
    await render(<SkeletonAvatar size={size} />);
    const circle = screen.container.queryAll((n) => classNameOf(n as never).includes("rounded-full"))[0];
    expect(classNameOf(circle as never)).toContain(h);
  });
});

describe("SkeletonText", () => {
  it("is announced as a busy 'Loading content' progressbar", async () => {
    await render(<SkeletonText />);
    const el = screen.getByRole("progressbar", { name: "Loading content" });
    expect(el.props.accessibilityState.busy).toBe(true);
  });

  it("renders `lines` bars with the last one at w-4/5", async () => {
    await render(<SkeletonText lines={4} />);
    const bars = screen.container.queryAll((n) => classNameOf(n as never).includes("h-3"));
    expect(bars).toHaveLength(4);
    expect(classNameOf(bars[3] as never)).toContain("w-4/5");
  });
});

describe("SkeletonCard", () => {
  it("registers with assistive tech as a busy progressbar (the old version was missing `accessible`)", async () => {
    await render(<SkeletonCard />);
    const el = screen.getByRole("progressbar", { name: "Loading content" });
    expect(el.props.accessibilityState.busy).toBe(true);
  });

  it("uses KuiReact's p-6 card surface", async () => {
    await render(<SkeletonCard />);
    const className = classNameOf(screen.getByRole("progressbar"));
    expect(className).toContain("p-6");
    expect(className).toContain("bg-surface-raised");
    expect(className).toContain("rounded-xl");
  });

  it("renders KuiReact's shape: avatar, 2 header lines, 3 text lines, 2 footer chips", async () => {
    await render(<SkeletonCard />);
    const nodes = screen.container.queryAll((n) => typeof n.type === "string");
    const classes = nodes.map((n) => classNameOf(n as never));
    expect(classes.filter((c) => c.includes("rounded-full") && c.includes("h-10"))).toHaveLength(1);
    expect(classes.filter((c) => c.includes("h-3"))).toHaveLength(5);
    expect(classes.filter((c) => c.includes("h-6"))).toHaveLength(2);
  });

  it("is still importable from the old SkeletonCard path", async () => {
    await render(<SkeletonCardShim />);
    expect(screen.getByRole("progressbar")).toBeTruthy();
  });
});
