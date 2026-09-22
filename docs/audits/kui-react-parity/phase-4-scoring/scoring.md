# Design-system scoring

> 0–100 per area. **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). Re-scored 2026-09-22 after the pixel-perfect pass and the first Wave 1 components (through `12b56f3`). Formulas and evidence: [scoring-rationale.md](scoring-rationale.md).

| Area | Score | Before (first pass) | One-line evidence |
| --- | --- | --- | --- |
| Component Coverage | **42** | 33 | 18 / 62 in-scope components exist (29.0 %); 75.8 % of in-scope production imports covered |
| API Consistency | **70** | 44 | 98 / 123 KuiReact prop names present (79.7 %); 53 / 58 variant/size values match; `label`-vs-`children` and missing rest/ref still penalised |
| Visual Consistency | **80** | 46 | Every component uses KuiReact's exact classes; −5 because Geist is not bundled; not yet verified on a device |
| Design Token Alignment | **89** | 71 | Colours 33 / 33; shadows and motion now implemented; font family still differs |
| Accessibility Alignment | **70** | 40 | Modal merge bug, silent `accessible` roles, Switch double focus fixed; TextInput/Checkbox errors still not announced; no focus styles on web |
| Documentation Alignment | **52** | 18 | 65 / 91 KuiReact showcase variants reproduced verbatim (71 %); README corrected; no prop tables or registry |
| Testing Alignment | **45** | 10 | 18 suites, 195 tests incl. ported KuiReact cases (Button, Modal, Toggle, Checkbox, Input, TabGroup); no CI or visual regression |
| Developer Experience Alignment | **30** | 25 | Still not installable; more names match; typed props everywhere |
| Architecture Consistency | **50** | 40 | Same token pipeline and idioms; Label reused as a field primitive; no shared overlay core or provider yet |
| **Overall Parity** | **56** | 34 | Same weights as before (coverage 20 %, API 15 %, others 10 %, tokens 5 %) |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Components at PARITY_COMPLETE | 7 / 20 (Avatar, EmptyState, Separator, AlertBanner, RadioGroup, Textarea, Progress) |
| PARITY_MINOR_GAPS / MAJOR_GAPS / REWRITE | 6 / 6 / 1 |
| Remaining in-scope components to build | 44 |
| Open defects from the first audit | AX2 (form errors not announced on TextInput / Checkbox); all others fixed |
