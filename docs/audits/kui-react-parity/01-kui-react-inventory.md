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
| Foundation | 2 | 2 | 0 |
| Typography | 1 | 1 | 0 |
| Layout | 4 | 4 | 0 |
| Navigation | 5 | 5 | 0 |
| Forms | 20 | 20 | 0 |
| Feedback | 6 | 6 | 0 |
| Overlay | 6 | 6 | 0 |
| Data Display | 8 | 8 | 0 |
| Tables | 4 | 4 | 0 |
| Charts | 1 | 1 | 0 |
| Media | 3 | 3 | 0 |
| Advanced Components | 1 | 1 | 0 |
| Utility | 1 | 0 | 1 |
| App layer (out of scope) | 40 | 0 | 0 |
| Other (out of scope) | 3 | 0 | 0 |
| Hook (out of scope) | 3 | 0 | 0 |
| Domain — AI (out of scope) | 9 | 0 | 0 |
| Domain — API Doc (out of scope) | 15 | 0 | 0 |
| Domain — Blog (out of scope) | 11 | 0 | 0 |
| Domain — Commerce (out of scope) | 10 | 0 | 0 |
| Domain — Common (out of scope) | 42 | 0 | 0 |
| Domain — Event (out of scope) | 19 | 0 | 0 |
| Domain — Fintech (out of scope) | 12 | 0 | 0 |
| Domain — Food (out of scope) | 11 | 0 | 0 |
| Domain — Forum (out of scope) | 10 | 0 | 0 |
| Domain — IoT (out of scope) | 11 | 0 | 0 |
| Domain — Jobs (out of scope) | 8 | 0 | 0 |
| Domain — Landing (out of scope) | 14 | 0 | 0 |
| Domain — Media (out of scope) | 9 | 0 | 0 |
| Domain — NFT (out of scope) | 16 | 0 | 0 |
| Domain — Real Estate (out of scope) | 5 | 0 | 0 |
| Domain — Reviews (out of scope) | 4 | 0 | 0 |
| Domain — Social (out of scope) | 6 | 0 | 0 |
| Domain — Travel (out of scope) | 5 | 0 | 0 |

## Top 25 by usage

| Component | Prod imports | KuiNative |
| --- | --- | --- |
| Button | 137 | ✓ |
| Badge | 109 | ✓ |
| Avatar | 41 | ✓ |
| Breadcrumb | 26 | ✓ |
| Input | 23 | ✓ |
| SkipLink + LiveRegion | 16 | ✗ |
| SearchBar | 14 | ✓ |
| Modal | 11 | ✓ |
| Textarea | 9 | ✓ |
| Card | 9 | ✓ |
| DropdownMenu | 7 | ✓ |
| BrandLogo | 6 | ✓ |
| EmptyState | 6 | ✓ |
| Select | 5 | ✓ |
| AlertBanner | 5 | ✓ |
| DataTable | 5 | ✓ |
| Spinner | 4 | ✓ |
| Drawer | 4 | ✓ |
| StarRating | 3 | ✓ |
| TagInput | 3 | ✓ |
| Slider | 3 | ✓ |
| StatCard | 3 | ✓ |
| Table | 3 | ✓ |
| RadioGroup | 2 | ✓ |
| Toggle | 2 | ✓ |
