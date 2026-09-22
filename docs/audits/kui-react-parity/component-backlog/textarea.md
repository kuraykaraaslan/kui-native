# Textarea

> Backlog item · KuiReact id `textarea` · layer `ui` · **Forms** · Priority **Critical** · Complexity **Small** · Wave 1 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Label + textarea + hint + error anatomy. Vertical resizing is enabled via resize-y and the parts are linked through aria-describedby.

**Why it matters for KuiNative:** Multi-line text entry is a baseline form control; KuiReact has a dedicated component with label/hint/error/count.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Textarea.tsx` (1 file, 69 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Default, Error, Disabled, Character counter |
| Composes | — |
| Used by (registry) | form-builder, reviews-review-submit-form |
| Usage frequency | imported by 9 production file(s), 3 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, sr-only text, animated/transitions |

## Required Props

Parsed from `modules/ui/Textarea.tsx`. Uses `forwardRef` — KuiNative must forward a typed ref. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | **yes** | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | **yes** | — |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `required` | `boolean` | no | — |  | same |
| `rows` | `number` | no | `4` |  | → `numberOfLines` / min height |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.TextareaHTMLAttributes<HTMLTextAreaElement> (omitting id, rows)` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Default

```tsx
<Textarea id="message" label="Message" placeholder="Write your message…" hint="Max 500 characters." />
```

### Error

```tsx
<Textarea id="message" label="Message" error="Message is required." required />
```

### Disabled

```tsx
<Textarea id="message" label="Message" placeholder="Not editable" disabled />
```

### Character counter

```tsx
function Demo() {
  const MAX = 200;
  const [v, setV] = useState('');
  return (
    <div className="space-y-1">
      <Textarea id="bio" label="Bio" value={v} maxLength={MAX} rows={3}
        onChange={(e) => setV(e.target.value)} />
      <p className={`text-xs text-right ${MAX - v.length < 20 ? 'text-error' : 'text-text-secondary'}`}>
        {MAX - v.length} characters remaining
      </p>
    </div>
  );
}
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| required | `required` | asterisk + sr-only (required) | asterisk + "required" in accessibilityLabel |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `aria-describedby` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-invalid` | announce error; include in hint |

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
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `R-field-shell`

**Third-party:** none

## Implementation Notes

Reuse the Input field shell (label, hint, error, count) with `multiline` + `numberOfLines`/`minHeight` from `rows`; `textAlignVertical="top"` for Android.

- Location: `modules/ui/Textarea.tsx`, named export `Textarea` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TextareaProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Textarea` from the `modules/ui` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Default, Error, Disabled, Character counter)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **required** implemented: asterisk + "required" in accessibilityLabel
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `primary`, `secondary`, `surface-base`, `surface-sunken`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
