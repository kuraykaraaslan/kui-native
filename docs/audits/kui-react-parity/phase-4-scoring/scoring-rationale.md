# Scoring rationale

> Scope: KuiReact ui-layer atoms, molecules and organisms (62 components). Re-scored 2026-09-22 through commit `0770214`, with the same formulas as the earlier passes (in git history). The previous pass (through `599c8a1`) scored 66.

## 1. Component Coverage — 63 (was 45)

34 / 62 exist (54.8 %); usage-weighted 426 / 476 (89.5 %). 0.6 × 54.8 + 0.4 × 89.5 = 68.7, minus the standing 6-point usage correction → **63**. The 13 new components add 13 ids and 56 production imports; Breadcrumb (26) and SearchBar (14) are the heaviest.

## 2. API Consistency — 95 (unchanged)

| Input | Value |
| --- | --- |
| KuiReact prop names present (34 shared ids; web-only props excluded; `onClick` → `onPress` counted) | 227 / 230 = 98.7 % |
| Component names identical | 34 / 34 |
| Enumerated values matching | 100 % |

The 13 new components add 84 / 84 props (73 parsed by the extractor, plus RangeSlider's 11, whose discriminated union the extractor does not parse, checked by hand). Base 0.5 × 98.7 + 0.2 × 100 + 0.3 × 100 = 99.35. The three reported misses are unchanged and not real gaps (Input `maxLength` via `TextInputProps`; Modal `closeOnRouteChange` / `reducedMotion` are KuiReact stubs). −4 for Label and a few older components still lacking rest props / ref → **95**. Additions such as `SearchBar ref` and Breadcrumb item `onPress` are Native-ahead and not scored.

## 3. Visual Consistency — 86 (was 85)

Per-component ratings: Button 95 · Card 95 · Avatar 95 · AvatarGroup 90 · Badge 95 · Input 90 · Checkbox 90 · Toggle 90 · Spinner 60 · EmptyState 90 · Skeleton 90 · Modal 85 · Label 95 · Separator 100 · AlertBanner 95 · RadioGroup 90 · Textarea 95 · TabGroup 90 · Progress 95 · Select 90 · Drawer 90 · Toast 90 · **new:** Popover 95 · DropdownMenu 95 · Tooltip 90 (one-line truncation instead of overflow) · Accordion 95 · ButtonGroup 90 (tints computed from hex) · CheckboxGroup 95 · SearchBar 95 · Pagination 95 · Stepper 95 · Breadcrumb 95 · PageHeader 95 · MultiSelect 85 (no error ring) · RangeSlider 90 (drawn track and thumb). Mean 3205 / 35 = 91.6, −5 for the system font → 86.6 → **86** (rounded down, as before). Ratings compare class lists against KuiReact source; no screenshots yet.

## 4. Design Token Alignment — 90 (unchanged)

Colours 100 (50 %) · token usage per component 95 (30 %) · typography / shadow / motion 60 (20 %) → **90**. ButtonGroup's `/20` and `/40` tints and the RN colour props for icons read hex values from `useThemeTokens`, which is token-driven; Tooltip's raw `gray-900` / white themes are KuiReact's own.

## 5. Accessibility Alignment — 80 (unchanged)

The new components map KuiReact's ARIA onto RN: menu / menuitem, combobox with expanded state, checkbox and adjustable roles, selected state for `aria-pressed` / `aria-current`, navigation / list roles, alert for errors, labels copied verbatim. Against that, Popover and DropdownMenu don't move focus into the panel or restore it to the trigger (screen-reader focus is contained with `accessibilityViewIsModal`), and there are still no focus styles for RN-web or a reusable announce helper. Net → **80**.

## 6. Documentation Alignment — 63 (unchanged)

Showcase variants reproduced verbatim: 141 / 143 (98.6 %) → 39.4 (40 %) · usage snippets 15 · prop tables / registry 0 · architecture docs 3 · accuracy 6 → **63**.

## 7. Testing Alignment — 58 (was 55)

35 suites, 381 tests at `0770214` (all passing), covering every component. KuiReact's own cases are now ported for all 12 shared components that have KuiReact tests (Button, Modal, Toggle, Checkbox, Input, TabGroup, Select, Drawer, Popover, DropdownMenu, Tooltip, Pagination; keyboard-only focus cases are N/A), and the 9 new components without KuiReact tests got their own. Still missing: CI, visual regression → **58**.

## 8. Developer Experience Alignment — 42 (unchanged)

Installable 0 (25 %) · same names 90 (25 %) · types 90 (15 %) · theming 20 (15 %) · tooling 15 (20 %) → **42**.

## 9. Architecture Consistency — 65 (was 60)

Layering 60 · token pipeline 90 · idioms 85 · shared internals 75 (was 60: overlay core now includes the anchored-panel layer `useAnchor` / `computePosition` / `AnchoredPanel` and `useTrigger`, mirroring KuiReact's `positioning` and trigger cloning; KuiReact's `ComboBox/hooks` — `useFilter`, `useAsync`, `useLoadMore` — ported and used by MultiSelect) · providers 20 (`Toaster`, no theme provider) → 15 + 18 + 12.75 + 15 + 4 = 64.75 → **65** (rounded to the nearest 5, as before).

## 10. Overall Parity — 71 (was 66)

| Area | Weight | Score | Contribution |
| --- | --- | --- | --- |
| Coverage | 20 % | 63 | 12.6 |
| API | 15 % | 95 | 14.25 |
| Visual | 10 % | 86 | 8.6 |
| Tokens | 5 % | 90 | 4.5 |
| Accessibility | 10 % | 80 | 8.0 |
| Documentation | 10 % | 63 | 6.3 |
| Testing | 10 % | 58 | 5.8 |
| DX | 10 % | 42 | 4.2 |
| Architecture | 10 % | 65 | 6.5 |
| **Total** | | | **70.75 → 71** |
