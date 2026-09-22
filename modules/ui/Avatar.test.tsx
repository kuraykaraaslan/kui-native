import { render, screen } from "@testing-library/react-native";

import { Avatar, AvatarGroup } from "./Avatar";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

// Pixel-metric assertions below lock in KuiReact's exact Avatar size ladder
// (modules/ui/Avatar.tsx): xs 24 · sm 32 · md 40 · lg 48 · xl 64 px, with
// text-xs/xs/sm/base/lg. A prior KuiNative version had lg=56px/text-lg and
// xl=80px/text-2xl — one size step too large on both.
describe("Avatar", () => {
  it("renders initials from the name", async () => {
    await render(<Avatar name="Kuray Karaaslan" />);
    expect(screen.getByText("KK")).toBeTruthy();
  });

  it("falls back to '?' for a blank name instead of an empty circle", async () => {
    await render(<Avatar name="   " />);
    expect(screen.getByText("?")).toBeTruthy();
  });

  it.each([
    ["xs", "w-6", "h-6", "text-xs"],
    ["sm", "w-8", "h-8", "text-xs"],
    ["md", "w-10", "h-10", "text-sm"],
    ["lg", "w-12", "h-12", "text-base"],
    ["xl", "w-16", "h-16", "text-lg"],
  ] as const)("size=%s matches KuiReact's dimensions (%s %s) and text size (%s)", async (size, w, h, textCls) => {
    await render(<Avatar name="Kuray K" size={size} />);
    const container = classNameOf(screen.getByRole("image"));
    expect(container).toContain(w);
    expect(container).toContain(h);
    const initialsText = screen.getByText("KK");
    expect(classNameOf(initialsText)).toContain(textCls);
  });

  it("the fallback has a border matching its own subtle background (a ring, not a visible edge)", async () => {
    await render(<Avatar name="Kuray K" />);
    const className = classNameOf(screen.getByRole("image"));
    expect(className).toContain("border-primary-subtle");
    expect(className).toContain("bg-primary-subtle");
  });

  it("renders no status dot by default", async () => {
    await render(<Avatar name="Kuray K" />);
    expect(screen.queryByLabelText("online")).toBeNull();
  });

  it.each(["online", "offline", "away", "busy"] as const)("renders a %s status dot when requested", async (status) => {
    await render(<Avatar name="Kuray K" status={status} />);
    expect(screen.getByLabelText(status)).toBeTruthy();
  });

  it("accepts src={null} like KuiReact and falls back to initials", async () => {
    await render(<Avatar name="Kuray K" src={null} />);
    expect(screen.getByText("KK")).toBeTruthy();
  });

  it("exposes the name as the accessible label", async () => {
    await render(<Avatar name="Kuray Karaaslan" />);
    expect(screen.getByLabelText("Kuray Karaaslan")).toBeTruthy();
  });
});

describe("AvatarGroup (KuiReact API)", () => {
  const people = ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank"].map((name) => ({ name }));

  it("shows up to `max` avatars (default 4) and a +N chip for the rest", async () => {
    await render(<AvatarGroup avatars={people} />);
    expect(screen.getByText("+2", { hidden: true } as never)).toBeTruthy();
    expect(screen.queryByText("EV", { hidden: true } as never)).toBeNull();
  });

  it("respects a custom max", async () => {
    await render(<AvatarGroup avatars={people} max={2} />);
    expect(screen.getByText("+4", { hidden: true } as never)).toBeTruthy();
  });

  it("has no chip when everyone fits", async () => {
    await render(<AvatarGroup avatars={people.slice(0, 3)} />);
    expect(screen.queryByText(/^\+/, { hidden: true } as never)).toBeNull();
  });

  it("is labelled with the total count, like KuiReact's aria-label", async () => {
    await render(<AvatarGroup avatars={people} />);
    expect(screen.getByLabelText("6 users")).toBeTruthy();
  });

  it("overlaps avatars by 8px after the first", async () => {
    await render(<AvatarGroup avatars={people.slice(0, 2)} />);
    const wrappers = screen.getByLabelText("2 users").children as unknown as { props: { style: unknown[] } }[];
    const second = Object.assign({}, ...(wrappers[1].props.style as object[]).filter(Boolean));
    expect(second.marginLeft).toBe(-8);
  });

  it("still renders children as a plain row (deprecated)", async () => {
    await render(<AvatarGroup><Avatar name="Legacy User" /></AvatarGroup>);
    expect(screen.getByText("LU")).toBeTruthy();
  });
});
