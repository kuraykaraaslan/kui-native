import { fireEvent, render, screen } from "@testing-library/react-native";

import { TreeView, type TreeNode } from "./index";

const NODES: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "components", label: "components", children: [{ id: "Button", label: "Button.tsx" }] },
      { id: "index", label: "index.ts" },
    ],
  },
  { id: "readme", label: "README.md" },
];

const node = (id: string) => screen.getByTestId(`tree-node-${id}`);

describe("TreeView", () => {
  it("starts fully expanded (KuiReact legacy default) with level/position hints", async () => {
    await render(<TreeView nodes={NODES} label="File tree" />);
    expect(screen.getByText("Button.tsx")).toBeTruthy();
    expect(node("components").props.accessibilityHint).toBe("Level 2, 1 of 2");
    expect(node("src").props.accessibilityState.expanded).toBe(true);
  });

  it("defaultExpandedIds limits what starts open", async () => {
    await render(<TreeView nodes={NODES} defaultExpandedIds={["src"]} />);
    expect(screen.getByText("components")).toBeTruthy();
    expect(screen.queryByText("Button.tsx")).toBeNull();
  });

  it("the chevron toggles without selecting", async () => {
    const onSelect = jest.fn();
    await render(<TreeView nodes={NODES} onSelect={onSelect} />);
    await fireEvent.press(screen.getByTestId("tree-chevron-src", { hidden: true } as never));
    expect(screen.queryByText("index.ts")).toBeNull();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("pressing a leaf selects it; pressing a parent toggles and selects", async () => {
    const onSelect = jest.fn();
    await render(<TreeView nodes={NODES} onSelect={onSelect} />);
    await fireEvent.press(node("readme"));
    expect(onSelect).toHaveBeenLastCalledWith("readme");
    expect(node("readme").props.accessibilityState.selected).toBe(true);
    await fireEvent.press(node("components"));
    expect(screen.queryByText("Button.tsx")).toBeNull();
    expect(onSelect).toHaveBeenLastCalledWith("components");
  });

  it("expand all / collapse all", async () => {
    await render(<TreeView nodes={NODES} />);
    await fireEvent.press(screen.getByRole("button", { name: "Collapse all" }));
    expect(screen.queryByText("components")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Expand all" }));
    expect(screen.getByText("Button.tsx")).toBeTruthy();
  });

  it("multi: taps toggle, long-press selects a range", async () => {
    const onSelectionChange = jest.fn();
    await render(<TreeView nodes={NODES} selectionMode="multi" onSelectionChange={onSelectionChange} />);
    await fireEvent.press(node("index"));
    await fireEvent.press(node("readme"));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["index", "readme"]);
    await fireEvent.press(node("readme"));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["index"]);
    await fireEvent(node("Button"), "longPress");
    // Anchor is "readme" (last tapped) → Button..readme in visible order.
    expect(onSelectionChange).toHaveBeenLastCalledWith(["Button", "index", "readme"]);
  });

  it("hideToolbar removes the toolbar; controlled selectedId is honoured", async () => {
    await render(<TreeView nodes={NODES} hideToolbar selectedId="index" />);
    expect(screen.queryByRole("button", { name: "Expand all" })).toBeNull();
    expect(node("index").props.accessibilityState.selected).toBe(true);
  });
});
