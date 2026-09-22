# RadioGroup

> Backlog item · KuiReact id `radio-group` · layer `ui` · **Forms** · Priority **Critical** · Complexity **Small** · Wave 1 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

fieldset + legend based radio group. WCAG-compliant keyboard navigation with an optional card-style variant.

**Why it matters for KuiNative:** Mutually-exclusive choice control; core form primitive.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/RadioGroup.tsx` (1 file, 121 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Default, Disabled, Card style |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/RadioGroup.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `name` | `string` | **yes** | — |  | same |
| `legend` | `string` | **yes** | — |  | same |
| `options` | `RadioOption[]` | **yes** | — |  | same |
| `value` | `string` | no | — |  | same |
| `onChange` | `(value: string) => void` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `optionClassName` | `string` | no | — |  | same |
| `variant` | `RadioGroupVariant` | no | `'default'` |  | same |
| `columns` | `RadioGroupColumns` | no | `1` |  | same |

## Variants

### Default

```tsx
<RadioGroup
  name="notify"
  legend="Notification preference"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'none', label: 'None' },
  ]}
/>
```

### Disabled

```tsx
<RadioGroup name="notify" legend="Notification preference" options={[...]} value="email" disabled />
```

### Card style

```tsx
function Demo() {
  const [v, setV] = useState('pro');
  const plans = [
    { value: 'free', label: 'Free',  hint: '$0/mo · 3 projects' },
    { value: 'pro',  label: 'Pro',   hint: '$12/mo · Unlimited' },
    { value: 'team', label: 'Team',  hint: '$49/mo · 10 seats'  },
  ];
  return (
    <fieldset className="space-y-2">
      <legend>Choose plan</legend>
      {plans.map(plan => (
        <label key={plan.value} className={cn(
          'flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer',
          v === plan.value ? 'border-primary bg-primary-subtle' : 'border-border hover:bg-surface-overlay'
// …
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
| `error` | #ef4444 | #f87171 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `R-field-shell`

**Third-party:** none

## Implementation Notes

Row of `Pressable`s with `accessibilityRole="radio"`, `accessibilityState.checked`; container `accessibilityRole="radiogroup"`. Same `options/value/onChange/orientation` API.

- Location: `modules/ui/RadioGroup.tsx`, named export `RadioGroup` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `RadioGroupProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `RadioGroup` from the `modules/ui` barrel with its props type
- [ ] All 11 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Default, Disabled, Card style)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `primary`, `secondary`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
