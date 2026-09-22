# AppCommandBar

> Backlog item · KuiReact id `app-command-bar` · layer `app` · **Navigation** · Priority **Low** · Complexity **Large** · Wave 3 · Fit `web-only` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Keyboard-first command palette. Opens with ⌘K; an items prop accepts custom commands while a default navigation/actions/recent set is included.

**Why it matters for KuiNative:** ⌘K palette is keyboard-first; mobile equivalent is GlobalSearch.

> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/CommandPalette/index.tsx` (13 files, 792 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `beta` · since 2025-04 |
| Showcase variants | Varsayılan komutlar, Özel items + trigger, Fuzzy search + özel gruplar |
| Composes | AlertBanner (missing), Badge (exists as `Badge`), Button (exists as `Button`), EmptyState (exists as `EmptyState`), Modal (exists as `Modal`) |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | `modules/app/CommandPalette/CommandPalette.test.tsx` (3 cases) |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/CommandPalette/index.tsx` (fallback: first exported function `CommandPalette`; registry name did not match an export). **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `items` | `CommandItem[]` | no | `DEFAULT_COMMANDS` |  | same |
| `onSelect` | `(item: CommandItem) => void` | no | — |  | same |
| `trigger` | `React.ReactNode` | no | — |  | same |
| `placeholder` | `string` | no | `'Type a command or search…'` |  | same |

## Variants

### Varsayılan komutlar

```tsx
<AppCommandBar onSelect={(item) => console.log(item.label)} />
```

### Özel items + trigger

```tsx
<AppCommandBar
  items={customItems}
  trigger={<Button variant="ghost" size="sm" iconRight={<Badge variant="neutral" size="sm">⌘K</Badge>}>Search…</Button>}
  onSelect={handleSelect}
/>
```

### Fuzzy search + özel gruplar

```tsx
// Try typing "kbd", "asgn" or "rls" to exercise the subsequence matcher.
const fuzzyItems = [
  { icon: '⌨️', label: 'Open Keyboard Shortcuts',  shortcut: '?',   category: 'Help',        keywords: ['kbd'] },
  { icon: '📚', label: 'Browse Documentation',     shortcut: 'G H', category: 'Help' },
  { icon: '🔔', label: 'Notification Preferences', shortcut: 'G N', category: 'Preferences' },
  { icon: '🛠️', label: 'Assign Reviewer to PR-42', shortcut: 'A R', category: 'Workflows',   keywords: ['asgn'] },
  { icon: '🚀', label: 'Release & Tag v1.4.0',     shortcut: 'R T', category: 'Workflows',   keywords: ['rls'] },
];

<AppCommandBar items={fuzzyItems} />
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
| `role="combobox"` | `accessibilityRole="combobox"` |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="none"` | `accessibilityRole="none"` |
| `role="option"` | review manually |
| `aria-activedescendant` | `AccessibilityInfo.setAccessibilityFocus` |
| `aria-autocomplete` | n/a |
| `aria-controls` | n/a on native |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-selected` | `accessibilityState.selected` |

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
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- AlertBanner — missing → [backlog](alert-banner.md)
- Badge — exists as `Badge`
- Button — exists as `Button`
- EmptyState — exists as `EmptyState`
- Modal — exists as `Modal`

**Blocked by (roadmap):** `alert-banner`, `R-badge`, `R-button`, `R-empty-state`, `R-modal`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Record as exception; reuse the fuzzy-search store (`useCommandStore`) inside GlobalSearch if desired.

- Location: `modules/app/AppCommandBar.tsx`, named export `AppCommandBar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `AppCommandBarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `AppCommandBar` from the `modules/app` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Varsayılan komutlar, Özel items + trigger, Fuzzy search + özel gruplar)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `surface-base`, `surface-overlay`, `surface-raised`, `text-disabled`, `text-primary`, `text-secondary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] is closed by default
  - [ ] opens on trigger click and moves focus into the dialog (Modal\
  - [ ] Escape closes the palette and returns focus to the trigger
- [ ] Prop table + usage snippet documented in the showcase entry
