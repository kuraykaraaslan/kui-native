# 01 · KuiReact inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Full per-component table: [phase-1-inventory/kui-react-components.md](phase-1-inventory/kui-react-components.md) · exports: [phase-1-inventory/public-exports.md](phase-1-inventory/public-exports.md) · summary: [phase-1-inventory/inventory-summary.md](phase-1-inventory/inventory-summary.md)

## Shape of KuiReact

- **Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Font Awesome 7 · zustand · zod · react-hook-form. Published as `@kuraykaraaslan/kui-react` 1.0.1 (tsup, ESM+CJS+d.ts).
- **Layers:** `modules/ui` (atoms/molecules/organisms), `modules/app` (app patterns, providers), `modules/domains/<vertical>` (18 industry verticals), `app/theme/<vertical>` (18 demo themes).
- **Catalog:** 315 registry entries + 10 barrel exports/hooks missing from the registry = **325 audited entries**.
- **Quality infrastructure:** 18 unit-test files (vitest + Testing Library), 739 Playwright visual snapshots, 3 CI workflows, 4 custom ESLint rules, token/spacing/convention audit scripts, machine-readable registry (JSON + JSON Schema + per-component markdown + MCP server + llms.txt), 4 ADRs.

## By category

| Category | KuiReact | Shared with KuiNative | Missing in KuiNative |
| --- | --- | --- | --- |
| Foundation | 2 | 1 | 1 |
| Typography | 1 | 0 | 1 |
| Layout | 9 | 1 | 8 |
| Navigation | 13 | 0 | 13 |
| Forms | 26 | 3 | 23 |
| Feedback | 14 | 3 | 11 |
| Overlay | 8 | 1 | 7 |
| Data Display | 8 | 2 | 6 |
| Tables | 5 | 0 | 5 |
| Charts | 1 | 0 | 1 |
| Media | 4 | 0 | 4 |
| Advanced Components | 9 | 0 | 9 |
| Providers | 2 | 0 | 2 |
| Hooks | 3 | 0 | 3 |
| Theme | 1 | 0 | 1 |
| Utility | 1 | 0 | 1 |
| Other (external library) | 1 | 0 | 0 |
| Domain — Common | 42 | 0 | 42 |
| Domain — AI | 9 | 0 | 9 |
| Domain — API Doc | 15 | 0 | 15 |
| Domain — Blog | 11 | 0 | 11 |
| Domain — Commerce | 10 | 0 | 10 |
| Domain — Event | 19 | 0 | 19 |
| Domain — Fintech | 12 | 0 | 12 |
| Domain — Food | 11 | 0 | 11 |
| Domain — Forum | 10 | 0 | 10 |
| Domain — IoT | 11 | 0 | 11 |
| Domain — Jobs | 8 | 0 | 8 |
| Domain — Landing | 14 | 0 | 14 |
| Domain — Media | 9 | 0 | 9 |
| Domain — NFT | 16 | 0 | 16 |
| Domain — Real Estate | 5 | 0 | 5 |
| Domain — Reviews | 4 | 0 | 4 |
| Domain — Social | 6 | 0 | 6 |
| Domain — Travel | 5 | 0 | 5 |

## Top 25 by usage

| Component | Prod imports | KuiNative |
| --- | --- | --- |
| Button | 137 | ✓ |
| Badge | 109 | ✓ |
| Avatar | 41 | ✓ |
| Breadcrumb | 26 | ✗ |
| Input | 23 | ✓ |
| SkipLink + LiveRegion | 16 | ✗ |
| SearchBar | 14 | ✗ |
| Modal | 11 | ✓ |
| Form | 11 | ✗ |
| Textarea | 9 | ✗ |
| Card | 9 | ✓ |
| NavDrawer | 8 | ✗ |
| DropdownMenu | 7 | ✗ |
| BrandLogo | 6 | ✗ |
| EmptyState | 6 | ✓ |
| useFocusTrap | 6 | ✗ |
| Select | 5 | ✗ |
| AlertBanner | 5 | ✗ |
| DataTable | 5 | ✗ |
| Spinner | 4 | ✓ |
| Drawer | 4 | ✗ |
| AppShell | 4 | ✗ |
| InlineAlert | 4 | ✗ |
| StarRating | 3 | ✗ |
| TagInput | 3 | ✗ |
