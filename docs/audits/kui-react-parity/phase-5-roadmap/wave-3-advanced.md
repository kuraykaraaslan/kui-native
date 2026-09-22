# Wave 3 — Advanced

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Nice-to-have: heavy organisms (tables, charts, calendar, media), desktop-web patterns and recommended exceptions. Items with fit `web-only` should be closed by adding an exception entry, not by implementation.

App-layer components, domain verticals (217 components) and theme demos are out of scope for this roadmap by decision — see [missing-components.md](../phase-2-gap-analysis/missing-components.md#scope).

## Totals

| | |
| --- | --- |
| Items | 10 (0 remediation of shared components/infra, 10 new components) |
| Estimated effort | 62.5–116 engineer-days (12.5–23.2 engineer-weeks) |
| Remaining (excluding done items) | 10 items, 62.5–116 engineer-days |
| By priority | Critical 0 · High 0 · Medium 1 · Low 9 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 22 | [Chart](../component-backlog/chart.md) | Medium | Very Large | — | 10–20 d | KuiReact wraps Chart.js (1.8k LOC); canvas is not available on RN. |
| 23 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibilit… |
| 24 | [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Medium | — | 2–3 d | Selection + bulk actions. |
| 25 | [ColorPicker](../component-backlog/color-picker.md) | Low | Large | — | 5–8 d | Niche input; large (1.2k LOC). |
| 26 | [DataTable](../component-backlog/data-table.md) | Low | Large | — | 5–8 d | Searchable/sortable table (800 LOC). |
| 27 | [DiffViewer](../component-backlog/diff-viewer.md) | Low | Large | — | 5–8 d | Diff display. |
| 28 | [TreeView](../component-backlog/tree-view.md) | Low | Large | — | 5–8 d | Recursive tree; niche on mobile. |
| 29 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | Very Large | data-table, R-spinner | 10–20 d | Selectable table with row actions (2k LOC). |
| 30 | [MapView](../component-backlog/map-view.md) | Low | Very Large | R-button, R-card | 10–20 d | Leaflet map with markers/zones/routes. |
| 31 | [VideoPlayer](../component-backlog/video-player.md) | Low | Very Large | — | 10–20 d | Custom HTML5 player (1.5k LOC). |