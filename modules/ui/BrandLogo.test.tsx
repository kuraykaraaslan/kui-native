import { render, screen } from "@testing-library/react-native";

import { BrandLogo } from "./BrandLogo";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

describe("BrandLogo", () => {
  it("renders the token on a primary tile with KuiReact's size classes", async () => {
    const { toJSON } = await render(<BrandLogo size="lg">KU</BrandLogo>);
    const tile = classNameOf(toJSON() as never);
    for (const c of ["rounded-2xl", "bg-primary", "h-16", "w-16"]) expect(tile).toContain(c);
    expect(classNameOf(screen.getByText("KU"))).toContain("text-2xl");
    expect(classNameOf(screen.getByText("KU"))).toContain("font-bold");
  });

  it("defaults to md and lets className restyle the tile", async () => {
    const { toJSON } = await render(<BrandLogo className="bg-secondary">N</BrandLogo>);
    const tile = classNameOf(toJSON() as never);
    expect(tile).toContain("h-12 w-12");
    expect(tile).toContain("bg-secondary");
  });
});
