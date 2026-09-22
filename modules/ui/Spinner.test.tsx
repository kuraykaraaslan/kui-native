import { render, screen } from "@testing-library/react-native";

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
});
