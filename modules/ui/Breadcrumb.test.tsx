import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { Breadcrumb } from "./Breadcrumb";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({ router: { push: (href: string) => mockPush(href) } }));

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const ITEMS = [{ label: "Home", href: "/" }, { label: "Components", href: "/components" }, { label: "Breadcrumb" }];

beforeEach(() => mockPush.mockClear());

describe("Breadcrumb", () => {
  it("renders every crumb; linked crumbs are links, the last is the current page", async () => {
    await render(<Breadcrumb items={ITEMS} />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
    const current = screen.getByText("Breadcrumb");
    expect(current.props["aria-current"]).toBe("page");
    expect(classNameOf(current)).toContain("font-medium");
    expect(classNameOf(current)).toContain("text-text-primary");
  });

  it("pressing a crumb pushes its href", async () => {
    await render(<Breadcrumb items={ITEMS} />);
    await fireEvent.press(screen.getByRole("link", { name: "Components" }));
    expect(mockPush).toHaveBeenCalledWith("/components");
  });

  it("onPress overrides href navigation", async () => {
    const onPress = jest.fn();
    await render(<Breadcrumb items={[{ label: "Home", href: "/", onPress }, { label: "Here" }]} />);
    await fireEvent.press(screen.getByRole("link", { name: "Home" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("uses a custom separator between crumbs", async () => {
    await render(<Breadcrumb items={ITEMS} separator={<RNText>/</RNText>} />);
    expect(screen.getAllByText("/", { hidden: true } as never)).toHaveLength(2);
  });

  it("maxItems keeps the first item, an ellipsis and the last maxItems-1 items", async () => {
    await render(
      <Breadcrumb
        maxItems={3}
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Electronics", href: "/e" },
          { label: "Laptops", href: "/l" },
          { label: 'MacBook Pro 16"' },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("…", { hidden: true } as never)).toBeTruthy();
    expect(screen.queryByText("Products")).toBeNull();
    expect(screen.queryByText("Electronics")).toBeNull();
    expect(screen.getByText("Laptops")).toBeTruthy();
    expect(screen.getByText('MacBook Pro 16"')).toBeTruthy();
  });
});
