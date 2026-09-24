import { render, renderHook, screen } from "@testing-library/react-native";
import { AccessibilityInfo, Text as RNText } from "react-native";

import { themes, useThemeMode, useThemeVars } from "../../../libs/theme";
import { Modal } from "../Modal";

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(true);
});
afterEach(() => {
  useThemeMode.getState().setMode("system");
  jest.restoreAllMocks();
});

/** Does `style` (possibly nested arrays) contain exactly this vars() object? */
function carries(style: unknown, vars: object): boolean {
  if (style === vars) return true;
  return Array.isArray(style) && style.some((s) => carries(s, vars));
}

describe("useThemeVars", () => {
  it("returns the vars of the active scheme", async () => {
    useThemeMode.getState().setMode("dark");
    expect((await renderHook(() => useThemeVars())).result.current).toBe(themes.dark);
    useThemeMode.getState().setMode("light");
    expect((await renderHook(() => useThemeVars())).result.current).toBe(themes.light);
  });
});

describe("overlay portals re-apply the theme", () => {
  // RN Modal content mounts outside the app root, where the root View's vars()
  // don't reach — without this, dark mode overlays render with light tokens.
  it("Modal content carries the dark vars in dark mode", async () => {
    useThemeMode.getState().setMode("dark");
    await render(
      <Modal open onClose={() => {}} title="Dialog">
        <RNText>body</RNText>
      </Modal>,
    );
    // Walk up from the body text to the portal root.
    type HostNode = { props: { style?: unknown }; parent: HostNode | null };
    let node: HostNode | null = screen.getByText("body") as unknown as HostNode;
    let found = false;
    while (node) {
      if (carries(node.props.style, themes.dark)) found = true;
      node = node.parent;
    }
    expect(found).toBe(true);
  });
});
