import { fireEvent, render, screen } from "@testing-library/react-native";

import { TextInput } from "./TextInput";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Pixel-metric assertions below lock in KuiReact's exact Input field classes
// (modules/ui/Input.tsx): rounded-md, py-2, text-sm. A prior KuiNative
// version used rounded-lg/py-2.5/text-base — visually close but not
// pixel-perfect, and noticeably taller.
describe("TextInput", () => {
  it("renders the label", async () => {
    await render(<TextInput label="Email" />);
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("matches KuiReact's radius, padding and text size", async () => {
    await render(<TextInput label="Email" testID="field" />);
    const className = classNameOf(screen.getByTestId("field"));
    expect(className).toContain("rounded-md");
    expect(className).not.toContain("rounded-lg");
    expect(className).toContain("py-2");
    expect(className).not.toContain("py-2.5");
    expect(className).toContain("text-sm");
    expect(className).not.toContain("text-base");
  });

  it("defaults to the border-border color when not focused/errored", async () => {
    await render(<TextInput testID="field" />);
    expect(classNameOf(screen.getByTestId("field"))).toContain("border-border");
  });

  it("switches to border-border-focus while focused", async () => {
    // @testing-library/react-native v14 made both render() and fireEvent()
    // async (they wrap state updates in `act()`) — both must be awaited or
    // the assertion below runs against the pre-update render.
    await render(<TextInput testID="field" />);
    await fireEvent(screen.getByTestId("field"), "focus");
    expect(classNameOf(screen.getByTestId("field"))).toContain("border-border-focus");
    await fireEvent(screen.getByTestId("field"), "blur");
    expect(classNameOf(screen.getByTestId("field"))).not.toContain("border-border-focus");
  });

  it("error state sets border-error and bg-error-subtle (matching KuiReact's error background)", async () => {
    await render(<TextInput testID="field" error="Required" />);
    const className = classNameOf(screen.getByTestId("field"));
    expect(className).toContain("border-error");
    expect(className).toContain("bg-error-subtle");
    expect(screen.getByText("Required")).toBeTruthy();
  });

  it("renders a hint only when there is no error", async () => {
    const withHint = await render(<TextInput hint="We never share it" />);
    expect(withHint.getByText("We never share it")).toBeTruthy();
    const withBoth = await render(<TextInput hint="We never share it" error="Required" />);
    expect(withBoth.queryByText("We never share it")).toBeNull();
    expect(withBoth.getByText("Required")).toBeTruthy();
  });

  it("forwards onChangeText", async () => {
    const onChangeText = jest.fn();
    await render(<TextInput testID="field" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByTestId("field"), "hi");
    expect(onChangeText).toHaveBeenCalledWith("hi");
  });
});
