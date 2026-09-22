# StarRating

> Backlog item · KuiReact id `star-rating` · layer `ui` · **Forms** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Five-star rating indicator. Read-only by default with decimal/half-star rendering; pass `readonly={false}` + `onChange` for interactive whole-star selection.

**Why it matters for KuiNative:** Rating display/input; used by reviews domain and 3 KuiReact components.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/StarRating.tsx` (1 file, 138 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Readonly with decimals, Interactive |
| Composes | — |
| Used by (registry) | reviews-review-card, reviews-review-submit-form, reviews-review-summary-card |
| Usage frequency | imported by 3 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions |

## Required Props

Parsed from `modules/ui/StarRating.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `value` | `number` | **yes** | — |  | same |
| `size` | `StarRatingSize` | no | `'md'` |  | same |
| `readonly` | `boolean` | no | `true` |  | same |
| `onChange` | `(value: number) => void` | no | — |  | same |
| `aria-label` | `string` | no | — |  | → `accessibilityLabel` |
| `caption` | `React.ReactNode` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Readonly with decimals

```tsx
<StarRating value={4.7} size="sm" caption="(312 reviews)" />
<StarRating value={3.5} size="md" />
<StarRating value={2.2} size="lg" />
```

### Interactive

```tsx
const [value, setValue] = useState(0);
<StarRating
  value={value}
  readonly={false}
  onChange={setValue}
  aria-label="Pick a rating"
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| read-only | `readonly` | sunken background, not editable | `editable={false}` + sunken bg + label suffix |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="img"` | `accessibilityRole="image"` |
| `role="radio"` | `accessibilityRole="radio"` |
| `role="radiogroup"` | `accessibilityRole="radiogroup"` |
| `aria-checked` | `accessibilityState.checked` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |

Use NativeWind classes (`bg-warning`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`

## Implementation Notes

Row of FontAwesome star icons in Pressables; `adjustable` role with increment/decrement actions for screen readers.

- Location: `modules/ui/StarRating.tsx`, named export `StarRating` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StarRatingProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `StarRating` from the `modules/ui` barrel with its props type
- [ ] All 7 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Readonly with decimals, Interactive)
- [ ] State **read-only** implemented: `editable={false}` + sunken bg + label suffix
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`warning`, `text-disabled`, `border-focus`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
