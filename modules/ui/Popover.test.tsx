import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { Button } from "./Button";
import { computePosition } from "./Overlays/shared";
import { Popover } from "./Popover";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Ports KuiReact's Popover tests (Overlays/Popover/Popover.test.tsx);
// Escape → Android back, outside click → outside tap.
describe("Popover", () => {
  it("is closed by default", async () => {
    await render(
      <Popover trigger={<Button>Open</Button>}>
        <RNText>Content</RNText>
      </Popover>,
    );
    expect(screen.queryByText("Content")).toBeNull();
  });

  it("opens on trigger press (the trigger's own onPress still runs)", async () => {
    const onPress = jest.fn();
    await render(
      <Popover trigger={<Button onPress={onPress}>Open</Button>}>
        <RNText>Content</RNText>
      </Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Content")).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("Android back closes the panel (KuiReact: Escape)", async () => {
    await render(
      <Popover trigger={<Button>Open</Button>}>
        <RNText>Content</RNText>
      </Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    const modal = screen.container.queryAll((n) => typeof n.props.onRequestClose === "function")[0];
    await fireEvent(modal, "requestClose");
    expect(screen.queryByText("Content")).toBeNull();
  });

  it("tapping outside the panel closes it", async () => {
    await render(
      <Popover trigger={<Button>Open</Button>}>
        <RNText>Content</RNText>
      </Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    await fireEvent.press(screen.getByTestId("anchored-panel-outside", { hidden: true } as never));
    expect(screen.queryByText("Content")).toBeNull();
  });

  it("pressing the trigger again closes it", async () => {
    await render(
      <Popover trigger={<Button>Open</Button>}>
        <RNText>Content</RNText>
      </Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    expect(screen.queryByText("Content")).toBeNull();
  });

  it("uses KuiReact's panel classes and traps screen-reader focus by default", async () => {
    await render(
      <Popover trigger={<Button>Open</Button>} className="p-1">
        <RNText>Content</RNText>
      </Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    const panel = screen.getByTestId("popover-panel");
    for (const c of ["min-w-[12rem]", "rounded-lg", "border-border", "bg-surface-raised", "shadow-xl", "p-1"]) {
      expect(classNameOf(panel)).toContain(c);
    }
    expect(panel.props.accessibilityViewIsModal).toBe(true);
  });

  it("focusTrap={false} leaves focus free", async () => {
    await render(
      <Popover trigger={<Button>Open</Button>} focusTrap={false}>
        <RNText>Content</RNText>
      </Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByTestId("popover-panel").props.accessibilityViewIsModal).toBe(false);
  });
});

describe("computePosition (KuiReact's placement table)", () => {
  const anchor = { x: 100, y: 200, width: 80, height: 40 };
  const panel = { width: 60, height: 30 };
  it("bottom: 8px below, start-aligned", () => {
    expect(computePosition(anchor, panel, "bottom", "start", 8, 400)).toEqual({ left: 100, top: 248 });
  });
  it("top: 8px above", () => {
    expect(computePosition(anchor, panel, "top", "start", 8, 400)).toEqual({ left: 100, top: 162 });
  });
  it("right: 8px to the right, top-aligned", () => {
    expect(computePosition(anchor, panel, "right", "start", 8, 400)).toEqual({ left: 188, top: 200 });
  });
  it("left: 8px to the left", () => {
    expect(computePosition(anchor, panel, "left", "start", 8, 400)).toEqual({ left: 32, top: 200 });
  });
  it("centre and end alignment", () => {
    expect(computePosition(anchor, panel, "bottom", "center", 8, 400).left).toBe(110);
    expect(computePosition(anchor, panel, "bottom", "end", 8, 400).left).toBe(120);
  });
  it("keeps the panel inside the screen horizontally", () => {
    expect(computePosition({ ...anchor, x: 380 }, panel, "bottom", "start", 8, 400).left).toBe(332);
  });
});
