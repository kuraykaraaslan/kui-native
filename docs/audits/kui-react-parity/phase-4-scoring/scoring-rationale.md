# Scoring rationale

> Scope: KuiReact ui-layer atoms, molecules and organisms (62 components). Re-scored 2026-09-22 through commit `599c8a1`, with the same formulas as the earlier passes (in git history).

## 1. Component Coverage — 45

21 / 62 exist (33.9 %); usage-weighted 370 / 476 (77.7 %). 0.6 × 33.9 + 0.4 × 77.7 = 51.4, minus the standing 6-point usage correction → **45**.

## 2. API Consistency — 95

| Input | Value |
| --- | --- |
| KuiReact prop names present (21 shared ids; web-only props excluded; `onClick` → `onPress` counted) | 143 / 146 = 97.9 % |
| Component names identical | 21 / 21 (Input and Toggle are now the primary names) |
| Enumerated values matching | 100 % (`danger`, `neutral`, Badge sizes added) |

Base 0.5 × 97.9 + 0.2 × 100 + 0.3 × 100 = 98.95. The three reported misses are not real gaps: Input's `maxLength` arrives through React Native's own `TextInputProps`, and Modal's `closeOnRouteChange` / `reducedMotion` are stubs in KuiReact. −4 for Label and a few older components still lacking rest props / ref → **95**.

## 3. Visual Consistency — 85

Per-component ratings: Button 95 · Card 95 · Avatar 95 · AvatarGroup 90 · Badge 95 · Input 90 · Checkbox 90 · Toggle 90 · Spinner 60 · EmptyState 90 · Skeleton 90 · Modal 85 · Label 95 · Separator 100 · AlertBanner 95 · RadioGroup 90 · Textarea 95 · TabGroup 90 · Progress 95 · Select 90 · Drawer 90 · Toast 90. Mean 1995 / 22 = 90.7, −5 for the system font → **85**. Ratings compare class lists against KuiReact source; no screenshots yet.

## 4. Design Token Alignment — 90

Colours 100 (50 %) · token usage per component 95 (30 %) · typography / shadow / motion 60 (20 %) → **90**.

## 5. Accessibility Alignment — 80

The last open defect from the first audit (form errors not announced) is fixed: Input, Checkbox, Textarea, Select and RadioGroup errors use alert roles and live regions and become the field's accessibility hint. Open: no focus styles for RN-web, no reusable announce helper. → **80**.

## 6. Documentation Alignment — 63

Showcase variants reproduced verbatim: 102 / 104 (98 %) → 39.2 (40 %) · usage snippets 15 · prop tables / registry 0 · architecture docs 3 · accuracy 6 → **63**.

## 7. Testing Alignment — 55

22 suites, 278 tests covering every component; KuiReact's own cases ported for Button, Modal, Toggle, Checkbox, Input, TabGroup, Select and Drawer. Missing: CI, visual regression → **55**.

## 8. Developer Experience Alignment — 42

Installable 0 (25 %) · same names 90 (25 %) · types 90 (15 %) · theming 20 (15 %) · tooling 15 (20 %) → **42**.

## 9. Architecture Consistency — 60

Layering 60 · token pipeline 90 · idioms 85 · shared internals 60 (overlay core, Label reuse) · providers 20 (`Toaster`, no theme provider) → 15 + 18 + 12.75 + 12 + 4 = **61.75 → 60**.

## 10. Overall Parity — 66

| Area | Weight | Score | Contribution |
| --- | --- | --- | --- |
| Coverage | 20 % | 45 | 9.0 |
| API | 15 % | 95 | 14.25 |
| Visual | 10 % | 85 | 8.5 |
| Tokens | 5 % | 90 | 4.5 |
| Accessibility | 10 % | 80 | 8.0 |
| Documentation | 10 % | 63 | 6.3 |
| Testing | 10 % | 55 | 5.5 |
| DX | 10 % | 42 | 4.2 |
| Architecture | 10 % | 60 | 6.0 |
| **Total** | | | **66.25 → 66** |
