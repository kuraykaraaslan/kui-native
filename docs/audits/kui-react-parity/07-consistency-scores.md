# 07 · Consistency scores

> **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components). Re-scored 2026-09-22 through commit `3d2d0f9`. Detail: [phase-4-scoring/scoring.md](phase-4-scoring/scoring.md) · [scoring-rationale.md](phase-4-scoring/scoring-rationale.md).

| Area | First pass | Previous | Now |
| --- | --- | --- | --- |
| Component Coverage | 33 | 82 | **92** |
| API Consistency | 44 | 95 | **95** |
| Visual Consistency | 46 | 86 | **87** |
| Design Token Alignment | 71 | 90 | **90** |
| Accessibility Alignment | 40 | 81 | **82** |
| Documentation Alignment | 18 | 63 | **63** |
| Testing Alignment | 10 | 60 | **61** |
| Developer Experience Alignment | 25 | 42 | **42** |
| Architecture Consistency | 40 | 65 | **65** |
| **Overall Parity** | **34** | **75** | **77** |

## Reading the scores

- **What moved it this time:** the nine Wave 3 components (TreeView, ColorPicker, DataTable, BulkActionTable, AdvancedDataTable, DiffViewer, Chart, MapView, VideoPlayer) took coverage from 52 to 61 of 62 (96.6 % of in-scope usage). The `02d510b` fixes closed the error rings on the DatePicker / DateRangePicker trigger and TagInput, Popconfirm's initial focus and TimePicker's missing demos.
- **Strongest:** API (95), coverage (92), tokens (90). A KuiReact snippet for any of the 61 shared components ports with at most the documented platform renames (`onClick` → `onPress`, `onRowClick` → `onRowPress`, value callbacks, `href` → expo-router, DOM `File` → `PickedFile`).
- **Weakest:** DX (42), because KuiNative still can't be installed as a package, and testing (61), with no CI or visual regression.
- **Biggest remaining levers:** packaging plus a `KuiProvider` (DX, architecture), then CI. Coverage is at its ceiling once SkipLink + LiveRegion is recorded as an exception.
