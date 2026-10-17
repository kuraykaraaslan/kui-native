import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { applyColumnFilters, applySearch, applySort, DataTable, nextSortState, type Column } from "./index";

type User = { name: string; role: string; age: number };
const USERS: User[] = [
  { name: "Zara", role: "Admin", age: 41 },
  { name: "Alice", role: "Member", age: 29 },
  { name: "Bob", role: "Member", age: 35 },
  { name: "Cara", role: "Viewer", age: 22 },
];
const COLUMNS: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", filter: { kind: "select", options: [{ label: "Admin", value: "Admin" }, { label: "Member", value: "Member" }] } },
  { key: "age", header: "Age", sortable: true },
];
const names = () => screen.getAllByText(/^(Zara|Alice|Bob|Cara)$/).map((n) => n.props.children);

describe("table helpers (ported from KuiReact useTable)", () => {
  it("cycles single sort asc → desc → off and appends with multi", () => {
    expect(nextSortState([], "a", false)).toEqual([{ key: "a", dir: "asc" }]);
    expect(nextSortState([{ key: "a", dir: "asc" }], "a", false)).toEqual([{ key: "a", dir: "desc" }]);
    expect(nextSortState([{ key: "a", dir: "desc" }], "a", false)).toEqual([]);
    expect(nextSortState([{ key: "a", dir: "asc" }], "b", true)).toEqual([{ key: "a", dir: "asc" }, { key: "b", dir: "asc" }]);
  });

  it("sorts numerically, searches every column, filters select exactly", () => {
    expect(applySort(USERS, [{ key: "age", dir: "asc" }]).map((u) => u.name)).toEqual(["Cara", "Alice", "Bob", "Zara"]);
    expect(applySearch(USERS, COLUMNS, "mem").map((u) => u.name)).toEqual(["Alice", "Bob"]);
    expect(applyColumnFilters(USERS, COLUMNS, { role: "admin" }).map((u) => u.name)).toEqual(["Zara"]);
  });
});

describe("DataTable (paginated, default)", () => {
  it("paginates with a summary line", async () => {
    await render(<DataTable columns={COLUMNS} rows={USERS} pageSize={2} />);
    expect(screen.getAllByTestId("datatable-row")).toHaveLength(2);
    expect(screen.getByText("Showing 1–2 of 4")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText("Showing 3–4 of 4")).toBeTruthy();
  });

  it("global search filters rows and reports the filtered count", async () => {
    await render(<DataTable columns={COLUMNS} rows={USERS} />);
    await fireEvent.changeText(screen.getByTestId("searchbar-dt-search"), "mem");
    expect(names()).toEqual(["Alice", "Bob"]);
    expect(screen.getByText("Showing 1–2 of 2 (filtered from 4)")).toBeTruthy();
    await fireEvent.changeText(screen.getByTestId("searchbar-dt-search"), "zzz");
    expect(screen.getByText('No results for "zzz"')).toBeTruthy();
  });

  it("header press sorts; long-press adds a secondary sort with order badges", async () => {
    await render(<DataTable columns={COLUMNS} rows={USERS} />);
    await fireEvent.press(screen.getByRole("button", { name: "Age" }));
    expect(names()).toEqual(["Cara", "Alice", "Bob", "Zara"]);
    await fireEvent(screen.getByRole("button", { name: "Name" }), "longPress");
    expect(screen.getByTestId("sort-order-age")).toHaveTextContent("1");
    expect(screen.getByTestId("sort-order-name")).toHaveTextContent("2");
  });

  it("select column filter narrows the rows", async () => {
    await render(<DataTable columns={COLUMNS} rows={USERS} />);
    await fireEvent.press(screen.getByRole("button", { name: "Filter Role" }));
    await fireEvent.press(screen.getByRole("button", { name: "Admin" }));
    await fireEvent.press(screen.getByRole("button", { name: "Apply" }));
    expect(names()).toEqual(["Zara"]);
    expect(screen.getByRole("button", { name: "Edit filter on Role" })).toBeTruthy();
  });

  it("onRowPress receives the row; state override shows loading", async () => {
    const onRowPress = jest.fn();
    const r = await render(<DataTable columns={COLUMNS} rows={USERS} onRowPress={onRowPress} />);
    await fireEvent.press(screen.getAllByTestId("datatable-row")[0]);
    expect(onRowPress).toHaveBeenCalledWith(USERS[0]);
    await r.rerender(<DataTable columns={COLUMNS} rows={USERS} state="loading" />);
    expect(screen.getByText("Loading…")).toBeTruthy();
  });
});

describe("DataTable (static)", () => {
  it("shows every row with no pagination footer", async () => {
    await render(<DataTable mode="static" columns={COLUMNS} rows={USERS} pageSize={2} />);
    expect(screen.getAllByTestId("datatable-row")).toHaveLength(4);
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
  });
});

describe("DataTable (server)", () => {
  it("fetches pages with sort/search args and renders the result", async () => {
    const fetchPage = jest.fn(async ({ page, pageSize }: { page: number; pageSize: number }) => ({
      rows: USERS.slice((page - 1) * pageSize, page * pageSize),
      total: USERS.length,
    }));
    await render(<DataTable mode="server" columns={COLUMNS} fetchPage={fetchPage} pageSize={2} />);
    await act(async () => {});
    expect(fetchPage).toHaveBeenCalledWith(expect.objectContaining({ page: 1, pageSize: 2, search: "" }));
    expect(screen.getByText("Showing 1–2 of 4")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Next page" }));
    await act(async () => {});
    expect(fetchPage).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 }));
  });

  it("shows the fetch error", async () => {
    const fetchPage = jest.fn().mockRejectedValue(new Error("Server down"));
    await render(<DataTable mode="server" columns={COLUMNS} fetchPage={fetchPage} />);
    await act(async () => {});
    expect(screen.getByRole("alert")).toHaveTextContent("Server down");
  });
});

// KuiReact: modules/ui/Table/DataTable.rowActions.test.tsx.
describe("DataTable rowActions", () => {
  type Company = { id: string; name: string; status: string; email: string };
  const COMPANIES: Company[] = [
    { id: "1", name: "Acme", status: "active", email: "a@acme.test" },
    { id: "2", name: "Globex", status: "archived", email: "" },
  ];
  const COMPANY_COLUMNS: Column<Company>[] = [{ key: "name", header: "Name" }];

  it("without rowActions there is no actions column (unchanged)", async () => {
    await render(<DataTable mode="static" searchable={false} columns={COMPANY_COLUMNS} rows={COMPANIES} />);
    expect(screen.queryAllByTestId("row-actions")).toHaveLength(0);
  });

  it("adds a trailing menu per row; actions get the row and do not press the row", async () => {
    const onCall = jest.fn();
    const onRowPress = jest.fn();
    await render(
      <DataTable
        mode="static"
        searchable={false}
        columns={COMPANY_COLUMNS}
        rows={COMPANIES}
        onRowPress={onRowPress}
        rowActionsLabel={(row) => `Actions for ${row.name}`}
        rowActions={[
          { id: "call", label: "Call", onPress: onCall },
          { id: "delete", label: "Delete", destructive: true, group: "danger", order: 100 },
        ]}
      />,
    );
    expect(screen.getAllByTestId("row-actions")).toHaveLength(2);
    await fireEvent.press(screen.getByRole("button", { name: "Actions for Acme" }));
    expect(screen.getAllByRole("menuitem").map((i) => i.props.accessibilityLabel)).toEqual(["Call", "Delete"]);
    await fireEvent.press(screen.getByRole("menuitem", { name: "Call" }));
    expect(onCall).toHaveBeenCalledWith(COMPANIES[0]);
    expect(onRowPress).not.toHaveBeenCalled();
  });

  it("resolves hidden, disabled and disabledReason per row; all hidden leaves an empty cell", async () => {
    await render(
      <DataTable
        mode="static"
        searchable={false}
        columns={COMPANY_COLUMNS}
        rows={COMPANIES}
        rowActions={[
          { id: "restore", label: "Restore", hidden: (row) => row.status !== "archived" },
          { id: "sign", label: "Sign", hidden: (row) => row.status !== "archived", disabled: (row) => !row.email, disabledReason: "Add an email address first" },
        ]}
      />,
    );
    expect(screen.getAllByTestId("row-actions")).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Row actions" })).toHaveLength(1);
    await fireEvent.press(screen.getByRole("button", { name: "Row actions" }));
    expect(screen.getByRole("menuitem", { name: "Sign" }).props.accessibilityHint).toBe("Add an email address first");
  });
});
