# SocialNotificationItem

> Backlog item · KuiReact id `social-notification-item` · layer `domain` · **Domain — Social** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Notification list item showing actor avatar, type icon overlay, message and timestamp. Unread items have a distinct background and dot indicator.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/social/notification/SocialNotificationItem.tsx` (1 file, 97 LOC) |
| Public export | `@/modules/domains/social` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Unread (like) + Read (follow), All notification types |
| Composes | Avatar (exists as `Avatar` + `AvatarGroup`) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/social/notification/SocialNotificationItem.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `notification` | `NotificationWithActor` | **yes** | — |  | same |
| `onClick` | `(notificationId: string) => void` | no | — |  | → `onPress` |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Unread (like) + Read (follow)

```tsx
<div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
  <SocialNotificationItem notification={{ type: 'LIKE',   isRead: false, actor: user, message: 'liked your post', ... }} />
  <SocialNotificationItem notification={{ type: 'FOLLOW', isRead: true,  actor: user, message: 'started following you', ... }} />
</div>
```

### All notification types

```tsx
{(['LIKE', 'COMMENT', 'FOLLOW', 'MENTION', 'SHARE'] as const).map((type) => (
  <SocialNotificationItem key={type} notification={{ type, isRead: false, actor: user, ... }} />
))}
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
| `role="listitem"` | review manually |
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
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Avatar — exists as `Avatar` + `AvatarGroup`

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/social/SocialNotificationItem.tsx`, named export `SocialNotificationItem` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SocialNotificationItemProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/social/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `SocialNotificationItem` from the `modules/domains/social` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Unread (like) + Read (follow), All notification types)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border-focus`, `error`, `info`, `primary`, `primary-subtle`, `secondary`, `success`, `surface-base`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
