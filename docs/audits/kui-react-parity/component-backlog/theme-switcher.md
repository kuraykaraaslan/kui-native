# ThemeSwitcher

> Backlog item · KuiReact id `theme-switcher` · layer `app` · **Theme** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Tri-state theme selector (light / dark / system). Persists the choice to localStorage and toggles the .dark class on <html>. Mounts safely on the server with a placeholder until hydrated.

**Why it matters for KuiNative:** KuiReact ships ThemeSwitcher in the library; KuiNative keeps its ThemeToggle in the showcase only, so consumers get no theme control.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/ThemeSwitcher.tsx` (1 file, 48 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Default |
| Composes | Button (exists as `Button`), DropdownMenu (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

_Props could not be extracted statically (component is a barrel/re-export or uses a non-standard signature). Read `kui-react/modules/app/ThemeSwitcher.tsx` and fill this section before implementation._

## Variants

### Default

```tsx
<ThemeSwitcher />
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
| `text-disabled` | #9ca3af | #475569 | ✓ |

Use NativeWind classes (`bg-text-disabled`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- DropdownMenu — missing → [backlog](dropdown-menu.md)

**Blocked by (roadmap):** `dropdown-menu`, `R-button`, `R-theme-provider`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Promote `modules/showcase/ui/ThemeToggle.tsx` + `useThemeMode` into the library under the KuiReact name; persist with `expo-secure-store`/AsyncStorage.

- Location: `modules/app/ThemeSwitcher.tsx`, named export `ThemeSwitcher` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ThemeSwitcherProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ThemeSwitcher` from the `modules/app` barrel with its props type
- [ ] Showcase demos for all 1 KuiReact variants (Default)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`text-disabled`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
