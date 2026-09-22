# 07 · Consistency scores

> **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components). Re-scored 2026-09-22 through commit `12b56f3`. Detail: [phase-4-scoring/scoring.md](phase-4-scoring/scoring.md) · [scoring-rationale.md](phase-4-scoring/scoring-rationale.md).

| Area | First pass | Now |
| --- | --- | --- |
| Component Coverage | 33 | **42** |
| API Consistency | 44 | **70** |
| Visual Consistency | 46 | **80** |
| Design Token Alignment | 71 | **89** |
| Accessibility Alignment | 40 | **70** |
| Documentation Alignment | 18 | **52** |
| Testing Alignment | 10 | **45** |
| Developer Experience Alignment | 25 | **30** |
| Architecture Consistency | 40 | **50** |
| **Overall Parity** | **34** | **56** |

## Reading the scores

- **What moved it:** the pixel-perfect pass (every existing component now uses KuiReact's exact classes), seven new components ported with KuiReact's own showcase demos, and a real test suite (18 suites, 195 tests).
- **Strongest:** tokens (89) and visuals (80).
- **Weakest:** DX (30) — KuiNative still can't be installed as a package — and coverage (42): 44 in-scope components remain.
- **Biggest remaining levers:** the API renames (`children`, `danger`, `neutral`, `Input`, `Toggle`) would lift API and DX together; packaging plus a `KuiProvider` lifts DX and architecture; each new component lifts coverage by about 1.6 points.
