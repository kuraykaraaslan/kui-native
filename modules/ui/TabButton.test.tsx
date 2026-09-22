import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { TabButton } from "./TabButton";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("TabButton", () => {
  it("is a tab reporting its selected state; pressing calls onPress", async () => {
    const onPress = jest.fn();
    await render(<TabButton active={false} onPress={onPress}>Default</TabButton>);
    const tab = screen.getByRole("tab", { name: "Default" });
    expect(tab.props.accessibilityState.selected).toBe(false);
    await fireEvent.press(tab);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("active: primary pill with KuiReact's classes", async () => {
    await render(<TabButton active onPress={() => {}}>Selected</TabButton>);
    expect(classNameOf(screen.getByRole("tab"))).toContain("bg-primary");
    expect(classNameOf(screen.getByText("Selected"))).toContain("text-primary-fg");
  });

  it("count badge: 20% primary-fg tint when active, sunken when inactive", async () => {
    const r = await render(<TabButton active onPress={() => {}} count={42}>All</TabButton>);
    expect(StyleSheet.flatten(screen.getByTestId("tab-button-count").props.style).backgroundColor).toBe("#ffffff33");
    await r.rerender(<TabButton active={false} onPress={() => {}} count={42}>All</TabButton>);
    expect(classNameOf(screen.getByTestId("tab-button-count"))).toContain("bg-surface-sunken");
  });
});
