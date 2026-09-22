import { fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo, Text as RNText } from "react-native";

import { Button } from "./Button";
import { DropdownMenu, type DropdownItem } from "./DropdownMenu";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const onEdit = jest.fn();
const onDelete = jest.fn();
const ITEMS: DropdownItem[] = [
  { label: "Edit", icon: "✏", onPress: onEdit },
  { label: "Archive", disabled: true, onPress: jest.fn() },
  { type: "separator" },
  { label: "Delete", danger: true, onPress: onDelete },
];

async function openMenu(props: Partial<React.ComponentProps<typeof DropdownMenu>> = {}) {
  await render(<DropdownMenu trigger={<Button>Actions</Button>} items={ITEMS} {...props} />);
  await fireEvent.press(screen.getByRole("button", { name: "Actions" }));
}

beforeEach(() => jest.clearAllMocks());

// Ports KuiReact's DropdownMenu tests (modules/ui/DropdownMenu.test.tsx).
// The three keyboard-focus cases (Tab wrap, focus return) are desktop
// keyboard behaviour; Escape → Android back, outside click → outside tap.
describe("DropdownMenu", () => {
  it("is closed by default (menu not rendered)", async () => {
    await render(<DropdownMenu trigger={<Button>Actions</Button>} items={ITEMS} />);
    expect(screen.queryByText("Edit")).toBeNull();
  });

  it("opens the menu on trigger press, with every item and the separator", async () => {
    await openMenu();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    const separators = screen.container.queryAll((n) => classNameOf(n as never).includes("my-1 border-t"));
    expect(separators).toHaveLength(1);
  });

  it("the trigger reports its expanded state", async () => {
    await render(<DropdownMenu trigger={<Button>Actions</Button>} items={ITEMS} />);
    expect(screen.getByRole("button", { name: "Actions" }).props.accessibilityState.expanded).toBe(false);
    await fireEvent.press(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("button", { name: "Actions" }).props.accessibilityState.expanded).toBe(true);
  });

  it("pressing an item calls its onPress and closes the menu", async () => {
    await openMenu();
    await fireEvent.press(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menuitem")).toBeNull();
  });

  it("a disabled item is not pressable", async () => {
    await openMenu();
    const archive = screen.getByRole("menuitem", { name: "Archive" });
    expect(classNameOf(archive)).toContain("opacity-50");
    await fireEvent.press(archive);
    expect(screen.getByRole("menuitem", { name: "Archive" })).toBeTruthy();
  });

  it("Android back closes the open menu (KuiReact: Escape)", async () => {
    await openMenu();
    const modal = screen.container.queryAll((n) => typeof n.props.onRequestClose === "function")[0];
    await fireEvent(modal, "requestClose");
    expect(screen.queryByRole("menuitem")).toBeNull();
  });

  it("tapping outside the menu closes it", async () => {
    await openMenu();
    await fireEvent.press(screen.getByTestId("anchored-panel-outside", { hidden: true } as never));
    expect(screen.queryByRole("menuitem")).toBeNull();
  });

  it("moves screen-reader focus to the first enabled item once shown", async () => {
    const spy = jest.spyOn(AccessibilityInfo, "sendAccessibilityEvent").mockImplementation(() => {});
    await openMenu();
    const modal = screen.container.queryAll((n) => typeof n.props.onShow === "function")[0];
    await fireEvent(modal, "show");
    expect(spy).toHaveBeenCalledWith(expect.anything(), "focus");
    spy.mockRestore();
  });

  it("renders an optional header above the items", async () => {
    await openMenu({ header: <RNText>Signed in as Kuray</RNText> });
    expect(screen.getByText("Signed in as Kuray")).toBeTruthy();
  });

  it("uses KuiReact's menu and item classes; danger items are red", async () => {
    await openMenu();
    const menu = classNameOf(screen.getByTestId("dropdown-menu"));
    for (const c of ["min-w-[10rem]", "rounded-lg", "border-border", "bg-surface-raised", "shadow-lg", "py-1"]) {
      expect(menu).toContain(c);
    }
    expect(classNameOf(screen.getByRole("menuitem", { name: "Edit" }))).toContain("px-3");
    expect(classNameOf(screen.getByText("Delete"))).toContain("text-error");
  });
});
