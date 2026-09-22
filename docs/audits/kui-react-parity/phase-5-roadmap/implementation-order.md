# Implementation order

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Single ordered list across all waves (dependencies always precede dependants; a dependency is pulled into an earlier wave when needed).

| # | Wave | Item | Priority | Complexity | Blocked by | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | **R-infra-test** Test harness: Jest + @testing-library/react-native + CI — partial: Jest + RNTL harness since `4ebda43`; CI still missing | Critical | Medium | — | 2–3 d |
| 2 | 1 | **R-infra-package** Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | Critical | Large | — | 5–8 d |
| 3 | 1 | **R-infra-lint** ESLint (expo + a11y), token/raw-hex audit, convention rules | High | Small | — | 0.5–1 d |
| 4 | 1 | **R-button** Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) — ✓ done (`2866e66`) | Critical | Small | — | 0.5–1 d |
| 5 | 1 | **R-field-shell** Extract FieldShell (Label, hint, error, success, count) shared by all form controls | Critical | Small | label | 0.5–1 d |
| 6 | 1 | **R-theme-provider** Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | Critical | Small | R-infra-package | 0.5–1 d |
| 7 | 1 | **R-typography** Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage — partial: weights fixed (`048ebed`, `2866e66`); Geist not bundled | Critical | Small | — | 0.5–1 d |
| 8 | 1 | **R-input** Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) — ✓ done (`92af9a3`) | Critical | Medium | R-field-shell | 2–3 d |
| 9 | 1 | **R-overlay-core** Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` — ✓ done (`27def3b`, anchored panels `68ce86d`) | Critical | Medium | — | 2–3 d |
| 10 | 1 | **R-modal** Modal rewrite (see rewrite-candidates.md) — ✓ done (`27def3b`) | Critical | Medium | R-overlay-core | 2–3 d |
| 11 | 1 | **R-fa-version** Align Font Awesome to v7 (KuiReact peer range `>=7`) | High | Small | — | 0.5–1 d |
| 12 | 2 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d |
| 13 | 2 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite — ✓ done (`599c8a1`) | High | Small | — | 0.5–1 d |
| 14 | 2 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) — ✓ done (`3e48fad`) | High | Small | — | 0.5–1 d |
| 15 | 2 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) — ✓ done (`048ebed`: shadow classes + Android elevation) | Medium | Small | — | 0.5–1 d |
| 16 | 2 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) — ✓ done (`dbdbdbd`) | High | Small | R-shadow | 0.5–1 d |
| 17 | 2 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) — ✓ done (`75edb0c`) | High | Small | R-field-shell | 0.5–1 d |
| 18 | 2 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion — partial: Line / Avatar / Text since `048ebed`; Table primitive landed (`b83d87f`) but SkeletonTableRow is still missing | High | Small | — | 0.5–1 d |
| 19 | 2 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) — ✓ done (`5f484a8`) | High | Small | — | 0.5–1 d |
| 20 | 2 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) — ✓ done (`7ca2284`) | Medium | Small | — | 0.5–1 d |
| 21 | 2 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) — partial: sizes fixed in `4ebda43`; two-tone ring still missing | Medium | Small | — | 0.5–1 d |
| 22 | 3 | [Chart](../component-backlog/chart.md) | Medium | Very Large | — | 10–20 d |
| 23 | 3 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Low | Small | — | 0.5–1 d |
| 24 | 3 | [BulkActionTable](../component-backlog/bulk-action-table.md) | Low | Medium | — | 2–3 d |
| 25 | 3 | [ColorPicker](../component-backlog/color-picker.md) | Low | Large | — | 5–8 d |
| 26 | 3 | [DataTable](../component-backlog/data-table.md) | Low | Large | — | 5–8 d |
| 27 | 3 | [DiffViewer](../component-backlog/diff-viewer.md) | Low | Large | — | 5–8 d |
| 28 | 3 | [TreeView](../component-backlog/tree-view.md) | Low | Large | — | 5–8 d |
| 29 | 3 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Low | Very Large | data-table, R-spinner | 10–20 d |
| 30 | 3 | [MapView](../component-backlog/map-view.md) | Low | Very Large | R-button, R-card | 10–20 d |
| 31 | 3 | [VideoPlayer](../component-backlog/video-player.md) | Low | Very Large | — | 10–20 d |

After #31: domain verticals per [wave-3-advanced.md](wave-3-advanced.md).
