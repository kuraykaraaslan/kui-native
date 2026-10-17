import { fireEvent, render, screen } from "@testing-library/react-native";
import { lazy } from "react";
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

  describe("order", () => {
    it("sorts tabs by order (missing counts as 0, ties keep array order)", async () => {
      await render(
        <TabGroup
          tabs={[
            { id: "calls", label: "Calls", order: 20, content: <RNText>calls</RNText> },
            { id: "overview", label: "Overview", content: <RNText>overview</RNText> },
            { id: "pinned", label: "Pinned", order: -1, content: <RNText>pinned</RNText> },
            { id: "notes", label: "Notes", content: <RNText>notes</RNText> },
          ]}
        />,
      );
      expect(screen.getAllByRole("tab").map((t) => t.props.accessibilityLabel)).toEqual(["Pinned", "Overview", "Notes", "Calls"]);
      expect(screen.getByRole("tab", { name: "Pinned" }).props.accessibilityState.selected).toBe(true);
    });
  });

  it("falls back to the first tab when the active tab is removed", async () => {
    const { rerender } = await render(<TabGroup tabs={TABS} defaultTab="security" />);
    await rerender(<TabGroup tabs={TABS.filter((t) => t.id !== "security")} />);
    expect(screen.getByRole("tab", { name: "Profile" }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByText("Profile panel")).toBeTruthy();
  });

  it("a tab-level lazy overrides the group (eager group, lazy contributed tab)", async () => {
    await render(
      <TabGroup
        tabs={[
          { id: "a", label: "A", content: <RNText>Alpha content</RNText> },
          { id: "x", label: "X", lazy: true, content: <RNText>Contributed content</RNText> },
        ]}
      />,
    );
    expect(screen.queryByText("Contributed content", { includeHiddenElements: true } as never)).toBeNull();
    await fireEvent.press(screen.getByRole("tab", { name: "X" }));
    expect(screen.getByText("Contributed content")).toBeTruthy();
  });

  describe("isolation", () => {
    function Broken(): never {
      throw new Error("tab broke");
    }
    const WITH_BROKEN: Tab[] = [
      { id: "a", label: "Alpha", content: <RNText>Alpha content</RNText> },
      { id: "x", label: "Broken", content: <Broken /> },
    ];
    let errorSpy: jest.SpyInstance;
    beforeEach(() => {
      errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => errorSpy.mockRestore());

    it("an isolated tab that throws shows the failed placeholder; the other tabs keep working", async () => {
      await render(<TabGroup tabs={WITH_BROKEN} isolate />);
      await fireEvent.press(screen.getByRole("tab", { name: "Broken" }));
      expect(screen.getByTestId("unavailable-failed")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy();
      await fireEvent.press(screen.getByRole("tab", { name: "Alpha" }));
      expect(screen.getByText("Alpha content")).toBeTruthy();
    });

    it("renderError and onTabError let the host choose the fallback and report", async () => {
      const onTabError = jest.fn();
      await render(
        <TabGroup
          tabs={WITH_BROKEN}
          defaultTab="x"
          isolate
          onTabError={onTabError}
          renderError={({ tab, error }) => <RNText>{`${tab.label}: ${error.message}`}</RNText>}
        />,
      );
      expect(screen.getByText("Broken: tab broke")).toBeTruthy();
      expect(onTabError).toHaveBeenCalledWith("x", expect.any(Error), expect.objectContaining({ componentStack: expect.any(String) }));
    });

    it("a per-tab isolate flag works without the group flag", async () => {
      await render(<TabGroup tabs={[WITH_BROKEN[0], { ...WITH_BROKEN[1], isolate: true }]} />);
      expect(screen.getByText("Alpha content")).toBeTruthy();
    });

    it("an isolated tab that suspends shows the loading fallback, then its content", async () => {
      let resolve!: (m: { default: () => React.JSX.Element }) => void;
      const Lazy = lazy(() => new Promise<{ default: () => React.JSX.Element }>((r) => { resolve = r; }));
      await render(<TabGroup isolate loadingFallback={<RNText>loading tab</RNText>} tabs={[{ id: "l", label: "Lazy", content: <Lazy /> }]} />);
      expect(screen.getByText("loading tab")).toBeTruthy();
      resolve({ default: () => <RNText>lazy content</RNText> });
      expect(await screen.findByText("lazy content")).toBeTruthy();
    });
  });
});
