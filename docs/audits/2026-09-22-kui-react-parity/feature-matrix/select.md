# Feature matrix — Select

> KuiReact `modules/ui/Select.tsx` (226 LOC, 10 tests, 5 showcase variants) ↔ KuiNative `modules/ui/Select.tsx` (added 2026-09-22, 12 tests, 5 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `options` ({ value, label, icon? }), `placeholder`, `hint`, `error`, `disabled`, `required`, `searchable`, `className` | ✓ | ✓ (`id` builds testIDs) | Match |
| `value` / `onChange` | DOM change event | `onChange(value)` | Adapted (value callback, approved) |
| Trigger | `rounded-md border px-3 py-2 text-sm`, error / disabled looks | same | Match |
| Custom mode (icons or searchable) | trigger + chevron, inline listbox below (normal flow) | same | Match |
| Plain mode | native `<select>` (`appearance-none`, no chevron) | same chevron-less trigger opening the inline listbox | Adapted: RN has no `<select>` |
| Listbox panel | `bg-surface-raised shadow-lg`, `py-1`, `max-h-48` scroll, `px-3 py-2` options, primary + check when selected, placeholder row, "No results found." | same | Match |
| Search box | `px-3 py-1.5 text-sm`, "Search…" | same, auto-focused | Match |
| Close on outside click / Escape | ✓ | trigger press toggles; select closes | Gap: no outside-tap detection for an inline panel |
| Accessibility | combobox + listbox + options | combobox (expanded state, value text) + option buttons (selected state) | Match (adapted) |
| Tests | 10 | 12 (KuiReact's cases mapped onto the combobox) | Match |
| Showcase | Controlled, With icons, Validation states, With countries, Searchable | same titles, data and copy (`countries-list` at KuiReact's version) | Match |
