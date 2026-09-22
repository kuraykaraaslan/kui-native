# AppDrawer

> Backlog item · KuiReact id `app-drawer` · layer `app` · **Navigation** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Slide-in drawer shell used inside AppShell mobile mode. Exported, not in registry.

**Why it matters for KuiNative:** Exported by KuiReact app layer (not in registry). KuiNative has a same-named showcase-only AppDrawer — name collision without API parity.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/AppDrawer.tsx` (1 file, 139 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | Badge (exists as `Badge`), Button (exists as `Button`), Drawer (missing), SearchBar (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/AppDrawer.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `navGroups` | `AppSidebarNavGroup[]` | no | — |  | same |
| `navItems` | `AppSidebarNavItem[]` | no | — |  | same |
| `activeId` | `string` | no | — |  | same |
| `onSelect` | `(id: string) => void` | no | — |  | same |
| `header` | `React.ReactNode` | no | — |  | same |
| `footer` | `React.ReactNode` | no | — |  | same |
| `searchable` | `boolean` | no | `true` |  | same |
| `trigger` | `React.ReactNode` | no | — |  | same |
| `title` | `string` | no | `'Navigation'` |  | same |
| `side` | `'left' \| 'right'` | no | `'left'` |  | same |

## Variants

_No showcase variants recorded in the KuiReact registry._

**Enumerated props:**

- `side`: 'left' · 'right' (default 'left')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="none"` | `accessibilityRole="none"` |
| `aria-current` | `accessibilityState.selected` + label suffix |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Badge — exists as `Badge`
- Button — exists as `Button`
- Drawer — missing → [backlog](drawer.md)
- SearchBar — missing → [backlog](search-bar.md)

**Blocked by (roadmap):** `drawer`, `search-bar`, `R-badge`, `R-button`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `drawer`

## Implementation Notes

Promote `modules/showcase/ui/AppDrawer.tsx` to the library and align props with KuiReact AppDrawer.

- Location: `modules/app/AppDrawer.tsx`, named export `AppDrawer` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AppDrawerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AppDrawer` from the `modules/app` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `primary`, `primary-subtle`, `surface-overlay`, `text-disabled`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
