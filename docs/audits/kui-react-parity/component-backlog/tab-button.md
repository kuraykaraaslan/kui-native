# TabButton

> Backlog item · KuiReact id `tab-button` · layer `ui` · **Navigation** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Pill-style tab button with active/inactive coloring and an optional count badge.

**Why it matters for KuiNative:** Single tab button with count badge; building block of TabGroup.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/TabButton.tsx` (1 file, 39 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Interactive, Without count |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/TabButton.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `active` | `boolean` | **yes** | — |  | same |
| `onClick` | `() => void` | **yes** | — |  | → `onPress` |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `count` | `number` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Interactive

```tsx
const [tab, setTab] = useState('all');

<TabButton active={tab === 'all'}      onClick={() => setTab('all')}      count={42}>All</TabButton>
<TabButton active={tab === 'active'}   onClick={() => setTab('active')}   count={18}>Active</TabButton>
<TabButton active={tab === 'archived'} onClick={() => setTab('archived')} count={24}>Archived</TabButton>
```

### Without count

```tsx
<TabButton active onClick={...}>Selected</TabButton>
<TabButton active={false} onClick={...}>Default</TabButton>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `active` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Pressable with active underline + Badge count; port alongside TabGroup.

- Location: `modules/ui/TabButton.tsx`, named export `TabButton` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TabButtonProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `TabButton` from the `modules/ui` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Interactive, Without count)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Uses only semantic tokens (`border-focus`, `primary`, `primary-fg`, `surface-overlay`, `surface-sunken`, `text-disabled`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
