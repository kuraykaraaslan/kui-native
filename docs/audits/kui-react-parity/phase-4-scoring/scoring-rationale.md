# Scoring rationale

> Scope: KuiReact ui-layer atoms, molecules and organisms (62 components). Re-scored 2026-09-22 through commit `12b56f3`. Inputs are measured where possible; judgement ratings are itemised so they can be challenged individually. The first-pass rationale is in git history.

## 1. Component Coverage — 42

| Input | Value |
| --- | --- |
| In-scope components with a KuiNative counterpart | 18 / 62 = 29.0 % |
| Usage-weighted (share of 476 in-scope production imports) | 361 / 476 = 75.8 % |

0.6 × 29.0 + 0.4 × 75.8 = 47.7, minus the same 6-point usage-weighting correction as the first pass → **42**.

## 2. API Consistency — 70

| Input | Value |
| --- | --- |
| KuiReact prop names present (18 shared ids; web-only `as`, `type`, `id`, `name`, `htmlFor`, `data-testid`, `portalTarget`, `ref` excluded; approved renames `onClick`→`onPress` counted) | 98 / 123 = 79.7 % |
| Component names identical | 16 / 18 = 88.9 % (Input ≠ TextInput, Toggle ≠ Switch) |
| Enumerated values matching (variant / size / shape / orientation / columns) | 53 / 58 = 91.4 % |

Base 0.5 × 79.7 + 0.2 × 88.9 + 0.3 × 91.4 = 85.1. Penalties unchanged from the first pass: −10 for `label` instead of `children` on Button and Badge, −5 for missing rest props / ref on most older components → **70**.

Remaining misses: Button `children`, `iconRight`, `iconOnly`, `selected` · Card `onClick`, `hoverable`, `loading` · Badge `children`, `size`, `dot`, `dismissible`, `onDismiss` · Input `success`, `required`, `prefixIcon`, `suffixIcon`, `clearable`, `onClear`, `showCount`, `maxLength` · Checkbox `hint`, `error` · Modal `closeOnRouteChange`, `reducedMotion`.

## 3. Visual Consistency — 80

Per-component ratings after the pass: Button 90 · Card 85 · Avatar 95 · AvatarGroup 20 · Badge 90 · Input 85 · Checkbox 85 · Toggle 90 · Spinner 60 · EmptyState 90 · Skeleton 90 · Modal 85 · Label 95 · Separator 100 · AlertBanner 95 · RadioGroup 90 · Textarea 95 · TabGroup 90 · Progress 95. Mean 1625 / 19 = 85.5, −5 for the system font instead of Geist → **80**. These ratings compare class lists against KuiReact source; no side-by-side screenshots have been taken yet.

## 4. Design Token Alignment — 89

Colours 100 (50 %) · per-component token usage 90 (30 %; `*-hover` / `*-active` still unused) · typography / shadow / motion 60 (20 %; shadows and motion now match, font does not) → 50 + 27 + 12 = **89**.

## 5. Accessibility Alignment — 70

Fixed since the first pass: Modal no longer collapses into one VoiceOver element and moves focus to its title; `accessible` added wherever a View carries a role (Spinner, Avatar, Skeleton, Progress); Switch is a single element; headings carry the header role; AlertBanner/RadioGroup/Textarea errors use alert roles and live regions. Open: TextInput and Checkbox errors are still not announced; no focus styles for RN-web; no announce/focus helper layer. Mean per-component rating ≈ 78, −8 for the open items → **70**.

## 6. Documentation Alignment — 52

Showcase variants reproduced with KuiReact's titles and copy: 65 / 91 (71 %) → 28.4 (40 %) · usage snippets 15 (15 %) · prop tables / registry 0 · architecture docs 3 (audit workspace, progress log) · accuracy 6 (README corrected: SDK 56, Geist, component list, test commands) → **52**.

## 7. Testing Alignment — 45

18 suites, 195 tests, every KuiNative component covered; KuiReact's own cases ported for Button, Modal, Toggle, Checkbox, Input and TabGroup. Missing: CI, visual regression, tests for Badge. → **45**.

## 8. Developer Experience Alignment — 30

Installable 0 (25 %) · same names / mental model 55 (25 %) · types 90 (15 %) · theming 20 (15 %) · tooling 15 (20 %) → 0 + 13.75 + 13.5 + 3 + 3 = 33.25, −3 for missing rest props → **30**.

## 9. Architecture Consistency — 50

Layering 60 (25 %) · token pipeline 90 (20 %) · idioms 85 (15 %) · shared internals 20 (20 %; Label reused by Textarea, no overlay core) · providers 10 (20 %) → **51.75 → 50**.

## 10. Overall Parity — 56

| Area | Weight | Score | Contribution |
| --- | --- | --- | --- |
| Coverage | 20 % | 42 | 8.4 |
| API | 15 % | 70 | 10.5 |
| Visual | 10 % | 80 | 8.0 |
| Tokens | 5 % | 89 | 4.45 |
| Accessibility | 10 % | 70 | 7.0 |
| Documentation | 10 % | 52 | 5.2 |
| Testing | 10 % | 45 | 4.5 |
| DX | 10 % | 30 | 3.0 |
| Architecture | 10 % | 50 | 5.0 |
| **Total** | | | **56.05 → 56** |
