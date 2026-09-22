# FocusTrap

> Backlog item · KuiReact id `accessibility-kit` · layer `app` · **Providers** · Priority **High** · Complexity **Small** · Wave 1 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Accessibility kit: FocusTrap, Announcer, AnnouncerOutlet, LiveRegion, SkipLink, Tooltip, useAnnounce. Exported, not in registry.

**Why it matters for KuiNative:** Announcer, AnnouncerOutlet, FocusTrap, LiveRegion, useAnnounce (exported, not in registry).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/AccessibilityKit.tsx` (1 file, 100 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | useFocusTrap (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `react-dom` |
| Unit tests | none |
| Interaction flags | keyboard handling, sr-only text, portal |

## Required Props

Parsed from `modules/app/AccessibilityKit.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `active` | `boolean` | no | `true` |  | same |
| `onEscape` | `() => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |

## Variants

_No showcase variants recorded in the KuiReact registry._

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `active` | highlighted | `accessibilityState.selected` |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="status"` | `accessibilityRole="summary"` |
| `aria-atomic` | announce full message |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |

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

- useFocusTrap — missing → [backlog](use-focus-trap.md)

**Blocked by (roadmap):** `R-overlay-core`

**Third-party:** `react-dom` → root overlay host / RN Modal

## Implementation Notes

`useAnnounce` → `AccessibilityInfo.announceForAccessibility`; `LiveRegion` → `accessibilityLiveRegion`; FocusTrap → `accessibilityViewIsModal` + `AccessibilityInfo.setAccessibilityFocus`.

- Location: `modules/app/FocusTrap.tsx`, named export `FocusTrap` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `FocusTrapProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `FocusTrap` from the `modules/app` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
