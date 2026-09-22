# ColorPicker

> Backlog item · KuiReact id `color-picker` · layer `ui` · **Forms** · Priority **Low** · Complexity **Large** · Wave 3 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Color selection control with a 32-swatch preset palette plus optional hex input and native browser color picker for unlimited colors. M1 adds a HEX / RGBA / HSLA / HWB / OKLCH format-switcher with per-format input + copy. Pixel-identical EJS sibling at modules/ui/ColorPicker/ColorPicker.ejs. Used by RichTextEditor for text + highlight colors.

**Why it matters for KuiNative:** Niche input; large (1.2k LOC).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/ColorPicker/index.tsx` (17 files, 1190 LOC) |
| Public export | `@/modules/ui/ColorPicker/index` — source-only (not exported from a barrel) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Default, Compact (swatches only), Hex + native picker only (no swatches), Format switcher — HEX / RGBA / HSLA / HWB / OKLCH (M1) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles · 34 raw hex literal(s) in source |

## Required Props

Parsed from `modules/ui/ColorPicker/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | no | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | no | — |  | same |
| `value` | `ColorValue` | no | — |  | same |
| `onChange` | `(color: ColorValue) => void` | **yes** | — |  | same |
| `swatches` | `string[]` | no | `DEFAULT_COLOR_SWATCHES` |  | same |
| `showHexInput` | `boolean` | no | `true` |  | same |
| `showNativePicker` | `boolean` | no | `true` |  | same |
| `showNoColor` | `boolean` | no | `false` |  | same |
| `align` | `'left' \| 'right'` | no | `'left'` |  | same |
| `triggerLabel` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `popoverClassName` | `string` | no | — |  | same |
| `disabled` | `boolean` | no | `false` |  | same |
| `iconOnly` | `boolean` | no | `false` |  | same |
| `icon` | `IconDefinition` | no | — |  | same |
| `showFormatSwitcher` | `boolean` | no | `false` |  | same |
| `defaultFormat` | `ColorFormat` | no | `'hex'` |  | same |

## Variants

### Default

```tsx
const [c, setC] = useState<string | null>('#3b82f6');
<ColorPicker label="Brand color" value={c} onChange={setC} showNoColor />
```

### Compact (swatches only)

```tsx
<ColorPicker
  value={c}
  onChange={setC}
  showHexInput={false}
  showNativePicker={false}
/>
```

### Hex + native picker only (no swatches)

```tsx
<ColorPicker
  label="Background"
  value={c}
  onChange={setC}
  swatches={[]}
  showHexInput
  showNativePicker
  showNoColor
/>
```

### Format switcher — HEX / RGBA / HSLA / HWB / OKLCH (M1)

```tsx
<ColorPicker
  label="Theme color"
  value={c}
  onChange={setC}
  showFormatSwitcher
  defaultFormat="hex"
  showHexInput={false}
  showNativePicker
/>

// onChange receives the value formatted in the active format:
//   '#3b82f6'                              (HEX)
//   'rgb(59, 130, 246)'                    (RGBA)
//   'hsl(217.2, 91.2%, 59.8%)'             (HSLA)
// …
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `align`: 'left' · 'right' (default 'left')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `role="tab"` | `accessibilityRole="tab"` |
| `role="tablist"` | `accessibilityRole="tablist"` |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-selected` | `accessibilityState.selected` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core`

**Suggested RN libraries:** `react-native-gesture-handler`, `react-native-svg`

## Implementation Notes

Saturation/hue pads with `react-native-gesture-handler` + Reanimated; SVG gradients. Keep hex/rgb/hsl `format` API.

- Location: `modules/ui/ColorPicker.tsx`, named export `ColorPicker` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ColorPickerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ColorPicker` from the `modules/ui` barrel with its props type
- [ ] All 17 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Default, Compact (swatches only), Hex + native picker only (no swatches), Format switcher — HEX / RGBA / HSLA / HWB / OKLCH (M1))
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-raised`, `surface-overlay`, `surface-sunken`, `text-primary`, `text-secondary`, `text-disabled`, `border`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
