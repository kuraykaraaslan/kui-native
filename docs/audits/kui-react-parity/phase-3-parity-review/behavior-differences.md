# Behaviour differences

## Defects in KuiNative (fix regardless of parity)

| # | Component | Defect | Evidence |
| --- | --- | --- | --- |
| B1 | Modal | Long content overflows the screen: no `ScrollView`, no max height | `Modal.tsx:33-47` |
| B2 | Modal | Inputs inside the modal are covered by the keyboard: no `KeyboardAvoidingView` | `Modal.tsx` |
| B3 | Modal | Backdrop does not cover the Android status bar (`statusBarTranslucent` unset) | `Modal.tsx:19-25` |
| B4 | Text | Heading variants render regular weight on iOS and web; Android "bold" maps to the regular `sans-serif` family | `Text.tsx:19-28`, `typography.ts:12-15` |
| B5 | Spinner | `size="sm"` and `size="md"` render identically | `Spinner.tsx:8-12` |
| B6 | Avatar | Blank `name` renders an empty circle (KuiReact renders `?`) | `Avatar.tsx:30-37` |
| B7 | Switch | Pressing the label does not toggle | `Switch.tsx:22-26` |

## Parity differences

### State handling
| Component | KuiReact | KuiNative |
| --- | --- | --- |
| Button `loading` | stays clickable (`aria-busy` only) | disabled while loading |
| Checkbox | controlled or uncontrolled | controlled only |
| Input `error` | error > success > hint precedence, `bg-error-subtle` | error > hint, border only |
| Input disabled / read-only | sunken bg, "(read-only)" suffix | no visual change |
| Card `loading` | built-in skeleton, pointer-events off | not supported |
| Modal backdrop | `closeOnBackdropClick` configurable | always closes |

The Button loading difference favours KuiNative (prevents double submit). Record it and raise it against KuiReact rather than regressing KuiNative.

### Transitions
KuiReact overlays run an explicit presence state machine (`open → closing → closed`, 250 ms) so exit animations play and `data-state` is exposed. KuiNative Modal relies on RN's built-in fade with no exit hook and no `data-state`/testable state.

### Press interactions
KuiReact has hover, active and focus-visible states. KuiNative has only `active:opacity-80` (Button, Checkbox). No component exposes a focus state, which matters for react-native-web (KuiNative ships a web target: `npm run web`), Android TV and hardware keyboards.

### Focus management
KuiReact Modal traps focus, focuses the panel on open, closes on Escape and restores focus. KuiNative Modal does nothing beyond RN defaults; screen-reader focus is not moved to the title.

### Dismissal
KuiReact: Escape key, backdrop, × button. KuiNative: Android back (`onRequestClose`) and backdrop only; no × button, so iOS users with the backdrop covered by content have only the footer to escape.

### Hover
Not applicable on touch. KuiReact `hoverable` Card and all `hover:` styles should map to pressed feedback on RN; currently only Button/Checkbox have any pressed feedback.
