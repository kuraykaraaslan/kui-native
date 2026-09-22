# Wave 3 — Advanced

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Nice-to-have: heavy organisms (tables, charts, calendar, media), desktop-web patterns and recommended exceptions. Items with fit `web-only` should be closed by adding an exception entry, not by implementation. The Wave 3 components have all landed (TreeView `9aafffe` through VideoPlayer `3d2d0f9`, so they have left this list) except SkipLink + LiveRegion, which is recorded as an exception candidate.

App-layer components, domain verticals (217 components) and theme demos are out of scope for this roadmap by decision — see [missing-components.md](../phase-2-gap-analysis/missing-components.md#scope).

## Totals

| | |
| --- | --- |
| Items | 1 (0 remediation of shared components/infra, 1 new components) |
| Estimated effort | 0.5–1 engineer-days (0.1–0.2 engineer-weeks) |
| Remaining (excluding done items) | 1 items, 0.5–1 engineer-days |
| By priority | Critical 0 · High 0 · Medium 0 · Low 1 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 22 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibilit… |