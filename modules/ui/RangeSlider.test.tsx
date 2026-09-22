import { fireEvent, render, screen } from "@testing-library/react-native";

import { RangeSlider } from "./RangeSlider";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const action = (el: unknown, actionName: string) =>
  fireEvent(el as never, "accessibilityAction", { nativeEvent: { actionName } });

async function layout(width: number) {
  // The measured container is the fill's parent View.
  const container = screen.getByTestId("range-slider-fill").parent as never;
  await fireEvent(container, "layout", { nativeEvent: { layout: { width, height: 20, x: 0, y: 0 } } });
}

describe("RangeSlider", () => {
  it("single: renders the label, the value and an adjustable thumb", async () => {
    await render(<RangeSlider label="Volume" value={40} onChange={() => {}} />);
    expect(screen.getByText("Volume")).toBeTruthy();
    expect(screen.getByText("40")).toBeTruthy();
    const thumb = screen.getByRole("adjustable", { name: "Volume" });
    expect(thumb.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 40 });
  });

  it("single: increment/decrement adjust by step and clamp to the bounds", async () => {
    const onChange = jest.fn();
    const r = await render(<RangeSlider label="Volume" value={40} step={5} onChange={onChange} />);
    await action(screen.getByRole("adjustable"), "increment");
    expect(onChange).toHaveBeenLastCalledWith(45);
    await action(screen.getByRole("adjustable"), "decrement");
    expect(onChange).toHaveBeenLastCalledWith(35);
    await r.rerender(<RangeSlider label="Volume" value={100} step={5} onChange={onChange} />);
    await action(screen.getByRole("adjustable"), "increment");
    expect(onChange).toHaveBeenLastCalledWith(100);
  });

  it("single: tapping the track jumps to that position", async () => {
    const onChange = jest.fn();
    await render(<RangeSlider value={0} onChange={onChange} />);
    await layout(216); // usable travel = 200px
    await fireEvent.press(screen.getByTestId("range-slider-track"), { nativeEvent: { locationX: 108 } });
    expect(onChange).toHaveBeenCalledWith(50);
  });

  it("single: the fill spans value% of the track", async () => {
    await render(<RangeSlider value={25} onChange={() => {}} />);
    expect(screen.getByTestId("range-slider-fill").props.style).toEqual(expect.objectContaining({ width: "25%" }));
  });

  it("range: two thumbs, value shown as lo – hi, handles cannot cross", async () => {
    const onChange = jest.fn();
    await render(<RangeSlider range label="Price range" value={[20, 70]} onChange={onChange} />);
    expect(screen.getByText("20 – 70")).toBeTruthy();
    const lo = screen.getByRole("adjustable", { name: "Price range minimum" });
    const hi = screen.getByRole("adjustable", { name: "Price range maximum" });
    await action(lo, "increment");
    expect(onChange).toHaveBeenLastCalledWith([21, 70]);
    await action(hi, "decrement");
    expect(onChange).toHaveBeenLastCalledWith([20, 69]);
  });

  it("range: the minimum thumb is clamped to the maximum", async () => {
    const onChange = jest.fn();
    await render(<RangeSlider range value={[70, 70]} onChange={onChange} />);
    await action(screen.getByRole("adjustable", { name: "Minimum value" }), "increment");
    expect(onChange).toHaveBeenLastCalledWith([70, 70]);
  });

  it("range: tapping the track moves the nearest thumb", async () => {
    const onChange = jest.fn();
    await render(<RangeSlider range value={[20, 70]} onChange={onChange} />);
    await layout(216);
    await fireEvent.press(screen.getByTestId("range-slider-track"), { nativeEvent: { locationX: 8 + 180 } }); // 90
    expect(onChange).toHaveBeenCalledWith([20, 90]);
  });

  it("disabled: dimmed and ignores adjustments", async () => {
    const onChange = jest.fn();
    await render(<RangeSlider label="Volume" value={40} onChange={onChange} disabled />);
    await action(screen.getByRole("adjustable"), "increment");
    expect(onChange).not.toHaveBeenCalled();
    expect(classNameOf(screen.getByTestId("range-slider-fill").parent as never)).toContain("opacity-50");
  });

  it("showValue={false} hides the value; hint renders below", async () => {
    await render(<RangeSlider value={40} onChange={() => {}} showValue={false} hint="Drag to adjust" />);
    expect(screen.queryByText("40")).toBeNull();
    expect(screen.getByText("Drag to adjust")).toBeTruthy();
  });

  it("uses KuiReact's track, fill and thumb classes", async () => {
    await render(<RangeSlider value={40} onChange={() => {}} />);
    expect(classNameOf(screen.getByTestId("range-slider-fill"))).toContain("bg-primary");
    const thumb = classNameOf(screen.getByTestId("range-slider-thumb"));
    for (const c of ["h-4", "w-4", "rounded-full", "bg-primary", "border-2", "border-surface-base"]) expect(thumb).toContain(c);
  });
});
