# AdvancedDataTable

> Backlog item · KuiReact id `advanced-data-table` · layer `ui` · **Tables** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Enhanced table with row selection (with indeterminate header), expandable rows, and optional sticky header.

**Why it matters for KuiNative:** Selectable table with row actions (2k LOC).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Table/index.tsx` (12 files, 1999 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `beta` · since 2025-03 |
| Showcase variants | Selectable + Expandable, Sticky Header |
| Composes | DataTable (missing), Pagination (missing), SearchBar (missing), Spinner (exists as `Spinner`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Table/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `columns` | `Column<T>[]` | **yes** | — |  | same |
| `rows` | `AdvancedDataTableRow<T>[]` | **yes** | — |  | same |
| `caption` | `string` | no | — |  | same |
| `selectable` | `boolean` | no | — |  | same |
| `stickyHeader` | `boolean` | no | — |  | same |
| `emptyMessage` | `string` | no | — |  | same |
| `onSelectionChange` | `(selected: number[]) => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Selectable + Expandable

```tsx
<AdvancedDataTable
  columns={[{ key: 'name', header: 'Name' }, ...]}
  rows={rows}
  selectable
/>
```

### Sticky Header

```tsx
<AdvancedDataTable columns={columns} rows={rows} stickyHeader />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| empty | `emptyMessage` | empty placeholder | EmptyState |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `role="grid"` | `accessibilityRole="grid"` |
| `role="region"` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-sort` | `accessibilityValue.text` |

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
| `error-fg` | #7f1d1d | #fee2e2 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-hover` | #2563eb | #93c5fd | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- DataTable — missing → [backlog](data-table.md)
- Pagination — missing → [backlog](pagination.md)
- SearchBar — missing → [backlog](search-bar.md)
- Spinner — exists as `Spinner`

**Blocked by (roadmap):** `data-table`, `pagination`, `search-bar`, `R-spinner`, `dropdown-menu`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `data-table`, `checkbox`, `dropdown-menu`

## Implementation Notes

Build on DataTable; selection via Checkbox column; actions via DropdownMenu.

- Location: `modules/ui/AdvancedDataTable.tsx`, named export `AdvancedDataTable` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AdvancedDataTableProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AdvancedDataTable` from the `modules/ui` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Selectable + Expandable, Sticky Header)
- [ ] State **empty** implemented: EmptyState
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error-fg`, `error-subtle`, `primary`, `primary-fg`, `primary-hover`, `primary-subtle`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
