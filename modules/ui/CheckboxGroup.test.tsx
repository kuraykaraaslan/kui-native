import { fireEvent, render, screen } from "@testing-library/react-native";

import { CheckboxGroup } from "./CheckboxGroup";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "typescript", label: "TypeScript" },
];

describe("CheckboxGroup", () => {
  it("renders the legend and one checkbox chip per option", async () => {
    await render(<CheckboxGroup legend="Tech stack" options={OPTIONS} selected={[]} onChange={() => {}} />);
    expect(screen.getByText("Tech stack")).toBeTruthy();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("reflects the selected values as checked", async () => {
    await render(<CheckboxGroup legend="Tech stack" options={OPTIONS} selected={["react"]} onChange={() => {}} />);
    expect(screen.getByRole("checkbox", { name: "React" }).props.accessibilityState.checked).toBe(true);
    expect(screen.getByRole("checkbox", { name: "Vue" }).props.accessibilityState.checked).toBe(false);
  });

  it("pressing an unselected chip appends its value", async () => {
    const onChange = jest.fn();
    await render(<CheckboxGroup legend="Tech stack" options={OPTIONS} selected={["react"]} onChange={onChange} />);
    await fireEvent.press(screen.getByTestId("checkboxgroup-vue"));
    expect(onChange).toHaveBeenCalledWith(["react", "vue"]);
  });

  it("pressing a selected chip removes its value", async () => {
    const onChange = jest.fn();
    await render(<CheckboxGroup legend="Tech stack" options={OPTIONS} selected={["react", "vue"]} onChange={onChange} />);
    await fireEvent.press(screen.getByTestId("checkboxgroup-react"));
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("disabled: chips are dimmed and not pressable", async () => {
    const onChange = jest.fn();
    await render(<CheckboxGroup legend="Permissions" options={OPTIONS} selected={[]} onChange={onChange} disabled />);
    expect(classNameOf(screen.getByTestId("checkboxgroup-vue"))).toContain("opacity-50");
    await fireEvent.press(screen.getByTestId("checkboxgroup-vue"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows the error as an alert", async () => {
    await render(<CheckboxGroup legend="Tech stack" options={OPTIONS} selected={[]} onChange={() => {}} error="Pick at least one" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Pick at least one");
  });

  it("uses KuiReact's chip classes for selected and unselected states", async () => {
    await render(<CheckboxGroup legend="Tech stack" options={OPTIONS} selected={["react"]} onChange={() => {}} />);
    const on = classNameOf(screen.getByTestId("checkboxgroup-react"));
    const off = classNameOf(screen.getByTestId("checkboxgroup-vue"));
    for (const c of ["px-3", "py-1.5", "rounded-lg", "border-primary", "bg-primary-subtle"]) expect(on).toContain(c);
    for (const c of ["border-border", "bg-surface-base"]) expect(off).toContain(c);
    expect(classNameOf(screen.getByText("React"))).toContain("text-primary");
  });
});
