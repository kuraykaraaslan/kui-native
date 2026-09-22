# AppNav

> Backlog item · KuiReact id `app-nav` · layer `app` · **Navigation** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Horizontal navigation bar. Renders inline links on desktop and a hamburger that opens a NavDrawer on mobile. Provides logo, navItems and actions slots.

**Why it matters for KuiNative:** Horizontal top nav with active route; on native replaced by tab bars.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/AppNav.tsx` (1 file, 96 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Marketing bar (logo + links + CTA), App bar (links + UserMenu) |
| Composes | Button (exists as `Button`), NavDrawer (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/AppNav.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `logo` | `React.ReactNode` | no | — |  | same |
| `navItems` | `AppNavItem[]` | no | `[]` |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `sticky` | `boolean` | no | `false` |  | same |
| `bordered` | `boolean` | no | `true` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.HTMLAttributes<HTMLElement>` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Marketing bar (logo + links + CTA)

```tsx
<AppNav
  logo={<span className="font-bold text-primary">Acme</span>}
  navItems={[
    { label: 'Home',     href: '/', active: true },
    { label: 'Products', href: '/products' },
    { label: 'Pricing',  href: '/pricing' },
  ]}
>
  <Button variant="ghost" size="sm">Log in</Button>
  <Button variant="primary" size="sm">Sign up</Button>
</AppNav>
```

### App bar (links + UserMenu)

```tsx
<AppNav
  logo={<span className="font-bold">Dashboard</span>}
  navItems={[
    { label: 'Overview', active: true },
    { label: 'Analytics' },
    { label: 'Reports' },
  ]}
>
  <UserMenu user={currentUser} />
</AppNav>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-current` | `accessibilityState.selected` + label suffix |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- NavDrawer — missing → [backlog](nav-drawer.md)

**Blocked by (roadmap):** `nav-drawer`, `R-button`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `expo-router`

## Implementation Notes

Map to a token-styled bottom tab bar config for expo-router Tabs.

- Location: `modules/app/AppNav.tsx`, named export `AppNav` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AppNavProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AppNav` from the `modules/app` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Marketing bar (logo + links + CTA), App bar (links + UserMenu))
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `primary`, `primary-subtle`, `secondary`, `surface-overlay`, `surface-raised`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
