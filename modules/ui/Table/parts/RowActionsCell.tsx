import { View } from "react-native";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../../libs/theme";

import { Button } from "../../Button";
import { DropdownMenu, arrangeMenuItems, type DropdownItem } from "../../DropdownMenu";
import type { DataTableRowAction } from "../types";

/** Width of the trailing actions column (KuiReact: `w-12`). */
export const ROW_ACTIONS_WIDTH = 48;

function per<T, V>(value: V | ((row: T) => V), row: T): V {
  return typeof value === "function" ? (value as (row: T) => V)(row) : value;
}

/** A row's actions as dropdown items, every per-row field resolved for `row` (KuiReact's resolveRowActions). */
export function resolveRowActions<T>(actions: readonly DataTableRowAction<T>[], row: T): DropdownItem[] {
  return actions.map((action) => ({
    type: "item" as const,
    id: action.id,
    label: action.label,
    icon: action.icon,
    href: action.href === undefined ? undefined : per(action.href, row),
    onPress: action.onPress ? () => action.onPress?.(row) : undefined,
    hidden: action.hidden === undefined ? undefined : per(action.hidden, row),
    disabled: action.disabled === undefined ? undefined : per(action.disabled, row),
    disabledReason: action.disabledReason === undefined ? undefined : per(action.disabledReason, row),
    danger: action.destructive,
    order: action.order,
    group: action.group,
  }));
}

/**
 * The trailing cell holding a row's actions menu (empty when every action is hidden):
 * KuiReact's `w-12 px-2 py-2 text-right` cell with a ghost icon-only ellipsis Button.
 */
export function RowActionsCell<T>({ row, actions, label }: { row: T; actions: readonly DataTableRowAction<T>[]; label: string }) {
  const t = useThemeTokens();
  const items = arrangeMenuItems(resolveRowActions(actions, row));
  return (
    <View testID="row-actions" className="items-end justify-center px-2 py-2" style={{ width: ROW_ACTIONS_WIDTH }}>
      {items.length > 0 ? (
        <DropdownMenu
          align="right"
          items={items}
          trigger={
            <Button variant="ghost" size="sm" iconOnly accessibilityLabel={label}>
              <FontAwesomeIcon icon={faEllipsisVertical} size={14} color={t["text-primary"]} />
            </Button>
          }
        />
      ) : null}
    </View>
  );
}
