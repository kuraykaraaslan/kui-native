# DataTable

> Backlog item · KuiReact id `data-table` · layer `ui` · **Tables** · Priority **Low** · Complexity **Large** · Wave 3 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Unified table with `mode="static" | "paginated" | "server"`. Multi-column sort (Shift+click), global search, per-column filter (text + select), pagination, and unified loading/empty/error state.

**Why it matters for KuiNative:** Searchable/sortable table (800 LOC).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Table/DataTable.tsx` (1 file, 808 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Full example, Sortable columns, Server mode (mode="server") |
| Composes | Pagination (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 5 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Table/DataTable.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `columns` | `Column<T>[]` | **yes** | — |  | same |
| `rows` | `T[]` | no | — |  | same |
| `mode` | `DataTableMode` | no | — |  | same |
| `fetchPage` | `(args: DataTableFetchArgs) => Promise<DataTableFetchResult<T>>` | no | — |  | same |
| `caption` | `string` | no | — |  | same |
| `searchable` | `boolean` | no | — |  | same |
| `searchPlaceholder` | `string` | no | — |  | same |
| `pageSize` | `number` | no | — |  | same |
| `pageSizeOptions` | `number[]` | no | — |  | same |
| `emptyMessage` | `string` | no | — |  | same |
| `loadingMessage` | `string` | no | — |  | same |
| `errorMessage` | `string` | no | — |  | same |
| `state` | `DataTableStateValue` | no | — |  | same |
| `onRowClick` | `(row: T) => void` | no | — |  | same |
| `messages` | `Partial<DataTableMessages>` | no | — |  | same |
| `initialSort` | `SortState[]` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `id` | `string` | no | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `legacyAdvancedRows` | `AdvancedDataTableRow<T>[]` | no | — |  | same |
| `selectable` | `boolean` | no | — |  | same |
| `stickyHeader` | `boolean` | no | — |  | same |
| `onSelectionChange` | `(selected: number[]) => void` | no | — |  | same |
| `serverControlled` | `{ page: number; totalPages: number; total?: number; pageSize?: number; onPageCh…` | no | — |  | same |

## Variants

### Full example

```tsx
<DataTable
  caption="Users"
  searchPlaceholder="Search users…"
  pageSize={5}
  rows={users}
  columns={[
    { key: 'name',   header: 'Name' },
    { key: 'email',  header: 'Email' },
    { key: 'role',   header: 'Role' },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={...}>{r.status}</Badge> },
    { key: 'joined', header: 'Joined' },
  ]}
/>
```

### Sortable columns

```tsx
<DataTable
  rows={products}
  columns={[
    { key: 'name',  header: 'Product',  sortable: true },
    { key: 'price', header: 'Price',    sortable: true, align: 'right' },
  ]}
/>
```

### Server mode (mode="server")

```tsx
// Unified server-side data flow — the component owns sort/filter/pagination state
// and calls `fetchPage` whenever it changes.
<DataTable<User>
  mode="server"
  fetchPage={async ({ page, pageSize, sort, search, filters }) => {
    const res = await fetch(buildUrl({ page, pageSize, sort, search, filters }));
    const { rows, total } = await res.json();
    return { rows, total };
  }}
  pageSize={5}
  searchPlaceholder="Search users…"
  columns={[
    { key: 'name',  header: 'Name',  sortable: true },
    { key: 'email', header: 'Email', sortable: true, filter: { kind: 'text' } },
// …
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
| `role="grid"` | `accessibilityRole="grid"` |
| `role="region"` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
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
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Pagination — missing → [backlog](pagination.md)

**Blocked by (roadmap):** `pagination`, `table`, `search-bar`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `table`, `search-bar`

## Implementation Notes

Build on Table; sort headers as Pressables with `accessibilityValue` for sort direction.

- Location: `modules/ui/DataTable.tsx`, named export `DataTable` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DataTableProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `DataTable` from the `modules/ui` barrel with its props type
- [ ] All 23 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Full example, Sortable columns, Server mode (mode="server"))
- [ ] State **empty** implemented: EmptyState
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `secondary`, `surface-base`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
