# ButtonGroup

> Backlog item · KuiReact id `button-group` · layer `ui` · **Forms** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Segmented button group for mutually-exclusive options. Supports 4 variants, 4 sizes and disabled items.

**Why it matters for KuiNative:** Segmented control pattern (options/selected/onChange); very common on mobile.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/ButtonGroup.tsx` (1 file, 96 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-01 |
| Showcase variants | Outline (default), Sizes, Primary / secondary / ghost, With disabled item, Icon-style labels |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/ButtonGroup.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `items` | `ButtonGroupItem[]` | **yes** | — |  | same |
| `value` | `string` | **yes** | — |  | same |
| `onChange` | `(value: string) => void` | **yes** | — |  | same |
| `variant` | `ButtonGroupVariant` | no | `'outline'` |  | same |
| `size` | `ButtonGroupSize` | no | `'md'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Outline (default)

```tsx
function Demo() {
  const [v, setV] = useState('week');
  return (
    <ButtonGroup value={v} onChange={setV}
      items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
    />
  );
}
```

### Sizes

```tsx
<ButtonGroup size="sm" value="a" onChange={setV} items={[...]} />
<ButtonGroup size="md" value="a" onChange={setV} items={[...]} />
```

### Primary / secondary / ghost

```tsx
<ButtonGroup variant="primary" value="week" onChange={setV} items={[...]} />
<ButtonGroup variant="secondary" value="week" onChange={setV} items={[...]} />
<ButtonGroup variant="ghost" value="week" onChange={setV} items={[...]} />
```

### With disabled item

```tsx
<ButtonGroup value="week" onChange={setV}
  items={[
    { value: 'day',   label: 'Day' },
    { value: 'week',  label: 'Week' },
    { value: 'month', label: 'Month', disabled: true },
  ]}
/>
```

### Icon-style labels

```tsx
// Use single-char labels as icon proxies:
<ButtonGroup value="grid" onChange={setV}
  items={[
    { value: 'list', label: '☰' },
    { value: 'grid', label: '⊞' },
    { value: 'map',  label: '◫' },
  ]}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="group"` | review manually |
| `aria-pressed` | `accessibilityState.selected` |

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
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Horizontal Pressable group sharing Button tokens; `accessibilityRole="radiogroup"`/`radio` or `tablist`/`tab`. Can double as SegmentedControl.

- Location: `modules/ui/ButtonGroup.tsx`, named export `ButtonGroup` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ButtonGroupProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ButtonGroup` from the `modules/ui` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 5 KuiReact variants (Outline (default), Sizes, Primary / secondary / ghost, With disabled item, Icon-style labels)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-base`, `surface-overlay`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
