# StatusCodeBadge

> Backlog item · KuiReact id `api-doc-status-code-badge` · layer `domain` · **Domain — API Doc** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Displays an HTTP status code with a semantic color and an optional human-readable label.

**Why it matters for KuiNative:** Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case. Thin semantic wrapper over Badge — trivial once Badge reaches parity.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/api-doc/StatusCodeBadge.tsx` (1 file, 45 LOC) |
| Public export | `@/modules/domains/api-doc` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | All status families, Without label |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/api-doc/StatusCodeBadge.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `code` | `number \| string` | **yes** | — |  | same |
| `showLabel` | `boolean` | no | `true` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### All status families

```tsx
<StatusCodeBadge code={200} />
<StatusCodeBadge code={201} />
<StatusCodeBadge code={204} />
<StatusCodeBadge code={301} />
<StatusCodeBadge code={400} />
<StatusCodeBadge code={404} />
<StatusCodeBadge code={500} />
```

### Without label

```tsx
<StatusCodeBadge code={200} showLabel={false} />
<StatusCodeBadge code={404} showLabel={false} />
<StatusCodeBadge code={500} showLabel={false} />
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
| `border` | #e5e7eb | #334155 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-fg` | #7f1d1d | #fee2e2 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `info-fg` | #164e63 | #cffafe | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-fg` | #78350f | #fef3c7 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/api-doc/StatusCodeBadge.tsx`, named export `StatusCodeBadge` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StatusCodeBadgeProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/api-doc/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `StatusCodeBadge` from the `modules/domains/api-doc` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (All status families, Without label)
- [ ] Uses only semantic tokens (`border`, `error`, `error-fg`, `error-subtle`, `info`, `info-fg`, `info-subtle`, `success`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
