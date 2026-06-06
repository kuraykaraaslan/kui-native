import { create } from "zustand";

type DrawerState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
};

/** Controls the slide-in navigation drawer (the Sidebar). */
export const useDrawer = create<DrawerState>((set, get) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set({ open: !get().open }),
  close: () => set({ open: false }),
}));
