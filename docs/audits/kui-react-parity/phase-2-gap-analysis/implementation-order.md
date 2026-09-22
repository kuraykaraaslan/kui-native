# Implementation order (dependency-driven)

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Topologically sorted by wave → priority → dependency. Domain components follow once their primitives exist and are not listed individually.

| # | Item | Kind | Priority | Complexity | Wave | Blocked by |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | R-infra-test: Test harness: Jest + @testing-library/react-native + CI — partial: Jest + RNTL harness since `4ebda43`; CI still missing | remediation | Critical | Medium | W1 | — |
| 2 | R-infra-package: Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | remediation | Critical | Large | W1 | — |
| 3 | R-infra-lint: ESLint (expo + a11y), token/raw-hex audit, convention rules | remediation | High | Small | W1 | — |
| 4 | R-button: Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) — ✓ done (`2866e66`) | remediation | Critical | Small | W1 | — |
| 5 | R-field-shell: Extract FieldShell (Label, hint, error, success, count) shared by all form controls | remediation | Critical | Small | W1 | label |
| 6 | R-theme-provider: Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | remediation | Critical | Small | W1 | R-infra-package |
| 7 | R-typography: Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage — partial: weights fixed (`048ebed`, `2866e66`); Geist not bundled | remediation | Critical | Small | W1 | — |
| 8 | R-input: Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) — ✓ done (`92af9a3`) | remediation | Critical | Medium | W1 | R-field-shell |
| 9 | R-overlay-core: Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` — ✓ done (`27def3b`, anchored panels `68ce86d`) | remediation | Critical | Medium | W1 | — |
| 10 | R-modal: Modal rewrite (see rewrite-candidates.md) — ✓ done (`27def3b`) | remediation | Critical | Medium | W1 | R-overlay-core |
| 11 | R-fa-version: Align Font Awesome to v7 (KuiReact peer range `>=7`) | remediation | High | Small | W1 | — |
| 12 | R-infra-parity: Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | remediation | High | Medium | W2 | R-infra-test |
| 13 | R-avatar: Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite — ✓ done (`599c8a1`) | remediation | High | Small | W2 | — |
| 14 | R-badge: Badge parity (children, `neutral`, sizes, dot, dismissible) — ✓ done (`3e48fad`) | remediation | High | Small | W2 | — |
| 15 | R-shadow: Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) — ✓ done (`048ebed`: shadow classes + Android elevation) | remediation | Medium | Small | W2 | — |
| 16 | R-card: Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) — ✓ done (`dbdbdbd`) | remediation | High | Small | W2 | R-shadow |
| 17 | R-checkbox: Checkbox parity (hint, error, uncontrolled `defaultChecked`) — ✓ done (`75edb0c`) | remediation | High | Small | W2 | R-field-shell |
| 18 | R-skeleton: Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion — partial: Line / Avatar / Text since `048ebed`; Table primitive landed (`b83d87f`) but SkeletonTableRow is still missing | remediation | High | Small | W2 | — |
| 19 | R-toggle: Switch → Toggle parity (name, checked/onChange, description, size, label press) — ✓ done (`5f484a8`) | remediation | High | Small | W2 | — |
| 20 | R-empty-state: EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) — ✓ done (`7ca2284`) | remediation | Medium | Small | W2 | — |
| 21 | R-spinner: Spinner parity (xs–xl, two-tone ring, md ≠ sm) — partial: sizes fixed in `4ebda43`; two-tone ring still missing | remediation | Medium | Small | W2 | — |
| 22 | [Chart](../component-backlog/chart.md) | new component | Medium | Very Large | W3 | — |
| 23 | [SkipLink + LiveRegion](../component-backlog/skip-link.md) | new component | Low | Small | W3 | — |
| 24 | [BulkActionTable](../component-backlog/bulk-action-table.md) | new component | Low | Medium | W3 | — |
| 25 | [ColorPicker](../component-backlog/color-picker.md) | new component | Low | Large | W3 | — |
| 26 | [DataTable](../component-backlog/data-table.md) | new component | Low | Large | W3 | — |
| 27 | [DiffViewer](../component-backlog/diff-viewer.md) | new component | Low | Large | W3 | — |
| 28 | [TreeView](../component-backlog/tree-view.md) | new component | Low | Large | W3 | — |
| 29 | [AdvancedDataTable](../component-backlog/advanced-data-table.md) | new component | Low | Very Large | W3 | data-table, R-spinner |
| 30 | [MapView](../component-backlog/map-view.md) | new component | Low | Very Large | W3 | R-button, R-card |
| 31 | [VideoPlayer](../component-backlog/video-player.md) | new component | Low | Very Large | W3 | — |