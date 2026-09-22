# Wave 3 — Advanced

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Nice-to-have: heavy organisms (tables, charts, calendar, media), desktop-web patterns and recommended exceptions. Items with fit `web-only` should be closed by adding an exception entry, not by implementation.

App-layer components, domain verticals (217 components) and theme demos are out of scope for this roadmap by decision — see [missing-components.md](../phase-2-gap-analysis/missing-components.md#scope).

## Totals

| | |
| --- | --- |
| Items | 15 (0 remediation of shared components/infra, 15 new components) |
| Estimated effort | 65–121 engineer-days (13.0–24.2 engineer-weeks) |
| By priority | Critical 0 · High 0 · Medium 1 · Low 14 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 51 | [Chart](../component-backlog/chart.md) | Medium | Very Large | — | 10–20 d | KuiReact wraps Chart.js (1.8k LOC); canvas is not available on RN. |
| 52 | [Breadcrumb](../component-backlog/breadcrumb.md) | Low | Small | — | 0.5–1 d | Breadcrumbs are uncommon on mobile but required for tablet/web targets of RN. |
| 53 | [ContentScoreBar](../component-backlog/content-score-bar.md) | Low | Small | — | 0.5–1 d | SEO/content-quality meter; niche. |
| 54 | [ScrollArea](../component-backlog/scroll-area.md) | Low | Small | — | 0.5–1 d | Styled-scrollbar container; on RN `ScrollView` is already the primitive. |
| 55 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibilit… |
| 56 | [Tooltip](../component-backlog/tooltip.md) | Low | Small | popover, R-overlay-core | 0.5–1 d | Hover-driven on web; on touch devices only long-press makes sense. |
| 57 | [ViewToggle](../component-backlog/view-toggle.md) | Low | Small | — | 0.5–1 d | List/grid switch; small. |
| 58 | [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Medium | table | 2–3 d | Selection + bulk actions. |
| 59 | [ColorPicker](../component-backlog/color-picker.md) | Low | Large | — | 5–8 d | Niche input; large (1.2k LOC). |
| 60 | [DataTable](../component-backlog/data-table.md) | Low | Large | pagination, table, search-bar | 5–8 d | Searchable/sortable table (800 LOC). |
| 61 | [DiffViewer](../component-backlog/diff-viewer.md) | Low | Large | — | 5–8 d | Diff display. |
| 62 | [TreeView](../component-backlog/tree-view.md) | Low | Large | — | 5–8 d | Recursive tree; niche on mobile. |
| 63 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | Very Large | data-table, pagination, search-bar, R-spinner, dropdown-menu | 10–20 d | Selectable table with row actions (2k LOC). |
| 64 | [MapView](../component-backlog/map-view.md) | Low | Very Large | R-button, R-card | 10–20 d | Leaflet map with markers/zones/routes. |
| 65 | [VideoPlayer](../component-backlog/video-player.md) | Low | Very Large | — | 10–20 d | Custom HTML5 player (1.5k LOC). |