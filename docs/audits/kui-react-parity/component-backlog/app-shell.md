# AppShell

> Backlog item · KuiReact id `app-shell` · layer `app` · **Layout** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Full-screen layout wrapper with logo, sidebar and topbar slots. Sidebar renders as an aside on desktop and opens via a drawer on mobile.

**Why it matters for KuiNative:** Root layout (sidebar + top bar + content). On native this maps to navigator layouts.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/AppShell.tsx` (1 file, 93 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Sidebar + topbar + content, Sadece topbar (sidebar yok) |
| Composes | Drawer (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 4 production file(s), 2 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/AppShell.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `logo` | `React.ReactNode` | no | — |  | same |
| `compactLogo` | `React.ReactNode` | no | — |  | same |
| `sidebarCollapsed` | `boolean` | no | `false` |  | same |
| `mobileSidebarTitle` | `string` | no | `'Navigation'` |  | same |
| `sidebar` | `React.ReactNode` | no | — |  | same |
| `topbar` | `React.ReactNode` | no | — |  | same |
| `asideClassName` | `string` | no | — |  | same |
| `headerClassName` | `string` | no | — |  | same |
| `mainClassName` | `string` | no | — |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `className` | `string` | no | — |  | keep (NativeWind) |

**Also accepts:** `React.HTMLAttributes<HTMLDivElement>` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Sidebar + topbar + content

```tsx
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

<AppShell
  logo={<span className="font-black text-primary">Acme</span>}
  compactLogo={<span className="font-black text-primary">A</span>}
  sidebarCollapsed={sidebarCollapsed}
  sidebar={
    <AppSidebar
      navGroups={navGroups}
      activeId={activeId}
      onSelect={setActiveId}
      collapsed={sidebarCollapsed}
      onCollapsedChange={setSidebarCollapsed}
      searchable
// …
```

### Sadece topbar (sidebar yok)

```tsx
<AppShell
  topbar={
    <AppTopBar logo={<span className="font-bold text-primary">Acme</span>}>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="primary" size="sm">New project</Button>
        <UserMenu user={currentUser} />
      </div>
    </AppTopBar>
  }
>
  {/* page content */}
</AppShell>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

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
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Drawer — missing → [backlog](drawer.md)

**Blocked by (roadmap):** `drawer`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `expo-router`, `@react-navigation/drawer`

## Implementation Notes

Provide expo-router layout templates (Drawer/Tabs) styled with tokens rather than a monolithic component.

- Location: `modules/app/AppShell.tsx`, named export `AppShell` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AppShellProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AppShell` from the `modules/app` barrel with its props type
- [ ] All 11 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Sidebar + topbar + content, Sadece topbar (sidebar yok))
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-base`, `surface-raised`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
