import { fireEvent, render, screen } from "@testing-library/react-native";

import { Badge } from "./Badge";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("Badge", () => {
  it("renders children (KuiReact API)", async () => {
    await render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active")).toBeTruthy();
  });

  it("still accepts the deprecated label prop", async () => {
    await render(<Badge label="Legacy" />);
    expect(screen.getByText("Legacy")).toBeTruthy();
  });

  it("defaults to KuiReact's neutral variant", async () => {
    await render(<Badge testID="b">Design</Badge>);
    expect(classNameOf(screen.getByTestId("b"))).toContain("bg-surface-sunken");
    expect(classNameOf(screen.getByText("Design"))).toContain("text-text-secondary");
  });

  it.each([
    ["success", "bg-success-subtle", "text-success-fg"],
    ["error", "bg-error-subtle", "text-error-fg"],
    ["warning", "bg-warning-subtle", "text-warning-fg"],
    ["info", "bg-info-subtle", "text-info-fg"],
    ["neutral", "bg-surface-sunken", "text-text-secondary"],
    ["primary", "bg-primary-subtle", "text-primary"],
  ] as const)("variant=%s uses %s / %s", async (variant, bg, fg) => {
    await render(
      <Badge variant={variant} testID="b">
        x
      </Badge>,
    );
    expect(classNameOf(screen.getByTestId("b"))).toContain(bg);
    expect(classNameOf(screen.getByText("x"))).toContain(fg);
  });

  it.each([
    ["sm", "px-1.5", "text-[10px]"],
    ["md", "px-2", "text-xs"],
    ["lg", "px-3", "text-sm"],
  ] as const)("size=%s uses KuiReact's %s padding and %s text", async (size, px, text) => {
    await render(
      <Badge size={size} testID="b">
        x
      </Badge>,
    );
    expect(classNameOf(screen.getByTestId("b"))).toContain(px);
    expect(classNameOf(screen.getByText("x"))).toContain(text);
  });

  it("dot renders a 6px dot in the variant colour", async () => {
    await render(
      <Badge variant="success" dot testID="b">
        Online
      </Badge>,
    );
    const dot = screen.container.queryAll((n) => classNameOf(n as never).includes("h-1.5"), { includeHiddenElements: true } as never)[0];
    expect(classNameOf(dot as never)).toContain("bg-success");
  });

  it("dismissible renders a Remove button that calls onDismiss", async () => {
    const onDismiss = jest.fn();
    await render(
      <Badge variant="primary" dismissible onDismiss={onDismiss}>
        React
      </Badge>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Remove" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("is not dismissible by default", async () => {
    await render(<Badge>x</Badge>);
    expect(screen.queryByRole("button", { name: "Remove" })).toBeNull();
  });
});
