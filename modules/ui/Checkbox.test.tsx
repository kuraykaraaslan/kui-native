import { fireEvent, render, screen } from "@testing-library/react-native";

import { Checkbox } from "./Checkbox";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Pixel-metric assertions below lock in KuiReact's exact Checkbox box size
// and spacing (modules/ui/Checkbox.tsx): a 16px box (h-4 w-4), gap-3,
// items-start, and an unchecked border of `border-border`. A prior
// KuiNative version used a 20px box, gap-2, items-center and
// `border-border-strong`.
describe("Checkbox", () => {
  it("renders the label", async () => {
    await render(<Checkbox checked={false} label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeTruthy();
  });

  it("matches KuiReact's row layout (gap-3, items-start)", async () => {
    await render(<Checkbox checked={false} label="Accept terms" />);
    const className = classNameOf(screen.getByRole("checkbox"));
    expect(className).toContain("gap-3");
    expect(className).toContain("items-start");
    expect(className).not.toContain("gap-2");
  });

  it("the unchecked box uses border-border, not border-border-strong", async () => {
    await render(<Checkbox checked={false} label="x" />);
    // The inner box is the first child View; query via the checkbox root's rendered tree.
    const root = screen.getByRole("checkbox");
    const boxView = root.children[0] as { props: { className?: string | string[] } };
    const className = classNameOf(boxView);
    expect(className).toContain("h-4");
    expect(className).toContain("w-4");
    expect(className).toContain("border-border");
    expect(className).not.toContain("border-border-strong");
  });

  it("toggles on press and calls onChange with the next value", async () => {
    const onChange = jest.fn();
    await render(<Checkbox checked={false} onChange={onChange} label="x" />);
    await fireEvent.press(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("indeterminate sets aria-checked mixed and is visually active", async () => {
    await render(<Checkbox checked={false} indeterminate label="x" />);
    expect(screen.getByRole("checkbox").props.accessibilityState.checked).toBe("mixed");
  });

  it("disabled prevents interaction and applies opacity-50", async () => {
    const onChange = jest.fn();
    await render(<Checkbox checked={false} onChange={onChange} disabled label="x" />);
    const checkbox = screen.getByRole("checkbox");
    expect(classNameOf(checkbox)).toContain("opacity-50");
    await fireEvent.press(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
