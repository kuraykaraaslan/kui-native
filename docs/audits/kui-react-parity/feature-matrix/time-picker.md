# Feature matrix — TimePicker

> KuiReact `modules/ui/DateRangePicker.tsx` (`TimePicker`, 80 LOC inline beside the DateRangePicker re-export; 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/TimePicker.tsx` (added 2026-09-22 in `248e523`, panel on `Overlays/shared/AnchoredPanel`; 5 tests, used by the DateRangePicker "Time picker" demo).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `hint`, `error`, `value` ("HH:MM"), `onChange(time)`, `disabled`, `required`, `step` (default 60 s), `className` | ✓ | ✓ | Match |
| Field | native `<input type="time">`, `rounded-md border px-3 py-2 text-sm`, error `border-error ring-1 ring-error bg-error-subtle`, `focus-visible:ring-2` | same-looking pressable field showing "HH:MM" (or "--:--"); error adds a 1px `error` outline, open adds the 2px `border-focus` ring | Match (adapted) |
| Picking | browser time picker | anchored panel with hour (00–23) and minute columns; minutes step by `step / 60`; the selected row is centred when the column opens | Adapted (RN has no time input) |
| Required marker | `*` plus sr-only "(required)" | `Label required` + "required" in the accessible name | Match (adapted) |
| Accessibility | `aria-invalid`, hint / error via `aria-describedby`, error `role="alert"` | button with value, expanded / disabled state and hint; labelled hour / minute lists of selectable buttons; error alert | Match (adapted) |
| Close | native picker | outside tap, Android back | Adapted |
| Tests | 0 | 5 | Native-ahead |
| Showcase | Default, Required / error (registry `time-picker`) | not yet a showcase entry; only KuiReact's DateRangePicker "Time picker" demo is reproduced | Gap: 2 demos missing |
