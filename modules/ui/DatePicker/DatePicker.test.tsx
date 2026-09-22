import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { buildMonthGrid, formatDate, isDisabled } from "./hooks/useDateFns";
import { DatePicker, DateRangePicker } from "./index";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const day = (label: string) => screen.getByRole("button", { name: label });

describe("date helpers (ported from KuiReact useDateFns)", () => {
  it("formats with locale tokens", () => {
    const d = new Date(2026, 5, 5);
    expect(formatDate(d, "DD.MM.YYYY")).toBe("05.06.2026");
    expect(formatDate(d, "MM/DD/YYYY")).toBe("06/05/2026");
    expect(formatDate(null, "DD.MM.YYYY")).toBe("");
  });

  it("builds a 42-cell grid aligned to the week start", () => {
    // June 2026 starts on a Monday.
    expect(buildMonthGrid(2026, 5, 1)[0].getDate()).toBe(1);
    expect(buildMonthGrid(2026, 5, 0)[0].getDate()).toBe(31);
    expect(buildMonthGrid(2026, 5, 1)).toHaveLength(42);
  });

  it("disables dates outside min/max and in disabledDates", () => {
    const min = new Date(2026, 5, 10);
    expect(isDisabled(new Date(2026, 5, 9), undefined, min)).toBe(true);
    expect(isDisabled(new Date(2026, 5, 10), undefined, min)).toBe(false);
    expect(isDisabled(new Date(2026, 5, 12), [new Date(2026, 5, 12)])).toBe(true);
    expect(isDisabled(new Date(2026, 5, 13), (d) => d.getDay() === 6)).toBe(true);
  });
});

describe("DatePicker", () => {
  it("shows the locale placeholder (tr by default) and a labelled trigger", async () => {
    await render(<DatePicker id="d" label="Appointment date" value={null} onChange={() => {}} />);
    expect(screen.getByText("GG.AA.YYYY")).toBeTruthy();
    expect(screen.getByTestId("datepicker-d-trigger").props.accessibilityState.expanded).toBe(false);
  });

  it("formats the value with the locale display format", async () => {
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={() => {}} locale="en" />);
    expect(screen.getByText("06/15/2026")).toBeTruthy();
  });

  it("opens the calendar on the value's month and selecting a day closes it", async () => {
    const onChange = jest.fn();
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={onChange} locale="en" />);
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    expect(screen.getByText("June")).toBeTruthy();
    expect(screen.getByText("2026")).toBeTruthy();
    expect(day("15 June 2026").props.accessibilityState.selected).toBe(true);
    await fireEvent.press(day("20 June 2026"));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 5, 20));
    expect(screen.queryByTestId("datepicker-d-popover")).toBeNull();
  });

  it("chevrons change the visible month", async () => {
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={() => {}} locale="en" />);
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    await fireEvent.press(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("July")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Previous month" }));
    await fireEvent.press(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("May")).toBeTruthy();
  });

  it("the month and year quick pickers jump the calendar", async () => {
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={() => {}} locale="en" />);
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    await fireEvent.press(screen.getByText("June"));
    await fireEvent.press(screen.getByRole("button", { name: "September" }));
    expect(screen.getByText("September")).toBeTruthy();
    await fireEvent.press(screen.getByText("2026"));
    await fireEvent.press(screen.getByRole("button", { name: "2030" }));
    expect(screen.getByText("2030")).toBeTruthy();
    expect(day("1 September 2030")).toBeTruthy();
  });

  it("days outside min/max are disabled and not selectable", async () => {
    const onChange = jest.fn();
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={onChange} locale="en" min={new Date(2026, 5, 10)} />);
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    expect(day("9 June 2026").props.accessibilityState.disabled).toBe(true);
    await fireEvent.press(day("9 June 2026"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("the clear button resets the value to null", async () => {
    const onChange = jest.fn();
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={onChange} locale="en" />);
    await fireEvent.press(screen.getByRole("button", { name: "Clear date" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("custom messages override the locale copy", async () => {
    await render(<DatePicker id="d" value={new Date(2026, 4, 26)} onChange={() => {}} messages={{ today: "Bugün seç", clear: "Temizle" }} />);
    expect(screen.getByRole("button", { name: "Temizle" })).toBeTruthy();
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    expect(screen.getByText("Bugün seç")).toBeTruthy();
    expect(screen.getByText("Mayıs")).toBeTruthy();
  });

  it("disabled: does not open and hides the clear button", async () => {
    await render(<DatePicker id="d" value={new Date(2026, 0, 1)} onChange={() => {}} disabled locale="en" />);
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    expect(screen.queryByTestId("datepicker-d-popover")).toBeNull();
    expect(screen.queryByRole("button", { name: "Clear date" })).toBeNull();
  });

  it("error replaces the hint and marks the trigger invalid", async () => {
    await render(<DatePicker id="d" label="Due date" value={null} onChange={() => {}} hint="Pick one" error="Please select a date." />);
    expect(screen.queryByText("Pick one")).toBeNull();
    expect(screen.getByRole("alert")).toHaveTextContent("Please select a date.");
    const shell = screen.getByTestId("datepicker-d-trigger").parent as never as { props: { style: unknown; className?: string } };
    expect(classNameOf(shell)).toContain("border-error");
    expect(StyleSheet.flatten(shell.props.style as never).outlineWidth).toBe(1);
  });

  it("uses KuiReact's popover and selected-day classes", async () => {
    await render(<DatePicker id="d" value={new Date(2026, 5, 15)} onChange={() => {}} locale="en" />);
    await fireEvent.press(screen.getByTestId("datepicker-d-trigger"));
    const popover = classNameOf(screen.getByTestId("datepicker-d-popover"));
    for (const c of ["rounded-lg", "border-border", "bg-surface-raised", "shadow-lg", "p-1"]) expect(popover).toContain(c);
    expect(classNameOf(day("15 June 2026"))).toContain("bg-primary");
    expect(classNameOf(day("15 June 2026"))).toContain("h-8 w-8");
  });
});

describe("DateRangePicker", () => {
  it("shows the double placeholder and renders two months when open", async () => {
    await render(<DateRangePicker id="r" value={{ start: null, end: null }} onChange={() => {}} locale="en" />);
    expect(screen.getByText("MM/DD/YYYY  →  MM/DD/YYYY")).toBeTruthy();
  });

  it("first tap sets the start, second tap sets the end and closes", async () => {
    const onChange = jest.fn();
    const r = await render(<DateRangePicker id="r" value={{ start: new Date(2026, 5, 1), end: null }} onChange={onChange} locale="en" />);
    await fireEvent.press(screen.getByTestId("daterangepicker-r-trigger"));
    expect(screen.getByText("June")).toBeTruthy();
    expect(screen.getByText("July")).toBeTruthy();
    await fireEvent.press(screen.getAllByRole("button", { name: "15 June 2026" })[0]);
    expect(onChange).toHaveBeenCalledWith({ start: new Date(2026, 5, 1), end: new Date(2026, 5, 15) });
    expect(screen.queryByTestId("daterangepicker-r-popover")).toBeNull();

    await r.rerender(<DateRangePicker id="r" value={{ start: new Date(2026, 5, 1), end: new Date(2026, 5, 15) }} onChange={onChange} locale="en" />);
    expect(screen.getByText("06/01/2026  →  06/15/2026")).toBeTruthy();
  });

  it("tapping before the start (or after a full range) starts over", async () => {
    const onChange = jest.fn();
    await render(<DateRangePicker id="r" value={{ start: new Date(2026, 5, 10), end: null }} onChange={onChange} locale="en" />);
    await fireEvent.press(screen.getByTestId("daterangepicker-r-trigger"));
    await fireEvent.press(screen.getAllByRole("button", { name: "5 June 2026" })[0]);
    expect(onChange).toHaveBeenCalledWith({ start: new Date(2026, 5, 5), end: null });
  });
});
