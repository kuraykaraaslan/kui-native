# PriceTag

> Backlog item · KuiReact id `nft-price-tag` · layer `domain` · **Domain — NFT** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Dual ETH / USD price display with optional last-sale delta arrow.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/nft/asset/PriceTag.tsx` (1 file, 99 LOC) |
| Public export | `@/modules/domains/nft` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Listed with delta, Sizes |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/nft/asset/PriceTag.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `label` | `string` | no | — |  | same |
| `priceEth` | `number` | **yes** | — |  | same |
| `priceUsd` | `number` | no | — |  | same |
| `lastSalePriceEth` | `number` | no | — |  | same |
| `size` | `'sm' \| 'md' \| 'lg'` | no | `'md'` |  | same |
| `align` | `'left' \| 'right'` | no | `'left'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Listed with delta

```tsx
<PriceTag label="Current price" priceEth={0.85} priceUsd={2635} lastSalePriceEth={0.72} size="lg" />
```

### Sizes

```tsx
<PriceTag label="Md" priceEth={0.42} priceUsd={1300} size="md" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `size`: 'sm' · 'md' · 'lg' (default 'md')
- `align`: 'left' · 'right' (default 'left')

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
| `error` | #ef4444 | #f87171 | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-error`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/nft/PriceTag.tsx`, named export `PriceTag` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PriceTagProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/nft/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `PriceTag` from the `modules/domains/nft` barrel with its props type
- [ ] All 7 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Listed with delta, Sizes)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`error`, `success`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
