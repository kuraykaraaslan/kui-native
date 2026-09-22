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

  it("disabled prevents interaction, dims only the box and greys the label (KuiReact)", async () => {
    const onChange = jest.fn();
    await render(<Checkbox checked={false} onChange={onChange} disabled label="x" />);
    const checkbox = screen.getByRole("checkbox");
    expect(classNameOf(checkbox)).not.toContain("opacity-50");
    expect(classNameOf(checkbox.children[0] as never)).toContain("opacity-50");
    expect(classNameOf(screen.getByText("x"))).toContain("text-text-disabled");
    await fireEvent.press(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("hint renders under the label and is exposed as the accessibility hint", async () => {
    await render(<Checkbox checked={false} label="Subscribe to newsletter" hint="We send weekly updates, no spam." />);
    expect(screen.getByText("We send weekly updates, no spam.")).toBeTruthy();
    expect(screen.getByRole("checkbox").props.accessibilityHint).toBe("We send weekly updates, no spam.");
  });

  it("error replaces the hint, reddens the box border and is announced", async () => {
    await render(<Checkbox checked={false} label="Terms" hint="h" error="You must accept the terms." />);
    expect(screen.queryByText("h")).toBeNull();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(classNameOf(screen.getByRole("checkbox").children[0] as never)).toContain("border-error");
  });

  it("works uncontrolled with defaultChecked", async () => {
    const onChange = jest.fn();
    await render(<Checkbox defaultChecked label="Remember me" onChange={onChange} />);
    expect(screen.getByRole("checkbox").props.accessibilityState.checked).toBe(true);
    await fireEvent.press(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("checkbox").props.accessibilityState.checked).toBe(false);
  });
});
