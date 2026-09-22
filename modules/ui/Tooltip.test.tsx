import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "./Button";
import { Tooltip } from "./Tooltip";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}
const tooltipVisible = () => screen.getByTestId("tooltip", { hidden: true } as never).props.accessibilityElementsHidden === false;

// Ports KuiReact's Tooltip tests (modules/ui/Tooltip.test.tsx). Mouse
// enter/leave maps to long-press/release on touch (hover still wires up
// onHoverIn/onHoverOut for react-native-web).
describe("Tooltip", () => {
  it("renders the trigger and a hidden tooltip by default", async () => {
    await render(
      <Tooltip content="Help text">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeTruthy();
    expect(tooltipVisible()).toBe(false);
  });

  it("string content becomes the trigger's accessibility hint (KuiReact: aria-describedby)", async () => {
    await render(
      <Tooltip content="Help text">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Hover me" }).props.accessibilityHint).toBe("Help text");
  });

  it("shows on long-press and hides on release", async () => {
    await render(
      <Tooltip content="Help text">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    await fireEvent(screen.getByRole("button"), "longPress");
    expect(tooltipVisible()).toBe(true);
    await fireEvent(screen.getByRole("button"), "pressOut");
    expect(tooltipVisible()).toBe(false);
  });

  it("shows on hover in and hides on hover out (react-native-web)", async () => {
    await render(
      <Tooltip content="Help text">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    await fireEvent(screen.getByRole("button"), "hoverIn");
    expect(tooltipVisible()).toBe(true);
    await fireEvent(screen.getByRole("button"), "hoverOut");
    expect(tooltipVisible()).toBe(false);
  });

  it("renders an arrow only when arrow is true", async () => {
    const plain = await render(
      <Tooltip content="x">
        <Button>A</Button>
      </Tooltip>,
    );
    expect(plain.queryByTestId("tooltip-arrow", { hidden: true } as never)).toBeNull();
    const withArrow = await render(
      <Tooltip content="x" arrow>
        <Button>B</Button>
      </Tooltip>,
    );
    expect(withArrow.getByTestId("tooltip-arrow", { hidden: true } as never)).toBeTruthy();
  });

  it("uses KuiReact's bubble classes and themes", async () => {
    const dark = await render(
      <Tooltip content="Dark theme" theme="dark">
        <Button>Dark</Button>
      </Tooltip>,
    );
    const bubble = dark.getByTestId("tooltip", { hidden: true } as never).children[0] as never;
    expect(classNameOf(bubble)).toContain("bg-gray-900");
    expect(classNameOf(bubble)).toContain("px-2.5");
    expect(classNameOf(dark.getByText("Dark theme", { hidden: true } as never))).toContain("text-white");
  });

  describe("delay", () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it("delays becoming visible by the given number of milliseconds", async () => {
      await render(
        <Tooltip content="500ms delay" delay={500}>
          <Button>Delayed</Button>
        </Tooltip>,
      );
      await fireEvent(screen.getByRole("button"), "longPress");
      expect(tooltipVisible()).toBe(false);
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
      expect(tooltipVisible()).toBe(true);
    });
  });
});
