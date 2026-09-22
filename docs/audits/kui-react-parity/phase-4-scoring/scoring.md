# Design-system scoring

> 0–100 per area. **Scope: KuiReact ui-layer atoms, molecules and organisms only** (`modules/ui/`, registry categories Atom/Molecule/Organism). App-layer components, domain verticals and theme demos are out of scope and excluded from every score below. Formulas and evidence: [scoring-rationale.md](scoring-rationale.md). Re-score after each roadmap wave.

| Area | Score | One-line evidence |
| --- | --- | --- |
| Component Coverage | **33** | 11 / 62 in-scope KuiReact components have a counterpart (17.7 %); 72.1 % of in-scope production imports are covered because Button and Badge dominate |
| API Consistency | **44** | 41 / 80 KuiReact prop names present (51 %); 22 / 38 variant/size values match; 2 component renames; `label` vs `children` on the two most-used components; no rest/ref on 9 / 12 |
| Visual Consistency | **46** | Colours identical, but radius, spacing, typography, shadows and anatomy (Card, Modal) differ; mean per-component visual rating improves slightly after the Spinner fix |
| Design Token Alignment | **71** | 33 / 33 colour tokens identical in light and dark; font family, shadow and state tokens not aligned |
| Accessibility Alignment | **40** | Roles/states present, but Modal collapses into one VoiceOver element, errors are silent, no focus management, no a11y infrastructure; one systemic defect found and fixed (a plain `View` needs `accessible={true}` for its `accessibilityRole` to register) but still present on SkeletonCard/EmptyState |
| Documentation Alignment | **18** | 15 / 68 KuiReact showcase variants reproduced (22 %); no prop tables, registry, per-component docs, ADRs; README has factual errors |
| Testing Alignment | **10** | A real Jest + `@testing-library/react-native` harness now exists and Spinner has a passing 8-case suite; still 0 of the remaining in-scope shared/backlog cases covered, no CI, no visual regression |
| Developer Experience Alignment | **25** | Not installable; renames force re-learning; typed props exports and identical `cn()` are positives |
| Architecture Consistency | **40** | Same token pipeline, `cn()`, variant-map idiom and zustand; missing shared overlay core, field shell, provider; theme wired in the showcase |
| **Overall Parity** | **34** | Weighted: coverage 20 %, API 15 %, visual 10 %, tokens 5 %, a11y 10 %, docs 10 %, testing 10 %, DX 10 %, architecture 10 % |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Shared components at PARITY_COMPLETE | 0 / 12 |
| Shared components needing rewrite | 2 (Modal, AvatarGroup) |
| Shared components fixed this pass | Spinner (size ladder xs–xl + `accessible` bug) |
| Known KuiNative defects (in scope) | 6 open behavioural (B1–B4, B6–B7) + 2 critical a11y (AX1, AX2); B5 (Spinner sm=md) fixed |
| Wave-1 effort (in-scope only) | 27–44 engineer-days |
| Effort to full in-scope parity (waves 1–3) | 138.5–242 engineer-days |
