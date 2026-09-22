# Design-system scoring

> 0–100 per area. **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). Re-scored 2026-09-22 through commit `3d2d0f9`. Formulas and evidence: [scoring-rationale.md](scoring-rationale.md).

| Area | First pass | Previous | **Now** | One-line evidence |
| --- | --- | --- | --- | --- |
| Component Coverage | 33 | 82 | **92** | 61 / 62 in-scope components exist (98.4 %); 96.6 % of in-scope production imports covered; only SkipLink + LiveRegion (web-only) is missing |
| API Consistency | 44 | 95 | **95** | 549 / 552 KuiReact prop names present (99.5 %); all 61 component names and variant/size values match; deprecated aliases keep old call sites working |
| Visual Consistency | 46 | 86 | **87** | Every component uses KuiReact's exact classes; error rings now complete; −5 for the system font; not verified on a device |
| Design Token Alignment | 71 | 90 | **90** | Colours 33 / 33; KuiReact's hover tokens drive pressed states; chart palette resolves KuiReact's CSS-variable names to theme tokens; font family still differs |
| Accessibility Alignment | 40 | 81 | **82** | New components carry KuiReact's roles and states; Popconfirm now moves focus on open; Popover doesn't; radial charts lack the `img` role; no focus styles for RN-web |
| Documentation Alignment | 18 | 63 | **63** | 217 / 220 KuiReact showcase variants reproduced verbatim (98.6 %); no prop tables or registry |
| Testing Alignment | 10 | 60 | **61** | 62 suites, 569 tests; KuiReact cases ported for all 13 shared components that have KuiReact tests; no CI or visual regression |
| Developer Experience Alignment | 25 | 42 | **42** | KuiReact names everywhere; still not installable |
| Architecture Consistency | 40 | 65 | **65** | Wave 3 components reuse KuiReact's hooks and maths unchanged (tree state, colour, table, diff, chart helpers); no theme provider yet |
| **Overall Parity** | **34** | **75** | **77** | Same weights throughout (coverage 20 %, API 15 %, tokens 5 %, others 10 %) |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Components at PARITY_COMPLETE | 53 / 63 |
| PARITY_MINOR_GAPS / MAJOR / REWRITE | 10 / 0 / 0 |
| Remaining in-scope components to build | 1 (SkipLink + LiveRegion; recommended exception) |
| Open defects from the first audit | None |
