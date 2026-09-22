# Gantt

> Backlog item · KuiReact id `gantt` · layer `app` · **Advanced Components** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `web-only` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

MS Project / GanttPRO / dhtmlxGantt-style project timeline. M1 ships the scale switcher (day / week / month / quarter / year), a vertical Today line, WBS tree with expand/collapse on the left panel, sticky timeline header with synchronised horizontal + vertical scroll, and absolutely-positioned task bars with a %-progress fill. M2 adds full interactivity: drag a bar to reschedule (snap to day), drag the left/right edges to resize, drag the white progress thumb to change %, and drag from the right-edge blue dot to another bar to draw an FS dependency. Dependencies render as orthogonal SVG arrows with a marker-end arrowhead; click an arrow then press Delete to remove it. M3 adds a Critical Path toggle in the toolbar — tasks on the longest dependency chain switch to var(--error) styling and their connecting arrows turn red, computed by a forward + backward longest-path pass on the dependency DAG. Hovering a bar after a short delay shows a tooltip with name, start/end, duration, owner, % complete, predecessors, and a Critical badge. M4 adds zero-duration milestones rendered as 14×14 diamonds, planned-vs-actual baseline ghost bars beneath the live bars, and weekend + holiday shading on the day + week scales. M5 adds a toolbar Export menu (PNG via SVG `<foreignObject>` round-trip, PDF via the browser print dialog, CSV via a pure-JS Blob download), drag snap that nudges drops forward to the next working day, and a resource-conflict detector that flags over-allocated owners in the WBS panel with a red triangle. M6 closes the loop with grid keyboard navigation (↑↓/Home/End/PageUp/PageDown between rows, +/− zoom, focused bar exposes a focus ring + `aria-activedescendant`), a `locale` prop that drives Intl-based month names and tooltip dates, `prefers-reduced-motion` honouring (plus a `reducedMotion` prop force-on), and automatic row virtualization above ~60 tasks. All mutations are optimistic and roll back automatically if `onTaskUpdate` / `onDependencyCreate` rejects. Internal state is owned by a per-instance Zustand store (`store.ts`).

**Why it matters for KuiNative:** Gantt chart (3k LOC); KuiEJS removed it as out of scope.

> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/Gantt/index.tsx` (27 files, 2995 LOC) |
| Public export | `@/modules/app/Gantt/index` — source-only (not exported from a barrel) |
| Registry | yes · status `beta` · since 2026-05 |
| Showcase variants | Week scale (default), Month scale, Collapsed group, Dependencies (FS + SS), Critical path (CPM), Milestones + baselines + weekends, Export + resource conflicts + working-day snap, Keyboard nav + locale + reduced motion, Interactive (drag + dependencies) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `react-dom`, `zustand` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, reduced-motion aware, portal, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/Gantt/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `tasks` | `Task[]` | **yes** | — |  | same |
| `dependencies` | `Dependency[]` | no | — |  | same |
| `baselines` | `Baseline[]` | no | — |  | same |
| `scale` | `TimeUnit` | no | — |  | same |
| `workingDays` | `number[]` | no | — |  | same |
| `holidays` | `Date[]` | no | — |  | same |
| `criticalPath` | `boolean` | no | — |  | same |
| `onTaskUpdate` | `(task: Task) => Promise<void> \| void` | no | — |  | same |
| `onDependencyCreate` | `(dep: Dependency) => Promise<void> \| void` | no | — |  | same |
| `onDependencyDelete` | `(id: string) => Promise<void> \| void` | no | — |  | same |
| `exportFormats` | `('png' \| 'pdf' \| 'csv')[]` | no | — |  | same |
| `messages` | `Partial<GanttMessages>` | no | — |  | same |
| `locale` | `string` | no | — |  | same |
| `reducedMotion` | `boolean` | no | — |  | → `useReducedMotion()` (Reanimated) |
| `onTelemetry` | `(event: GanttTelemetry) => void` | no | — |  | same |
| `ariaLabel` | `string` | no | `'Gantt chart'` |  | → `accessibilityLabel` |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Week scale (default)

```tsx
<Gantt tasks={tasks} scale="week" ariaLabel="Product launch plan" />
```

### Month scale

```tsx
<Gantt tasks={tasks} scale="month" ariaLabel="Long-range roadmap" />
```

### Collapsed group

```tsx
// Seed any task with `collapsed: true` to hide its children at first paint.
const tasks = base.map((t) => t.id === 'impl' ? { ...t, collapsed: true } : t);
<Gantt tasks={tasks} scale="week" />
```

### Dependencies (FS + SS)

```tsx
const dependencies = [
  { id: 'd-t1-t2', from: 't1', to: 't2', type: 'FS' }, // Finish-to-Start
  { id: 'd-t4-t5', from: 't4', to: 't5', type: 'SS' }, // Start-to-Start
];

<Gantt tasks={tasks} dependencies={dependencies} scale="week" />
```

### Critical path (CPM)

```tsx
// Critical-path highlight uses a forward + backward longest-path pass
// over the dependency DAG. Tasks with zero float switch to error styling
// and their connecting arrows turn red. The toolbar toggle lets users
// switch it on / off; passing the prop sets the initial value.
<Gantt
  tasks={tasks}
  dependencies={dependencies}
  scale="week"
  criticalPath
/>
```

### Milestones + baselines + weekends

```tsx
// Milestones (zero-duration tasks rendered as diamonds), planned-vs-actual
// baseline ghost bars, and weekend / holiday shading on the day + week scales.
const baselines: Baseline[] = [
  { taskId: 't2', start: new Date('2026-05-01'), end: new Date('2026-05-07') },
  { taskId: 't5', start: new Date('2026-05-10'), end: new Date('2026-05-20') },
];

<Gantt
  tasks={tasks}                // include some { isMilestone: true } entries
  dependencies={dependencies}
  baselines={baselines}
  workingDays={[1, 2, 3, 4, 5]} // Mon-Fri; Sat+Sun shaded
  holidays={[new Date('2026-05-05')]}
  scale="week"
// …
```

### Export + resource conflicts + working-day snap

```tsx
// M5 wires three things at once:
//  1. exportFormats opens the toolbar Export menu (PNG / PDF / CSV).
//  2. Tasks sharing an owner that overlap in time get a red ⚠ in the WBS
//     owner column (resource over-allocation).
//  3. workingDays makes drag snap forward to the next working day, so a
//     drop on a weekend lands on Monday.
const tasks: Task[] = [
  { id: 'r1', name: 'Frontend rebuild', start: ..., end: ..., owner: 'Eve M.' },
  { id: 'r2', name: 'Auth migration',   start: ..., end: ..., owner: 'Eve M.' }, // overlaps r1
  { id: 'r3', name: 'Reporting',        start: ..., end: ..., owner: 'Eve M.' }, // overlaps r2
];

<Gantt
  tasks={tasks}
// …
```

### Keyboard nav + locale + reduced motion

```tsx
// M6 adds:
//  - Grid keyboard nav from the Gantt root: ↑↓ between rows, Home/End,
//    PageUp/PageDown (5 rows), and +/− to zoom in/out. Focused bar gets a
//    border-focus ring and is announced via aria-activedescendant.
//  - locale prop drives Intl.DateTimeFormat for month names in the header
//    and date formatting in the hover tooltip.
//  - reducedMotion={true} or the OS prefers-reduced-motion media query
//    suppresses every Tailwind transition/animation under the root.
//  - Row virtualization kicks in automatically above ~60 tasks — only the
//    visible ± buffer slice renders, so 1000+ rows stay smooth.
<Gantt
  tasks={tasks}
  dependencies={deps}
  locale="tr-TR"               // Turkish month names / tooltip dates
// …
```

### Interactive (drag + dependencies)

```tsx
const [tasks, setTasks] = useState<Task[]>(initial);
const [deps,  setDeps]  = useState<Dependency[]>([]);

<Gantt
  tasks={tasks}
  dependencies={deps}
  scale="week"
  onTaskUpdate={(t) => setTasks((prev) => prev.map((p) => (p.id === t.id ? t : p)))}
  onDependencyCreate={(d) => setDeps((prev) => [...prev, d])}
  onDependencyDelete={(id) => setDeps((prev) => prev.filter((d) => d.id !== id))}
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
| `role="button"` | `accessibilityRole="button"` |
| `role="columnheader"` | `accessibilityRole="header"` |
| `role="grid"` | `accessibilityRole="grid"` |
| `role="gridcell"` | review manually |
| `role="menu"` | `accessibilityRole="menu"` |
| `role="menuitem"` | `accessibilityRole="menuitem"` |
| `role="row"` | review manually |
| `role="tab"` | `accessibilityRole="tab"` |
| `role="tablist"` | `accessibilityRole="tablist"` |
| `role="tooltip"` | review manually |
| `aria-activedescendant` | `AccessibilityInfo.setAccessibilityFocus` |
| `aria-colindex` | review manually |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-pressed` | `accessibilityState.selected` |
| `aria-rowindex` | review manually |
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
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `react-dom` → root overlay host / RN Modal, `zustand`

## Implementation Notes

Record as exception.

- Location: `modules/app/Gantt.tsx`, named export `Gantt` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `GanttProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Gantt` from the `modules/app` barrel with its props type
- [ ] All 17 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 9 KuiReact variants (Week scale (default), Month scale, Collapsed group, Dependencies (FS + SS), Critical path (CPM), Milestones + baselines + weekends, Export + resource conflicts + working-day snap, Keyboard nav + locale + reduced motion, Interactive (drag + dependencies))
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-raised`, `surface-overlay`, `text-primary`, `text-secondary`, `border`, `border-focus`, `primary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
