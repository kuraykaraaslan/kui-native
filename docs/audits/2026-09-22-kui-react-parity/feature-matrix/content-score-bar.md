# Feature matrix — ContentScoreBar

> KuiReact `modules/ui/ContentScoreBar.tsx` (107 LOC, 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/ContentScoreBar.tsx` (added 2026-09-22 in `08c1c32`; 3 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `value`, `rules` ({ label, check, points, hint? }), `label`, `className`; `ScoreRule` type | ✓ | ✓ | Match |
| Scoring | earned / total points, rounded %; Good ≥ 70, Fair ≥ 40, else Poor | same | Match |
| Card | `rounded-lg border p-3 space-y-2` tinted by tier (`bg-*-subtle`, `border-*`), tier dot, uppercase label, tier word + `text-sm font-bold tabular-nums` percentage | same | Match |
| Bar | `h-1.5 rounded-full bg-surface-sunken` track, tier-coloured fill | same | Match |
| Motion | `transition-colors duration-300` on the card, `transition-all duration-500` on the fill | tier and width change instantly | Adapted (decorative motion) |
| Rule chips | `rounded-full px-2 py-0.5 text-xs font-medium`, passed = tier colours + check icon, failed = `bg-surface-sunken text-text-disabled`; `title` = hint | same look; hint as the chip's accessibility hint | Match (adapted: no tooltips on touch) |
| Footer | "N / M rules passed" | same | Match |
| Accessibility | percentage `aria-label` "{label}: N%"; no progressbar semantics | same label, plus a `progressbar` with min / max / now and a pass / fail label per chip | Native-ahead |
| Tests | 0 | 3 | Native-ahead |
| Showcase | Live evaluation, All tiers, Password strength | same titles, rules and copy | Match |
