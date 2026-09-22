import { createRef } from "react";
import type { View } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo, Text as RNText } from "react-native";

import { Modal } from "./Modal";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

beforeEach(() => {
  // Deterministic: skip the 200ms enter/exit animation.
  jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(true);
});

// Ports KuiReact's Modal tests (modules/ui/Overlays/Modal/Modal.test.tsx) —
// Escape becomes Android back (onRequestClose) — plus pixel/anatomy checks.
describe("Modal", () => {
  it("renders nothing when closed", async () => {
    await render(
      <Modal open={false} onClose={() => {}} title="Hidden">
        <RNText>content</RNText>
      </Modal>,
    );
    expect(screen.queryByText("Hidden")).toBeNull();
  });

  it("renders title, description and body when open", async () => {
    await render(
      <Modal open onClose={() => {}} title="Delete item" description="This cannot be undone.">
        <RNText>Are you sure?</RNText>
      </Modal>,
    );
    expect(screen.getByText("Delete item")).toBeTruthy();
    expect(screen.getByText("This cannot be undone.")).toBeTruthy();
    expect(screen.getByText("Are you sure?")).toBeTruthy();
  });

  it("the title is announced as a header", async () => {
    await render(<Modal open onClose={() => {}} title="Dialog" />);
    expect(screen.getByRole("header", { name: "Dialog" })).toBeTruthy();
  });

  it("the close button calls onClose", async () => {
    const onClose = jest.fn();
    await render(<Modal open onClose={onClose} title="Dialog" />);
    await fireEvent.press(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Android back (onRequestClose) calls onClose — RN's equivalent of KuiReact's Escape", async () => {
    const onClose = jest.fn();
    await render(<Modal open onClose={onClose} title="Dialog" />);
    const rnModal = screen.container.queryAll((n) => typeof n.props.onRequestClose === "function")[0];
    rnModal.props.onRequestClose();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders the footer when given one", async () => {
    await render(<Modal open onClose={() => {}} title="Dialog" footer={<RNText>Confirm</RNText>} />);
    expect(screen.getByText("Confirm")).toBeTruthy();
  });

  it("accepts the deprecated `visible` prop as an alias for `open`", async () => {
    await render(<Modal visible onClose={() => {}} title="Legacy" />);
    expect(screen.getByText("Legacy")).toBeTruthy();
  });

  it("each child control stays individually reachable (the old nested-Pressable layout merged them)", async () => {
    await render(
      <Modal open onClose={() => {}} title="Dialog" footer={<RNText accessibilityRole="button">Delete</RNText>}>
        <RNText>Body</RNText>
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
  });

  it("uses KuiReact's panel surface: surface-raised, rounded-xl, shadow-xl", async () => {
    await render(<Modal open onClose={() => {}} title="Dialog" />);
    const panel = screen.container.queryAll((n) => classNameOf(n as never).includes("bg-surface-raised"))[0];
    const className = classNameOf(panel as never);
    expect(className).toContain("rounded-xl");
    expect(className).toContain("shadow-xl");
  });

  it("fullscreen drops the radius", async () => {
    await render(<Modal open onClose={() => {}} title="Dialog" fullscreen />);
    const panel = screen.container.queryAll((n) => classNameOf(n as never).includes("bg-surface-raised"))[0];
    expect(classNameOf(panel as never)).toContain("rounded-none");
  });

  it("scrollable wraps the body in a ScrollView", async () => {
    await render(
      <Modal open onClose={() => {}} title="Dialog" scrollable>
        <RNText>Long</RNText>
      </Modal>,
    );
    const scroll = screen.container.queryAll((n) => n.type === "RCTScrollView");
    expect(scroll.length).toBeGreaterThan(0);
  });
});

describe("Modal ref", () => {
  it("forwards ref to the dialog panel", async () => {
    const ref = createRef<View>();
    await render(<Modal open onClose={() => {}} title="Hello" ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
