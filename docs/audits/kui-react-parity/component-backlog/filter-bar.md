# FilterBar

> Backlog item · KuiReact id `filter-bar` · layer `app` · **Forms** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Select, multiselect, daterange and text-based filter panel. Supports URL-based filtering via GET form submit.

**Why it matters for KuiNative:** Multi-field filter UI.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/FilterBar.tsx` (1 file, 110 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Full filter set, Compact filters |
| Composes | Button (exists as `Button`), DateRangePicker (missing), MultiSelect (missing), Select (missing), TagInput (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/FilterBar.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `fields` | `FilterField[]` | **yes** | — |  | same |
| `values` | `FilterValues` | **yes** | — |  | same |
| `onChange` | `(id: string, value: FilterValues[string]) => void` | **yes** | — |  | same |
| `onApply` | `() => void` | no | — |  | same |
| `onReset` | `() => void` | no | — |  | same |
| `applyLabel` | `string` | no | `'Apply'` |  | same |
| `resetLabel` | `string` | no | `'Reset'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Full filter set

```tsx
<FilterBar fields={fields} values={values} onChange={handleChange} onApply={handleApply} onReset={handleReset} />
```

### Compact filters

```tsx
<FilterBar fields={fields.slice(0, 2)} values={values} onChange={handleChange} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- DateRangePicker — missing → [backlog](date-range-picker.md)
- MultiSelect — missing → [backlog](multi-select.md)
- Select — missing → [backlog](select.md)
- TagInput — missing → [backlog](tag-input.md)

**Blocked by (roadmap):** `date-range-picker`, `multi-select`, `select`, `tag-input`, `R-button`, `date-picker`

**Third-party:** none

**Suggested RN libraries:** `select`, `date-picker`, `checkbox`

## Implementation Notes

Horizontal chip row + filter sheet.

- Location: `modules/app/FilterBar.tsx`, named export `FilterBar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `FilterBarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `FilterBar` from the `modules/app` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Full filter set, Compact filters)
- [ ] Uses only semantic tokens (`border`, `surface-raised`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
