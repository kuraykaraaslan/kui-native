# 07 · Consistency scores

> **Scope: KuiReact ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are out of scope. From [phase-4-scoring/scoring.md](phase-4-scoring/scoring.md); formulas and evidence in [scoring-rationale.md](phase-4-scoring/scoring-rationale.md).

| Area | Score |
| --- | --- |
| Component Coverage | 33 |
| API Consistency | 44 |
| Visual Consistency | 46 |
| Design Token Alignment | 71 |
| Accessibility Alignment | 40 |
| Documentation Alignment | 18 |
| Testing Alignment | 10 |
| Developer Experience Alignment | 25 |
| Architecture Consistency | 40 |
| **Overall Parity** | **34** |

## Reading the scores

- **Strongest:** tokens (71). The colour system is a verified 1:1 copy; the gaps are fonts, shadows and motion.
- **Weakest:** documentation (18), testing (10), coverage (33) and DX (25).
- **What moved since the first pass:** Coverage rose from a mis-scoped 25 (denominator 107, including app-layer and hooks) to 33 once the scope was corrected to the 62 in-scope ui-layer components. Testing rose from 0 to 10: a real Jest + `@testing-library/react-native` harness now runs, and it caught and fixed a real accessibility bug (Spinner's `size="sm"`/`"md"` collapsing to the same visual, and a `View` with `accessibilityRole` but no `accessible={true}` being invisible to role queries and, per RN's own docs, to some assistive tech).
- **Largest lever:** Wave 1 of the roadmap (21 items, 27–44 engineer-days). Packaging, provider, typography, and Button/Input/Modal parity would move DX, testing, API, a11y and architecture together. Projected after Wave 1: roughly coverage 45, API 70, visual 60, tokens 85, a11y 65, docs 35, testing 45, DX 60, architecture 60 → overall ≈ 55. This is a projection, not a measurement; re-score after the wave lands.
