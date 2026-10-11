# Feature matrix — ScrollArea

> KuiReact `modules/ui/ScrollArea.tsx` (36 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/ScrollArea.tsx` (added 2026-09-22 in `08c1c32`; 1 test, 2 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `orientation` (vertical / horizontal / both, default vertical), `className`, `children`, rest props | ✓ (`HTMLAttributes`) | ✓ (`ScrollViewProps`) | Match |
| Container | `relative rounded-md` with `overflow-y-auto` / `overflow-x-auto` / `overflow-auto` | `relative rounded-md` `ScrollView` (horizontal for `horizontal`; a horizontal scroller nested in a vertical one for `both`) | Match (adapted) |
| Scrollbar | thin `border-strong` thumb on a transparent track (`scrollbar-*` / `::-webkit-scrollbar` CSS) | the platform's auto-hiding indicator | N/A (no scrollbar styling on RN) |
| Tests | 0 | 1 | Native-ahead |
| Showcase | Vertical list, Horizontal | same titles and content | Match |
