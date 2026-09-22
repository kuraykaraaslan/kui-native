// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

const jestGlobals = Object.fromEntries(
  ["jest", "expect", "describe", "it", "test", "beforeEach", "afterEach", "beforeAll", "afterAll"].map((g) => [g, "readonly"]),
);

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "web-build/*", ".expo/*", "docs/audits/**/tooling/*"],
  },
  {
    files: ["**/*.test.{ts,tsx,js}", "jest.setup.js"],
    languageOptions: { globals: jestGlobals },
  },
  {
    // The React Compiler rules bundled with eslint-plugin-react-hooks flag
    // RN's standard `useRef(new Animated.Value(0)).current` idiom and the
    // "latest value ref" pattern used by PanResponder-driven components.
    // They're warnings until those call sites are migrated (e.g. to
    // `useState(() => new Animated.Value(0))` / `useEffectEvent`), so that
    // `npm run lint` can gate CI on real errors meanwhile.
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
    },
  },
]);
