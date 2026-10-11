# Feature matrix — Tooltip

> KuiReact `modules/ui/Tooltip.tsx` (104 LOC, 6 tests, 3 showcase variants) ↔ KuiNative `modules/ui/Tooltip.tsx` (added 2026-09-22 in `68ce86d`, 7 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `content`, `placement` (default top), `theme` (default / dark / light), `arrow`, `delay`, `children`, `className` | ✓ | ✓ | Match |
| Bubble | `rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md`, `whitespace-nowrap` | same; string content on one line (`numberOfLines={1}`) inside a wide touch-transparent lane so it sizes to its text | Match (adapted) |
| Themes | default `bg-surface-overlay border-border`, dark raw `gray-900` / white, light raw white / `gray-900` + `shadow-md` | same, including the raw colours | Match |
| Arrow | `w-2 h-2 rotate-45 border`, −5px offset, two borders hidden per side | same | Match |
| Placement | `bottom-full` / `top-full` / `right-full` / `left-full` + 8px, centred | same, rendered inline (absolute, z-80) like KuiReact | Match |
| Motion | `transition-opacity duration-150` | 150ms opacity animation | Match |
| Show / hide | mouse enter / leave, focus / blur | long-press / release on touch; hover in / out and focus / blur on react-native-web | Adapted (no hover on touch) |
| `delay` | timer before showing | same | Match |
| Accessibility | `role="tooltip"` linked by `aria-describedby` | string content becomes the trigger's accessibility hint; hidden bubble removed from the accessibility tree | Match (adapted) |
| Tests | 6 | 7 (KuiReact's cases mapped to long-press / hover, plus a class check) | Match |
| Showcase | Placements, Themes, Arrow + Delay | same titles and copy | Match |
