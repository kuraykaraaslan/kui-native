# Select

> Backlog item · KuiReact id `select` · layer `ui` · **Forms** · Priority **Critical** · Complexity **Medium** · Wave 1 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Label + select + hint + error anatomy. appearance-none overrides the native dropdown style and renders a chevron icon.

**Why it matters for KuiNative:** Single-select is the most common form control after Input; forms cannot be built without it.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Select.tsx` (1 file, 226 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Controlled, With icons, Validation states, With countries, Searchable |
| Composes | — |
| Used by (registry) | form-builder |
| Usage frequency | imported by 5 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | `modules/ui/Select.test.tsx` (10 cases) |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Select.tsx`. Uses `forwardRef` — KuiNative must forward a typed ref. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | **yes** | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | **yes** | — |  | same |
| `options` | `SelectOption[]` | **yes** | — |  | same |
| `placeholder` | `string` | no | — |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `required` | `boolean` | no | — |  | same |
| `searchable` | `boolean` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.SelectHTMLAttributes<HTMLSelectElement> (omitting id)` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Controlled

```tsx
const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const [role, setRole] = useState('editor');
<Select id="role" label="Role" options={ROLES} value={role}
  onChange={(e) => setRole(e.target.value)} />
```

### With icons

```tsx
const STATUSES = [
  { value: 'active',   label: 'Active',   icon: <span className="text-success">●</span> },
  { value: 'inactive', label: 'Inactive', icon: <span className="text-text-disabled">●</span> },
  { value: 'pending',  label: 'Pending',  icon: <span className="text-warning">●</span> },
];

<Select id="status" label="Status" options={STATUSES} value={status} onChange={setStatus} />
```

### Validation states

```tsx
<Select id="plan" label="Plan" placeholder="Select a plan" required
  error="Please select a plan." options={[...]} />

<Select id="plan" label="Plan" disabled options={[...]} value="pro" />
```

### With countries

```tsx
import { countries, getEmojiFlag } from 'countries-list';

const COUNTRY_OPTIONS = Object.entries(countries)
  .map(([code, data]) => ({ value: code, label: `${getEmojiFlag(code)} ${data.name}` }))
  .sort((a, b) => a.label.localeCompare(b.label));

<Select id="country" label="Country" placeholder="Select a country…"
  options={COUNTRY_OPTIONS} hint="Powered by countries-list." />
```

### Searchable

```tsx
<Select id="country" label="Country" placeholder="Select a country…" searchable
  options={COUNTRY_OPTIONS} value={val} onChange={(e) => setVal(e.target.value)}
  hint="Type to filter the list." />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| required | `required` | asterisk + sr-only (required) | asterisk + "required" in accessibilityLabel |
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
| `aria-describedby` | `accessibilityHint` |
| `aria-disabled` | `accessibilityState.disabled` |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-invalid` | announce error; include in hint |
| `aria-labelledby` | `accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label |
| `aria-required` | label suffix "required" |
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
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `R-overlay-core`, `R-field-shell`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `@gorhom/bottom-sheet (or in-house Sheet)`

## Implementation Notes

Trigger styled like Input; options in a bottom sheet (or `ActionSheetIOS` on iOS) rendered with `FlatList`. Keep `options`/`value`/`onChange`/`label`/`error` names. `accessibilityRole="combobox"` (or `button`) + `accessibilityState.expanded`.

- Location: `modules/ui/Select.tsx`, named export `Select` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SelectProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Select` from the `modules/ui` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 5 KuiReact variants (Controlled, With icons, Validation states, With countries, Searchable)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **required** implemented: asterisk + "required" in accessibilityLabel
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `primary`, `secondary`, `surface-base`, `surface-sunken`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] renders a real <select> with a label and every option
  - [ ] a placeholder renders as an empty-value option
  - [ ] error sets aria-invalid and renders role="alert" wired via aria-describedby
  - [ ] fires onChange when a different option is picked
  - [ ] disabled prevents interaction
  - [ ] renders a closed combobox showing the placeholder when nothing is selected
  - [ ] opens the listbox on click and shows every option
  - [ ] selecting an option calls onChange and closes the listbox
  - [ ] Escape closes the open listbox
  - [ ] searchable filters the option list as you type
- [ ] Prop table + usage snippet documented in the showcase entry
