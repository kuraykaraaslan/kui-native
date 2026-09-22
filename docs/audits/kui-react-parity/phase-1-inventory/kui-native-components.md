# KuiNative component inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Every export of `modules/ui/index.ts`, every theme utility, and showcase-private components that shadow KuiReact library components.

## Package status

| Aspect | Value | Evidence |
| --- | --- | --- |
| Package name | `kui-native` 0.1.0 | `package.json` |
| Publishable | **No** — `"private": true`, `"main": "expo-router/entry"`, no `exports`, no build script | `package.json` |
| Public import path | `@/modules/ui` (repo-internal alias only) | `modules/ui/index.ts`, `babel.config.js` |
| Library components | 13 exports from 12 files | `modules/ui/index.ts` |
| Type exports | 12 `*Props` types (`AvatarGroup` has no exported props type) | `modules/ui/index.ts` |
| Hooks exported from library | 0 (theme hooks live in `libs/theme.ts`, not in the barrel) | — |
| Providers exported | 0 | — |
| Tests | 0 files | `git ls-files` |

"Public" below therefore means *exported from the `@/modules/ui` barrel*; nothing is installable by a consumer today.

## Library components (13)

| Component | Category | File | Export path | Public status | LOC | Props | Depends on | Used by (repo) | a11y props used | Raw colors | KuiReact counterpart |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Avatar | Data Display | `modules/ui/Avatar.tsx` | `@/modules/ui` | barrel export | 84 | 4 | Text | 2 | accessibilityLabel, accessibilityRole | 0 | Avatar (`avatar`) |
| AvatarGroup | Data Display | `modules/ui/Avatar.tsx` | `@/modules/ui` | barrel export | 84 | 2 | Text | 2 | accessibilityLabel, accessibilityRole | 0 | Avatar (`avatar`) |
| Badge | Data Display | `modules/ui/Badge.tsx` | `@/modules/ui` | barrel export | 40 | 3 | Text | 3 | — | 0 | Badge (`badge`) |
| Button | Foundation | `modules/ui/Button.tsx` | `@/modules/ui` | barrel export | 90 | 9 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Button (`button`) |
| Card | Layout | `modules/ui/Card.tsx` | `@/modules/ui` | barrel export | 47 | 6 + ViewProps | Text | 2 | — | 0 | Card (`card`) |
| Checkbox | Forms | `modules/ui/Checkbox.tsx` | `@/modules/ui` | barrel export | 53 | 6 | Text | 2 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Checkbox (`checkbox`) |
| EmptyState | Feedback | `modules/ui/EmptyState.tsx` | `@/modules/ui` | barrel export | 50 | 6 | Button, Text | 3 | — | 0 | EmptyState (`empty-state`) |
| Modal | Overlay | `modules/ui/Modal.tsx` | `@/modules/ui` | barrel export | 52 | 6 | Text | 2 | accessibilityViewIsModal | 1 | Modal (`modal`) |
| SkeletonCard | Feedback | `modules/ui/SkeletonCard.tsx` | `@/modules/ui` | barrel export | 39 | 1 | — | 2 | accessibilityLabel, accessibilityRole | 0 | Skeleton (`skeleton`) |
| Spinner | Feedback | `modules/ui/Spinner.tsx` | `@/modules/ui` | barrel export | 33 | 3 | — | 2 | accessibilityLabel, accessibilityRole | 0 | Spinner (`spinner`) |
| Switch | Forms | `modules/ui/Switch.tsx` | `@/modules/ui` | barrel export | 41 | 5 | Text | 2 | accessibilityLabel, accessibilityRole, accessibilityState | 1 | Toggle (`toggle`) |
| Text | Typography | `modules/ui/Text.tsx` | `@/modules/ui` | barrel export | 47 | 2 + TextProps | — | 15 | — | 0 | none (native-only) |
| TextInput | Forms | `modules/ui/TextInput.tsx` | `@/modules/ui` | barrel export | 66 | 5 + TextInputProps | Text | 3 | accessibilityLabel | 0 | Input (`input`) |

## Props per component (parsed)

### Avatar

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| name | `string` | **yes** | — |
| src | `string` | no | — |
| size | `AvatarSize` | no | `"md"` |
| className | `string` | no | — |

### AvatarGroup

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| children | `React.ReactNode` | **yes** | — |
| className | `string` | no | — |

### Badge

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| label | `string` | **yes** | — |
| variant | `BadgeVariant` | no | `"default"` |
| className | `string` | no | — |

### Button

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| label | `string` | **yes** | — |
| onPress | `() => void` | no | — |
| variant | `ButtonVariant` | no | `"primary"` |
| size | `ButtonSize` | no | `"md"` |
| loading | `boolean` | no | `false` |
| disabled | `boolean` | no | `false` |
| fullWidth | `boolean` | no | `false` |
| iconLeft | `React.ReactNode` | no | — |
| className | `string` | no | — |

### Card

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| title | `string` | no | — |
| subtitle | `string` | no | — |
| footer | `React.ReactNode` | no | — |
| variant | `CardVariant` | no | `"raised"` |
| className | `string` | no | — |
| children | `React.ReactNode` | no | — |

Extends: `ViewProps`

### Checkbox

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| checked | `boolean` | **yes** | — |
| onChange | `(next: boolean) => void` | no | — |
| label | `string` | no | — |
| indeterminate | `boolean` | no | `false` |
| disabled | `boolean` | no | `false` |
| className | `string` | no | — |

### EmptyState

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| icon | `IconDefinition` | no | `faInbox` |
| title | `string` | **yes** | — |
| description | `string` | no | — |
| actionLabel | `string` | no | — |
| onAction | `() => void` | no | — |
| className | `string` | no | — |

### Modal

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| visible | `boolean` | **yes** | — |
| onClose | `() => void` | **yes** | — |
| title | `string` | no | — |
| footer | `React.ReactNode` | no | — |
| children | `React.ReactNode` | no | — |
| className | `string` | no | — |

### SkeletonCard

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| className | `string` | no | — |

### Spinner

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| size | `SpinnerSize` | no | `"md"` |
| color | `string` | no | — |
| className | `string` | no | — |

### Switch

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| value | `boolean` | **yes** | — |
| onValueChange | `(next: boolean) => void` | no | — |
| label | `string` | no | — |
| disabled | `boolean` | no | `false` |
| className | `string` | no | — |

### Text

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| variant | `TextVariant` | no | `"body"` |
| className | `string` | no | — |

Extends: `RNTextProps`

### TextInput

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| label | `string` | no | — |
| hint | `string` | no | — |
| error | `string` | no | — |
| className | `string` | no | — |
| containerClassName | `string` | no | — |

Extends: `RNTextInputProps`

## Theme & foundation utilities

| Export | File | Kind | KuiReact equivalent |
| --- | --- | --- | --- |
| `themes` (light/dark NativeWind `vars()`) | `libs/theme.ts` | Theme | `:root` / `.dark` blocks in `app/globals.css` |
| `tokenMaps` (raw hex per scheme) | `libs/theme.ts` | Theme | none (CSS variables are readable at runtime on web) |
| `useThemeMode` (zustand: system/light/dark + `cycle`) | `libs/theme.ts` | Hook / store | `ThemeSwitcher` internal state (`modules/app/ThemeSwitcher.tsx`) |
| `useResolvedScheme` | `libs/theme.ts` | Hook | none |
| `useThemeTokens` | `libs/theme.ts` | Hook | none |
| `cn` | `libs/utils/cn.ts` | Utility | `libs/utils/cn.ts` (identical implementation) |
| `colors` (tailwind token map) | `libs/utils/tailwind-tokens.js` | Theme | `@theme inline` block in `globals.css` |
| `FONTS` | `libs/utils/typography.ts` | Foundation | `Geist` / `Geist_Mono` via `next/font` (`app/layout.tsx`) |

## Showcase-private components that shadow KuiReact library components

These live under `modules/showcase/ui/`, are **not** exported from the library, and several share a name or role with a public KuiReact component. A consumer cannot use them.

| Component | File | Category | KuiReact library counterpart |
| --- | --- | --- | --- |
| Sidebar | `modules/showcase/ui/Sidebar.tsx` | Navigation | AppSidebar (`app-sidebar`) — missing from KuiNative library |
| AppDrawer | `modules/showcase/ui/AppDrawer.tsx` | Navigation | AppDrawer (`app-drawer`) — missing from KuiNative library |
| Header | `modules/showcase/ui/Header.tsx` | Navigation | AppTopBar (`app-top-bar`) — missing from KuiNative library |
| ThemeToggle | `modules/showcase/ui/ThemeToggle.tsx` | Theme | ThemeSwitcher (`theme-switcher`) — missing from KuiNative library |
| CodeBlock | `modules/showcase/ui/CodeBlock.tsx` | Data Display | — |
| useDrawer (zustand store) | `modules/showcase/ui/drawer.store.ts` | Hooks | — |