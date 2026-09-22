import { render, screen } from "@testing-library/react-native";

import { StatCard } from "./StatCard";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("StatCard", () => {
  it("renders the value and label with KuiReact's classes", async () => {
    const { toJSON } = await render(<StatCard label="Total Users" value={1284} />);
    expect(screen.getByText("Total Users")).toBeTruthy();
    expect(classNameOf(screen.getByText("1284"))).toContain("text-2xl font-black text-text-primary");
    for (const c of ["bg-surface-raised", "rounded-xl", "px-5", "py-4"]) expect(classNameOf(toJSON() as never)).toContain(c);
  });

  it("accent recolours the value", async () => {
    await render(<StatCard label="Active" value={947} accent="text-success" />);
    expect(classNameOf(screen.getByText("947"))).toContain("text-success");
    expect(classNameOf(screen.getByText("947"))).not.toContain("text-text-primary");
  });
});
