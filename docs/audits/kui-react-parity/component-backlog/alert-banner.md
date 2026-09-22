# AlertBanner

> Backlog item · KuiReact id `alert-banner` · layer `ui` · **Feedback** · Priority **Critical** · Complexity **Small** · Wave 1 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Page-level info, success, warning or error message. Announced via role="alert" for screen readers with optional dismissible and action support.

**Why it matters for KuiNative:** Inline semantic alerts (success/error/warning/info) with title/message/action; basic feedback surface.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/AlertBanner.tsx` (1 file, 93 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Info, Success, Warning, Error, With CTA action, Link CTA (action.href), Custom icon |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 5 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/AlertBanner.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `variant` | `AlertVariant` | no | `'info'` |  | same |
| `title` | `string` | no | — |  | same |
| `message` | `string` | **yes** | — |  | same |
| `dismissible` | `boolean` | no | `false` |  | same |
| `action` | `AlertAction` | no | — |  | same |
| `icon` | `React.ReactNode` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Info

```tsx
<AlertBanner variant="info" title="System update" message="A new version is available." dismissible />
```

### Success

```tsx
<AlertBanner variant="success" message="Profile updated successfully." dismissible />
```

### Warning

```tsx
<AlertBanner variant="warning" title="Maintenance window" message="The service will be unavailable from 2–4 AM UTC." />
```

### Error

```tsx
<AlertBanner variant="error" title="Something went wrong" message="Unable to load the resource. Please try again." />
```

### With CTA action

```tsx
<AlertBanner variant="warning" title="Your plan is expiring" message="Upgrade before your trial ends."
  action={{ label: 'Upgrade now', onClick: handleUpgrade }} dismissible />
```

### Link CTA (action.href)

```tsx
<AlertBanner variant="info" title="Documentation updated" message="New guides are available."
  action={{ label: 'Read docs', href: '/docs/api' }} />
```

### Custom icon

```tsx
<AlertBanner variant="info" message="Custom icon override." icon={<RocketIcon />} />
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
| `role="alert"` | `accessibilityRole="alert"` |
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
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

`View` with `bg-*-subtle` + `text-*-fg`, left icon, optional dismiss and actions (Button). Error/warning use `accessibilityLiveRegion="polite"` / announce.

- Location: `modules/ui/AlertBanner.tsx`, named export `AlertBanner` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AlertBannerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AlertBanner` from the `modules/ui` barrel with its props type
- [ ] All 7 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 7 KuiReact variants (Info, Success, Warning, Error, With CTA action, Link CTA (action.href), Custom icon)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `info`, `info-subtle`, `success`, `success-fg`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
