# MentionPicker

> Backlog item · KuiReact id `mention-picker` · layer `app` · **Forms** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

@-trigger autocomplete picker. Headless: takes users + query + position, fires onSelect. Keyboard nav (ArrowUp/Down, Enter/Tab, Escape).

**Why it matters for KuiNative:** @mention suggestions.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/MentionPicker.tsx` (1 file, 162 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Filtered list, Empty results |
| Composes | Avatar (exists as `Avatar` + `AvatarGroup`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/MentionPicker.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `users` | `MentionPickerUser[]` | **yes** | — |  | same |
| `query` | `string` | no | `''` |  | same |
| `open` | `boolean` | no | `true` |  | same |
| `position` | `{ top: number; left: number }` | no | — |  | same |
| `maxItems` | `number` | no | `6` |  | same |
| `emptyMessage` | `string` | no | `'No matching users'` |  | same |
| `onSelect` | `(user: MentionPickerUser) => void` | **yes** | — |  | same |
| `onCancel` | `() => void` | no | — |  | same |
| `filter` | `(user: MentionPickerUser, query: string) => boolean` | no | `defaultFilter` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Filtered list

```tsx
<MentionPicker users={users} query="ay" onSelect={(u) => {}} onCancel={() => {}} />
```

### Empty results

```tsx
<MentionPicker users={users} query="zzz" onSelect={(u) => {}} onCancel={() => {}} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| open / expanded | `open` | visible/expanded | `accessibilityState.expanded` / modal visibility |
| empty | `emptyMessage` | empty placeholder | EmptyState |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="option"` | review manually |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-selected` | `accessibilityState.selected` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |

Use NativeWind classes (`bg-surface-raised`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Avatar — exists as `Avatar` + `AvatarGroup`

**Blocked by (roadmap):** `R-avatar`, `popover`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `popover`

## Implementation Notes

Anchored suggestion list above keyboard.

- Location: `modules/app/MentionPicker.tsx`, named export `MentionPicker` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `MentionPickerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `MentionPicker` from the `modules/app` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Filtered list, Empty results)
- [ ] State **open / expanded** implemented: `accessibilityState.expanded` / modal visibility
- [ ] State **empty** implemented: EmptyState
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-raised`, `surface-overlay`, `border`, `text-primary`, `text-secondary`, `text-disabled`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
