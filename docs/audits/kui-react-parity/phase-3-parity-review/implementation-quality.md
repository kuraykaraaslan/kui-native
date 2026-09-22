# Implementation quality

> KuiNative components rated on their own merits (code quality, architecture, state, hooks, types, theme integration, reuse, maintainability, tests, docs). Scale: Excellent · Good · Acceptable · Needs Improvement · Critical Issues. No component can exceed **Good** while it has no tests.

## Overview

| Component | Rating | Code | Architecture | State / hooks | Types | Theme | Reuse | Tests | Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | Acceptable | clean variant maps | ◐ no rest/ref | ✓ | ✓ `ButtonProps` | ✓ tokens + `useThemeTokens` for spinner | ◐ `label` only | ✗ | showcase |
| Text | Needs Improvement | clean | ✓ RN props spread | — | ✓ | ✗ weight bug, fonts | ✓ | ✗ | showcase |
| Card | Acceptable | clean | ✓ `ViewProps` spread | — | ✓ | ◐ no shadow | ◐ | ✗ | showcase |
| Avatar | Good | clean, `expo-image` with error fallback | ✓ | ✓ `useState` for error | ✓ | ✓ | ✓ | ✗ | showcase |
| AvatarGroup | Needs Improvement | trivial wrapper | ✗ wrong model | — | ◐ inline type, not exported | — | ✗ | ✗ | showcase |
| Badge | Acceptable | clean | ◐ | — | ✓ | ✓ exact token match | ◐ | ✗ | showcase |
| TextInput | Acceptable | clean; forwards `onFocus/onBlur` correctly | ✓ RN props spread | ✓ focus state | ◐ ref untyped | ✓ placeholder via tokens | ◐ | ✗ | showcase |
| Checkbox | Good | clean | ✓ | ✓ controlled | ✓ | ✓ | ✓ | ✗ | showcase |
| Switch | Needs Improvement | clean | ✗ two focus stops, label not pressable | ✓ | ✓ | ◐ `#ffffff` thumb (documented), no `ios_backgroundColor` | ◐ | ✗ | showcase |
| Spinner | Needs Improvement | clean | ✓ | — | ✓ | ✓ | ✓ | ✗ | showcase |
| EmptyState | Acceptable | clean | ◐ rigid action API | — | ✓ | ✓ | ◐ | ✗ | showcase |
| SkeletonCard | Acceptable | correct loop start/stop cleanup | ◐ legacy `Animated`, one layout | ✓ | ✓ | ✓ | ✗ no primitives | ✗ | showcase |
| Modal | Critical Issues | small, readable | ✗ nested Pressables, no scroll/keyboard handling, no shared overlay core | — | ✓ | ◐ raw rgba backdrop (documented) | ✗ | ✗ | showcase |

Tally: Excellent 0 · Good 2 · Acceptable 6 · Needs Improvement 4 · Critical Issues 1.

## Strengths (keep)

- Consistent authoring pattern: named exports, `Record<Variant, string>` maps, `cn()` identical to KuiReact, explicit barrel with type exports.
- Token discipline: raw colours appear only where RN props cannot take a class (`placeholderTextColor`, `trackColor`, FA `color`, Switch thumb, Modal backdrop), and each is commented. That is stricter than KuiReact, whose own audit found 40 raw-hex hits.
- `useThemeTokens()` is a good bridge for colour-string props and correctly follows the runtime scheme.
- a11y props are present on every interactive component (role, label, state).
- `expo-image` with error fallback in Avatar.

## Weaknesses (fix)

1. **No `...rest` / `ref` on 9 of 12 exports.** Blocks `testID`, E2E, `accessibilityHint`, focus chaining.
2. **No shared field shell.** Label/hint/error markup is duplicated across TextInput, Checkbox and Switch, with drift already visible (`label` variant + `font-medium` in TextInput, `label` variant alone in Checkbox/Switch).
3. **No shared overlay layer.** KuiReact factored presence, focus trap, scroll lock, portal and positioning into `Overlays/shared`; KuiNative's single overlay already has critical defects, and Drawer/Popover/Select/Toast will repeat them.
4. **Theme lives in the showcase.** `themes[scheme]` is applied in `app/_layout.tsx`; nothing in the library makes a consumer's tree themed.
5. **Reanimated 4 installed, unused**; SkeletonCard uses legacy `Animated`.
6. **Stale docs/config:** README says Expo SDK 55 (package is SDK 56), says KuiReact uses Inter (it uses Geist), links `[KUIREACT]: ../01_NextJS_Components` (not this repo's layout); `tailwind-tokens.js` comment says dark values swap "via @media in global.css" (they don't — `vars()` does); `tailwind.config.js` sets `darkMode: "class"` though dark mode is driven by `vars()`.
7. **No tests, no lint config, no CI.**
