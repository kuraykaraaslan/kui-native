# Feature matrix — Statistic

> KuiReact `modules/ui/Statistic.tsx` (66 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Statistic.tsx` (added 2026-09-22 in `e024908`; 4 tests, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `label`, `value`, `precision` (`toFixed` for numbers), `prefix`, `suffix`, `trend` (up / down), `trendValue`, `loading`, `className`, rest props | ✓ (`HTMLAttributes`) | ✓ (`ViewProps`) | Match |
| Layout | `text-xs font-medium` label, baseline row of `text-lg` prefix, `text-2xl font-bold tabular-nums` value, suffix | same | Match |
| Trend | arrow up / down + value, `text-xs font-semibold`, `text-success` / `text-error` | same (icon colour from the token) | Match |
| Loading | `aria-busy`, `h-7 w-24 animate-pulse rounded bg-surface-sunken` placeholder, hidden from AT | busy state, `SkeletonLine` `h-7 w-24`, hidden from AT | Match |
| Tests | 0 | 4 | Native-ahead |
| Showcase | Basic, Prefix / suffix / trend | same titles and data | Match |
