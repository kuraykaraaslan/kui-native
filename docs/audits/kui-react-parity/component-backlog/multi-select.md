# MultiSelect

> Backlog item · KuiReact id `multi-select` · layer `ui` · **Forms** · Priority **High** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Chip-based multi-select popover with searchable filter, keyboard navigation, and disabled-option support.

**Why it matters for KuiNative:** Multi-value selection used by filters and forms.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/MultiSelect.tsx` (1 file, 284 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Controlled, With error, With countries, Searchable |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/MultiSelect.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | **yes** | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | **yes** | — |  | same |
| `options` | `MultiSelectOption[]` | **yes** | — |  | same |
| `value` | `string[]` | no | — |  | same |
| `onChange` | `(values: string[]) => void` | no | — |  | same |
| `placeholder` | `string` | no | `'Select…'` |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `searchable` | `boolean` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `onSearch` | `(q: string, signal?: AbortSignal) => MultiSelectOption[] \| Promise<MultiSelectO…` | no | — |  | same |
| `onLoadMore` | `() => Promise<MultiSelectOption[]>` | no | — |  | same |
| `debounceMs` | `number` | no | `300` |  | same |

## Variants

### Controlled

```tsx
function Demo() {
  const [v, setV] = useState([]);
  return (
    <MultiSelect id="ms" label="Frameworks"
      options={[{ value: 'react', label: 'React' }, ...]}
      value={v} onChange={setV}
    />
  );
}
```

### With error

```tsx
<MultiSelect id="ms" label="Tags" options={[...]} error="Please select at least one tag." />
```

### With countries

```tsx
import { countries, getEmojiFlag } from 'countries-list';

const COUNTRY_OPTIONS = Object.entries(countries)
  .map(([code, data]) => ({ value: code, label: `${getEmojiFlag(code)} ${data.name}` }))
  .sort((a, b) => a.label.localeCompare(b.label));

function Demo() {
  const [v, setV] = useState([]);
  return (
    <MultiSelect id="ms-countries" label="Countries"
      options={COUNTRY_OPTIONS} placeholder="Select countries…"
      value={v} onChange={setV} hint="Select one or more countries." />
  );
}
```

### Searchable

```tsx
<MultiSelect id="countries" label="Countries" searchable
  options={COUNTRY_OPTIONS} placeholder="Search and select…"
  value={v} onChange={setV} hint="Type to filter the list." />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="combobox"` | `accessibilityRole="combobox"` |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="option"` | review manually |
| `aria-autocomplete` | n/a |
| `aria-controls` | n/a on native |
| `aria-describedby` | `accessibilityHint` |
| `aria-disabled` | `accessibilityState.disabled` |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-labelledby` | `accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |
| `aria-multiselectable` | per-item `selected` |
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
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
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

- none

**Blocked by (roadmap):** `R-overlay-core`, `R-field-shell`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `bottom sheet`

## Implementation Notes

Same sheet as Select with checkbox rows and searchable header; selected values summarised as chips in the trigger.

- Location: `modules/ui/MultiSelect.tsx`, named export `MultiSelect` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `MultiSelectProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `MultiSelect` from the `modules/ui` barrel with its props type
- [ ] All 14 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Controlled, With error, With countries, Searchable)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `primary`, `primary-fg`, `primary-subtle`, `surface-base`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
