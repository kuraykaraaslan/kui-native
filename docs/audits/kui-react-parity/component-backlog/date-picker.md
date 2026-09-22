# DatePicker

> Backlog item · KuiReact id `date-picker` · layer `ui` · **Forms** · Priority **High** · Complexity **Large** · Wave 2 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Popover-based date picker with a locale-aware calendar grid (TR / EN), quick month / year jump from the header, min / max / disabledDates support, and full keyboard navigation (Arrow / PageUp/Down / Shift+Page / Home / End / Enter / Esc). Pixel-identical EJS sibling at modules/ui/DatePicker/DatePicker.ejs.

**Why it matters for KuiNative:** Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/DatePicker/index.tsx` (11 files, 1421 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Default, With value, Error / Disabled, Locale: Türkçe + custom messages |
| Composes | Calendar (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/DatePicker/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | no | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | no | — |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `required` | `boolean` | no | — |  | same |
| `min` | `Date` | no | — |  | same |
| `max` | `Date` | no | — |  | same |
| `disabledDates` | `DisabledDates` | no | — |  | same |
| `locale` | `LocaleCode` | no | — |  | same |
| `format` | `string` | no | — |  | same |
| `messages` | `Partial<DatePickerMessages>` | no | — |  | same |
| `variant` | `'popover'` | no | `'popover'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `name` | `string` | no | — |  | same |
| `value` | `DateValue` | **yes** | — |  | same |
| `onChange` | `(d: Date \| null) => void` | **yes** | — |  | same |

## Variants

### Default

```tsx
const [date, setDate] = useState<Date | null>(null);
<DatePicker id="date" label="Appointment date" hint="Select a future date." value={date} onChange={setDate} />
```

### With value

```tsx
<DatePicker id="start" label="Start date" value={new Date('2026-06-15')} onChange={setDate} />
```

### Error / Disabled

```tsx
<DatePicker id="due" label="Due date" error="Please select a date." required />
<DatePicker id="locked" label="Locked date" value={date} disabled />
```

### Locale: Türkçe + custom messages

```tsx
<DatePicker
  locale="tr"
  value={date}
  onChange={setDate}
  messages={{ today: 'Bugün seç', clear: 'Temizle' }}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| required | `required` | asterisk + sr-only (required) | asterisk + "required" in accessibilityLabel |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="columnheader"` | `accessibilityRole="header"` |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `role="grid"` | `accessibilityRole="grid"` |
| `role="gridcell"` | review manually |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="option"` | review manually |
| `role="row"` | review manually |
| `aria-controls` | n/a on native |
| `aria-describedby` | `accessibilityHint` |
| `aria-disabled` | `accessibilityState.disabled` |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-invalid` | announce error; include in hint |
| `aria-label` | `accessibilityLabel` |
| `aria-labelledby` | `accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |
| `aria-modal` | `accessibilityViewIsModal` |
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

- Calendar — missing → [backlog](calendar.md)

**Blocked by (roadmap):** `calendar`, `R-overlay-core`, `R-field-shell`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `@react-native-community/datetimepicker`

## Implementation Notes

Prefer `@react-native-community/datetimepicker` for native pickers, or port the KuiReact calendar grid into a sheet for identical look. Keep `value/onChange/min/max` names.

- Location: `modules/ui/DatePicker.tsx`, named export `DatePicker` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DatePickerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `DatePicker` from the `modules/ui` barrel with its props type
- [ ] All 17 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Default, With value, Error / Disabled, Locale: Türkçe + custom messages)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **required** implemented: asterisk + "required" in accessibilityLabel
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `primary`, `primary-fg`, `primary-hover`, `primary-subtle`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
