# KanbanBoard

> Backlog item · KuiReact id `kanban-board` · layer `app` · **Advanced Components** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Trello / Linear-style kanban board. M1 ships HTML5-native drag and drop between columns with an inline drop-position indicator (thin line between cards) and full optimistic-UI rewind on rejected onCardMove. Use the canMove hook to gate transitions client-side, or throw from onCardMove to revert. Future milestones: column reorder + collapse + WIP limits (M2), swimlanes + filters + search (M3), inline edit + bulk select + card detail panel (M4), keyboard nav + ARIA announcements (M5), virtualization + auto-archive + dependencies (M6). Pixel-identical EJS sibling at modules/app/KanbanBoard/KanbanBoard.ejs.

**Why it matters for KuiNative:** Drag-and-drop board.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/KanbanBoard/index.tsx` (13 files, 775 LOC) |
| Public export | `@/modules/app/KanbanBoard/index` — source-only (not exported from a barrel) |
| Registry | yes · status `beta` · since 2026-05 |
| Showcase variants | Three columns (basic), canMove validation (no exit from Done), Async onCardMove with rollback |
| Composes | Card (exists as `Card`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

_Props could not be extracted statically (component is a barrel/re-export or uses a non-standard signature). Read `kui-react/modules/app/KanbanBoard/index.tsx` and fill this section before implementation._

## Variants

### Three columns (basic)

```tsx
const columns = [
  { id: 'todo',  title: 'To Do' },
  { id: 'doing', title: 'In Progress' },
  { id: 'done',  title: 'Done' },
];
const [cards, setCards] = useState(initialCards);
<KanbanBoard
  columns={columns}
  cards={cards}
  onCardMove={(card, from, to) =>
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, columnId: to } : c)),
    )
  }
// …
```

### canMove validation (no exit from Done)

```tsx
<KanbanBoard
  columns={columns}
  cards={cards}
  canMove={(card, from, to) => from !== 'done' || to === 'done'}
  onCardMove={persist}
/>
```

### Async onCardMove with rollback

```tsx
<KanbanBoard
  columns={columns}
  cards={cards}
  onCardMove={async (card, from, to) => {
    const res = await fetch('/api/move', { method: 'POST', body: JSON.stringify({ card, to }) });
    // Throw to revert the optimistic update.
    if (!res.ok) throw new Error('Server rejected');
    setCards(next);
  }}
/>
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
| `role="application"` | review manually |
| `role="list"` | `accessibilityRole="list"` |
| `role="listitem"` | review manually |
| `role="region"` | review manually |
| `aria-dropeffect` | review manually |
| `aria-grabbed` | review manually |
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
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-strong` | #d1d5db | #475569 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Card — exists as `Card`

**Blocked by (roadmap):** `R-card`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `react-native-draggable-flatlist`

## Implementation Notes

Horizontal paged columns with `react-native-draggable-flatlist`.

- Location: `modules/app/KanbanBoard.tsx`, named export `KanbanBoard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `KanbanBoardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `KanbanBoard` from the `modules/app` barrel with its props type
- [ ] Showcase demos for all 3 KuiReact variants (Three columns (basic), canMove validation (no exit from Done), Async onCardMove with rollback)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-raised`, `surface-overlay`, `text-primary`, `text-secondary`, `text-disabled`, `border`, `border-strong`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
