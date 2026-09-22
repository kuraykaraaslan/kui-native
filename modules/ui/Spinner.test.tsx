import { render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { Spinner } from "./Spinner";

// @testing-library/react-native v14 made `render` async — every test below
// awaits it before querying `screen`.
describe("Spinner", () => {
  it("renders with the progressbar role and a Loading label", async () => {
    await render(<Spinner />);
    expect(screen.getByRole("progressbar")).toBeTruthy();
    expect(screen.getByLabelText("Loading")).toBeTruthy();
  });

  it("accepts a custom color", async () => {
    await render(<Spinner color="#ff0000" />);
    expect(screen.getByRole("progressbar")).toBeTruthy();
  });

  it("accepts a custom accessibilityLabel", async () => {
    await render(<Spinner accessibilityLabel="Loading results" />);
    expect(screen.getByLabelText("Loading results")).toBeTruthy();
    expect(screen.queryByLabelText("Loading")).toBeNull();
  });

  it.each(["xs", "sm", "md", "lg", "xl"] as const)("renders size=%s", async (size) => {
    await render(<Spinner size={size} />);
    expect(screen.getByRole("progressbar")).toBeTruthy();
  });

  it.each([
    ["xs", 12, 1],
    ["sm", 16, 2],
    ["md", 24, 2],
    ["lg", 32, 3],
    ["xl", 48, 4],
  ] as const)("size=%s draws KuiReact's %dpx ring with a %dpx border", async (size, box, border) => {
    await render(<Spinner size={size} />);
    const ring = StyleSheet.flatten(screen.getByTestId("spinner-ring", { hidden: true } as never).props.style);
    expect([ring.width, ring.height, ring.borderWidth]).toEqual([box, box, border]);
  });

  it("uses the border token for the track and the primary (or custom) colour for the arc", async () => {
    await render(<Spinner color="#ff0000" />);
    const ring = StyleSheet.flatten(screen.getByTestId("spinner-ring", { hidden: true } as never).props.style);
    expect(ring.borderColor).toBe("#e5e7eb");
    expect(ring.borderTopColor).toBe("#ff0000");
  });
});
