# Feature matrix — Stepper

> KuiReact `modules/ui/Stepper.tsx` (126 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Stepper.tsx` (added 2026-09-22 in `3bdedc4`, 6 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `steps` { label, description?, state? }, `orientation` (default horizontal), `className` | ✓ | ✓ | Match |
| States | complete (success + check), active (primary), error (error + ×), pending (outlined number, default) | same | Match |
| Circle | `h-8 w-8 rounded-full border-2 text-xs font-bold`, 14px icons | same | Match |
| Labels | active `font-semibold`, error `text-error-fg`, pending `text-text-disabled`; description `text-xs text-text-secondary` | same | Match |
| Horizontal | labels under circles (`whitespace-nowrap`), `h-0.5 flex-1 mx-2 mt-[-1.25rem]` connector, green after a completed step | same (`numberOfLines={1}`, `-mt-5`) | Match |
| Vertical | circles with a `w-0.5 min-h-[2rem] mt-1` rail, labels beside them, `pb-6` except the last | same; the row stretches so the rail fills it | Match |
| Accessibility | `ol` / `li`, circle `aria-label="Step n: label — state"` | `list` / `listitem` roles, same label on the circle | Match (adapted) |
| Tests | 0 | 6 | Native-ahead |
| Showcase | Horizontal, Vertical | same titles and copy | Match |
