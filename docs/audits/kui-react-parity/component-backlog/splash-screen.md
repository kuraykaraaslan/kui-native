# SplashScreen

> Backlog item · KuiReact id `splash-screen` · layer `app` · **Feedback** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Full-screen overlay shown during app initialisation. Accepts a logo slot, optional progress bar, and fades out when visible=false.

**Why it matters for KuiNative:** Branded launch screen; on native this is split between `expo-splash-screen` (OS level) and an in-app animated screen.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/SplashScreen.tsx` (1 file, 61 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `beta` · since 2025-05 |
| Showcase variants | Logo + message + progress, Spinner only (no logo), Interactive fade-out |
| Composes | Spinner (exists as `Spinner`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/app/SplashScreen.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `visible` | `boolean` | no | `true` |  | same |
| `logo` | `React.ReactNode` | no | — |  | same |
| `message` | `string` | no | — |  | same |
| `progress` | `number` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Logo + message + progress

```tsx
<SplashScreen
  visible={true}
  logo={<span className="text-4xl font-black text-primary">Acme</span>}
  message="Loading your workspace…"
  progress={65}
/>
```

### Spinner only (no logo)

```tsx
<SplashScreen visible={true} message="Please wait…" />
```

### Interactive fade-out

```tsx
const [visible, setVisible] = useState(true);

<SplashScreen
  visible={visible}
  logo={<span className="text-4xl font-black text-primary">Acme</span>}
  message="Starting up…"
/>
<Button onClick={() => setVisible(false)}>Dismiss</Button>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="progressbar"` | `accessibilityRole="progressbar"` |
| `role="status"` | `accessibilityRole="summary"` |
| `aria-busy` | `accessibilityState.busy` |
| `aria-label` | `accessibilityLabel` |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |
| `aria-valuemax` | `accessibilityValue.max` |
| `aria-valuemin` | `accessibilityValue.min` |
| `aria-valuenow` | `accessibilityValue.now` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `primary` | #3b82f6 | #60a5fa | ✓ |

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Spinner — exists as `Spinner`

**Blocked by (roadmap):** `R-spinner`

**Third-party:** none

**Suggested RN libraries:** `expo-splash-screen`

## Implementation Notes

Document `expo-splash-screen` config for the static part; port the animated brand screen as a component.

- Location: `modules/app/SplashScreen.tsx`, named export `SplashScreen` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SplashScreenProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `SplashScreen` from the `modules/app` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Logo + message + progress, Spinner only (no logo), Interactive fade-out)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
