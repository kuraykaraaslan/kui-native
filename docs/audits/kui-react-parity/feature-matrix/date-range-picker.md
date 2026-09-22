# Feature matrix — DateRangePicker

> KuiReact `modules/ui/DatePicker/index.tsx` (`DateRangePicker`; shares the 1421-LOC DatePicker suite; 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/DatePicker/index.tsx` (added 2026-09-22 in `97f78b5`, same Calendar and Trigger as DatePicker; covered by the suite's 17 tests, 3 demos).
> **Status: PARITY_COMPLETE** (was PARITY_MINOR_GAPS; shared-trigger error ring added in `02d510b`)

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Common picker props (`id`, `label`, `hint`, `error`, `disabled`, `required`, `min`, `max`, `disabledDates`, `locale`, `format`, `messages`, `variant`, `className`), `value: DateRange \| null`, `onChange(range)` | ✓ | ✓ | Match |
| Selection | two taps: start, then end; tapping before the start or after a complete range restarts; closes on the end date | same logic | Match |
| Trigger text | "start  →  end" with the placeholder for a missing side; clear resets both | same | Match |
| Popover | `flex` row of two Calendars (left hides next, right hides previous) | same, but the row wraps (max width = screen − 16px), so the months stack on a phone | Adapted |
| In-range highlight | not implemented (M2 TODO); start and end drawn as selected | same | Match |
| `messages` override | Calendar receives the raw locale | merged messages passed to Calendar | Deviation (KuiReact bug not reproduced) |
| Error look | shared Trigger: `border-error ring-1 ring-error bg-error-subtle` | shared Trigger, same (1px `error` outline, `02d510b`) | Match |
| Label | `<span>` (no `htmlFor`) | `Label` pressable, opens the panel | Match (adapted) |
| Keyboard grid navigation | ✓ | — | N/A (desktop keyboard pattern) |
| Close | outside mousedown, Escape | outside tap, Android back | Match (adapted) |
| Tests | 0 | shared suite (17) | Native-ahead |
| Showcase | Date range, With value (EN locale), Time picker | same titles and copy (the Time picker demo uses the new `TimePicker`) | Match |
