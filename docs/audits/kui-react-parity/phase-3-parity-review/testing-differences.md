# Testing differences

## Summary

| Capability | KuiReact | KuiNative |
| --- | --- | --- |
| Unit test runner | vitest + @testing-library/react + user-event (`vitest.config.mts`, `vitest.setup.ts`) | none |
| Unit test files | 18 (13 component, 5 hook/lib/registry) | 0 |
| Test cases on shared components | 40 (Button 12, Input 9, Modal 7, Checkbox 6, Toggle 6) | 0 |
| Visual regression | Playwright, 739 showcase snapshots + 18 theme snapshots | none |
| CI | `.github/workflows/ci.yml`, `nightly.yml`, `visual.yml` | none |
| Lint gates | ESLint + 4 custom rules (`use-client-header`, `classname-uses-cn`, `no-default-export`, `no-bare-browser-globals-in-ui`), `audit:tokens`, `audit:spacing`, `audit:conventions`, `debt:check`, `check:circular`, `check:cross-vertical` | `expo lint` script with **no ESLint config**; `tsc --noEmit` script |
| Pre-commit | husky + commitlint | none |
| Typecheck verified in this audit | — | not run: `node_modules` absent in the working copy (`npx tsc` resolved to an unrelated package). Status unknown. |

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
| Spinner | 0 | 0 | 2 / 1 |
| EmptyState | 0 | 0 | 2 / 1 |
| Skeleton | 0 | 0 | 6 / 1 |
| **Total** | **40** | **0** | **68 / 15** (KuiNative's Text adds 1) |

KuiReact itself leaves 6 of 11 shared components untested; those gaps should be closed on both sides.

## Recommended KuiNative test stack

- `jest-expo` preset + `@testing-library/react-native` (role/label queries mirror KuiReact's `getByRole` style, and `toHaveAccessibilityState` covers `busy/checked/disabled/selected/expanded`).
- Port the 40 KuiReact cases (web-only cases such as `type="button"` or polymorphic `as` become N/A; the list is in each backlog/feature-matrix file).
- Visual regression: Maestro or Detox screenshots of the showcase, or Storybook-RN + Chromatic; start with react-native-web + Playwright to reuse KuiReact's snapshot setup.
- CI: typecheck + lint + jest on PR; parity-matrix check once `parity.exceptions.json` exists.
