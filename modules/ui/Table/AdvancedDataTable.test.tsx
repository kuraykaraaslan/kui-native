import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { AdvancedDataTable } from "./AdvancedDataTable";

type Member = { name: string; role: string };
const COLUMNS = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const ROWS = [
  { name: "Alice", role: "Admin", _expanded: <Text>Joined 2023-01-15</Text> },
  { name: "Bob", role: "Editor" },
  { name: "Carol", role: "Viewer" },
];
const box = (name: string) => screen.getByRole("checkbox", { name });

describe("AdvancedDataTable", () => {
  it("renders rows and the empty message", async () => {
    const r = await render(<AdvancedDataTable<Member> columns={COLUMNS} rows={ROWS} />);
    expect(screen.getAllByTestId("advanced-row")).toHaveLength(3);
    await r.rerender(<AdvancedDataTable<Member> columns={COLUMNS} rows={[]} emptyMessage="Nobody here" />);
    expect(screen.getByText("Nobody here")).toBeTruthy();
  });

  it("selects rows by index with a count and mixed header state", async () => {
    const onSelectionChange = jest.fn();
    await render(<AdvancedDataTable<Member> columns={COLUMNS} rows={ROWS} selectable onSelectionChange={onSelectionChange} />);
    await fireEvent.press(box("Select row 2"));
    expect(onSelectionChange).toHaveBeenLastCalledWith([1]);
    expect(screen.getByText("1 of 3 rows selected")).toBeTruthy();
    expect(box("Select all rows").props.accessibilityState.checked).toBe("mixed");
    await fireEvent.press(box("Select all rows"));
    expect(onSelectionChange).toHaveBeenLastCalledWith([0, 1, 2]);
    await fireEvent.press(box("Select all rows"));
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });

  it("expands and collapses detail rows", async () => {
    await render(<AdvancedDataTable<Member> columns={COLUMNS} rows={ROWS} />);
    expect(screen.queryByText("Joined 2023-01-15")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Expand row" }));
    expect(screen.getByText("Joined 2023-01-15")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Collapse row" }));
    expect(screen.queryByText("Joined 2023-01-15")).toBeNull();
  });

  it("stickyHeader scrolls the body under a fixed header", async () => {
    await render(<AdvancedDataTable<Member> columns={COLUMNS} rows={ROWS} stickyHeader caption="Sticky" />);
    expect(screen.getByTestId("advanced-sticky-body")).toBeTruthy();
  });
});
