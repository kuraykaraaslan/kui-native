import type * as React from "react";
import { useState } from "react";
import { Platform, View } from "react-native";

import { cn } from "../../libs/utils/cn";

import { AnchoredPanel, useAnchor, type Placement } from "./Overlays/shared";
import { Trigger } from "./Overlays/shared/useTrigger";

export type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: Placement;
  /** Panel classes (KuiReact applies `className` to the panel). */
  className?: string;
  /** Keep screen-reader focus inside the panel while open (KuiReact's focus trap). */
  focusTrap?: boolean;
};

/**
 * Pixel-for-pixel with KuiReact's Popover (modules/ui/Overlays/Popover):
 * press the trigger to toggle a `min-w-[12rem] rounded-lg border
 * border-border bg-surface-raised shadow-xl` panel placed 8px beyond it
 * (KuiReact: mt-2 / mb-2 / mr-2 / ml-2), start-aligned. Tap outside or
 * Android back closes it (KuiReact: outside click / Escape).
 */
export function Popover({ trigger, children, placement = "bottom", className, focusTrap = true }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const { ref, rect, measure } = useAnchor<View>();

  function toggle() {
    if (!open) measure();
    setOpen((o) => !o);
  }

  return (
    <>
      <Trigger anchorRef={ref} trigger={trigger} onToggle={toggle} extraProps={{ accessibilityState: { expanded: open } }} />
      <AnchoredPanel open={open} onClose={() => setOpen(false)} anchor={rect} placement={placement} align="start" gap={8}>
        <View
          testID="popover-panel"
          accessibilityViewIsModal={focusTrap}
          className={cn("min-w-[12rem] rounded-lg border border-border bg-surface-raised shadow-xl", className)}
          style={Platform.OS === "android" ? { elevation: 12 } : undefined}
        >
          {children}
        </View>
      </AnchoredPanel>
    </>
  );
}
