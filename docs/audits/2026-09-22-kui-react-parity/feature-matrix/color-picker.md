# Feature matrix — ColorPicker

> KuiReact `modules/ui/ColorPicker/` (17 files, 1190 LOC including nine M2–M5 part / hook stubs; 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/ColorPicker/` (added 2026-09-22 in `17c8796`: `index.tsx`, `types.ts`, `color/` convert + parse + contrast and `hooks/useColorState` ported unchanged, `parts/` Swatch + InputRow + HueStrip; panel on `Overlays/shared/AnchoredPanel`; copy via `expo-clipboard`; 10 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `value`, `onChange`, `swatches` (default `DEFAULT_COLOR_SWATCHES`), `showHexInput` (true), `showNativePicker` (true), `showNoColor`, `align` (`left`), `triggerLabel`, `className`, `popoverClassName`, `disabled`, `iconOnly`, `icon`, `showFormatSwitcher`, `defaultFormat` (`hex`) | ✓ | ✓ | Match |
| `DEFAULT_COLOR_SWATCHES`, types (`ColorFormat`, `ColorValue`, `ColorPickerProps`), colour maths, `useColorState` | ✓ | same code; `normalizeHex` also exported | Match (Native-ahead export) |
| Trigger | `rounded-md border px-2.5 py-1.5`, `w-4 h-4` colour tile, `font-mono text-xs` value or "none", chevron; icon-only `w-8 h-8` button with a colour underline | same | Match |
| Empty value tile | CSS checkerboard in `surface-sunken` | plain `surface-sunken` tile | Differs (visual only) |
| Popover | `absolute mt-1 w-64 p-3 rounded-lg border bg-surface-raised shadow-lg`, left / right aligned | same, 4px below the measured trigger in a transparent RN `Modal` window, `align` → start / end | Match (adapted) |
| Swatches | `grid grid-cols-8 gap-1`, `w-6 h-6 rounded-sm` buttons, selected `ring-2 ring-border-focus` | 8-per-row flex rows, same buttons; selected state announced | Match (adapted) |
| Hex field | commit on Enter / blur, accepts `abc` / `#abc` / `#aabbcc`, closes on a valid value | same (submit / blur) | Match |
| Format switcher | HEX / RGBA / HSLA / HWB / OKLCH `tablist`, per-format input, copy button ("Copied" for 1.2 s) via `navigator.clipboard` | same tabs and input; copy via `expo-clipboard` | Match (adapted) |
| Native picker | `<input type="color">` (OS colour dialog) | the same `w-7 h-7` swatch button toggles an in-panel hue strip (tap / drag picks a fully saturated hue) | Adapted (RN has no colour input) |
| "No colour" | `w-7 h-7` × button, emits `null` and closes | same | Match |
| Close | outside mousedown, Escape | outside tap, Android back | Match (adapted) |
| M2–M5 parts (saturation canvas, hue / alpha sliders, eyedropper, palettes, gradient, contrast badge) | stubs that render nothing | not ported | Match (inactive in both) |
| Accessibility | trigger `aria-haspopup="dialog"` / `aria-expanded`, `role="dialog"` "Color picker", labelled swatches and fields | button with expanded / disabled state and value, labelled panel, labelled swatches (selected state), `tablist` / `tab` with selected state | Match (adapted) |
| Tests | 0 | 10 | Native-ahead |
| Showcase | Default, Compact (swatches only), Hex + native picker only (no swatches), Format switcher — HEX / RGBA / HSLA / HWB / OKLCH (M1) | same titles and data | Match |
