# Testing differences

## Summary

| Capability | KuiReact | KuiNative |
| --- | --- | --- |
| Unit test runner | vitest + @testing-library/react + user-event (`vitest.config.mts`, `vitest.setup.ts`) | **jest-expo + @testing-library/react-native v14** (`jest.config.js`, `jest.setup.js`) — installed, configured, verified working |
| Unit test files | 18 (13 component, 5 hook/lib/registry) | 1 (`Spinner.test.tsx`) |
| Test cases on shared components | 40 (Button 12, Input 9, Modal 7, Checkbox 6, Toggle 6) | 8 (Spinner) |
| Visual regression | Playwright, 739 showcase snapshots + 18 theme snapshots | none |
| CI | `.github/workflows/ci.yml`, `nightly.yml`, `visual.yml` | none |
| Lint gates | ESLint + 4 custom rules (`use-client-header`, `classname-uses-cn`, `no-default-export`, `no-bare-browser-globals-in-ui`), `audit:tokens`, `audit:spacing`, `audit:conventions`, `debt:check`, `check:circular`, `check:cross-vertical` | `expo lint` script with **no ESLint config**; `tsc --noEmit` script (**verified clean** after adding `jest` types and a `*.css` module declaration) |
| Pre-commit | husky + commitlint | none |
| Typecheck verified in this audit | — | **Yes — `npx tsc --noEmit` passes with 0 errors** as of 2026-09-22 |

## Shared component coverage

| Component | KuiReact tests | KuiNative tests | Showcase (KR / KN) |
| --- | --- | --- | --- |
| Button | 12 | 0 | 12 / 3 |
| Input | 9 | 0 | 12 / 1 |
| Modal | 7 | 0 | 5 / 1 |
| Checkbox | 6 | 0 | 5 / 1 |
| Toggle | 6 | 0 | 4 / 1 |
| Card | 0 | 0 | 6 / 2 |
| Avatar | 0 | 0 | 5 / 1 |
| Badge | 0 | 0 | 9 / 1 |
| Spinner | 0 | **8** (fixed) | 2 / 2 |
| EmptyState | 0 | 0 | 2 / 1 |
| Skeleton | 0 | 0 | 6 / 1 |
| **Total** | **40** | **8** | **68 / 16** (KuiNative's Text adds 1) |

KuiReact itself leaves 6 of 11 shared components untested; those gaps should be closed on both sides.

## KuiNative test stack

- ✅ `jest-expo` preset + `@testing-library/react-native` v14 — installed, configured (`jest.config.js`, `jest.setup.js`), verified working end to end on Spinner (role/label queries mirror KuiReact's `getByRole` style; `expect.extend` wires up `toHaveAccessibilityState`, `toBeDisabled`, etc. via `@testing-library/react-native/matchers`).
  - Note for future suites: `@testing-library/react-native` v14's `render()` is **async** — every test must `await render(...)` before querying `screen`, unlike KuiReact's vitest tests.
  - Note: a plain `View` needs `accessible={true}` for `getByRole` (and real assistive tech) to see its `accessibilityRole` at all — found via this harness, fixed on Spinner, still open on SkeletonCard/EmptyState.
- ⬜ Port the remaining ~32 relevant KuiReact cases across the other 10 shared components (web-only cases such as `type="button"` or polymorphic `as` become N/A; the list is in each backlog/feature-matrix file) as each is fixed.
- ⬜ Visual regression: Maestro or Detox screenshots of the showcase, or Storybook-RN + Chromatic; start with react-native-web + Playwright to reuse KuiReact's snapshot setup.
- ⬜ CI: typecheck + lint + jest on PR; parity-matrix check once `parity.exceptions.json` exists.
