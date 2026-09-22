import { fireEvent, render, screen } from "@testing-library/react-native";

import { TimePicker } from "./TimePicker";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const field = () => screen.getByTestId("timepicker-tp");

describe("TimePicker", () => {
  it("shows the value, or the empty --:-- placeholder", async () => {
    const r = await render(<TimePicker id="tp" label="Meeting time" value="09:00" onChange={() => {}} />);
    expect(screen.getByText("09:00")).toBeTruthy();
    await r.rerender(<TimePicker id="tp" label="Meeting time" onChange={() => {}} />);
    expect(screen.getByText("--:--")).toBeTruthy();
  });

  it("opens hour and minute columns and picking updates the value", async () => {
    const onChange = jest.fn();
    await render(<TimePicker id="tp" label="Meeting time" value="09:30" onChange={onChange} />);
    await fireEvent.press(field());
    expect(field().props.accessibilityState.expanded).toBe(true);
    expect(screen.getByRole("button", { name: "09 hours" }).props.accessibilityState.selected).toBe(true);
    await fireEvent.press(screen.getByRole("button", { name: "14 hours" }));
    expect(onChange).toHaveBeenLastCalledWith("14:30");
    await fireEvent.press(screen.getByRole("button", { name: "45 minutes" }));
    expect(onChange).toHaveBeenLastCalledWith("09:45");
  });

  it("an empty value defaults the other part to 00", async () => {
    const onChange = jest.fn();
    await render(<TimePicker id="tp" label="Meeting time" onChange={onChange} />);
    await fireEvent.press(field());
    await fireEvent.press(screen.getByRole("button", { name: "07 hours" }));
    expect(onChange).toHaveBeenCalledWith("07:00");
  });

  it("step sets the minute increments", async () => {
    await render(<TimePicker id="tp" label="Meeting time" value="09:00" onChange={() => {}} step={900} />);
    await fireEvent.press(field());
    expect(screen.getAllByRole("button", { name: / minutes$/ }).map((b) => b.props.accessibilityLabel)).toEqual(["00 minutes", "15 minutes", "30 minutes", "45 minutes"]);
  });

  it("disabled does not open; error replaces the hint", async () => {
    await render(<TimePicker id="tp" label="Meeting time" onChange={() => {}} disabled hint="24-hour format" error="Required" />);
    await fireEvent.press(field());
    expect(screen.queryByTestId("timepicker-tp-panel")).toBeNull();
    expect(screen.queryByText("24-hour format")).toBeNull();
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(classNameOf(field())).toContain("border-error");
  });
});
