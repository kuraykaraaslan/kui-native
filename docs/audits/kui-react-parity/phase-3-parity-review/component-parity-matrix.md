# Component parity matrix

> One row per shared component; one column per audit dimension. ● parity · ◐ partial · ○ gap/absent · — n/a. Scores (0–100) are the reviewer's per-dimension ratings used in [phase-4-scoring](../phase-4-scoring/scoring-rationale.md).

| KuiReact | KuiNative | Name | API | Variants/sizes | States | Design | Behaviour | A11y | Docs | Tests | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | Button | ● | ◐ 6/10 props | ◐ variants 4/5, sizes 3/5 | ◐ no `selected` | ◐ 60 | ◐ loading blocks press (differs) | ◐ 70 | ○ 3/12 | ○ 0/12 | MAJOR |
| Card | Card | ● | ◐ 6/10 | ◐ 2/3 | ○ no loading / interactive | ○ 35 | ◐ | ○ 40 | ○ 2/6 | ● 0/0 | MAJOR |
| Avatar | Avatar | ● | ● 4/5 | ● 5/5 names, ◐ px | ○ no status | ◐ 70 | ● (+ error fallback) | ● 75 | ○ 1/5 | ● 0/0 | MINOR |
| AvatarGroup | AvatarGroup | ● | ○ 0/3 | ○ | ○ | ○ 20 | ○ | ○ 10 | ○ | ● 0/0 | REWRITE |
| Badge | Badge | ● | ○ 2/7 | ◐ variants 5/6, sizes 0/3 | ○ no dismiss | ● 75 (md exact) | — | ◐ 60 | ○ 1/9 | ● 0/0 | MAJOR |
| Input | TextInput | ○ | ○ 4/12 | — | ○ no success/readOnly/disabled styling | ◐ 45 | ○ | ○ 35 | ○ 1/12 | ○ 0/9 | MAJOR |
| Checkbox | Checkbox | ● | ◐ 4/6 | — | ◐ no error | ◐ 55 | ◐ controlled only | ◐ 60 | ○ 1/5 | ○ 0/6 | MAJOR |
| Toggle | Switch | ○ | ○ 3/8 | ○ sizes 0/3 | ● | ○ 35 | ○ label not pressable | ◐ 45 | ○ 1/4 | ○ 0/6 | MAJOR |
| Spinner | Spinner | ● | ● 2/2 | ◐ 3/5 (md = sm bug) | — | ◐ 40 | ● | ● 80 | ◐ 1/2 | ● 0/0 | MINOR |
| EmptyState | EmptyState | ● | ◐ 4/5 (shape differs) | — | — | ◐ 45 | ◐ icon always shown | ◐ 50 | ◐ 1/2 | ● 0/0 | MAJOR |
| Skeleton | SkeletonCard | ○ | ○ 1/5 exports | ○ | ◐ | ○ 35 | ◐ faster pulse | ◐ 70 | ○ 1/6 | ● 0/0 | MAJOR |
| Modal | Modal | ● | ○ 5/13 | ○ sizes 0/3 | ○ no scroll/fullscreen | ○ 30 | ○ overflow bug | ○ 10 | ○ 1/5 | ○ 0/7 | REWRITE |

"Tests ● 0/0" means neither library tests the component — parity of absence, still a defect on both sides.

## Aggregates

| Measure | Value |
| --- | --- |
| Component names identical | 9 / 11 (Input ≠ TextInput, Toggle ≠ Switch; Skeleton module ≠ SkeletonCard file) |
| KuiReact prop names present in KuiNative (web-only props excluded: `as`, `type`, `id`, `data-testid`, `portalTarget`, `ref`) | **41 / 80 = 51.3 %** |
| Enumerated values matching (variant/size) | 22 / 38 = 57.9 % |
| Content-model mismatches (`label` vs `children`) | 2 — on the two most-used components (Button, Badge) |
| KuiReact showcase variants reproduced | 15 / 68 = 22 % |
| KuiReact test cases mirrored | 0 / 40 |
| Components forwarding `ref` | KuiReact: Button, Input, Modal (3) · KuiNative: 0 typed |
| Components spreading host props | KuiReact: 8 of 11 · KuiNative: 3 (Card, Text, TextInput) |
