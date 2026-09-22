import { fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo, Text as RNText } from "react-native";

import { Drawer } from "./Drawer";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(true);
});

// Ports KuiReact's Drawer tests (modules/ui/Overlays/Drawer/Drawer.test.tsx);
// Escape becomes Android back (onRequestClose).
describe("Drawer", () => {
  it("renders nothing when closed", async () => {
    await render(
      <Drawer open={false} onClose={() => {}} title="Settings">
        <RNText>content</RNText>
      </Drawer>,
    );
    expect(screen.queryByText("Settings")).toBeNull();
  });

  it("uses the title as its accessible name and announces it as a header", async () => {
    await render(<Drawer open onClose={() => {}} title="Settings" />);
    expect(screen.getByLabelText("Settings")).toBeTruthy();
    expect(screen.getByRole("header", { name: "Settings" })).toBeTruthy();
  });

  it("defaults to the right side (border on the inner, left edge)", async () => {
    await render(<Drawer open onClose={() => {}} title="Settings" />);
    const panel = classNameOf(screen.getByTestId("drawer-panel"));
    expect(panel).toContain("border-l");
    expect(panel).not.toContain("border-r");
  });

  it("side='left' renders on the left (border on the right edge)", async () => {
    await render(<Drawer open onClose={() => {}} title="Navigation" side="left" />);
    expect(classNameOf(screen.getByTestId("drawer-panel"))).toContain("border-r");
  });

  it("Android back (onRequestClose) calls onClose — RN's equivalent of Escape", async () => {
    const onClose = jest.fn();
    await render(<Drawer open onClose={onClose} title="Settings" />);
    const modal = screen.container.queryAll((n) => typeof n.props.onRequestClose === "function")[0];
    modal.props.onRequestClose();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on a backdrop press", async () => {
    const onClose = jest.fn();
    await render(<Drawer open onClose={onClose} title="Settings" />);
    await fireEvent.press(screen.getByTestId("overlay-backdrop", { hidden: true } as never));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("the close button calls onClose", async () => {
    const onClose = jest.fn();
    await render(<Drawer open onClose={onClose} title="Settings" />);
    await fireEvent.press(screen.getByRole("button", { name: "Close drawer" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders the footer when given one", async () => {
    await render(<Drawer open onClose={() => {}} title="Settings" footer={<RNText>Save</RNText>} />);
    expect(screen.getByText("Save")).toBeTruthy();
  });

  it("uses KuiReact's panel surface: bg-surface-raised, shadow-xl", async () => {
    await render(<Drawer open onClose={() => {}} title="Settings" />);
    const panel = classNameOf(screen.getByTestId("drawer-panel"));
    expect(panel).toContain("bg-surface-raised");
    expect(panel).toContain("shadow-xl");
  });
});
