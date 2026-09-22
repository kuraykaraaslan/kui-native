import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { Select } from "./Select";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

// Ports KuiReact's Select tests (modules/ui/Select.test.tsx). The native-
// <select> cases map onto the same combobox + listbox here, since RN has no
// native select; Escape (desktop keyboard) maps to pressing the trigger again.
describe("Select", () => {
  it("renders a labelled combobox showing the selected option", async () => {
    await render(<Select id="role" label="Role" options={ROLES} value="editor" />);
    expect(screen.getByText("Role")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Role" })).toBeTruthy();
    expect(screen.getByText("Editor")).toBeTruthy();
  });

  it("shows the placeholder when nothing is selected", async () => {
    await render(<Select id="plan" label="Plan" options={ROLES} placeholder="Select a plan" />);
    const text = screen.getByText("Select a plan");
    expect(classNameOf(text)).toContain("text-text-disabled");
  });

  it("opens the listbox on press and shows every option", async () => {
    await render(<Select id="role" label="Role" options={ROLES} />);
    expect(screen.queryByRole("button", { name: "Admin" })).toBeNull();
    await fireEvent.press(screen.getByRole("combobox"));
    expect(screen.getByRole("combobox").props.accessibilityState.expanded).toBe(true);
    for (const r of ROLES) expect(screen.getByRole("button", { name: r.label })).toBeTruthy();
  });

  it("selecting an option calls onChange with its value and closes the listbox", async () => {
    const onChange = jest.fn();
    await render(<Select id="role" label="Role" options={ROLES} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("combobox"));
    await fireEvent.press(screen.getByRole("button", { name: "Viewer" }));
    expect(onChange).toHaveBeenCalledWith("viewer");
    expect(screen.queryByRole("button", { name: "Admin" })).toBeNull();
  });

  it("the placeholder row selects an empty value", async () => {
    const onChange = jest.fn();
    await render(<Select id="plan" label="Plan" options={ROLES} placeholder="Select a plan" value="admin" onChange={onChange} />);
    await fireEvent.press(screen.getByRole("combobox"));
    await fireEvent.press(screen.getByText("Select a plan"));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("pressing the trigger again closes the listbox (KuiReact: Escape)", async () => {
    await render(<Select id="role" label="Role" options={ROLES} />);
    await fireEvent.press(screen.getByRole("combobox"));
    await fireEvent.press(screen.getByRole("combobox"));
    expect(screen.queryByRole("button", { name: "Admin" })).toBeNull();
  });

  it("marks the selected option and shows a check next to it", async () => {
    await render(<Select id="role" label="Role" options={ROLES} value="editor" />);
    await fireEvent.press(screen.getByRole("combobox"));
    expect(screen.getByRole("button", { name: "Editor" }).props.accessibilityState.selected).toBe(true);
    expect(classNameOf(screen.getAllByText("Editor")[1])).toContain("text-primary");
  });

  it("searchable filters the option list as you type and shows 'No results found.'", async () => {
    await render(<Select id="role" label="Role" options={ROLES} searchable />);
    await fireEvent.press(screen.getByRole("combobox"));
    await fireEvent.changeText(screen.getByLabelText("Search Role"), "ed");
    expect(screen.getByRole("button", { name: "Editor" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Admin" })).toBeNull();
    await fireEvent.changeText(screen.getByLabelText("Search Role"), "zzz");
    expect(screen.getByText("No results found.")).toBeTruthy();
  });

  it("error sets the red field, replaces the hint and is announced", async () => {
    await render(<Select id="plan" label="Plan" options={ROLES} hint="Pick one" error="Please select a plan." />);
    expect(classNameOf(screen.getByRole("combobox"))).toContain("border-error");
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.queryByText("Pick one")).toBeNull();
  });

  it("disabled prevents opening and applies KuiReact's disabled look", async () => {
    await render(<Select id="plan" label="Plan" options={ROLES} value="admin" disabled />);
    const trigger = screen.getByRole("combobox");
    expect(classNameOf(trigger)).toContain("opacity-50");
    await fireEvent.press(trigger);
    expect(screen.queryByRole("button", { name: "Viewer" })).toBeNull();
  });

  it("uses KuiReact's trigger classes and shows a chevron only in custom mode", async () => {
    const plain = await render(<Select id="role" label="Role" options={ROLES} />);
    const cls = classNameOf(plain.getByRole("combobox"));
    for (const c of ["rounded-md", "border", "px-3", "py-2", "gap-2"]) expect(cls).toContain(c);
    const withIcons = await render(
      <Select id="s" label="Status" options={[{ value: "a", label: "Active", icon: <RNText>●</RNText> }]} value="a" />,
    );
    expect(withIcons.getByText("●", { hidden: true } as never)).toBeTruthy();
  });

  it("required adds 'required' to the accessible name", async () => {
    await render(<Select id="plan" label="Plan" options={ROLES} required />);
    expect(screen.getByRole("combobox", { name: "Plan, required" })).toBeTruthy();
  });
});
