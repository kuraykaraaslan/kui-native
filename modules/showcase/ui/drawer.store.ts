import { useWindowDimensions } from "react-native";
import { create } from "zustand";

type DrawerState = {
  /** Mobile drawer (below the `lg` breakpoint). */
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  /** Desktop sidebar collapsed to its icon rail (KuiReact's `sidebarCollapsed`). */
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

/** Controls the showcase navigation: the mobile drawer and the desktop sidebar rail. */
export const useDrawer = create<DrawerState>((set, get) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set({ open: !get().open }),
  close: () => set({ open: false }),
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
}));

/** KuiReact's `lg` breakpoint (1024px): persistent sidebar at and above it, drawer below. */
export const DESKTOP_MIN_WIDTH = 1024;

export function useIsDesktop(): boolean {
  return useWindowDimensions().width >= DESKTOP_MIN_WIDTH;
}
