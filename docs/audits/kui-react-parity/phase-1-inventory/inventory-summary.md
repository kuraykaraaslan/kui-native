# Inventory summary

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

## Headline numbers

| Metric | Value |
| --- | --- |
| KuiReact catalogued components (registry) | 315 (ui 63, app 34, domain 217, external library 1) |
| KuiReact barrel exports missing from its own registry | 7 components + 3 internal hooks |
| KuiReact audited entries (total) | 325 |
| KuiReact core (ui + app + hooks, excl. external) | 107 |
| KuiNative library exports | 13 (12 components; `AvatarGroup` counted with `Avatar`) |
| Shared components (counterpart exists) | 11 KuiReact ids ↔ 12 KuiNative exports |
| KuiNative-only components | 1 (`Text`) |
| Missing from KuiNative (total) | 313 |
| — of which core (ui/app/hooks) | 96 |
| — of which domain verticals | 217 |
| Core coverage | 11 / 107 = **10.3 %** |
| Total coverage (incl. domains) | 11 / 324 = **3.4 %** |
| Color tokens | 33 / 33 names and light+dark values identical |

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

## Most-used KuiReact components (production imports) and KuiNative status

Usage frequency = distinct files under `modules/**` and `app/theme/**` importing the component.

| # | Component | Prod imports | Showcase imports | KuiNative |
| --- | --- | --- | --- | --- |
| 1 | Button | 137 | 13 | ✓ Button |
| 2 | Badge | 109 | 8 | ✓ Badge |
| 3 | Avatar | 41 | 2 | ✓ Avatar + AvatarGroup |
| 4 | Breadcrumb | 26 | 1 | ✗ |
| 5 | Input | 23 | 2 | ✓ TextInput |
| 6 | SkipLink + LiveRegion | 16 | 1 | ✗ |
| 7 | SearchBar | 14 | 1 | ✗ |
| 8 | Modal | 11 | 1 | ✓ Modal |
| 9 | Form | 11 | 1 | ✗ |
| 10 | Textarea | 9 | 3 | ✗ |
| 11 | Card | 9 | 1 | ✓ Card |
| 12 | NavDrawer | 8 | 1 | ✗ |
| 13 | DropdownMenu | 7 | 1 | ✗ |
| 14 | BrandLogo | 6 | 2 | ✗ |
| 15 | EmptyState | 6 | 1 | ✓ EmptyState |
| 16 | useFocusTrap | 6 | 0 | ✗ |
| 17 | Select | 5 | 2 | ✗ |
| 18 | AlertBanner | 5 | 2 | ✗ |
| 19 | DataTable | 5 | 1 | ✗ |
| 20 | Spinner | 4 | 2 | ✓ Spinner |
| 21 | Drawer | 4 | 2 | ✗ |
| 22 | AppShell | 4 | 2 | ✗ |
| 23 | InlineAlert | 4 | 1 | ✗ |
| 24 | StarRating | 3 | 1 | ✗ |
| 25 | TagInput | 3 | 1 | ✗ |

Of the 25 most-used KuiReact components, KuiNative has 8. The missing heavy-hitters (Breadcrumb, SkipLink + LiveRegion, SearchBar, Form, Textarea, NavDrawer, …) block any port of KuiReact's domain and app layers.

## Hooks, providers, theme utilities

| Kind | KuiReact | KuiNative |
| --- | --- | --- |
| Hooks | `useToastStore`, `useToast`, `useAnnounce`, `useDirection`, `useBreakpoint`, `useFocusTrap`, `useA11yCheck`, overlay hooks (`usePresence`, `useDismiss`, `useScrollLock`, `usePortal`, `useRouteClose`) | `useThemeMode`, `useResolvedScheme`, `useThemeTokens` (theme only) |
| Providers | `ToastProvider`/`Toaster`, `NotificationProvider`, `DirectionProvider` | none |
| Theme | CSS variables (`globals.css`), `ThemeSwitcher`, `./styles` export | `themes`/`tokenMaps` + `vars()` at app root (showcase), `ThemeToggle` (showcase-private) |
| Utilities | `cn`, `polymorphic`, `announce`, `DocumentTitle`, `isBrowser` | `cn` (identical), `FONTS` |
