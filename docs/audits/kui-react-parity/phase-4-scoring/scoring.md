# Design-system scoring

> 0–100 per area. **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). Re-scored 2026-09-22 through commit `599c8a1`. Formulas and evidence: [scoring-rationale.md](scoring-rationale.md).

| Area | First pass | Previous | **Now** | One-line evidence |
| --- | --- | --- | --- | --- |
| Component Coverage | 33 | 42 | **45** | 21 / 62 in-scope components exist (33.9 %); 77.7 % of in-scope production imports covered |
| API Consistency | 44 | 70 | **95** | 143 / 146 KuiReact prop names present (97.9 %); all component names and variant/size values match; deprecated aliases keep old call sites working |
| Visual Consistency | 46 | 80 | **85** | Every component uses KuiReact's exact classes; −5 for the system font; not verified on a device |
| Design Token Alignment | 71 | 89 | **90** | Colours 33 / 33; KuiReact's hover tokens now drive pressed states; font family still differs |
| Accessibility Alignment | 40 | 70 | **80** | Form errors now announced on Input and Checkbox; no focus styles for RN-web |
| Documentation Alignment | 18 | 52 | **63** | 102 / 104 KuiReact showcase variants reproduced verbatim (98 %); no prop tables or registry |
| Testing Alignment | 10 | 45 | **55** | 22 suites, 278 tests; KuiReact cases ported for 8 components; no CI or visual regression |
| Developer Experience Alignment | 25 | 30 | **42** | KuiReact names everywhere; still not installable |
| Architecture Consistency | 40 | 50 | **60** | Shared overlay core (`Overlays/shared`) as in KuiReact; `Toaster` provider; no theme provider yet |
| **Overall Parity** | **34** | **56** | **66** | Same weights throughout (coverage 20 %, API 15 %, tokens 5 %, others 10 %) |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Components at PARITY_COMPLETE | 16 / 23 |
| PARITY_MINOR_GAPS / MAJOR / REWRITE | 7 / 0 / 0 |
| Remaining in-scope components to build | 41 |
| Open defects from the first audit | None |
