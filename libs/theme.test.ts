import { renderHook } from "@testing-library/react-native";

import { configureTheme, themes, tokenMaps, useThemeMode, useThemeTokens } from "./theme";

/**
 * The CSS variables a `vars()` style carries. On native (jest-expo's default
 * platform) `vars()` returns an empty, opaque object and keeps the variables in
 * react-native-css-interop's `opaqueStyles` WeakMap; on web it is the plain
 * `{ "--color-x": value }` object.
 */
function readVars(style: object): Record<string, string> {
  const { opaqueStyles } = require("react-native-css-interop/dist/runtime/native/styles") as {
    opaqueStyles: WeakMap<object, { n: { variables: [string, string][] }[] }>;
  };
  const opaque = opaqueStyles.get(style);
  if (!opaque) return style as Record<string, string>;
  return Object.fromEntries(opaque.n.flatMap((rule) => rule.variables));
}

describe("configureTheme", () => {
  afterEach(() => {
    configureTheme();
    useThemeMode.getState().setMode("system");
  });

  it("keeps the built-in tokens when it is never called", () => {
    expect(tokenMaps.light.primary).toBe("#3b82f6");
    expect(readVars(themes.light)["--color-primary"]).toBe("#3b82f6");
    expect(readVars(themes.dark)["--color-primary"]).toBe("#60a5fa");
  });

  it("overrides a token in both the NativeWind vars and the raw token map", () => {
    const lightMap = tokenMaps.light;
    configureTheme({ light: { primary: "#f4511e" } });

    // className side: bg-primary reads var(--color-primary) from the root vars().
    expect(readVars(themes.light)["--color-primary"]).toBe("#f4511e");
    // JS side: the same value, updated in place for anyone holding the map.
    expect(tokenMaps.light.primary).toBe("#f4511e");
    expect(tokenMaps.light).toBe(lightMap);

    // Everything else keeps its default.
    expect(readVars(themes.light)["--color-primary-hover"]).toBe("#2563eb");
    expect(tokenMaps.light["primary-hover"]).toBe("#2563eb");
    expect(tokenMaps.dark.primary).toBe("#60a5fa");
    expect(readVars(themes.dark)["--color-primary"]).toBe("#60a5fa");
  });

  it("is what useThemeTokens() returns", async () => {
    configureTheme({ light: { primary: "#f4511e" }, dark: { primary: "#ff7043" } });
    useThemeMode.getState().setMode("light");
    expect((await renderHook(() => useThemeTokens())).result.current.primary).toBe("#f4511e");
    useThemeMode.getState().setMode("dark");
    expect((await renderHook(() => useThemeTokens())).result.current.primary).toBe("#ff7043");
  });

  it("merges onto the defaults, not onto the previous call, and resets with no argument", () => {
    configureTheme({ light: { primary: "#f4511e", secondary: "#000000" } });
    configureTheme({ light: { primary: "#111111" } });
    expect(tokenMaps.light.secondary).toBe("#8b5cf6");
    expect(tokenMaps.light.primary).toBe("#111111");

    configureTheme();
    expect(tokenMaps.light.primary).toBe("#3b82f6");
    expect(readVars(themes.light)["--color-primary"]).toBe("#3b82f6");
  });

  it("ignores undefined values", () => {
    configureTheme({ light: { primary: undefined } });
    expect(tokenMaps.light.primary).toBe("#3b82f6");
  });
});
