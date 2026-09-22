# Scoring rationale

> Scope: KuiReact ui-layer atoms, molecules and organisms (62 components). Re-scored 2026-09-22 through commit `08c1c32`, with the same formulas as the earlier passes (in git history). The previous pass (through `0770214`) scored 71.

## 1. Component Coverage — 82 (was 63)

52 / 62 exist (83.9 %); usage-weighted 451 / 476 (94.7 %). 0.6 × 83.9 + 0.4 × 94.7 = 88.2, minus the standing 6-point usage correction → **82**. The 18 new components add 18 ids and 25 production imports. The 10 still missing (Chart, DataTable, AdvancedDataTable, BulkActionTable, ColorPicker, DiffViewer, TreeView, MapView, VideoPlayer, SkipLink + LiveRegion) account for the remaining 25 imports.

## 2. API Consistency — 95 (unchanged)

| Input | Value |
| --- | --- |
| KuiReact prop names present (52 shared ids; web-only props excluded; `onClick` → `onPress` counted) | 383 / 386 = 99.2 % |
| Component names identical | 52 / 52 |
| Enumerated values matching | 100 % |

The 18 new components add 154 / 154 parsed props (props accepted for parity but ignored on RN, such as DatePicker / FileInput `name` and FileInput `enablePaste`, count as present). RangeSlider's 11 props are still checked by hand. Base 0.5 × 99.2 + 0.2 × 100 + 0.3 × 100 = 99.6. The three reported misses are unchanged and not real gaps (Input `maxLength` via `TextInputProps`; Modal `closeOnRouteChange` / `reducedMotion` are KuiReact stubs). −4 for Label and a few older components still lacking rest props / ref → **95**. Additions such as Table column `width`, the exported DatePicker / Slider types and `releaseStep` are Native-ahead and not scored.

## 3. Visual Consistency — 86 (unchanged)

Per-component ratings (previous 35 unchanged except MultiSelect 85 → 90, error ring added in `5630391`) · **new:** DatePicker 90 (no error ring) · DateRangePicker 90 (no error ring; months stack on a phone) · TimePicker 85 (column panel in place of the browser time picker) · BrandLogo 95 · Popconfirm 95 · StarRating 95 · StatCard 100 · Statistic 95 · TabButton 95 · Timeline 90 (headings not sticky) · TagInput 85 (no error ring) · ComboBox 95 · FileInput 90 (tap copy instead of drag-and-drop copy) · Table 90 (equal-width columns) · Slider 95 · ContentScoreBar 95 (no transitions) · ViewToggle 95 · ScrollArea 90 (platform scrollbar). Mean (3210 + 1665) / 53 = 92.0, −5 for the system font → 87.0 → **86** (rounded down, as before). Ratings compare class lists against KuiReact source; no screenshots yet.

## 4. Design Token Alignment — 90 (unchanged)

Colours 100 (50 %) · token usage per component 95 (30 %) · typography / shadow / motion 60 (20 %) → **90**. The new components read icon colours and computed tints (TabButton's `bg-primary-fg/20`) from `useThemeTokens`; the Slider's `bg-black/40` arrows and white dots are KuiReact's own raw colours.

## 5. Accessibility Alignment — 81 (was 80)

DropdownMenu now sends screen-reader focus to its first item when the panel is shown (`AnchoredPanel onShow`, `5630391`). The new components map KuiReact's ARIA onto RN: radiogroup / radio for StarRating, alertdialog for Popconfirm, combobox with expanded state for ComboBox, labelled day buttons with selected / disabled state in the calendar, tablist / tab dots and hidden off-screen slides in the Slider, busy state for Statistic, alert for errors. ContentScoreBar and TabButton go further than KuiReact (progressbar value, tab role). Against that, Popover and Popconfirm still don't move focus into the panel or restore it to the trigger (focus is contained with `accessibilityViewIsModal`), and there are still no focus styles for RN-web or a reusable announce helper. Net → **81**.

## 6. Documentation Alignment — 63 (unchanged)

Showcase variants reproduced verbatim: 184 / 189 (97.4 %; the five not reproduced are the two carried over, FileInput's "Paste from clipboard", which has no RN equivalent, and TimePicker's own "Default" and "Required / error") → 39.0 (40 %) · usage snippets 15 · prop tables / registry 0 · architecture docs 3 · accuracy 6 → **63**.

## 7. Testing Alignment — 60 (was 58)

52 suites, 487 tests at `08c1c32` (all passing), covering every component. KuiReact's own cases are ported for all 13 shared components that have KuiReact tests (Popconfirm added; keyboard-only focus cases are N/A), and the 17 new components without KuiReact tests got their own (DatePicker suite 17, ComboBox 11, Slider 11, TagInput 10, FileInput 10). Still missing: CI, visual regression → **60**.

## 8. Developer Experience Alignment — 42 (unchanged)

Installable 0 (25 %) · same names 90 (25 %) · types 90 (15 %) · theming 20 (15 %) · tooling 15 (20 %) → **42**.

## 9. Architecture Consistency — 65 (unchanged)

Layering 60 · token pipeline 90 · idioms 85 · shared internals 80 (was 75: the DatePicker suite keeps KuiReact's `calendar/`, `hooks/`, `locale/`, `parts/` layout and date helpers; ComboBox reuses the ported hooks with KuiReact's `parts/` split; `Table/types.ts` is ported whole for the coming DataTable; Popconfirm and the pickers sit on the anchored-panel layer) · providers 20 (`Toaster`, no theme provider) → 15 + 18 + 12.75 + 16 + 4 = 65.75 → **65** (rounded to the nearest 5, as before).

## 10. Overall Parity — 75 (was 71)

| Area | Weight | Score | Contribution |
| --- | --- | --- | --- |
| Coverage | 20 % | 82 | 16.4 |
| API | 15 % | 95 | 14.25 |
| Visual | 10 % | 86 | 8.6 |
| Tokens | 5 % | 90 | 4.5 |
| Accessibility | 10 % | 81 | 8.1 |
| Documentation | 10 % | 63 | 6.3 |
| Testing | 10 % | 60 | 6.0 |
| DX | 10 % | 42 | 4.2 |
| Architecture | 10 % | 65 | 6.5 |
| **Total** | | | **74.85 → 75** |
