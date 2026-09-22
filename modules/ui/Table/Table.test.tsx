import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { Table } from "./index";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

type User = { name: string; email: string; role: string };
const ROWS: User[] = [
  { name: "Zara Kim", email: "zara@example.com", role: "Admin" },
  { name: "Alice Brown", email: "alice@example.com", role: "Member" },
  { name: "Bob Lee", email: "bob@example.com", role: "Viewer" },
];
const names = () => screen.getAllByText(/Kim|Brown|Lee/).map((n) => n.props.children);

describe("Table", () => {
  it("renders headers and one row per record", async () => {
    await render(<Table caption="Users" columns={[{ key: "name", header: "Name" }, { key: "email", header: "Email" }]} rows={ROWS} />);
    expect(screen.getByLabelText("Users")).toBeTruthy();
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getAllByTestId("table-row")).toHaveLength(3);
    expect(screen.getByText("alice@example.com")).toBeTruthy();
  });

  it("shows the empty message when there are no rows", async () => {
    await render(<Table columns={[{ key: "name", header: "Name" }]} rows={[]} emptyMessage="No users found." />);
    expect(screen.getByText("No users found.")).toBeTruthy();
  });

  it("uses render for custom cells", async () => {
    await render(<Table columns={[{ key: "role", header: "Role", render: (r: User) => <RNText>{`★ ${r.role}`}</RNText> }]} rows={ROWS} />);
    expect(screen.getByText("★ Admin")).toBeTruthy();
  });

  it("sortable headers cycle asc → desc → unsorted", async () => {
    await render(<Table columns={[{ key: "name", header: "Name", sortable: true }]} rows={ROWS} />);
    expect(names()).toEqual(["Zara Kim", "Alice Brown", "Bob Lee"]);
    await fireEvent.press(screen.getByRole("button", { name: "Name" }));
    expect(names()).toEqual(["Alice Brown", "Bob Lee", "Zara Kim"]);
    expect(screen.getByRole("button", { name: "Name" }).props.accessibilityValue.text).toBe("sorted ascending");
    await fireEvent.press(screen.getByRole("button", { name: "Name" }));
    expect(names()).toEqual(["Zara Kim", "Bob Lee", "Alice Brown"]);
    await fireEvent.press(screen.getByRole("button", { name: "Name" }));
    expect(names()).toEqual(["Zara Kim", "Alice Brown", "Bob Lee"]);
  });

  it("honours defaultSortKey / defaultSortDir", async () => {
    await render(<Table columns={[{ key: "name", header: "Name", sortable: true }]} rows={ROWS} defaultSortKey="name" defaultSortDir="desc" />);
    expect(names()[0]).toBe("Zara Kim");
    expect(names()[2]).toBe("Alice Brown");
  });

  it("uses KuiReact's container, header and cell classes", async () => {
    await render(<Table caption="Users" columns={[{ key: "name", header: "Name" }]} rows={ROWS} />);
    expect(classNameOf(screen.getByLabelText("Users"))).toContain("rounded-lg border border-border");
    expect(classNameOf(screen.getByText("Name"))).toContain("uppercase");
    expect(classNameOf(screen.getByText("Bob Lee"))).toContain("text-sm text-text-primary");
  });
});
