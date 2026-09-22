# Feature matrix — CheckboxGroup

> KuiReact `modules/ui/CheckboxGroup.tsx` (66 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/CheckboxGroup.tsx` (added 2026-09-22 in `859211c`, 7 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `legend`, `options` { value, label }, `selected`, `onChange(next[])`, `disabled`, `error`, `className` | ✓ | ✓ | Match |
| Layout | `fieldset space-y-2`, `legend text-sm font-medium mb-2`, `flex flex-wrap gap-2` | `gap-2` column, same legend and chip row | Match (adapted) |
| Chip | `px-3 py-1.5 rounded-lg border text-sm`; selected `bg-primary-subtle border-primary text-primary` + 12px check | same | Match |
| Hover | `hover:bg-surface-overlay` on unselected chips | pressed state | Adapted |
| Disabled | `opacity-50` on every chip | same | Match |
| Error | `text-xs text-error mt-1`, `role="alert"` | same, alert role | Match |
| Accessibility | fieldset + legend, visually hidden native checkboxes | `role="group"` labelled by the legend; each chip is a checkbox with checked / disabled state | Match (adapted) |
| `data-testid` | `checkboxgroup-<value>` | `testID` with the same value | Match |
| Focus ring | `focus-within:ring-2` | — | N/A (touch) |
| Tests | 0 | 7 | Native-ahead |
| Showcase | Default, Disabled | same titles and copy | Match |
