# Feature matrix — Slider

> KuiReact `modules/ui/Slider/` (13 files, 644 LOC: `index`, `types`, `parts/` Track / Slide / Arrows / Dots + three stubs, `hooks/` useDrag / useAutoPlay + three stubs; 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/Slider.tsx` (added 2026-09-22 in `cd76c65`, one file on `Animated` + `PanResponder`, with KuiReact's release rule exported as `releaseStep`; 11 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `slides` (nodes or { id, content }), `autoPlay`, `autoPlayInterval` (default 4000), `showDots`, `showArrows`, `loop` (default true), `dragThreshold` (default 50), `className`, `slideClassName`, `ariaLabel` (default "Content slider") | ✓ | ✓ | Match |
| Types `Slide`, `SliderProps` | ✓ (not in the ui barrel) | ✓, exported | Native-ahead |
| Track | `translateX(-current × 100%)`, 350 ms snap, no transition while dragging | `Animated.timing` 350 ms on the native driver, follows the finger while dragging | Match |
| Swipe | pointer drag; past `dragThreshold` moves one slide; every 0.5 px/ms of flick velocity adds a slide; a strong flick alone moves; ×0.4 edge resistance without `loop` | same rule (`releaseStep`, unit-tested) and resistance | Match |
| Vertical scroll pass-through | `touch-pan-y` | only horizontal-dominant drags are claimed | Match (adapted) |
| Autoplay | interval, skips ticks while dragging, stops for a single slide | same | Match |
| Arrows | `w-9 h-9 rounded-full bg-black/40 hover:bg-black/60`, white chevrons, hidden at the ends without `loop` | same; hover → pressed | Match (adapted) |
| Dots | `bottom-3` strip, `h-2 rounded-full`, active `w-5 bg-white`, idle `w-2 bg-white/40` | same | Match |
| Reduced motion | TODO (M5) | snaps without animation when Reduce Motion is on | Native-ahead |
| Accessibility | `region` + `aria-roledescription="carousel"`, slides `group` "Slide n of m" with `aria-hidden` + `inert` off-screen, dots `tablist` / `tab` + `aria-selected`, labelled arrows | `region` label, slides labelled "Slide n of m" and hidden from AT off-screen, dots `tablist` / `tab` with selected state, labelled arrows | Match (adapted: RN has no `roledescription`) |
| Tests | 0 | 11 | Native-ahead |
| Showcase | Default, Auto-play, Touch swipe + momentum, No arrows / no loop | same titles and slides | Match |
