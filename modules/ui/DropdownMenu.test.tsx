import { fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo, Linking, Text as RNText } from "react-native";

import { Button } from "./Button";
import { DropdownMenu, arrangeMenuItems, mergeMenuItems, type DropdownItem } from "./DropdownMenu";

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

  describe("contributed items", () => {
    const labels = () => screen.getAllByRole("menuitem").map((i) => i.props.accessibilityLabel);

    it("hidden items are left out, with no stray separators", async () => {
      await openMenu({
        items: [{ label: "Edit" }, { type: "separator" }, { label: "Call", hidden: true }, { type: "separator" }, { label: "Delete", danger: true }],
      });
      expect(labels()).toEqual(["Edit", "Delete"]);
      expect(screen.container.queryAll((n) => classNameOf(n as never).includes("my-1 border-t"))).toHaveLength(1);
    });

    it("orders items by group and order, with a separator between groups", async () => {
      await openMenu({
        items: [
          { id: "sign-out", label: "Sign out", group: "session", order: 1000 },
          { id: "profile", label: "Profile", group: "account", order: 100 },
          { type: "separator" },
          { id: "dnd", label: "Do not disturb", group: "status", order: 50 },
          { id: "settings", label: "Settings", group: "account", order: 200 },
        ],
      });
      expect(labels()).toEqual(["Do not disturb", "Profile", "Settings", "Sign out"]);
      expect(screen.container.queryAll((n) => classNameOf(n as never).includes("my-1 border-t"))).toHaveLength(2);
      expect(screen.getByTestId("menuitem-dnd")).toBeTruthy();
    });

    it("an item with href opens it after onPress and closes the menu", async () => {
      const onPress = jest.fn();
      const open = jest.spyOn(Linking, "openURL").mockResolvedValue(true as never);
      await openMenu({ items: [{ id: "docs", label: "Docs", href: "https://example.test/docs", onPress }] });
      await fireEvent.press(screen.getByRole("menuitem", { name: "Docs" }));
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledWith("https://example.test/docs");
      expect(screen.queryByRole("menuitem")).toBeNull();
      open.mockRestore();
    });

    it("disabledReason shows under a disabled item and is its accessibility hint", async () => {
      await openMenu({ items: [{ label: "Archive", disabled: true, disabledReason: "Only owners can archive" }] });
      expect(screen.getByRole("menuitem", { name: "Archive" }).props.accessibilityHint).toBe("Only owners can archive");
      expect(screen.getByText("Only owners can archive")).toBeTruthy();
    });

    it("disabledReason is ignored while the item is enabled", async () => {
      await openMenu({ items: [{ label: "Archive", disabledReason: "Only owners can archive" }] });
      expect(screen.queryByText("Only owners can archive")).toBeNull();
    });
  });

  describe("arrangeMenuItems / mergeMenuItems", () => {
    it("leaves a list without group or order exactly as it is", () => {
      const items: DropdownItem[] = [{ label: "A" }, { type: "separator" }, { label: "B" }];
      expect(arrangeMenuItems(items)).toEqual(items);
    });

    it("mergeMenuItems replaces by id in place and appends the rest", () => {
      const merged = mergeMenuItems(
        [{ id: "a", label: "A" }, { id: "b", label: "B" }],
        [{ id: "b", label: "B2" }, { id: "c", label: "C" }, { label: "No id" }],
      );
      expect(merged.map((i) => (i.type === "separator" ? "-" : i.label))).toEqual(["A", "B2", "C", "No id"]);
    });
  });
});
