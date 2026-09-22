import { render, screen } from "@testing-library/react-native";
import { View } from "react-native";

import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders a horizontal rule by default", async () => {
    await render(<Separator testID="sep" />);
    const sep = screen.getByTestId("sep");
    const className = Array.isArray(sep.props.className) ? sep.props.className.join(" ") : sep.props.className;
    expect(className).toContain("h-px");
    expect(className).toContain("w-full");
  });

  it("renders a vertical rule when orientation='vertical'", async () => {
    await render(<Separator testID="sep" orientation="vertical" />);
    const sep = screen.getByTestId("sep");
    const className = Array.isArray(sep.props.className) ? sep.props.className.join(" ") : sep.props.className;
    expect(className).toContain("w-px");
    expect(className).toContain("self-stretch");
  });

  it("renders a centered label between two rules when label is set", async () => {
    await render(<Separator label="OR" />);
    expect(screen.getByText("OR")).toBeTruthy();
  });

  it("hides itself from accessibility when decorative", async () => {
    await render(<Separator testID="sep" decorative />);
    // A decorative separator is, by definition, excluded from the a11y tree —
    // `hidden: true` opts the query back in so we can assert on that prop.
    expect(screen.getByTestId("sep", { hidden: true }).props.accessibilityElementsHidden).toBe(true);
  });

  it("does not hide itself from accessibility by default", async () => {
    await render(<Separator testID="sep" />);
    expect(screen.getByTestId("sep").props.accessibilityElementsHidden).toBe(false);
  });

  it("merges a custom className", async () => {
    await render(<Separator testID="sep" className="my-4" />);
    const className = screen.getByTestId("sep").props.className;
    const flat = Array.isArray(className) ? className.join(" ") : className;
    expect(flat).toContain("my-4");
  });

  it("spreads remaining View props", async () => {
    await render(<Separator testID="sep" pointerEvents="none" />);
    expect(screen.getByTestId("sep").props.pointerEvents).toBe("none");
  });
});

// Sanity: a plain View doesn't get accessibilityElementsHidden by default,
// so the assertions above are exercising our own prop, not RN's default.
test("plain View has no default accessibilityElementsHidden", async () => {
  await render(<View testID="plain" />);
  expect(screen.getByTestId("plain").props.accessibilityElementsHidden).toBeUndefined();
});
