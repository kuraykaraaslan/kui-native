# Wave 3 — Advanced

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Nice-to-have: heavy organisms (tables, charts, calendar, media), desktop-web patterns and recommended exceptions. Items with fit `web-only` should be closed by adding an exception entry, not by implementation.

**Domain verticals (217 components)** are also Wave 3. Recommended policy: port `common` (42 components, 42 of them Medium/High) once Wave 2 is complete; record the other 17 verticals as exceptions unless a product needs them — matching KuiReact ADR 0003's treatment of KuiEJS. Domain effort if all were ported: 330–531 engineer-days.

## Totals

| | |
| --- | --- |
| Items | 35 (0 remediation of shared components/infra, 35 new components) |
| Estimated effort | 143.5–267 engineer-days (28.7–53.4 engineer-weeks) |
| By priority | Critical 0 · High 0 · Medium 3 · Low 32 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 83 | [FileUploadSection](../component-backlog/file-upload-section.md) | Medium | Large | file-input, progress | 5–8 d | Upload zone with list/progress/preview. |
| 84 | [ContextMenu](../component-backlog/context-menu.md) | Low | Medium | dropdown-menu, R-overlay-core | 2–3 d | Right-click menu; on native maps to long-press. |
| 85 | [ImageGallery](../component-backlog/image-gallery.md) | Medium | Large | context-menu | 5–8 d | Grid + lightbox. |
| 86 | [Chart](../component-backlog/chart.md) | Medium | Very Large | — | 10–20 d | KuiReact wraps Chart.js (1.8k LOC); canvas is not available on RN. |
| 87 | [Breadcrumb](../component-backlog/breadcrumb.md) | Low | Small | — | 0.5–1 d | Breadcrumbs are uncommon on mobile but required for tablet/web targets of RN. |
| 88 | [Tooltip](../component-backlog/tooltip.md) | Low | Small | popover, R-overlay-core | 0.5–1 d | Hover-driven on web; on touch devices only long-press makes sense. |
| 89 | [AppBreadcrumbs](../component-backlog/app-breadcrumbs.md) | Low | Small | breadcrumb, dropdown-menu, tooltip, R-button | 0.5–1 d | Breadcrumbs with overflow collapse. |
| 90 | [AppFooter](../component-backlog/app-footer.md) | Low | Small | R-badge | 0.5–1 d | Website footer; not a mobile pattern. |
| 91 | [NavDrawer](../component-backlog/nav-drawer.md) | Low | Small | drawer | 0.5–1 d | Trigger + drawer composite. |
| 92 | [AppNav](../component-backlog/app-nav.md) | Low | Small | nav-drawer, R-button | 0.5–1 d | Horizontal top nav with active route; on native replaced by tab bars. |
| 93 | [NotFoundPage](../component-backlog/common-not-found-page.md) | Low | Small | — | 0.5–1 d | Full 404 page (registry id `common-not-found-page`). |
| 94 | [ContentScoreBar](../component-backlog/content-score-bar.md) | Low | Small | — | 0.5–1 d | SEO/content-quality meter; niche. |
| 95 | [MaintenancePage](../component-backlog/maintenance-page.md) | Low | Small | R-badge | 0.5–1 d | Maintenance screen. |
| 96 | [ScrollArea](../component-backlog/scroll-area.md) | Low | Small | — | 0.5–1 d | Styled-scrollbar container; on RN `ScrollView` is already the primitive. |
| 97 | [useA11yCheck](../component-backlog/use-a11y-check.md) | Low | Small | — | 0.5–1 d | Dev-time DOM a11y checker. |
| 98 | [useFocusTrap](../component-backlog/use-focus-trap.md) | Low | Small | — | 0.5–1 d | DOM focus trap for overlays. |
| 99 | [ViewToggle](../component-backlog/view-toggle.md) | Low | Small | — | 0.5–1 d | List/grid switch; small. |
| 100 | [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Medium | table | 2–3 d | Selection + bulk actions. |
| 101 | [CommentThread](../component-backlog/comment-thread.md) | Low | Medium | R-avatar, R-button | 2–3 d | Threaded comments. |
| 102 | [MentionPicker](../component-backlog/mention-picker.md) | Low | Medium | R-avatar, popover | 2–3 d | @mention suggestions. |
| 103 | [DataTable](../component-backlog/data-table.md) | Low | Large | pagination, table, search-bar | 5–8 d | Searchable/sortable table (800 LOC). |
| 104 | [ServerDataTable](../component-backlog/server-data-table.md) | Low | Medium | data-table, pagination, search-bar, R-spinner | 2–3 d | Server-driven table (exported, not in registry). |
| 105 | [ShareDialog](../component-backlog/share-dialog.md) | Low | Medium | R-avatar, R-button, R-modal, R-overlay-core | 2–3 d | Collaboration invite dialog; native share is usually `Share.share`. |
| 106 | [AppCommandBar](../component-backlog/app-command-bar.md) | Low | Large | alert-banner, R-badge, R-button, R-empty-state, R-modal | 5–8 d | ⌘K palette is keyboard-first; mobile equivalent is GlobalSearch. |
| 107 | [ColorPicker](../component-backlog/color-picker.md) | Low | Large | — | 5–8 d | Niche input; large (1.2k LOC). |
| 108 | [DiffViewer](../component-backlog/diff-viewer.md) | Low | Large | — | 5–8 d | Diff display. |
| 109 | [TreeView](../component-backlog/tree-view.md) | Low | Large | — | 5–8 d | Recursive tree; niche on mobile. |
| 110 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | Very Large | data-table, pagination, search-bar, R-spinner, dropdown-menu | 10–20 d | Selectable table with row actions (2k LOC). |
| 111 | [CodeEditor](../component-backlog/code-editor.md) | Low | Very Large | — | 10–20 d | Code editing on phones is rare; KuiEJS already treats it as out of scope. |
| 112 | [FormBuilder](../component-backlog/form-builder.md) | Low | Very Large | — | 10–20 d | Schema form editor (2k LOC); authoring tool, not a mobile pattern. KuiEJS removed it. |
| 113 | [Gantt](../component-backlog/gantt.md) | Low | Very Large | — | 10–20 d | Gantt chart (3k LOC); KuiEJS removed it as out of scope. |
| 114 | [KanbanBoard](../component-backlog/kanban-board.md) | Low | Very Large | R-card | 10–20 d | Drag-and-drop board. |
| 115 | [MapView](../component-backlog/map-view.md) | Low | Very Large | R-button, R-card | 10–20 d | Leaflet map with markers/zones/routes. |
| 116 | [RichTextEditor](../component-backlog/rich-text-editor.md) | Low | Very Large | color-picker, R-button, R-input, R-modal | 10–20 d | Quill-based editor (2.1k LOC); Quill is DOM-only. |
| 117 | [VideoPlayer](../component-backlog/video-player.md) | Low | Very Large | — | 10–20 d | Custom HTML5 player (1.5k LOC). |