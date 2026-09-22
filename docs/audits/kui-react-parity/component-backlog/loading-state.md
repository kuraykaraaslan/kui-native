# LoadingState

> Backlog item · KuiReact id `loading-state` · layer `app` · **Feedback** · Priority **High** · Complexity **Small** · Wave 1 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Skeleton loading animations. Variants: spinner / table / cards / list / detail / form.

**Why it matters for KuiNative:** Page-level loading pattern (5 variants) built on Spinner/Skeleton; screens need it immediately.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/LoadingState.tsx` (1 file, 129 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Spinner, Table skeleton, Cards skeleton, List skeleton, Form skeleton |
| Composes | Spinner (exists as `Spinner`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/app/LoadingState.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `variant` | `LoadingVariant` | no | `'spinner'` |  | same |
| `rows` | `number` | no | `5` |  | → `numberOfLines` / min height |
| `cols` | `number` | no | `4` |  | same |
| `cards` | `number` | no | `3` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Spinner

```tsx
<LoadingState variant="spinner" />
```

### Table skeleton

```tsx
<LoadingState variant="table" rows={5} cols={4} />
```

### Cards skeleton

```tsx
<LoadingState variant="cards" cards={3} />
```

### List skeleton

```tsx
<LoadingState variant="list" rows={4} />
```

### Form skeleton

```tsx
<LoadingState variant="form" rows={3} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-busy` | `accessibilityState.busy` |
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
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Spinner — exists as `Spinner`

**Blocked by (roadmap):** `R-spinner`

**Third-party:** none

## Implementation Notes

Compose Spinner + Skeleton family; full-screen variant fills a flex-1 View.

- Location: `modules/app/LoadingState.tsx`, named export `LoadingState` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `LoadingStateProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `LoadingState` from the `modules/app` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 5 KuiReact variants (Spinner, Table skeleton, Cards skeleton, List skeleton, Form skeleton)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-base`, `surface-sunken`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
