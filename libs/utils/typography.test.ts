import { Platform } from "react-native";

import { configureFonts, configuredFontStyle, fontStyle, fontWeightName, FONTS, isFontConfigured, usesWeightFamilies } from "./typography";

const INTER = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

describe("configureFonts / fontStyle", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    configureFonts();
  });

  it("keeps the default system font + numeric weight when never called (jest-expo runs as iOS)", () => {
    expect(isFontConfigured()).toBe(false);
    expect(FONTS.sans).toBe("System");
    expect(FONTS.mono).toBe("Menlo");
    expect(fontStyle()).toEqual({ fontFamily: "System", fontWeight: "400" });
    expect(fontStyle("semiBold")).toEqual({ fontFamily: "System", fontWeight: "600" });
    expect(fontStyle("bold", "mono")).toEqual({ fontFamily: "Menlo", fontWeight: "700" });
    expect(configuredFontStyle("bold")).toEqual({});
  });

  it("a per-weight map picks the weight's family and sets no fontWeight on native", () => {
    configureFonts({ sans: INTER });
    expect(isFontConfigured()).toBe(true);
    expect(usesWeightFamilies()).toBe(true);
    expect(fontStyle()).toEqual({ fontFamily: "Inter_400Regular" });
    expect(fontStyle("medium")).toEqual({ fontFamily: "Inter_500Medium" });
    expect(fontStyle("semiBold")).toEqual({ fontFamily: "Inter_600SemiBold" });
    expect(fontStyle("bold")).toEqual({ fontFamily: "Inter_700Bold" });
    expect(FONTS.sans).toBe("Inter_400Regular");
    // mono is untouched
    expect(isFontConfigured("mono")).toBe(false);
    expect(fontStyle("regular", "mono")).toEqual({ fontFamily: "Menlo", fontWeight: "400" });
    // host-font text (SVG / DOM) gets the family and a neutral weight
    expect(configuredFontStyle("semiBold")).toEqual({ fontFamily: "Inter_600SemiBold", fontWeight: "400" });
  });

  it("a per-weight map falls back to the nearest configured weight", () => {
    configureFonts({ sans: { regular: "R", bold: "B" } });
    expect(fontStyle("medium").fontFamily).toBe("R");
    expect(fontStyle("semiBold").fontFamily).toBe("B");
    configureFonts({ sans: { regular: "R", medium: "M" } });
    expect(fontStyle("semiBold").fontFamily).toBe("M");
    expect(fontStyle("bold").fontFamily).toBe("M");
  });

  it("a plain string is one family + fontWeight", () => {
    configureFonts({ sans: "Inter", mono: "JetBrainsMono" });
    expect(usesWeightFamilies()).toBe(false);
    expect(fontStyle("semiBold")).toEqual({ fontFamily: "Inter", fontWeight: "600" });
    expect(fontStyle("regular", "mono")).toEqual({ fontFamily: "JetBrainsMono", fontWeight: "400" });
    expect(configuredFontStyle("bold")).toEqual({ fontFamily: "Inter", fontWeight: "700" });
    expect(FONTS.mono).toBe("JetBrainsMono");
  });

  it("uses the `web` CSS stack + fontWeight on the web", () => {
    jest.replaceProperty(Platform, "OS", "web");
    configureFonts({ sans: { ...INTER, web: "Inter, ui-sans-serif, system-ui, sans-serif" } });
    expect(usesWeightFamilies()).toBe(false);
    expect(fontStyle("bold")).toEqual({ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", fontWeight: "700" });
    expect(FONTS.sans).toBe("Inter, ui-sans-serif, system-ui, sans-serif");
  });

  it("ignores `web` on native and keeps the per-weight families there", () => {
    configureFonts({ sans: { ...INTER, web: "Inter, sans-serif" } });
    expect(fontStyle("bold")).toEqual({ fontFamily: "Inter_700Bold" });
  });

  it("on the web without a `web` stack, a per-weight map still uses the weight families", () => {
    jest.replaceProperty(Platform, "OS", "web");
    configureFonts({ sans: INTER });
    expect(fontStyle("medium")).toEqual({ fontFamily: "Inter_500Medium" });
  });

  it("configureFonts() with no roles restores the defaults", () => {
    configureFonts({ sans: INTER, mono: "X" });
    configureFonts({});
    expect(isFontConfigured()).toBe(false);
    expect(isFontConfigured("mono")).toBe(false);
    expect(fontStyle("medium")).toEqual({ fontFamily: "System", fontWeight: "500" });
    expect(FONTS.sans).toBe("System");
    expect(FONTS.mono).toBe("Menlo");
  });
});

describe("fontWeightName", () => {
  it.each([
    ["normal", "regular"],
    ["light", "regular"],
    ["medium", "medium"],
    ["semibold", "semiBold"],
    ["bold", "bold"],
    ["black", "bold"],
    ["400", "regular"],
    [500, "medium"],
    ["600", "semiBold"],
    [800, "bold"],
  ] as const)("%s -> %s", (input, expected) => {
    expect(fontWeightName(input)).toBe(expected);
  });

  it("returns undefined for no / unknown weight", () => {
    expect(fontWeightName(undefined)).toBeUndefined();
    expect(fontWeightName("")).toBeUndefined();
    expect(fontWeightName("heavy-ish")).toBeUndefined();
  });
});
