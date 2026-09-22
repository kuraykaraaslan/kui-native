# KuiNative component inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Every export of `modules/ui/index.ts`, every theme utility, and showcase-private components that shadow KuiReact library components.

## Package status

| Aspect | Value | Evidence |
| --- | --- | --- |
| Package name | `kui-native` 0.1.0 | `package.json` |
| Publishable | **No** — `"private": true`, `"main": "expo-router/entry"`, no `exports`, no build script | `package.json` |
| Public import path | `@/modules/ui` (repo-internal alias only) | `modules/ui/index.ts`, `babel.config.js` |
| Library components | 35 exports from 23 files | `modules/ui/index.ts` |
| Type exports | 34 `*Props` types (`AvatarGroup` has no exported props type) | `modules/ui/index.ts` |
| Hooks exported from library | 0 (theme hooks live in `libs/theme.ts`, not in the barrel) | — |
| Providers exported | 0 | — |
| Tests | 0 files | `git ls-files` |

"Public" below therefore means *exported from the `@/modules/ui` barrel*; nothing is installable by a consumer today.

## Library components (35)

| Component | Category | File | Export path | Public status | LOC | Props | Depends on | Used by (repo) | a11y props used | Raw colors | KuiReact counterpart |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AlertBanner | Feedback | `modules/ui/AlertBanner.tsx` | `@/modules/ui` | barrel export | 108 | 7 | Text | 2 | accessibilityElementsHidden, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, role= | 0 | AlertBanner (`alert-banner`) |
| Avatar | Data Display | `modules/ui/Avatar.tsx` | `@/modules/ui` | barrel export | 165 | 5 | Text | 2 | accessibilityLabel, accessibilityRole | 0 | Avatar (`avatar`) |
| AvatarGroup | Data Display | `modules/ui/Avatar.tsx` | `@/modules/ui` | barrel export | 165 | 5 | Text | 2 | accessibilityLabel, accessibilityRole | 0 | Avatar (`avatar`) |
| Badge | Data Display | `modules/ui/Badge.tsx` | `@/modules/ui` | barrel export | 119 | 8 + ViewProps (omitting children) | Text | 3 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole | 0 | Badge (`badge`) |
| Button | Foundation | `modules/ui/Button.tsx` | `@/modules/ui` | barrel export | 145 | 13 + PressableProps (omitting children, style) | Text | 3 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole, accessibilityState, aria-label, aria-pressed | 0 | Button (`button`) |
| Card | Layout | `modules/ui/Card.tsx` | `@/modules/ui` | barrel export | 125 | 10 + ViewProps | Skeleton, Text | 2 | accessibilityLabel, accessibilityRole | 0 | Card (`card`) |
| Checkbox | Forms | `modules/ui/Checkbox.tsx` | `@/modules/ui` | barrel export | 90 | 9 | Text | 2 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | Checkbox (`checkbox`) |
| Drawer | Overlay | `modules/ui/Drawer.tsx` | `@/modules/ui` | barrel export | 118 | 9 | Text | 4 | accessibilityLabel, accessibilityRole, accessibilityViewIsModal | 0 | Drawer (`drawer`) |
| EmptyState | Feedback | `modules/ui/EmptyState.tsx` | `@/modules/ui` | barrel export | 74 | 7 | Button, Text | 3 | accessibilityElementsHidden | 0 | EmptyState (`empty-state`) |
| Label | Typography | `modules/ui/Label.tsx` | `@/modules/ui` | barrel export | 47 | 5 | Text | 4 | accessibilityLabel, accessibilityRole | 0 | Label (`label`) |
| Modal | Overlay | `modules/ui/Modal.tsx` | `@/modules/ui` | barrel export | 146 | 12 | Text | 5 | accessibilityLabel, accessibilityRole, accessibilityViewIsModal | 0 | Modal (`modal`) |
| Progress | Feedback | `modules/ui/Progress.tsx` | `@/modules/ui` | barrel export | 125 | 7 + ViewProps (omitting children) | Text | 2 | accessibilityLabel, accessibilityRole, accessibilityValue | 0 | Progress (`progress`) |
| RadioGroup | Forms | `modules/ui/RadioGroup.tsx` | `@/modules/ui` | barrel export | 126 | 11 | Text | 2 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | RadioGroup (`radio-group`) |
| Select | Forms | `modules/ui/Select.tsx` | `@/modules/ui` | barrel export | 187 | 12 | Label, Text | 3 | accessibilityElementsHidden, accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState, accessibilityValue | 0 | Select (`select`) |
| Separator | Layout | `modules/ui/Separator.tsx` | `@/modules/ui` | barrel export | 47 | 4 + ViewProps | Text | 2 | accessibilityElementsHidden, accessibilityRole | 0 | Separator (`separator`) |
| SkeletonAvatar | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 3 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| SkeletonCard | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 1 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| SkeletonLine | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 3 | — | 4 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| SkeletonText | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 3 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| Spinner | Feedback | `modules/ui/Spinner.tsx` | `@/modules/ui` | barrel export | 58 | 4 | — | 3 | accessibilityLabel, accessibilityRole | 0 | Spinner (`spinner`) |
| Switch | Forms | `modules/ui/Toggle.tsx` | `@/modules/ui` | barrel export | 110 | 8 | Text | 1 | accessibilityHint, accessibilityLabel, accessibilityRole, accessibilityState | 0 | Toggle (`toggle`) |
| Toggle | Forms | `modules/ui/Toggle.tsx` | `@/modules/ui` | barrel export | 110 | 8 | Text | 3 | accessibilityHint, accessibilityLabel, accessibilityRole, accessibilityState | 0 | Toggle (`toggle`) |
| TabGroup | Navigation | `modules/ui/TabGroup.tsx` | `@/modules/ui` | barrel export | 100 | 5 | Text | 2 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole, accessibilityState, role= | 0 | TabGroup (`tab-group`) |
| Text | Typography | `modules/ui/Text.tsx` | `@/modules/ui` | barrel export | 73 | 3 + TextProps | — | 26 | accessibilityRole | 0 | none (native-only) |
| Toast | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 5 | ToastCard, types, useToastStore, types, useToastStore | 4 | — | 0 | Toast (`toast`) |
| ToastProvider | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | ? | ToastCard, types, useToastStore, types, useToastStore | 1 | — | 0 | Toast (`toast`) |
| ToastRegion | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 3 | ToastCard, types, useToastStore, types, useToastStore | 1 | — | 0 | Toast (`toast`) |
| Toaster | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 0 + ToasterProps = {} | ToastCard, types, useToastStore, types, useToastStore | 2 | — | 0 | Toast (`toast`) |
| getEffectiveDuration |  | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 0 + Pick<ToastItem, "variant" \| "duration"> | ToastCard, types, useToastStore, types, useToastStore | 3 | — | 0 | none (native-only) |
| toast |  | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | ? | ToastCard, types, useToastStore, types, useToastStore | 5 | — | 0 | none (native-only) |
| useToast |  | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 0 | ToastCard, types, useToastStore, types, useToastStore | 2 | — | 0 | none (native-only) |
| useToastStore |  | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | ? | ToastCard, types, useToastStore, types, useToastStore | 3 | — | 0 | none (native-only) |
| Textarea | Forms | `modules/ui/Textarea.tsx` | `@/modules/ui` | barrel export | 87 | 8 + TextInputProps (omitting multiline) | Label, Text | 3 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | Textarea (`textarea`) |
| Input | Forms | `modules/ui/Input.tsx` | `@/modules/ui` | barrel export | 208 | 19 + TextInputProps (omitting secureTextEntry) | Text | 3 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | Input (`input`) |
| TextInput | Forms | `modules/ui/TextInput.tsx` | `@/modules/ui` | barrel export | 8 | ? | Input, Input | 5 | — | 0 | Input (`input`) |

## Props per component (parsed)

### AlertBanner

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| variant | `AlertVariant` | no | `"info"` |
| title | `string` | no | — |
| message | `string` | **yes** | — |
| dismissible | `boolean` | no | `false` |
| action | `AlertAction` | no | — |
| icon | `React.ReactNode` | no | — |
| className | `string` | no | — |

### Avatar

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| name | `string` | **yes** | — |
| src | `string \| null` | no | — |
| size | `AvatarSize` | no | `"md"` |
| status | `AvatarStatus` | no | — |
| className | `string` | no | — |

### AvatarGroup

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| avatars | `{ src?: string \| null; name: string }[]` | no | — |
| max | `number` | no | `4` |
| size | `AvatarSize` | no | `"md"` |
| children | `React.ReactNode` | no | — |
| className | `string` | no | — |

### Badge

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| children | `React.ReactNode` | no | — |
| label | `string` | no | — |
| variant | `BadgeVariant` | no | `"neutral"` |
| size | `BadgeSize` | no | `"md"` |
| dot | `boolean` | no | `false` |
| dismissible | `boolean` | no | `false` |
| onDismiss | `() => void` | no | — |
| className | `string` | no | — |

Extends: `ViewProps (omitting children)`

### Button

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| children | `React.ReactNode` | no | — |
| label | `string` | no | — |
| variant | `ButtonVariant` | no | `"primary"` |
| size | `ButtonSize` | no | `"md"` |
| loading | `boolean` | no | `false` |
| disabled | `boolean` | no | `false` |
| fullWidth | `boolean` | no | `false` |
| iconLeft | `React.ReactNode` | no | — |
| iconRight | `React.ReactNode` | no | — |
| iconOnly | `boolean` | no | `false` |
| selected | `boolean` | no | `false` |
| className | `string` | no | — |
| ref | `React.Ref<RNView>` | no | — |

Extends: `PressableProps (omitting children, style)`

### Card

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| title | `string` | no | — |
| subtitle | `string` | no | — |
| headerRight | `React.ReactNode` | no | — |
| footer | `React.ReactNode` | no | — |
| variant | `CardVariant` | no | `"raised"` |
| onPress | `() => void` | no | — |
| hoverable | `boolean` | no | — |
| loading | `boolean` | no | `false` |
| className | `string` | no | — |
| children | `React.ReactNode` | no | — |

Extends: `ViewProps`

### Checkbox

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| checked | `boolean` | no | — |
| defaultChecked | `boolean` | no | `false` |
| onChange | `(next: boolean) => void` | no | — |
| label | `string` | no | — |
| hint | `string` | no | — |
| error | `string` | no | — |
| indeterminate | `boolean` | no | `false` |
| disabled | `boolean` | no | `false` |
| className | `string` | no | — |

### Drawer

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| open | `boolean` | **yes** | — |
| onClose | `() => void` | **yes** | — |
| title | `string` | **yes** | — |
| side | `"left" \| "right"` | no | `"right"` |
| children | `React.ReactNode` | no | — |
| footer | `React.ReactNode` | no | — |
| closeOnRouteChange | `boolean` | no | — |
| reducedMotion | `boolean` | no | — |
| className | `string` | no | — |

### EmptyState

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| icon | `IconDefinition \| React.ReactNode` | no | — |
| title | `string` | **yes** | — |
| description | `string` | no | — |
| action | `React.ReactNode` | no | — |
| actionLabel | `string` | no | — |
| onAction | `() => void` | no | — |
| className | `string` | no | — |

### Label

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| children | `string` | **yes** | — |
| required | `boolean` | no | — |
| disabled | `boolean` | no | — |
| onPress | `(e: GestureResponderEvent) => void` | no | — |
| className | `string` | no | — |

### Modal

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| open | `boolean` | no | — |
| visible | `boolean` | no | — |
| onClose | `() => void` | **yes** | — |
| title | `string` | **yes** | — |
| description | `string` | no | — |
| children | `React.ReactNode` | no | — |
| footer | `React.ReactNode` | no | — |
| size | `ModalSize` | no | `"md"` |
| fullscreen | `boolean` | no | `false` |
| scrollable | `boolean` | no | `false` |
| closeOnBackdropClick | `boolean` | no | `true` |
| className | `string` | no | — |

### Progress

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| value | `number` | **yes** | — |
| variant | `ProgressVariant` | no | `"primary"` |
| size | `ProgressSize` | no | `"md"` |
| shape | `"bar" \| "circle"` | no | `"bar"` |
| showLabel | `boolean` | no | `false` |
| label | `string` | no | — |
| className | `string` | no | — |

Extends: `ViewProps (omitting children)`

### RadioGroup

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| name | `string` | **yes** | — |
| legend | `string` | **yes** | — |
| options | `RadioOption[]` | **yes** | — |
| value | `string` | no | — |
| onChange | `(value: string) => void` | no | — |
| error | `string` | no | — |
| disabled | `boolean` | no | — |
| className | `string` | no | — |
| optionClassName | `string` | no | — |
| variant | `RadioGroupVariant` | no | `"default"` |
| columns | `RadioGroupColumns` | no | `1` |

### Select

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| id | `string` | **yes** | — |
| label | `string` | **yes** | — |
| options | `SelectOption[]` | **yes** | — |
| value | `string` | no | — |
| onChange | `(value: string) => void` | no | — |
| placeholder | `string` | no | — |
| hint | `string` | no | — |
| error | `string` | no | — |
| disabled | `boolean` | no | — |
| required | `boolean` | no | — |
| searchable | `boolean` | no | — |
| className | `string` | no | — |

### Separator

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| orientation | `"horizontal" \| "vertical"` | no | `"horizontal"` |
| decorative | `boolean` | no | `false` |
| label | `string` | no | — |
| className | `string` | no | — |

Extends: `ViewProps`

### SkeletonAvatar

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| size | `"sm" \| "md" \| "lg"` | no | `"md"` |
| className | `string` | no | — |
| animated | `boolean` | no | `true` |

### SkeletonCard

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| className | `string` | no | — |

### SkeletonLine

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| width | `string` | no | `"w-full"` |
| className | `string` | no | — |
| animated | `boolean` | no | `true` |

### SkeletonText

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| lines | `number` | no | `3` |
| className | `string` | no | — |
| animated | `boolean` | no | `true` |

### Spinner

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| size | `SpinnerSize` | no | `"md"` |
| color | `string` | no | — |
| accessibilityLabel | `string` | no | `"Loading"` |
| className | `string` | no | — |

### Switch

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| label | `string` | no | — |
| description | `string` | no | — |
| size | `ToggleSize` | no | — |
| disabled | `boolean` | no | — |
| className | `string` | no | — |
| value | `boolean` | **yes** | — |
| onValueChange | `(next: boolean) => void` | no | — |
| accessibilityLabel | `string` | no | — |

### Toggle

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| checked | `boolean` | **yes** | — |
| onChange | `(checked: boolean) => void` | no | — |
| label | `string` | no | — |
| ariaLabel | `string` | no | — |
| description | `string` | no | — |
| size | `ToggleSize` | no | `"md"` |
| disabled | `boolean` | no | `false` |
| className | `string` | no | — |

### TabGroup

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| tabs | `Tab[]` | **yes** | — |
| defaultTab | `string` | no | — |
| label | `string` | no | `"Tabs"` |
| lazy | `boolean` | no | `false` |
| className | `string` | no | — |

### Text

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| variant | `TextVariant` | no | `"body"` |
| className | `string` | no | — |
| ref | `React.Ref<RNText>` | no | — |

Extends: `RNTextProps`

### Toast

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| variant | `ToastItem["variant"]` | no | `"info"` |
| message | `string` | **yes** | — |
| duration | `number` | no | — |
| onDismiss | `() => void` | no | — |
| action | `{ label: string; onPress: () => void }` | no | — |

### ToastProvider

_no props parsed_

### ToastRegion

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| children | `React.ReactNode` | no | — |
| position | `ToastPosition` | no | `"top-right"` |
| className | `string` | no | — |

### Toaster

_no props parsed_

### getEffectiveDuration

_no props parsed_

### toast

_no props parsed_

### useToast

_no props parsed_

### useToastStore

_no props parsed_

### Textarea

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| label | `string` | **yes** | — |
| hint | `string` | no | — |
| error | `string` | no | — |
| disabled | `boolean` | no | — |
| required | `boolean` | no | — |
| rows | `number` | no | `4` |
| className | `string` | no | — |
| ref | `React.Ref<RNTextInput>` | no | — |

Extends: `RNTextInputProps (omitting multiline)`

### Input

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| label | `string` | no | — |
| hint | `string` | no | — |
| error | `string` | no | — |
| success | `string` | no | — |
| required | `boolean` | no | — |
| prefixIcon | `React.ReactNode` | no | — |
| suffixIcon | `React.ReactNode` | no | — |
| clearable | `boolean` | no | — |
| onClear | `() => void` | no | — |
| showCount | `boolean` | no | — |
| type | `"text" \| "password" \| "number" \| "email"` | no | `"text"` |
| step | `number` | no | `1` |
| min | `number` | no | — |
| max | `number` | no | — |
| disabled | `boolean` | no | — |
| className | `string` | no | — |
| inputClassName | `string` | no | — |
| containerClassName | `string` | no | — |
| ref | `React.Ref<RNTextInput>` | no | — |

Extends: `RNTextInputProps (omitting secureTextEntry)`

### TextInput

_no props parsed_

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