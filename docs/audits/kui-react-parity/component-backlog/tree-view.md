# TreeView

> Backlog item · KuiReact id `tree-view` · layer `ui` · **Data Display** · Priority **Low** · Complexity **Large** · Wave 3 · Fit `direct` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Collapsible tree with keyboard navigation, selection, and aria-tree roles.

**Why it matters for KuiNative:** Recursive tree; niche on mobile.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/TreeView/index.tsx` (6 files, 849 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | File tree, Navigation menu, Flat list, Multi-select + type-ahead |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/TreeView/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `nodes` | `TreeNode[]` | **yes** | — |  | same |
| `selectedId` | `NodeId` | no | — |  | same |
| `selectedIds` | `NodeId[]` | no | — |  | same |
| `expandedIds` | `NodeId[]` | no | — |  | same |
| `defaultExpandedIds` | `NodeId[]` | no | — |  | same |
| `focusId` | `NodeId` | no | — |  | same |
| `selectionMode` | `SelectionMode` | no | `'single'` |  | same |
| `onSelect` | `(id: NodeId) => void` | no | — |  | same |
| `onSelectionChange` | `(ids: NodeId[]) => void` | no | — |  | same |
| `onExpand` | `(id: NodeId, expanded: boolean) => void` | no | — |  | same |
| `onActivate` | `(id: NodeId) => void` | no | — |  | same |
| `label` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `hideToolbar` | `boolean` | no | `false` |  | same |
| `messages` | `Partial<TreeViewMessages>` | no | — |  | same |

## Variants

### File tree

```tsx
function Demo() {
  const [sel, setSel] = useState();
  return (
    <TreeView selectedId={sel} onSelect={setSel} label="Files"
      nodes={[
        { id: 'src', label: 'src', children: [
          { id: 'Button', label: 'Button.tsx' },
        ]},
      ]}
    />
  );
}
```

### Navigation menu

```tsx
function Demo() {
  const [sel, setSel] = useState();
  return (
    <TreeView label="Settings navigation" selectedId={sel} onSelect={setSel}
      nodes={[
        { id: 'account', label: 'Account', children: [
          { id: 'profile', label: 'Profile' },
          { id: 'password', label: 'Password' },
        ]},
        { id: 'workspace', label: 'Workspace', children: [
          { id: 'general', label: 'General' },
          { id: 'billing', label: 'Billing' },
        ]},
        { id: 'integrations', label: 'Integrations' },
// …
```

### Flat list

```tsx
function Demo() {
  const [sel, setSel] = useState('ts');
  return (
    <TreeView label="Language selector" selectedId={sel} onSelect={setSel}
      nodes={[
        { id: 'ts', label: 'TypeScript' },
        { id: 'js', label: 'JavaScript' },
        { id: 'py', label: 'Python' },
        { id: 'go', label: 'Go' },
      ]}
    />
  );
}
```

### Multi-select + type-ahead

```tsx
function Demo() {
  const [ids, setIds] = useState<string[]>(['Card']);
  return (
    <TreeView
      label="Project files"
      selectionMode="multi"
      selectedIds={ids}
      onSelectionChange={setIds}
      nodes={[
        { id: 'docs', label: 'Documents', children: [
          { id: 'spec', label: 'spec.md' },
          { id: 'roadmap', label: 'roadmap.md' },
        ]},
        { id: 'src', label: 'src', children: [
// …
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
| `role="tree"` | `accessibilityRole="list"` |
| `role="treeitem"` | `accessibilityRole="button"` |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-level` | `accessibilityRole="header"` |
| `aria-multiselectable` | per-item `selected` |
| `aria-posinset` | label suffix "n of m" |
| `aria-selected` | `accessibilityState.selected` |
| `aria-setsize` | label suffix "n of m" |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Flattened FlatList with depth indentation; expand state map; `accessibilityState.expanded`.

- Location: `modules/ui/TreeView.tsx`, named export `TreeView` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TreeViewProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `TreeView` from the `modules/ui` barrel with its props type
- [ ] All 15 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (File tree, Navigation menu, Flat list, Multi-select + type-ahead)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border-focus`, `primary`, `primary-subtle`, `surface-overlay`, `text-disabled`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
