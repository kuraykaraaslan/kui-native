# DiffViewer

> Backlog item · KuiReact id `diff-viewer` · layer `ui` · **Advanced Components** · Priority **Low** · Complexity **Large** · Wave 3 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Line-based text diff viewer with unified (GitHub-style) and split (yan yana) modes. M1 ships a zero-dep LCS algorithm, hunk headers in `@@ -old,n +new,n @@` form, old/new line-number gutters, configurable context window, and optional collapsible unchanged regions. Pixel-identical EJS sibling at modules/ui/DiffViewer/DiffViewer.ejs.

**Why it matters for KuiNative:** Diff display.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/DiffViewer/index.tsx` (12 files, 841 LOC) |
| Public export | `@/modules/ui/DiffViewer/index` — source-only (not exported from a barrel) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Unified (default), Split (yan yana), With context=1, Collapsible unchanged context |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, hover styles |

## Required Props

Parsed from `modules/ui/DiffViewer/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `oldText` | `string` | no | `''` |  | same |
| `newText` | `string` | no | `''` |  | same |
| `mode` | `DiffMode` | no | `'unified'` |  | same |
| `context` | `number` | no | `3` |  | same |
| `collapsible` | `boolean` | no | `false` |  | same |
| `language` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Unified (default)

```tsx
<DiffViewer oldText={oldSrc} newText={newSrc} />
```

### Split (yan yana)

```tsx
<DiffViewer oldText={oldSrc} newText={newSrc} mode="split" />
```

### With context=1

```tsx
<DiffViewer oldText={oldSrc} newText={newSrc} context={1} />
```

### Collapsible unchanged context

```tsx
<DiffViewer
  oldText={oldSrc}
  newText={newSrc}
  context={3}
  collapsible
/>
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
| `role="region"` | review manually |
| `role="separator"` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Read-only line list with add/remove token colours; horizontal scroll.

- Location: `modules/ui/DiffViewer.tsx`, named export `DiffViewer` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DiffViewerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `DiffViewer` from the `modules/ui` barrel with its props type
- [ ] All 7 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Unified (default), Split (yan yana), With context=1, Collapsible unchanged context)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-overlay`, `surface-sunken`, `text-primary`, `text-secondary`, `text-disabled`, `border`, `border-focus`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
