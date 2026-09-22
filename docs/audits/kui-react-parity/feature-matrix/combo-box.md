# Feature matrix — ComboBox

> KuiReact `modules/ui/ComboBox/` (7 files, 738 LOC: `index`, `types`, `parts/Trigger`, `parts/Listbox`, `hooks/useFilter` / `useAsync` / `useLoadMore`; 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/ComboBox/` (added 2026-09-22 in `1fe3d56`, same file layout; the hooks are the ones MultiSelect already used; 11 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `options` ({ value, label, description?, icon?, disabled? }), `value` / `onChange` (controlled or uncontrolled), `placeholder` (default "Search or select..."), `hint`, `error`, `disabled`, `required`, `clearable` (default true), `noResultsText`, `className` | ✓ | ✓ | Match |
| `onSearch` (sync or async, debounced, abortable, cached), `onLoadMore`, `debounceMs` (default 300) | ✓ | ✓, same hooks | Match |
| `virtualize` (fixed 36px rows, overscan 4, default threshold 50) | ✓ | same windowing on a `ScrollView` | Match |
| Load-more trigger | `IntersectionObserver` sentinel | list scrolled near its end | Adapted |
| Trigger | `min-h-10 rounded-md border px-3 py-1.5`, clear button, chevron, `focus-within:ring-2`, error `border-error ring-1 ring-error bg-error-subtle` | same, rings drawn as outlines (2px focus, 1px error) | Match |
| Listbox | in normal flow below the input, `max-h-60 rounded-md border bg-surface-raised py-1 shadow-lg`, skeleton rows, "No results found.", "Loading more…", selected `font-medium text-primary`, disabled `opacity-50` | same, in flow (a native `Modal` would take focus from the text field) | Match |
| Close | outside mousedown, Escape, Tab | blur (tap outside) after 150 ms so an option tap lands first | Match (adapted) |
| Keyboard | Arrow / Home / End highlight, Enter selects | — | N/A (hardware-keyboard pattern) |
| Accessibility | `combobox` with `aria-expanded` / `aria-controls` / `aria-activedescendant`, `listbox` of `option`s with `aria-selected`, error `role="alert"` | combobox input with expanded / disabled state and hint; labelled list of option buttons with selected / disabled state; error alert | Match (adapted: RN has no listbox role) |
| Tests | 0 | 11 | Native-ahead |
| Showcase | Controlled selection, Async search, Debounced async suggestions | same titles, data and copy | Match |
