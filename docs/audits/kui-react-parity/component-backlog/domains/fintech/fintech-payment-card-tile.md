# PaymentCardTile

> Backlog item · KuiReact id `fintech-payment-card-tile` · layer `domain` · **Domain — Fintech** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Skeuomorphic payment card tile with scheme brand, kind icon (virtual / physical), and status badge.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/fintech/card/PaymentCardTile.tsx` (1 file, 116 LOC) |
| Public export | `@/modules/domains/fintech` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Three states, Virtual card |
| Composes | Badge (exists as `Badge`) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/fontawesome-svg-core` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/fintech/card/PaymentCardTile.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `nickname` | `string` | **yes** | — |  | same |
| `scheme` | `PaymentCardScheme` | **yes** | — |  | same |
| `kind` | `PaymentCardKind` | **yes** | — |  | same |
| `status` | `PaymentCardStatus` | **yes** | — |  | same |
| `last4` | `string` | **yes** | — |  | same |
| `expiry` | `string` | no | — |  | same |
| `cardholderName` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Three states

```tsx
<PaymentCardTile nickname="…" scheme="visa" kind="physical" status="active" last4="4291" expiry="11/28" />
```

### Virtual card

```tsx
<PaymentCardTile scheme="mastercard" kind="virtual" status="active" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `info` | #06b6d4 | #22d3ee | ✓ |

Use NativeWind classes (`bg-info`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Badge — exists as `Badge`

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/fontawesome-svg-core`

## Implementation Notes

- Location: `modules/domains/fintech/PaymentCardTile.tsx`, named export `PaymentCardTile` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PaymentCardTileProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/fintech/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `PaymentCardTile` from the `modules/domains/fintech` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Three states, Virtual card)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`info`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
