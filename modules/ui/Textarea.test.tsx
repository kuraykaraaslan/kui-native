import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import type { TextInput as RNTextInput } from "react-native";

import { Textarea } from "./Textarea";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}
function flatStyle(el: { props: { style?: unknown } }) {
  const s = el.props.style;
  return (Array.isArray(s) ? Object.assign({}, ...s.flat().filter(Boolean)) : s) as { minHeight?: number };
}

// Ports KuiReact's Textarea contract (modules/ui/Textarea.tsx).
describe("Textarea", () => {
  it("renders the label and a multiline field", async () => {
    await render(<Textarea label="Message" testID="ta" />);
    expect(screen.getByText("Message")).toBeTruthy();
    expect(screen.getByTestId("ta").props.multiline).toBe(true);
  });

  it("uses KuiReact's field classes: rounded-md, px-3 py-2, text-sm, border-border", async () => {
    await render(<Textarea label="Message" testID="ta" />);
    const className = classNameOf(screen.getByTestId("ta"));
    for (const c of ["rounded-md", "px-3", "py-2", "text-sm", "border-border", "bg-surface-base"]) {
      expect(className).toContain(c);
    }
  });

  it("sizes the field from rows like a browser textarea (rows × 20px + padding + border)", async () => {
    const four = await render(<Textarea label="M" testID="ta" />);
    expect(flatStyle(four.getByTestId("ta")).minHeight).toBe(4 * 20 + 18);
    const two = await render(<Textarea label="M" testID="ta2" rows={2} />);
    expect(flatStyle(two.getByTestId("ta2")).minHeight).toBe(2 * 20 + 18);
  });

  it("required adds the marker and 'required' to the accessible name", async () => {
    await render(<Textarea label="Message" required testID="ta" />);
    expect(screen.getByTestId("ta").props.accessibilityLabel).toBe("Message, required");
    expect(screen.getByText("*", { exact: false })).toBeTruthy();
  });

  it("error replaces the hint, turns the field red and is announced", async () => {
    await render(<Textarea label="Message" testID="ta" hint="Max 500 characters." error="Message is required." />);
    expect(screen.queryByText("Max 500 characters.")).toBeNull();
    expect(screen.getByRole("alert")).toBeTruthy();
    const className = classNameOf(screen.getByTestId("ta"));
    expect(className).toContain("border-error");
    expect(className).toContain("bg-error-subtle");
    expect(screen.getByTestId("ta").props.accessibilityHint).toBe("Message is required.");
  });

  it("renders the hint when there is no error", async () => {
    await render(<Textarea label="Message" hint="Max 500 characters." />);
    expect(screen.getByText("Max 500 characters.")).toBeTruthy();
  });

  it("disabled makes the field read-only with KuiReact's disabled look", async () => {
    await render(<Textarea label="Message" disabled testID="ta" />);
    const field = screen.getByTestId("ta");
    expect(field.props.editable).toBe(false);
    expect(classNameOf(field)).toContain("opacity-50");
    expect(classNameOf(field)).toContain("bg-surface-sunken");
  });

  it("switches to border-border-focus while focused", async () => {
    await render(<Textarea label="Message" testID="ta" />);
    await fireEvent(screen.getByTestId("ta"), "focus");
    expect(classNameOf(screen.getByTestId("ta"))).toContain("border-border-focus");
  });

  it("forwards onChangeText and the ref", async () => {
    const onChangeText = jest.fn();
    const ref = createRef<RNTextInput>();
    await render(<Textarea label="Message" testID="ta" onChangeText={onChangeText} ref={ref} />);
    await fireEvent.changeText(screen.getByTestId("ta"), "hi");
    expect(onChangeText).toHaveBeenCalledWith("hi");
    expect(ref.current).toBeTruthy();
  });
});
