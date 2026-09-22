# SearchBar

> Backlog item · KuiReact id `search-bar` · layer `ui` · **Forms** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

role="searchbox" with search icon and clear button. Works in controlled and uncontrolled modes.

**Why it matters for KuiNative:** Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/SearchBar.tsx` (1 file, 75 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Default, With value, Loading state, With results count |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 14 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/SearchBar.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | no | `'search'` |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `placeholder` | `string` | no | `'Search…'` |  | same |
| `value` | `string` | no | — |  | same |
| `onChange` | `(value: string) => void` | no | — |  | same |
| `onClear` | `() => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
<SearchBar placeholder="Search components…" />
```

### With value

```tsx
<SearchBar value="Button" onChange={(v) => console.log(v)} />
```

### Loading state

```tsx
function Demo() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-2">
      <SearchBar value={q} onChange={(v) => { setQ(v); setLoading(true); }} />
      {loading
        ? <p className="flex items-center gap-1.5"><Spinner size="xs" /> Searching…</p>
        : q && <p>{q} — 24 results</p>}
    </div>
  );
}
```

### With results count

```tsx
function Demo() {
  const items = ['Button', 'Badge', 'Card', ...];
  const [q, setQ] = useState('');
  const filtered = q ? items.filter(n => n.toLowerCase().includes(q.toLowerCase())) : items;
  return (
    <div className="space-y-2">
      <SearchBar value={q} onChange={setQ} />
      <p className="text-xs text-text-secondary">{filtered.length} of {items.length} results</p>
      <ul>{filtered.map(name => <li key={name}>{name}</li>)}</ul>
    </div>
  );
}
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="searchbox"` | `accessibilityRole="search"` |
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
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `R-field-shell`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Input shell with search prefix icon, clear button, `returnKeyType="search"`, `onSubmitEditing`. Provide debounce like KuiReact if present.

- Location: `modules/ui/SearchBar.tsx`, named export `SearchBar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SearchBarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `SearchBar` from the `modules/ui` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Default, With value, Loading state, With results count)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `primary`, `surface-base`, `text-disabled`, `text-primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
