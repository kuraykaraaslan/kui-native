# RarityBadge

> Backlog item · KuiReact id `nft-rarity-badge` · layer `domain` · **Domain — NFT** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Tier-coloured badge — Common, Uncommon, Rare, Epic, Legendary, Mythic.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/nft/asset/RarityBadge.tsx` (1 file, 44 LOC) |
| Public export | `@/modules/domains/nft` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | All tiers, With rank |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/nft/asset/RarityBadge.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `tier` | `RarityTier` | **yes** | — |  | same |
| `rank` | `number` | no | — |  | same |
| `size` | `'sm' \| 'md'` | no | `'md'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### All tiers

```tsx
<RarityBadge tier="COMMON" />
<RarityBadge tier="MYTHIC" />
```

### With rank

```tsx
<RarityBadge tier="LEGENDARY" rank={12} />
<RarityBadge tier="MYTHIC" rank={1} size="sm" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `size`: 'sm' · 'md' (default 'md')

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
| `error-fg` | #7f1d1d | #fee2e2 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info-fg` | #164e63 | #cffafe | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning-fg` | #78350f | #fef3c7 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/nft/RarityBadge.tsx`, named export `RarityBadge` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `RarityBadgeProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/nft/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `RarityBadge` from the `modules/domains/nft` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (All tiers, With rank)
- [ ] Uses only semantic tokens (`border`, `error-fg`, `error-subtle`, `info-fg`, `info-subtle`, `primary`, `primary-subtle`, `success-fg`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
