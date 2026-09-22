import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { SearchBar } from "./SearchBar";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const field = () => screen.getByTestId("searchbar-search");

describe("SearchBar", () => {
  it("renders a searchbox with the default placeholder", async () => {
    await render(<SearchBar />);
    expect(field().props.role).toBe("searchbox");
    expect(field().props.placeholder).toBe("Search…");
  });

  it("uncontrolled: typing updates the value and shows the clear button", async () => {
    const onChange = jest.fn();
    await render(<SearchBar onChange={onChange} />);
    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
    await fireEvent.changeText(field(), "but");
    expect(onChange).toHaveBeenCalledWith("but");
    expect(field().props.value).toBe("but");
    expect(screen.getByRole("button", { name: "Clear search" })).toBeTruthy();
    expect(classNameOf(field())).toContain("pr-8");
  });

  it("clear empties the field and calls onChange('') and onClear", async () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    await render(<SearchBar onChange={onChange} onClear={onClear} />);
    await fireEvent.changeText(field(), "x");
    await fireEvent.press(screen.getByRole("button", { name: "Clear search" }));
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(field().props.value).toBe("");
  });

  it("controlled: renders the given value and does not change it itself", async () => {
    const onChange = jest.fn();
    await render(<SearchBar value="Button" onChange={onChange} />);
    expect(field().props.value).toBe("Button");
    await fireEvent.changeText(field(), "Butt");
    expect(onChange).toHaveBeenCalledWith("Butt");
    expect(field().props.value).toBe("Button");
  });

  it("uses the id for its testID", async () => {
    await render(<SearchBar id="docs" />);
    expect(screen.getByTestId("searchbar-docs")).toBeTruthy();
  });

  it("uses KuiReact's field classes and draws the focus ring", async () => {
    await render(<SearchBar />);
    for (const c of ["rounded-md", "border-border", "bg-surface-base", "pl-8", "py-2", "text-sm"]) {
      expect(classNameOf(field())).toContain(c);
    }
    await fireEvent(field(), "focus");
    expect(classNameOf(field())).toContain("border-border-focus");
    expect(StyleSheet.flatten(field().props.style).outlineWidth).toBe(2);
  });
});
