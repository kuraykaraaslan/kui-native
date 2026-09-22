import { fireEvent, render, screen } from "@testing-library/react-native";
import { Linking, Text as RNText } from "react-native";

import { AlertBanner } from "./AlertBanner";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("AlertBanner", () => {
  it("renders the message in an alert region", async () => {
    await render(<AlertBanner message="Profile updated successfully." />);
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText("Profile updated successfully.")).toBeTruthy();
  });

  it("renders an optional semibold title above the message", async () => {
    await render(<AlertBanner title="System update" message="A new version is available." />);
    expect(classNameOf(screen.getByText("System update"))).toContain("font-semibold");
    expect(classNameOf(screen.getByText("A new version is available."))).toContain("mt-0.5");
  });

  it("the message has no top margin without a title", async () => {
    await render(<AlertBanner message="Plain" />);
    expect(classNameOf(screen.getByText("Plain"))).not.toContain("mt-0.5");
  });

  it.each([
    ["success", "bg-success-subtle", "border-success", "text-success-fg"],
    ["warning", "bg-warning-subtle", "border-warning", "text-warning-fg"],
    ["error", "bg-error-subtle", "border-error", "text-error-fg"],
    ["info", "bg-info-subtle", "border-info", "text-info-fg"],
  ] as const)("variant=%s uses KuiReact's %s / %s / %s tokens", async (variant, bg, border, fg) => {
    await render(<AlertBanner variant={variant} message="m" />);
    const box = screen.container.queryAll((n) => classNameOf(n as never).includes("rounded-lg"))[0];
    const className = classNameOf(box as never);
    expect(className).toContain(bg);
    expect(className).toContain(border);
    expect(className).toContain("p-4");
    expect(classNameOf(screen.getByText("m"))).toContain(fg);
  });

  it("dismissible renders a Dismiss button that hides the banner", async () => {
    await render(<AlertBanner message="Bye" dismissible />);
    await fireEvent.press(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Bye")).toBeNull();
  });

  it("is not dismissible by default", async () => {
    await render(<AlertBanner message="Stay" />);
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("action.onPress fires from the CTA button", async () => {
    const onPress = jest.fn();
    await render(<AlertBanner message="m" action={{ label: "Upgrade now", onPress }} />);
    await fireEvent.press(screen.getByRole("button", { name: "Upgrade now" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("action.href renders a link that opens the URL", async () => {
    const open = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    await render(<AlertBanner message="m" action={{ label: "Read docs", href: "https://example.com/docs" }} />);
    await fireEvent.press(screen.getByRole("link", { name: "Read docs" }));
    expect(open).toHaveBeenCalledWith("https://example.com/docs");
  });

  it("a custom icon replaces the default one", async () => {
    await render(<AlertBanner message="m" icon={<RNText>★</RNText>} />);
    expect(screen.getByText("★", { hidden: true } as never)).toBeTruthy();
  });

  it("the action and dismiss buttons stay separately reachable from the alert text", async () => {
    await render(<AlertBanner message="m" dismissible action={{ label: "Go", onPress: () => {} }} />);
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Go" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeTruthy();
  });
});
