# Feature matrix — Timeline

> KuiReact `modules/ui/Timeline.tsx` (170 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Timeline.tsx` (added 2026-09-22 in `586b14a`; 6 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `items` ({ id, at, title, body?, icon?, tone?, meta? }), `timeZone`, `locale`, `groupByDay` (default true), `emptyMessage` (default "Nothing here yet."), `className` | ✓ | ✓ | Match |
| Ordering and grouping | newest first; day key from `Intl.DateTimeFormat` in `timeZone`, computed before render; time `hourCycle: 'h23'` | same code | Match |
| Day heading | sticky `top-0 bg-surface-base/95 backdrop-blur`, `text-xs font-medium uppercase tracking-wide` | plain row with the same text classes on `bg-surface-base`, `header` role | Adapted (RN has no `position: sticky`) |
| Item | `relative flex gap-3 pb-5 pl-1`, `h-[2.125rem]` round marker tinted by tone, `text-sm` title, `text-xs tabular-nums` time, `ml-auto` meta, `mt-1 text-sm` body | same | Match |
| Marker icon colour | tone class also sets `text-*-fg`, which the icon inherits | tone background only; the caller colours the icon (no colour inheritance on RN) | Adapted |
| Connector | on every item; `last:hidden` never matches (each item is its own parent), so the line runs past the final event | stops at the last event, as KuiReact's comment intends | Deviation (documented intent, not KuiReact's rendering) |
| Empty | `py-8 text-center text-sm text-text-secondary` | same | Match |
| Semantics | `<ol>` / `<li>`, `<time dateTime>`, markers `aria-hidden` | `list` / `listitem` roles, markers hidden from AT; no machine-readable time | Match (adapted) |
| Tests | 0 | 6 | Native-ahead |
| Showcase | Grouped by day, Empty, and ungrouped | same titles and data | Match |
