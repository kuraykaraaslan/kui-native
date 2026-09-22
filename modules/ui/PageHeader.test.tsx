import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { PageHeader } from "./PageHeader";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({ router: { push: (href: string) => mockPush(href) } }));

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

beforeEach(() => mockPush.mockClear());

describe("PageHeader", () => {
  it("renders the title as a header, with subtitle and badge", async () => {
    await render(<PageHeader title="Users" subtitle="Manage your team." badge={<RNText>48 members</RNText>} />);
    expect(screen.getByRole("header", { name: "Users" })).toBeTruthy();
    expect(screen.getByText("Manage your team.")).toBeTruthy();
    expect(screen.getByText("48 members")).toBeTruthy();
  });

  it("renders no actions container without actions", async () => {
    await render(<PageHeader title="Settings" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("action buttons call onPress", async () => {
    const onPress = jest.fn();
    await render(<PageHeader title="Users" actions={[{ label: "Export", variant: "outline", onPress }]} />);
    await fireEvent.press(screen.getByRole("button", { name: "Export" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("href actions are links that push the route", async () => {
    await render(<PageHeader title="Users" actions={[{ label: "Docs", href: "/docs" }]} />);
    await fireEvent.press(screen.getByRole("link", { name: "Docs" }));
    expect(mockPush).toHaveBeenCalledWith("/docs");
  });

  it("disabled actions are dimmed and not pressable", async () => {
    const onPress = jest.fn();
    await render(<PageHeader title="Users" actions={[{ label: "Export", onPress, disabled: true }]} />);
    const btn = screen.getByRole("button", { name: "Export" });
    expect(classNameOf(btn)).toContain("opacity-50");
    await fireEvent.press(btn);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("uses KuiReact's title, divider and variant classes (primary default)", async () => {
    const { toJSON } = await render(
      <PageHeader title="Danger Zone" actions={[{ label: "Invite" }, { label: "Delete project", variant: "danger" }]} />,
    );
    for (const c of ["pb-5", "border-b", "border-border"]) expect(classNameOf(toJSON() as never)).toContain(c);
    expect(classNameOf(screen.getByText("Danger Zone"))).toContain("text-2xl font-bold");
    expect(classNameOf(screen.getByRole("button", { name: "Invite" }))).toContain("bg-primary");
    expect(classNameOf(screen.getByRole("button", { name: "Delete project" }))).toContain("bg-error");
    expect(classNameOf(screen.getByText("Delete project"))).toContain("text-text-inverse");
  });
});
