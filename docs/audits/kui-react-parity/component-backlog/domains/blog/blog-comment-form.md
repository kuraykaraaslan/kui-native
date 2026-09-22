# CommentForm

> Backlog item · KuiReact id `blog-comment-form` · layer `domain` · **Domain — Blog** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Name, email, and content comment form with inline validation. Providing parentId switches it to reply mode; onCancel shows a Cancel button.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/blog/comment/CommentForm.tsx` (1 file, 112 LOC) |
| Public export | `@/modules/domains/blog` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | New comment, Reply mode |
| Composes | Button (exists as `Button`), Input (exists as `TextInput`), Textarea (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 4 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/blog/comment/CommentForm.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `postId` | `Id` | **yes** | — |  | same |
| `parentId` | `Id \| null` | no | — |  | same |
| `onSubmit` | `(values: CommentFormValues & { postId: Id; parentId?: Id \| null }) => Promise<v…` | no | — |  | same |
| `onCancel` | `() => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### New comment

```tsx
<CommentForm postId={post.postId} onSubmit={handleSubmit} />
```

### Reply mode

```tsx
<CommentForm postId={post.postId} parentId={comment.commentId} onSubmit={handleSubmit} onCancel={handleCancel} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-text-secondary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- Input — exists as `TextInput`
- Textarea — missing → [backlog](../../textarea.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/blog/CommentForm.tsx`, named export `CommentForm` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `CommentFormProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/blog/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `CommentForm` from the `modules/domains/blog` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (New comment, Reply mode)
- [ ] Uses only semantic tokens (`text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
