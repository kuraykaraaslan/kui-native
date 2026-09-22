# Accessibility differences

KuiReact codifies accessibility in AGENTS.md (semantic HTML, `aria-busy/invalid/describedby/pressed/expanded`, mandatory `focus-visible:ring-2`) and tests it (role/name queries, `aria-*` assertions in 40 shared-component test cases). KuiNative's README states `accessibilityRole/Label/State` on interactive elements, and that is broadly followed, but nothing is tested.

## Critical

### AX1 — Modal collapses into a single VoiceOver element
`Modal.tsx` wraps the panel in a backdrop `Pressable`, and the panel is itself a `Pressable` (`onPress={() => {}}`) so taps on it don't close the modal. `Pressable` is `accessible` by default, and iOS treats an accessible element's descendants as one element. Result: title, body and footer buttons cannot be focused individually with VoiceOver. **Fix:** make the backdrop an absolutely positioned sibling `Pressable` (`accessibilityLabel="Close"`, or `accessible={false}` with a visible × button) and the panel a plain `View`.

### AX2 — Form errors are silent
KuiReact Input/Checkbox render errors with `role="alert"` and link them via `aria-describedby`, with `aria-invalid` on the field. KuiNative TextInput shows red text only: no announcement, no hint link. Checkbox has no error at all. **Fix:** `accessibilityHint` = hint/error text; announce new errors with `AccessibilityInfo.announceForAccessibility`; `accessibilityLiveRegion="polite"` on Android.

## High

| # | Component | KuiReact | KuiNative | Fix |
| --- | --- | --- | --- | --- |
| AX3 | Switch | label + control are one element | label Text and Switch are two focus stops; label read twice | one `Pressable` row with `accessibilityRole="switch"` |
| AX4 | Modal | focus moved into dialog and restored | none | `setAccessibilityFocus` on title; restore on close |
| AX5 | Modal | `aria-labelledby` / `aria-describedby`, required `title` | optional title, not linked | require `title`; `accessibilityLabel` on container |
| AX6 | Text / Card / Modal / EmptyState | `<h2>`/`<h3>` headings | plain Text | `accessibilityRole="header"` on heading variants |
| AX7 | Input/Checkbox/Toggle/Modal | name required by type | optional | require label/title or `accessibilityLabel` |
| AX8 | Button | decorative icons `aria-hidden` | `iconLeft` exposed | wrap icons with `importantForAccessibility="no-hide-descendants"` + `accessibilityElementsHidden` |
| AX9 | Button | `aria-pressed` for `selected` | — | `accessibilityState.selected` |
| AX10 | all interactive | `focus-visible` ring | no focus style | focus state on RN-web / keyboard |

## Medium

- Badge dismiss (when added) needs `hitSlop` — KuiReact's 10 px × is below touch-target size.
- EmptyState icon not hidden from the a11y tree.
- Spinner/Skeleton labels are hard-coded English ("Loading") in both libraries; add a prop.
- No component honours Reduce Motion (SkeletonCard pulse runs forever); KuiReact Modal has a `reducedMotion` stub.
- Checkbox 20 px box inside a full-row Pressable meets touch targets; keep.

## Platform infrastructure missing in KuiNative

| KuiReact | Purpose | RN equivalent needed |
| --- | --- | --- |
| `announce()` (`libs/a11y/announce.ts`), `useAnnounce`, `Announcer`, `LiveRegion` | screen-reader announcements | `AccessibilityInfo.announceForAccessibility` wrapper + `accessibilityLiveRegion` |
| `useFocusTrap`, `FocusTrap` | modal focus containment | `accessibilityViewIsModal` + initial focus |
| `useA11yCheck` | dev-time checks | `eslint-plugin-react-native-a11y` |
| a11y assertions in unit tests | regression safety | `@testing-library/react-native` `getByRole`/`toHaveAccessibilityState` |

## Where KuiNative is equal or better
- Checkbox exposes `checked: 'mixed'` correctly.
- Button exposes `busy` and `disabled`.
- Avatar always exposes `accessibilityRole="image"` with the name (KuiReact's image branch relies on `alt`).
- Spinner is announced as a progressbar.
