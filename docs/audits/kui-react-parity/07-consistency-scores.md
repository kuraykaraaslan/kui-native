# 07 · Consistency scores

> **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components). Re-scored 2026-09-22 through commit `0770214`. Detail: [phase-4-scoring/scoring.md](phase-4-scoring/scoring.md) · [scoring-rationale.md](phase-4-scoring/scoring-rationale.md).

| Area | First pass | Previous | Now |
| --- | --- | --- | --- |
| Component Coverage | 33 | 45 | **63** |
| API Consistency | 44 | 95 | **95** |
| Visual Consistency | 46 | 85 | **86** |
| Design Token Alignment | 71 | 90 | **90** |
| Accessibility Alignment | 40 | 80 | **80** |
| Documentation Alignment | 18 | 63 | **63** |
| Testing Alignment | 10 | 55 | **58** |
| Developer Experience Alignment | 25 | 42 | **42** |
| Architecture Consistency | 40 | 60 | **65** |
| **Overall Parity** | **34** | **66** | **71** |

## Reading the scores

- **What moved it this time:** 13 new components (Popover, DropdownMenu, Tooltip, Accordion, ButtonGroup, CheckboxGroup, SearchBar, Pagination, Stepper, Breadcrumb, PageHeader, MultiSelect, RangeSlider) on an anchored overlay core and KuiReact's ported ComboBox hooks. Coverage rose from 21 to 34 of 62 (89.5 % of in-scope usage).
- **Strongest:** API (95), tokens (90), visuals (86). A KuiReact snippet for any of the 34 shared components ports with at most the documented platform renames (`onClick` → `onPress`, value callbacks, `href` → expo-router).
- **Weakest:** DX (42), because KuiNative still can't be installed as a package, and testing (58), with no CI or visual regression.
- **Biggest remaining levers:** packaging plus a `KuiProvider` (DX, architecture), CI, then the remaining 28 components (each ≈ +1 coverage point).
