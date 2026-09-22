# Wave 1 — Critical

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Required before serious production adoption. Wave 1 fixes the foundations (packaging, theme provider, typography, tests), brings the three most-used shared components (Button, Input, Modal) to parity, and adds the primitives no app can ship without (Select, Textarea, RadioGroup, Toast, Drawer/sheet, TabGroup, AlertBanner, Progress, Label, Separator, loading/error states).

**Exit criteria:** KuiNative installs as a package; a consumer can build a themed, accessible login + settings + list screen without reaching for another UI library; every Wave 1 component has tests and a showcase entry.

## Totals

| | |
| --- | --- |
| Items | 28 (13 remediation of shared components/infra, 15 new components) |
| Estimated effort | 30.5–51 engineer-days (6.1–10.2 engineer-weeks) |
| By priority | Critical 19 · High 7 · Medium 2 · Low 0 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | **R-infra-test** Test harness: Jest + @testing-library/react-native + CI | Critical | Medium | — | 2–3 d | KuiNative has zero tests; KuiReact has 18 unit-test files + 739 visual snapshots. Every later item's acceptance criteria require tests. |
| 2 | **R-infra-package** Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset) | Critical | Large | — | 5–8 d | `package.json` is `private: true` with `main: expo-router/entry`; the library cannot be installed. KuiReact ships `@kuraykaraaslan/kui-reac… |
| 3 | **R-infra-lint** ESLint (expo + a11y), token/raw-hex audit, convention rules | High | Small | — | 0.5–1 d | `expo lint` script exists but no config; KuiReact enforces cn(), no default export, token-only styling via custom rules + audits. |
| 4 | [AlertBanner](../component-backlog/alert-banner.md) | Critical | Small | — | 0.5–1 d | Inline semantic alerts (success/error/warning/info) with title/message/action; basic feedback surface. |
| 5 | [Label](../component-backlog/label.md) | Critical | Small | — | 0.5–1 d | Every KuiReact form control renders its label with the same required-marker + disabled treatment; KuiNative duplicates ad-hoc label Text in… |
| 6 | **R-button** Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens) | Critical | Small | — | 0.5–1 d | Most-imported KuiReact component (137 production imports) and the one a KuiReact developer tries first. |
| 7 | **R-field-shell** Extract FieldShell (Label, hint, error, success, count) shared by all form controls | Critical | Small | label | 0.5–1 d | KuiReact Input/Textarea/Select/Checkbox share one label/hint/error convention; KuiNative re-implements a subset per component. |
| 8 | **R-theme-provider** Export a `KuiProvider` (token `vars()` + scheme resolution) from the library | Critical | Small | R-infra-package | 0.5–1 d | Theme wiring lives in the showcase `app/_layout.tsx`; a consumer gets unthemed components. |
| 9 | **R-typography** Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage | Critical | Small | — | 0.5–1 d | Heading variants set `fontFamily: 'System'` with no `fontWeight`, so h1–h4 render regular-weight on iOS/web; README claims Inter while KuiR… |
| 10 | [RadioGroup](../component-backlog/radio-group.md) | Critical | Small | R-field-shell | 0.5–1 d | Mutually-exclusive choice control; core form primitive. |
| 11 | [Separator](../component-backlog/separator.md) | Critical | Small | — | 0.5–1 d | Trivial primitive used by DropdownMenu, Card sections, lists and settings screens; its absence forces raw `View` borders everywhere. |
| 12 | [TabGroup](../component-backlog/tab-group.md) | Critical | Small | — | 0.5–1 d | In-screen tabs (tabs/activeTab/onChange) are a staple of mobile screens. |
| 13 | [Textarea](../component-backlog/textarea.md) | Critical | Small | R-field-shell | 0.5–1 d | Multi-line text entry is a baseline form control; KuiReact has a dedicated component with label/hint/error/count. |
| 14 | **R-overlay-core** Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared` | Critical | Medium | — | 2–3 d | KuiReact Modal/Drawer/Popover share presence, focus-trap, scroll-lock, portal and positioning hooks. KuiNative has no shared overlay layer,… |
| 15 | [Drawer](../component-backlog/drawer.md) | Critical | Medium | R-overlay-core | 2–3 d | Side/bottom sheets are the primary overlay on mobile; KuiReact Drawer shares the Overlays/shared primitives with Modal. |
| 16 | [Progress](../component-backlog/progress.md) | Critical | Medium | — | 2–3 d | Determinate progress (bar + circle) is a baseline feedback primitive for uploads, onboarding and quotas. |
| 17 | **R-input** Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref) | Critical | Medium | R-field-shell | 2–3 d | 8 KuiReact features missing; name differs. |
| 18 | **R-modal** Modal rewrite (see rewrite-candidates.md) | Critical | Medium | R-overlay-core | 2–3 d | Merged accessibility tree, no close button, no scroll, no sizes, `visible` vs `open`. |
| 19 | [Select](../component-backlog/select.md) | Critical | Medium | R-overlay-core, R-field-shell | 2–3 d | Single-select is the most common form control after Input; forms cannot be built without it. |
| 20 | [Toast](../component-backlog/toast.md) | Critical | Medium | — | 2–3 d | Transient notifications with a programmatic `toast()` store are required by virtually every app; KuiReact exports Toast, ToastProvider, Toa… |
| 21 | [FocusTrap](../component-backlog/accessibility-kit.md) | High | Small | R-overlay-core | 0.5–1 d | Announcer, AnnouncerOutlet, FocusTrap, LiveRegion, useAnnounce (exported, not in registry). |
| 22 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) | Medium | Small | — | 0.5–1 d | `actionLabel/onAction` cannot express KuiReact's arbitrary action node. _(pulled into this wave because error-state depends on it)_ |
| 23 | [ErrorState](../component-backlog/error-state.md) | High | Small | alert-banner, R-button, R-empty-state | 0.5–1 d | Page-level error with retry; pairs with EmptyState. |
| 24 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) | Medium | Small | — | 0.5–1 d | `sm` and `md` render identically; xs/xl missing. _(pulled into this wave because loading-state depends on it)_ |
| 25 | [LoadingState](../component-backlog/loading-state.md) | High | Small | R-spinner | 0.5–1 d | Page-level loading pattern (5 variants) built on Spinner/Skeleton; screens need it immediately. |
| 26 | [NotificationProvider](../component-backlog/notification-system.md) | High | Small | toast | 0.5–1 d | KuiReact `NotificationProvider` + `notify()`/`toast()` app-level API (exported, not in registry). |
| 27 | **R-fa-version** Align Font Awesome to v7 (KuiReact peer range `>=7`) | High | Small | — | 0.5–1 d | ADR 0003 requires same icon-set version; KuiNative pins `^6.7.2`. |
| 28 | [useBreakpoint](../component-backlog/use-breakpoint.md) | High | Small | — | 0.5–1 d | Responsive hook (libs/hooks/useBreakpoint.ts) used by responsive components. |