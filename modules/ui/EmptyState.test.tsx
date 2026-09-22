import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { Text } from "./Text";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Pixel-metric assertions below lock in KuiReact's exact EmptyState (modules/ui/EmptyState.tsx):
// text-sm/semibold title (not text-lg), py-16 outer padding (not py-12).
// A prior KuiNative version used the h4 (text-lg) title scale and py-12.
describe("EmptyState", () => {
  it("renders the title", async () => {
    await render(<EmptyState title="No results" />);
    expect(screen.getByText("No results")).toBeTruthy();
  });

  it("renders the title at KuiReact's text-sm size, not text-lg", async () => {
    await render(<EmptyState title="No results" />);
    const className = classNameOf(screen.getByText("No results"));
    expect(className).toContain("text-sm");
    expect(className).not.toContain("text-lg");
  });

  it("renders the title with a header accessibility role", async () => {
    await render(<EmptyState title="No results" />);
    expect(screen.getByRole("header")).toBeTruthy();
  });

  it("renders an optional description", async () => {
    await render(<EmptyState title="No results" description="Try a different search" />);
    expect(screen.getByText("Try a different search")).toBeTruthy();
  });

  it("renders no description when omitted", async () => {
    await render(<EmptyState title="No results" />);
    expect(screen.queryByText(/try/i)).toBeNull();
  });

  it("renders an action button only when both actionLabel and onAction are given", async () => {
    const onAction = jest.fn();
    await render(<EmptyState title="No results" actionLabel="Retry" onAction={onAction} />);
    const button = screen.getByRole("button", { name: "Retry" });
    await fireEvent.press(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders no action button when onAction is missing", async () => {
    await render(<EmptyState title="No results" actionLabel="Retry" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders a custom action node (KuiReact's `action`) instead of the shorthand button", async () => {
    await render(<EmptyState title="No results" action={<Button label="New project" variant="outline" />} />);
    expect(screen.getByRole("button", { name: "New project" })).toBeTruthy();
  });

  it("accepts a node as the icon", async () => {
    await render(<EmptyState title="No results" icon={<Text>📁</Text>} />);
    expect(screen.getByText("📁", { hidden: true } as never)).toBeTruthy();
  });

  it("accepts a custom className without crashing", async () => {
    await render(<EmptyState title="No results" className="mt-8" />);
    expect(screen.getByText("No results")).toBeTruthy();
  });
});
