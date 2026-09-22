// Registers RN-aware matchers (toHaveAccessibilityState, toBeDisabled, etc.) on `expect`.
// @testing-library/react-native v14 exposes them at this subpath (no more
// `/extend-expect`); see https://callstack.github.io/react-native-testing-library/docs/api/jest-matchers
const matchers = require("@testing-library/react-native/matchers");
expect.extend(matchers);
