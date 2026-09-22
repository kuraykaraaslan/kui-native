# PostStatusBadge

> Backlog item · KuiReact id `social-post-status-badge` · layer `domain` · **Domain — Social** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Displays the publication status of a social post — published, draft, archived, or deleted.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/social/post/PostStatusBadge.tsx` (1 file, 41 LOC) |
| Public export | `@/modules/domains/social` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | All statuses, Small size |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/social/post/PostStatusBadge.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `status` | `PostStatus` | **yes** | — |  | same |
| `size` | `'sm' \| 'md'` | no | `'md'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### All statuses

```tsx
{(['PUBLISHED', 'DRAFT', 'ARCHIVED', 'DELETED'] as const).map((s) => (
  <PostStatusBadge key={s} status={s} />
))}
```

### Small size

```tsx
<PostStatusBadge status="PUBLISHED" size="sm" />
<PostStatusBadge status="DRAFT" size="sm" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `size`: 'sm' · 'md' (default 'md')

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
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

- Location: `modules/domains/social/PostStatusBadge.tsx`, named export `PostStatusBadge` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PostStatusBadgeProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/social/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `PostStatusBadge` from the `modules/domains/social` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (All statuses, Small size)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error`, `error-subtle`, `success`, `success-fg`, `success-subtle`, `surface-overlay`, `text-secondary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
