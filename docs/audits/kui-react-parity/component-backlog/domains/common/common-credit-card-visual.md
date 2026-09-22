# CreditCardVisual

> Backlog item · KuiReact id `common-credit-card-visual` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Animated 3-D flip credit card. Front shows number, name, expiry; back shows CVV strip. Supports VISA, Mastercard, AMEX, Discover.

**Why it matters for KuiNative:** Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/payment/CreditCardVisual.tsx` (1 file, 133 LOC) |
| Public export | `@kuraykaraaslan/kui-react/common` — public (npm: root + /common) |
| Registry | yes · status `beta` · since 2025-05 |
| Showcase variants | Brands, Flipped (CVV) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | animated/transitions · 23 raw hex literal(s) in source |

## Required Props

Parsed from `modules/domains/common/payment/CreditCardVisual.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `cardNumber` | `string` | no | `''` |  | same |
| `cardholderName` | `string` | no | `''` |  | same |
| `expiryMonth` | `string` | no | `'MM'` |  | same |
| `expiryYear` | `string` | no | `'YY'` |  | same |
| `cvv` | `string` | no | `''` |  | same |
| `brand` | `CardBrand` | no | `'UNKNOWN'` |  | same |
| `flipped` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Brands

```tsx
<CreditCardVisual brand="VISA" cardNumber="4111111111111111" cardholderName="JANE DOE" expiryMonth="08" expiryYear="28" />
<CreditCardVisual brand="MASTERCARD" cardNumber="5500005555555559" cardholderName="JOHN SMITH" expiryMonth="12" expiryYear="27" />
```

### Flipped (CVV)

```tsx
<CreditCardVisual brand="AMEX" cardNumber="378282246310005" cardholderName="JANE DOE" expiryMonth="03" expiryYear="26" cvv="1234" flipped />
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

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/common/CreditCardVisual.tsx`, named export `CreditCardVisual` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `CreditCardVisualProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `CreditCardVisual` from the `modules/domains/common` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Brands, Flipped (CVV))
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
