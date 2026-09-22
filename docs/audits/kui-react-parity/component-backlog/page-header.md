# PageHeader

> Backlog item · KuiReact id `page-header` · layer `ui` · **Layout** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Page title + subtitle + optional badge + action buttons. Supports 5 button variants (primary/secondary/outline/danger/ghost); rendered as a link with href or as a button.

**Why it matters for KuiNative:** Screen title + subtitle + actions; every screen uses one.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/PageHeader.tsx` (1 file, 85 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | With actions, Danger action, Minimal |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/PageHeader.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | **yes** | — |  | same |
| `subtitle` | `string` | no | — |  | same |
| `badge` | `React.ReactNode` | no | — |  | same |
| `actions` | `PageHeaderAction[]` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### With actions

```tsx
<PageHeader
  title="Users"
  subtitle="Manage your team members."
  badge={<Badge variant="info">48 members</Badge>}
  actions={[
    { label: 'Export', variant: 'outline' },
    { label: '+ Invite user', variant: 'primary' },
  ]}
/>
```

### Danger action

```tsx
<PageHeader
  title="Danger Zone"
  subtitle="Irreversible actions."
  actions={[
    { label: 'Archive', variant: 'outline' },
    { label: 'Delete project', variant: 'danger' },
  ]}
/>
```

### Minimal

```tsx
<PageHeader title="Settings" subtitle="Configure your workspace preferences." />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
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
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-hover` | #2563eb | #93c5fd | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-inverse` | #ffffff | #111827 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Integrate with expo-router `Stack.Screen` header or render in-content. `accessibilityRole="header"` on title.

- Location: `modules/ui/PageHeader.tsx`, named export `PageHeader` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PageHeaderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `PageHeader` from the `modules/ui` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (With actions, Danger action, Minimal)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `primary`, `primary-fg`, `primary-hover`, `secondary`, `surface-overlay`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
