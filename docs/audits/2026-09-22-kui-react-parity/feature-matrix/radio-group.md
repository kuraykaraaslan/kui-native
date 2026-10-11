# Feature matrix — RadioGroup

> KuiReact `modules/ui/RadioGroup.tsx` (121 LOC, 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/RadioGroup.tsx` (added 2026-09-22, 9 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `name`, `legend`, `options`, `value`, `onChange(value)` | ✓ | ✓ (`name` builds testIDs) | Match |
| `RadioOption` { value, label, hint?, icon? } | ✓ | ✓ | Match |
| `error` | error borders + `role="alert"` text | same | Match |
| `disabled` | `opacity-50` | same | Match |
| `variant` default / card | card: `rounded-lg border p-3`; selected `border-primary bg-primary/5` | card: same; selected `bg-primary-subtle` | Adapted: Tailwind's `/5` opacity modifier cannot apply to var() tokens |
| `columns` 1 / 2 / 3 | responsive grid (sm, lg) | flex-wrap at the same 640 / 1024 breakpoints | Match |
| `optionClassName` | ✓ | ✓ | Match |
| Radio visual | native 16px radio | drawn 16px circle, primary fill + dot when selected | Adapted (no native radio on RN) |
| Accessibility | fieldset / legend, native radios | `radiogroup` + `radio` roles, checked state, hints | Match |
| Showcase | Default, Disabled, Card style | same titles and copy | Match |
