# ServerDataTable

> Backlog item · KuiReact id `server-data-table` · layer `ui` · **Tables** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Server-driven data table (deprecated shim → `<DataTable mode="server">`). Exported from the ui barrel but absent from the registry.

**Why it matters for KuiNative:** Server-driven table (exported, not in registry).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Table/index.tsx` (12 files, 1999 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | **no** (barrel export missing from KuiReact's registry) |
| Showcase variants | — |
| Composes | DataTable (missing), Pagination (missing), SearchBar (missing), Spinner (exists as `Spinner`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Table/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `columns` | `Column<T>[]` | **yes** | — |  | same |
| `rows` | `T[]` | **yes** | — |  | same |
| `getRowKey` | `(row: T) => string` | **yes** | — |  | same |
| `page` | `number` | **yes** | — |  | same |
| `totalPages` | `number` | **yes** | — |  | same |
| `total` | `number` | no | — |  | same |
| `pageSize` | `number` | no | — |  | same |
| `onPageChange` | `(page: number) => void` | **yes** | — |  | same |
| `onRowClick` | `(row: T) => void` | no | — |  | same |
| `loading` | `boolean` | no | — |  | same |
| `emptyMessage` | `string` | no | — |  | same |
| `title` | `string` | no | — |  | same |
| `subtitle` | `string` | no | — |  | same |
| `headerRight` | `ReactNode` | no | — |  | same |
| `toolbar` | `ReactNode` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `caption` | `string` | no | — |  | same |

## Variants

_No showcase variants recorded in the KuiReact registry._

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| loading | `loading` | shows progress; interaction blocked | `accessibilityState.busy`; Spinner/Skeleton; disable press |
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

**Blocked by (roadmap):** `data-table`, `pagination`, `search-bar`, `R-spinner`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `data-table`

## Implementation Notes

Build on DataTable; `onQueryChange` identical.

- Location: `modules/ui/ServerDataTable.tsx`, named export `ServerDataTable` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ServerDataTableProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ServerDataTable` from the `modules/ui` barrel with its props type
- [ ] All 17 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] State **loading** implemented: `accessibilityState.busy`; Spinner/Skeleton; disable press
- [ ] State **empty** implemented: EmptyState
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error-fg`, `error-subtle`, `primary`, `primary-fg`, `primary-hover`, `primary-subtle`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
