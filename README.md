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
- **Showcase**: KUIreact's showcase shell, 1:1 — the same sidebar groups and pages
  (generated from KUIreact by `npm run showcase:sync`), detail pages with preview, code and
  source panes in side / stack / grid layouts, and the KUIreact home panel

## Run (on Windows — Android Studio lives here)

All dependencies are pinned at **Expo SDK 57** versions (from the SDK's
`bundledNativeModules`), so a single install is enough.

```bash
npm install
npm run web        # fastest preview
# or: npm run android   (Android emulator / device)
npm test           # Jest + @testing-library/react-native
npm run typecheck  # tsc --noEmit
```

> If `npm install` errors with `ERESOLVE`, retry `npm install --legacy-peer-deps`, then
> `npx expo install --fix` to realign every package to the installed SDK. This project lives
> on the Windows filesystem because React Native / Android tooling (Android Studio,
> emulators) runs on Windows — run all `npm`/`expo` commands from Windows, not WSL.

## Structure (mirrors KUIREACT)

```
app/                      Expo Router — the showcase host
  _layout.tsx             SafeAreaProvider + GestureHandler, imports global.css
  index.tsx               KUIreact-style landing homepage
  component/[id].tsx      component detail (variants canvas + usage code)
modules/
  ui/                     THE LIBRARY — components, *.test.tsx next to each, index.ts barrel
  showcase/registry.tsx   component metadata (usage, preview, variants)
  showcase/ui/            Sidebar (drawer), AppDrawer, Header, ThemeToggle, CodeBlock
libs/
  utils/cn.ts             twMerge(clsx()) — identical to KUIREACT
  utils/tailwind-tokens.js semantic color tokens → var(--color-*)
  utils/typography.ts     font-family + font-weight constants
  config/showcase.config.ts
global.css                @tailwind + :root/.dark semantic tokens (from KUIREACT)
```

## Components

`AlertBanner` · `Avatar` / `AvatarGroup` · `Badge` · `Button` · `Card` · `Checkbox` · `EmptyState`
· `Label` · `Modal` · `Progress` · `RadioGroup` · `Separator` · `SkeletonLine` / `SkeletonAvatar` /
`SkeletonText` / `SkeletonCard` · `Spinner` · `Switch` · `TabGroup` · `Text` · `Textarea` · `TextInput`
— all named exports from [`@/modules/ui`](./modules/ui/index.ts).

Each one is a pixel-for-pixel port of its KuiReact counterpart (same classes, tokens, sizes and
states), and its showcase entry reuses KuiReact's own variant titles and sample copy. Parity
status per component: [docs/audits/kui-react-parity](./docs/audits/kui-react-parity/00-executive-summary.md).

Conventions (per `UI_Interface_Rules_ReactNative`): Pressable-first, `cn()` for class
merging, `accessibilityRole`/`Label`/`State` on interactive elements, `expo-image` for
images, semantic token classes only (raw colors appear only where an RN prop has no
`className` — `placeholderTextColor`, `trackColor`, FontAwesome `color`, the modal backdrop).

## Add a component

1. Create `modules/ui/MyThing.tsx` (named export, variant/size maps, `cn()`, a11y props).
2. Export it from `modules/ui/index.ts`.
3. Add an entry to `modules/showcase/registry.tsx` (`id`, `title`, `category`, `description`, `icon`, `usage`, `preview`, `variants`) so it appears in the showcase. Use the KuiReact component's showcase variant titles and copy verbatim.
4. Add `MyThing.test.tsx` next to it. With `@testing-library/react-native` v14, `render()` and `fireEvent()` are async — always `await` them.

## Notes

- Fonts: the base uses the OS system font (zero assets). To match KUIREACT's Geist, bundle
  Geist / Geist Mono, load them via `expo-font` in `app/_layout.tsx`, then update
  `libs/utils/typography.ts`. Weights come from `fontWeight`, not from swapping families.
- Token values are copied from `$KUIREACT_ROOT/app/globals.css` — keep them in sync when the
  web palette changes.
- Heavier KUIREACT layers (`modules/domains`, `modules/app`, a richer playground) are
  intentionally omitted from this minimal base; add them the same way when needed.

[KUIREACT]: https://github.com/kuraykaraaslan/kui-react
