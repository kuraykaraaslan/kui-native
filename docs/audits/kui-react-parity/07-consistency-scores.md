# 07 · Consistency scores

> **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components). Re-scored 2026-09-22 through commit `599c8a1`. Detail: [phase-4-scoring/scoring.md](phase-4-scoring/scoring.md) · [scoring-rationale.md](phase-4-scoring/scoring-rationale.md).

| Area | First pass | Previous | Now |
| --- | --- | --- | --- |
| Component Coverage | 33 | 42 | **45** |
| API Consistency | 44 | 70 | **95** |
| Visual Consistency | 46 | 80 | **85** |
| Design Token Alignment | 71 | 89 | **90** |
| Accessibility Alignment | 40 | 70 | **80** |
| Documentation Alignment | 18 | 52 | **63** |
| Testing Alignment | 10 | 45 | **55** |
| Developer Experience Alignment | 25 | 30 | **42** |
| Architecture Consistency | 40 | 50 | **60** |
| **Overall Parity** | **34** | **56** | **66** |

## Reading the scores

- **What moved it this time:** API parity on every original component (KuiReact names, `children`, `danger`, `neutral`, `Input`, `Toggle`, all missing props), plus Select, Drawer and Toast.
- **Strongest:** API (95), tokens (90), visuals (85). A KuiReact snippet for any of the 21 shared components now ports with at most the documented platform renames (`onClick` → `onPress`, value callbacks).
- **Weakest:** coverage (45) — 41 in-scope components remain — and DX (42), because KuiNative still can't be installed as a package.
- **Biggest remaining levers:** building the remaining components (each ≈ +1.6 coverage points), then packaging plus a `KuiProvider`.
