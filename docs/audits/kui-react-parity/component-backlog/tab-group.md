# TabGroup

> Backlog item · KuiReact id `tab-group` · layer `ui` · **Navigation** · Priority **Critical** · Complexity **Small** · Wave 1 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Accessible tab navigation following the role="tablist" / role="tab" / role="tabpanel" ARIA pattern. Arrow-key navigation; tabIndex=-1 on inactive tabs.

**Why it matters for KuiNative:** In-screen tabs (tabs/activeTab/onChange) are a staple of mobile screens.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/TabGroup.tsx` (1 file, 106 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Default, Icons + badge + disabled, Lazy panels |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | `modules/ui/TabGroup.test.tsx` (11 cases) |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/TabGroup.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `tabs` | `Tab[]` | **yes** | — |  | same |
| `defaultTab` | `string` | no | — |  | same |
| `label` | `string` | no | `'Tabs'` |  | same |
| `lazy` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
<TabGroup
  label="Account settings"
  tabs={[
    { id: 'profile', label: 'Profile', content: <ProfileSettings /> },
    { id: 'security', label: 'Security', content: <SecuritySettings /> },
    { id: 'billing', label: 'Billing', content: <BillingSettings /> },
  ]}
/>
```

### Icons + badge + disabled

```tsx
<TabGroup tabs={[
  { id: 'overview', label: 'Overview', icon: <BarChart2 />, content: ... },
  { id: 'analytics', label: 'Analytics', icon: <TrendingUp />, badge: <Badge>New</Badge>, content: ... },
  { id: 'settings', label: 'Settings', disabled: true, content: ... },
]} />
```

### Lazy panels

```tsx
// With lazy=true, panel content is only rendered when first activated:
<TabGroup lazy tabs={[
  { id: 'heavy', label: 'Heavy', content: <HeavyComponent /> },
]} />
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
| `role="tab"` | `accessibilityRole="tab"` |
| `role="tablist"` | `accessibilityRole="tablist"` |
| `role="tabpanel"` | review manually |
| `aria-controls` | n/a on native |
| `aria-disabled` | `accessibilityState.disabled` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-labelledby` | `accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label |
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
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Horizontal ScrollView of Pressable tabs with animated underline; `accessibilityRole="tablist"` / `tab` + `accessibilityState.selected`. Consider pairing with `react-native-pager-view` for swipeable content.

- Location: `modules/ui/TabGroup.tsx`, named export `TabGroup` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TabGroupProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `TabGroup` from the `modules/ui` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Default, Icons + badge + disabled, Lazy panels)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `primary`, `secondary`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] renders every tab and activates the first one by default
  - [ ] defaultTab picks the initially active tab
  - [ ] clicking a tab activates it and shows its panel
  - [ ] a disabled tab cannot be activated by click
  - [ ] ArrowRight moves to the next tab, skipping a disabled one
  - [ ] ArrowLeft wraps around from the first tab to the last
  - [ ] Home jumps to the first enabled tab, End to the last enabled tab
  - [ ] only the active tab is in the roving tab order (tabIndex 0), the rest are -1
  - [ ] lazy: a tab panel that has never been active renders nothing until first activated
  - [ ] without lazy, every panel is rendered upfront (just hidden)
  - [ ] the tablist has the given accessible label
- [ ] Prop table + usage snippet documented in the showcase entry
