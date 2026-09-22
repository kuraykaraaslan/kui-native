# 07 · Consistency scores

> **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components). Re-scored 2026-09-22 through commit `08c1c32`. Detail: [phase-4-scoring/scoring.md](phase-4-scoring/scoring.md) · [scoring-rationale.md](phase-4-scoring/scoring-rationale.md).

| Area | First pass | Previous | Now |
| --- | --- | --- | --- |
| Component Coverage | 33 | 63 | **82** |
| API Consistency | 44 | 95 | **95** |
| Visual Consistency | 46 | 86 | **86** |
| Design Token Alignment | 71 | 90 | **90** |
| Accessibility Alignment | 40 | 80 | **81** |
| Documentation Alignment | 18 | 63 | **63** |
| Testing Alignment | 10 | 58 | **60** |
| Developer Experience Alignment | 25 | 42 | **42** |
| Architecture Consistency | 40 | 65 | **65** |
| **Overall Parity** | **34** | **71** | **75** |

## Reading the scores

- **What moved it this time:** 18 new components: the DatePicker suite (DatePicker, DateRangePicker, DateTimePicker stub), TimePicker, BrandLogo, Popconfirm, StarRating, StatCard, Statistic, TabButton, Timeline, TagInput, ComboBox, FileInput, Table, Slider, ContentScoreBar, ViewToggle and ScrollArea. Coverage rose from 34 to 52 of 62 (94.7 % of in-scope usage). The `5630391` fixes closed the DropdownMenu focus gap and the MultiSelect error ring.
- **Strongest:** API (95), tokens (90), visuals (86). A KuiReact snippet for any of the 52 shared components ports with at most the documented platform renames (`onClick` → `onPress`, value callbacks, `href` → expo-router, DOM `File` → `PickedFile`).
- **Weakest:** DX (42), because KuiNative still can't be installed as a package, and testing (60), with no CI or visual regression.
- **Biggest remaining levers:** packaging plus a `KuiProvider` (DX, architecture), then CI. Coverage is close to its ceiling: the 10 remaining components are Wave 3 (Chart, the data tables, ColorPicker, DiffViewer, TreeView, MapView, VideoPlayer, and SkipLink as an exception) and carry little usage.
