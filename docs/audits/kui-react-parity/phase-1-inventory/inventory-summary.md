# Inventory summary

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

## Headline numbers

| Metric | Value |
| --- | --- |
| KuiReact catalogued components (registry) | 315 (ui 63, app 34, domain 217, external library 1) |
| KuiReact barrel exports missing from its own registry | 7 components + 3 internal hooks |
| KuiReact audited entries (total) | 325 |
| KuiReact in-scope (ui-layer Atom/Molecule/Organism) | 62 |
| KuiReact out of scope (app layer, domains, hooks, external library, other ui categories) | 263 |
| KuiNative library exports | 48 from 36 component modules (the `toast()` API and its hooks count as exports) |
| Shared components (counterpart exists) | 34 KuiReact ids ↔ 43 KuiNative exports |
| KuiNative-only components | 1 (`Text`) |
| Missing from KuiNative (in scope) | 28 |
| In-scope coverage | 34 / 62 = **54.8 %** |
| Color tokens | 33 / 33 names and light+dark values identical |

## By category

| Category | KuiReact | Shared with KuiNative | Missing in KuiNative |
| --- | --- | --- | --- |
| Foundation | 2 | 1 | 1 |
| Typography | 1 | 1 | 0 |
| Layout | 4 | 3 | 1 |
| Navigation | 5 | 4 | 1 |
| Forms | 20 | 11 | 9 |
| Feedback | 6 | 6 | 0 |
| Overlay | 6 | 5 | 1 |
| Data Display | 8 | 3 | 5 |
| Tables | 4 | 0 | 4 |
| Charts | 1 | 0 | 1 |
| Media | 3 | 0 | 3 |
| Advanced Components | 1 | 0 | 1 |
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

## Most-used KuiReact components (production imports) and KuiNative status

Usage frequency = distinct files under `modules/**` and `app/theme/**` importing the component.

| # | Component | Prod imports | Showcase imports | KuiNative |
| --- | --- | --- | --- | --- |
| 1 | Button | 137 | 13 | ✓ Button |
| 2 | Badge | 109 | 8 | ✓ Badge |
| 3 | Avatar | 41 | 2 | ✓ Avatar + AvatarGroup |
| 4 | Breadcrumb | 26 | 1 | ✓ Breadcrumb |
| 5 | Input | 23 | 2 | ✓ Input + TextInput |
| 6 | SkipLink + LiveRegion | 16 | 1 | ✗ |
| 7 | SearchBar | 14 | 1 | ✓ SearchBar |
| 8 | Modal | 11 | 1 | ✓ Modal |
| 9 | Textarea | 9 | 3 | ✓ Textarea |
| 10 | Card | 9 | 1 | ✓ Card |
| 11 | DropdownMenu | 7 | 1 | ✓ DropdownMenu |
| 12 | BrandLogo | 6 | 2 | ✗ |
| 13 | EmptyState | 6 | 1 | ✓ EmptyState |
| 14 | Select | 5 | 2 | ✓ Select |
| 15 | AlertBanner | 5 | 2 | ✓ AlertBanner |
| 16 | DataTable | 5 | 1 | ✗ |
| 17 | Spinner | 4 | 2 | ✓ Spinner |
| 18 | Drawer | 4 | 2 | ✓ Drawer |
| 19 | StarRating | 3 | 1 | ✗ |
| 20 | TagInput | 3 | 1 | ✗ |
| 21 | Slider | 3 | 2 | ✗ |
| 22 | StatCard | 3 | 1 | ✗ |
| 23 | Table | 3 | 1 | ✗ |
| 24 | RadioGroup | 2 | 1 | ✓ RadioGroup |
| 25 | Toggle | 2 | 2 | ✓ Toggle + Switch |

Of the 25 most-used KuiReact components, KuiNative has 17. The missing heavy-hitters (SkipLink + LiveRegion, BrandLogo, DataTable, StarRating, TagInput, Slider, …) block any port of KuiReact's domain and app layers.

## Hooks, providers, theme utilities

| Kind | KuiReact | KuiNative |
| --- | --- | --- |
| Hooks | `useToastStore`, `useToast`, `useAnnounce`, `useDirection`, `useBreakpoint`, `useFocusTrap`, `useA11yCheck`, overlay hooks (`usePresence`, `useDismiss`, `useScrollLock`, `usePortal`, `useRouteClose`) | `useThemeMode`, `useResolvedScheme`, `useThemeTokens` (theme only) |
| Providers | `ToastProvider`/`Toaster`, `NotificationProvider`, `DirectionProvider` | none |
| Theme | CSS variables (`globals.css`), `ThemeSwitcher`, `./styles` export | `themes`/`tokenMaps` + `vars()` at app root (showcase), `ThemeToggle` (showcase-private) |
| Utilities | `cn`, `polymorphic`, `announce`, `DocumentTitle`, `isBrowser` | `cn` (identical), `FONTS` |
