# Design-system scoring

> 0–100 per area. **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). Re-scored 2026-09-22 through commit `0770214`. Formulas and evidence: [scoring-rationale.md](scoring-rationale.md).

| Area | First pass | Previous | **Now** | One-line evidence |
| --- | --- | --- | --- | --- |
| Component Coverage | 33 | 45 | **63** | 34 / 62 in-scope components exist (54.8 %); 89.5 % of in-scope production imports covered |
| API Consistency | 44 | 95 | **95** | 227 / 230 KuiReact prop names present (98.7 %); all 34 component names and variant/size values match; deprecated aliases keep old call sites working |
| Visual Consistency | 46 | 85 | **86** | Every component uses KuiReact's exact classes; −5 for the system font; not verified on a device |
| Design Token Alignment | 71 | 90 | **90** | Colours 33 / 33; KuiReact's hover tokens drive pressed states; font family still differs |
| Accessibility Alignment | 40 | 80 | **80** | New components carry KuiReact's roles and states; Popover / DropdownMenu don't move focus on open; no focus styles for RN-web |
| Documentation Alignment | 18 | 63 | **63** | 141 / 143 KuiReact showcase variants reproduced verbatim (98.6 %); no prop tables or registry |
| Testing Alignment | 10 | 55 | **58** | 35 suites, 381 tests; KuiReact cases ported for all 12 shared components that have KuiReact tests; no CI or visual regression |
| Developer Experience Alignment | 25 | 42 | **42** | KuiReact names everywhere; still not installable |
| Architecture Consistency | 40 | 60 | **65** | Anchored overlay core (`AnchoredPanel`, `useTrigger`) and KuiReact's ComboBox hooks ported; no theme provider yet |
| **Overall Parity** | **34** | **66** | **71** | Same weights throughout (coverage 20 %, API 15 %, tokens 5 %, others 10 %) |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Components at PARITY_COMPLETE | 26 / 36 |
| PARITY_MINOR_GAPS / MAJOR / REWRITE | 10 / 0 / 0 |
| Remaining in-scope components to build | 28 |
| Open defects from the first audit | None |
