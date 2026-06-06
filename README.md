# KUInative

Minimal **React Native** component library — the Expo/NativeWind member of the KUI family
(`kui-react` → web, `kui-ejs` → server-rendered, **`kui-native` → mobile**). Mirrors
[KUIREACT]'s logic: a layered `modules/ui` library + a small showcase app, on the same
semantic design tokens so the palette matches the web library 1:1.

> In the rules repo this project is referenced as `$KUINATIVE_ROOT`
> (see `00_Config_and_AI_Rules/LOCAL_PATHS.json`) and is the bound RN UI source in
> `UI_Interface_Rules_ReactNative`.

## Stack

- **Expo** (Expo Router) + React Native — aligned to `expo-react-native-boilerplate`
- **NativeWind v4** + Tailwind 3.4 — `className` styling
- **Semantic tokens** (KUIREACT-style): `bg-primary`, `text-text-primary`, `border-border`, …
  defined as CSS variables in [`global.css`](./global.css), mapped in
  [`tailwind.config.js`](./tailwind.config.js) via [`libs/utils/tailwind-tokens.js`](./libs/utils/tailwind-tokens.js)
- **Dark mode**: runtime **light / dark / system** toggle (header button) via NativeWind
  `vars()` applied at the app root (`libs/theme.ts`); component raw colors (Switch track,
  Spinner, placeholder…) follow it through `useThemeTokens()`
- **Showcase**: searchable, category-grouped home with live preview cards; each detail screen
  shows the variants in a canvas plus a copy-able usage snippet

## Run (on Windows — Android Studio lives here)

All dependencies are pinned at **Expo SDK 55** versions (from the SDK's
`bundledNativeModules`), so a single install is enough.

```bash
npm install
npm run web        # fastest preview
# or: npm run android   (Android emulator / device)
```

> If `npm install` errors with `ERESOLVE`, retry `npm install --legacy-peer-deps`, then
> `npx expo install --fix` to realign every package to the installed SDK. This project lives
> on the Windows filesystem because React Native / Android tooling (Android Studio,
> emulators) runs on Windows — run all `npm`/`expo` commands from Windows, not WSL.

## Structure (mirrors KUIREACT)

```
app/                      Expo Router — the showcase host
  _layout.tsx             SafeAreaProvider + GestureHandler, imports global.css
  index.tsx               component list
  component/[id].tsx      component detail (renders variants)
modules/
  ui/                     THE LIBRARY — 12 components + index.ts barrel
  showcase/registry.tsx   showcase metadata (id, title, category, variants)
libs/
  utils/cn.ts             twMerge(clsx()) — identical to KUIREACT
  utils/tailwind-tokens.js semantic color tokens → var(--color-*)
  utils/typography.ts     font-family constants
  config/showcase.config.ts
global.css                @tailwind + :root/.dark semantic tokens (from KUIREACT)
```

## Components (12)

`Button` · `Text` · `Card` · `Avatar` · `Badge` · `TextInput` · `Checkbox` · `Switch`
· `Spinner` · `EmptyState` · `SkeletonCard` · `Modal` — all named exports from
[`@/modules/ui`](./modules/ui/index.ts).

Conventions (per `UI_Interface_Rules_ReactNative`): Pressable-first, `cn()` for class
merging, `accessibilityRole`/`Label`/`State` on interactive elements, `expo-image` for
images, semantic token classes only (raw colors appear only where an RN prop has no
`className` — `placeholderTextColor`, `trackColor`, FontAwesome `color`, the modal backdrop).

## Add a component

1. Create `modules/ui/MyThing.tsx` (named export, variant/size maps, `cn()`, a11y props).
2. Export it from `modules/ui/index.ts`.
3. Add an entry to `modules/showcase/registry.tsx` (`id`, `title`, `category`, `description`, `icon`, `usage`, `preview`, `variants`) so it appears in the showcase.

## Notes

- Fonts: the base uses the OS system font (zero assets). To match KUIREACT's Inter, bundle
  the font and load via `expo-font` in `app/_layout.tsx`, then update `libs/utils/typography.ts`.
- Token values are copied from `$KUIREACT_ROOT/app/globals.css` — keep them in sync when the
  web palette changes.
- Heavier KUIREACT layers (`modules/domains`, `modules/app`, a richer playground) are
  intentionally omitted from this minimal base; add them the same way when needed.

[KUIREACT]: ../01_NextJS_Components
