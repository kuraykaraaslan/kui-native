// Overlay core shared by Modal, Drawer, Popover, DropdownMenu and Tooltip —
// mirrors KuiReact's modules/ui/Overlays/shared (presence, backdrop, focus,
// positioning).
export { AnchoredPanel, computePosition, useAnchor } from "./AnchoredPanel";
export type { Align, AnchoredPanelProps, Placement, Rect } from "./AnchoredPanel";
export { Backdrop } from "./Backdrop";
export { useFocusOnOpen } from "./useFocusOnOpen";
export { usePresence } from "./usePresence";
