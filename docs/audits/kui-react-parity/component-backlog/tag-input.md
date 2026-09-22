# TagInput

> Backlog item · KuiReact id `tag-input` · layer `ui` · **Forms** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `direct` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Free-text input that creates chips. Add tags with Enter or comma, double-click to edit, Backspace to delete. Duplicates are ignored.

**Why it matters for KuiNative:** Chip entry with suggestions; composes Badge(dismissible).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/TagInput.tsx` (1 file, 150 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Default, Empty / Error |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 3 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/TagInput.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | **yes** | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | **yes** | — |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `value` | `string[]` | **yes** | — |  | same |
| `onChange` | `(tags: string[]) => void` | **yes** | — |  | same |
| `placeholder` | `string` | no | `'Type and press Enter or comm…` |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
const [tags, setTags] = useState(['next.js', 'react']);
<TagInput id="tags" label="Tags" value={tags} onChange={setTags} hint="Press Enter or comma to add." />
```

### Empty / Error

```tsx
<TagInput id="tags" label="Required tags" value={[]} onChange={setTags} error="At least one tag is required." />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `aria-describedby` | `accessibilityHint` |
| `aria-label` | `accessibilityLabel` |

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
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `R-field-shell`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Wrap chips (dismissible Badge) + inline `TextInput`; commit on `onSubmitEditing` or comma. Suggestions in an anchored list or sheet.

- Location: `modules/ui/TagInput.tsx`, named export `TagInput` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TagInputProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `TagInput` from the `modules/ui` barrel with its props type
- [ ] All 9 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Default, Empty / Error)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `primary`, `primary-subtle`, `surface-base`, `surface-sunken`, `text-disabled`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
