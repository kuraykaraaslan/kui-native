# BrandLogo

> Backlog item · KuiReact id `brand-logo` · layer `ui` · **Foundation** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Square brand mark with rounded corners. Renders a single letter or short token on a primary-coloured tile. 5 sizes (sm → 2xl).

**Why it matters for KuiNative:** Used by AppShell/AppFooter/SplashScreen; blocks those ports.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/BrandLogo.tsx` (1 file, 27 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Default sizes, Custom content |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 6 production file(s), 2 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/ui/BrandLogo.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | no | `'md'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default sizes

```tsx
<BrandLogo size="sm">A</BrandLogo>
<BrandLogo size="md">B</BrandLogo>
<BrandLogo size="lg">C</BrandLogo>
<BrandLogo size="xl">D</BrandLogo>
<BrandLogo size="2xl">E</BrandLogo>
```

### Custom content

```tsx
<BrandLogo size="lg">KU</BrandLogo>
<BrandLogo size="lg" className="bg-secondary">N</BrandLogo>
<BrandLogo size="lg" className="bg-success">✓</BrandLogo>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `size`: 'sm' · 'md' · 'lg' · 'xl' · '2xl' (default 'md')

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
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

**Suggested RN libraries:** `expo-image`

## Implementation Notes

Render via `expo-image` from a bundled asset or `react-native-svg`. Keep the `size` scale (sm–2xl) identical in px. `accessibilityRole="image"` + label from brand config.

- Location: `modules/ui/BrandLogo.tsx`, named export `BrandLogo` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `BrandLogoProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `BrandLogo` from the `modules/ui` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Default sizes, Custom content)
- [ ] Uses only semantic tokens (`primary`, `primary-fg`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
