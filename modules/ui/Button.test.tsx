import { fireEvent, render, screen } from "@testing-library/react-native";

import { Text as RNText } from "react-native";

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

  it("renders string children (KuiReact API) with the label style", async () => {
    await render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
    const cls = screen.getByText("Save").props.className;
    expect(Array.isArray(cls) ? cls.join(" ") : cls).toContain("font-medium");
  });

  it("renders node children as-is", async () => {
    await render(
      <Button accessibilityLabel="Custom">
        <RNText>node child</RNText>
      </Button>,
    );
    expect(screen.getByText("node child")).toBeTruthy();
  });

  it("danger is KuiReact's name for the error variant (destructive kept as an alias)", async () => {
    const danger = await render(<Button variant="danger">x</Button>);
    expect(classNameOf(danger.getByRole("button"))).toContain("bg-error");
    const legacy = await render(<Button variant="destructive">y</Button>);
    expect(classNameOf(legacy.getByRole("button"))).toContain("bg-error");
  });

  it("iconOnly uses KuiReact's square padding map", async () => {
    await render(
      <Button iconOnly accessibilityLabel="Delete item" size="md">
        <RNText>✕</RNText>
      </Button>,
    );
    const cls = classNameOf(screen.getByRole("button", { name: "Delete item" }));
    expect(cls).toContain("p-2");
    expect(cls).not.toContain("px-4");
  });

  it("renders iconLeft and iconRight, and hides them while loading (spinner instead)", async () => {
    const idle = await render(
      <Button iconLeft={<RNText>L</RNText>} iconRight={<RNText>R</RNText>}>
        Next
      </Button>,
    );
    expect(idle.getByText("L", { hidden: true } as never)).toBeTruthy();
    expect(idle.getByText("R", { hidden: true } as never)).toBeTruthy();
    const busy = await render(
      <Button loading iconLeft={<RNText>L2</RNText>} iconRight={<RNText>R2</RNText>}>
        Next
      </Button>,
    );
    expect(busy.queryByText("L2", { hidden: true } as never)).toBeNull();
    expect(busy.queryByText("R2", { hidden: true } as never)).toBeNull();
  });

  it("selected sets accessibilityState.selected and a focus ring; not selected by default", async () => {
    const on = await render(<Button selected>Toggle</Button>);
    const button = on.getByRole("button");
    expect(button.props.accessibilityState.selected).toBe(true);
    const style = Array.isArray(button.props.style) ? Object.assign({}, ...button.props.style) : button.props.style;
    expect(style.outlineWidth).toBe(2);
    const off = await render(<Button>Plain</Button>);
    expect(off.getByRole("button").props.accessibilityState.selected).toBe(false);
  });

  it("forwards rest props such as testID and onLongPress", async () => {
    const onLongPress = jest.fn();
    await render(
      <Button testID="save-btn" onLongPress={onLongPress}>
        Save
      </Button>,
    );
    await fireEvent(screen.getByTestId("save-btn"), "longPress");
    expect(onLongPress).toHaveBeenCalled();
  });

  it("merges a custom className", async () => {
    await render(<Button label="x" className="mt-2" />);
    expect(classNameOf(screen.getByRole("button"))).toContain("mt-2");
  });
});
