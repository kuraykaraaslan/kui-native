# SeatMapPicker

> Backlog item · KuiReact id `seat-map-picker` · layer `domain` · **Domain — Event** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Görsel koltuk seçim haritası: section/subsection sekme desteği, sıra-koltuk grid, renk kodlu durum, erişilebilirlik göstergesi.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/event/SeatMapPicker/index.tsx` (14 files, 1031 LOC) |
| Public export | `@/modules/domains/event` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `beta` · since 2025-04 |
| Showcase variants | Section + subsection + koltuk seçimi, SVG Salon Haritası — tıkla → koltuk seç |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/event/SeatMapPicker/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `sections` | `SectionNode[]` | **yes** | — |  | same |
| `selectedSeatIds` | `string[]` | **yes** | — |  | same |
| `onSeatToggle` | `(seatId: string) => void` | **yes** | — |  | same |
| `maxSelectable` | `number` | no | — |  | same |
| `showStage` | `boolean` | no | `true` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `mapShapes` | `SectionMapShape[]` | no | — |  | same |
| `mapViewBox` | `string` | no | `'0 0 800 560'` |  | same |
| `mapMaxWidth` | `number` | no | `540` |  | same |
| `stagePoints` | `string` | no | — |  | same |
| `stagePath` | `string` | no | — |  | same |
| `stageLabel` | `string` | no | — |  | same |
| `stageLabelX` | `number` | no | — |  | same |
| `stageLabelY` | `number` | no | — |  | same |

## Variants

### Section + subsection + koltuk seçimi

```tsx
const sections = buildSectionTree(allSections, seatInfos, pricings);

<SeatMapPicker
  sections={sections}
  selectedSeatIds={selected}
  onSeatToggle={(id) => toggleSeat(id)}
  maxSelectable={4}
  showStage
/>
```

### SVG Salon Haritası — tıkla → koltuk seç

```tsx
import type { SectionMapShape } from '@/modules/domains/event/SeatMapPicker';

const mapShapes: SectionMapShape[] = [
  { sectionId: 'parket',     points: '170,93 510,93 558,290 122,290',                labelX: 340, labelY: 185 },
  { sectionId: 'sol-yan',   points: '32,93 170,93 122,290 18,248',                  labelX: 95,  labelY: 185 },
  { sectionId: 'sag-yan',   points: '510,93 648,93 662,248 558,290',                labelX: 585, labelY: 185 },
  { sectionId: 'ust-balkon', points: '18,248 122,290 558,290 662,248 674,438 6,438', labelX: 340, labelY: 360 },
];

<SeatMapPicker
  sections={sections}
  selectedSeatIds={selected}
  onSeatToggle={(id) => toggleSeat(id)}
  maxSelectable={6}
// …
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
| `role="button"` | `accessibilityRole="button"` |
| `role="group"` | review manually |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-pressed` | `accessibilityState.selected` |

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
| `info` | #06b6d4 | #22d3ee | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/event/SeatMapPicker.tsx`, named export `SeatMapPicker` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SeatMapPickerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/event/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `SeatMapPicker` from the `modules/domains/event` barrel with its props type
- [ ] All 14 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Section + subsection + koltuk seçimi, SVG Salon Haritası — tıkla → koltuk seç)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `info`, `primary`, `primary-fg`, `primary-subtle`, `secondary`, `success`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
