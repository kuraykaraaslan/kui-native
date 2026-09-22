# PostCard

> Backlog item · KuiReact id `social-post-card` · layer `domain` · **Domain — Social** · Priority **Low** · Complexity **Large** · Wave 3 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Social media post card with author info, text content, optional media grid, and like / comment / share / bookmark actions.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/social/post/PostCard.tsx` (1 file, 200 LOC) |
| Public export | `@/modules/domains/social` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Text post (liked), Image post (friends only) |
| Composes | Avatar (exists as `Avatar` + `AvatarGroup`), PostPrivacyBadge (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/social/post/PostCard.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `post` | `PostWithAuthor` | **yes** | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `onLike` | `(postId: string) => void` | no | — |  | same |
| `onComment` | `(postId: string) => void` | no | — |  | same |
| `onShare` | `(postId: string) => void` | no | — |  | same |
| `onBookmark` | `(postId: string) => void` | no | — |  | same |

## Variants

### Text post (liked)

```tsx
<PostCard post={{
  postId: 'post-01',
  content: 'Just shipped a new open-source design system…',
  privacy: 'PUBLIC',
  likeCount: 248, commentCount: 34, shareCount: 71,
  isLiked: true, isBookmarked: false,
  author: { name: 'Lena Fischer', username: 'lena_design', isVerified: true, ... },
}} />
```

### Image post (friends only)

```tsx
<PostCard post={{
  postId: 'post-02',
  content: 'Morning vibes from the home office ☕',
  privacy: 'FRIENDS',
  mediaUrls: ['https://picsum.photos/seed/office1/600/400', ...],
  likeCount: 92, commentCount: 8, shareCount: 3,
  isBookmarked: true,
  author: { name: 'Marco Rossi', username: 'marco_dev', ... },
}} />
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
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
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
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Avatar — exists as `Avatar` + `AvatarGroup`
- PostPrivacyBadge — missing → [backlog](social-post-privacy-badge.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`

## Implementation Notes

- Location: `modules/domains/social/PostCard.tsx`, named export `PostCard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PostCardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/social/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `PostCard` from the `modules/domains/social` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Text post (liked), Image post (friends only))
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `primary`, `primary-subtle`, `success`, `surface-overlay`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
