import { fireEvent, render, screen } from "@testing-library/react-native";

import { ViewToggle } from "./ViewToggle";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("ViewToggle", () => {
  it("marks the active option and reports changes", async () => {
    const onChange = jest.fn();
    await render(<ViewToggle value="horizontal" onChange={onChange} />);
    expect(screen.getByRole("button", { name: "Horizontal" }).props.accessibilityState.selected).toBe(true);
    await fireEvent.press(screen.getByRole("button", { name: "Vertical" }));
    expect(onChange).toHaveBeenCalledWith("vertical");
    expect(classNameOf(screen.getByRole("button", { name: "Horizontal" }))).toContain("bg-primary");
  });

  it("supports custom labels", async () => {
    await render(<ViewToggle value="vertical" onChange={() => {}} labels={{ horizontal: "Yatay", vertical: "Dikey" }} />);
    expect(screen.getByText("Yatay")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Dikey" }).props.accessibilityState.selected).toBe(true);
  });
});
