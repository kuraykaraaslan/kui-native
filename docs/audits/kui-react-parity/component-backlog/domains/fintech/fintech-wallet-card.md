# WalletCard

> Backlog item · KuiReact id `fintech-wallet-card` · layer `domain` · **Domain — Fintech** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Wallet card displaying balance, currency, status, and account reference with a premium gradient look.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/fintech/wallet/WalletCard.tsx` (1 file, 131 LOC) |
| Public export | `@/modules/domains/fintech` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Active primary (TRY), Frozen wallet (EUR), USD wallet |
| Composes | CurrencyBadge (missing), WalletStatusBadge (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/fintech/wallet/WalletCard.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `wallet` | `Wallet` | **yes** | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Active primary (TRY)

```tsx
<WalletCard wallet={wallet} />
```

### Frozen wallet (EUR)

```tsx
<WalletCard wallet={{ ...wallet, status: 'FROZEN' }} />
```

### USD wallet

```tsx
<WalletCard wallet={usdWallet} />
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

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- CurrencyBadge — missing → [backlog](fintech-currency-badge.md)
- WalletStatusBadge — missing → [backlog](fintech-wallet-status-badge.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/fintech/WalletCard.tsx`, named export `WalletCard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `WalletCardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/fintech/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `WalletCard` from the `modules/domains/fintech` barrel with its props type
- [ ] All 2 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Active primary (TRY), Frozen wallet (EUR), USD wallet)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `primary`, `primary-fg`, `primary-subtle`, `secondary`, `surface-raised`, `text-disabled`, `text-primary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
