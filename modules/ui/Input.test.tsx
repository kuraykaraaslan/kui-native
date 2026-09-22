import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText, type TextInput as RNTextInput } from "react-native";

import { Input } from "./Input";
import { TextInput } from "./TextInput";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Ports KuiReact's Input tests (modules/ui/Input.test.tsx) plus pixel checks.
describe("Input", () => {
  it("renders with a label that names the field", async () => {
    await render(<Input label="Email" testID="f" />);
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByTestId("f").props.accessibilityLabel).toBe("Email");
  });

  it("required shows the visible marker and adds 'required' to the accessible name", async () => {
    await render(<Input label="Name" required testID="f" />);
    expect(screen.getByText(" *")).toBeTruthy();
    expect(screen.getByTestId("f").props.accessibilityLabel).toBe("Name, required");
  });

  it("error reddens the field, is announced and becomes the accessibility hint", async () => {
    await render(<Input label="Password" error="Too short" testID="f" />);
    expect(screen.getByRole("alert")).toBeTruthy();
    const f = screen.getByTestId("f");
    expect(classNameOf(f)).toContain("border-error");
    expect(classNameOf(f)).toContain("bg-error-subtle");
    expect(f.props.accessibilityHint).toBe("Too short");
  });

  it("hint renders and is the accessibility hint when there is no error/success", async () => {
    await render(<Input label="Bio" hint="Max 200 characters" testID="f" />);
    expect(screen.getByText("Max 200 characters")).toBeTruthy();
    expect(screen.getByTestId("f").props.accessibilityHint).toBe("Max 200 characters");
  });

  it("success shows the success message and styling (and hides the hint)", async () => {
    await render(<Input label="Username" hint="h" success="Username is available!" testID="f" />);
    expect(screen.getByText("Username is available!")).toBeTruthy();
    expect(screen.queryByText("h")).toBeNull();
    expect(classNameOf(screen.getByTestId("f"))).toContain("border-success");
  });

  it("type=password starts masked and toggles with the eye button", async () => {
    await render(<Input label="Password" type="password" value="secret" onChangeText={() => {}} testID="f" />);
    expect(screen.getByTestId("f").props.secureTextEntry).toBe(true);
    await fireEvent.press(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByTestId("f").props.secureTextEntry).toBe(false);
    await fireEvent.press(screen.getByRole("button", { name: "Hide password" }));
    expect(screen.getByTestId("f").props.secureTextEntry).toBe(true);
  });

  it("clearable shows a Clear button only when there is a value, and it calls onClear", async () => {
    const onClear = jest.fn();
    const empty = await render(<Input label="Search" clearable value="" onChangeText={() => {}} onClear={onClear} />);
    expect(empty.queryByRole("button", { name: "Clear" })).toBeNull();
    const filled = await render(<Input label="Search" clearable value="abc" onChangeText={() => {}} onClear={onClear} />);
    await fireEvent.press(filled.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("showCount + maxLength renders a live character count that turns red at the limit", async () => {
    const under = await render(<Input label="Tweet" value="hello" onChangeText={() => {}} showCount maxLength={10} />);
    expect(classNameOf(under.getByText("5/10"))).toContain("text-text-disabled");
    const full = await render(<Input label="Tweet" value="0123456789" onChangeText={() => {}} showCount maxLength={10} />);
    expect(classNameOf(full.getByText("10/10"))).toContain("text-error");
  });

  it("forwards the ref to the underlying TextInput", async () => {
    const ref = createRef<RNTextInput>();
    await render(<Input label="Ref test" ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("readOnly makes the field non-editable, sunken, and adds the '(read-only)' suffix", async () => {
    await render(<Input label="Locked" readOnly value="fixed" testID="f" />);
    expect(screen.getByText("(read-only)", { exact: false })).toBeTruthy();
    expect(screen.getByTestId("f").props.editable).toBe(false);
    expect(classNameOf(screen.getByTestId("f"))).toContain("bg-surface-sunken");
  });

  it("type=number shows a stepper that respects step/min/max", async () => {
    const onChangeText = jest.fn();
    await render(<Input label="Quantity" type="number" value="98" onChangeText={onChangeText} min={0} max={99} step={2} />);
    await fireEvent.press(screen.getByRole("button", { name: "Increment" }));
    expect(onChangeText).toHaveBeenLastCalledWith("99");
    await fireEvent.press(screen.getByRole("button", { name: "Decrement" }));
    expect(onChangeText).toHaveBeenLastCalledWith("96");
  });

  it("prefix and suffix icons render and pad the field (pl-9 / pr-9)", async () => {
    await render(<Input label="Price" testID="f" prefixIcon={<RNText>@</RNText>} suffixIcon={<RNText>USD</RNText>} />);
    expect(screen.getByText("@")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();
    const cls = classNameOf(screen.getByTestId("f"));
    expect(cls).toContain("pl-9");
    expect(cls).toContain("pr-9");
  });

  it("uses KuiReact's field classes; className targets the wrapper and inputClassName the field", async () => {
    await render(<Input label="Email" testID="f" className="mt-4" inputClassName="tracking-wide" />);
    const cls = classNameOf(screen.getByTestId("f"));
    for (const c of ["rounded-md", "px-3", "py-2", "text-sm", "border-border", "tracking-wide"]) expect(cls).toContain(c);
    expect(cls).not.toContain("mt-4");
  });

  it("switches to border-border-focus while focused", async () => {
    await render(<Input label="Email" testID="f" />);
    await fireEvent(screen.getByTestId("f"), "focus");
    expect(classNameOf(screen.getByTestId("f"))).toContain("border-border-focus");
  });

  it("disabled is non-editable with KuiReact's disabled look", async () => {
    await render(<Input label="Email" disabled testID="f" />);
    const f = screen.getByTestId("f");
    expect(f.props.editable).toBe(false);
    expect(classNameOf(f)).toContain("opacity-50");
  });

  it("the deprecated TextInput alias is the same component", async () => {
    await render(<TextInput label="Legacy" testID="f" />);
    expect(screen.getByTestId("f").props.accessibilityLabel).toBe("Legacy");
  });
});
