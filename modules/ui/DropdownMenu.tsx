import type * as React from "react";
import { useRef, useState } from "react";
import { Platform, Pressable, View } from "react-native";

import { cn } from "../../libs/utils/cn";

import { AnchoredPanel, focusElement, useAnchor } from "./Overlays/shared";
import { Trigger } from "./Overlays/shared/useTrigger";
import { Text } from "./Text";

export type DropdownItem =
  | {
      type?: "item";
      label: string;
      /** A node, or a text glyph such as "✏" (KuiReact's demos use glyphs). */
      icon?: React.ReactNode;
      /** KuiReact's `onClick`. */
      onPress?: () => void;
      danger?: boolean;
      disabled?: boolean;
    }
  | { type: "separator" };

export type DropdownMenuProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  header?: React.ReactNode;
  align?: "left" | "right";
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's DropdownMenu (modules/ui/DropdownMenu.tsx):
 * a `min-w-[10rem] rounded-lg border border-border bg-surface-raised
 * shadow-lg py-1` menu 4px below the trigger (`mt-1`), left- or
 * right-aligned; `px-3 py-2 text-sm` items (danger = text-error), `my-1
 * border-t` separators, optional header. Selecting an item closes the menu;
 * tap outside or Android back closes it too.
 */
export function DropdownMenu({ trigger, items, header, align = "left", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const { ref, rect, measure } = useAnchor<View>();
  const firstItemRef = useRef<View>(null);
  const firstEnabled = items.findIndex((it) => it.type !== "separator" && !it.disabled);

  // KuiReact's focus trap moves focus to the first item on open.
  function focusFirstItem() {
    focusElement(firstItemRef.current);
  }

  function toggle() {
    if (!open) measure();
    setOpen((o) => !o);
  }

  return (
    <View className={cn("self-start", className)}>
      <Trigger
        anchorRef={ref}
        trigger={trigger}
        onToggle={toggle}
        // KuiReact clones aria-haspopup="menu" / aria-expanded onto the trigger.
        extraProps={{ accessibilityState: { expanded: open }, accessibilityHint: "Opens a menu" }}
      />
      <AnchoredPanel
        open={open}
        onClose={() => setOpen(false)}
        anchor={rect}
        placement="bottom"
        align={align === "right" ? "end" : "start"}
        gap={4}
        onShow={focusFirstItem}
      >
        <View
          testID="dropdown-menu"
          accessibilityRole="menu"
          accessibilityViewIsModal
          className="min-w-[10rem] rounded-lg border border-border bg-surface-raised py-1 shadow-lg"
          style={Platform.OS === "android" ? { elevation: 8 } : undefined}
        >
          {header ? <View className="mb-1 border-b border-border">{header}</View> : null}
          {items.map((item, i) => {
            if (item.type === "separator") {
              return <View key={`sep-${i}`} className="my-1 border-t border-border" />;
            }
            const color = item.danger ? "text-error" : "text-text-primary";
            return (
              <Pressable
                key={`${item.label}-${i}`}
                ref={i === firstEnabled ? firstItemRef : undefined}
                accessibilityRole="menuitem"
                accessibilityLabel={item.label}
                accessibilityState={{ disabled: Boolean(item.disabled) }}
                disabled={item.disabled}
                onPress={() => {
                  item.onPress?.();
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex-row items-center gap-2 px-3 py-2",
                  // KuiReact's hover backgrounds become the pressed state.
                  item.danger ? "active:bg-error-subtle" : "active:bg-surface-overlay",
                  item.disabled && "opacity-50",
                )}
              >
                {item.icon ? (
                  <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                    {typeof item.icon === "string" ? <Text className={cn("text-sm", color)}>{item.icon}</Text> : item.icon}
                  </View>
                ) : null}
                <Text className={cn("text-sm", color)}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </AnchoredPanel>
    </View>
  );
}
