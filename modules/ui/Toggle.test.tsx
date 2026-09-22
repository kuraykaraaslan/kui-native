import { fireEvent, render, screen } from "@testing-library/react-native";

import { Switch, Toggle } from "./Toggle";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Mirrors KuiReact's Toggle tests (modules/ui/Toggle.test.tsx) plus
// pixel-metric checks for its custom track. The previous KuiNative Switch
// wrapped the OS switch, which cannot match KuiReact's track on any platform.
describe("Toggle", () => {
  it("the deprecated Switch alias maps value/onValueChange/accessibilityLabel onto Toggle", async () => {
    const onValueChange = jest.fn();
    await render(<Switch value={false} onValueChange={onValueChange} accessibilityLabel="Legacy" />);
    const toggle = screen.getByRole("switch", { name: "Legacy" });
    expect(toggle.props.accessibilityState.checked).toBe(false);
    await fireEvent.press(toggle);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("renders as an accessible switch with the label text", async () => {
    await render(<Toggle checked={false} label="Notifications" />);
    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle.props.accessibilityState.checked).toBe(false);
  });

  it("reflects the value via accessibilityState.checked", async () => {
    await render(<Toggle checked label="Notifications" />);
    expect(screen.getByRole("switch").props.accessibilityState.checked).toBe(true);
  });

  it("calls onValueChange with the new value when the row (label included) is pressed", async () => {
    const onChange = jest.fn();
    await render(<Toggle checked={false} onChange={onChange} label="Notifications" />);
    await fireEvent.press(screen.getByText("Notifications"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("disabled prevents interaction and applies opacity-50", async () => {
    const onChange = jest.fn();
    await render(<Toggle checked={false} onChange={onChange} label="Notifications" disabled />);
    const toggle = screen.getByRole("switch");
    expect(classNameOf(toggle)).toContain("opacity-50");
    await fireEvent.press(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders an optional description and exposes it as the accessibility hint", async () => {
    await render(<Toggle checked={false} label="Notifications" description="Get emailed about updates" />);
    expect(screen.getByText("Get emailed about updates")).toBeTruthy();
    expect(screen.getByRole("switch").props.accessibilityHint).toBe("Get emailed about updates");
  });

  it("uses accessibilityLabel as the name when there is no visible label", async () => {
    await render(<Toggle checked={false} ariaLabel="Push notifications" />);
    expect(screen.getByRole("switch", { name: "Push notifications" })).toBeTruthy();
  });

  it("puts the track before the label (KuiReact's layout), top-aligned with gap-3", async () => {
    await render(<Toggle checked={false} label="Notifications" />);
    const toggle = screen.getByRole("switch");
    expect(classNameOf(toggle)).toContain("items-start");
    expect(classNameOf(toggle)).toContain("gap-3");
  });

  it.each([
    ["sm", "h-4", "w-7"],
    ["md", "h-5", "w-9"],
    ["lg", "h-6", "w-11"],
  ] as const)("size=%s uses KuiReact's track dimensions (%s %s)", async (size, h, w) => {
    await render(<Toggle checked={false} label="x" size={size} />);
    const trackWrapper = screen.getByRole("switch").children[0] as { children: { props: { className?: string } }[] };
    const track = classNameOf(trackWrapper.children[0]);
    expect(track).toContain(h);
    expect(track).toContain(w);
  });

  it("off track is bg-surface-sunken with a border; on track is bg-primary", async () => {
    const off = await render(<Toggle checked={false} label="x" />);
    const offTrack = classNameOf((off.getByRole("switch").children[0] as any).children[0]);
    expect(offTrack).toContain("bg-surface-sunken");
    expect(offTrack).toContain("border-border");
    const on = await render(<Toggle checked label="x" />);
    const onTrack = classNameOf((on.getByRole("switch").children[0] as any).children[0]);
    expect(onTrack).toContain("bg-primary");
  });
});
