# Feature matrix — DatePicker (+ DateTimePicker)

> KuiReact `modules/ui/DatePicker/` (11 files, 1421 LOC shared with DateRangePicker; 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/DatePicker/` (added 2026-09-22 in `97f78b5`: `index.tsx`, `calendar/` Calendar + MonthSelect + YearSelect, `hooks/useDateFns`, `locale/` en + tr, `parts/Trigger`, `types.ts`; panel on `Overlays/shared/AnchoredPanel`; 17 tests for the suite, 4 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `hint`, `error`, `value` (Date \| null), `onChange`, `disabled`, `required`, `min`, `max`, `disabledDates` (array or predicate), `locale` (`tr` default / `en`), `format`, `messages`, `variant` (`popover`), `className` | ✓ | ✓ | Match |
| `name` (hidden `<input>` for form submission) | ✓ | accepted, ignored | N/A (no form submission on RN) |
| Types: `DateValue`, `DateRange`, `LocaleCode`, `DisabledDates`, `DatePickerMessages`, `DatePickerLocale`, props types | ✓ (not in the ui barrel) | ✓, exported from the barrel | Native-ahead |
| Date helpers (`useDateFns`: grid, bounds, format tokens) and TR / EN locales | ✓ | same code, ported | Match |
| Trigger | `rounded-md border px-3 py-2 text-sm`, clear `h-7 w-7` button, calendar icon, error `border-error bg-error-subtle`, `focus-within:ring-2` | same; open state draws the 2px `border-focus` ring | Match (adapted: focus-within → open) |
| Error ring | `ring-1 ring-error` on top of the error border | `border-error bg-error-subtle`, no outline | Gap: no `ring-1` (visual only; border and background match) |
| Popover | `absolute z-30 mt-1 rounded-lg border bg-surface-raised shadow-lg p-1` | same, 4px below the measured trigger in a transparent RN `Modal` window | Match (adapted) |
| Calendar | `w-[15.5rem]` month grid, chevron header, month / year quick pickers, `h-8 w-8` days, selected `bg-primary`, today `ring-1 ring-inset ring-primary`, disabled `opacity-40`, Today button | same; the CSS grid is drawn as explicit 7-cell rows and the inset ring as a 1px border | Match (adapted) |
| `messages` override | merged for the trigger, but Calendar receives the raw locale, so a `today` / chevron override never applies | merged messages passed to Calendar | Deviation (KuiReact bug not reproduced) |
| Keyboard grid navigation (`useKeyboardNav`: arrows, PageUp / PageDown, Home / End) | ✓ | — | N/A (desktop keyboard pattern) |
| Close | outside mousedown, Escape | outside tap, Android back | Match (adapted) |
| Accessibility | trigger `aria-haspopup="dialog"` / `aria-expanded` / `aria-invalid`, `role="dialog"` popover, `role="grid"` with `gridcell` + `aria-selected`, hint / error via `aria-describedby`, error `role="alert"` | trigger button with expanded state, value and hint; labelled popover; day buttons labelled "22 September 2026" with selected / disabled state; error alert | Match (adapted: RN has no grid role) |
| `DateTimePicker` | stub rendering `DatePicker` | same stub | Match |
| `PresetList` | hidden placeholder (M2) | not rendered | Match (renders nothing in both) |
| Tests | 0 | 17 (suite) | Native-ahead |
| Showcase | Default, With value, Error / Disabled, Locale: Türkçe + custom messages | same titles, data and copy | Match |
