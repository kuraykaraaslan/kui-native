# AppTopBar

> Backlog item · KuiReact id `app-top-bar` · layer `app` · **Navigation** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Top bar wrapper passed into AppShell's header slot. The logo slot anchors the left side while children (GlobalSearch, UserMenu, Button, etc.) are arranged in a flex row.

**Why it matters for KuiNative:** Header wrapper; KuiNative showcase has a private Header.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/AppTopBar.tsx` (1 file, 23 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Arama + actions + kullanıcı, Logo + action + kullanıcı |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 2 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/AppTopBar.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `logo` | `React.ReactNode` | no | — |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.HTMLAttributes<HTMLDivElement>` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Arama + actions + kullanıcı

```tsx
<AppTopBar>
  <GlobalSearch
    onSearch={handleSearch}
    onSelect={handleSelect}
    className="flex-1 max-w-sm hidden sm:block"
  />
  <div className="ml-auto flex items-center gap-1">
    <Button variant="ghost" size="sm" iconOnly aria-label="Notifications">🔔</Button>
    <Button variant="ghost" size="sm" iconOnly aria-label="Settings">⚙️</Button>
    <UserMenu user={currentUser} />
  </div>
</AppTopBar>
```

### Logo + action + kullanıcı

```tsx
<AppTopBar logo={<span className="font-black text-primary text-lg">Acme</span>}>
  <div className="ml-auto flex items-center gap-2">
    <Button variant="primary" size="sm">Upgrade</Button>
    <UserMenu user={currentUser} />
  </div>
</AppTopBar>
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

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Promote showcase Header; SafeArea top inset.

- Location: `modules/app/AppTopBar.tsx`, named export `AppTopBar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AppTopBarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AppTopBar` from the `modules/app` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Arama + actions + kullanıcı, Logo + action + kullanıcı)
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
