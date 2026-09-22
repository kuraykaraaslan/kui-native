# RangeSlider

> Backlog item · KuiReact id `range-slider` · layer `ui` · **Forms** · Priority **High** · Complexity **Medium** · Wave 2 · Fit `direct` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Numeric range input built on native `<input type="range">`. Single-handle by default, or `range` for a dual-handle min/max selector. Distinct from the `Slider` carousel component.

**Why it matters for KuiNative:** Numeric range input used by filters and settings.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/RangeSlider.tsx` (1 file, 113 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-09 |
| Showcase variants | Single value, Dual handle (range) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

_Props could not be extracted statically (component is a barrel/re-export or uses a non-standard signature). Read `kui-react/modules/ui/RangeSlider.tsx` and fill this section before implementation._

## Variants

### Single value

```tsx
const [v, setV] = useState(40);
<RangeSlider label="Volume" value={v} onChange={setV} />
```

### Dual handle (range)

```tsx
const [range, setRange] = useState<[number, number]>([20, 70]);
<RangeSlider range label="Price range" value={range} onChange={setRange} min={0} max={100} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-describedby` | `accessibilityHint` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

**Suggested RN libraries:** `react-native-gesture-handler`, `react-native-reanimated`

## Implementation Notes

Gesture-handler pan on thumbs + Reanimated; `accessibilityRole="adjustable"` with `accessibilityActions` increment/decrement and `accessibilityValue`.

- Location: `modules/ui/RangeSlider.tsx`, named export `RangeSlider` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `RangeSliderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `RangeSlider` from the `modules/ui` barrel with its props type
- [ ] Showcase demos for all 2 KuiReact variants (Single value, Dual handle (range))
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border-focus`, `primary`, `surface-base`, `surface-sunken`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
