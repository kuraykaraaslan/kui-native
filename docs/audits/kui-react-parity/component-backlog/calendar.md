# Calendar

> Backlog item · KuiReact id `calendar` · layer `app` · **Advanced Components** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Month / week / day / agenda / resource calendar with view switcher, full keyboard nav (PageUp/Down + T + arrow keys for day-step), per-event color and icon, all-day bars + timed pills, TR/EN locales, full interactions (anchored popover, drag-move, edge-resize, drag-create), in-house RRULE expansion (FREQ/INTERVAL/COUNT/UNTIL/BYDAY + exceptions), multi-calendar overlay with per-calendar visibility legend, ResourceView lanes with O(n²) conflict highlighting, agenda list (search + date grouping) and a composable MiniCalendar sidebar. WAI-ARIA grid pattern with live-region nav announcements ("Showing May 2026") and event-count cell labels ("Tuesday May 12, 3 events"). Optional Intl.DateTimeFormat-based time formatting for locale-aware clocks.

**Why it matters for KuiNative:** Month/week/day calendar (3.1k LOC).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/Calendar/index.tsx` (27 files, 3137 LOC) |
| Public export | `@/modules/app/Calendar/index` — source-only (not exported from a barrel) |
| Registry | yes · status `beta` · since 2026-05 |
| Showcase variants | Month view — Türkçe, Week view — working hours shading, Day view — English, Recurring — RRULE expansion, Interactive — drag, resize, popover, Resource view — rooms with conflict highlight, Multi-calendar overlay — toggle visibility, Agenda view — date-grouped + search, MiniCalendar sidebar — jumps the main view to picked date |
| Composes | EventCard (missing), SkipLink + LiveRegion (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/fontawesome-svg-core`, `react-dom`, `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `zustand` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, reduced-motion aware, portal, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/Calendar/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `events` | `Event[]` | **yes** | — |  | same |
| `view` | `View` | no | — |  | same |
| `defaultDate` | `Date` | no | — |  | same |
| `onViewChange` | `(v: View) => void` | no | — |  | same |
| `onDateChange` | `(d: Date) => void` | no | — |  | same |
| `onEventClick` | `(e: Event) => void` | no | — |  | same |
| `onEventCreate` | `(range: { start: Date; end: Date }) => void \| Promise<void>` | no | — |  | same |
| `onEventUpdate` | `(event: Event) => void \| Promise<void>` | no | — |  | same |
| `onEventDelete` | `(id: string) => void \| Promise<void>` | no | — |  | same |
| `resources` | `Resource[]` | no | — |  | same |
| `calendars` | `CalendarSource[]` | no | — |  | same |
| `onCalendarToggle` | `(calendarId: string, visible: boolean) => void` | no | — |  | same |
| `hideCalendarLegend` | `boolean` | no | — |  | same |
| `recurrence` | `boolean` | no | — |  | same |
| `locale` | `string` | no | — |  | same |
| `messages` | `Partial<CalendarMessages>` | no | — |  | same |
| `workingHours` | `WorkingHours` | no | — |  | same |
| `slotMinutes` | `5 \| 15 \| 30 \| 60` | no | — |  | same |
| `reducedMotion` | `boolean` | no | — |  | → `useReducedMotion()` (Reanimated) |
| `timezone` | `string` | no | — |  | same |
| `onTelemetry` | `(e: CalendarTelemetry) => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Month view — Türkçe

```tsx
<Calendar
  events={events}
  view="month"
  defaultDate={new Date(2026, 4, 13)}
  onViewChange={setView}
  locale="tr"
/>
```

### Week view — working hours shading

```tsx
<Calendar
  events={events}
  view="week"
  defaultDate={new Date(2026, 4, 13)}
  onViewChange={setView}
  locale="tr"
  workingHours={{ start: 9, end: 18, days: [1,2,3,4,5] }}
/>
```

### Day view — English

```tsx
<Calendar
  events={events}
  view="day"
  defaultDate={new Date(2026, 4, 13)}
  onViewChange={setView}
  locale="en"
  workingHours={{ start: 9, end: 18, days: [1,2,3,4,5] }}
/>
```

### Recurring — RRULE expansion

```tsx
// Lazy in-house RRULE expander — FREQ + INTERVAL + COUNT + UNTIL + BYDAY.
const events: Event[] = [
  {
    id: 'standup',
    title: 'Daily standup',
    start: new Date(2026, 4, 11, 9, 30),
    end:   new Date(2026, 4, 11, 9, 45),
    rrule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;COUNT=20',
    exceptions: [new Date(2026, 4, 13)], // skip team off-site
  },
  {
    id: 'coffee',
    title: 'Coffee with Ada',
    start: new Date(2026, 4, 12, 8, 30),
// …
```

### Interactive — drag, resize, popover

```tsx
<Calendar
  events={events}
  view="week"
  defaultDate={new Date(2026, 4, 13)}
  slotMinutes={30}
  workingHours={{ start: 9, end: 18, days: [1, 2, 3, 4, 5] }}
  onEventCreate={({ start, end }) =>
    setEvents((prev) => [...prev, { id: `n${Date.now()}`, title: 'New event', start, end }])
  }
  onEventUpdate={(updated) =>
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
  }
  onEventDelete={(id) =>
    setEvents((prev) => prev.filter((e) => e.id !== id))
// …
```

### Resource view — rooms with conflict highlight

```tsx
const resources = [
  { id: 'room-a', name: 'Studio A',  color: 'primary' },
  { id: 'room-b', name: 'Studio B',  color: 'success' },
  { id: 'room-c', name: 'Boardroom', color: 'warning' },
];
const events = [
  { id: 'r1', title: 'Sprint planning',
    start: new Date(2026, 4, 13,  9, 0), end: new Date(2026, 4, 13, 11, 0),
    resourceId: 'room-a' },
  { id: 'r2', title: 'Design crit',  // overlaps r1 → ring-error
    start: new Date(2026, 4, 13, 10, 30), end: new Date(2026, 4, 13, 12, 0),
    resourceId: 'room-a' },
  // …
];
// …
```

### Multi-calendar overlay — toggle visibility

```tsx
const calendars = [
  { id: 'work',     name: 'Work',     color: 'primary' },
  { id: 'personal', name: 'Personal', color: 'success' },
  { id: 'family',   name: 'Family',   color: 'warning' },
];
const events = [
  { id: 'm1', title: 'Design sync',     start: ..., end: ..., calendarId: 'work' },
  { id: 'm2', title: 'Yoga',            start: ..., end: ..., calendarId: 'personal' },
  { id: 'm3', title: 'Dinner — parents', start: ..., end: ..., calendarId: 'family' },
];

<Calendar
  events={events}
  view="week"
// …
```

### Agenda view — date-grouped + search

```tsx
<Calendar
  events={events}
  view="agenda"
  defaultDate={new Date(2026, 4, 13)}
  onViewChange={setView}
  locale="en"
/>
```

### MiniCalendar sidebar — jumps the main view to picked date

```tsx
import { Calendar, MiniCalendar } from '@/modules/app/Calendar';

const [date, setDate] = useState(new Date(2026, 4, 13));
const [view, setView] = useState<View>('week');

<div className="grid grid-cols-[15rem_1fr] gap-3">
  <MiniCalendar
    value={date}
    onChange={(d) => { setDate(d); setView('day'); }}
    locale="en"
  />
  <Calendar
    events={events}
    view={view}
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
| `role="application"` | review manually |
| `role="columnheader"` | `accessibilityRole="header"` |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `role="grid"` | `accessibilityRole="grid"` |
| `role="gridcell"` | review manually |
| `role="group"` | review manually |
| `role="region"` | review manually |
| `role="row"` | review manually |
| `role="separator"` | review manually |
| `role="status"` | `accessibilityRole="summary"` |
| `role="switch"` | `accessibilityRole="switch"` |
| `role="tab"` | `accessibilityRole="tab"` |
| `role="tablist"` | `accessibilityRole="tablist"` |
| `aria-atomic` | announce full message |
| `aria-checked` | `accessibilityState.checked` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-labelledby` | `accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |
| `aria-modal` | `accessibilityViewIsModal` |
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
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- EventCard — missing → [backlog](domains/event/event-card.md)
- SkipLink + LiveRegion — missing → [backlog](skip-link.md)

**Blocked by (roadmap):** `event-card`, `skip-link`

**Third-party:** `@fortawesome/fontawesome-svg-core`, `react-dom` → root overlay host / RN Modal, `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `zustand`

## Implementation Notes

Port views onto FlatList grids or evaluate `react-native-calendars`.

- Location: `modules/app/Calendar.tsx`, named export `Calendar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `CalendarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Calendar` from the `modules/app` barrel with its props type
- [ ] All 22 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 9 KuiReact variants (Month view — Türkçe, Week view — working hours shading, Day view — English, Recurring — RRULE expansion, Interactive — drag, resize, popover, Resource view — rooms with conflict highlight, Multi-calendar overlay — toggle visibility, Agenda view — date-grouped + search, MiniCalendar sidebar — jumps the main view to picked date)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`primary`, `primary-fg`, `success`, `success-fg`, `warning`, `error`, `info`, `secondary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
