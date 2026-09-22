# Feature matrix — MultiSelect

> KuiReact `modules/ui/MultiSelect.tsx` (283 LOC + the shared `ComboBox/hooks`; 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/MultiSelect.tsx` (added 2026-09-22 in `6e76a56`, with `ComboBox/hooks` ported and the panel on `Overlays/shared/AnchoredPanel`; 11 tests, 4 demos).
> **Status: PARITY_COMPLETE** (was PARITY_MINOR_GAPS; error ring added in `5630391`)

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `options` ({ value, label, icon?, disabled? }), `value`, `onChange(values)`, `placeholder` (default "Select…"), `hint`, `error`, `disabled`, `searchable`, `className` | ✓ | ✓ | Match |
| `onSearch` (debounced, abortable), `onLoadMore`, `debounceMs` (default 300) | ✓ via `useAsync` / `useFilter` / `useLoadMore` | ✓, same hooks ported | Match |
| Load-more trigger | `IntersectionObserver` sentinel | list scrolled near its end | Adapted |
| Trigger | `min-h-[2.5rem] rounded-md border px-3 py-1.5`, chips `rounded-full bg-primary-subtle text-primary text-xs px-2 py-0.5` with a remove button, chevron up / down | same | Match |
| Error look | `border-error ring-1 ring-error bg-error-subtle` | same (`ring-1` drawn as a 1px `error` outline, `5630391`) | Match |
| Focus / open look | `focus-visible:ring-2 ring-border-focus` | `border-border-focus` while open | Adapted |
| Panel | `mt-1 rounded-md border bg-surface-raised shadow-lg`, search box `p-2 border-b`, `py-1 max-h-48` list, checkbox rows, skeleton rows while loading, "No results found.", "Loading more…" | same, in a transparent RN `Modal` window at the trigger's width | Match (adapted) |
| Close | outside mousedown, Escape | outside tap, Android back | Match (adapted) |
| Keyboard | Enter / Space toggle the panel and options | — | N/A (desktop keyboard pattern) |
| Accessibility | combobox + `aria-multiselectable` listbox of options, hint / error via `aria-describedby`, error `role="alert"` | combobox (expanded state, selected labels as value, hint / error as hint) + a list of checkbox rows, error alert | Match (adapted: RN has no multiselectable listbox) |
| Tests | 0 | 11 | Native-ahead |
| Showcase | Controlled, With error, With countries, Searchable | same titles, data and copy | Match |
