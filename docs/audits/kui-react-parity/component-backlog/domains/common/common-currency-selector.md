# CurrencySelector

> Backlog item · KuiReact id `common-currency-selector` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Currency dropdown built from countries-list. Deduped, alphabetically sorted ISO 4217 currency codes.

**Why it matters for KuiNative:** Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/money/CurrencySelector.tsx` (1 file, 176 LOC) |
| Public export | `@kuraykaraaslan/kui-react/common` — public (npm: root + /common) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | Default, No label |
| Composes | Button (exists as `Button`) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `react-dom`, `countries-list`, `country-flag-icons/react/3x2`, `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, portal, animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/common/money/CurrencySelector.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `value` | `string` | **yes** | — |  | same |
| `onChange` | `(currency: string) => void` | **yes** | — |  | same |
| `id` | `string` | no | `'currency'` |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | no | `'Currency'` |  | same |
| `disabled` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
<CurrencySelector value={currency} onChange={setCurrency} />
```

### No label

```tsx
<CurrencySelector value="USD" onChange={setCurrency} label="" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="option"` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-haspopup` | `accessibilityHint` |
| `aria-label` | `accessibilityLabel` |
| `aria-selected` | `accessibilityState.selected` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `react-dom` → root overlay host / RN Modal, `countries-list`, `country-flag-icons/react/3x2`, `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/common/CurrencySelector.tsx`, named export `CurrencySelector` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `CurrencySelectorProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `CurrencySelector` from the `modules/domains/common` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Default, No label)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `primary`, `primary-subtle`, `surface-base`, `surface-overlay`, `surface-raised`, `text-disabled`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
