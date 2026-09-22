# UserMenu

> Backlog item · KuiReact id `common-user-menu` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Avatar + name + role trigger. Dropdown with Profile, Settings, and Sign out items. Closes on outside click.

**Why it matters for KuiNative:** Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/user/UserMenu.tsx` (1 file, 58 LOC) |
| Public export | `@kuraykaraaslan/kui-react/common` — public (npm: root + /common) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Admin user, Custom items |
| Composes | Avatar (exists as `Avatar` + `AvatarGroup`), Button (exists as `Button`), DropdownMenu (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 4 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/common/user/UserMenu.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `user` | `SafeUser` | **yes** | — |  | same |
| `items` | `DropdownItem[]` | no | — |  | same |
| `align` | `'left' \| 'right'` | no | `'right'` |  | same |
| `onlyAvatar` | `boolean` | no | `false` |  | same |

## Variants

### Admin user

```tsx
<UserMenu user={{ userId: 'u1', email: 'admin@acme.com', userRole: 'ADMIN', userStatus: 'ACTIVE', userProfile: { name: 'Jane Doe', profilePicture: null } }} />
```

### Custom items

```tsx
<UserMenu user={authorUser} items={[
  { type: 'item', label: 'My Posts', icon: '📝' },
  { type: 'separator' },
  { type: 'item', label: 'Sign Out', icon: '↩️', danger: true },
]} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `align`: 'left' · 'right' (default 'right')

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-text-disabled`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Avatar — exists as `Avatar` + `AvatarGroup`
- Button — exists as `Button`
- DropdownMenu — missing → [backlog](../../dropdown-menu.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/common/UserMenu.tsx`, named export `UserMenu` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `UserMenuProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `UserMenu` from the `modules/domains/common` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Admin user, Custom items)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`text-disabled`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
