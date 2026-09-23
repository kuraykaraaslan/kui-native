import { useWindowDimensions } from "react-native";
import { create } from "zustand";

/** KuiReact's LayoutSwitcher: how ShowcaseDetail lays out each variant. */
export type VariantLayout = "side" | "stack" | "grid";

type DrawerState = {
  /** Mobile drawer (below the `lg` breakpoint). */
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  /** Desktop sidebar collapsed to its icon rail (KuiReact's `sidebarCollapsed`). */
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  /** KuiReact's `variantLayout` (ShowcaseShell state, default "side"). */
  variantLayout: VariantLayout;
  setVariantLayout: (layout: VariantLayout) => void;
};

/** Showcase chrome state: the mobile drawer, the desktop sidebar rail and the variant layout. */
export const useDrawer = create<DrawerState>((set, get) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set({ open: !get().open }),
  close: () => set({ open: false }),
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
  variantLayout: "side",
  setVariantLayout: (variantLayout) => set({ variantLayout }),
}));

/** KuiReact's `lg` breakpoint (1024px): persistent sidebar at and above it, drawer below. */
export const DESKTOP_MIN_WIDTH = 1024;

export function useIsDesktop(): boolean {
  return useWindowDimensions().width >= DESKTOP_MIN_WIDTH;
}
