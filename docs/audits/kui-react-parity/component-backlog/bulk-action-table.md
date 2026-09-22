# BulkActionTable

> Backlog item · KuiReact id `bulk-action-table` · layer `ui` · **Tables** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Table with **id-keyed** row selection and a bulk-action bar. `DataTable`’s own `selectable` prop keys selection by array index and only works in the deprecated legacy view, so selections there follow the wrong rows once anything sorts or paginates.

**Why it matters for KuiNative:** Selection + bulk actions.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/BulkActionTable.tsx` (1 file, 236 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-08 |
| Showcase variants | Selection and actions, Unselectable rows, and select-all-matching |
| Composes | Table (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, reduced-motion aware, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/BulkActionTable.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `columns` | `Column<T>[]` | **yes** | — |  | same |
| `rows` | `T[]` | **yes** | — |  | same |
| `rowId` | `(row: T) => Id` | **yes** | — |  | same |
| `selected` | `readonly Id[]` | **yes** | — |  | same |
| `onSelectedChange` | `(ids: Id[]) => void` | **yes** | — |  | same |
| `actions` | `BulkAction<Id>[]` | no | `[]` |  | same |
| `totalMatching` | `number` | no | — |  | same |
| `onSelectAllMatching` | `() => void` | no | — |  | same |
| `isRowSelectable` | `(row: T) => string \| true` | no | — |  | same |
| `caption` | `string` | no | — |  | same |
| `emptyMessage` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `labels` | `Partial<typeof DEFAULT_LABELS>` | no | — |  | same |

## Variants

### Selection and actions

```tsx
<BulkActionTable
  rows={companies}
  rowId={(c) => c.companyId}
  selected={selected}
  onSelectedChange={setSelected}
  columns={columns}
  actions={[{ key: 'enrich', label: 'Enrich', onAction: enrich }]}
/>
```

### Unselectable rows, and select-all-matching

```tsx
<BulkActionTable
  isRowSelectable={(c) => (c.suppressed ? 'Suppressed' : true)}
  totalMatching={total}
  onSelectAllMatching={selectEverything}
  …
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `selected` | highlighted | `accessibilityState.selected` |
| empty | `emptyMessage` | empty placeholder | EmptyState |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="region"` | review manually |
| `aria-label` | `accessibilityLabel` |

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
| `border-strong` | #d1d5db | #475569 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-hover` | #2563eb | #93c5fd | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Table — missing → [backlog](table.md)

**Blocked by (roadmap):** `table`

**Third-party:** none

**Suggested RN libraries:** `table`, `checkbox`

## Implementation Notes

Build on Table + selection bar.

- Location: `modules/ui/BulkActionTable.tsx`, named export `BulkActionTable` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `BulkActionTableProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `BulkActionTable` from the `modules/ui` barrel with its props type
- [ ] All 13 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Selection and actions, Unselectable rows, and select-all-matching)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **empty** implemented: EmptyState
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `border-strong`, `error`, `primary`, `primary-fg`, `primary-hover`, `surface-overlay`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
