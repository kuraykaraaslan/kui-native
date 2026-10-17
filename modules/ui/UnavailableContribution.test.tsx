import { fireEvent, render, screen } from "@testing-library/react-native";
import { Linking, Text as RNText } from "react-native";

import { UNAVAILABLE_REASON_IDS, UNAVAILABLE_REASONS, UnavailableContribution, type UnavailableContributionSize } from "./UnavailableContribution";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const SIZES: UnavailableContributionSize[] = ["inline", "card", "tab", "node"];

// Ports KuiReact's UnavailableContribution tests (modules/ui/UnavailableContribution.test.tsx).
describe("UnavailableContribution", () => {
  it("knows every reason the extension resolver reports, with KuiReact's texts", () => {
    expect(UNAVAILABLE_REASON_IDS).toEqual(["disabled", "unentitled", "blocked", "retired", "banned", "quarantined", "failed", "missing", "no-access"]);
    expect(UNAVAILABLE_REASONS.quarantined).toMatchObject({ tone: "warning", label: "Quarantined", detail: "Paused automatically after repeated errors." });
    expect(UNAVAILABLE_REASONS.disabled.icon.iconName).toBe("power-off");
  });

  it.each(UNAVAILABLE_REASON_IDS)("reason %s renders its default label and detail", async (reason) => {
    await render(<UnavailableContribution reason={reason} />);
    expect(screen.getByTestId(`unavailable-${reason}`)).toBeTruthy();
    expect(screen.getByText(UNAVAILABLE_REASONS[reason].label)).toBeTruthy();
    expect(screen.getByText(UNAVAILABLE_REASONS[reason].detail)).toBeTruthy();
  });

  it.each(SIZES)("size %s renders", async (size) => {
    await render(<UnavailableContribution reason="disabled" size={size} />);
    expect(screen.getByText("Disabled")).toBeTruthy();
  });

  it("card (default) has KuiReact's dashed frame; framed={false} drops it", async () => {
    const { rerender } = await render(<UnavailableContribution reason="disabled" />);
    expect(classNameOf(screen.getByTestId("unavailable-disabled"))).toContain("border-dashed");
    await rerender(<UnavailableContribution reason="disabled" framed={false} />);
    expect(classNameOf(screen.getByTestId("unavailable-disabled"))).not.toContain("border-dashed");
  });

  it("host texts override the defaults; detail null hides the explanation", async () => {
    await render(<UnavailableContribution reason="unentitled" label="Nicht im Tarif" detail={null} />);
    expect(screen.getByText("Nicht im Tarif")).toBeTruthy();
    expect(screen.queryByText("Not in plan")).toBeNull();
    expect(screen.queryByText(UNAVAILABLE_REASONS.unentitled.detail)).toBeNull();
  });

  it("a title becomes the heading and the reason moves to a badge", async () => {
    await render(<UnavailableContribution reason="quarantined" size="node" title="Call log" />);
    expect(screen.getByText("Call log")).toBeTruthy();
    expect(screen.getByText("Quarantined")).toBeTruthy();
  });

  it("runs the action; an href is opened after onPress", async () => {
    const onPress = jest.fn();
    const open = jest.spyOn(Linking, "openURL").mockResolvedValue(true as never);
    await render(<UnavailableContribution reason="unentitled" action={{ label: "Upgrade", onPress, href: "https://example.test/billing" }} />);
    await fireEvent.press(screen.getByRole("button", { name: "Upgrade" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith("https://example.test/billing");
    open.mockRestore();
  });

  it("inline: the detail is the accessibility hint (KuiReact's tooltip + sr-only text)", async () => {
    await render(<UnavailableContribution reason="no-access" size="inline" />);
    expect(screen.getByTestId("unavailable-no-access").props.accessibilityHint).toBe(UNAVAILABLE_REASONS["no-access"].detail);
  });

  it("a custom icon replaces the default one", async () => {
    await render(<UnavailableContribution reason="missing" icon={<RNText>custom-icon</RNText>} />);
    expect(screen.getByText("custom-icon", { includeHiddenElements: true } as never)).toBeTruthy();
  });
});
