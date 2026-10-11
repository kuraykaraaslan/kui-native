# Feature matrix — SearchBar

> KuiReact `modules/ui/SearchBar.tsx` (74 LOC, 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/SearchBar.tsx` (added 2026-09-22 in `ed7a0e5`, 6 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id` (default "search"), `placeholder` (default "Search…"), `value`, `onChange(value)`, `onClear`, `className` | ✓ | ✓ | Match |
| `ref` | — | forwarded to the RN `TextInput` | Native-ahead |
| Controlled / uncontrolled | ✓ | ✓ (same logic; clear also calls `onChange('')`) | Match |
| Field | `rounded-md border border-border bg-surface-base px-3 py-2 pl-8 text-sm`, `pr-8` with text, disabled-colour placeholder | same | Match |
| Focus | `ring-2 ring-border-focus border-border-focus` | focus border + 2px outline in `border-focus` | Match (adapted) |
| Icons | 14px magnifier (`text-text-disabled`), 12px × clear button once there is text | same | Match |
| Clear button hover | `hover:text-text-primary` | — (hitSlop 10 instead) | N/A (touch) |
| Accessibility | `role="searchbox"`, "Clear search" button | `role="searchbox"` labelled by the placeholder, "Clear search" button; search return key | Match (adapted) |
| `data-testid` | `searchbar-<id>` | `testID` with the same value | Match |
| Tests | 0 | 6 | Native-ahead |
| Showcase | Default, With value, Loading state, With results count | same titles and copy | Match |
