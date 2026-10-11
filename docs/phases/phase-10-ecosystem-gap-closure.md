# Phase 10 (KUInative): Ecosystem gap closure

**Canonical plan:** `$KUIREACT_ROOT/docs/phases/phase-10-ecosystem-gap-closure.md`. Section numbers below match it. Read its "Placement and parity rules" first; this file lists only the KUInative tasks.
**Origin:** survey of 2026-10-11 of five reference libraries (shadcnspace, daisyUI, FlyonUI, Preline, Aceternity UI). Evidence ("seen in N/M sites") is quoted in the canonical file.
**Effort:** M for this repo. Every numbered section is an independent PR.

## What stays out of KUInative

Marketing and commerce blocks, the portfolio and agency themes, `CookieConsent` (native apps use the OS consent flow), `Kbd` and `Link` (web-only; `Text` covers link styling), `Scrollspy`, resizable panes and typography prose pages are not created here. Each gets an exception record in kui-react's `parity.exceptions.json` with the reason. Native chat and messaging components are out of scope (the app layer is excluded); revisit only if the owner decides otherwise (canonical "Open decisions").

## Demo rule (applies to every task)

Each new component gets a native demo in `modules/showcase/registry.tsx` with the same variant titles, order and sample copy as the kui-react showcase page, the same sidebar abbreviation, then `npm run showcase:sync`. Tests per component: render, interaction, accessibility roles, light and dark.

## 10.0 Housekeeping

- [ ] Re-check `Timeline` and `BulkActionTable` against the current kui-react classes (kui-ejs is gaining both in phase 10.0, so all three should match).
- [ ] Reconcile the exceptions: kui-react's registry has ui-layer components that KUInative does not (`ControlTile`, `useAsyncControl`, `TimeWindowPicker`, `CodeEditor`, `MapCanvas`). Per the parity rule they are not created here unless needed; make sure each one has a record in `parity.exceptions.json`. `GaugeChart`, `HeatmapChart` and the other chart types are exported as stubs from `modules/ui/Chart/charts/Stubs.tsx`: their real implementation belongs to phase 9 (9.3, 9.4), not this phase.
- [ ] After phase 10.0 in kui-react lands, run `npm run showcase:sync` and confirm no page is dropped or renamed.

## 10.1 Palette presets

- [ ] Add named presets to `libs/theme.ts` (`themes`, `tokenMaps`) from the shared token-preset source (canonical 10.1; first set proposed: `corporate`, `luxury`, `pastel`, `black`, `ocean`, `retro`), each with light and dark values; token names and values identical to kui-react.
- [ ] `configureTheme()` keeps working and is applied on top of the active preset (proposed default, owner to confirm). Overlays re-apply the vars inside RN `Modal` portals as they do today.
- [ ] Preset selection API (for example `useThemePreset()` or a `preset` option) that follows the system scheme, with a test per preset that `tokenMaps` equals the shared source.
- [ ] Showcase: "Presets" variant on the existing "Theme customization" page (Foundations group), with live switching and token swatches per preset.

## 10.2 Primitives

Components in `modules/ui/`, exported from `modules/ui/index.ts`, group names as in kui-react.

- [ ] 10.2.1 `Carousel` (Organisms): paging horizontal list with the same props as the React component (`slidesPerView`, arrows hidden on touch by default, dots, `loop`, `autoplay` paused under reduce-motion), accessibility roles and announcements.
- [ ] 10.2.2 `OtpInput` (Molecules): same props as the React component, `textContentType="oneTimeCode"` and `autoComplete="sms-otp"`, paste splitting, auto-advance, backspace across cells, error state.
- [ ] 10.2.3 `List` and `ListItem` (Molecules): leading and trailing slots, divider, selectable, dense; `Pressable` rows with correct roles.
- [ ] 10.2.4 `Marquee` (Organisms): animated row with `speed`, `direction`, `gap`; static row under reduce-motion.
- [ ] 10.2.5 `SortableList` (App Concepts in kui-react; here under Organisms): drag-to-reorder through the existing gesture-handler setup with the same `onReorder` contract, accessible reorder actions for screen readers. Only if phase 10.2.5 in kui-react proceeds as `[both]` `+native`.

## Definition of done (this repo)

- Every component above has identical props and showcase variant titles to its kui-react counterpart and a native demo reachable from the demo shell sidebar; `showcase.generated.ts` is regenerated and its test passes.
- `npm test`, `npm run typecheck` and `npm run lint` are green; no raw hex values (token audit).
- Absent-by-design components are recorded as exceptions in kui-react, not left implicit.
