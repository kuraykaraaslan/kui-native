# useFocusTrap

> Backlog item · KuiReact id `use-focus-trap` · layer `hook` · **Hooks** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

DOM focus-trap hook used by overlays.

**Why it matters for KuiNative:** DOM focus trap for overlays.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/libs/hooks/useFocusTrap.ts` (1 file, 62 LOC) |
| Public export | `@/libs/hooks/useFocusTrap` — internal (libs/, not in package exports) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 6 production file(s), 0 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | keyboard handling |

## Required Props

_Props could not be extracted statically (hook — see signature in source). Read `kui-react/libs/hooks/useFocusTrap.ts` and fill this section before implementation._

## Variants

_No showcase variants recorded in the KuiReact registry._

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

No DOM focus on native; replace with `accessibilityViewIsModal` and initial accessibility focus. Keep a web-only branch for react-native-web.

- Location: `libs/hooks/useFocusTrap.ts`, named export `useFocusTrap` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `useFocusTrapProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `useFocusTrap` from the hooks barrel with its props type
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
