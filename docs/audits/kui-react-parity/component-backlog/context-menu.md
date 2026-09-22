# ContextMenu

> Backlog item · KuiReact id `context-menu` · layer `app` · **Overlay** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Right-click context menu. Wraps any element as a trigger. Supports item groups, keyboard shortcuts, separators, danger items, and disabled items. Positions itself via viewport-aware boundary detection, auto-flips when near screen edges. Full keyboard navigation: ↑↓ arrows, Enter, Escape.

**Why it matters for KuiNative:** Right-click menu; on native maps to long-press.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/ContextMenu.tsx` (1 file, 288 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Text editor — clipboard + format actions, File manager — groups + shortcut hint, Code branch — some items disabled |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | keyboard handling, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/ContextMenu.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `items` | `ContextMenuItem[]` | **yes** | — |  | same |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `disabled` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `onOpenChange` | `(open: boolean) => void` | no | — |  | same |

## Variants

### Text editor — clipboard + format actions

```tsx
<ContextMenu items={[
  { label: 'Cut',      icon: <Icon />, shortcut: '⌘X' },
  { label: 'Copy',     icon: <Icon />, shortcut: '⌘C' },
  { label: 'Paste',    icon: <Icon />, shortcut: '⌘V' },
  { type: 'separator' },
  { label: 'Copy link',icon: <Icon />, shortcut: '⌘⇧C' },
  { type: 'separator' },
  { label: 'Rename',   icon: <Icon /> },
  { label: 'Delete',   icon: <Icon />, danger: true, shortcut: '⌫' },
]}>
  <div>Right-click anywhere in this area</div>
</ContextMenu>
```

### File manager — groups + shortcut hint

```tsx
<ContextMenu items={[
  { type: 'group', label: 'Actions' },
  { label: 'Open',     icon: <Icon /> },
  { label: 'Download', icon: <Icon />, shortcut: '⌘D' },
  { label: 'Share',    icon: <Icon />, shortcut: '⌘⇧S' },
  { type: 'separator' },
  { type: 'group', label: 'Organise' },
  { label: 'Move to…', icon: <Icon /> },
  { label: 'Add tag',  icon: <Icon /> },
  { type: 'separator' },
  { label: 'Delete', icon: <Icon />, danger: true },
]}>
  <FileCard name="Report Q1.pdf" />
</ContextMenu>
```

### Code branch — some items disabled

```tsx
<ContextMenu items={[
  { label: 'View diff',        icon: <Icon /> },
  { label: 'Copy branch name', icon: <Icon />, shortcut: '⌘C' },
  { type: 'separator' },
  { label: 'Merge into main',  icon: <Icon />, disabled: true },
  { label: 'Cherry-pick',                      disabled: true },
  { type: 'separator' },
  { label: 'Delete branch',    icon: <Icon />, danger: true },
]}>
  <BranchRow name="feature/context-menu" />
</ContextMenu>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="menu"` | `accessibilityRole="menu"` |
| `role="menuitem"` | `accessibilityRole="menuitem"` |
| `role="presentation"` | `accessibilityRole="none"` |
| `role="separator"` | review manually |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-labelledby` | `accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label |
| `aria-orientation` | n/a |

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
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `dropdown-menu`, `R-overlay-core`

**Third-party:** none

**Suggested RN libraries:** `dropdown-menu`

## Implementation Notes

Long-press trigger opening DropdownMenu content; consider `react-native-ios-context-menu`/`zeego` for native menus.

- Location: `modules/app/ContextMenu.tsx`, named export `ContextMenu` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ContextMenuProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ContextMenu` from the `modules/app` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Text editor — clipboard + format actions, File manager — groups + shortcut hint, Code branch — some items disabled)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error`, `error-subtle`, `surface-overlay`, `surface-raised`, `text-disabled`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
