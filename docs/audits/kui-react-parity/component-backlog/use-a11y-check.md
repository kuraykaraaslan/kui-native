# useA11yCheck

> Backlog item · KuiReact id `use-a11y-check` · layer `hook` · **Hooks** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `web-only` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Dev-time accessibility check hook.

**Why it matters for KuiNative:** Dev-time DOM a11y checker.

> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/libs/hooks/useA11yCheck.ts` (1 file, 30 LOC) |
| Public export | `@/libs/hooks/useA11yCheck` — internal (libs/, not in package exports) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

_Props could not be extracted statically (hook — see signature in source). Read `kui-react/libs/hooks/useA11yCheck.ts` and fill this section before implementation._

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

## Design Tokens

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Record as exception; use `eslint-plugin-react-native-a11y` instead.

- Location: `libs/hooks/useA11yCheck.ts`, named export `useA11yCheck` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `useA11yCheckProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `useA11yCheck` from the hooks barrel with its props type
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
