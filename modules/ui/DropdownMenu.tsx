import type * as React from "react";
import { useMemo, useRef, useState } from "react";
import { Linking, Platform, Pressable, View } from "react-native";

import { cn } from "../../libs/utils/cn";
import { groupByOrder } from "../../libs/utils/orderItems";

import { AnchoredPanel, focusElement, useAnchor } from "./Overlays/shared";
import { Trigger } from "./Overlays/shared/useTrigger";
import { Text } from "./Text";

export type DropdownMenuItem = {
  type?: "item";
  /** Stable id: the React key, `testID` (`menuitem-<id>`), and the key `mergeMenuItems` replaces by. */
  id?: string;
  label: string;
  /** A node, or a text glyph such as "✏" (KuiReact's demos use glyphs). */
  icon?: React.ReactNode;
  /** KuiReact's `onClick`. */
  onPress?: () => void;
  /** Opened with `Linking.openURL` after `onPress` (KuiReact renders a link). A disabled item never opens it. */
  href?: string;
  danger?: boolean;
  disabled?: boolean;
  /** Why the item is disabled: shown under the label and as its accessibility hint while `disabled`. */
  disabledReason?: string;
  /** Leave the item out (a contribution the viewer may not use). */
  hidden?: boolean;
  /** Position, like CSS `order`: missing counts as 0, ties keep array order. */
  order?: number;
  /** Items of a group sit together; groups are split by a separator and ranked by their lowest `order`. */
  group?: string;
};

export type DropdownSeparator = { type: "separator"; id?: string; hidden?: boolean };

export type DropdownItem = DropdownMenuItem | DropdownSeparator;

export type DropdownMenuProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  header?: React.ReactNode;
  align?: "left" | "right";
  /**
   * KuiReact renders the open menu in `document.body` with it. Here the menu always sits in an
   * overlay above the screen, so no parent can clip it; the prop is accepted for API parity.
   */
  portal?: boolean;
  className?: string;
};

function isEntry(item: DropdownItem): item is DropdownMenuItem {
  return item.type !== "separator";
}

/** Drops leading, trailing and doubled separators (left behind by hidden items). */
function tidySeparators(items: DropdownItem[]): DropdownItem[] {
  const out: DropdownItem[] = [];
  for (const item of items) {
    if (!isEntry(item) && (out.length === 0 || !isEntry(out[out.length - 1]))) continue;
    out.push(item);
  }
  while (out.length && !isEntry(out[out.length - 1])) out.pop();
  return out;
}

/**
 * The items a menu shows, in the order it shows them (KuiReact's arrangeMenuItems). Hidden
 * items are left out. When any item sets `group` or `order`, items are laid out by group (a
 * separator between groups, explicit separators ignored); otherwise the list keeps its own
 * order and separators.
 */
export function arrangeMenuItems(items: readonly DropdownItem[]): DropdownItem[] {
  const visible = items.filter((item) => !item.hidden);
  const grouped = visible.some((item) => isEntry(item) && (item.group !== undefined || item.order !== undefined));
  if (!grouped) return visible.length === items.length ? visible : tidySeparators(visible);
  const out: DropdownItem[] = [];
  groupByOrder(visible.filter(isEntry), (item) => item.group).forEach((group, index) => {
    if (index > 0) out.push({ type: "separator", id: `group:${group.group ?? ""}` });
    out.push(...group.items);
  });
  return out;
}

/**
 * Adds contributed items to a base list (KuiReact's mergeMenuItems). An extra item whose `id`
 * matches a base item replaces it in place; the rest are appended.
 */
export function mergeMenuItems(base: readonly DropdownItem[], extra: readonly DropdownItem[] = []): DropdownItem[] {
  const byId = new Map<string, DropdownItem>();
  for (const item of extra) if (item.id) byId.set(item.id, item);
  const replaced = new Set<string>();
  const out = base.map((item) => {
    const next = item.id ? byId.get(item.id) : undefined;
    if (!next || !item.id) return item;
    replaced.add(item.id);
    return next;
  });
  for (const item of extra) if (!item.id || !replaced.has(item.id)) out.push(item);
  return out;
}

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
  const shown = useMemo(() => arrangeMenuItems(items), [items]);
  const firstEnabled = shown.findIndex((it) => it.type !== "separator" && !it.disabled);

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
          {shown.map((item, i) => {
            if (item.type === "separator") {
              return <View key={item.id ?? `sep-${i}`} className="my-1 border-t border-border" />;
            }
            const color = item.danger ? "text-error" : "text-text-primary";
            const reason = item.disabled && item.disabledReason ? item.disabledReason : undefined;
            return (
              <Pressable
                key={item.id ?? `${item.label}-${i}`}
                testID={item.id ? `menuitem-${item.id}` : undefined}
                ref={i === firstEnabled ? firstItemRef : undefined}
                accessibilityRole="menuitem"
                accessibilityLabel={item.label}
                accessibilityHint={reason}
                accessibilityState={{ disabled: Boolean(item.disabled) }}
                disabled={item.disabled}
                onPress={() => {
                  item.onPress?.();
                  if (item.href) void Linking.openURL(item.href);
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
                {reason ? (
                  <View className="min-w-0 flex-col">
                    <Text className={cn("text-sm", color)}>{item.label}</Text>
                    <Text className="text-xs text-text-secondary">{reason}</Text>
                  </View>
                ) : (
                  <Text className={cn("text-sm", color)}>{item.label}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </AnchoredPanel>
    </View>
  );
}
