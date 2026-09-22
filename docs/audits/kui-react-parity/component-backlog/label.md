# Label

> Backlog item · KuiReact id `label` · layer `ui` · **Typography** · Priority **Critical** · Complexity **Small** · Wave 1 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Standalone form label with an optional required indicator and disabled state, for pairing with custom controls that do not manage their own label.

**Why it matters for KuiNative:** Every KuiReact form control renders its label with the same required-marker + disabled treatment; KuiNative duplicates ad-hoc label Text in TextInput/Checkbox/Switch.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Label.tsx` (1 file, 31 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-09 |
| Showcase variants | Basic + required, Paired with a custom control |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | sr-only text |

## Required Props

Parsed from `modules/ui/Label.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `required` | `boolean` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |

**Also accepts:** `React.LabelHTMLAttributes<HTMLLabelElement>` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Basic + required

```tsx
<Label htmlFor="name">Full name</Label>
<Label htmlFor="email" required>Email address</Label>
```

### Paired with a custom control

```tsx
<Label htmlFor="bio">Bio</Label>
<textarea id="bio" rows={2} />

<Label disabled htmlFor="handle">Handle (disabled)</Label>
<input id="handle" disabled placeholder="@handle" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| required | `required` | asterisk + sr-only (required) | asterisk + "required" in accessibilityLabel |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `error` | #ef4444 | #f87171 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Render `Text` with `text-sm font-medium text-text-primary`; required marker `*` in `text-error` with `accessibilityLabel` suffix "required" (RN has no sr-only; append to the accessible name instead). Expose `nativeID` so inputs can reference it via `accessibilityLabelledBy` (Android) / `aria-labelledby` (RN ≥0.71).

- Location: `modules/ui/Label.tsx`, named export `Label` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `LabelProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Label` from the `modules/ui` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Basic + required, Paired with a custom control)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **required** implemented: asterisk + "required" in accessibilityLabel
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`error`, `primary`, `text-disabled`, `text-primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
