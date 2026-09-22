# DirectionProvider

> Backlog item · KuiReact id `common-direction-provider` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Context provider that sets dir="rtl"/"ltr" on a wrapper div based on the active language. useDirection() hook exposes lang, dir, isRTL.

**Why it matters for KuiNative:** RTL direction context (common vertical: DirectionProvider/useDirection).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/i18n/DirectionProvider.tsx` (1 file, 43 LOC) |
| Public export | `@kuraykaraaslan/kui-react/common` — public (npm: root + /common) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | RTL (Arabic), LTR (English) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/common/i18n/DirectionProvider.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `lang` | `AppLanguage` | **yes** | — |  | same |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `applyToDocument` | `boolean` | no | `false` |  | same |

## Variants

### RTL (Arabic)

```tsx
<DirectionProvider lang="ar">
  <p className="text-right">مرحبا بالعالم — Hello World</p>
</DirectionProvider>
```

### LTR (English)

```tsx
<DirectionProvider lang="en">
  <p>Hello World — مرحبا بالعالم</p>
</DirectionProvider>
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

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

Use `I18nManager.isRTL` / `forceRTL` and expose the same `useDirection` hook.

- Location: `modules/domains/common/DirectionProvider.tsx`, named export `DirectionProvider` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DirectionProviderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `DirectionProvider` from the `modules/domains/common` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (RTL (Arabic), LTR (English))
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
