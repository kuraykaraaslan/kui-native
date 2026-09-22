# DetailHeader

> Backlog item · KuiReact id `detail-header` · layer `app` · **Layout** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Page header for detail/record views: title, subtitle, status badge, action buttons, and optional tab navigation.

**Why it matters for KuiNative:** Entity header with tabs.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/DetailHeader.tsx` (1 file, 92 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | With actions, no tabs, With tabs |
| Composes | Badge (exists as `Badge`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/DetailHeader.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | **yes** | — |  | same |
| `subtitle` | `string` | no | — |  | same |
| `status` | `string` | no | — |  | same |
| `statusVariant` | `'success' \| 'error' \| 'warning' \| 'info' \| 'neutral' \| 'primary'` | no | `'neutral'` |  | same |
| `badge` | `React.ReactNode` | no | — |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `tabs` | `DetailTab[]` | no | — |  | same |
| `defaultTab` | `string` | no | — |  | same |
| `onTabChange` | `(value: string) => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### With actions, no tabs

```tsx
<DetailHeader
  title="Invoice #1042"
  subtitle="Created 3 days ago by Jane Doe"
  status="Pending"
  statusVariant="warning"
>
  <Button variant="outline" size="sm">Edit</Button>
  <Button variant="primary" size="sm">Approve</Button>
</DetailHeader>
```

### With tabs

```tsx
<DetailHeader
  title="Order #8821"
  subtitle="Last updated 2 hours ago"
  status="Shipped"
  statusVariant="success"
  tabs={[
    { value: 'overview', label: 'Overview' },
    { value: 'items',    label: 'Items'    },
    { value: 'history',  label: 'History'  },
    { value: 'notes',    label: 'Notes', disabled: true },
  ]}
  defaultTab="overview"
>
  <Button variant="ghost" size="sm">Print</Button>
// …
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `statusVariant`: 'success' · 'error' · 'warning' · 'info' · 'neutral' · 'primary' (default 'neutral')

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
| `aria-disabled` | `accessibilityState.disabled` |
| `aria-label` | `accessibilityLabel` |
| `aria-selected` | `accessibilityState.selected` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `border-strong` | #d1d5db | #475569 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Badge — exists as `Badge`

**Blocked by (roadmap):** `R-badge`, `page-header`, `tab-group`

**Third-party:** none

**Suggested RN libraries:** `page-header`, `tab-group`

## Implementation Notes

Compose PageHeader + TabGroup.

- Location: `modules/app/DetailHeader.tsx`, named export `DetailHeader` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DetailHeaderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `DetailHeader` from the `modules/app` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (With actions, no tabs, With tabs)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `border-strong`, `primary`, `surface-raised`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
