# PriceDisplay

> Backlog item · KuiReact id `common-price-display` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Currency formatter using Intl.NumberFormat. Supports any ISO 4217 code and locale. Strikethrough prop renders an original/crossed-out price.

**Why it matters for KuiNative:** Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/money/PriceDisplay.tsx` (1 file, 48 LOC) |
| Public export | `@kuraykaraaslan/kui-react/common` — public (npm: root + /common) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Sizes, Multi-currency + strikethrough |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 6 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/common/money/PriceDisplay.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `amount` | `number` | **yes** | — |  | same |
| `currency` | `string` | no | `'TRY'` |  | same |
| `locale` | `string` | no | `'tr-TR'` |  | same |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | no | `'md'` |  | same |
| `strikethrough` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Sizes

```tsx
<PriceDisplay amount={1299.99} currency="USD" size="sm" />
<PriceDisplay amount={1299.99} currency="USD" size="md" />
<PriceDisplay amount={1299.99} currency="USD" size="lg" />
<PriceDisplay amount={1299.99} currency="USD" size="xl" />
```

### Multi-currency + strikethrough

```tsx
<PriceDisplay amount={2499} currency="TRY" size="lg" />
<PriceDisplay amount={1799} currency="TRY" size="lg" strikethrough />
<PriceDisplay amount={89.99} currency="USD" locale="en-US" size="lg" />
<PriceDisplay amount={74.99} currency="EUR" locale="de-DE" size="lg" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `size`: 'sm' · 'md' · 'lg' · 'xl' (default 'md')

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

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/common/PriceDisplay.tsx`, named export `PriceDisplay` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PriceDisplayProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `PriceDisplay` from the `modules/domains/common` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Sizes, Multi-currency + strikethrough)
- [ ] Uses only semantic tokens (`text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
