# Feature matrix — DiffViewer

> KuiReact `modules/ui/DiffViewer/` (12 files, 841 LOC: `index.tsx`, `types.ts`, `hooks/useDiff` + `useScrollSync` + `useSyntaxHighlight` (M2 stub), `parts/` UnifiedView, SplitView, DiffLine, HunkHeader and the M3–M4 stubs ImageDiff, JsonDiff, LineComment; 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/DiffViewer/` (added 2026-09-22 in `1466d8c`: `index.tsx` with the unified / split views, `types.ts` and `hooks/useDiff` ported unchanged, `parts/DiffLine`; 9 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `oldText`, `newText`, `mode` (`unified` default / `split`), `context` (3), `collapsible`, `language`, `className` | ✓ | ✓ | Match |
| `language` | only written to `data-language` (syntax highlight is M2) | accepted, unused | Match (inactive in both) |
| Diff engine (`useDiff`: LCS line diff, hunk grouping, context windowing) and types (`Hunk`, `Change`, `ChangeType`, `DiffMode`) | ✓ | same code; `useDiff` also exported | Match (Native-ahead export) |
| Frame | `w-full rounded-md border bg-surface-base overflow-hidden` | same | Match |
| Hunk header | `@@ -a,b +c,d @@` in `bg-surface-overlay font-mono text-xs text-text-secondary`, `role="separator"` labelled "Hunk at line n" | same text and classes, labelled | Match (adapted: RN has no separator role) |
| Lines | `grid-cols-[3rem_3rem_1rem_1fr]` (split: `3rem_1rem_1fr`), old / new gutters, `+` / `-` sign, add `bg-success-subtle` / remove `bg-error-subtle` with a 2px left border, `whitespace-pre` content, `leading-5` mono | fixed-width flex cells with the same widths, tints, borders and signs; long lines scroll sideways | Match (adapted) |
| Split view | two panes (`grid-cols-2`), placeholder rows opposite adds / removes, scroll kept in sync (`useScrollSync`) | two panes, same placeholders, horizontal scroll synced | Match (adapted) |
| Collapsible context | leading / trailing unchanged runs folded under "Show N more line(s)" (+ icon) | same copy and look | Match |
| No changes | "No changes." | same | Match |
| M2–M5 (syntax highlight, review comments, JSON / image diff, keyboard J/K nav, virtualisation) | stubs / TODO | not ported | Match (inactive in both) |
| Accessibility | `role="region"` "Unified diff" / "Split diff", gutter cells labelled "Old line n" / "New line n", sign hidden | panes labelled "Unified diff" / "Split diff"; each line is one accessible element labelled with its change type, line numbers and text; placeholders hidden | Match (adapted) |
| Tests | 0 | 9 | Native-ahead |
| Showcase | Unified (default), Split (yan yana), With context=1, Collapsible unchanged context | same titles and samples | Match |
