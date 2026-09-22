# DropdownMenu

> Backlog item · KuiReact id `dropdown-menu` · layer `ui` · **Overlay** · Priority **High** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Accessible dropdown using role="menu" + role="menuitem". Closes on Escape and outside click. Supports left/right alignment, icons, separators, danger and disabled items, and arrow-key navigation.

**Why it matters for KuiNative:** Action menus (items/danger/disabled/separator) are needed for list rows and headers.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/DropdownMenu.tsx` (1 file, 113 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Default, Right-aligned |
| Composes | useFocusTrap (excluded) |
| Used by (registry) | — |
| Usage frequency | imported by 7 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | `modules/ui/DropdownMenu.test.tsx` (11 cases) |
| Interaction flags | keyboard handling, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/DropdownMenu.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `trigger` | `React.ReactNode` | **yes** | — |  | same |
| `items` | `DropdownItem[]` | **yes** | — |  | same |
| `header` | `React.ReactNode` | no | — |  | same |
| `align` | `'left' \| 'right'` | no | `'left'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
<DropdownMenu
  trigger={<Button variant="outline" size="sm">Actions ▾</Button>}
  items={[
    { label: 'Edit', icon: '✏' },
    { label: 'Duplicate', icon: '⧉' },
    { type: 'separator' },
    { label: 'Delete', icon: '🗑', danger: true },
  ]}
/>
```

### Right-aligned

```tsx
<DropdownMenu align="right"
  trigger={<Button variant="ghost" size="sm">⋮</Button>}
  items={[{ label: 'View details' }, { label: 'Remove', danger: true }]}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `align`: 'left' · 'right' (default 'left')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="menu"` | `accessibilityRole="menu"` |
| `role="menuitem"` | `accessibilityRole="menuitem"` |
| `role="separator"` | review manually |
| `aria-allowed` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- useFocusTrap — excluded

**Blocked by (roadmap):** `R-overlay-core`, `popover`

**Third-party:** none

**Suggested RN libraries:** `popover`, `drawer`

## Implementation Notes

Popover-anchored menu on tablets; bottom-sheet action list on phones. Items: `accessibilityRole="menuitem"`, container `menu`.

- Location: `modules/ui/DropdownMenu.tsx`, named export `DropdownMenu` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DropdownMenuProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `DropdownMenu` from the `modules/ui` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Default, Right-aligned)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error`, `error-subtle`, `primary`, `surface-overlay`, `surface-raised`, `text-primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] is closed by default (menu not in the document)
  - [ ] opens the menu on trigger click, with every item and the separator
  - [ ] clicking an item calls its onClick and closes the menu
  - [ ] a disabled item is not clickable and does not fire onClick
  - [ ] Escape closes the open menu
  - [ ] clicking outside the menu closes it
  - [ ] renders an optional header above the items
  - [ ] align="right" applies the right-aligned class
  - [ ] moves focus into the menu (first item) on open
  - [ ] returns focus to the trigger when closed via Escape
  - [ ] Tab from the last focusable item (disabled items are skipped) wraps to the first
- [ ] Prop table + usage snippet documented in the showcase entry
