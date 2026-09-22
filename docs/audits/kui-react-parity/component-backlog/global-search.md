# GlobalSearch

> Backlog item · KuiReact id `global-search` · layer `app` · **Navigation** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Command-palette-style global search field. Supports a categorised result list, keyboard navigation and result selection.

**Why it matters for KuiNative:** Global search with previews.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/GlobalSearch.tsx` (1 file, 145 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | Interactive results, Loading state |
| Composes | SearchBar (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 2 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | keyboard handling, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/GlobalSearch.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `placeholder` | `string` | no | `'Search…'` |  | same |
| `results` | `SearchResult[]` | no | `[]` |  | same |
| `onSearch` | `(query: string) => void` | **yes** | — |  | same |
| `onSelect` | `(result: SearchResult) => void` | **yes** | — |  | same |
| `loading` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Interactive results

```tsx
<GlobalSearch
  placeholder="Search pages and actions…"
  results={results}
  onSearch={handleSearch}
  onSelect={(result) => setSelected(result.label)}
/>
```

### Loading state

```tsx
<GlobalSearch loading results={results} onSearch={handleSearch} onSelect={handleSelect} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| loading | `loading` | shows progress; interaction blocked | `accessibilityState.busy`; Spinner/Skeleton; disable press |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="combobox"` | `accessibilityRole="combobox"` |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="option"` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-selected` | `accessibilityState.selected` |

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
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- SearchBar — missing → [backlog](search-bar.md)

**Blocked by (roadmap):** `search-bar`

**Third-party:** none

**Suggested RN libraries:** `search-bar`

## Implementation Notes

Full-screen search screen (modal route) using SearchBar + sectioned FlatList.

- Location: `modules/app/GlobalSearch.tsx`, named export `GlobalSearch` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `GlobalSearchProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `GlobalSearch` from the `modules/app` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Interactive results, Loading state)
- [ ] State **loading** implemented: `accessibilityState.busy`; Spinner/Skeleton; disable press
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `primary`, `primary-subtle`, `surface-overlay`, `surface-raised`, `text-disabled`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
