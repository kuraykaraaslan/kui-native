# KuiNative component inventory

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Every export of `modules/ui/index.ts`, every theme utility, and showcase-private components that shadow KuiReact library components.

## Package status

| Aspect | Value | Evidence |
| --- | --- | --- |
| Package name | `kui-native` 0.1.0 | `package.json` |
| Publishable | **No** — `"private": true`, `"main": "expo-router/entry"`, no `exports`, no build script | `package.json` |
| Public import path | `@/modules/ui` (repo-internal alias only) | `modules/ui/index.ts`, `babel.config.js` |
| Library components | 48 exports from 36 files | `modules/ui/index.ts` |
| Type exports | 58 (`export type` names) | `modules/ui/index.ts` |
| Hooks exported from library | `useToast`, `useToastStore` (theme hooks live in `libs/theme.ts`, not in the barrel) | `modules/ui/index.ts` |
| Providers exported | `ToastProvider`, `Toaster` | `modules/ui/Toast` |
| Tests | 35 files, 330 static `it` / `test` blocks (Jest `jest-expo` + `@testing-library/react-native`) | `git ls-tree 0770214` |

"Public" below therefore means *exported from the `@/modules/ui` barrel*; nothing is installable by a consumer today.

## Library components (48)

| Component | Category | File | Export path | Public status | LOC | Props | Depends on | Used by (repo) | a11y props used | Raw colors | KuiReact counterpart |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Accordion | Data Display | `modules/ui/Accordion.tsx` | `@/modules/ui` | barrel export | 139 | 6 + ViewProps (omitting children) | Text | 2 | accessibilityElementsHidden, accessibilityRole, accessibilityState, role= | 0 | Accordion (`accordion`) |
| AlertBanner | Feedback | `modules/ui/AlertBanner.tsx` | `@/modules/ui` | barrel export | 108 | 7 | Text | 2 | accessibilityElementsHidden, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, role= | 0 | AlertBanner (`alert-banner`) |
| Avatar | Data Display | `modules/ui/Avatar.tsx` | `@/modules/ui` | barrel export | 165 | 5 | Text | 2 | accessibilityLabel, accessibilityRole | 0 | Avatar (`avatar`) |
| AvatarGroup | Data Display | `modules/ui/Avatar.tsx` | `@/modules/ui` | barrel export | 165 | 5 | Text | 2 | accessibilityLabel, accessibilityRole | 0 | Avatar (`avatar`) |
| Badge | Data Display | `modules/ui/Badge.tsx` | `@/modules/ui` | barrel export | 119 | 8 + ViewProps (omitting children) | Text | 3 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole | 0 | Badge (`badge`) |
| Breadcrumb | Navigation | `modules/ui/Breadcrumb.tsx` | `@/modules/ui` | barrel export | 86 | 4 | Text | 2 | accessibilityElementsHidden, accessibilityRole, aria-current, aria-label, role= | 0 | Breadcrumb (`breadcrumb`) |
| Button | Foundation | `modules/ui/Button.tsx` | `@/modules/ui` | barrel export | 145 | 13 + PressableProps (omitting children, style) | Text | 4 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole, accessibilityState, aria-label, aria-pressed | 0 | Button (`button`) |
| ButtonGroup | Forms | `modules/ui/ButtonGroup.tsx` | `@/modules/ui` | barrel export | 111 | 6 | Text | 2 | accessibilityRole, accessibilityState, aria-pressed, role= | 0 | ButtonGroup (`button-group`) |
| Card | Layout | `modules/ui/Card.tsx` | `@/modules/ui` | barrel export | 125 | 10 + ViewProps | Skeleton, Text | 2 | accessibilityLabel, accessibilityRole | 0 | Card (`card`) |
| Checkbox | Forms | `modules/ui/Checkbox.tsx` | `@/modules/ui` | barrel export | 90 | 9 | Text | 2 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | Checkbox (`checkbox`) |
| CheckboxGroup | Forms | `modules/ui/CheckboxGroup.tsx` | `@/modules/ui` | barrel export | 76 | 7 | Text | 2 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole, accessibilityState, aria-label, role= | 0 | CheckboxGroup (`checkbox-group`) |
| Drawer | Overlay | `modules/ui/Drawer.tsx` | `@/modules/ui` | barrel export | 118 | 9 | Text | 4 | accessibilityLabel, accessibilityRole, accessibilityViewIsModal | 0 | Drawer (`drawer`) |
| DropdownMenu | Overlay | `modules/ui/DropdownMenu.tsx` | `@/modules/ui` | barrel export | 111 | 5 | Text | 3 | accessibilityElementsHidden, accessibilityHint, accessibilityLabel, accessibilityRole, accessibilityState, accessibilityViewIsModal, aria-expanded, aria-haspopup | 0 | DropdownMenu (`dropdown-menu`) |
| EmptyState | Feedback | `modules/ui/EmptyState.tsx` | `@/modules/ui` | barrel export | 74 | 7 | Button, Text | 3 | accessibilityElementsHidden | 0 | EmptyState (`empty-state`) |
| Label | Typography | `modules/ui/Label.tsx` | `@/modules/ui` | barrel export | 47 | 5 | Text | 6 | accessibilityLabel, accessibilityRole | 0 | Label (`label`) |
| Modal | Overlay | `modules/ui/Modal.tsx` | `@/modules/ui` | barrel export | 146 | 12 | Text | 5 | accessibilityLabel, accessibilityRole, accessibilityViewIsModal | 0 | Modal (`modal`) |
| MultiSelect | Forms | `modules/ui/MultiSelect.tsx` | `@/modules/ui` | barrel export | 246 | 14 | Label, Skeleton, Text | 2 | accessibilityElementsHidden, accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState, accessibilityValue | 0 | MultiSelect (`multi-select`) |
| PageHeader | Layout | `modules/ui/PageHeader.tsx` | `@/modules/ui` | barrel export | 85 | 5 | Text | 2 | accessibilityRole, accessibilityState | 0 | PageHeader (`page-header`) |
| Pagination | Navigation | `modules/ui/Pagination.tsx` | `@/modules/ui` | barrel export | 150 | 7 | Text | 2 | accessibilityLabel, accessibilityRole, accessibilityState, aria-current, aria-label, role= | 0 | Pagination (`pagination`) |
| Popover | Overlay | `modules/ui/Popover.tsx` | `@/modules/ui` | barrel export | 52 | 5 | — | 3 | accessibilityState, accessibilityViewIsModal | 0 | Popover (`popover`) |
| Progress | Feedback | `modules/ui/Progress.tsx` | `@/modules/ui` | barrel export | 125 | 7 + ViewProps (omitting children) | Text | 2 | accessibilityLabel, accessibilityRole, accessibilityValue | 0 | Progress (`progress`) |
| RadioGroup | Forms | `modules/ui/RadioGroup.tsx` | `@/modules/ui` | barrel export | 126 | 11 | Text | 2 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | RadioGroup (`radio-group`) |
| RangeSlider | Forms | `modules/ui/RangeSlider.tsx` | `@/modules/ui` | barrel export | 197 | 0 + SingleProps \| RangeProps | Text | 2 | accessibilityActions, accessibilityHint, accessibilityLabel, accessibilityRole, accessibilityState, accessibilityValue, aria-valuetext | 0 | RangeSlider (`range-slider`) |
| SearchBar | Forms | `modules/ui/SearchBar.tsx` | `@/modules/ui` | barrel export | 85 | 7 | — | 2 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole, role= | 0 | SearchBar (`search-bar`) |
| Select | Forms | `modules/ui/Select.tsx` | `@/modules/ui` | barrel export | 187 | 12 | Label, Text | 4 | accessibilityElementsHidden, accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState, accessibilityValue | 0 | Select (`select`) |
| Separator | Layout | `modules/ui/Separator.tsx` | `@/modules/ui` | barrel export | 47 | 4 + ViewProps | Text | 2 | accessibilityElementsHidden, accessibilityRole | 0 | Separator (`separator`) |
| SkeletonAvatar | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 3 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| SkeletonCard | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 1 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| SkeletonLine | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 3 | — | 6 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| SkeletonText | Feedback | `modules/ui/Skeleton.tsx` | `@/modules/ui` | barrel export | 154 | 3 | — | 3 | accessibilityLabel, accessibilityRole, accessibilityState | 0 | Skeleton (`skeleton`) |
| Spinner | Feedback | `modules/ui/Spinner.tsx` | `@/modules/ui` | barrel export | 58 | 4 | — | 3 | accessibilityLabel, accessibilityRole | 0 | Spinner (`spinner`) |
| Switch | Forms | `modules/ui/Toggle.tsx` | `@/modules/ui` | barrel export | 110 | 8 | Text | 1 | accessibilityHint, accessibilityLabel, accessibilityRole, accessibilityState | 0 | Toggle (`toggle`) |
| Toggle | Forms | `modules/ui/Toggle.tsx` | `@/modules/ui` | barrel export | 110 | 8 | Text | 3 | accessibilityHint, accessibilityLabel, accessibilityRole, accessibilityState | 0 | Toggle (`toggle`) |
| TabGroup | Navigation | `modules/ui/TabGroup.tsx` | `@/modules/ui` | barrel export | 100 | 5 | Text | 2 | accessibilityElementsHidden, accessibilityLabel, accessibilityRole, accessibilityState, role= | 0 | TabGroup (`tab-group`) |
| Text | Typography | `modules/ui/Text.tsx` | `@/modules/ui` | barrel export | 73 | 3 + TextProps | — | 45 | accessibilityRole | 0 | none (native-only) |
| Stepper | Navigation | `modules/ui/Stepper.tsx` | `@/modules/ui` | barrel export | 108 | 3 | Text | 2 | accessibilityLabel, role= | 0 | Stepper (`stepper`) |
| Tooltip | Overlay | `modules/ui/Tooltip.tsx` | `@/modules/ui` | barrel export | 153 | 7 | Text | 3 | accessibilityElementsHidden, accessibilityHint, aria-describedby | 0 | Tooltip (`tooltip`) |
| Toast | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 5 | ToastCard, types, useToastStore, types, useToastStore | 4 | — | 0 | Toast (`toast`) |
| ToastProvider | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | ? | ToastCard, types, useToastStore, types, useToastStore | 1 | — | 0 | Toast (`toast`) |
| ToastRegion | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 3 | ToastCard, types, useToastStore, types, useToastStore | 1 | — | 0 | Toast (`toast`) |
| Toaster | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 0 + ToasterProps = {} | ToastCard, types, useToastStore, types, useToastStore | 2 | — | 0 | Toast (`toast`) |
| getEffectiveDuration | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 0 + Pick<ToastItem, "variant" \| "duration"> | ToastCard, types, useToastStore, types, useToastStore | 3 | — | 0 | none (native-only) |
| toast | Feedback | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | ? | ToastCard, types, useToastStore, types, useToastStore | 5 | — | 0 | none (native-only) |
| useToast | Hooks | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | 0 | ToastCard, types, useToastStore, types, useToastStore | 2 | — | 0 | none (native-only) |
| useToastStore | Hooks | `modules/ui/Toast/index.tsx` | `@/modules/ui` | barrel export | 238 | ? | ToastCard, types, useToastStore, types, useToastStore | 3 | — | 0 | none (native-only) |
| Textarea | Forms | `modules/ui/Textarea.tsx` | `@/modules/ui` | barrel export | 87 | 8 + TextInputProps (omitting multiline) | Label, Text | 3 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | Textarea (`textarea`) |
| Input | Forms | `modules/ui/Input.tsx` | `@/modules/ui` | barrel export | 208 | 19 + TextInputProps (omitting secureTextEntry) | Text | 3 | accessibilityHint, accessibilityLabel, accessibilityLiveRegion, accessibilityRole, accessibilityState | 0 | Input (`input`) |
| TextInput | Forms | `modules/ui/TextInput.tsx` | `@/modules/ui` | barrel export | 8 | ? | Input, Input | 7 | — | 0 | Input (`input`) |

## Props per component (parsed)

### Accordion

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| items | `AccordionItem[]` | **yes** | — |
| defaultOpenIds | `string[]` | no | `[]` |
| openIds | `string[]` | no | — |
| onChange | `(openIds: string[]) => void` | no | — |
| allowMultiple | `boolean` | no | `false` |
| className | `string` | no | — |

Extends: `ViewProps (omitting children)`

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

### Breadcrumb

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| items | `BreadcrumbItem[]` | **yes** | — |
| separator | `React.ReactNode` | no | — |
| maxItems | `number` | no | — |
| className | `string` | no | — |

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

### ButtonGroup

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| items | `ButtonGroupItem[]` | **yes** | — |
| value | `string` | **yes** | — |
| onChange | `(value: string) => void` | **yes** | — |
| variant | `ButtonGroupVariant` | no | `"outline"` |
| size | `ButtonGroupSize` | no | `"md"` |
| className | `string` | no | — |

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

### CheckboxGroup

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| legend | `string` | **yes** | — |
| options | `CheckboxOption[]` | **yes** | — |
| selected | `string[]` | **yes** | — |
| onChange | `(next: string[]) => void` | **yes** | — |
| disabled | `boolean` | no | — |
| error | `string` | no | — |
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

### DropdownMenu

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| trigger | `React.ReactNode` | **yes** | — |
| items | `DropdownItem[]` | **yes** | — |
| header | `React.ReactNode` | no | — |
| align | `"left" \| "right"` | no | `"left"` |
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

### MultiSelect

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| id | `string` | **yes** | — |
| label | `string` | **yes** | — |
| options | `MultiSelectOption[]` | **yes** | — |
| value | `string[]` | no | — |
| onChange | `(values: string[]) => void` | no | — |
| placeholder | `string` | no | `"Select…"` |
| hint | `string` | no | — |
| error | `string` | no | — |
| disabled | `boolean` | no | — |
| searchable | `boolean` | no | — |
| className | `string` | no | — |
| onSearch | `(q: string, signal?: AbortSignal) => MultiSelectOption[] \| Promise<Mu…` | no | — |
| onLoadMore | `() => Promise<MultiSelectOption[]>` | no | — |
| debounceMs | `number` | no | `300` |

### PageHeader

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| title | `string` | **yes** | — |
| subtitle | `string` | no | — |
| badge | `React.ReactNode` | no | — |
| actions | `PageHeaderAction[]` | no | — |
| className | `string` | no | — |

### Pagination

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| page | `number` | **yes** | — |
| totalPages | `number` | **yes** | — |
| onPageChange | `(page: number) => void` | **yes** | — |
| size | `PaginationSize` | no | `"md"` |
| showFirstLast | `boolean` | no | `false` |
| showJumpTo | `boolean` | no | `false` |
| className | `string` | no | — |

### Popover

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| trigger | `React.ReactNode` | **yes** | — |
| children | `React.ReactNode` | **yes** | — |
| placement | `Placement` | no | `"bottom"` |
| className | `string` | no | — |
| focusTrap | `boolean` | no | `true` |

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

### RangeSlider

_no props parsed_

### SearchBar

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| id | `string` | no | `"search"` |
| placeholder | `string` | no | `"Search…"` |
| value | `string` | no | — |
| onChange | `(value: string) => void` | no | — |
| onClear | `() => void` | no | — |
| className | `string` | no | — |
| ref | `React.Ref<RNTextInput>` | no | — |

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

### Stepper

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| steps | `StepItem[]` | **yes** | — |
| orientation | `"horizontal" \| "vertical"` | no | `"horizontal"` |
| className | `string` | no | — |

### Tooltip

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| content | `React.ReactNode` | **yes** | — |
| placement | `TooltipPlacement` | no | `"top"` |
| theme | `TooltipTheme` | no | `"default"` |
| arrow | `boolean` | no | `false` |
| delay | `number` | no | `0` |
| children | `React.ReactNode` | **yes** | — |
| className | `string` | no | — |

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