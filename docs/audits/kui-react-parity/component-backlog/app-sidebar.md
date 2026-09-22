# AppSidebar

> Backlog item · KuiReact id `app-sidebar` · layer `app` · **Navigation** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Collapsible side navigation. Accepts navGroups or navItems with a built-in collapse toggle. The searchable prop adds an inline filter and a footer slot can host a user block or any content.

**Why it matters for KuiNative:** Grouped nav with badges and footer slot; KuiNative showcase already has a private Sidebar that should be promoted.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/AppSidebar.tsx` (1 file, 251 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Açık (grouped nav + footer), Arama filtreli, Daraltılmış (icon-only) |
| Composes | Badge (exists as `Badge`) |
| Used by (registry) | — |
| Usage frequency | imported by 3 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/AppSidebar.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `navGroups` | `AppSidebarNavGroup[]` | no | — |  | same |
| `navItems` | `AppSidebarNavItem[]` | no | — |  | same |
| `activeId` | `string` | no | — |  | same |
| `onSelect` | `(id: string) => void` | no | — |  | same |
| `collapsed` | `boolean` | no | — |  | same |
| `defaultCollapsed` | `boolean` | no | `false` |  | same |
| `onCollapsedChange` | `(collapsed: boolean) => void` | no | — |  | same |
| `footer` | `AppSidebarFooter` | no | — |  | same |
| `searchable` | `boolean` | no | `true` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Açık (grouped nav + footer)

```tsx
<AppSidebar
  navGroups={[
    { label: 'Main',     items: mainItems },
    { label: 'Settings', items: settingsItems },
  ]}
  activeId={activeId}
  onSelect={setActiveId}
  footer={({ collapsed }) => (
    <div className={collapsed ? 'p-3 flex items-center justify-center' : 'p-3 flex items-center gap-2'}>
      <Avatar name="Jane Doe" size="sm" status="online" />
      {!collapsed && <p className="text-xs font-semibold">Jane Doe</p>}
    </div>
  )}
/>
```

### Arama filtreli

```tsx
<AppSidebar
  navGroups={navGroups}
  activeId={activeId}
  onSelect={setActiveId}
  searchable
/>
```

### Daraltılmış (icon-only)

```tsx
<AppSidebar
  navGroups={navGroups}
  activeId={activeId}
  onSelect={setActiveId}
  defaultCollapsed
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| open / expanded | `collapsed` | visible/expanded | `accessibilityState.expanded` / modal visibility |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-current` | `accessibilityState.selected` + label suffix |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Badge — exists as `Badge`

**Blocked by (roadmap):** `R-badge`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `expo-router`

## Implementation Notes

Promote `modules/showcase/ui/Sidebar.tsx` into the library with KuiReact's `AppSidebarNavGroup/NavItem` types; render as drawer content.

- Location: `modules/app/AppSidebar.tsx`, named export `AppSidebar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AppSidebarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AppSidebar` from the `modules/app` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Açık (grouped nav + footer), Arama filtreli, Daraltılmış (icon-only))
- [ ] State **open / expanded** implemented: `accessibilityState.expanded` / modal visibility
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `primary`, `primary-subtle`, `secondary`, `surface-overlay`, `text-disabled`, `text-primary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
