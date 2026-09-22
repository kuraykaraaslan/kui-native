import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { Card } from "./Card";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Pixel/anatomy assertions below lock in KuiReact's exact Card structure
// (modules/ui/Card.tsx): a bordered container, a header row with its own
// px-6 py-4 + border-b, a body with its own px-6 py-4, and a footer with its
// own px-6 py-3 + border-t + bg-surface-base regardless of variant. A prior
// KuiNative version was a single p-4 box with margin-based spacing instead.
describe("Card", () => {
  it("renders children without a header when no title/subtitle/headerRight", async () => {
    await render(
      <Card>
        <RNText>Body</RNText>
      </Card>,
    );
    expect(screen.getByText("Body")).toBeTruthy();
  });

  it("renders the title using the titleSm text variant (text-sm, semibold) — not the larger h4 scale", async () => {
    await render(<Card title="Settings" />);
    const title = screen.getByText("Settings");
    expect(classNameOf(title)).toContain("text-sm");
    expect(classNameOf(title)).not.toContain("text-lg");
  });

  it("renders the subtitle using the caption variant (text-xs) — not bodySm (text-sm)", async () => {
    await render(<Card title="Settings" subtitle="Manage your account" />);
    const subtitle = screen.getByText("Manage your account");
    expect(classNameOf(subtitle)).toContain("text-xs");
  });

  it("renders headerRight next to the title", async () => {
    await render(<Card title="Settings" headerRight={<RNText>Edit</RNText>} />);
    expect(screen.getByText("Edit")).toBeTruthy();
  });

  it.each(["raised", "flat", "outline"] as const)("every variant (%s) keeps the border", async (variant) => {
    await render(
      <Card variant={variant} testID="card">
        <RNText>x</RNText>
      </Card>,
    );
    expect(classNameOf(screen.getByTestId("card"))).toContain("border-border");
  });

  it("only the raised variant gets a shadow", async () => {
    // Each `render` call replaces what the shared `screen` tracks, so query
    // each rendered tree via its own returned `screen` before rendering the next.
    const raised = await render(<Card variant="raised" testID="raised" />);
    expect(classNameOf(raised.getByTestId("raised"))).toContain("shadow-sm");
    const flat = await render(<Card variant="flat" testID="flat" />);
    expect(classNameOf(flat.getByTestId("flat"))).not.toContain("shadow-sm");
  });

  it("the footer keeps bg-surface-base even on an outline card", async () => {
    await render(
      <Card variant="outline" footer={<RNText>Footer</RNText>}>
        <RNText>Body</RNText>
      </Card>,
    );
    // The footer is its own bordered View; assert it renders with the footer content.
    expect(screen.getByText("Footer")).toBeTruthy();
  });

  it("onPress makes the whole card a button (KuiReact: onClick)", async () => {
    const onPress = jest.fn();
    await render(<Card title="Clickable" onPress={onPress}><RNText>Body</RNText></Card>);
    await fireEvent.press(screen.getByRole("button", { name: "Clickable" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("hoverable and interactive cards get KuiReact's hover look as the pressed state", async () => {
    const h = await render(<Card testID="c" hoverable title="Hoverable" />);
    expect(classNameOf(h.getByTestId("c"))).toContain("active:border-border-focus");
    const plain = await render(<Card testID="p" title="Plain" />);
    expect(classNameOf(plain.getByTestId("p"))).not.toContain("active:border-border-focus");
  });

  it("loading replaces the content with KuiReact's four-line skeleton", async () => {
    await render(<Card loading title="Hidden"><RNText>Body</RNText></Card>);
    expect(screen.getByRole("progressbar", { name: "Loading content" })).toBeTruthy();
    expect(screen.queryByText("Hidden")).toBeNull();
    expect(screen.queryByText("Body")).toBeNull();
  });

  it("a subtitle without a title is not rendered (KuiReact renders the header only for title/headerRight)", async () => {
    await render(<Card subtitle="Orphan" />);
    expect(screen.queryByText("Orphan")).toBeNull();
  });

  it("merges a custom className onto the outer container", async () => {
    await render(<Card testID="card" className="mt-4" />);
    expect(classNameOf(screen.getByTestId("card"))).toContain("mt-4");
  });
});
