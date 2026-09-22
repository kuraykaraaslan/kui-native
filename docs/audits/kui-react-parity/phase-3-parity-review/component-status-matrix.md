# Component status matrix

> Every KuiNative library export classified against its KuiReact counterpart. Re-classified 2026-09-22 through commit `3d2d0f9` (pixel-perfect pass, Wave 1 components, API parity on the original components, the anchored-overlay batch through `0770214`, the Wave 2 batch through `08c1c32`, then the `02d510b` gap fixes and the Wave 3 components TreeView, ColorPicker, DataTable, BulkActionTable, AdvancedDataTable, DiffViewer, Chart, MapView and VideoPlayer). Earlier classifications are in git history.

## Rubric

| Status | Definition |
| --- | --- |
| PARITY_COMPLETE | Every KuiReact prop, variant, size and state that is meaningful on RN exists with the same name and default; visuals use KuiReact's exact classes and tokens; tests and 1:1 showcase demos exist. |
| PARITY_MINOR_GAPS | Same names and API shape; gaps limited to a platform-adapted detail, a missing enumeration value, or one non-critical feature. |
| PARITY_MAJOR_GAPS | Names differ, or KuiReact-documented variants/states/features are missing. |
| REQUIRES_REWRITE | The API model differs so fundamentally that incremental fixes would break every call site anyway. |

## Summary

| Status | Count | Components |
| --- | --- | --- |
| PARITY_COMPLETE | 53 | Button, Card, Avatar, AvatarGroup, Badge, Input, Checkbox, Toggle, EmptyState, Separator, AlertBanner, RadioGroup, Textarea, Progress, Drawer, Toast, Tooltip, Accordion, ButtonGroup, CheckboxGroup, SearchBar, Pagination, Stepper, Breadcrumb, PageHeader, RangeSlider, DropdownMenu, MultiSelect, BrandLogo, StarRating, StatCard, Statistic, TabButton, Timeline, ComboBox, FileInput, Table, Slider, ContentScoreBar, ViewToggle, ScrollArea, DatePicker (+ DateTimePicker), DateRangePicker, TimePicker, Popconfirm, TagInput, TreeView, ColorPicker, DataTable, BulkActionTable, AdvancedDataTable, DiffViewer, VideoPlayer |
| PARITY_MINOR_GAPS | 10 | Spinner, Text (native-only), Skeleton, Modal, Label, TabGroup, Select, Popover, Chart, MapView |
| PARITY_MAJOR_GAPS | 0 | — |
| REQUIRES_REWRITE | 0 | — |

Deprecated aliases keep older KuiNative call sites working: `Button label` / `destructive`, `Badge label` / `default`, `TextInput`, `Switch`, `Modal visible`, AvatarGroup children, `SkeletonCard.tsx`.

## Minor gaps

| Component | Remaining gap | Why |
| --- | --- | --- |
| Spinner | OS activity indicator instead of KuiReact's two-tone rotating ring | Visual only; sizes, label and colour match |
| Text | Geist not bundled (system font) | Native-only primitive; needs font assets |
| Skeleton | No `SkeletonTableRow` | Table and DataTable have landed (`b83d87f`, `da93014`); the row skeleton is still to do at this refresh's cutoff |
| Modal | No `closeOnRouteChange`, no panel `ref` | KuiReact's own `closeOnRouteChange` is a stub |
| Label | No rest props; `htmlFor` adapted to `onPress` | No id-based label linking on RN |
| TabGroup | No arrow / Home / End keyboard navigation | Desktop keyboard pattern |
| Select | No close-on-outside-tap for the inline panel; plain mode uses the custom panel | RN has no `<select>` |
| Popover | Focus is not moved into the panel on open or returned to the trigger on close (screen-reader focus is kept inside via `accessibilityViewIsModal`) | Drawer / Modal already do this with `useFocusOnOpen`; the anchored panel does not yet |
| Chart | Pie / Donut / Scatter carry their label on the `Svg` but no `img` role (Line / Area / Bar / SparkLine have it); the `Brush` M4 stub isn't exported; no hover transitions | KuiReact's `Brush` renders `null`; transitions are visual only |
| MapView | The web build renders a notice card instead of the map | `react-native-maps` has no web implementation; iOS / Android match KuiReact (CartoDB tiles, pins, zones, routes, tap-to-add) |

Common RN adaptations in the new components (not counted as gaps): hover → pressed state, `divide-*` → `border-t` / `border-l`, `bg-primary/20` computed from the hex token, Tooltip on long-press, anchored panels in a transparent RN `Modal` with outside-tap close, Escape → Android back, `href` → expo-router `router.push`, `onClick` → `onPress`; in the latest batch also: native `<input type="time">` → hour / minute column panel, file drag-and-drop / paste → system document picker, sticky day headings → plain rows, auto table layout → equal flex columns with horizontal scroll, pointer drag → `PanResponder`, styled scrollbars → platform indicators; in the Wave 3 batch: modifier-click multi-select → tap / long-press (TreeView), Shift+click multi-sort → long-press (DataTable), `<input type="color">` → hue strip, `<select>` page size → `DropdownMenu`, sticky table header → header above a scroller, Leaflet → `react-native-maps` with the same CartoDB tiles, `<video>` + `<track>` → `expo-video` + parsed WebVTT, hover-revealed volume slider → long-press. Web-only KuiReact features (Google Cast, keyboard shortcuts, arrow-key tree navigation) are N/A.

Closed since the previous refresh (`02d510b`): the DatePicker / DateRangePicker trigger and TagInput draw the error `ring-1`; Popconfirm sends screen-reader focus to Cancel once its panel is shown (`AnchoredPanel onShow`); TimePicker has its own `time-picker` showcase entry with KuiReact's Default and Required / error demos. All five are PARITY_COMPLETE.

Landed after this refresh's cutoff and not counted: `fcc2af9` (Spinner two-tone ring, `SkeletonTableRow`, Label rest props, Modal `ref`, Select outside-tap note).

Per-component detail: [feature-matrix/](../feature-matrix/README.md).
