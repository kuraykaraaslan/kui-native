# Design-system scoring

> 0–100 per area. Formulas and evidence: [scoring-rationale.md](scoring-rationale.md). Re-score after each roadmap wave.

| Area | Score | One-line evidence |
| --- | --- | --- |
| Component Coverage | **25** | 11 / 107 core KuiReact components have a counterpart (10.3 %); 65.5 % of core production imports are covered because Button and Badge dominate; 11 / 324 incl. domains (3.4 %) |
| API Consistency | **44** | 41 / 80 KuiReact prop names present (51 %); 22 / 38 variant/size values match; 2 component renames; `label` vs `children` on the two most-used components; no rest/ref on 9 / 12 |
| Visual Consistency | **45** | Colours identical, but radius, spacing, typography, shadows and anatomy (Card, Modal) differ; mean per-component visual rating 45 |
| Design Token Alignment | **71** | 33 / 33 colour tokens identical in light and dark; font family, shadow and state tokens not aligned |
| Accessibility Alignment | **40** | Roles/states present, but Modal collapses into one VoiceOver element, errors are silent, no focus management, no a11y infrastructure, nothing tested |
| Documentation Alignment | **18** | 15 / 68 KuiReact showcase variants reproduced (22 %); no prop tables, registry, per-component docs, ADRs; README has factual errors |
| Testing Alignment | **0** | 0 / 40 shared-component test cases; no runner, visual tests, CI or lint config |
| Developer Experience Alignment | **25** | Not installable; renames force re-learning; typed props exports and identical `cn()` are positives |
| Architecture Consistency | **40** | Same token pipeline, `cn()`, variant-map idiom and zustand; missing app/domain layers, shared overlay core, field shell, provider; theme wired in the showcase |
| **Overall Parity** | **32** | Weighted: coverage 20 %, API 15 %, visual 10 %, tokens 5 %, a11y 10 %, docs 10 %, testing 10 %, DX 10 %, architecture 10 % |

## Secondary indicators

| Indicator | Value |
| --- | --- |
| Shared components at PARITY_COMPLETE | 0 / 12 |
| Shared components needing rewrite | 2 (Modal, AvatarGroup) |
| Known KuiNative defects | 7 behavioural (B1–B7) + 2 critical a11y (AX1, AX2) |
| Wave-1 effort to reach "production-adoptable" | 30.5–51 engineer-days |
| Effort to full core parity (waves 1–3) | 248–444 engineer-days (+ 330–531 if every domain vertical were ported) |
