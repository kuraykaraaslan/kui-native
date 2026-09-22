# Feature matrix — TabGroup

> KuiReact `modules/ui/TabGroup.tsx` (106 LOC, 11 tests, 3 showcase variants) ↔ KuiNative `modules/ui/TabGroup.tsx` (added 2026-09-22, 8 tests, 3 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `tabs` { id, label, icon?, badge?, disabled?, content } | ✓ | ✓ | Match |
| `defaultTab`, `label` (default "Tabs"), `lazy` | ✓ | ✓ | Match |
| Tab list | `flex border-b border-border pb-3` | same, inside a horizontal ScrollView for long rows | Match |
| Tab | `px-4 py-2.5 text-sm font-medium border-b-2`, primary when active, `opacity-40` when disabled | same | Match |
| Panel | `py-4`, hidden when inactive | same (`display: none`) | Match |
| Keyboard (ArrowLeft/Right, Home/End, roving tabIndex) | ✓ | ✗ | Gap: desktop keyboard pattern; native screen readers swipe between tabs |
| Hover | `hover:text-text-primary hover:border-border` | n/a | N/A |
| Tests | 11 | 8 (the 3 keyboard cases are N/A) | Match |
| Showcase | Default, Icons + badge + disabled, Lazy panels | same titles and copy | Match |
