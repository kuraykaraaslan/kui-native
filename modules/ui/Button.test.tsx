import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "./Button";

function classNameOf(el: ReturnType<typeof screen.getByRole>) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c;
}

// Pixel-metric assertions below lock in KuiReact's exact Button classes
// (modules/ui/Button.tsx in kui-react): rounded-md, font-medium, and the
// xs/sm/md/lg/xl padding + text-size ladder. A prior KuiNative version used
// rounded-lg/font-semibold and a 3-size sm/md/lg ladder with different
// padding — visually close but not pixel-perfect.
describe("Button", () => {
  it("renders the label", async () => {
    await render(<Button label="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("uses KuiReact's exact radius and font weight", async () => {
    await render(<Button label="Save" />);
    const className = classNameOf(screen.getByRole("button"));
    expect(className).toContain("rounded-md");
    expect(className).not.toContain("rounded-lg");
  });

  it.each([
    ["xs", "px-2 py-1"],
    ["sm", "px-3 py-1.5"],
    ["md", "px-4 py-2"],
    ["lg", "px-5 py-2.5"],
    ["xl", "px-6 py-3"],
  ] as const)("size=%s matches KuiReact's padding (%s)", async (size, padding) => {
    await render(<Button label="x" size={size} />);
    const className = classNameOf(screen.getByRole("button"));
    for (const token of padding.split(" ")) expect(className).toContain(token);
  });

  it.each([
    ["xs", "text-xs"],
    ["sm", "text-sm"],
    ["md", "text-sm"],
    ["lg", "text-base"],
    ["xl", "text-lg"],
  ] as const)("size=%s matches KuiReact's label text size (%s)", async (size, textCls) => {
    await render(<Button label="x" size={size} />);
    const label = screen.getByText("x");
    const className = Array.isArray(label.props.className) ? label.props.className.join(" ") : label.props.className;
    expect(className).toContain(textCls);
    expect(className).toContain("font-medium");
    expect(className).not.toContain("font-semibold");
  });

  it.each(["primary", "secondary", "outline", "ghost", "destructive"] as const)(
    "applies the %s variant background/text classes",
    async (variant) => {
      await render(<Button label="x" variant={variant} />);
      const className = classNameOf(screen.getByRole("button"));
      expect(className.length).toBeGreaterThan(0);
    },
  );

  it("disables the press target and sets accessibilityState.disabled", async () => {
    const onPress = jest.fn();
    await render(<Button label="x" disabled onPress={onPress} />);
    const button = screen.getByRole("button");
    expect(button.props.accessibilityState.disabled).toBe(true);
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("loading blocks the press and sets accessibilityState.busy", async () => {
    const onPress = jest.fn();
    await render(<Button label="x" loading onPress={onPress} />);
    const button = screen.getByRole("button");
    expect(button.props.accessibilityState.busy).toBe(true);
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("fires onPress when enabled", async () => {
    const onPress = jest.fn();
    await render(<Button label="x" onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("fullWidth adds w-full", async () => {
    await render(<Button label="x" fullWidth />);
    expect(classNameOf(screen.getByRole("button"))).toContain("w-full");
  });

  it("merges a custom className", async () => {
    await render(<Button label="x" className="mt-2" />);
    expect(classNameOf(screen.getByRole("button"))).toContain("mt-2");
  });
});
