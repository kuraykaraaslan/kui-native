# Changelog

All notable changes to `kui-native` are recorded here. Versions are git tags
(`github:kuraykaraaslan/kui-native#vX.Y.Z`).

## 0.2.0

First release that another Expo app can install as a git dependency.

### Changed

- **Relative imports in package code.** Every `@/…` import in `modules/ui` and `libs` (131 of
  them, tests included) is now a relative path. In a consumer app `@/` resolves against the
  consumer's root, so the aliased imports bound to the wrong modules. An ESLint
  `no-restricted-imports` rule forbids `@/` under `modules/ui/**` and `libs/**`; the showcase
  (`app/`, `modules/showcase/`) keeps the alias.
- **Peer dependencies.** React, React Native, Expo, `expo-image`, `expo-router`, NativeWind,
  Reanimated, Gesture Handler, Safe Area Context, `react-native-svg`, FontAwesome (core, solid,
  RN), `clsx`, `tailwind-merge` and `zustand` are `peerDependencies`. `expo-video`,
  `expo-document-picker`, `expo-clipboard`, `react-native-maps`, `leaflet`, `react-leaflet`,
  `countries-list` and the FontAwesome brands / regular sets are optional peers. All of them stay
  in `devDependencies` at their previous versions for the showcase and tests; `dependencies` is
  gone.
- **Package surface.** `files` limits the package to `modules/ui`, `libs/theme.ts`, `libs/utils`,
  `global.css` and `nativewind-env.d.ts`, without tests. `main` stays `expo-router/entry` (the
  showcase); there is no `exports` map, so deep imports such as `kui-native/modules/ui/Button`
  work.
- `themes` entries are now read through getters (same `themes[scheme]` usage).

### Added

- `configureTheme({ light?, dark? })` in `libs/theme` — overrides design tokens (e.g. a brand
  primary) and regenerates both the NativeWind vars and `useThemeTokens()` so they agree. Not
  calling it keeps the previous palette.
- Exported token types: `TokenName`, `TokenMap`, `ThemeTokens`, `ThemeOverrides`.
- README section "Consuming as a package".
