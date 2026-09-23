import { render, screen } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { FONTS } from "@/libs/utils/typography";

import { Text } from "./Text";

function styleOf(node: ReturnType<typeof screen.getByText>) {
  const flat = Array.isArray(node.props.style) ? Object.assign({}, ...node.props.style.filter(Boolean)) : node.props.style;
  return flat as { fontWeight?: string; fontFamily?: string };
}

describe("Text", () => {
  it("renders children", async () => {
    await render(<Text>Hello</Text>);
    expect(screen.getByText("Hello")).toBeTruthy();
  });

  it.each(["h1", "h2", "h3", "h4", "title", "titleSm"] as const)(
    "applies a bold/semibold numeric fontWeight for heading variant %s (not just a font family)",
    async (variant) => {
      await render(<Text variant={variant}>Heading</Text>);
      const style = styleOf(screen.getByText("Heading"));
      expect(Number(style.fontWeight)).toBeGreaterThanOrEqual(600);
    },
  );

  it("body/caption use the regular weight", async () => {
    await render(<Text variant="body">Body</Text>);
    expect(styleOf(screen.getByText("Body")).fontWeight).toBe("400");
  });

  it("defaults heading variants to the header accessibility role", async () => {
    await render(<Text variant="h2">Section</Text>);
    expect(screen.getByRole("header")).toBeTruthy();
  });

  it("does not set a header role for body text", async () => {
    await render(<Text variant="body">Paragraph</Text>);
    expect(screen.queryByRole("header")).toBeNull();
  });

  it("lets the caller override accessibilityRole", async () => {
    await render(
      <Text variant="h1" accessibilityRole="none">
        Decorative
      </Text>,
    );
    expect(screen.queryByRole("header")).toBeNull();
  });

  it("merges a custom style without dropping the variant style", async () => {
    await render(
      <Text variant="body" style={{ marginTop: 4 }}>
        Styled
      </Text>,
    );
    const style = styleOf(screen.getByText("Styled"));
    expect(style.fontWeight).toBe("400");
  });

  it("an explicit font-weight class wins over the variant weight (no inline fontWeight is set)", async () => {
    await render(
      <Text variant="body" className="font-semibold">
        Semibold
      </Text>,
    );
    expect(styleOf(screen.getByText("Semibold")).fontWeight).toBeUndefined();
  });

  it("an explicit font-family class wins over the variant family", async () => {
    await render(<Text className="font-serif">Quote</Text>);
    expect(styleOf(screen.getByText("Quote")).fontFamily).toBeUndefined();
  });

  it("font-mono uses the mono family (Geist Mono on web, like KuiReact)", async () => {
    await render(<Text className="font-mono">Code</Text>);
    expect(styleOf(screen.getByText("Code")).fontFamily).toBe(FONTS.mono);
  });

  it("forwards other RNText props such as numberOfLines", async () => {
    await render(<Text numberOfLines={1}>Truncated</Text>);
    expect(screen.getByText("Truncated").props.numberOfLines).toBe(1);
  });
});

// Sanity: RNText itself has no accessibilityRole by default, so the "header"
// role above is coming from our component, not the platform.
test("RNText has no default accessibilityRole", async () => {
  await render(<RNText>plain</RNText>);
  expect(screen.queryByRole("header")).toBeNull();
});
