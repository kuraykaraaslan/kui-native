# StockStatusBadge

> Backlog item · KuiReact id `commerce-stock-status-badge` · layer `domain` · **Domain — Commerce** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Inventory status badge mapping stock levels to semantic colours.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears. Thin semantic wrapper over Badge — trivial once Badge reaches parity.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/commerce/product/StockStatusBadge.tsx` (1 file, 26 LOC) |
| Public export | `@/modules/domains/commerce` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | All stock statuses, Small size |
| Composes | Badge (exists as `Badge`) |
| Used by (registry) | — |
| Usage frequency | imported by 3 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/commerce/product/StockStatusBadge.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `status` | `StockStatus` | **yes** | — |  | same |
| `size` | `'sm' \| 'md'` | no | `'md'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### All stock statuses

```tsx
{(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'BACKORDER'] as const).map((s) => (
  <StockStatusBadge key={s} status={s} />
))}
```

### Small size

```tsx
{(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'BACKORDER'] as const).map((s) => (
  <StockStatusBadge key={s} status={s} size="sm" />
))}
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

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Badge — exists as `Badge`

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/commerce/StockStatusBadge.tsx`, named export `StockStatusBadge` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StockStatusBadgeProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/commerce/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `StockStatusBadge` from the `modules/domains/commerce` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (All stock statuses, Small size)
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
