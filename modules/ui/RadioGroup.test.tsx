import { fireEvent, render, screen } from "@testing-library/react-native";

import { RadioGroup } from "./RadioGroup";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS", hint: "Carrier rates apply" },
  { value: "none", label: "None" },
];

describe("RadioGroup", () => {
  it("renders the legend and one radio per option", async () => {
    await render(<RadioGroup name="notify" legend="Notification preference" options={OPTIONS} />);
    expect(screen.getByText("Notification preference")).toBeTruthy();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("marks the selected option via accessibilityState.checked", async () => {
    await render(<RadioGroup name="notify" legend="L" options={OPTIONS} value="sms" />);
    expect(screen.getByRole("radio", { name: "SMS" }).props.accessibilityState.checked).toBe(true);
    expect(screen.getByRole("radio", { name: "Email" }).props.accessibilityState.checked).toBe(false);
  });

  it("calls onChange with the option value on press", async () => {
    const onChange = jest.fn();
    await render(<RadioGroup name="notify" legend="L" options={OPTIONS} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("radio", { name: "None" }));
    expect(onChange).toHaveBeenCalledWith("none");
  });

  it("disabled blocks presses and applies opacity-50", async () => {
    const onChange = jest.fn();
    await render(<RadioGroup name="notify" legend="L" options={OPTIONS} onChange={onChange} disabled />);
    const radio = screen.getByRole("radio", { name: "Email" });
    expect(classNameOf(radio)).toContain("opacity-50");
    await fireEvent.press(radio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders hints and exposes them as accessibility hints", async () => {
    await render(<RadioGroup name="notify" legend="L" options={OPTIONS} />);
    expect(screen.getByText("Carrier rates apply")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "SMS" }).props.accessibilityHint).toBe("Carrier rates apply");
  });

  it("shows the error in an alert", async () => {
    await render(<RadioGroup name="notify" legend="L" options={OPTIONS} error="Pick one" />);
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText("Pick one")).toBeTruthy();
  });

  it("uses KuiReact's 16px radio circle and legend typography", async () => {
    await render(<RadioGroup name="notify" legend="Legend" options={OPTIONS} />);
    const circle = (screen.getByRole("radio", { name: "Email" }).children[0] as never) as { props: { className?: string } };
    expect(classNameOf(circle)).toContain("h-4");
    expect(classNameOf(circle)).toContain("rounded-full");
    expect(classNameOf(screen.getByText("Legend"))).toContain("mb-2");
  });

  it("card variant: bordered option, primary border when selected, error border on error", async () => {
    const selected = await render(
      <RadioGroup name="plan" legend="L" options={OPTIONS} value="email" variant="card" />,
    );
    const email = classNameOf(selected.getByRole("radio", { name: "Email" }));
    expect(email).toContain("rounded-lg");
    expect(email).toContain("p-3");
    expect(email).toContain("border-primary");
    const errored = await render(<RadioGroup name="plan" legend="L" options={OPTIONS} variant="card" error="x" />);
    expect(classNameOf(errored.getByRole("radio", { name: "SMS" }))).toContain("border-error");
  });

  it("builds KuiReact-style testIDs from name + value", async () => {
    await render(<RadioGroup name="notify" legend="L" options={OPTIONS} />);
    expect(screen.getByTestId("radio-notify-sms")).toBeTruthy();
  });
});
