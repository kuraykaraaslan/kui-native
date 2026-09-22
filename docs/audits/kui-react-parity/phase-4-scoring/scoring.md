# Design-system scoring

> 0–100 per area. **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). Re-scored 2026-09-22 through commit `08c1c32`. Formulas and evidence: [scoring-rationale.md](scoring-rationale.md).

| Area | First pass | Previous | **Now** | One-line evidence |
| --- | --- | --- | --- | --- |
| Component Coverage | 33 | 63 | **82** | 52 / 62 in-scope components exist (83.9 %); 94.7 % of in-scope production imports covered |
| API Consistency | 44 | 95 | **95** | 383 / 386 KuiReact prop names present (99.2 %); all 52 component names and variant/size values match; deprecated aliases keep old call sites working |
| Visual Consistency | 46 | 86 | **86** | Every component uses KuiReact's exact classes; error `ring-1` still missing on the DatePicker trigger and TagInput; −5 for the system font; not verified on a device |
| Design Token Alignment | 71 | 90 | **90** | Colours 33 / 33; KuiReact's hover tokens drive pressed states; font family still differs |
| Accessibility Alignment | 40 | 80 | **81** | New components carry KuiReact's roles and states; DropdownMenu now moves focus on open; Popover / Popconfirm don't; no focus styles for RN-web |
| Documentation Alignment | 18 | 63 | **63** | 184 / 189 KuiReact showcase variants reproduced verbatim (97.4 %); no prop tables or registry |
| Testing Alignment | 10 | 58 | **60** | 52 suites, 487 tests; KuiReact cases ported for all 13 shared components that have KuiReact tests; no CI or visual regression |
| Developer Experience Alignment | 25 | 42 | **42** | KuiReact names everywhere; still not installable |
| Architecture Consistency | 40 | 65 | **65** | DatePicker, ComboBox and Table keep KuiReact's folder layout and shared types; no theme provider yet |
| **Overall Parity** | **34** | **71** | **75** | Same weights throughout (coverage 20 %, API 15 %, tokens 5 %, others 10 %) |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Components at PARITY_COMPLETE | 41 / 54 |
| PARITY_MINOR_GAPS / MAJOR / REWRITE | 13 / 0 / 0 |
| Remaining in-scope components to build | 10 |
| Open defects from the first audit | None |
