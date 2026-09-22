/**
 * jest-expo preset wires up the RN/Expo transform + mocks (see
 * https://docs.expo.dev/develop/unit-testing/). testEnvironmentOptions and
 * transformIgnorePatterns follow the same preset's documented defaults.
 */
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|react-native-css-interop)",
  ],
  collectCoverageFrom: ["modules/ui/**/*.{ts,tsx}", "!modules/ui/**/*.d.ts", "!modules/ui/index.ts"],
};
