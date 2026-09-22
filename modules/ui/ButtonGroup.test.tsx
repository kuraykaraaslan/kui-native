import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { ButtonGroup, type ButtonGroupItem } from "./ButtonGroup";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const ITEMS: ButtonGroupItem[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month", disabled: true },
];

const btn = (name: string) => screen.getByRole("button", { name });

describe("ButtonGroup", () => {
  it("renders one button per item and marks the active one selected", async () => {
    await render(<ButtonGroup items={ITEMS} value="week" onChange={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(btn("Week").props.accessibilityState.selected).toBe(true);
    expect(btn("Day").props.accessibilityState.selected).toBe(false);
  });

  it("calls onChange with the pressed item's value", async () => {
    const onChange = jest.fn();
    await render(<ButtonGroup items={ITEMS} value="week" onChange={onChange} />);
    await fireEvent.press(btn("Day"));
    expect(onChange).toHaveBeenCalledWith("day");
  });

  it("disabled items are dimmed and not pressable", async () => {
    const onChange = jest.fn();
    await render(<ButtonGroup items={ITEMS} value="week" onChange={onChange} />);
    expect(classNameOf(btn("Month"))).toContain("opacity-50");
    await fireEvent.press(btn("Month"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("outline (default): bordered frame, dividers, semibold active label", async () => {
    const { toJSON } = await render(<ButtonGroup items={ITEMS} value="week" onChange={() => {}} />);
    expect(classNameOf(toJSON() as never)).toContain("border border-border");
    expect(classNameOf(btn("Day"))).not.toContain("border-l ");
    expect(classNameOf(btn("Week"))).toContain("border-l");
    expect(classNameOf(btn("Week"))).toContain("bg-surface-overlay");
    expect(classNameOf(screen.getByText("Week"))).toContain("font-semibold");
    expect(classNameOf(btn("Day"))).toContain("px-4 py-2");
  });

  it("sizes map to KuiReact's padding and text classes", async () => {
    await render(<ButtonGroup items={ITEMS} value="week" onChange={() => {}} size="xs" />);
    expect(classNameOf(btn("Day"))).toContain("px-2 py-1");
    expect(classNameOf(screen.getByText("Day"))).toContain("text-xs");
  });

  it("primary: solid active item, 20% tint on inactive items, rounded ends", async () => {
    await render(<ButtonGroup items={ITEMS} value="week" onChange={() => {}} variant="primary" />);
    expect(classNameOf(btn("Week"))).toContain("bg-primary");
    expect(classNameOf(btn("Day"))).toContain("rounded-l-md");
    expect(classNameOf(btn("Month"))).toContain("rounded-r-md");
    const style = StyleSheet.flatten(btn("Day").props.style);
    expect(style.backgroundColor).toBe("#3b82f633");
    expect(classNameOf(screen.getByText("Day"))).toContain("text-primary-fg");
  });
});
