import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { TabGroup, type Tab } from "./TabGroup";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const TABS: Tab[] = [
  { id: "profile", label: "Profile", content: <RNText>Profile panel</RNText> },
  { id: "security", label: "Security", content: <RNText>Security panel</RNText> },
  { id: "billing", label: "Billing", disabled: true, content: <RNText>Billing panel</RNText> },
];

// Ports KuiReact's TabGroup tests (modules/ui/TabGroup.test.tsx) except the
// four keyboard cases (ArrowLeft/Right, Home/End, roving tabIndex), which are
// desktop-keyboard behaviour with no native equivalent.
describe("TabGroup", () => {
  it("renders every tab and activates the first one by default", async () => {
    await render(<TabGroup tabs={TABS} />);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: "Profile" }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByText("Profile panel")).toBeTruthy();
  });

  it("defaultTab picks the initially active tab", async () => {
    await render(<TabGroup tabs={TABS} defaultTab="security" />);
    expect(screen.getByRole("tab", { name: "Security" }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByText("Security panel")).toBeTruthy();
  });

  it("pressing a tab activates it and shows its panel", async () => {
    await render(<TabGroup tabs={TABS} />);
    await fireEvent.press(screen.getByRole("tab", { name: "Security" }));
    expect(screen.getByRole("tab", { name: "Security" }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByText("Security panel")).toBeTruthy();
    expect(screen.queryByText("Profile panel")).toBeNull(); // hidden (display: none)
  });

  it("a disabled tab cannot be activated by press", async () => {
    await render(<TabGroup tabs={TABS} />);
    await fireEvent.press(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByRole("tab", { name: "Profile" }).props.accessibilityState.selected).toBe(true);
  });

  it("lazy: a panel that has never been active renders nothing until first activated", async () => {
    await render(<TabGroup tabs={TABS} lazy />);
    expect(screen.queryByText("Security panel", { hidden: true } as never)).toBeNull();
    await fireEvent.press(screen.getByRole("tab", { name: "Security" }));
    expect(screen.getByText("Security panel")).toBeTruthy();
  });

  it("without lazy, every panel is rendered upfront (just hidden)", async () => {
    await render(<TabGroup tabs={TABS} />);
    expect(screen.getByText("Security panel", { hidden: true } as never)).toBeTruthy();
  });

  it("the tablist has the given accessible label", async () => {
    await render(<TabGroup tabs={TABS} label="Account settings" />);
    expect(screen.getByLabelText("Account settings")).toBeTruthy();
  });

  it("uses KuiReact's tab classes: px-4 py-2.5 border-b-2, primary when active, opacity-40 when disabled", async () => {
    await render(<TabGroup tabs={TABS} />);
    const active = classNameOf(screen.getByRole("tab", { name: "Profile" }));
    expect(active).toContain("px-4");
    expect(active).toContain("py-2.5");
    expect(active).toContain("border-b-2");
    expect(active).toContain("border-primary");
    expect(classNameOf(screen.getByText("Profile"))).toContain("text-primary");
    expect(classNameOf(screen.getByText("Security"))).toContain("text-text-secondary");
    expect(classNameOf(screen.getByRole("tab", { name: "Billing" }))).toContain("opacity-40");
  });
});
