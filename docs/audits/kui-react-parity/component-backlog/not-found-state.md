# NotFoundState

> Backlog item · KuiReact id `not-found-state` · layer `app` · **Feedback** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Not-found / empty record state with optional go-back action.

**Why it matters for KuiNative:** 404 state inside a screen.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/EmptyErrorState.tsx` (1 file, 105 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Default, With back link |
| Composes | AlertBanner (missing), Button (exists as `Button`), EmptyState (exists as `EmptyState`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/EmptyErrorState.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | no | `'Page not found'` |  | same |
| `description` | `string` | no | `"The page you're looking for …` |  | same |
| `onGoBack` | `() => void` | no | — |  | same |
| `goBackLabel` | `string` | no | `'Go back'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
<NotFoundState />
```

### With back link

```tsx
<NotFoundState
  title="User not found"
  description="This user account doesn't exist or may have been deleted."
  onGoBack={() => router.back()}
  goBackLabel="Back to users"
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

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

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- AlertBanner — missing → [backlog](alert-banner.md)
- Button — exists as `Button`
- EmptyState — exists as `EmptyState`

**Blocked by (roadmap):** `alert-banner`, `R-button`, `R-empty-state`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Same file as ErrorState in KuiReact (`EmptyErrorState.tsx`); port together.

- Location: `modules/app/NotFoundState.tsx`, named export `NotFoundState` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `NotFoundStateProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `NotFoundState` from the `modules/app` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Default, With back link)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
