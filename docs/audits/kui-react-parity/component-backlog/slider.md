# Slider

> Backlog item · KuiReact id `slider` · layer `ui` · **Media** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `direct` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Accessible carousel. Includes role="region" + aria-roledescription="carousel" and per-slide aria labels. Supports autoplay, arrow keys, and dot navigation.

**Why it matters for KuiNative:** Accessible carousel (autoPlay, dots, arrows, loop).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Slider/index.tsx` (13 files, 644 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Default, Auto-play, Touch swipe + momentum, No arrows / no loop |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 3 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, reduced-motion aware, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Slider/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `slides` | `Slide[]` | **yes** | — |  | same |
| `autoPlay` | `boolean` | no | `false` |  | same |
| `autoPlayInterval` | `number` | no | `4000` |  | same |
| `showDots` | `boolean` | no | `true` |  | same |
| `showArrows` | `boolean` | no | `true` |  | same |
| `loop` | `boolean` | no | `true` |  | same |
| `dragThreshold` | `number` | no | `50` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `slideClassName` | `string` | no | — |  | same |
| `ariaLabel` | `string` | no | `'Content slider'` |  | → `accessibilityLabel` |

## Variants

### Default

```tsx
<Slider
  slides={[
    <HeroSlide title="Slide 1" />,
    <HeroSlide title="Slide 2" />,
    <HeroSlide title="Slide 3" />,
  ]}
/>
```

### Auto-play

```tsx
<Slider slides={slides} autoPlay autoPlayInterval={2000} />
```

### Touch swipe + momentum

```tsx
<Slider
  slides={slides}
  loop={false}
  dragThreshold={50}
  // Drag past 50 px = 1 slide.
  // Flick > 0.5 px/ms = +1 extra slide per 0.5 px/ms of release velocity.
  // Edge resistance (×0.4) keeps you on the rails when loop is off.
/>
```

### No arrows / no loop

```tsx
<Slider slides={slides} showArrows={false} loop={false} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="group"` | review manually |
| `role="region"` | review manually |
| `role="tab"` | `accessibilityRole="tab"` |
| `role="tablist"` | `accessibilityRole="tablist"` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |
| `aria-roledescription` | `accessibilityHint` |
| `aria-selected` | `accessibilityState.selected` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `react-native-reanimated`

## Implementation Notes

Horizontal paging FlatList or `react-native-reanimated-carousel`; `accessibilityRole="adjustable"` on the pager.

- Location: `modules/ui/Slider.tsx`, named export `Slider` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SliderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Slider` from the `modules/ui` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Default, Auto-play, Touch swipe + momentum, No arrows / no loop)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
