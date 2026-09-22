# Scoring rationale

> Scope: KuiReact ui-layer atoms, molecules and organisms (62 components). Re-scored 2026-09-22 through commit `3d2d0f9`, with the same formulas as the earlier passes (in git history). The previous pass (through `08c1c32`) scored 75.

## 1. Component Coverage — 92 (was 82)

61 / 62 exist (98.4 %); usage-weighted 460 / 476 (96.6 %). 0.6 × 98.4 + 0.4 × 96.6 = 97.7, minus the standing 6-point usage correction → **92**. The nine new components (TreeView, ColorPicker, DataTable, BulkActionTable, AdvancedDataTable, DiffViewer, Chart, MapView, VideoPlayer) add 9 ids and 9 production imports. The one still missing, SkipLink + LiveRegion (fit `web-only`), accounts for the remaining 16 imports, mostly KuiReact's theme-demo layouts; recording it as an exception would leave coverage at its ceiling.

## 2. API Consistency — 95 (unchanged)

| Input | Value |
| --- | --- |
| KuiReact prop names present (61 shared ids; web-only props excluded; `onClick` → `onPress` counted) | 549 / 552 = 99.5 % |
| Component names identical | 61 / 61 (Chart: KuiReact's seven chart exports, same names) |
| Enumerated values matching | 100 % |

The nine new components add 166 / 166 props: 106 parsed by the extractor plus the chart family's 60, checked by hand (the extractor does not parse KuiReact's `Chart/index.ts` barrel, as with RangeSlider). DataTable's `onRowClick` → `onRowPress` counts as a platform rename. DataTable's five deprecated legacy props (`legacyAdvancedRows`, `selectable`, `stickyHeader`, `onSelectionChange`, `serverControlled`) are excluded: they only route to KuiReact's deprecated `AdvancedDataTable` / `ServerDataTable` shims, and `AdvancedDataTable` exists in KuiNative with the same props. MapView's `provider` / `apiKey` and VideoPlayer's `enableCast` / `onCastStateChange` are accepted and count as present. Base 0.5 × 99.5 + 0.2 × 100 + 0.3 × 100 = 99.75. The three reported misses are unchanged and not real gaps (Input `maxLength` via `TextInputProps`; Modal `closeOnRouteChange` / `reducedMotion` are KuiReact stubs). −4 for Label and a few older components still lacking rest props / ref at this cutoff (fixed in `fcc2af9`, not yet counted) → **95**. Exports such as `useDiff`, `normalizeHex`, `parseVtt` / `cueAt` and the chart helpers are Native-ahead and not scored.

## 3. Visual Consistency — 87 (was 86)

Per-component ratings (previous 53 unchanged except DatePicker 90 → 95 and TagInput 85 → 95, error rings added in `02d510b`; DateRangePicker stays 90 because its months still stack on a phone) · **new:** TreeView 95 · ColorPicker 90 (sunken tile instead of the checkerboard; hue strip instead of the OS dialog) · DataTable 90 (equal-width columns, as Table) · BulkActionTable 90 (equal-width columns, drawn checkboxes) · AdvancedDataTable 90 (equal-width columns; sticky header as a header row above a scroller) · DiffViewer 95 · Chart 90 (no hover transitions) · MapView 85 (native callouts; web build shows a notice) · VideoPlayer 90 (no seek-bar hover preview). Mean (4890 + 815) / 62 = 92.0, −5 for the system font → 87.0 → **87** (rounded down, as before; the previous 86 was 91.98 − 5). Ratings compare class lists against KuiReact source; no screenshots yet.

## 4. Design Token Alignment — 90 (unchanged)

Colours 100 (50 %) · token usage per component 95 (30 %) · typography / shadow / motion 60 (20 %) → **90**. The chart palette keeps KuiReact's `var(--primary)`-style names and resolves them to the active theme's hex values at draw time; DiffViewer and the tables use the success / error / surface tokens. MapView's `VARIANT_HEX` / `VARIANT_FILL` and VideoPlayer's black / white overlay colours are KuiReact's own raw colours.

## 5. Accessibility Alignment — 82 (was 81)

Popconfirm now sends screen-reader focus to Cancel when its panel is shown (`AnchoredPanel onShow`, `02d510b`). The new components map KuiReact's ARIA onto RN: TreeView rows as buttons with selected / expanded state and a "Level n, i of m" hint (RN has no tree role), ColorPicker's `tablist` / `tab` format switcher and labelled swatches, DataTable sort state as the header value, labelled bulk-action and row checkboxes with mixed / disabled state and the disabled reason as a hint, DiffViewer lines read as one element each, labelled map markers / zones / routes, adjustable VideoPlayer scrubbers. Against that, Popover still doesn't move focus into the panel or restore it, Pie / Donut / Scatter charts carry a label but no `img` role, and there are still no focus styles for RN-web or a reusable announce helper. Net → **82**.

## 6. Documentation Alignment — 63 (unchanged)

Showcase variants reproduced verbatim: 217 / 220 (98.6 %; TimePicker's own two demos are now reproduced (`02d510b`), and all 31 demos of the nine new components are; the three not reproduced are the two carried over and FileInput's "Paste from clipboard", which has no RN equivalent) → 39.5 (40 %) · usage snippets 15 · prop tables / registry 0 · architecture docs 3 · accuracy 6 → **63**.

## 7. Testing Alignment — 61 (was 60)

62 suites, 569 tests at `3d2d0f9` (all passing), covering every component. KuiReact's own cases are ported for all 13 shared components that have KuiReact tests (keyboard-only focus cases are N/A; Popconfirm gains an initial-focus case), and the nine new components, none of which has KuiReact tests, got their own (Chart 11, ColorPicker 10, DataTable 10, VideoPlayer 10, DiffViewer 9, TreeView 7, MapView 7, BulkActionTable 6, AdvancedDataTable 4). The count includes `libs/brand/geometry.test.ts` (7 tests, web branding, outside the library); it passes under Jest but fails `tsc` for missing Node types, which is noted here and not scored. Still missing: CI, visual regression → **61**.

## 8. Developer Experience Alignment — 42 (unchanged)

Installable 0 (25 %) · same names 90 (25 %) · types 90 (15 %) · theming 20 (15 %) · tooling 15 (20 %) → **42**. New native dependencies (`react-native-maps`, `expo-video`, `expo-clipboard`) add setup steps a package will have to document (MapView needs a Google Maps key for Android release builds).

## 9. Architecture Consistency — 65 (unchanged)

Layering 60 · token pipeline 90 · idioms 85 · shared internals 85 (was 80: the Wave 3 components port KuiReact's logic unchanged — `useTreeState`, the ColorPicker `color/` maths and `useColorState`, `useTable` / `useServerTable` on the ported `Table/types.ts`, `useDiff`, the chart `_helpers`, `theme` and `types`, MapView's `types` and `useAutoMarkers`, VideoPlayer's `useControlsVisibility`; ColorPicker and the DataTable filters sit on the anchored-panel layer) · providers 20 (`Toaster`, no theme provider) → 15 + 18 + 12.75 + 17 + 4 = 66.75 → **65** (rounded to the nearest 5, as before).

## 10. Overall Parity — 77 (was 75)

| Area | Weight | Score | Contribution |
| --- | --- | --- | --- |
| Coverage | 20 % | 92 | 18.4 |
| API | 15 % | 95 | 14.25 |
| Visual | 10 % | 87 | 8.7 |
| Tokens | 5 % | 90 | 4.5 |
| Accessibility | 10 % | 82 | 8.2 |
| Documentation | 10 % | 63 | 6.3 |
| Testing | 10 % | 61 | 6.1 |
| DX | 10 % | 42 | 4.2 |
| Architecture | 10 % | 65 | 6.5 |
| **Total** | | | **77.15 → 77** |
