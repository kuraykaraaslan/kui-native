# NotificationProvider

> Backlog item · KuiReact id `notification-system` · layer `app` · **Providers** · Priority **High** · Complexity **Small** · Wave 1 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

App-level notification provider + `notify` / `toast` API. Exported, not in registry.

**Why it matters for KuiNative:** KuiReact `NotificationProvider` + `notify()`/`toast()` app-level API (exported, not in registry).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/NotificationSystem.tsx` (1 file, 40 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/NotificationSystem.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `position` | `ToastPosition` | no | `'top-right'` |  | same |

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

**Blocked by (roadmap):** `toast`

**Third-party:** none

**Suggested RN libraries:** `toast`

## Implementation Notes

Port on top of the Toast store so `notify()` works identically.

- Location: `modules/app/NotificationProvider.tsx`, named export `NotificationProvider` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `NotificationProviderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `NotificationProvider` from the `modules/app` barrel with its props type
- [ ] All 2 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
