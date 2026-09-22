import { render, screen } from "@testing-library/react-native";
import { fireEvent } from "@testing-library/react-native";

import { Label } from "./Label";

describe("Label", () => {
  it("renders its text", async () => {
    await render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("required sets an accessible name including 'required' and still shows the visible *", async () => {
    await render(<Label required>Email</Label>);
    expect(screen.getByLabelText("Email, required")).toBeTruthy();
    expect(screen.getByText("*", { exact: false })).toBeTruthy();
  });

  it("is not required by default", async () => {
    await render(<Label>Email</Label>);
    expect(screen.queryByLabelText("Email, required")).toBeNull();
  });

  it("disabled applies the disabled text color instead of font-medium", async () => {
    await render(<Label disabled>Email</Label>);
    const text = screen.getByText("Email");
    const className = Array.isArray(text.props.className) ? text.props.className.join(" ") : text.props.className;
    expect(className).toContain("text-text-disabled");
    expect(className).not.toContain("font-medium");
  });

  it("calls onPress when provided and the label is pressed", async () => {
    const onPress = jest.fn();
    await render(<Label onPress={onPress}>Notifications</Label>);
    await fireEvent.press(screen.getByText("Notifications"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", async () => {
    const onPress = jest.fn();
    await render(
      <Label onPress={onPress} disabled>
        Notifications
      </Label>,
    );
    await fireEvent.press(screen.getByText("Notifications"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("renders as plain text (no Pressable) when onPress is not provided", async () => {
    await render(<Label>Static</Label>);
    // A plain label has no "none"-role Pressable wrapper; querying by role
    // "button"/"none" as a distinct interactive element should find nothing.
    expect(screen.queryByRole("none")).toBeNull();
  });
});
