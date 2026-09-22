# NavDrawer

> Backlog item · KuiReact id `nav-drawer` · layer `app` · **Navigation** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Wrapper that wraps any trigger and children inside a drawer. Manages its own open/closed state. Used as AppNav's mobile menu and also works standalone.

**Why it matters for KuiNative:** Trigger + drawer composite.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/NavDrawer.tsx` (1 file, 46 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Sol nav (standalone), Sağ drawer (cart panel) |
| Composes | Drawer (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 8 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/NavDrawer.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `trigger` | `React.ReactNode` | **yes** | — |  | same |
| `title` | `string` | no | `'Menu'` |  | same |
| `side` | `'left' \| 'right'` | no | `'left'` |  | same |
| `footer` | `React.ReactNode` | no | — |  | same |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Sol nav (standalone)

```tsx
<NavDrawer
  title="Navigation"
  side="left"
  trigger={<Button variant="outline" iconLeft={<MenuIcon />}>Open menu</Button>}
  footer={<Button variant="ghost" size="sm" fullWidth>Sign out</Button>}
>
  <nav className="space-y-1 pt-1">
    <a href="/" className="block px-3 py-2.5 rounded-lg bg-primary-subtle text-primary text-sm">Home</a>
    <a href="/products" className="block px-3 py-2.5 rounded-lg text-text-primary hover:bg-surface-overlay text-sm">Products</a>
  </nav>
</NavDrawer>
```

### Sağ drawer (cart panel)

```tsx
<NavDrawer
  title="Cart"
  side="right"
  trigger={<Button variant="outline">🛒 Cart (3)</Button>}
>
  {cartItems.map((item) => (
    <div key={item.id} className="flex justify-between text-sm py-2">
      <span>{item.name}</span><span>{item.price}</span>
    </div>
  ))}
  <Button variant="primary" fullWidth>Checkout</Button>
</NavDrawer>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `side`: 'left' · 'right' (default 'left')

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="none"` | `accessibilityRole="none"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

_No semantic color tokens detected._

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Drawer — missing → [backlog](drawer.md)

**Blocked by (roadmap):** `drawer`

**Third-party:** none

**Suggested RN libraries:** `drawer`

## Implementation Notes

Compose Drawer + menu button.

- Location: `modules/app/NavDrawer.tsx`, named export `NavDrawer` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `NavDrawerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `NavDrawer` from the `modules/app` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Sol nav (standalone), Sağ drawer (cart panel))
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens; renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
