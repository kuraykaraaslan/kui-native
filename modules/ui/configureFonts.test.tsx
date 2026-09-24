import { render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { configureFonts } from "../../libs/utils/typography";

import { Input } from "./Input";
import { SearchBar } from "./SearchBar";
import { Text } from "./Text";

const INTER = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

function styleOf(node: { props: { style?: unknown } }) {
  return (StyleSheet.flatten(node.props.style as never) ?? {}) as { fontFamily?: string; fontWeight?: string };
}

describe("configureFonts in components", () => {
  afterEach(() => configureFonts());

  it("unconfigured: Text keeps the system family + variant weight, inputs the system family", async () => {
    await render(
      <>
        <Text variant="h1">Heading</Text>
        <Input label="Email" testID="email" />
      </>,
    );
    expect(styleOf(screen.getByText("Heading"))).toMatchObject({ fontFamily: "System", fontWeight: "700" });
    expect(styleOf(screen.getByTestId("email"))).toMatchObject({ fontFamily: "System", fontWeight: "400" });
  });

  it("per-weight map: Text variants use the weight's family without fontWeight", async () => {
    configureFonts({ sans: INTER });
    await render(
      <>
        <Text variant="h1">Heading</Text>
        <Text variant="label">Label</Text>
        <Text>Body</Text>
      </>,
    );
    const h1 = styleOf(screen.getByText("Heading"));
    expect(h1.fontFamily).toBe("Inter_700Bold");
    expect(h1.fontWeight).toBeUndefined();
    expect(styleOf(screen.getByText("Label")).fontFamily).toBe("Inter_500Medium");
    expect(styleOf(screen.getByText("Body")).fontFamily).toBe("Inter_400Regular");
  });

  it("per-weight map: a font-<weight> class or style fontWeight picks the family and resets the weight", async () => {
    configureFonts({ sans: INTER });
    await render(
      <>
        <Text className="font-semibold">Semi</Text>
        <Text variant="h1" className="font-medium">Medium heading</Text>
        <Text style={{ fontWeight: "700" }}>Bold style</Text>
      </>,
    );
    expect(styleOf(screen.getByText("Semi"))).toMatchObject({ fontFamily: "Inter_600SemiBold", fontWeight: "400" });
    expect(styleOf(screen.getByText("Medium heading"))).toMatchObject({ fontFamily: "Inter_500Medium", fontWeight: "400" });
    expect(styleOf(screen.getByText("Bold style"))).toMatchObject({ fontFamily: "Inter_700Bold", fontWeight: "400" });
  });

  it("an explicit fontFamily in style still wins", async () => {
    configureFonts({ sans: INTER });
    await render(<Text style={{ fontFamily: "Custom" }}>Own</Text>);
    expect(styleOf(screen.getByText("Own")).fontFamily).toBe("Custom");
  });

  it("font-mono uses the configured mono family", async () => {
    configureFonts({ mono: { regular: "Mono_400", bold: "Mono_700" } });
    await render(
      <>
        <Text className="font-mono">code</Text>
        <Text className="font-mono font-bold">bold code</Text>
      </>,
    );
    expect(styleOf(screen.getByText("code")).fontFamily).toBe("Mono_400");
    expect(styleOf(screen.getByText("bold code")).fontFamily).toBe("Mono_700");
  });

  it("a string family keeps fontWeight on Text", async () => {
    configureFonts({ sans: "Inter" });
    await render(<Text variant="h3">Sub</Text>);
    expect(styleOf(screen.getByText("Sub"))).toMatchObject({ fontFamily: "Inter", fontWeight: "600" });
  });

  it("inputs (Input, SearchBar) use the configured regular family", async () => {
    configureFonts({ sans: INTER });
    await render(
      <>
        <Input label="Email" testID="email" style={{ marginTop: 2 }} />
        <SearchBar id="s" />
      </>,
    );
    const email = styleOf(screen.getByTestId("email"));
    expect(email.fontFamily).toBe("Inter_400Regular");
    expect(email.fontWeight).toBeUndefined();
    expect(styleOf(screen.getByTestId("searchbar-s")).fontFamily).toBe("Inter_400Regular");
  });
});
