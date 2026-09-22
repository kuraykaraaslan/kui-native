import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { BulkActionTable, type BulkAction } from "./BulkActionTable";
import type { Column } from "./Table/types";

type Company = { id: string; name: string; locked?: boolean };
const ROWS: Company[] = [
  { id: "a", name: "Acme" },
  { id: "b", name: "Beta" },
  { id: "c", name: "Cobalt", locked: true },
];
const COLUMNS: Column<Company>[] = [{ key: "name", header: "Name" }];

function Harness(props: { initial?: string[]; actions?: BulkAction<string>[]; totalMatching?: number; onSelectAllMatching?: () => void }) {
  const [selected, setSelected] = useState<string[]>(props.initial ?? []);
  return (
    <BulkActionTable<Company, string>
      columns={COLUMNS}
      rows={ROWS}
      rowId={(r) => r.id}
      selected={selected}
      onSelectedChange={setSelected}
      isRowSelectable={(r) => (r.locked ? "Locked by admin" : true)}
      actions={props.actions}
      totalMatching={props.totalMatching}
      onSelectAllMatching={props.onSelectAllMatching}
    />
  );
}

const box = (name: string) => screen.getByRole("checkbox", { name });

describe("BulkActionTable", () => {
  it("shows no bar until a row is selected, then the count", async () => {
    await render(<Harness />);
    expect(screen.queryByText(/selected$/)).toBeNull();
    await fireEvent.press(box("Select row a"));
    expect(screen.getByText("1 selected")).toBeTruthy();
    expect(box("Select row a").props.accessibilityState.checked).toBe(true);
  });

  it("unselectable rows are disabled with their reason as a hint", async () => {
    await render(<Harness />);
    expect(box("Select row c").props.accessibilityState.disabled).toBe(true);
    expect(box("Select row c").props.accessibilityHint).toBe("Locked by admin");
  });

  it("header checkbox toggles the visible selectable rows and shows mixed state", async () => {
    await render(<Harness initial={["a"]} />);
    expect(box("Select all rows on this page").props.accessibilityState.checked).toBe("mixed");
    await fireEvent.press(box("Select all rows on this page"));
    expect(screen.getByText("2 selected")).toBeTruthy();
    await fireEvent.press(box("Select all rows on this page"));
    expect(screen.queryByText(/selected$/)).toBeNull();
  });

  it("keeps off-page selections when clearing the visible page", async () => {
    await render(<Harness initial={["a", "b", "zz-other-page"]} />);
    await fireEvent.press(box("Select all rows on this page"));
    expect(screen.getByText("1 selected")).toBeTruthy();
  });

  it("runs actions with the selected ids; disabled actions explain why", async () => {
    const onDelete = jest.fn();
    const onExport = jest.fn();
    await render(
      <Harness
        initial={["a", "b"]}
        actions={[
          { key: "export", label: "Export", onAction: onExport, disabled: (ids) => (ids.length > 1 ? "One at a time" : false) },
          { key: "delete", label: "Delete", destructive: true, onAction: onDelete },
        ]}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith(["a", "b"]);
    expect(screen.getByRole("button", { name: "Export" }).props.accessibilityHint).toBe("One at a time");
    await fireEvent.press(screen.getByRole("button", { name: "Export" }));
    expect(onExport).not.toHaveBeenCalled();
  });

  it("offers select-all-matching only when more rows match, and clear empties", async () => {
    const onSelectAllMatching = jest.fn();
    await render(<Harness initial={["a"]} totalMatching={1240} onSelectAllMatching={onSelectAllMatching} />);
    await fireEvent.press(screen.getByRole("button", { name: "Select all 1240 matching" }));
    expect(onSelectAllMatching).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole("button", { name: "Clear selection" }));
    expect(screen.queryByText(/selected$/)).toBeNull();
  });
});
